---
type: pc
level: "4"
race: "Human"
class:
- "Ranger"
- "Druid"
subClass:
- "Swarmkeeper"
- "Stars"
cover: "/Assets/Images/Party/moira.jpg"
tags:
- race/human
- class/ranger
- class/druid
---
###### Moira Belkas
:FasPerson: Player Character &nbsp; | &nbsp; :FasQuoteLeft: I honor the balance of nature :FasQuoteRight:
___
> [!infobox|no-t right]
> ![[moira.jpg]]
> ###### Details:
> | Type | Stat |
> | ---- | ---- |
> | :FasCrown: Level   | `=this.level` |
> | :RiSwordFill: Class | `=join(this.class, "<br>")`|
> | :FasFireFlameCurved: Archetype |  `=join(this.subClass, "<br>")`|
> |  :FasUserGroup: Race |  `=this.race`|

> [!quote|no-t]
> Moira Belkas, a resourceful ranger hailing from [[Baldurs Gate|Baldur's Gate]], embodies the harmony of nature and skillful marksmanship within the adventuring party [[LASTSTAND]]. As a childhood friend of [[Alaric Waycrest]], their bond endures through every trial they face together.

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