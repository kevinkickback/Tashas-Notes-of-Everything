<%*
const { moveAndOpenFile } = tp.user.utils;

// Open modal form for organization creation
const result = await MF.openForm('ORGANIZATION');

// Cancel if form was closed without submission
if (result.status !== 'ok') {
    new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled:</span><br>Organization has not been added`;
    return;
}

// Declare & normalize variables
const alignment = result.Alignment.value;
const name = result.Name.value;
const location = result.Location.value;
const image = result.Image.value || "embed.jpg";

// Rename & open note in new tab
await moveAndOpenFile(tp, name);

// Apply icon to note
const iconize = app.plugins.plugins["obsidian-icon-folder"];
const notePath = `Compendium/Lore/Organizations/${name}.md`;
iconize.addFolderIcon(notePath, "LiVenetianMask");
iconize.api.util.dom.createIconNode(iconize, notePath, "LiVenetianMask");

// Show success notification
new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New organization <span style="text-decoration: underline;">${name}</span> added`;
_%>

---
type: organization
locations:
 - <% location ? `"[[${location}]]"` : '' %>
tags:
 - 
---

###### <% name %>
<span class="sub2">:FasSitemap: Organization</span>
___

> [!quote|no-t]
>![[<% image %>|right wm-sm]]Profile of <% name %>, the <% alignment ? alignment.toLowerCase() : 'unknown' %> aligned organization.

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