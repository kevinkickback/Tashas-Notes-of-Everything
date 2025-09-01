---
cssClasses: grayTable, wideTable
type: landmark
locations:
- "[[Waterdeep]]"
tags:
- location/cemetery
---

![[cityDead.webp|banner]]
###### City of the Dead
<span class="sub2">:FasGhost: Cemetery</span>
___

> [!quote|no-t] SUMMARY
>The City of the Dead isa large cemetery and ward in [[Waterdeep]]. Most of the city's dead are buried here. By day, it also doubles as the city's major public park picnic area.
<span class="clearfix"></span>

> [!column|flex 3]
>> [!hint]- NPC's
>> ```base
>> properties:
>>   file.name:
>>     displayName: Name
>> views:
>>   - type: table
>>     name: Name
>>     filters:
>>       and:
>>         - file.inFolder("Compendium/NPC's")
>>         - file.hasLink(this.file)
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