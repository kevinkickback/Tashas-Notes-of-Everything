---
type: locale
locations:
- "[[Material Plane]]"
- "[[Toril]]"
- "[[Faerûn]]"
- "[[The Sword Coast]]"
tags:
- location/city
headerLink: "[[Baldurs Gate#Baldurs Gate]]"
---

![[baldursGate.webp|banner]]
###### Baldurs Gate
<span class="sub2">:fas_city: City</span>
___

> [!quote|no-t] SUMMARY
>Baldur's Gate, also called simply the Gate, is the largest metropolis and city-state on the Sword Coast, within the greater Western Heartlands. It is a crowded city of commerce and opportunity, perhaps the most prosperous and influential merchant city on the western coast of [[Faerûn#Faerûn]]. Despite its long-standing presence as a neutral power, the leaders of Baldur's Gate are members of the Lords' Alliance of powers in the west.

#### marker
> [!column|flex 3]
>> [!hint]-  NPC's
>> ```dataview
LIST WITHOUT ID headerLink
FROM "Compendium/NPC's" AND [[Baldurs Gate]]
SORT file.name ASC
>
>> [!example]- LOCATIONS
>>```dataview
LIST WITHOUT ID headerLink
FROM "Compendium/Atlas/Material Plane/Toril/Faerûn/The Sword Coast/Baldurs Gate"
WHERE file.name != this.file.name AND type= "landmark"
SORT file.name ASC
>
>> [!note]- HISTORY
>>```dataview
LIST WITHOUT ID headerLink
FROM "Session Notes" AND [[Baldurs Gate]]
SORT file.ctime DESC