---
cssClasses: index
---
![[compendium.jpg|banner]]
###### <span class="head">Campaign Journal</span> 

```dataviewjs
// Set path and class
const vault = this.app.vault.adapter.getResourcePath("").split("?")[0];
dv.container.className += ' hideSort cards';

// Display PC card table
dv.table(["cover", "name", "details"],
  dv.pages(`"Compendium/Party/Player Characters"`)
  .sort(page => page.file.name, "asc")
    .map(p => [
      `![](${vault}/${p.cover})`, // For image link use: [![](${vault}/${p.cover})](<${p.file.name}#${p.file.name}>)
      p.headerLink,
      obsidian.Platform.isMobile ? `:fas_crown: Level ${p.level}<br>:rif_user_3: ${p.race}<br>:rif_sword: ${p.class}` : `:fas_crown: Level ${p.level} / :rif_user_3: ${p.race} / :rif_sword: ${p.class}`
    ])
);
```

> [!npc]-   NPC's<br><span class="sub">Non-Player Character</span>
> ```dataviewjs
> dv.container.className += ' listMe';
> let pages = dv.pages('"Compendium/NPC\'s"').sort(p => p.file.name, "asc");  
> dv.table(["Name"], pages.map(page => [`- ${page.headerLink}`]));
>```
> ```button
>name + ADD NPC
>type command
>action QuickAdd: NPC's name?
>```

> [!agenda]-  Agenda<br><span class="sub">Objectives, Pursuits, & Quests</span>
>```dataviewjs
>dv.container.className += ' listMe';
>let tags = [];
>let pages = dv.pages('"Compendium/Party/Quests"').sort(p => p.file.name, "asc");
>dv.table(["Name", "Status"], pages.map(page => {
>const questStatusTerms = ["quest/completed", "quest/abandoned", "quest/failed", "quest/ongoing", "quest/pending"];
>let status = questStatusTerms.find(term => page.tags && page.tags.includes(term));
>status = status ? `(${status.replace("quest/", "")})` : "";
>return [`- ${page.headerLink} ${status}`, status];
>}));
>```
> ```button
>name + ADD QUEST
>type command
>action QuickAdd: Quest name?
>```

> [!genloc]-  Locations<br><span class="sub">Countries, Settlements, & Topography</span>
> ```dataviewjs
> dv.container.className += ' listMe';
> let pages = dv.pages('"Compendium/Atlas"').sort(p => p.file.name, "asc");  
> dv.table(["Name", "Type"], pages.map(page => [`- ${page.headerLink} (${page.type})`, page.type]));
>```
> ```button
>name + EXPAND WORLD
>type command
>action QuickAdd: LocSelect
>```
 > ```button
>name + ADD REGION
>type command
>action QuickAdd: Region name?
>```
>  ```button
>name + ADD LOCALE
>type command
>action QuickAdd: Locale name?
>```
>  ```button
>name + ADD LANDMARK
>type command
>action QuickAdd: Landmark name?
>```

> [!lore]-  Lore & Mythos<br><span class="sub">Factions, Gods, Relics, & More</span> 
> ```dataviewjs
> dv.container.className += ' listMe';
> let pages = dv.pages('"Compendium/Lore"').sort(p => p.file.name, "asc");  
>dv.table(["Name", "Type"], pages.map(page => [`- ${page.headerLink} (${page.type})`, page.type]));
>```
> ```button
>name + ADD LORE
>type command
>action QuickAdd: LorSelect
>```
 
> [!session]-  Session Notes<br><span class="sub">Summaries, Transcripts, & Notes</span>
> ```dataviewjs
> dv.container.className += ' listMe';
> let pages = dv.pages('"Session Notes"').sort(p => p.file.name, "desc");  
>dv.table(["Date"], pages.map(page => [`- ${page.headerLink}`]));
>```
 > ```button
>name + ADD NOTE
>type command
>action QuickAdd: Session Note title?
>```