---
type: territory
locations:
 - "[[Faerûn]]"
tags:
 - location/generalRegion
---

![[westernHeartlands.jpg|banner]]
###### Western Heartlands
<span class="sub2">:FasMap: General Region</span>
___

> [!quote|no-t] SUMMARY
>The Western Heartlands (originally "Hartlands" for the abundance of deer) is a region located in the western portion of [[Faerûn]]. It stretches from the [[Sword Coast]] region at water's edge of the Sea of Swords in the west, to the Storm Horn Mountains in the east. The region extends north until the Lizard Marsh of the Delimbiyr Vale, including the High Moor to the northeast, and went as far south to the Lands of Intrigue of Amn, Tethyr and Calimshan. 

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