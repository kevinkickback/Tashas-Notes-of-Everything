---
type: deity
tags:
- pantheon/faerûnian
- domain/luck
- domain/trickery
---

###### Beshaba
<span class="sub2">:FasCross: Deity &nbsp; | &nbsp; :FasYinYang: Chaotic Evil</span>
___

> [!infobox|no-t right]
> ![[beshaba.webp]]
> ###### Details:
> | Type | Stat |
> | ---- | ---- |
> | :FasBoltLightning: Domains | Luck, Trickery |
> | :FasVenusMars: Gender | Female |
> | :FasBuildingColumns: Pantheon | Faerûnian |

> [!quote|no-t]
>Beshaba (pronounced: be-SHAH-ba) is the chaotic evil intermediate deity of accidents, bad luck, misfortune, and random mischief. Lady Doom is the equally acknowledged counterpart of [[Tymora]], Lady Luck, and demands worship to keep her misfortunes at bay. Most fear her presence, but few would risk not invoking her name and inviting her to any event, lest she take offense and wreak havoc upon all involved.

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