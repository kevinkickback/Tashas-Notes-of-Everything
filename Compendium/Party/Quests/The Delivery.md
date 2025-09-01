---
type: quest
target: groupQuest
locations:
- "[[Sorcerous Sundries]]"
tags:
- quest/ongoing
---
###### The Delivery
<span class="sub2">:FasCircleExclamation: Quest &nbsp; | &nbsp; :FasListCheck: Ongoing &nbsp;  | &nbsp; :FasUser: [[Tinkera Drenn]]</span>
___

> [!quote|no-t]
>![[quest.png|right wm-sm]]Tinkera asks [[LASTSTAND]] to deliver a package to a secluded cottage on the outskirts of Baldur's Gate. She explains that the recipient, an old friend of hers, is expecting the delivery urgently. 

> [!column|flex 3]
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

