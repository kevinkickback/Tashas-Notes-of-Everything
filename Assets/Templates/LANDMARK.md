<%*
// ###########################################################
//                        Helper Functions
// ###########################################################

// Convert string to camelCase
function toCamelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|\s+|[-_])/g, (match, index) =>
      index === 0 ? match.toLowerCase() : match.toUpperCase()
    )
    .replace(/[\s-_]+/g, '');
}

// Return icon based on type
function getIcon(type) {
  const iconMappings = {
    Blacksmith: ':FasHammer:',
    Camp: ':FasCampground:',
    Guildhall: ':FasShield:',
    Inn: ':FasBed:',
    Library: ':FasBookOpen:',
    Market: ':FasScaleUnbalanced:',
    Port: ':FasSailboat:',
    Residence: ':FasHouse:',
    Shop: ':FasCartShopping:',
    Stable: ':FasHorseHead::',
    Tavern: ':RiBeerLine:',
    Temple: ':FasChurch:',
  };

  return iconMappings[type] || ':FasCircleQuestion:';
}

// Return modified path based on location
const dv = app.plugins.plugins.dataview.api;
function getPath(location) {
	const match = dv.pages('"Compendium/Atlas"')
		.where(p => p.type === 'locale' && p.file.name === location)
		.map(obj => obj.file.path.split('/').slice(2, -1).join('/'))
		.find(Boolean);

	return match || '';
}

// ###########################################################
//                        Main Code Section
// ###########################################################

// Call modal form & declare variables
const result = await MF.openForm('LANDMARK');
const location = result.Location.value;
const name = result.Name.value;
let type = result.Type.value;
const icon = getIcon(type);
const path = getPath(location);

if (result.status === 'ok') {

  // Rename file & open in new tab
  const newPath = `Compendium/Atlas/${location ? `${path}/` : ''}${name}/${name}`;
  await tp.file.move(newPath);
  await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(name));

  // Save & display file-explorer icons
  const iconize = app.plugins.plugins["obsidian-icon-folder"];
  const folderPath = newPath.replace(/\/[^/]+$/, "");
  const notePath = `${newPath}.md`;
  iconize.addFolderIcon(folderPath, icon.replace(/:/g, ''));
  iconize.addFolderIcon(notePath, icon.replace(/:/g, ''));
  iconize.api.util.dom.createIconNode(iconize, folderPath, icon.replace(/:/g, ''));
  iconize.api.util.dom.createIconNode(iconize, notePath, icon.replace(/:/g, ''));

  // Fire success toast notification
  new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New landmark <span style="text-decoration: underline;">${name}</span> added`;

} else {

  // Fire cancel toast notification
  new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled:</span><br>Landmark has not been added`;
  return;
}
_%>

---
cssClasses: grayTable, wideTable
type: landmark
locations:
 - <% location ? `"[[${location}]]"` : '' %>
tags:
 - <% type ? `location/${toCamelCase(type)}` : '' %>
---

![[banner.jpg|banner]]
###### <% name %>
<span class="sub2"><% type ? `${icon} ${type}` : '' %></span>
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