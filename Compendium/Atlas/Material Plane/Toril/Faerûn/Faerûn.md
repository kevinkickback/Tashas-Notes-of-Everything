---
type: continent
locations:
- "[[Material Plane]]"
- "[[Toril]]"
tags:
headerLink: "[[Faerûn#Faerûn]]"
---

![[Faerûn.jpg|banner]]
###### Faerûn
<span class="sub2">:fas_earth_americas: Continent</span>
___

> [!quote|no-t]
>Faerûn is a major continent on the planet of [[Toril#Toril]]. The word "Faerûn" was a modified version of "Faerie", the name of the homeland of ancient elves. The continent includes terrain that is as varied as any other. Besides the exterior coastline to the west and south, the most dominant feature on the continent is the Sea of Fallen Stars. This is an irregular inland sea that keeps the interior lands fertile, connects the west and east regions of Faerûn, and serves as a major trade route for many of the bordering nations.

#### marker
> [!column|flex 3]
>> [!hint]-  NPC's
>> ```dataview
LIST WITHOUT ID headerLink
FROM "Compendium/NPC's" AND [[Faerûn]]
SORT file.name ASC
>
>> [!example]- LOCATIONS
>>```dataview
LIST WITHOUT ID headerLink
FROM "Compendium/Atlas/Material Plane/Toril/Faerûn"
WHERE file.name != this.file.name AND type= "region"
SORT file.name ASC
>
>> [!note]- HISTORY
>>```dataview
LIST WITHOUT ID headerLink
FROM "Session Notes" AND [[Faerûn]]
SORT file.ctime DESC
#### marker