# Heretics of the Old Gods -- Vault Starter

D&D 5.5e (2024). Even-mix sandbox: factions, locations, and NPC relationships
all matter equally, so the schema treats them as peers instead of subordinating
any one to the others.

## Folders

You don't need to create these by hand. Each template's `tp.file.move()` call
creates the destination folder automatically the first time it's used.

- `00-Inbox` -- unsorted capture, dump things here mid-session and file later
- `01-Locations`
- `02-NPCs`
- `03-Factions`
- `04-Plot-Threads`
- `05-Items-Lore`
- `06-Sessions`
- `07-Player-Characters`
- `_Maps` -- base images/overlays for TTRPG Tools: Maps (create manually, no
  template needed)
- `_Templates` -- these files

## Install

1. Copy everything in `_Templates/` into your vault's own `_Templates` folder.
2. Settings -> Templater -> set "Template folder location" to that folder.
3. Settings -> Templater -> Hotkeys -> bind "Insert Template" to something you'll
   remember.
4. **Before using the Session template:** set up a calendar in Calendarium first.
   `fc-date`/`fc-end` are inert until a calendar exists for them to register
   against. Command palette -> "Calendarium: Open calendar" -> create calendar.

## Frontmatter conventions

Every note type shares: `type`, `tags`, `aliases`, `created`, `secret`.

- `secret: true` marks GM-only content. It doesn't *do* anything mechanically
  right now -- no Publish plugin in play -- but keeping it consistent from day
  one means if you ever revisit a player-facing site, filtering is a Dataview
  query instead of a retroactive audit of every note you've written.
- Link fields (`faction:`, `location:`, `leader:`, `related_npcs:`, etc.) --
  use `[[Note Name]]` wikilinks, not plain text, or Dataview and the graph view
  can't see the relationship.

## Dataview starter queries

Drop these into a hub note once each folder has a few entries in it.

```dataview
TABLE faction, location, status
FROM "02-NPCs"
WHERE status != "dead"
```

```dataview
TABLE leader, disposition
FROM "03-Factions"
WHERE status = "active"
```

```dataview
TABLE priority, status
FROM "04-Plot-Threads"
WHERE status = "active"
SORT priority DESC
```

```dataview
TABLE region, danger_level, faction_control
FROM "01-Locations"
WHERE status = "discovered"
```

## What's deliberately not here

- No public-facing/Publish wiring (`secret` flag is there for when you want it,
  not because it's active now).
- No RPG Manager-style imposed campaign hierarchy -- this is the manual
  Dataview-driven schema, not a competing framework.
- No `TTRPG Tools: Time` calendar duplication -- Session notes use
  Calendarium's `fc-date`/`fc-end` exclusively.
