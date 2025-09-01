---
type: deity
tags:
- pantheon/faerûnian
- domain/luck
- domain/trickery
---

###### Tymora
<span class="sub2">:FasCross: Deity &nbsp; | &nbsp; :FasYinYang: Chaotic Good</span>
___

> [!infobox|no-t right]
> ![[tymora.jpg]]
> ###### Details:
> | Type | Stat |
> | ---- | ---- |
> | :FasBoltLightning: Domains | Luck, Trickery |
> | :FasVenusMars: Gender | Female |
> | :FasBuildingColumns: Pantheon | Faerûnian |

> [!quote|no-t]
>Tymora (pronounced: tie-MOR-ah) is the goddess of good luck in the Faerûnian pantheon and the second incarnation of the goddess of luck after her predecessor [[Tyche]] was split into her and [[Beshaba]], goddess of bad luck. In the 14th century DR, Tymora held the portfolios of good fortune, skill, victory, and adventurers. Commonly known as Lady Luck, Tymora shines upon those who take risks and blesses those who deal harshly with the followers of Beshaba.

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