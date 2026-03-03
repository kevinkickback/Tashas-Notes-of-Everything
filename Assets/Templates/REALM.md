<%*
const { getPath, moveAndOpenFile } = tp.user.utils;

// Open modal form for realm creation
const result = await MF.openForm('REALM');

// Cancel if form was closed without submission
if (result.status !== 'ok') {
    new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled:</span><br>Realm has not been added`;
    return;
}

// Declare & normalize variables
const location = result.Location.value;
const name = result.Name.value;
const banner = result.Banner.value || "banner.jpg";
const path = getPath(location, "plane");

// Rename, move, & open note in new tab
const newPath = `Compendium/Atlas/${location ? `${path}/` : ''}${name}/${name}`;
await moveAndOpenFile(tp, name, newPath);

// Apply icon to folder & note
const iconize = app.plugins.plugins["obsidian-icon-folder"];
const icon = "FasGlobe";
const folderPath = newPath.replace(/\/[^/]+$/, "");
const notePath = `${newPath}.md`;
iconize.addFolderIcon(folderPath, icon);
iconize.addFolderIcon(notePath, icon);
iconize.api.util.dom.createIconNode(iconize, folderPath, icon);
iconize.api.util.dom.createIconNode(iconize, notePath, icon);

// Show success notification
new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New realm <span style="text-decoration: underline;">${name}</span> added`;
_%>

---
type: realm
locations:
 - <% location ? `"[[${location}]]"` : '' %>
tags:
 - 
---
![[<% banner %>|banner]]
###### <% name %>
<span class="sub2">:RiGlobalLine: Realm (world)</span>
___

> [!quote|no-t] SUMMARY
>Description of the realm <% name %>.

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
> >     name: Continents
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