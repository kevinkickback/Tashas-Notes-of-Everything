<%*
// ###########################################################
//                        Helper Functions
// ###########################################################

// Convert string to camelCase
function toCamelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|\s+|[-_])/g, (match, index) =>
      index === 0 ? match.toLowerCase() : match.toUpperCase()
    )
    .replace(/[\s-_]+/g, '');
}

// Get next session number
function nextNumber() {
  const sessionRegex = /^Session Notes\/Session (\d+)/;
  const files = this.app.vault.getMarkdownFiles()
    .reduce((maxNumber, file) => Math.max(maxNumber, (file.path.match(sessionRegex) || [])[1] || 0), 0) + 1;
  
  return files < 10 ? '0' + files : files.toString();
}

// ###########################################################
//                        Main Code Section
// ###########################################################

// Call modal form & declare variables
const result = await MF.openForm('NOTE');
const date = result.Date.value;
const title = result.Title.value;
const location = result.Location.value ? result.Location.value.map(value => `- "[[${value}]]"`).join("\n") : '';
const number = nextNumber();
const name = `Session ${number} (${date})`;
const tags = result.Tags.value ? result.Tags.value.map(value =>
  value.startsWith('#') ? `- ${value.slice(1)}` : `- ${toCamelCase(value)}`
).join("\n") : '';


if (result.status === 'ok') {

    // Rename file & open in new tab; Fire toast notification
    await tp.file.rename(name);
    await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(name));
    new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New note <span style="text-decoration: underline;">${name}</span> added`;

} else {

    // Fire toast notifcation & exit templater
    console.log('Modal form cancelled');
    new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled:</span><br>Session note has not been added`;
    return;
}
_%>

---
type: notes
locations:
<% location ? location : ' - '%>
tags:
<% tags ? tags : ' - '%>
headerLink: "[[<% name %>#<% title %>|<% name %>]]"
---

![[session.png|banner]]
###### <% title %>
<span class="sub2">:FasSun: DAY 00 &nbsp; | &nbsp; :FasTags: `= this.file.etags`</span>
___

> [!quote|no-t] SUMMARY
>Recap of the session's events here.

#### marker
> [!column|flex 3]
>> [!info|felx] NPC'S:
>> - [[Characters]] (status)
>
>> [!example|flex] LOCATIONS:
>> - [[Locations]] (status)
>
>> [!important|flex] QUESTS:
>> - [[Quests]] (status)
