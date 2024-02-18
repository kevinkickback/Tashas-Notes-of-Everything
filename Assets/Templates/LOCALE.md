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
    "City": ":fas_city:",
    "Kingdom": ":fab_fort_awesome:",
    "Town": ":rif_building_4:",
    "Encampment": ":fas_campground:",
    "Village": ":fas_scroll:",
    "Forest": ":fas_tree:",
    "Dessert": ":fas_sun:",
    "Mountain": ":fas_mountain:",
    "Plains": ":faSOLID_wheat_awn:",
    "Swamp": ":fas_smog:",
    "Lake": ":fas_water:"
  };
  
  return iconMappings[type] || ":fas_question:";
}

// ###########################################################
//                        Main Code Section
// ###########################################################

const quickAdd = app.plugins.plugins.quickadd.api;
let continent, icon, locations, path, plane, realm, region, type;

// Create array containing regions
const regData = this.app.vault.getAllLoadedFiles()
  .filter(file => this.app.metadataCache.getFileCache(file)?.frontmatter?.type === 'region')
  .map(file => ({
    name: file.basename,
    parents: (this.app.metadataCache.getFileCache(file)?.frontmatter?.locations
      ?.map(location => typeof location === 'string' ? location.replace(/^\[\[|\]\]$/g, "") : location)),
    path: file.path.split('/').slice(2, -1).join('/') + '/'
  }));

try {
  // Select region if available
  if (regData.length) {
    const manualInput = {
      name: "[ MANUAL INPUT / NONE ]",
      parents: null,
      path: null
    };
    regData.push(manualInput);

    // Select prompt
    let names = regData.map(file => file.name);
    region = await tp.system.suggester(names, regData, true, "Which region is {{name}} located in?");

    // Manual input
    if (region.name === manualInput.name) {
      region.name = await tp.system.prompt("ENTER NAME (leave blank for none):", null, true);
    }

    // Set variables
    path = region.path ? region.path : null;
    plane = region.parents ? region.parents[0] : null;
    realm = region.parents ? region.parents[1] : null;
    continent = region.parents ? region.parents[2] : null;
    locations = region.parents ? region.parents.map(value => `- "[[${value}]]"`).join("\n") + `\n- "[[${region.name}]]"` : region.name ? `- "[[${region.name}]]"` : "- ";
  } else {
    // Warning prompt
    let warning = await quickAdd.yesNoPrompt('NOTE:', 'A locale (i.e. town) is a smaller part of a region (i.e. country). You currently have no regions. Would you like to add one now?');

    if (warning) {
      // Delete note & execute region template
      await this.app.vault.trash(tp.file.find_tfile(tp.file.title), true);
      await this.app.commands.executeCommandById('quickadd:choice:515787be-a138-474b-b004-10d2a252710e');
      return;
    } else if (warning === false) {
      // Confirmation prompt
      let confirm = await quickAdd.yesNoPrompt('Confirm:', 'Create new locale without any region?');

      // Exit early
      if (!confirm) {
        throw new Error;
      }
    } else if (warning === undefined) {
      throw new Error;
    }
  }

  // Select category
  let category = await tp.system.suggester(["Settlement", "Topographic"], ["Settlement", "Topographic"], true, "What type of locale is {{name}}?");

  // Select type
  switch (category) {
    case "Settlement":
      type = await tp.system.suggester(
        ["Kingdom", "City", "Town", "Village", "Encampment", "[ MANUAL INPUT ]"],
        ["Kingdom", "City", "Town", "Village", "Encampment", "other"],
        true, "What type of settlement is {{name}}?");
      break;

    case "Topographic":
      type = await tp.system.suggester(
        ["Forest", "Desert", "Mountain", "Plains", "Swamp", "Lake", "[ MANUAL INPUT ]"],
        ["Forest", "Desert", "Mountain", "Plains", "Swamp", "Lake", "other"],
        true, "What type of topography is {{name}}?");
      break;

    default:
      throw new Error;
  }

  // Manually input type
  if (type === "other") {
    type = await tp.system.prompt("ENTER TYPE (leave blank for none):", null, true);
  }

    // Get icon
    icon = getIcon(type);
  
} catch (error) {
  // Exit Early: delete note & show toast notification
  await this.app.vault.trash(tp.file.find_tfile(tp.file.title), true);
  new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled!</span><br>No locale has been added`;
  return;
}

// Finished: move note, open note, & show toast notification
await tp.file.move('/Compendium/Atlas/' + (plane ? plane + "/" : "") + (realm ? realm + "/" : "") + (continent ? continent + "/" : "") + (region.name ? region.name + "/" : "") + tp.file.title + "/" + tp.file.title)
await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(tp.file.title));
new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New ${type ? type.toLowerCase() : "locale"} <span style="text-decoration: underline;">{{name}}</span> added`;
_%>

---
type: locale
locations:
<% locations %>
tags:
<% type ? "- " + toCamelCase(type) : "- " %>
headerLink: "[[{{name}}#{{name}}]]"
---

![[banner.jpg|banner]]
###### {{name}}
<span class="sub2"><% type ? `${icon} *${type}*` : "" %></span>
___

> [!quote|no-t] SUMMARY
>Description of the <% type ? type.toLowerCase() : "locale" %> {{name}}.

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
FROM "Compendium/Atlas/<% plane ? plane + "/" + realm + "/" + continent + "/" + region.name + "/" : "" %>{{name}}"
WHERE file.name != this.file.name AND type= "landmark"
SORT file.name ASC
>
>> [!note]- HISTORY
>>```dataview
LIST WITHOUT ID headerLink
FROM "Session Notes" AND [[{{name}}]]
SORT file.ctime DESC