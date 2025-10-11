---
type: continent
locations:
 - "[[Toril]]"
tags:
 -
---

![[Faerûn.jpg|banner]]
###### Faerûn
<span class="sub2">:FasEarthAmericas: Continent</span>
___

> [!quote|no-t]
>Faerûn is a major continent on the planet of [[Toril]]. The word "Faerûn" was a modified version of "Faerie", the name of the homeland of ancient elves. The continent includes terrain that is as varied as any other. Besides the exterior coastline to the west and south, the most dominant feature on the continent is the Sea of Fallen Stars. This is an irregular inland sea that keeps the interior lands fertile, connects the west and east regions of Faerûn, and serves as a major trade route for many of the bordering nations.
 
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
>>     name: Territories
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
