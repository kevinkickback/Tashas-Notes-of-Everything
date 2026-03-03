---
type: pc
level: "4"
race: "Tabaxi"
class: 
 - "Paladin"
subClass: 
 - "Conquest"
cover: "/Assets/Images/Party/kingston.png"
tags:
- race/tabaxi
- class/paladin
---
###### Kingston Yashkar
:FasPerson: Player Character &nbsp; | &nbsp; :FasQuoteLeft: Luck favors the bold :FasQuoteRight:
___
> [!infobox|no-t right]
> ![[kingston.png]]
> ###### Details:
> | Type | Stat |
> | ---- | ---- |
> | :FasCrown: Level   | `=this.level` |
> | :RiSwordFill: Class |  `=this.class`|
> | :FasFireFlameCurved: Archetype |  `=join(this.subClass, "<br>")`|
> |  :FasUserGroup: Race |  `=this.race`|

> [!quote|no-t]
> Kingston Yashkar, the Tabaxi Paladin hailing from Neverwinter, embodies unwavering faith and righteous conviction within the adventuring party [[LASTSTAND]]. At least that's how he would describe himself. In reality, as a follower of [[Tymora]], the goddess of luck, he leaves everything to chance and goes which ever way the wind blows. You've never met a more lazy, er... carefree soul.

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