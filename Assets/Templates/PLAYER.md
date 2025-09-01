<%*
// ###########################################################
//                       Helper Functions
// ###########################################################

// Convert string to camelCase
function toCamelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|\s+|[-_])/g, (match, index) =>
      index === 0 ? match.toLowerCase() : match.toUpperCase()
    )
    .replace(/[\s-_]+/g, '');
}

// Format tags
function formatTags(pclass, race) {
  return [
    pClass && ` - class/${toCamelCase(pClass)}`,
    race && ` - race/${toCamelCase(race)}`
  ]
  .filter(tag => tag)
  .join('\n');
}

// Return icon based on class
function getIcon(pClass) {
  const iconMappings = {
    Artificer: ':RiToolsFill: Specialist',
    Barbarian: ':FasCity: Primal Path',
    Bard: ':FasGuitar: College',
    Cleric: ':FasPersonPraying: Divine Domain',
    Druid: ':FasMoon: Circle',
    Fighter: ':FasUserShield: Archetype',
    Monk: ':FasHandFist: Tradition',
    Paladin: ':FasFireFlameCurved: Oath',
    Ranger: ':FasBullseye: Conclave',
    Rogue: ':RiSwordFill: Archetype',
    Sorcerer: ':FasHandSparkles: Origin',
    Warlock: ':FasBurst: Patron',
    Wizard: ':FasWandMagicSparkles: Tradition'
  };

  return iconMappings[pClass] || ':FasCircleQuestion: Sub Class';
}

// ###########################################################
//                         Main Code
// ###########################################################

// Call modal form & declare variables
const result = await MF.openForm('PC');
const quote = result.Quote.value;
const level = result.Level.value;
const pClass = result.pClass.value;
const subClass = result.subClass.value;
const subType = getIcon(pClass);
const name = result.Name.value;
const race = result.Race.value;
const tags = formatTags(pClass, race);

if (result.status === 'ok') {

    // Rename file & open in new tab; Fire toast notification
    await tp.file.rename(name);
    await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(name));
    new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New player character <span style="text-decoration: underline;">${name}</span> added`;

} else {

    // Fire toast notification & exit templater
    new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled:</span><br>Player character has not been added`;
    return;
}
-%>
---
type: pc
tags:
<% tags ? tags : ' - ' %>
level: "<% level ? level : '' %>"
race: "<% race ? race : '' %>"
class: "<% pClass ? pClass : '' %>"
subClass: "<% subClass ? subClass : '' %>"
cover: "/Assets/Images/Portrait.jpg"
---

###### <% name %>
:FasPerson: Player Character &nbsp; | &nbsp; :FasQuoteLeft: <% quote ? quote : 'Quote or tagline here' %> :FasQuoteRight:
___
> [!infobox|no-t right]
> ![[portrait.jpg]]
> ###### Details:
> | Type | Stat |
> | ---- | ---- |
> | :FasCrown: Level   | `=this.level` |
> | :RiSwordFill: Class |  `=this.class`|
> | <% subType %> |  `=this.subClass`|
> |  :FasUserGroup: Race |  `=this.race`|

> [!quote|no-t]
> Character description here
 
> [!column|flex 3]
>> [!info]- STORYLINES:
> > ```base
> > properties:
> >   file.name:
> >     displayName: Name
> > views:
> >   - type: table
> >     name: Name
> >     filters:
> >       and:
> >         - file.inFolder("Compendium/Party/Quests")
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