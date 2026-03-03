<%*
const { toCamelCase, moveAndOpenFile, yamlList } = tp.user.utils;

// Open modal form for player character creation
const result = await MF.openForm('PC');

// Cancel if form was closed without submission
if (result.status !== 'ok') {
  new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled:</span><br>Player character has not been added`;
    return;
}

// Declare & normalize variables
const name = result.Name.value;
const level = result.Level;
const race = result.Race;
const portrait = result.Portrait.value || "/Assets/Images/Portrait.jpg";
const quote = result.Quote;
const pClass = result.pClass.value?.length ? result.pClass.value : [];
const subClass = result.pClass.value?.length ? result.subClass.value : [];
const tags = [
  ...pClass.map(v => ` - class/${toCamelCase(v)}`),
  ...subClass.map(v => ` - subclass/${toCamelCase(v)}`),
  race ? ` - race/${toCamelCase(race)}` : null
].filter(Boolean).join("\n") || " -";

// Apply icon to note
const iconize = app.plugins.plugins["obsidian-icon-folder"];
const icon = "RiSwordFill";
const notePath = `Compendium/Party/Player Characters/${name}.md`;
iconize.addFolderIcon(notePath, icon);
iconize.api.util.dom.createIconNode(iconize, notePath, icon);

// Rename & open note in new tab
await moveAndOpenFile(tp, name);

// Show success notification
new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New player character <span style="text-decoration: underline;">${name}</span> added`;
-%>
---
type: pc
level: "<% level %>"
race: "<% race %>"
class:
<% pClass.length ? yamlList(pClass) : ' - ""' %>
subClass:
<% subClass.length ? yamlList(subClass) : ' - ""'  %>
cover: "<% portrait %>"
tags:
<% tags %>
---

###### <% name %>
:FasPerson: Player Character &nbsp; | &nbsp; :FasQuoteLeft: <% quote %> :FasQuoteRight:
___

> [!infobox|no-t right]
> ![[<% portrait %>]]
> ###### Details:
> | Type | Stat |
> | ---- | ---- |
> | :FasCrown: Level |  `=this.level` |
>| :RiSwordFill: Class |`=join(this.class, "<br>")`|
> | :FasFireFlameCurved: Archetype |  `=join(this.subClass, "<br>")`|
> | :FasUserGroup: Race |  `=this.race` |

> [!quote|no-t]
> Character description here

> [!column|flex 3]
>> [!info]- STORYLINES:
> > ```base
> > properties:
> >   file.name:
> >     displayName: Name
> > views:
> >   - type: table
> >     name: Name
> >     filters:
> >       and:
> >         - file.inFolder("Compendium/Party/Quests")
> >         - file.hasLink(this.file)
> > ```
>
>> [!note]- HISTORY
> > ```base
> > properties:
> >   file.name:
> >     displayName: Name
> > views:
> >   - type: table
> >     name: Session Notes
> >     filters:
> >       and:
> >         - file.inFolder("Session Notes")
> >         - file.hasLink(this.file)
> > ```