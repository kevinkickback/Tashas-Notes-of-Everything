---
type: plane
tags:
 - 
---

![[materialPlane.avif|banner]]
###### Material Plane
<span class="sub2">:FasCircleHalfStroke: Plane of Existence</span>
___

> [!quote|no-t] SUMMARY
>The Material plane (also seen as Prime Material Plane) is the plane in which Toril and the surrounding cosmos exist. The phrase "Prime Material plane," or simply the "Prime," is generally used by beings from other planes in the multiverse to refer to the inhabitants of the Material Plane.

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
>>     name: Realms
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