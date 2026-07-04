#!/usr/bin/env node
// Filters a source Obsidian vault into this repo's content/ folder, removing
// GM-only material before anything reaches the public Quartz site.
//
// Usage: node scripts/filter-vault.mjs <source-vault-path> <output-path>

import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { unified } from "unified"
import remarkParse from "remark-parse"
import { toString as mdastToString } from "mdast-util-to-string"
import { visit } from "unist-util-visit"

const EXCLUDED_DIRS = new Set(["10-Campaign-Plot", "_Templates", "00-Inbox"])

const [, , srcArg, outArg] = process.argv

if (!srcArg || !outArg) {
  console.error("Usage: node scripts/filter-vault.mjs <source-vault-path> <output-path>")
  process.exit(1)
}

const SRC = path.resolve(srcArg)
const OUT = path.resolve(outArg)

if (!fs.existsSync(SRC)) {
  console.error(`Source vault path does not exist: ${SRC}`)
  process.exit(1)
}

const markdownProcessor = unified().use(remarkParse)

function isHidden(name) {
  return name.startsWith(".")
}

// Mirrors @quartz-community/utils' slugifyPath exactly (quartz/util/path.ts
// re-exports it), so slugs recorded here match the URLs Quartz actually
// generates for public pages.
function slugifyPath(relPathNoExt) {
  return relPathNoExt
    .split(path.sep)
    .map((segment) =>
      segment
        .replace(/\s/g, "-")
        .replace(/&/g, "-and-")
        .replace(/%/g, "-percent")
        .replace(/\?/g, "")
        .replace(/#/g, "")
        .replace(/[<>:"|*]/g, "")
        .toLowerCase(),
    )
    .join("/")
}

function listMarkdownFiles(relDir) {
  const absDir = path.join(SRC, relDir)
  const entries = fs.readdirSync(absDir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    if (isHidden(entry.name)) continue
    const relPath = path.join(relDir, entry.name)

    if (entry.isDirectory()) {
      if (EXCLUDED_DIRS.has(entry.name)) continue
      files.push(...listMarkdownFiles(relPath))
      continue
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      files.push(relPath)
    }
  }

  return files
}

// Every note NOT excluded by folder and NOT marked secret: true. Dataview
// queries are evaluated only against this index, so a query written to
// surface secret material (e.g. `WHERE secret = true`) structurally returns
// nothing — the secret notes were never in the queryable set to begin with,
// regardless of what the query text asks for.
function buildPublicIndex() {
  const index = []

  for (const relPath of listMarkdownFiles("")) {
    const raw = fs.readFileSync(path.join(SRC, relPath), "utf-8")
    const { data } = matter(raw)

    if (data.secret === true) continue

    index.push({
      relDir: path.dirname(relPath),
      name: path.basename(relPath, ".md"),
      data,
    })
  }

  return index
}

function isSecretsHeading(node) {
  return node.type === "heading" && mdastToString(node).trim().toLowerCase().includes("secret")
}

function findSecretsRanges(tree, content) {
  const children = tree.children
  const ranges = []

  let i = 0
  while (i < children.length) {
    const node = children[i]
    if (!isSecretsHeading(node)) {
      i++
      continue
    }

    const depth = node.depth
    const start = node.position.start.offset
    let j = i + 1
    while (j < children.length && !(children[j].type === "heading" && children[j].depth <= depth)) {
      j++
    }
    const end = j < children.length ? children[j].position.start.offset : content.length
    ranges.push([start, end])
    i = j
  }

  return ranges
}

// --- Minimal Dataview query language support -------------------------------
// Only what this vault's queries actually use: TABLE [WITHOUT ID] fields,
// FROM "folder", WHERE cond [AND cond]*, SORT field [ASC|DESC][, ...], LIMIT n.

function parseQuery(source) {
  const query = { fields: [], withoutId: false, from: "", where: null, sort: [], limit: null }

  for (const rawLine of source.split("\n")) {
    const line = rawLine.trim()
    if (!line) continue
    const upper = line.toUpperCase()

    if (upper.startsWith("TABLE")) {
      let rest = line.slice("TABLE".length).trim()
      if (rest.toUpperCase().startsWith("WITHOUT ID")) {
        query.withoutId = true
        rest = rest.slice("WITHOUT ID".length).trim()
      }
      query.fields = rest.length ? rest.split(",").map((f) => f.trim()) : []
    } else if (upper.startsWith("FROM")) {
      query.from = line
        .slice("FROM".length)
        .trim()
        .replace(/^"(.*)"$/, "$1")
    } else if (upper.startsWith("WHERE")) {
      query.where = line.slice("WHERE".length).trim()
    } else if (upper.startsWith("SORT")) {
      query.sort = line
        .slice("SORT".length)
        .trim()
        .split(",")
        .map((part) => {
          const bits = part.trim().split(/\s+/)
          const dir = (bits[1] || "ASC").toUpperCase() === "DESC" ? "DESC" : "ASC"
          return { field: bits[0], dir }
        })
    } else if (upper.startsWith("LIMIT")) {
      const n = parseInt(line.slice("LIMIT".length).trim(), 10)
      if (!Number.isNaN(n)) query.limit = n
    }
  }

  return query
}

function parseValue(rawValue) {
  const trimmed = rawValue.trim()
  if (/^".*"$/.test(trimmed)) return trimmed.slice(1, -1)
  if (trimmed === "true") return true
  if (trimmed === "false") return false
  if (trimmed !== "" && !Number.isNaN(Number(trimmed))) return Number(trimmed)
  return trimmed
}

function parseCondition(cond) {
  const m = cond.trim().match(/^(\S+)\s*(!=|>=|<=|=|>|<)\s*(.+)$/)
  if (!m) return null
  const [, field, op, rawValue] = m
  return { field, op, value: parseValue(rawValue) }
}

function evalWhere(whereStr, data) {
  if (!whereStr) return true
  const conditions = whereStr.split(/\sAND\s/i).map(parseCondition).filter(Boolean)

  return conditions.every(({ field, op, value }) => {
    const actual = data[field]
    switch (op) {
      case "=":
        return actual === value
      case "!=":
        return actual !== value
      case ">":
        return actual > value
      case "<":
        return actual < value
      case ">=":
        return actual >= value
      case "<=":
        return actual <= value
      default:
        return false
    }
  })
}

function matchesFrom(fromFolder, relDir) {
  if (!fromFolder) return true
  const normalized = fromFolder.replace(/\/$/, "")
  return relDir === normalized || relDir.startsWith(normalized + path.sep)
}

function compareValues(a, b) {
  if (a === undefined && b === undefined) return 0
  if (a === undefined) return 1
  if (b === undefined) return -1
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

function sortRows(rows, sortSpecs) {
  return [...rows].sort((a, b) => {
    for (const { field, dir } of sortSpecs) {
      const cmp = compareValues(a.data[field], b.data[field])
      if (cmp !== 0) return dir === "DESC" ? -cmp : cmp
    }
    return 0
  })
}

function formatCell(value) {
  if (value === undefined || value === null) return ""
  const text = Array.isArray(value) ? value.map(String).join(", ") : String(value)
  return text.replace(/\|/g, "\\|").replace(/\r?\n/g, " ")
}

function renderTable(query, rows) {
  const headers = query.withoutId ? [] : ["File"]
  headers.push(...query.fields)

  const lines = [`| ${headers.join(" | ")} |`, `| ${headers.map(() => "---").join(" | ")} |`]

  for (const row of rows) {
    const cells = query.withoutId ? [] : [`[[${row.name}]]`]
    cells.push(...query.fields.map((field) => formatCell(row.data[field])))
    lines.push(`| ${cells.join(" | ")} |`)
  }

  return lines.join("\n")
}

function renderDataviewBlock(source, publicIndex) {
  const query = parseQuery(source)
  const scoped = publicIndex.filter((entry) => matchesFrom(query.from, entry.relDir))
  const matched = scoped.filter((entry) => evalWhere(query.where, entry.data))
  const sorted = query.sort.length ? sortRows(matched, query.sort) : matched
  const limited = query.limit != null ? sorted.slice(0, query.limit) : sorted
  return renderTable(query, limited)
}

// --- Body processing --------------------------------------------------------

// Builds one edit list per file from a single AST parse: delete "## Secrets"
// section ranges, and replace ```dataview code blocks with rendered tables
// (skipping any dataview block that already falls inside a deleted Secrets
// range). Edits are applied by splicing the ORIGINAL source text — nothing is
// re-serialized through remark-stringify — so Obsidian-specific syntax
// (wikilinks, embeds, callouts) elsewhere in the file passes through
// untouched instead of risking corruption from a full round-trip.
function processBody(content, publicIndex) {
  const tree = markdownProcessor.parse(content)
  const secretsRanges = findSecretsRanges(tree, content)
  const edits = secretsRanges.map(([start, end]) => ({ start, end, text: "" }))

  visit(tree, "code", (node) => {
    if (node.lang !== "dataview") return
    const start = node.position.start.offset
    const end = node.position.end.offset
    const insideSecrets = secretsRanges.some(([s, e]) => start >= s && end <= e)
    if (insideSecrets) return
    edits.push({ start, end, text: renderDataviewBlock(node.value, publicIndex) })
  })

  if (edits.length === 0) return content

  edits.sort((a, b) => a.start - b.start)
  let result = ""
  let cursor = 0
  for (const { start, end, text } of edits) {
    result += content.slice(cursor, start)
    result += text
    cursor = end
  }
  result += content.slice(cursor)
  return result
}

function filterMarkdown(raw, publicIndex) {
  const { data, content, matter: frontmatterText } = matter(raw)

  if (data.secret === true) {
    return null
  }

  const processedBody = processBody(content, publicIndex)

  // Reassemble from the raw frontmatter text (not matter.stringify) so
  // gray-matter's YAML round-trip doesn't rewrite untouched values, e.g.
  // reformatting a bare date "2026-06-20" into a full ISO timestamp.
  if (!frontmatterText) return processedBody
  return `---${frontmatterText}\n---\n${processedBody}`
}

// Notes excluded either by folder or by secret: true, recorded as the slugs
// Quartz would have generated for them had they been published. Written out
// as content/secret-manifest.json so the 404 page can tell "this is GM-only
// material" apart from an ordinary broken link/typo.
const secretSlugs = []

function recordExcludedSlug(relPath) {
  secretSlugs.push(slugifyPath(relPath.replace(/\.md$/i, "")))
}

function walk(relDir, publicIndex) {
  const absDir = path.join(SRC, relDir)
  const entries = fs.readdirSync(absDir, { withFileTypes: true })

  for (const entry of entries) {
    const relPath = path.join(relDir, entry.name)

    if (isHidden(entry.name)) continue

    if (entry.isDirectory()) {
      if (EXCLUDED_DIRS.has(entry.name)) {
        console.log(`Skipping excluded folder: ${relPath}`)
        for (const mdRelPath of listMarkdownFiles(relPath)) {
          recordExcludedSlug(mdRelPath)
        }
        continue
      }
      walk(relPath, publicIndex)
      continue
    }

    if (!entry.isFile()) continue

    const outPath = path.join(OUT, relPath)

    if (entry.name.toLowerCase().endsWith(".md")) {
      const raw = fs.readFileSync(path.join(absDir, entry.name), "utf-8")
      const filtered = filterMarkdown(raw, publicIndex)

      if (filtered === null) {
        console.log(`Skipping secret note: ${relPath}`)
        recordExcludedSlug(relPath)
        continue
      }

      fs.mkdirSync(path.dirname(outPath), { recursive: true })
      fs.writeFileSync(outPath, filtered)

      // The vault has no root index note; alias Campaign Hub as the site
      // homepage so visiting the root doesn't 404.
      if (relDir === "" && entry.name === "Campaign Hub.md") {
        fs.writeFileSync(path.join(OUT, "index.md"), filtered)
      }
    } else {
      fs.mkdirSync(path.dirname(outPath), { recursive: true })
      fs.copyFileSync(path.join(absDir, entry.name), outPath)
    }
  }
}

const publicIndex = buildPublicIndex()

fs.rmSync(OUT, { recursive: true, force: true })
fs.mkdirSync(OUT, { recursive: true })
walk("", publicIndex)

fs.writeFileSync(
  path.join(OUT, "secret-manifest.json"),
  JSON.stringify([...new Set(secretSlugs)].sort()),
)

console.log(`Filtered vault written to ${OUT}`)
