<%*
// ###########################################################
//                        Helper Functions
// ###########################################################

// Convert string to camelCase
function toCamelCase(str) {
	return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, '');
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

// Call modal form
const result = await MF.openForm('LANDMARK');

// Set variables after result returns values
const location = result.Location.value;
const name = result.Name.value;
let type = result.Type.value;
const icon = getIcon(type);
const path = getPath(location);

if (type === 'Manual') {
	type = await tp.system.prompt('Enter type:', 'Leave blank for none', true);
	type = type === 'Leave blank for none' || '' ? '' : type;
}

// Rename, move, & open markdown file
await tp.file.move(`Compendium/Atlas/${location ? `${path}/` : ''}${name}`);
await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(name));
new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New landmark <span style="text-decoration: underline;">${name}</span> added`;
_%>

---
cssClasses: grayTable, wideTable
type: landmark
locations:
 - <% location ? `"[[${location}]]"` : '' %>
tags:
 - <% type ? `location/${toCamelCase(type)}` : '' %>
headerLink: "[[<% name %>#<% name %>]]"
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

#### marker
> [!column|flex 3]
> > [!hint]-  NPC's
> >```dataview
LIST WITHOUT ID headerLink
FROM "Compendium/NPC's" AND [[<% name %>]]
SORT file.name ASC
> 
>> [!note]- HISTORY
>>```dataview
LIST WITHOUT ID headerLink
FROM "Session Notes" AND [[<% name %>]]
SORT file.ctime DESC