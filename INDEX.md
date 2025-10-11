---
cssClasses: index
---
![[compendium.jpg|banner]]
###### <span class="head">Campaign Journal</span> 

```base
formulas:
  Level: '[icon("crown"), level]'
  Race: '[icon("user"), race]'
  Class: '[icon("swords"), class]'
  Details: |
    [icon("crown"), Level, "\u00A0 | \u00A0", icon("user"), Race, "\u00A0 | \u00A0", icon("swords"), Class]
views:
  - type: cards
    name: Cards
    filters:
      and:
        - file.inFolder("Compendium/Party/Player Characters")
    order:
      - file.name
      - formula.Details
    image: note.cover
    imageAspectRatio: 1.15
    imageFit: ""
    cardSize: 310

```

> [!npc]-   NPC's<br><span class="sub">Non-Player Characters</span>
> ```base
> formulas:
>   RaceCard: |
>    list(file.tags)
>      .filter(value.startsWith("#race"))
>      .map(
>        "(" + value
>          .replace("#race/", "")
>          .replace("half", "half ")
>          .replace("yuanTi", "yuan ti ")
>         .replace("simic", "simic ")
>          .lower() + ")"
>      )
>   Race: |
>    list(file.tags)
>      .filter(value.startsWith("#race"))
>      .map(
>        value
>          .replace("#race/", "")
>          .replace("half", "half ")
>          .replace("yuanTi", "yuan ti ")
>         .replace("simic", "simic ")
>          .lower()
>      )
>
> properties:
>   file.name:
>     displayName: Name
>     
> views:
>   - type: cards
>     name: Cards
>     filters:
>       and:
>         - file.inFolder("Compendium/NPC's")
>     order:
>       - file.name
>       - formula.RaceCard
>
>   - type: table
>     name: List
>     filters:
>       and:
>         - file.inFolder("Compendium/NPC's")
>     order:
>       - file.name
>       - formula.Race
> ```
> ---
> `BUTTON[npc]`

> [!agenda]-  The Party<br><span class="sub">Objectives, Players, & Quests</span>
> ```base
> formulas:
>   StatusCard: |
>    list(file.tags)
>      .map("(" + value.replace("#quest/", "") + ")")
>   Status: |
>    list(file.tags)
>      .map(value.replace("#quest/", ""))
>
> properties:
>   file.name:
>     displayName: Name
>     
> views:
>   - type: cards
>     name: Cards
>     filters:
>       and:
>         - file.inFolder("Compendium/Party/Quests")
>     order:
>       - file.name
>       - formula.StatusCard
>
>   - type: table
>     name: List
>     filters:
>       and:
>         - file.inFolder("Compendium/Party/Quests")
>     order:
>       - file.name
>       - formula.Status
> ```
> ---
> `BUTTON[pc]` `BUTTON[quest]`

> [!genloc]-  Locations<br><span class="sub">Countries, Settlements, & Topography</span>
> ```base
> formulas:
>   Type: |
>    list(type)
>      .map("(" + value + ")")
>
> properties:
>   file.name:
>     displayName: Name
>     
> views:
>   - type: cards
>     name: Cards
>     filters:
>       and:
>         - file.inFolder("Compendium/Atlas")
>     order:
>       - file.name
>       - formula.Type
>
>   - type: table
>     name: List
>     filters:
>       and:
>         - file.inFolder("Compendium/Atlas")
>     order:
>       - file.name
>       - type
> ```
> ---
>`BUTTON[plane, realm, continent, territory, province, locale, landmark]`

> [!lore]-  Lore & Mythos<br><span class="sub">Factions, Gods, Relics, & More</span> 
> ```base
> formulas:
>   Type: |
>    list(type)
>      .map("(" + value + ")")
>
> properties:
>   file.name:
>     displayName: Name
>     
> views:
>   - type: cards
>     name: Cards
>     filters:
>       and:
>         - file.inFolder("Compendium/Lore")
>     order:
>       - file.name
>       - formula.Type
>     
>   - type: table
>     name: List
>     filters:
>       and:
>         - file.inFolder("Compendium/Lore")
>     order:
>       - file.name
>       - type
> ```
> ---
> `BUTTON[deity, event, object, org]`
 
> [!session]-  Session Notes<br><span class="sub">Summaries, Transcripts, & Notes</span>
> ```base
> formulas:
>   Date: |
>    list(date)
>      .map("(" + value + ")")
>
> properties:
>   file.name:
>     displayName: Name
>     
> views:
>   - type: cards
>     name: Cards
>     filters:
>       and:
>         - file.inFolder("Session Notes")
>     order:
>       - file.name
>       - formula.Date
>     
>   - type: table
>     name: List
>     filters:
>       and:
>         - file.inFolder("Session Notes")
>     order:
>       - file.name
>       - date
> ```
> ---
> `BUTTON[note]`