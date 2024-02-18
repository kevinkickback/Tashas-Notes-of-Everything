<%*
// ###########################################################
//                        Helper Functions
// ###########################################################

// Tag Formatter: convert string to camel case
function toCamelCase(str) {
  return str.replace(/\s(.)/g, function (match, group1) {
    return group1.toUpperCase();
  }).replace(/\s/g, '').replace(/^(.)/, function (match, group1) {
    return group1.toLowerCase();
  });
}

// Get icon based on object type
function getIcon(type) {
  const iconMappings = {
    "Magic Item": ":fas_magic:",
    "Artifact": ":fas_cross:",
    "Quest Item": ":fas_scroll:",
    "Treasure": ":rif_vip_diamond:"
  };
  
  return iconMappings[type] || ":fas_question:";
}

// ###########################################################
//                        Main Code Section
// ###########################################################

let icon, type;

try {
    // Select object type
    type = await tp.system.suggester(
        ["Magic Item", "Religious Artifact", "Quest Item", "Treasure", "[ MANUAL INPUT ]"],
        ["Magic Item", "Religious Artifact", "Quest Item", "Treasure", "other"],
        true,
        "What type of object is {{name}}?"
    );

    // Manual Input
    if (type === "other") {
        let manualType = await tp.system.prompt("Please enter object type:", null, true);
        type = manualType;
    }

    // Get icon
    icon = getIcon(type);
    
} catch (error) {
  // Exit Early: delete temp & note then show toast notification
  await this.app.vault.trash(app.vault.getAbstractFileByPath("temp.md"), true);
  await this.app.vault.trash(tp.file.find_tfile(tp.file.title), true);
  new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled!</span><br>No object has been added`;
}

// Finished: delete temp, open note, fire toast message
await this.app.vault.trash(app.vault.getAbstractFileByPath("temp.md"), true);
app.workspace.getLeaf(true).openFile(tp.file.find_tfile(tp.file.title));
new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New ${type ? type.toLowerCase() : "item"} <span style="text-decoration: underline;">{{name}}</span> added`;
_%>

---
type: object
tags:
<% type ? "- " + toCamelCase(type) : "- " %>
headerLink: "[[{{name}}#{{name}}]]"
---

###### {{name}}
<span class="sub2"><% type ? `${icon} *${type}*` : "" %></span>
___

> [!quote|no-t]
>![[embed.jpg|right wm-sm]]Description of the  <% type ? type.toLowerCase() : "object" %>, {{name}}.
<span class="clearfix"></span>

#### marker
#### marker
> [!column|flex 3]
>>[!hint]- NPC's
>>```dataview
>>LIST WITHOUT ID headerLink
>FROM "Compendium/NPC's" AND [[{{name}}]]
>
>>[!note]- HISTORY
>>```dataview
>LIST WITHOUT ID headerLink
>FROM "Session Notes" AND [[{{name}}]]