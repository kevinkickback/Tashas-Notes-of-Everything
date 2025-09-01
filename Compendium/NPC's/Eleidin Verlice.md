---
type: npc
locations:
- "[[Feywild]]"
tags:
- race/fairy
- affinity/unknown
- job/rebellionLeader
---
###### Eleidin Verlice
<span class="sub2">:FasMapLocationDot: [[Feywild]] &nbsp; | &nbsp; :FasHeartPulse: Unknown </span>
___

> [!infobox|no-t right]
> ![[eleidin.jpg]]
> ###### Details:
> | Type | Stat |
> | ---- | ---- |
> | :FasBriefcase: Job | Rebellion Leader |
> | :FasVenusMars: Gender | Male |
> | :FasUser: Race | Fairy |
<span class="clearfix"></span>

> [!quote|no-t]
>Eleidin Verlice commands attention with his luminous wings and piercing gaze. As the leader of a burgeoning rebellion, he exudes an aura of determination and resilience. His every movement resonates with an air of authority, drawing followers to his cause like moths to a flame. Beneath his serene exterior lies a fierce determination to challenge the status quo and pave the way for a new era of freedom in the enchanted realms.

> [!column|flex 3]
>> [!important]- QUESTS:
>> ```base
>> properties:
>>   file.name:
>>     displayName: Name
>> views:
>>   - type: table
>>     name: Name
>>     filters:
>>       and:
>>         - file.inFolder("Compendium/Party/Quests")
>>         - file.hasLink(this.file)
>>     order:
>>       - file.name
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