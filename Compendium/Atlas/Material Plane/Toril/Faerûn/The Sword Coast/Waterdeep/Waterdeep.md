---
type: locale
locations:
- "[[Material Plane]]"
- "[[Toril]]"
- "[[Faerûn]]"
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
>> [!hint]-  NPC's
>> ```dataview
LIST WITHOUT ID headerLink
FROM "Compendium/NPC's" AND [[Waterdeep]]
SORT file.name ASC
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