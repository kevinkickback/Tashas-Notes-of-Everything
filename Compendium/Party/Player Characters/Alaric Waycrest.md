---
type: pc
tags:
- race/halfOrc
- class/fighter
level: "3"
race: "Half-Orc"
class: "Fighter"
subClass: "Battle Master"
cover: "/Assets/Images/Party/alaric.png"
---

###### Alaric Waycrest
:FasPerson: Player Character &nbsp; | &nbsp; :FasQuoteLeft: In battle, I find my true purpose :FasQuoteRight:
___
> [!infobox|no-t right]
> ![[alaric.png]]
> ###### Details:
> | Type | Stat |
> | ---- | ---- |
> | :FasCrown: Level   | `=this.level` |
> | :RiSwordFill: Class |  `=this.class`|
> | :FasUserShield: Archetype |  `=this.subClass`|
> |  :FasUserGroup: Race |  `=this.race`|

> [!quote|no-t]
> Alaric Wayrest is a rugged half-orc fighter hailing from [[Baldurs Gate|Baldur's Gate]], known for his unwavering loyalty and formidable combat skills. As a member of the adventuring party [[LASTSTAND]], he stands as a stalwart defender against the forces of darkness. Alaric shares a deep bond with his childhood friend [[Moira Belkas]], their connection forged through shared trials and triumphs. 
 
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