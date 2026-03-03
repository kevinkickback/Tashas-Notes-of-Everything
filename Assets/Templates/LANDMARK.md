<%*
const { getIcon, getPath, moveAndOpenFile, toCamelCase } = tp.user.utils;

// Open modal form for landmark creation
const result = await MF.openForm('LANDMARK');

// Cancel if form was closed without submission
if (result.status !== 'ok') {
    new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled:</span><br>Landmark has not been added`;
    return;
}

// Declare & normalize variables
const location = result.Location.value;
const name = result.Name.value;
const type = result.Type.value;
const banner = result.Banner.value || "banner.jpg";
const icon = getIcon(type);
const path = getPath(location, "locale");

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
new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New landmark <span style="text-decoration: underline;">${name}</span> added`;
_%>

---
cssClasses: grayTable, wideTable
type: landmark
locations:
 - <% location ? `"[[${location}]]"` : '' %>
tags:
 - <% type ? `location/${toCamelCase(type)}` : '' %>
---
![[<% banner %>|banner]]
###### <% name %>
<span class="sub2"><% type ? `:${icon}: ${type}` : '' %></span>
___

> [!quote|no-t] SUMMARY
>Description of the <% type ? type.toLowerCase() : 'landmark' %> <% name %>.

#### marker
| INVENTORY                  | PRICE |
| -------------------------- | ----- |
| Item 1 | 80 <span class="goldcoin">:RiCoinsFill:</span>  |
| Item 2 | 20 <span class="silvercoin">:RiCoinsFill:</span>   |
| Item 3 | 100 <span class="coppercoin">:RiCoinsFill:</span>  |

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