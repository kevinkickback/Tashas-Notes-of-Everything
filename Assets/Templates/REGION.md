<%*
// ###########################################################
//                        Helper Functions
// ###########################################################

// Tag Formatter: convert string to camel case
function toCamelCase(str) {
  return str.replace(/\s(.)/g, function(match, group1) {
    return group1.toUpperCase();
  }).replace(/\s/g, '').replace(/^(.)/, function(match, group1) {
    return group1.toLowerCase();
  });
}

// ###########################################################
//                        Main Code Section
// ###########################################################

const quickAdd = app.plugins.plugins.quickadd.api;
let path, plane, locations, realm, type;

// Create array containing all continents with name, parent, & path keys
const contData = this.app.vault.getAllLoadedFiles()
  .filter(file => this.app.metadataCache.getFileCache(file)?.frontmatter?.type === 'continent')
  .map(file => ({
    name: file.basename,
    parents: (this.app.metadataCache.getFileCache(file)?.frontmatter?.locations
      ?.map(location => typeof location === 'string' ? location.replace(/^\[\[|\]\]$/g, "") : location)),
    path: file.path.split('/').slice(2, -1).join('/') + '/'
  }));

try {
  // Select continent if available
  if (contData.length) {
    const manualInput = {
      name: "[ MANUAL INPUT / NONE ]",
      parents: null,
      path: null
    };
    contData.push(manualInput);

    // Select prompt
    let names = contData.map(file => file.name);
    continent = await tp.system.suggester(names, contData, true, "Which continent or ocean is {{name}} located on/in?");

    // Manual input
    if (continent.name === manualInput.name) {
      continent.name = await tp.system.prompt("ENTER NAME (leave blank for none):", null, true);
    }

    // Set variables
    path = continent.path ? continent.path : null;
    plane = continent.parents ? continent.parents[0] : null;
    realm = continent.parents ? continent.parents[1] : null;
    locations = continent.parents ? continent.parents.map(value => `- "[[${value}]]"`).join("\n") + `\n- "[[${continent.name}]]"` : continent.name ? `- "[[${continent.name}]]"` : "- ";

    // Select region type
    type = await tp.system.suggester(["Country", "Kingdom", "Nation", "General Region", "[ MANUAL INPUT / NONE ]"], ["Country", "Kingdom", "Nation", "General Region", "other"], true, "What type of region is {{name}}?");

    // Manually input region
    if (type === "other") {
      var manSelect = await tp.system.prompt("Please enter territory type:", null, true);
      type = manSelect;
    }
  } else {
    // Warning prompt
    let warning = await quickAdd.yesNoPrompt('NOTE:', "Regions (i.e. countries) are smaller parts of continents. You currently have no continents. Would you like to add one now?");

    if (warning) {
      // Delete note & execute continent template
      await this.app.vault.trash(tp.file.find_tfile(tp.file.title), true);
      await this.app.commands.executeCommandById('quickadd:choice:9b399108-ae05-46d4-be43-bcf75f75efd1');
      return;
    } else if (warning === false) {
      // Confirmation prompt
      let confirm = await quickAdd.yesNoPrompt('Confirm:', 'Create new region without any continent?');

      // Exit early
      if (!confirm) {
        throw new Error;
      }
    } else if (warning === undefined) {
      throw new Error;
    }
  }
} catch (error) {
  // Exit Early: delete note & show toast notification
  await this.app.vault.trash(tp.file.find_tfile(tp.file.title), true);
  new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled!</span><br>No region has been added`;
  return;
}

// Finished: move note, open note, & show toast notification
await tp.file.move('/Compendium/Atlas/' + (plane ? plane + "/" : "") + (realm ? realm + "/" : "") + (continent.name ? continent.name + "/" : "") + tp.file.title + "/" + tp.file.title);
await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(tp.file.title));
new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New ${type ? type.toLowerCase() : "region"} <span style="text-decoration: underline;">{{name}}</span> added`;
_%>

---
type: region
locations:
<% locations %>
tags:
<% type ? "- " + toCamelCase(type) : "- " %>
headerLink: "[[{{name}}#{{name}}]]"
---

![[banner.jpg|banner]]
###### {{name}}
<span class="sub2"><% type ? `:fas_map: *${type}*` : "" %></span>
___

> [!quote|no-t] SUMMARY
>Description of the <% type ? type.toLowerCase() : "region" %> {{name}}.

#### marker
> [!column|flex 3]
>> [!hint]-  NPC's
>> ```dataview
LIST WITHOUT ID headerLink
FROM "Compendium/NPC's" AND [[{{name}}]]
SORT file.name ASC
>
>> [!example]- LOCATIONS
>>```dataview
LIST WITHOUT ID headerLink
FROM "Compendium/Atlas/<% plane ? plane + "/" + realm + "/" + continent.name + "/" : "" %>{{name}}"
WHERE file.name != this.file.name AND type= "locale"
SORT file.name ASC
>
>> [!note]- HISTORY
>>```dataview
LIST WITHOUT ID headerLink
FROM "Session Notes" AND [[{{name}}]]
SORT file.ctime DESC
#### marker