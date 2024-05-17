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

// Return icon based on type
function getIcon(type) {
    const iconMappings = {
        'Magic Item': ':FasWandMagicSparkles:',
        'Religious Artifact': ':FasCross:',
        'Quest Item': ':fas_scroll:',
        Treasure: ':RiVipDiamondFill:'
    };

    return iconMappings[type] || ':FasCircleQuestion:';
}

// ###########################################################
//                        Main Code Section
// ###########################################################

// Call modal form & declare variables
const result = await MF.openForm('OBJECT');
const name = result.Name.value;
const type = result.Type.value;
const icon = getIcon(type);

if (result.status === 'ok') {

    // Rename file & open in new tab; Fire toast notification
    await tp.file.rename(name);
    await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(name));
    new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New object <span style="text-decoration: underline;">${name}</span> added`;

} else {

    // Fire toast notifcation & exit templater
    console.log('Modal form cancelled');
    new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled:</span><br>Object has not been added`;
    return;
}
_%>

---
type: object
tags:
 - <% type ? "object/" + toCamelCase(type) : '' %>
headerLink: "[[<% name %>#<% name %>]]"
---

###### <% name %>
<span class="sub2"><% type ? `${icon} ${type}` : '' %></span>
___

> [!quote|no-t]
>![[embed.jpg|right wm-sm]]Description of the  <% type ? type.toLowerCase() : 'object' %>, <% name %>.
<span class="clearfix"></span>

#### marker
#### marker
> [!column|flex 3]
>>[!hint]- NPC's
>>```dataview
>>LIST WITHOUT ID headerLink
>FROM "Compendium/NPC's" AND [[<% name %>]]
>
>>[!note]- HISTORY
>>```dataview
>LIST WITHOUT ID headerLink
>FROM "Session Notes" AND [[<% name %>]]