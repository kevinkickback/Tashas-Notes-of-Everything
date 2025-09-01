---
type: event
tags:
- event/religious
---

###### Dawn Cataclysm
<span class="sub2">:FasCross: Religious Event</span>
___

> [!quote|no-t]
>![[dawncataclysm.jpg|right wm-sm]]The Dawn Cataclysm was an attempt by the god [[Lathander]] to reshape the pantheon of deities more in his own image. It is unknown when this event occurred but it ultimately failed, resulting in the destruction of several deities (e.g. [[Tyche]] splitting into [[Tymora]] and [[Beshaba]]).
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