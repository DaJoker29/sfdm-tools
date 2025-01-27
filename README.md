# sfdm-tools

A set of random generators and tools for running homebrew games of 5th edition Dungeons and Dragons

## A Day's Travel — D&D Travel Aide

**What.** This application leverages custom roll tables and AI-generated prompts to create a brief narrative for the Dungeon Master to recite at the beginning of a day's journey. ~~A random weather generator built for the Wilds of Pavv campaign setting.~~

**How.** The user inputs season and region information along with the desired encounter types. These details are processed against a roll table, and the results are integrated into a text prompt for ChatGPT. It then outputs the ChatGPT response, the roll table values, and (optionally) provides a ~~parameterized~~ link to KoboldPlus.Club. (KPC doesn't accept query parameters.) ~~The tool will accept a few simple options and output a static readout of random weather/travel conditions~~

### Inputs

- **Time of Year (Dropdown)**:
  - Early Winter
  - Mid-Winter
  - Late Winter
  - Early Spring
  - Mid-Spring
  - Late Spring
  - Early Summer
  - Mid-Summer
  - Late Summer
  - Early Autumn
  - Mid-Autumn
  - Late Autumn
- **Region (Dropdown)**:
  - The Trickster's Green (Jungle)
  - The Pale Moon Woods (Forest)
  - The Twindragon Spine (Mountain)
  - The Deadlands (Swamp)
  - Grimtooth Bay (Coast)
  - Angelfearne (Forest)
  - Pilgrim's Landing (Arctic)
  - The White Sand Wilds (Desert)
  - The Birdcage (Mountain)
- **Include Combat Encounter (Checkbox)**: See Appendix.
- **Include Non-Combat Encounter (Checkbox)**: See Appendix.

### Outputs

- **Temperature**:
  - Normal
  - Colder than Normal
  - Warmer than Normal
- **Wind**:
  - No wind
  - Light wind
  - Heavy wind
- **Description**: See Tomorrow.io [Weather Codes](https://github.com/DaJoker29/manteca-weather/blob/main/public/api.js).
- **Weather Icon/Image**: light-rain![light-rain](adt-light-rain.png)
- **Combat Encounter**: Medium Horde Encounter / Environment: Forest / Creature: Beast
- **Non-Combat Encounter**: 1x Social Interaction & 1x Skill Challenge
- **Boxed Text**:
  > **(Travel Conditions)** The humid jungle air clings to your skin, heavy and warm despite the season. Light rain patters against the canopy above, creating a rhythmic drumming that mingles with the chirps and cries of unseen creatures. A gentle wind occasionally stirs the broad leaves, offering fleeting relief from the oppressive heat.
  >
  > **(Combat Encounter)** As you push through a cluster of hanging vines, the underbrush suddenly erupts with motion. A pack of **jungle stalkers**—sleek, panther-like beasts with luminous eyes and camouflaging fur—charges toward you, their snarls echoing through the trees as they defend their territory.
  >
  > **(Social Encounter)** A solitary **jungle trader**, draped in brightly dyed fabrics and laden with wares, blocks your path. They offer rare local goods but demand a story, song, or secret in exchange for their wares.
  >
  > **(Skill Challenge)** A narrow, swaying vine bridge stretches across a mist-shrouded gorge, its damp, rain-slicked ropes creaking ominously with each gust of wind.

## Appendix

### Types of Combat Encounters

> These values can be plugged into [Kobold+ Fight Club](https://koboldplus.club/) to generate combat encounters. **We can also display the environment value from the chosen region to include as an optional filter. And also use the preferred monster type value from the region as well.**

**Difficulty**

- Easy
- Medium
- Hard
- Deadly

**Composition**

- Random
- Boss
- Boss with Minions
- Duo of monsters
- Trio of monsters
- Horde

### Types of Non-Combat Encounters

> We can include checkboxes for these as well to filter what type of non-combat encounters are generated.

- **Social Interactions**: Meetings with influential NPCs like nobles, guild leaders, or mysterious travelers.
- **Puzzles & Riddles**: Ancient ruins or wizard towers filled with mind-bending puzzles.
- **Roleplaying Challenges**: Moral dilemmas, political intrigue, or negotiation scenarios.
- **Environmental Hazards**: Navigating through treacherous terrain, such as a dense foggy forest or a quicksand-filled desert.
- **Mysteries & Investigations**: Solving crimes, uncovering secrets, or tracking a missing person.
- **Skill Challenges**: Tasks requiring a combination of different skills, like sneaking into a guarded library or winning a street performance contest.
- **Random Events**: Unplanned occurrences such as a festival, market day, or an impending natural disaster.
- **Exploration**: Discovering hidden caves, ancient artifacts, or uncharted territories.
