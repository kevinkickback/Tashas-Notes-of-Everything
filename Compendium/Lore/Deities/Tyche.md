---
type: deity
tags:
- pantheon/netherese
- pantheon/olympian
- domain/luck
- domain/trade
- dead
---

###### Tyche
<span class="sub2">:FasCross: Deity &nbsp; | &nbsp; :FasYinYang: True Neutral</span>
___

> [!infobox|no-t right]
> ![[tyche.jpg]]
> ###### Details:
> | Type | Stat |
> | ---- | ---- |
> | :FasBoltLightning: Domains | Luck, Trade |
> | :FasVenusMars: Gender | Female |
> | :FasBuildingColumns: Pantheon | Netherese, Olympian |

> [!quote|no-t]
>Tyche (pronounced TIE-key) was the original goddess of fortune. An ancient goddess, she was originally a member of the Greek pantheon before falling out of favor and eventualy leaving. She made her way to Abeir-Toril where joined the Netherese Pantheon. She would eventually split into [[Tymora]] (goddess of good luck) and [[Beshaba]] (goddess of misfortune) during the [[Dawn Cataclysm]].

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