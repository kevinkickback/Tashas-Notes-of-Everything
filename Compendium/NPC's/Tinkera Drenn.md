---
type: npc
locations:
- "[[Sorcerous Sundries]]"
tags:
- race/gnome
- affinity/friendly
- job/shopkeeper
- quest/giver
---
###### Tinkera Drenn
<span class="sub2">:FasMapLocationDot: [[Sorcerous Sundries]] &nbsp; | &nbsp; :FasHeartPulse: Friendly</span>
___

> [!infobox|no-t right]
> ![[tinkera.png]]
> ###### Details:
> | Type | Stat |
> | ---- | ---- |
> | :FasBriefcase:  Job | Shopkeeper |
> | :FasVenusMars: Gender | Female |
> | :FasUser: Race | Gnome |
<span class="clearfix"></span>

> [!quote|no-t]
>By day, she's a part-time employee at Sorcerous Sundries, a renowned arcane emporium where she assists customers with their magical needs. With her vibrant personality and keen intellect, she's become a familiar face among the enchanting wares of the shop. However, beneath her jovial exterior lies a secret that few are privy to: Tinkera is the caretaker of a mischievous baby red dragon, whom she affectionately calls Ignis. Despite her best efforts to keep him hidden, Ignis's playful antics occasionally threaten to reveal their clandestine companionship.

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