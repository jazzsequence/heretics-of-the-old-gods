
# Rig Rules

Rules for crawler-style vehicles ("rigs") in the Hellcatch. Any sufficiently trained operator can drive and fight from a rig; the [[Machinist]] Artificer has unique features layered on top (see that subclass). These rules are self-contained and apply to any rig in play, PC-owned or not.

## What a Rig Is

A rig is a persistent, constructed vehicle. It never takes a turn of its own; it moves and acts only through the creatures crewing it. It has no Intelligence, Wisdom, or Charisma, cannot be targeted by effects that need a mind, and is immune to poison and psychic damage and to the charmed, frightened, exhaustion, paralyzed, petrified, poisoned, stunned, and unconscious conditions.

## Frames

Every rig is built on one of three frames, chosen at construction. The frame sets size, base statistics, capacity, and component slots. Smaller frames are faster and nimbler but fragile and cramped; larger frames are tough and roomy but slow and hard to turn.

| | **Skirmisher** | **Hauler** | **Ruiner** |
|---|---|---|---|
| Size | Large | Huge | Gargantuan |
| STR / DEX / CON | 16 / 16 / 14 | 18 / 12 / 16 | 20 / 8 / 20 |
| Base AC | 15 | 17 | 19 |
| Base HP | 60 | 90 | 150 |
| Base Speed (per segment) | 60 ft | 45 ft | 35 ft |
| Damage Threshold | 10 | 15 | 20 |
| Mishap Threshold | 15 | 20 | 25 |
| Crew Slots | 2 | 4 | 6 |
| Passenger Slots | 1 | 3 | 6 |

- **Crew** operate the helm and action stations. **Passengers** are just aboard. Exceeding passenger slots is possible but load-penalizes the rig (see *Movement*).
- **Hit points** are a fixed property of the frame, raised only by components — not by anyone's level. A rig is a machine; it doesn't get tougher because its builder gained experience.
- **Damage Threshold:** the rig ignores damage from any single source below this value; damage at or above it applies in full.
- **Mishap Threshold:** if a single hit deals damage at or above this value, the rig immediately makes a mishap check regardless of remaining HP — a DEX check by the rig (its own DEX), DC 10, failure triggering a mishap (below).

## Component Slots

The frame sets a starting slot count; a [[Machinist]]'s rig gains a slot at 5th, 9th, and 15th level as they expand it. An enemy or unaffiliated rig's slots are set by an "operator level" the GM picks against this table.

| Frame | Lvl 3 | Lvl 5 | Lvl 9 | Lvl 15 |
|---|---|---|---|---|
| Skirmisher | 3 | 4 | 5 | 6 |
| Hauler | 4 | 5 | 6 | 7 |
| Ruiner | 5 | 6 | 7 | 8 |

## Driving Requirements

- To operate the **helm**, a creature must have proficiency with land vehicles.
- Operating a non-helm **action station** requires no special proficiency.

## Movement

A rig moves in **segments**. The helmsman can spend any of their three action-economy resources — **movement, action, and bonus action** — to move the rig one segment (up to its base speed) each. These are independent and can be spent in any order during the helmsman's turn.

The rig's **speed band at any given instant** is how many movement segments the helmsman has committed so far this turn: **Cruising** (1), **Fast** (2), or **Full Tilt** (3).

**Load gating:** if the rig exceeds its passenger capacity or is otherwise overloaded, the helmsman cannot spend their bonus action on a movement segment — the rig tops out at 2 segments (Fast).

## Turning

A rig has a **facing**. Moving straight within a segment is free. Turning up to 90° costs the helmsman's **action** — so it competes with using the action for a movement segment.

Whether a turn requires a control check depends on the rig's **speed band at the instant of the turn** — how many movement segments have been committed when the turn is made:

- **Turning at Cruising** (1 segment committed): the turn costs the helmsman's **action and bonus action** together — a careful turn eats the rest of the turn. No check. The rig moves only its one movement segment that turn.
- **Turning at Fast** (2 segments committed): the turn costs only the helmsman's **action**, leaving the bonus action free (typically already spent on the second segment). Requires a **control check** — a DEX check with land vehicle proficiency, DC 12. On a failure, the rig mishaps.
- **Turning at Full Tilt** is impossible by default — reaching Full Tilt means spending the action on the third movement segment, leaving nothing to turn with. (The Skirmisher-only Drift Rig component overrides this at a steep DC.)

Because segments can be spent in any order, a helmsman can move one segment, turn while still at Cruising (safe, but it consumes the rest of the turn), or commit two segments and take the turn at Fast (faster, but risking the check). This sequencing is the core of skilled driving: the cautious line is slow, the fast line gambles the check.

## Targeting the Rig vs. Riders

An attacker chooses whether they're aiming at the rig or a specific rider.

- **The rig:** uses the rig's AC. Damage below the damage threshold is ignored; at or above it applies in full.
- **A rider:** uses that rider's own AC, modified by station cover. The rig's damage threshold does not protect riders.

**Station cover:**
- **Helm:** half cover (+2 AC, +2 DEX saves) on every frame.
- **Skirmisher** (open frame): stations other than the helm grant no cover.
- **Hauler:** interior stations grant half cover.
- **Ruiner** (enclosed): interior stations grant three-quarters cover (+5 AC, +5 DEX saves).
- Armor Plating raises enclosed-station cover by one step.

## Ramming

When the rig enters a creature's space, the helmsman can ram (no action cost). The target makes a **DEX save, DC 10**, taking **1d6 bludgeoning per 10 ft the rig has moved this turn** (maximum 20d6) on a failure, or half on a success.

