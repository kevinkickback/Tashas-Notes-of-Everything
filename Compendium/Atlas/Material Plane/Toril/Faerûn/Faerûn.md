---
type: continent
locations:
- "[[Toril]]"
tags:
headerLink: "[[Faerûn#Faerûn]]"
---

![[Faerûn.jpg|banner]]
###### Faerûn
<span class="sub2">:FasEarthAmericas: Continent</span>
___

> [!quote|no-t]
>Faerûn is a major continent on the planet of [[Toril#Toril]]. The word "Faerûn" was a modified version of "Faerie", the name of the homeland of ancient elves. The continent includes terrain that is as varied as any other. Besides the exterior coastline to the west and south, the most dominant feature on the continent is the Sea of Fallen Stars. This is an irregular inland sea that keeps the interior lands fertile, connects the west and east regions of Faerûn, and serves as a major trade route for many of the bordering nations.
 
#### marker
> [!column|flex 3]
> > [!hint]-  NPC's
> > <input type="checkbox" id="npc"/><ul class="sortMenu"><li class="sortIcon">:RiListSettingsLine:<ul class="dropdown npcedit"><li><label for="npc" class="directLabel active">Direct Links Only</label></li><li><label for="npc" class="childLabel">Include Sub-Locations</label></li></ul></li></ul>
> >```dataviewjs
dv.container.className += ' npcDirect';
dv.list(dv.pages('"Compendium/NPC\'s"')
 .where(p => p.file.outlinks.includes(dv.current().file.link))
.sort(p => p.file.link)
.map(p => p.headerLink), 1);
>>```
>>```dataviewjs
dv.container.className += ' npcChild';
let page = dv.current().file.path;
let pages = new Set();
let stack = [page];
while (stack.length > 0) {
let elem = stack.pop();
let meta = dv.page(elem);
if (!meta) continue;
for (let inlink of meta.file.inlinks.concat(meta.file.outlinks).array()) {
let locations = dv.page(inlink.path);
if (!locations || pages.has(inlink.path) || inlink.path === meta.locations?.[0]) continue;
 if (dv.array(locations.locations).join(", ").includes(meta.file.path)) {
 pages.add(inlink.path);
 stack.push(inlink.path);
}}}
let data = Array.from(pages)
.filter(p => dv.page(p)?.type === "npc")
.map(p => dv.page(p).headerLink)
.sort((a, b) => {
if (a < b) return -1;
if (a > b) return 1;
return 0;
});
dv.list(data);
> 
>> [!example]- LOCATIONS
>>```dataview
LIST WITHOUT ID headerLink
FROM "Compendium/Atlas/Material Plane/Toril/Faerûn"
WHERE type= "region"
SORT file.name ASC
>
>> [!note]- HISTORY
>>```dataview
LIST WITHOUT ID headerLink
FROM "Session Notes" AND [[Faerûn]]
SORT file.ctime DESC
#### marker
