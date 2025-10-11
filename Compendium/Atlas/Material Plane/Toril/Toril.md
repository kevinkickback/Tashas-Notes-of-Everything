---
type: realm
locations:
 - "[[Material Plane]]"
tags:
 - 
---

![[toril.jpg|banner]]
###### Toril
<span class="sub2">:FasGlobe: Realm (world)</span>
___

> [!quote|no-t] SUMMARY
>Toril is orbited by one moon named Selûne, and by a cluster of asteroids, known as the Tears of Selûne. Throughout most of its history, Toril was known less commonly as Abeir-Toril. The name "Abeir-Toril" was archaic, meaning "cradle of life" in an extinct and forgotten language. Since the Spellplague and the revelation of the existence of a planetary sibling known as Abeir, and the fact that both Abeir and Toril were once united, the latter name came to informally mean the formerly united worlds of Abeir and Toril.

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
>>     name: Continents
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