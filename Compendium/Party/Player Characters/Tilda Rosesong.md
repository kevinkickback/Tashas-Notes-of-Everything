---
type: pc
tags:
- race/tiefling
- class/sorcerer
level: "3"
race: "Tiefling"
class: "Sorcerer"
subClass: "Divine Soul"
cover: "/Assets/Images/Party/tilda.webp"
---
###### Tilda Rosesong
:FasPerson: Player Character &nbsp; | &nbsp; :FasQuoteLeft: I shape destiny to my will :FasQuoteRight:
___
> [!infobox|no-t right]
> ![[tilda.webp]]
> ###### Details:
> | Type | Stat |
> | ---- | ---- |
> | :FasCrown: Level   | `=this.level` |
> | :RiSwordFill: Class |  `=this.class`|
> | :FasHandSparkles: Origin |  `=this.subClass`|
> |  :FasUserGroup: Race |  `=this.race`|

> [!quote|no-t]
> Tilda Rosesong, a fiery tiefling sorcerer hailing from [[Waterdeep]], channels the arcane forces with unmatched intensity and finesse within the adventuring party [[LASTSTAND]]. Her mysterious origins and powerful magic make her both a valuable ally and a formidable adversary.

> [!column|flex 3]
>> [!important]- STORYLINES:
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