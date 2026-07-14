
# Demolitionist

*Artificer Subclass — Campaign homebrew for Heretics of the Old Gods*

## Overview

Where an Artillerist builds a weapon and fires it, a Demolitionist builds the explosion and decides *when* it happens. In a city layered over collapsing Aeorian ruins, where half the dangerous work is bringing down a wall without bringing down the ceiling, controlled demolition is a real trade — and the same expertise that shores up a dig site or breaches a sealed vault makes a person very dangerous in a fight. A Demolitionist doesn't just throw bombs. They rig charges, set triggers, and shape collapses. The blast goes off exactly where and when they meant it to — and they've learned to be somewhere else when it does.

## Demolitionist Spells

You always have the following spells prepared once you reach the levels shown. They don't count against the number of spells you know.

| Artificer Level | Spells |
|:---|:---|
| 3rd | *thunderwave, catapult* |
| 5th | *shatter, pyrotechnics* |
| 9th | *fireball, flame arrows* |
| 13th | *fabricate, wall of fire* |
| 17th | *immolation, destructive wave* |

## Features

### 3rd Level: Tools of the Trade

You gain proficiency with tinker's tools and with **Dexterity saving throws** — a Demolitionist learns to be clear of their own blasts. If you already have tinker's tools proficiency, gain proficiency with one other type of artisan's tools.

### 3rd Level: Bombs

You can build explosive charges. When you finish a long rest, you can create a number of **bombs** equal to your **level in this class**, provided you have tinker's tools. You can also create one as an action by expending a spell slot of 1st level or higher. Bombs persist until used or until you finish your next long rest.

Your bombs deal damage in **Bomb Dice**, scaling with your level in this class: **d6** at 3rd, **d8** at 5th, **d10** at 9th, **d12** at 15th.

A bomb detonates in a **10-foot-radius sphere**. Each creature in the area makes a Dexterity saving throw against your artificer spell save DC, taking **2 Bomb Dice** damage on a failure, half on a success. **The blast does not distinguish friend from foe — every creature in the radius is affected, including your allies and you.** Choose the damage type and rider effect from *Bomb Types* when you build the bomb.

**Using a bomb — two methods:**
- **Throw** (action): make a ranged attack with the bomb (using Intelligence, proficient), up to 60 feet.
  - Against a creature, the attack is against the target's AC. Against a point in space, it is against **DC 12**.
  - *On a hit,* the bomb detonates centered where you aimed.
  - *On a miss,* it still detonates, but scatters. Roll 1d8 for direction (the eight compass points from your target), and it lands a number of 5-foot squares away equal to **how far under the AC or DC you rolled** (miss by 3 → 3 squares → 15 feet). Because the blast is a 10-foot radius, a near miss will often still catch the intended target; a bad miss sails clear — potentially back toward you.
- **Prime** (action): affix the bomb to an object, surface, or point within reach — no attack roll; placement is exact. Choose a **trigger** when you prime it.

**Triggers** (chosen at priming):
- **Remote:** you detonate it with your reaction, any time it's in your line of sight.
- **Delay:** it detonates at the start of one of your later turns; set the number of rounds when you prime it.
- **Proximity:** it detonates when a creature enters or starts its turn within the blast radius.
- **Contact:** it detonates when the primed object is touched, moved, or disturbed.

### 3rd Level: Bomb Types

When you build a bomb, choose its type; more become available as you level.
- **Fragmentation** (3rd): deals **piercing** damage. A creature that fails the save can't take reactions until the start of its next turn.
- **Incendiary** (3rd): deals **fire** damage. The area becomes difficult terrain wreathed in flame until the start of your next turn, and flammable objects and structures in the radius catch fire and continue burning after the effect ends.
- **Concussive** (3rd): deals **thunder** damage. A creature that fails the save is pushed 10 feet from the center and knocked prone.
- **Corrosive** (5th): deals **acid** damage. A creature that fails has its AC reduced by 1 until its armor is tended, or until it finishes a short rest.
- **Cryo** (9th): deals **cold** damage. A creature that fails has its speed halved until the start of your next turn.
- **Shock** (9th): deals **lightning** damage. A creature that fails can't take reactions and has disadvantage on its next attack roll.

### 5th Level: Shaped Charges

You've learned to read a structure and shape a blast. A number of times per short or long rest (**twice at 5th level, three times at 9th, four times at 15th**), when you detonate a bomb you can either:
- **Focus** it — halve the radius, but one creature in the area takes an extra Bomb Die of damage; or
- **Spread** it — increase the radius by 10 feet, but damage drops to 1 Bomb Die.

Additionally, your bombs deal **double damage to objects and structures**.

### 9th Level: Chain Reaction

When you detonate a bomb, you can detonate any number of other primed bombs within 60 feet as part of the same action or reaction. Additionally, when a creature fails its save against your bomb by 5 or more, its rider effect is intensified — the DM applies a stronger version (pushed further and knocked prone, flame that also deals ongoing damage, speed reduced to 0, and so on).

### 15th Level: Walking Ordnance

You can build a bomb that carries itself. When you create a bomb, you can designate it **mobile** — legs, treads, or a crude arcane motor. A mobile bomb is Small, has a speed of 30 feet, AC 12, and 10 hit points. On your turn you can use a bonus action to move it up to its speed toward a point or creature you choose; it can take any trigger as normal.

If a mobile bomb is reduced to 0 hit points, whoever dealt the final blow rolls a d20: on an **18 or higher** it's cleanly neutralized and doesn't go off; on anything lower, it **detonates** where it stands. You can have one mobile bomb active at a time.
