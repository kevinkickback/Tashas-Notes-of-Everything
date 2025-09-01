<%*
// ###########################################################
//                       Helper Functions
// ###########################################################

// Format sub heading
function formatSub(status, npc) {
  return [
    `:FasCircleExclamation: Quest`,
    status && `:FasListCheck: ${status}`,
    npc && `:FasUser: [[${npc}#${npc}]]`
  ]
  .filter(sub => sub)
  .join('&nbsp;&nbsp;|&nbsp;&nbsp;');
}

// ###########################################################
//                        Main Code Section
// ###########################################################

// Call modal form & declare variables
const result = await MF.openForm('QUEST');
const name = result.Name.value;
const status = result.Status.value;
const location = result.Location.value;
const npc = result.Assignor.value;
const target = result.Assignee.value;
const sub = formatSub(status, npc);

if (result.status === 'ok') {

    // Rename file & open in new tab; Fire toast notification
    await tp.file.rename(name);
    await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(name));
    new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New quest <span style="text-decoration: underline;">${name}</span> added`;

} else {

    // Fire toast notification & exit templater
    new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled:</span><br>Quest has not been added`;
    return;
}
_%>

---
type: quest
target: <% target === "[ Group Quest ]" ? 'groupQuest' : target ? `"[[${target}]]"` : '' %>
locations:
 - <% location ? `"[[${location}]]"` : ''  %>
tags:
 - <% status ? `quest/${status.toLowerCase()}` : '' %>
---
###### <% name %>
<span class="sub2">:FasCircleExclamation: Quest<% status ? ` &nbsp; | &nbsp; :FasListCheck: ${status}` : '' %><% npc ? ` &nbsp; | &nbsp; :FasUser: [[${npc}]]` : '' %></span>
___

> [!quote|no-t]
>![[quest.png|right wm-sm]]Quest description here...

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
