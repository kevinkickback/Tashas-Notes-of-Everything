---
type: event
tags:
 - event/seasonal
---

###### Fey Day
<span class="sub2">:RiSunFoggyFill: Seasonal Event</span>
___

> [!quote|no-t]
>![[FeyDay.jpg|right wm-sm]]A holiday held in [[Waterdeep]] and the surrounding countryside during the vernal equinox on Ches 19 (this is a calendar date). It celebrates the weakening of the barriers between the [[Material Plane]] and the [[Feywild]].
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