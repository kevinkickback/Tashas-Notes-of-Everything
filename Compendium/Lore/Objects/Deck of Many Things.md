---
type: object
tags:
 - object/magicItem
---

###### Deck of Many Things
<span class="sub2">:FasWandMagicSparkles: Magic Item</span>
___

> [!quote|no-t]
>![[deck_of_many_things.jpg|right wm-sm]]The deck of many things, also known as deck of hazards, is an assortment of magical cards or metallic plates that are arranged in a set deck. They are enchanted with great magic that is never to be used lightly.
<span class="clearfix"></span>

> [!column|flex 3]
> > [!hint]- NPC's
> > ```base
> > properties:
> >   file.name:
> >     displayName: Name
> > views:
> >   - type: table
> >     name: Name
> >     filters:
> >       and:
> >         - file.inFolder("Compendium/NPC's")
> >         - file.hasLink(this.file)
> > ```
>
>> [!note]- HISTORY
> > ```base
> > properties:
> >   file.name:
> >     displayName: Name
> > views:
> >   - type: table
> >     name: Session Notes
> >     filters:
> >       and:
> >         - file.inFolder("Session Notes")
> >         - file.hasLink(this.file)
> > ```