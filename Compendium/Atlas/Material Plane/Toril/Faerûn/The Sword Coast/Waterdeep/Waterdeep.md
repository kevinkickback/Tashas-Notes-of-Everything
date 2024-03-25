---
type: locale
locations:
- "[[The Sword Coast]]"
tags:
- location/city
headerLink: "[[Waterdeep#Waterdeep]]"
---

![[waterdeep.jpg|banner]]
###### Waterdeep
<span class="sub2">:fas_city: City</span>
___

> [!quote|no-t] SUMMARY
>Waterdeep, also known as the City of Splendors or the Crown of the North, is the most important and influential city in the North and perhaps in all of [[Faerûn#Faerûn]]. It is truly marvelous cosmopolitan city of great culture that attracts the most talented artisans, artists, and scholars from across the Realms, as well as a commercial hub for financial interests along the coast and beyond.

#### marker
> [!column|flex 3]
> > [!hint]-  NPC's
> > <input type="checkbox" id="npc"/><ul class="sortMenu"><li class="sortIcon">:rif_list_settings:<ul class="dropdown npcedit"><li><label for="npc" class="directLabel active">Direct Links Only</label></li><li><label for="npc" class="childLabel">Include Sub-Locations</label></li></ul></li></ul>
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
FROM "Compendium/Atlas/Material Plane/Toril/Faerûn/The Sword Coast/Waterdeep"
WHERE file.name != this.file.name AND type= "landmark"
SORT file.name ASC
>
>> [!note]- HISTORY
>>```dataview
LIST WITHOUT ID headerLink
FROM "Session Notes" AND [[Waterdeep]]
SORT file.ctime DESC