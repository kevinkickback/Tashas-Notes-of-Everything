---
cssClasses: grayTable, wideTable
type: landmark
locations:
- "[[Baldurs Gate]]"
tags:
- location/shop
---

![[sorcSundries.jpg|banner]]
###### Sorcerous Sundries
<span class="sub2">:FasCartShopping: Shop</span>
___

> [!quote|no-t] SUMMARY
>Sorcerous Sundries is a mystical emporium nestled in the bustling streets of Baldur's Gate. Its facade boasts intricate runes and magical symbols, hinting at the wonders within. Inside, shelves are adorned with potions, spell scrolls, and arcane artifacts, catering to the needs of wizards, sorcerers, and adventurers alike. The air is thick with the scent of exotic ingredients and the crackle of latent magical energy, drawing in those seeking to unravel the mysteries of the arcane.

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