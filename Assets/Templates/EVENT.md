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

// Get icon based on event type
function getIcon(type) {
  const iconMappings = {
    "Personal Event": ":fas_user_edit:",
    "Political Event": ":fas_bullhorn:",
    "Religious Event": ":fas_cross:",
    "Seasonal Event": ":rif_sun_foggy:",
  };

  return iconMappings[type] || ":fas_question:";
}

// ###########################################################
//                        Main Code Section
// ###########################################################

let icon, type;

try {
  // Select event type
  type = await tp.system.suggester(
    ["Personal", "Political", "Religious", "Seasonal", "[ MANUAL INPUT ]"],
    ["Personal Event", "Political Event", "Religious Event", "Seasonal Event", "other"],
    true,
    "What type of event was/is {{name}}?"
  );

  // Manually input type
  if (type === "other") {
    let manSelect = await tp.system.prompt("Please enter the event type:", null, true);
    type = manSelect;
  }

  // Get icon
  icon = getIcon(type);
  
} catch (error) {
  // Exit Early: delete temp & note then show toast notification
  await this.app.vault.trash(app.vault.getAbstractFileByPath("temp.md"), true);
  await this.app.vault.trash(tp.file.find_tfile(tp.file.title), true);
  new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled!</span><br>No event has been added`;
  return;
}

// Finished: delete temp, open note, fire toast message
await this.app.vault.trash(app.vault.getAbstractFileByPath("temp.md"), true);
app.workspace.getLeaf(true).openFile(tp.file.find_tfile(tp.file.title));
new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New ${type ? type.toLowerCase() : "event"} <span style="text-decoration: underline;">{{name}}</span> added`;
_%>

---
type: event
tags:
<% type ? "- " + toCamelCase(type) : "- " %>
headerLink: "[[{{name}}#{{name}}]]"
---

###### {{name}}
<span class="sub2"><% type ? `${icon} *${type}*` : "" %></span>
___

> [!quote|no-t]
>![[embed.jpg|right wm-sm]]Description of the <% type ? type.toLowerCase() : "event" %>, {{name}}.
<span class="clearfix"></span>

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