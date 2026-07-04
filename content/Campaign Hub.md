---
type: hub
secret: false
aliases: ["Dashboard", "Hub"]
tags: []
created: 2026-06-20
---

# Heretics of the Old Gods — Campaign Hub

## Campaign State

| | |
|---|---|
| **Current Date** | 15 Sydenstar, 1000 A.E. |
| **Location** | [[Bassuras]], [[Hellcatch Valley]] |
| **Phase** | Exposition (Levels 1–4) |
| **Active Hooks** | [[Hook A - Ghost Run]], [[Hook B - The Broken Chain]], [[Hook C - The Ninth Expedition]], [[Hook D - The Congregation]] |

---

## Active Plot Threads


---

## Player Characters

```dataview
TABLE player_name, class, level, faction, status
FROM "07-Player-Characters"
WHERE status = "alive"
SORT file.name ASC
```

---

## Active Plot Threads

## NPC Roster

```dataview
TABLE faction, location, status, role
FROM "02-NPCs"
WHERE status != "dead" AND secret != true
SORT faction ASC
```

### GM-Only NPCs

```dataview
TABLE faction, location, status, role
FROM "02-NPCs"
WHERE status != "dead" AND secret = true
SORT faction ASC
```

---

## Factions

```dataview
TABLE category, disposition, leader, status
FROM "03-Factions"
WHERE status = "active"
SORT category ASC
```

---

## Recent Sessions

```dataview
TABLE session_number, real_date, attendees, recap_link
FROM "06-Sessions"
SORT fc-date DESC
LIMIT 5
```

---

## Locations

```dataview
TABLE region, location_type, faction_control, danger_level
FROM "01-Locations"
WHERE status = "discovered" AND secret != true
SORT location_type ASC
```

---

## Player Options Reference

```dataview
TABLE class, subclass_type, associated_deity
FROM "09-Player-Options"
SORT class ASC
```

---

## DM Notes & Secrets

- [[DM Notes]] — Campaign principles, Afterlife Problem
- [[10-Campaign-Plot/01-Exposition|Exposition]] · [[10-Campaign-Plot/02-Rising Action|Rising Action]] · [[10-Campaign-Plot/03-Climax|Climax]] · [[10-Campaign-Plot/04-Falling Action|Falling Action]] · [[10-Campaign-Plot/05-Resolution|Resolution]]
- [[Molaesmyr]] — Domain of Dread

### Secret NPCs Quick Reference

```dataview
TABLE faction, role, status
FROM "02-NPCs"
WHERE secret = true
SORT status ASC
```

### Unresolved Secrets by Category

```dataview
TABLE type, status
FROM ""
WHERE secret = true AND type != "npc"
SORT type ASC
```
