<%*
// ###########################################################
//                        Helper Functions
// ###########################################################

// Convert string to camelCase
function toCamelCase(str) {
	return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, '');
  }

// ###########################################################
//                        Main Code Section
// ###########################################################

// Call modal form
const result = await MF.openForm('NPC');

// Declare variables after form returns values
const affinity = result.Affinity.value;
const gender = result.Gender.value;
const job = result.Job.value;
const location = result.Location.value;
const name = result.Name.value;
const race = result.Race.value;

// Rename & open note
await tp.file.rename(name);
await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(name));
new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New NPC <span style="text-decoration: underline;">${name}</span> added`;
_%>

---
type: npc
locations:
 - <% location ? `"[[${location}]]"` : '' %>
tags:
 - race/<% toCamelCase(race) %>
 - affinity/<% toCamelCase(affinity) %><% job ? `\n - job/${toCamelCase(job)}` : '' %>
headerLink: "[[<% name %>#<% name %>]]"
---
###### <% name %>
<span class="sub2"><% location ? `:FasMapLocationDot: [[${location}#${location}]] &nbsp;|&nbsp; ` : '' %>:FasHeartPulse: <% affinity %> </span>
___

> [!infobox|no-t right]
> ![[portrait.jpg]]
> ###### Details:
> | Type | Stat |
> | ---- | ---- |
> | :FasBriefcase: Job |  <% job %> |
> | :FasVenusMars: Gender | <% gender %> |
> | :FasUser: Race | <% race %> |
<span class="clearfix"></span>

> [!quote|no-t]
>Profile of <% name.toLowerCase() %>, the <% gender.toLowerCase() %> <% race.toLowerCase() %> NPC.

#### marker
> [!column|flex 3]
>> [!important]- QUESTS:
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Compendium/Party/Quests" AND [[<% name %>]]
>
>>[!note]- HISTORY
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Session Notes" AND [[<% name %>]]
