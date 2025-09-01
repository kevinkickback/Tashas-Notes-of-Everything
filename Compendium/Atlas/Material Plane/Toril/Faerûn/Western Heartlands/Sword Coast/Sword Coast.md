---
type: province
locations:
  - "[[Western Heartlands]]"
tags:
  - location/territory
---

![[swordCoast.jpg|banner]]
###### Sword Coast
<span class="sub2">:FasMap: Province</span>
___

> [!quote|no-t] SUMMARY
>The Sword Coast, also nicknamed the Empty Lands, is the region in western [[Faerûn]] that lays along the coast of the Sea of Swords and extendes inward into to the vale. It's an expansive tract of wilderness, dotted with independent cities and overrun by bands of monstrous creatures, that some see as merely a place through which you have to travel in order to reach an actual meaningful destination. It is much more than that of course. A rich and vibrant land with a long and storied history that encompassed some of the most important cities in all the Realms.

> [!column|flex 3]
>> [!hint]- NPC's
>> ```base
>> formulas:
>>   LinkedIndirectly: |
>>     locations.contains(this.file)
>>     || list(locations)
>>          .filter(file(value)
>>            && list(file(value).properties.locations).contains(this))
>>          .length > 0
>> properties:
>>   file.name:
>>     displayName: Name
>> views:
>>   - type: table
>>     name: This Location Only
>>     filters:
>>       and:
>>         - file.inFolder("Compendium/NPC's")
>>         - locations.contains(this.file)
>>   - type: table
>>     name: Sub-Locations Included
>>     filters:
>>       and:
>>         - file.inFolder("Compendium/NPC's")
>>         - formula.LinkedIndirectly
>> ```
>
>> [!example]- LOCATIONS
>> ```base
>> properties:
>>   file.name:
>>     displayName: Name
>> views:
>>   - type: table
>>     name: Provinces
>>     filters:
>>       and:
>>         - file.inFolder("Compendium/Atlas")
>>         - locations.contains(this.file)
>> ```
>
>> [!note]- HISTORY
>> ```base
>> properties:
>>   file.name:
>>     displayName: Name
>> views:
>>   - type: table
>>     name: Session Notes
>>     filters:
>>       and:
>>         - file.inFolder("Session Notes")
>>         - file.hasLink(this.file)
>> ```