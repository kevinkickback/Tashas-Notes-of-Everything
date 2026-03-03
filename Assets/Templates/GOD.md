<%*
const { toCamelCase, moveAndOpenFile } = tp.user.utils;

// Open modal form for deity creation
const result = await MF.openForm('GOD');

// Cancel if form was closed without submission
if (result.status !== 'ok') {
    new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled:</span><br>Deity has not been added`;
    return;
}

// Declare & normalize variables
const alignment = result.Alignment.value;
const name = result.Name.value;
const gender = result.Gender.value;
const domains = result.Domains.value;
const pantheon = result.Pantheon.value;
const portrait = result.Portrait.value;
const tags = domains ? domains.map(value => `- domain/${toCamelCase(value)}`).join("\n") : '-';

// Rename & open note in new tab
await moveAndOpenFile(tp, name);

// Apply icon to note
const iconize = app.plugins.plugins["obsidian-icon-folder"];
const icon = "RiCrossFill"
const notePath = `Compendium/Lore/Deities/${name}.md`;
iconize.addFolderIcon(notePath, icon);
iconize.api.util.dom.createIconNode(iconize, notePath, icon);

// Show success notification
new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New deity <span style="text-decoration: underline;">${name}</span> added`;
_%>

---
type: deity
tags:
<% tags ? tags : ' - ' %>
---

###### <% name %>
<span class="sub2">:FasCross: Deity <% alignment ? `&nbsp; | &nbsp; :FasYinYang: ${alignment}` : '' %></span>
___

> [!infobox|no-t right]
> <% portrait ? `![[${portrait}]]` : '![[portrait.jpg]]' %> 
> ###### Details:
> | Type | Stat |
> | ---- | ---- |
> | :FasBoltLightning: Domains | <% domains ? domains.join('<br>') : '' %> |
> | :FasVenusMars: Gender | <% gender ? gender : '' %> |
> | :FasBuildingColumns: Pantheon | <% pantheon ? pantheon.join('<br>') : '' %> |

> [!quote|no-t]
>Profile of <% name %>, the <% alignment ? alignment.toLowerCase() : '' %> <% gender ? gender.toLowerCase() : '' %> deity.

> [!column|flex 3]
> > [!hint]- NPC's
> > ```base
> > properties:
> >   file.name:
> >     displayName: Name
> > views:
> >   - type: table
> >     name: Name
> >     filters:
> >       and:
> >         - file.inFolder("Compendium/NPC's")
> >         - or:
>>                - file.hasLink(this.file)
>>                - file.hasLink("Add affiliation here")
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