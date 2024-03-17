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
      obsidian.Platform.isMobile ? `:fas_crown: Level ${p.level}<br>:fas_user_group: ${p.race}<br>:rif_sword: ${p.class}` : `:fas_crown: Level ${p.level} / :fas_user_group: ${p.race} / :rif_sword: ${p.class}`
    ])
);
```

> [!npc]-   NPC's<br><span class="sub">Non-Player Character</span>
> ```dataviewjs
> dv.container.className += ' listMe';
> let pages = dv.pages('"Compendium/NPC\'s"').sort(p => p.file.name, "asc");  
> dv.table(["Name"], pages.map(page => [`- ${page.headerLink}`]));
>```
> `BUTTON[npc]`

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
> `BUTTON[quest]`

> [!genloc]-  Locations<br><span class="sub">Countries, Settlements, & Topography</span>
> ```dataviewjs
> dv.container.className += ' listMe';
> let pages = dv.pages('"Compendium/Atlas"').sort(p => p.file.name, "asc");  
> dv.table(["Name", "Type"], pages.map(page => [`- ${page.headerLink} (${page.type})`, page.type]));
>```
>`BUTTON[world, region, locale, landmark]`

> [!lore]-  Lore & Mythos<br><span class="sub">Factions, Gods, Relics, & More</span> 
> ```dataviewjs
> dv.container.className += ' listMe';
> let pages = dv.pages('"Compendium/Lore"').sort(p => p.file.name, "asc");  
>dv.table(["Name", "Type"], pages.map(page => [`- ${page.headerLink} (${page.type})`, page.type]));
>```
> `BUTTON[lore]`
 
> [!session]-  Session Notes<br><span class="sub">Summaries, Transcripts, & Notes</span>
> ```dataviewjs
> dv.container.className += ' listMe';
> let pages = dv.pages('"Session Notes"').sort(p => p.file.name, "desc");  
>dv.table(["Date"], pages.map(page => [`- ${page.headerLink}`]));
>```
> `BUTTON[notes]`

```meta-bind-button
label: "+ ADD NPC"
id: npc
hidden: true
class: "callButton"
style: default
action:
  type: command
  command: quickadd:choice:7e0e1179-f10d-42d9-92a4-f6d283d7dbce
```
```meta-bind-button
label: "+ ADD QUEST"
id: quest
hidden: true
class: "callButton"
style: default
action:
  type: command
  command: quickadd:choice:18f3879e-f9bd-42b5-94f0-6622048b334f
```
```meta-bind-button
label: "+ EXPAND WORLD"
id: world
hidden: true
class: "callButton"
style: default
action:
  type: command
  command: quickadd:choice:493dbec9-29f0-4cc4-8b66-fa06b046903b
```
```meta-bind-button
label: "+ ADD REGION"
id: region
hidden: true
class: "callButton"
style: default
action:
  type: command
  command: quickadd:choice:515787be-a138-474b-b004-10d2a252710e
```
```meta-bind-button
label: "+ ADD LOCALE"
id: locale
hidden: true
class: "callButton"
style: default
action:
  type: command
  command: quickadd:choice:deed9b32-4e1c-45fd-a967-960c0829555c
```
```meta-bind-button
label: "+ ADD LANDMARK"
id: landmark
hidden: true
class: "callButton"
style: default
action:
  type: command
  command: quickadd:choice:7a59aa14-a2aa-4a56-8fc1-42458878ecd3
```
```meta-bind-button
label: "+ ADD LORE"
id: lore
hidden: true
class: "callButton"
style: default
action:
  type: command
  command: quickadd:choice:a600a363-6f6f-448a-b444-6074f0fe0ff2
```
```meta-bind-button
label: "+ ADD NOTE"
id: notes
hidden: true
class: "callButton"
style: default
action:
  type: command
  command: quickadd:choice:31ca0e1f-5968-4ba9-a196-7d9e45725ec4
```