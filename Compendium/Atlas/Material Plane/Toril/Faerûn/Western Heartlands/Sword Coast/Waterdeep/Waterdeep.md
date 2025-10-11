---
type: locale
locations:
  - "[[Sword Coast]]"
tags:
  - location/city
---

![[waterdeep.jpg|banner]]
###### Waterdeep
<span class="sub2">:FasCity: City</span>
___

> [!quote|no-t] SUMMARY
>Waterdeep, also known as the City of Splendors or the Crown of the North, is the most important and influential city in the North and perhaps in all of [[Faerûn]]. It is truly marvelous cosmopolitan city of great culture that attracts the most talented artisans, artists, and scholars from across the Realms, as well as a commercial hub for financial interests along the coast and beyond.

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
>>     name: Landmarks
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