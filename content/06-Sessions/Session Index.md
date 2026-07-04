---
type: hub
secret: false
aliases: []
tags: []
created: 2026-06-20
---

# Session Index

## All Sessions — Chronological

```dataview
TABLE session_number, fc-date, real_date, attendees, recap_link
FROM "06-Sessions"
SORT fc-date ASC
```

---

## NPCs Encountered by Session

```dataview
TABLE session_number, fc-date
FROM "06-Sessions"
SORT fc-date DESC
```

---

## Plot Threads Advanced — Full History

```dataview
TABLE priority, status
FROM "04-Plot-Threads"
SORT status ASC, priority DESC
```
