<%*
// ###########################################################
//                        Main Code Section
// ###########################################################

// Call modal form & declare variables
const result = await MF.openForm('ORGANIZATION');
const alignment = result.Alignment.value;
const name = result.Name.value;
const location = result.Location.value;

if (result.status === 'ok') {

    // Rename file & open in new tab; Fire toast notification
    await tp.file.rename(name);
    await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(name));
    new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New organization <span style="text-decoration: underline;">${name}</span> added`;

} else {

    // Fire toast notifcation & exit templater
    console.log('Modal form cancelled');
    new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled:</span><br>Organization has not been added`;
    return;
}
_%>

---
type: organization
locations:
 - <% location ? `"[[${location}]]"` : '' %>
tags:
 - 
headerLink: "[[<% name %>#<% name %>]]"
---

###### <% name %>
<span class="sub2">:FasSitemap: Organization</span>
___

> [!quote|no-t]
>![[embed.jpg|right wm-sm]]Profile of <% name %>, the <% alignment ? alignment.toLowerCase() : 'unknown' %> aligned organization.

#### marker
> [!column|flex 3]
>>[!hint]- NPC's
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Compendium/NPC's" AND [[<% name %>]]
>
>>[!note]- HISTORY
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Session Notes" AND [[<% name %>]]