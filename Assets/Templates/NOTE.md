<%*
const { toCamelCase, moveAndOpenFile } = tp.user.utils;

// Get next session number
function nextNumber() {
    const sessionRegex = /^Session Notes\/Session (\d+)/;
    const files = this.app.vault.getMarkdownFiles()
        .reduce((maxNumber, file) => Math.max(maxNumber, (file.path.match(sessionRegex) || [])[1] || 0), 0) + 1;
    return files < 10 ? '0' + files : files.toString();
}

// Open modal form for session note creation
const result = await MF.openForm('NOTE');

// Cancel if form was closed without submission
if (result.status !== 'ok') {
    new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled:</span><br>Session note has not been added`;
    return;
}

// Declare & normalize variables
const date = result.Date.value;
const title = result.Title.value;
const location = result.Location.value ? result.Location.value.map(value => `- "[[${value}]]"`).join("\n") : '';
const banner = result.Banner.value || "session.jpg"
const number = nextNumber();
const name = `Session ${number}`;
const tags = result.Tags.value
    ? result.Tags.value.map(value => value.startsWith('#') ? `- ${value.slice(1)}` : `- ${toCamelCase(value)}`).join("\n")
    : '';

// Rename & open note in new tab
await moveAndOpenFile(tp, name);

// Apply icon to note
const iconize = app.plugins.plugins["obsidian-icon-folder"];
const icon = "LiNoteBookPen"
const notePath = `Session Notes/${name}.md`;
iconize.addFolderIcon(notePath, icon);
iconize.api.util.dom.createIconNode(iconize, notePath, icon);

// Show success notification
new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New note <span style="text-decoration: underline;">${name}</span> added`;
_%>

---
type: notes
locations:
<% location ? location : ' - '%>
tags:
<% tags ? tags : ' - '%>
date: "<% date %>"
---
![[<% banner %>|banner]]
###### <% title %>
<span class="sub2">:FasSun: DAY 00&nbsp; | &nbsp; :FasTags: `VIEW[{tags}][text]`</span>
___

> [!quote|no-t] SUMMARY
>Recap of the session's events here.

#### marker
> [!column|flex 3]
>> [!info|felx] NPC'S:
>> - [[Character]] (status)
>
>> [!example|flex] LOCATIONS:
>> - [[Locations]] (status)
>
>> [!important|flex] QUESTS:
>> - [[Quests]] (status)
