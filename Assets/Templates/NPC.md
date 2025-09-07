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
function formatTags(affinity, job, race) {
  return [
    affinity && ` - affinity/${toCamelCase(affinity)}`,
    job && ` - job/${toCamelCase(job)}`,
    race && ` - race/${toCamelCase(race)}`
  ]
  .filter(tag => tag)
  .join('\n');
}

// ###########################################################
//                         Main Code
// ###########################################################

// Call modal form & declare variables
const result = await MF.openForm('NPC');
const affinity = result.Affinity.value;
const gender = result.Gender.value;
const job = result.Job.value;
const location = result.Location.value;
const name = result.Name.value;
const race = result.Race.value;
const tags = formatTags(affinity, job, race);

if (result.status === 'ok') {

    // Rename file & open in new tab
    await tp.file.rename(name);
    await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(name));

    // Save & display file-explorer icons
    const iconize = app.plugins.plugins["obsidian-icon-folder"];
    const notePath = `Compendium/NPC's/${name}.md`;
    iconize.addFolderIcon(notePath, "RiContactsFill");
    iconize.api.util.dom.createIconNode(iconize, notePath, "RiContactsFill");

    // Fire success toast notification
    new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New NPC <span style="text-decoration: underline;">${name}</span> added`;

} else {

    // Fire cancel toast notification
    new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled:</span><br>NPC has not been added`;
    return;
}
_%>

---
type: npc
locations:
 - <% location ? `"[[${location}]]"` : '' %>
tags:
<% tags ? tags : ' - '%>
---
###### <% name %>
<span class="sub2"><% location ? `:FasMapLocationDot: [[${location}]]` : '' %><% affinity ? ` | :FasHeartPulse: ${affinity}` : '' %> </span>
___

> [!infobox|no-t right]
> ![[portrait.jpg]]
> ###### Details:
> | Type | Stat |
> | ---- | ---- |
> | :FasBriefcase: Job |  <% job ? job : '' %> |
> | :FasVenusMars: Gender | <% gender ? gender : '' %> |
> | :FasUser: Race | <% race ? race : '' %> |
<span class="clearfix"></span>

> [!quote|no-t]
>Profile of <% name %>, the <% `${gender ? gender.toLowerCase() : ''}${race ? (gender ? ' ' : '') + race.toLowerCase() : ''}` %> NPC.

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