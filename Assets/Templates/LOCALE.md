<%*
const { getIcon, getPath, moveAndOpenFile, toCamelCase } = tp.user.utils;

// Open modal form for locale creation
const result = await MF.openForm('LOCALE');

// Cancel if form was closed without submission
if (result.status !== 'ok') {
    new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled:</span><br>Locale has not been added`;
    return;
}

// Declare & normalize variables
const location = result.Location.value;
const name = result.Name.value;
const type = result.Type.value;
const icon = getIcon(type);
const banner = result.Banner.value || "banner.jpg";

// Resolve parent type to determine path context
const dv = app.plugins.plugins["dataview"]?.api;
const locationPage = dv?.pages().find(p => p.file.name === location);
const locationType = locationPage?.type?.toLowerCase() ?? "territory";
const path = getPath(location, locationType);

// Rename, move, & open note in new tab
const newPath = `Compendium/Atlas/${location ? `${path}/` : ''}${name}/${name}`;
await moveAndOpenFile(tp, name, newPath);

// Apply icon to folder & note
const iconize = app.plugins.plugins["obsidian-icon-folder"];
const folderPath = newPath.replace(/\/[^/]+$/, "");
const notePath = `${newPath}.md`;
iconize.addFolderIcon(folderPath, icon);
iconize.addFolderIcon(notePath, icon);
iconize.api.util.dom.createIconNode(iconize, folderPath, icon);
iconize.api.util.dom.createIconNode(iconize, notePath, icon);

// Show success notification
new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New locale <span style="text-decoration: underline;">${name}</span> added`;
_%>

---
type: locale
locations:
 - <% location ? `"[[${location}]]"` : '' %>
tags:
 - <% type ? `location/${toCamelCase(type)}` : '' %>
---
![[<% banner %>|banner]]
###### <% name %>
<span class="sub2"><% type ? `:${icon}: ${type}` : "" %></span>
___

> [!quote|no-t] SUMMARY
>Description of the <% type ? type.toLowerCase() : "locale" %> <% name %>.

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
> >     name: Landmarks
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