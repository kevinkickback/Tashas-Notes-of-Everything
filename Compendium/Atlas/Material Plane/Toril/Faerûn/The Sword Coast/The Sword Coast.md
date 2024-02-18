---
type: region
locations:
- "[[Material Plane]]"
- "[[Toril]]"
- "[[Faerûn]]"
tags:
- generalRegion
headerLink: "[[The Sword Coast#The Sword Coast]]"
---

![[swordCoast.jpg|banner]]
###### The Sword Coast
<span class="sub2">:fas_map: *General Region*</span>
___

> [!quote|no-t] SUMMARY
>The Sword Coast, also nicknamed the Empty Lands, is the region in western [[Faerûn#Faerûn]] that lays along the coast of the Sea of Swords and extendes inward into to the vale. It's an expansive tract of wilderness, dotted with independent cities and overrun by bands of monstrous creatures, that some see as merely a place through which you have to travel in order to reach an actual meaningful destination. It is much more than that of course. A rich and vibrant land with a long and storied history that encompassed some of the most important cities in all the Realms.

#### marker
> [!column|flex 3]
>> [!hint]-  NPC's
>> ```dataview
LIST WITHOUT ID headerLink
FROM "Compendium/NPC's" AND [[The Sword Coast]]
SORT file.name ASC
>
>> [!example]- LOCATIONS
>>```dataview
LIST WITHOUT ID headerLink
FROM "Compendium/Atlas/Material Plane/Toril/Faerûn/The Sword Coast"
WHERE file.name != this.file.name AND type= "locale"
SORT file.name ASC
>
>> [!note]- HISTORY
>>```dataview
LIST WITHOUT ID headerLink
FROM "Session Notes" AND [[The Sword Coast]]
SORT file.ctime DESC
#### marker