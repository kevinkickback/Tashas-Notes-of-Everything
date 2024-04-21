---
type: realm
locations:
- "[[Material Plane]]"
tags:
- 
headerLink: "[[Toril#Toril]]"
---

![[toril.jpg|banner]]
###### Toril
<span class="sub2">:FasGlobe: Realm (world)</span>
___

> [!quote|no-t] SUMMARY
>Toril is orbited by one moon named Selûne, and by a cluster of asteroids, known as the Tears of Selûne. Throughout most of its history, Toril was known less commonly as Abeir-Toril. The name "Abeir-Toril" was archaic, meaning "cradle of life" in an extinct and forgotten language. Since the Spellplague and the revelation of the existence of a planetary sibling known as Abeir, and the fact that both Abeir and Toril were once united, the latter name came to informally mean the formerly united worlds of Abeir and Toril.

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
FROM "Compendium/Atlas/Material Plane/Toril"
WHERE type= "continent"
SORT file.name ASC
>
>> [!note]- HISTORY
>>```dataview
LIST WITHOUT ID headerLink
FROM "Session Notes" AND [[Toril]]
SORT file.ctime DESC

```dataviewjs
this.app.workspace.onLayoutReady(() => {
  console.log("Obsidian is ready");
  const radio = document.getElementById('direct1');
  if (radio) {
    radio.click();
  }
});


this.app.workspace.on("active-leaf-change", () => {
    console.log("Active leaf changed!")
    document.getElementById('direct1').click();
});
```