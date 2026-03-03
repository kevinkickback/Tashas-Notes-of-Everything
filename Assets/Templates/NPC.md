<%*
const { toCamelCase, moveAndOpenFile } = tp.user.utils;

// Open modal form for NPC creation
const result = await MF.openForm('NPC');

// Cancel if form was closed without submission
if (result.status !== 'ok') {
    new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled:</span><br>NPC has not been added`;
    return;
}

// Declare & normalize variables
const name = result.Name.value;
const location = result.Location.value;
const affinity = result.Affinity.value;
const job = result.Job.value;
const gender = result.Gender.value;
const race = result.Race.value;
const portrait = result.Portrait.value || "portrait.jpg";
const tags = [
    race && `race/${toCamelCase(race)}`,
    affinity && `affinity/${toCamelCase(affinity)}`,
    job && `job/${toCamelCase(job)}`
].filter(Boolean).map(v => ` - ${v}`).join("\n") || " - ";

// Apply icon to note
const iconize = app.plugins.plugins["obsidian-icon-folder"];
const icon = "RiContactsFill"
const notePath = `Compendium/NPC's/${name}.md`;
iconize.addFolderIcon(notePath, icon);
iconize.api.util.dom.createIconNode(iconize, notePath, icon);

// Rename & open note in new tab
await moveAndOpenFile(tp, name);

// Show success notification
new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New NPC <span style="text-decoration: underline;">${name}</span> added`;
-%>
---
type: npc
locations:
  - <% location ? `"[[${location}]]"` : " -"%>
tags:
<% tags %>
---

###### <% name %>
<span class="sub2"><% location ? `:FasMapLocationDot: [[${location}]]` : '' %><% affinity ? ` | :FasHeartPulse: ${affinity}` : '' %></span>
___

> [!infobox|no-t right]
> ![[<% portrait %>]]
> ###### Details:
> | Type | Stat |
> | ---- | ---- |
> | :FasBriefcase: Job | <% job %> |
> | :FasVenusMars: Gender | <% gender %> |
> | :FasUser: Race | <% race %> |

> [!quote|no-t]
> Profile of <% name %>, the <% `${gender ? gender.toLowerCase() : ''}${race ? (gender ? ' ' : '') + race.toLowerCase() : ''}` %> NPC.

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