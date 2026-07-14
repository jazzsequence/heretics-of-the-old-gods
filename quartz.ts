import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as ExternalPlugin from "./.quartz/plugins"

// Group the Player Options sidebar into 3 dropdowns: Classes & Subclasses,
// Races & Lineages, and Feats/Backgrounds/everything else. Purely a sidebar
// presentation change — no content files move, so no links break.
ExternalPlugin.Explorer({
  mapFn: (node: any) => {
    if (!node.isFolder || node.slugSegment !== "09-player-options") return node

    const classAndSubclassSlugs = new Set([
      "classes",
      "artificer-specialists",
      "barbarian-paths",
      "bard-colleges",
      "blood-hunter-orders",
      "cleric-domains",
      "druid-circles",
      "fighter-archetypes",
      "gunner-archetypes",
      "monk-traditions",
      "ranger-archetypes",
      "rogue-archetypes",
      "sorcerer-origins",
      "warlock-patrons",
      "wizard-schools",
    ])

    const ancestries = node.children.find((c: any) => c.slugSegment === "ancestries")
    if (ancestries) ancestries.displayName = "Races & Lineages"

    const classesAndSubclasses = node.children.filter((c: any) =>
      classAndSubclassSlugs.has(c.slugSegment),
    )
    const featsBackgroundsAndMore = node.children.filter(
      (c: any) => !classAndSubclassSlugs.has(c.slugSegment) && c.slugSegment !== "ancestries",
    )

    // Link each virtual group to a real page it contains, rather than a
    // synthetic path, so clicking the title (not just the toggle) works.
    const classesFolder = node.children.find((c: any) => c.slugSegment === "classes")
    const featsFolder = node.children.find((c: any) => c.slugSegment === "feats")

    const proto = Object.getPrototypeOf(node)
    const makeGroup = (name: string, linkSlugSegments: string[], children: any[]) => {
      const group = Object.create(proto)
      group.children = children
      group.slugSegments = linkSlugSegments
      group.data = null
      group.isFolder = true
      group.fileSegmentHint = null
      group.displayNameOverride = name
      return group
    }

    const newChildren: any[] = [
      makeGroup(
        "Classes & Subclasses",
        classesFolder ? classesFolder.slugSegments : [...node.slugSegments, "classes"],
        classesAndSubclasses,
      ),
    ]
    if (ancestries) newChildren.push(ancestries)
    newChildren.push(
      makeGroup(
        "Feats, Backgrounds & More",
        featsFolder ? featsFolder.slugSegments : [...node.slugSegments, "feats"],
        featsBackgroundsAndMore,
      ),
    )

    node.children = newChildren
    return node
  },
  sortFn: (a: any, b: any) => {
    const groupOrder = ["Classes & Subclasses", "Races & Lineages", "Feats, Backgrounds & More"]
    const ai = groupOrder.indexOf(a.displayName)
    const bi = groupOrder.indexOf(b.displayName)
    if (ai !== -1 && bi !== -1) return ai - bi

    if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
      return (a.displayName || "").localeCompare(b.displayName || "", undefined, {
        numeric: true,
        sensitivity: "base",
      })
    }
    if (!a.isFolder && b.isFolder) return 1
    return -1
  },
} as any)

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
