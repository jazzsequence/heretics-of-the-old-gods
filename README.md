# Heretics of the Old Gods

The public site for the *Heretics of the Old Gods* TTRPG campaign wiki, built with [Quartz](https://quartz.jzhao.xyz/) and deployed to GitHub Pages.

Live site: https://jazzsequence.github.io/heretics-of-the-old-gods/

## How content gets here

The real source of truth is a separate Obsidian vault on the local filesystem — it is **not** part of this repo and is never synced or symlinked directly. Instead, `scripts/filter-vault.mjs` reads the vault, strips GM-only material, and writes the result into `content/`, which is what actually gets committed and built.

The filter removes:

- Any note with `secret: true` in its frontmatter
- The `00-Inbox/`, `10-Campaign-Plot/`, and `_Templates/` folders entirely
- Any heading whose text contains "secret" (`## Secrets`, `## DM Notes & Secrets`, etc.) along with everything under it, up to the next heading of the same or shallower depth
- The unsafe half of Dataview queries: every `` ```dataview `` block is evaluated into a real markdown table, but only against notes that already survived the filters above. A query like `WHERE secret = true` isn't specially detected — it just has nothing left to match, since secret notes are never in the queryable set to begin with

Since `content/` is a generated artifact, don't hand-edit files there — edit the vault and re-run the filter instead.

## Syncing from the vault

```bash
npm run filter-vault
```

Re-derives `content/` from the vault and exits. By default it points at:

```
/Volumes/EXTERNAL/Documents/Obsidian/Heretics of the Old Gods/Heretics of the Old Gods
```

Override with `VAULT_PATH` if the vault ever lives somewhere else:

```bash
VAULT_PATH="/path/to/vault" npm run filter-vault
```

## Building and previewing locally

```bash
npm run build          # filter-vault -> install plugins -> quartz build
npx quartz build --serve   # build + serve at localhost, without re-filtering
```

`npm run build` always re-filters from the live vault first (via the `prebuild` hook), so it's always safe to run before committing — you'll never accidentally publish something the filter would have caught.

## Publishing

GitHub Actions builds and deploys straight from whatever is committed in `content/` — it has no access to the vault, so the filter step only ever runs locally. The workflow is:

1. Edit notes in the Obsidian vault as normal.
2. Run `npm run build` (or just `npm run filter-vault`) locally to refresh `content/`.
3. Review the diff in `content/` — this is the last checkpoint before anything becomes public.
4. Commit and push to `main`. The `Deploy Quartz site to GitHub Pages` workflow builds and publishes automatically.

## Sponsors

<p align="center">
  <a href="https://github.com/sponsors/jackyzha0">
    <img src="https://cdn.jsdelivr.net/gh/jackyzha0/jackyzha0/sponsorkit/sponsors.svg" />
  </a>
</p>
