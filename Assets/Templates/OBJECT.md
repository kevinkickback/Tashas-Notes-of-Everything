<%*
const { getIcon, moveAndOpenFile, toCamelCase } = tp.user.utils;

// Open modal form for object creation
const result = await MF.openForm('OBJECT');

// Cancel if form was closed without submission
if (result.status !== 'ok') {
    new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled:</span><br>Object has not been added`;
    return;
}

// Declare & normalize variables
const name = result.Name.value;
const type = result.Type.value;
const image = result.Image.value || "embed.jpg"
const icon = getIcon(type);

// Rename & open note in new tab
await moveAndOpenFile(tp, name);

// Apply icon to note
const iconize = app.plugins.plugins["obsidian-icon-folder"];
const notePath = `Compendium/Lore/Objects/${name}.md`;
iconize.addFolderIcon(notePath, icon);
iconize.api.util.dom.createIconNode(iconize, notePath, icon);

// Show success notification
new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New object <span style="text-decoration: underline;">${name}</span> added`;
_%>

---
type: object
tags:
 - <% type ? "object/" + toCamelCase(type) : '' %>
---

###### <% name %>
<span class="sub2"><% type ? `:${icon}: ${type}` : '' %></span>
___

> [!quote|no-t]
>![[<% image %>|right wm-sm]]Description of the  <% type ? type.toLowerCase() : 'object' %>, <% name %>.
<span class="clearfix"></span>

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