- The target is knocked **prone** on a failed save **only if it is the same size as the rig or smaller**. A rig cannot knock a larger rig or creature prone by ramming it.
- **Self-damage:** if the rig rams something its own size or larger (another rig, a wall, a Gargantuan creature), it takes **half** the collision damage (round down). Ramming anything smaller costs the rig nothing.
- **Ram Plate** halves the rig's self-collision damage again (round down) and adds +1d6 to ram damage dealt.

## Mishaps

A mishap is triggered by a failed Fast-turn control check or by exceeding the mishap threshold. Severity scales with how far the triggering check was missed (a mishap-threshold trigger uses the DC 10 rig check):

- **Missed by 1–4 (wobble):** the rig loses its movement on its **next** turn. It can still be crewed and act, but the helmsman can't move it that turn.
- **Missed by 5–9 (skid):** as wobble, and the rig ends facing a random direction (d8); every creature aboard makes a DC 10 DEX save or is knocked prone.
- **Missed by 10+ (rollover):** the rig overturns — it takes crash damage (below) as if it had broken down at its current speed band, is knocked prone/overturned (immobile until righted, a multi-creature or downtime effort), and every creature aboard takes the same crash damage and is knocked prone.

## Breakdown & Crash Damage

At **0 HP** the rig **breaks down**: it halts, can't move or operate stations, and every creature aboard takes crash damage by the speed band it was in, and makes a DC 12 DEX save or is knocked prone.

| Speed band at breakdown | Crash damage |
|---|---|
| Cruising | 1d6 |
| Fast | 3d6 |
| Full Tilt | 6d6 |

A broken-down rig is **inert but repairable** — it is not destroyed.

## Wreck Points & Destruction

A broken-down (0 HP) rig gains a **wreck point** each time an attacker lands a hit dealing damage at or above its damage threshold (below-threshold hits do nothing to a downed rig).

- **3 wreck points → the rig is destroyed. This is permanent.** A destroyed rig cannot be repaired or brought back; it can be stripped for parts, but a new rig must be built from scratch.
- Wreck points **persist until cleared by a Machinist** (see the subclass); they do not reset if the rig is brought back up and downed again.
- **Field repair is staged:** a Machinist must clear all wreck points before the rig can be restored from 0 HP.
- **Out of combat,** anyone can dismantle a broken-down rig to destruction with time and tools — automatic, no wreck tracking. The wreck-point rule governs only destroying a rig under fire.

## Repair & Maintenance

Out-of-combat repair restores **10 HP per hour** of work with tools and materials, **rounded up** (45 HP = 5 hours). A rig can't exceed its maximum. A broken-down (0 HP) rig must first have any wreck points cleared by a Machinist, then repairs from 0 at the same rate.

The cost of a major repair is simply time: a rig needing several hours of work may cost the Machinist their long rest to have it running by morning. The GM adjudicates a missed rest by the normal rules. A rig never heals on its own.

## Components

Each component costs slots, has a rarity (setting its acquisition DC and minimum level), and an effect. You can't exceed your frame's current slot count.

**Offense**
- **Mounted Weapon (Light)** — 1 slot, common, lvl 3. Action station: a crew member uses their action to make a ranged attack (2d8, operator's proficiency + a fixed +5 attack bonus), once per round.
- **Heavy Cannon** — 2 slots, rare, lvl 9. Two-crew station: one crew member loads (their action), another fires (their action) for 4d10 in a 15-ft burst (DEX save for half). A single crew member can load one turn and fire the next.
- **Spikes / Shredder Plating** — 1 slot, uncommon, lvl 3. A creature that ends its turn adjacent to the rig, or fails a ram save against it, takes 2d6 piercing.

**Defense**
- **Armor Plating** — 1 slot, uncommon, lvl 3. +2 AC; raises enclosed-station cover one step. Stacking a second or further plate costs −5 ft speed each; the first is free.
- **Ram Plate** — 1 slot, uncommon, lvl 3. Halves the rig's self-collision damage (round down); +1d6 to ram damage dealt.
- **Reinforced Chassis** — 2 slots, rare, lvl 9. +2 damage threshold and +25 HP.

**Mobility**
- **Overdrive Engine** — 1 slot, rare, lvl 5. +10 ft to base speed (per segment).
- **Drift Rig** *(Skirmisher only)* — 1 slot, rare, lvl 5. Permits a turn at Full Tilt, at a DC 18 control check (mishap on failure as normal).
- **All-Terrain Treads** — 1 slot, common, lvl 3. Ignore difficult terrain from rubble, sand, and loose ground.

**Utility**
- **Expanded Cabin** — 1 slot, common, lvl 3. +2 passenger slots.
- **Grapple Rig** — 1 slot, uncommon, lvl 3. Action station: fire a line at a creature or object within 30 ft (ranged attack or contested check) to pull, tether, or anchor.
- **Salvage Arm** — 1 slot, uncommon, lvl 3. Action station for grabbing, dragging, or prying at range; utility, not a weapon.

## Acquisition (Resources)

A [[Machinist]] sources components via a **Resources check** (a Machinist-only capability — see the subclass). By rarity:

| Rarity | Resources DC | Min. Level |
|---|---|---|
| Common / Uncommon | 15 | 3 |
| Rare | 20 | 5 |
| Very Rare | 25 | 9 |

Success sources the parts; installation is then safe (downtime + tools, no roll). Failure means the parts aren't available now — retry after meaningful in-world time or at a new supply source. Slot count caps simultaneous installs regardless of what's been acquired.
