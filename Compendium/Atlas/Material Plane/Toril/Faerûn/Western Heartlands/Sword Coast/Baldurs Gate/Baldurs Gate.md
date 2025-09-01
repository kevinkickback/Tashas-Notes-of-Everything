---
type: locale
locations:
  - "[[Sword Coast]]"
tags:
  - location/city
---

![[baldursGate.webp|banner]]
###### Baldurs Gate
<span class="sub2">:FasCity: City</span>
___

> [!quote|no-t] SUMMARY
>Baldur's Gate, also called simply the Gate, is the largest metropolis and city-state on the Sword Coast, within the greater Western Heartlands. It is a crowded city of commerce and opportunity, perhaps the most prosperous and influential merchant city on the western coast of [[Faerûn]]. Despite its long-standing presence as a neutral power, the leaders of Baldur's Gate are members of the Lords' Alliance of powers in the west.

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