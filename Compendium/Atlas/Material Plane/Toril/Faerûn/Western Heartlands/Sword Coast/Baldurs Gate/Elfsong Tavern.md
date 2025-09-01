---
cssClasses: grayTable, wideTable
type: landmark
locations:
- "[[Baldurs Gate]]"
tags:
- location/tavern
---

![[elfsong.jpg|banner]]
###### Elfsong Tavern
<span class="sub2">:RiBeerLine: Tavern</span>
___

> [!quote|no-t] SUMMARY
>A well-known tavern in the city of [[Baldurs Gate]]. The name derived from an unusual haunting: a ghostly female elven voice heard periodically throughout the establishment. The singing is quiet, but can be heard quite clearly. It is most often described as both beautiful and mournful. The identity of the singer is unknown, but it is clear that her song is a lament for a lover lost at sea. No other music is permitted inside the Elfsong.

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