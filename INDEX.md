---
cssClasses: index, cards, cards-cover, update
---
![[compendium.jpg|banner]]
###### <span class="head">Campaign Journal</span> 

```dataviewjs
// Set base path
var vault = this.app.vault.adapter.getResourcePath("").split("?")[0];

// Display PC card table
dv.table(["cover", "name", "details"],
  dv.pages(`"Compendium/Party/Player Characters"`)
  .sort(page => page.file.name, "asc")
    .map(p => [
      `![](${vault}/${p.cover})`, // For image link use: [![](${vault}/${p.cover})](<${p.file.name}#${p.file.name}>)
      p.headerLink,
      `:fas_crown: Level ${p.level} / :rif_user_3: ${p.race} / :rif_sword: ${p.class}`
    ])
);
```

> [!npc]-   NPC's<br><span class="sub">Non-player Character</span>
>```dataview
>LIST WITHOUT ID headerLink
> FROM "Compendium/NPC's"
>SORT file.name ASC
>```
> ```button
>name + ADD NPC
>type command
>action QuickAdd: What is the NPC's name?
>```

> [!agenda]-  Agenda<br><span class="sub">Objectives, Pursuits, & Quests</span>
>```dataview
>LIST WITHOUT ID headerLink
> FROM "Compendium/Party/Quests"
>SORT file.path ASC
>```
> ```button
>name + ADD QUEST
>type command
>action QuickAdd: What is the name of the quest?
>```

> [!genloc]-  Locations<br><span class="sub">Countries, Settlements, & Topography</span>
> PLANES:
 >```dataview
 >LIST WITHOUT ID headerLink
 >FROM "Compendium/Atlas" 
 >WHERE type = "plane"
 >SORT file.name ASC
 >```
 > REALMS:
 >```dataview
 >LIST WITHOUT ID headerLink
 >FROM "Compendium/Atlas" 
 >WHERE type = "realm"
 >SORT file.name ASC
 >```
 > CONTINENTS / OCEANS:
 >```dataview
 >LIST WITHOUT ID headerLink
 >FROM "Compendium/Atlas" 
 >WHERE type = "continent"
 >SORT file.name ASC
 >```
 > REGIONS:
 >```dataview
 >LIST WITHOUT ID headerLink
 >FROM "Compendium/Atlas" 
 >WHERE type = "region"
 >SORT file.name ASC
 >```
 > LOCALES:
 >```dataview
 >LIST WITHOUT ID headerLink
 >FROM "Compendium/Atlas" 
 >WHERE type = "locale"
 >SORT file.name ASC
 >```
>LANDMARKS:
 >```dataview
 >LIST WITHOUT ID headerLink
 >FROM "Compendium/Atlas" 
 >WHERE type = "landmark"
 >SORT file.name ASC
 >```
  > ```button
>name + EXPAND WORLD
>type command
>action QuickAdd: LocSelect
>```
 > ```button
>name + ADD REGION
>type command
>action QuickAdd: What is the name of the region?
>```
>  ```button
>name + ADD LOCALE
>type command
>action QuickAdd: What is the name of the locale?
>```
>  ```button
>name + ADD LANDMARK
>type command
>action QuickAdd: What is the name of the landmark?
>```

> [!lore]-  Lore & Organizations<br><span class="sub">Factions, Gods, Relics, & More</span> 
>```dataview
>LIST WITHOUT ID headerLink
>FROM "Compendium/Lore & Other"
>SORT file.name ASC
>```
> ```button
>name + ADD LORE
>type command
>action QuickAdd: LorSelect
>```
 
> [!session]-  Session Notes<br><span class="sub">Summaries, Transcripts, & Notes</span>
>```dataview
>LIST WITHOUT ID headerLink
>FROM "Session Notes"
>SORT file.ctime DESC
>```
 > ```button
>name + ADD NOTE
>type command
>action QuickAdd: What is the title for today's Session Note?
>```