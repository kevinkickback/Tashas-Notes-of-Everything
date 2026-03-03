<%*
const { toCamelCase, moveAndOpenFile } = tp.user.utils;

// Open modal form for quest creation
const result = await MF.openForm('QUEST');

// Cancel if form was closed without submission
if (result.status !== 'ok') {
    new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled:</span><br>Quest has not been added`;
    return;
}

// Declare & normalize variables
const name = result.Name.value;
const status = result.Status.value;
const location = result.Location.value;
const npc = result.Assignor.value;
const target = result.Assignee.value;
const image = result.Image.value || "quest.png";
const tags = [
    status && `quest/${toCamelCase(status)}`
].filter(Boolean).map(v => ` - ${v}`).join("\n") || " -";

// Apply icon to note
const iconize = app.plugins.plugins["obsidian-icon-folder"];
const icon = "FasExclamation";
const notePath = `Compendium/Party/Quests/${name}.md`;
iconize.addFolderIcon(notePath, icon);
iconize.api.util.dom.createIconNode(iconize, notePath, icon);

// Rename & open note in new tab
await moveAndOpenFile(tp, name);

// Show success notification
new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New quest <span style="text-decoration: underline;">${name}</span> added`;
-%>
---
type: quest
target: <% target === "[ Group Quest ]" ? 'groupQuest' : target ? `"[[${target}]]"` : '' %>
locations:
 - <% location ? `"[[${location}]]"` : '' %>
tags:
<% tags %>
---

###### <% name %>
<span class="sub2">:FasCircleExclamation: Quest<% status ? ` &nbsp; | &nbsp; :FasListCheck: ${status}` : '' %><% npc ? ` &nbsp; | &nbsp; :FasUser: [[${npc}]]` : '' %></span>
___

> [!quote|no-t]
>![[<% image %>|right wm-sm]]Quest description here...

> [!column|flex 3]
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
