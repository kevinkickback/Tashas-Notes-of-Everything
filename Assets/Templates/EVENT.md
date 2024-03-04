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
    "Personal": ":far_calendar_alt:",
    "Political": ":fas_bullhorn:",
    "Religious": ":fas_cross:",
    "Seasonal": ":rif_sun_foggy:",
  };

  return iconMappings[type] || ":fas_question_circle:";
}

// ###########################################################
//                        Main Code Section
// ###########################################################

let icon, type;

try {
  // Select event type
  type = await tp.system.suggester(
    ["Personal", "Political", "Religious", "Seasonal", "[ MANUAL INPUT ]"],
    ["Personal", "Political", "Religious", "Seasonal", "other"],
    true,
    "Type of event?"
  );

  // Manually input type
  if (type === "other") {
    type = await tp.system.prompt("Enter type:", "Leave blank for none", true);
    type = type === "Leave blank for none" ? null : type;
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
new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New ${type ? type.toLowerCase() : ""} eve <span style="text-decoration: underline;">{{name}}</span> added`;
_%>

---
type: event
tags:
<% type ? "- event/" + toCamelCase(type) : "-" %>
headerLink: "[[{{name}}#{{name}}]]"
---

###### {{name}}
<span class="sub2"><% type ? `${icon} ${type} Event` : "" %></span>
___

> [!quote|no-t]
>![[embed.jpg|right wm-sm]]Description of the <% type ? type.toLowerCase() + " event" : "event" %>, {{name}}.
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