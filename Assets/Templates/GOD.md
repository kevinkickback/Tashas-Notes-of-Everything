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

// ###########################################################
//                        Main Code Section
// ###########################################################

const quickAdd = app.plugins.plugins.quickadd.api;
let alignment, domains, sex, tags;

try {
  // Select sex
  sex = await tp.system.suggester(
    ["Male", "Female", "Androgynous", "Agender / Non-binary"],
    ["Male", "Female", "Androgynous", "Agender"],
    true,
    "What is {{name}}'s gender identity?"
  );

  // Select alignment
  alignment = await tp.system.suggester(
    ["Lawful Good", "Neutral Good", "Chaotic Good",
    "Lawful Neutral", "True Neutral", "Chaotic Neutral",
    "Lawful Evil", "Neutral Evil", "Chaotic Evil"], 
    ["Lawful Good", "Neutral Good", "Chaotic Good",
    "Lawful Neutral", "True Neutral", "Chaotic Neutral",
    "Lawful Evil", "Neutral Evil", "Chaotic Evil"],
    true, "What is {{name}}'s alignment?"
  );

  // Display info prompt
  const info = await quickAdd.infoDialog(
    "NOTE:",
    "Select all relevant divine domains from the following list. If none apply, choose the last option."
  );

  // Select domains
  domains = await quickAdd.checkboxPrompt(
["Agriculture", "Air", "Ambition", "Arts", "Avarice", "Balance", "Beasts", "Beauty", "Celebrations", "Change", "Civilization", "Conquest", "Corruption", "Creation", "Darkness", "Death", "Destruction", "Earth", "Envy", "Fall", "Fire", "Forge", "Freedom", "Glory", "Gluttony", "Grave", "Greed", "Growth", "Hatred", "Healing", "Hope", "Illusion", "Invention", "Justice", "Knowledge", "Law", "Lies", "Life", "Light", "Love", "Luck", "Lust", "Madness", "Magic", "Mist", "Moon", "Nature", "Nobility", "Order", "Pain", "Patience", "Pestilence", "Plants", "Pleasure", "Poison", "Pride", "Protection", "Renewal", "Repose", "Retribution", "Sea", "Secrets", "Shadow", "Sleep", "Sloth", "Snow", "Strength", "Sun", "Temperance", "Tempest", "Time", "Trade", "Travel", "Trickery", "Tyranny", "Underneath", "Vengeance", "Vengence", "War", "Water", "Wealth", "Wilderness", "Winter", "Wrath", "Zeal", "[ NONE ]"]
  );

  // None selected or exit early
  if (domains[0] === "[ NONE ]") {
    domains = "None"
  } else if (!domains.length) {
    throw new Error;
  }

  tags = domains !== "None" ? domains.map(value => `- domain/${value.toLowerCase()}Domain`).join("\n") : "- ";

} catch (error) {
  // Exit Early: delete temp & note then show toast notification
  await this.app.vault.trash(app.vault.getAbstractFileByPath("temp.md"), true);
  await this.app.vault.trash(tp.file.find_tfile(tp.file.title), true);
  new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled!</span><br>No diety has been added`;
  return;
}

// Finished: delete temp, open note, fire toast message
await this.app.vault.trash(app.vault.getAbstractFileByPath("temp.md"), true);
app.workspace.getLeaf(true).openFile(tp.file.find_tfile(tp.file.title));
new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New diety <span style="text-decoration: underline;">{{name}}</span> added`;
_%>

---
type: lore
tags:
<% tags %>
headerLink: "[[{{name}}#{{name}}]]"
---

###### {{name}}
<span class="sub2">:fas_cross: *Deity* &nbsp; | &nbsp; :fas_yin_yang: *<% alignment %>*</span>
___

> [!infobox|no-t right]
> ![[portrait.jpg]]
> ###### :fas_magnifying_glass_plus:  [[portrait.jpg|Enlarge Image]]
> | Type | Stat |
> | ---- | ---- |
> | :fas_bolt_lightning: Domains | <% domains.join(", ") %> |
> | :fas_venus_mars: Gender | <% sex %> |
> | :fas_building_columns: Pantheon | Faerûnian |

> [!quote|no-t]
>Profile of {{name}}, the <% alignment.toLowerCase() %> <% sex.toLowerCase() %> deity.

#### marker
> [!column|flex 3]
>> [!hint]-  NPC's
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Compendium/NPC's" AND [[{{name}}]] 
>
>>[!note]- HISTORY
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Session Notes" AND [[{{name}}]]