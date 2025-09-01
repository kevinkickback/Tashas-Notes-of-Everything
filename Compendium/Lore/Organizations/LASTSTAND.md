---
type: organization
locations:
-
tags:
- 
---

###### LASTSTAND
<span class="sub2">:FasPeopleGroup: Adventuring Party</span>
___

> [!quote|no-t]
>![[laststand.jpg|right wm-tl]]Last Stand, stylized as **LASTSTAND**, is an adventuring group comprised of party members [[Kingston Yashkar|Kingston]], [[Moira Belkas|Moira]], [[Alaric Waycrest|Alaric]], and [[Tilda Rosesong|Tilda]].

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