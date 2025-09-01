---
type: npc
locations:
- "[[Elfsong Tavern]]"
tags:
- race/halfElf
- affinity/friendly
- job/waitress
---
###### Paloma Beltre
<span class="sub2">:FasMapLocationDot: [[Elfsong Tavern]] &nbsp; | &nbsp; :FasHeartPulse: Neutral </span>
___

> [!infobox|no-t right]
> ![[paloma.jpg]]
> ###### Details:
> | Type | Stat |
> | ---- | ---- |
> | :FasBriefcase:  Job | Waitress |
> | :FasVenusMars: Gender | Female |
> | :FasUser: Race | Half-Elf |
<span class="clearfix"></span>

> [!quote|no-t]
> Paloma Beltre, a half-elf of graceful bearing, captivates patrons of the ElfSong Tavern with her ethereal beauty and warm demeanor. Her elven heritage is evident in her pointed ears and striking features, softened by a hint of human ancestry. As a waitress, she glides effortlessly between tables, her movements fluid and precise, always wearing a welcoming smile. Despite her modest occupation, Paloma exudes an air of mystery, leaving patrons intrigued by the secrets she might hold within her enigmatic gaze.

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