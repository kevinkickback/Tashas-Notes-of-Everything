---
type: object
tags:
- artifact
---

###### The Scarlet Scourge
<span class="sub2">:FasCross: Religious Artifact</span>
___

> [!quote|no-t]
>![[scarletScourge.png|right ws-med]]This whip is made from the severed vertebrae of a slain victims. Said to be created by [[Beshaba]] herself, this weapon has been handed down through generations to elite members of [[Black Fingers]].
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