<%*
const { moveAndOpenFile } = tp.user.utils;

// Open modal form for plane creation
const result = await MF.openForm('PLANE');

// Cancel if form was closed without submission
if (result.status !== 'ok') {
  new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled:</span><br>Plane has not been added`;
  return;
}

// Declare & normalize variables
const name = result.Name.value;
const banner = result.Banner.value || "banner.jpg";

// Apply icon to folder & note
const iconize = app.plugins.plugins["obsidian-icon-folder"];
const icon = "FasCircleHalfStroke"
const newPath = `Compendium/Atlas/${name}/${name}`;
const folderPath = newPath.replace(/\/[^/]+$/, "");
const notePath = `${newPath}.md`;
iconize.addFolderIcon(folderPath, icon);
iconize.addFolderIcon(notePath, icon);
iconize.api.util.dom.createIconNode(iconize, folderPath, icon);
iconize.api.util.dom.createIconNode(iconize, notePath, icon);

// Rename, move, & open note in new tab
await moveAndOpenFile(tp, name, newPath);

// Show success notification
new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New plane <span style="text-decoration: underline;">${name}</span> added`;
-%>
---
type: plane
tags:
 - 
---
![[<% banner %>|banner]]
###### <% name %>
<span class="sub2">:FasCircleHalfStroke: Plane of Existence</span>
___

> [!quote|no-t] SUMMARY
>Description of the plane <% name %>.

> [!column|flex 3]
> > [!hint]- NPC's
> > ```base
> > formulas:
> >   LinkedIndirectly: |
> >     locations.contains(this.file)
> >     || list(locations)
> >          .filter(file(value)
> >            && list(file(value).properties.locations).contains(this))
> >          .length > 0
> > 
> > properties:
> >   file.name:
> >     displayName: Name
> > 
> > views:
> >   - type: table
> >     name: This Location Only
> >     filters:
> >       and:
> >         - file.inFolder("Compendium/NPC's")
> >         - locations.contains(this.file)
> > 
> >   - type: table
> >     name: Sub-Locations Included
> >     filters:
> >       and:
> >         - file.inFolder("Compendium/NPC's")
> >         - formula.LinkedIndirectly
> > ```
>
>> [!example]- LOCATIONS
> > ```base
> > properties:
> >   file.name:
> >     displayName: Name
> > views:
> >   - type: table
> >     name: Realms
> >     filters:
> >       and:
> >         - file.inFolder("Compendium/Atlas")
> >         - locations.contains(this.file)
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