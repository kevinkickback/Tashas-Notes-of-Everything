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

// Icons: get icon based on type
function getIcon(type) {
  const iconMappings = {
    "City": ":fas_city:",
    "Town": ":rif_building_4:",
    "Encampment": ":fas_tower_observation:",
    "Village": ":fas_tents:",
    "Cave": ":fas_mound:",
    "Forest": ":fas_tree:",
    "Dessert": ":fas_sun:",
    "Mountain": ":fas_mountain:",
    "Plains": ":fas_wheat_awn:",
    "Swamp": ":fas_smog:",
    "Lake": ":fas_water:"
  };

  return iconMappings[type] || ":fas_question_circle:";
}

// ###########################################################
//                        Main Code Section
// ###########################################################

const quickAdd = app.plugins.plugins.quickadd.api;
let icon, locations, path, region, type;

// Create array containing all regions with name & path keys
const regData = this.app.vault.getAllLoadedFiles()
  .filter(file => this.app.metadataCache.getFileCache(file)?.frontmatter?.type === 'region')
  .map(file => ({
    name: file.basename,
    path: file.path.split('/').slice(0, -1).join('/') + '/'
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
    region = await tp.system.suggester(names, regData, true, "{{name}}'s location?");

    // Manual input
    if (region.name === manualInput.name) {
      region.name = await tp.system.prompt("ENTER NAME:", "Leave blank for none", true);
      region.name = region.name === "Leave blank for none" ? null : region.name;
    }
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

  // Set variables
  path = region && region.path ? region.path : null;
  locations = region && region.name ? `- "[[${region.name}]]"` : "- ";

  // Select category
  let category = await tp.system.suggester(["Settlement", "Topographic"], ["Settlement", "Topographic"], true, "Type of locale?");

  // Select type
  switch (category) {
    case "Settlement":
      type = await tp.system.suggester(
        ["City", "Town", "Village", "Encampment", "[ MANUAL INPUT ]"],
        ["City", "Town", "Village", "Encampment", "other"],
        true, "Type of settlement?");
      break;

    case "Topographic":
      type = await tp.system.suggester(
        ["Cave", "Desert", "Forest", "Mountain", "Plains", "Swamp", "Lake", "[ MANUAL INPUT ]"],
        ["Cave", "Desert", "Forest", "Mountain", "Plains", "Swamp", "Lake", "other"],
        true, "Type of topography?");
      break;

    default:
      throw new Error;
  }

  // Manual input
  if (type === "other") {
    type = await tp.system.prompt("Enter Type:", "Leave blank for none", true);
    type = type === "Leave blank for none" ? null : type;
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
await tp.file.move((path ? path : "Compendium/Atlas/") + tp.file.title + "/" + tp.file.title)
await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(tp.file.title));
new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New ${type ? type.toLowerCase() : "locale"} <span style="text-decoration: underline;">{{name}}</span> added`;
_%>

---
type: locale
locations:
<% locations %>
tags:
<% type ? "- location/" + toCamelCase(type) : "- " %>
headerLink: "[[{{name}}#{{name}}]]"
---

![[banner.jpg|banner]]
###### {{name}}
<span class="sub2"><% type ? `${icon} ${type}` : "" %></span>
___

> [!quote|no-t] SUMMARY
>Description of the <% type ? type.toLowerCase() : "locale" %> {{name}}.

#### marker
> [!column|flex 3]
> > [!hint]-  NPC's
> > <input type="checkbox" id="npc"/><ul class="sortMenu"><li class="sortIcon">:rif_list_settings:<ul class="dropdown ncpedit"><li><label for="npc" class="directLabel active">Direct Links Only</label></li><li><label for="npc" class="childLabel">Include Sub-Locations</label></li></ul></li></ul>
> >```dataviewjs
dv.container.className += ' npcDirect';
dv.list(dv.pages('"Compendium/NPC\'s"')
 .where(p => p.file.outlinks.includes(dv.current().file.link))
.sort(p => p.file.link)
.map(p => p.headerLink), 1);
>>```
>>```dataviewjs
dv.container.className += ' npcChild';
let page = dv.current().file.path;
let pages = new Set();
let stack = [page];
while (stack.length > 0) {
let elem = stack.pop();
let meta = dv.page(elem);
if (!meta) continue;
for (let inlink of meta.file.inlinks.concat(meta.file.outlinks).array()) {
let locations = dv.page(inlink.path);
if (!locations || pages.has(inlink.path) || inlink.path === meta.locations?.[0]) continue;
 if (dv.array(locations.locations).join(", ").includes(meta.file.path)) {
 pages.add(inlink.path);
 stack.push(inlink.path);
}}}
let data = Array.from(pages)
.filter(p => dv.page(p)?.type === "npc")
.map(p => dv.page(p).headerLink)
.sort((a, b) => {
if (a < b) return -1;
if (a > b) return 1;
return 0;
});
dv.list(data);
> 
>> [!example]- LOCATIONS
>>```dataview
LIST WITHOUT ID headerLink
FROM "<% path ? path : "Compendium/Atlas/" %>{{name}}"
WHERE file.name != this.file.name AND type= "landmark"
SORT file.name ASC
>
>> [!note]- HISTORY
>>```dataview
LIST WITHOUT ID headerLink
FROM "Session Notes" AND [[{{name}}]]
SORT file.ctime DESC