---
type: organization
locations:
-
tags:
- 
---

###### Fellows of Free Fate
<span class="sub2">:FasCross: Religious Organization</span>
___

> [!quote|no-t]
>![[triff.jpg|right wm-tl]]The Fellows of Free Fate, known locally as the Triffs, is a sect of [[Tymora|Tymoran]] clergy who dedicate themselves to fight against the actions of [[Beshaba|Beshaban]] followers, specifically the [[Black Fingers|Black Fingers]].

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