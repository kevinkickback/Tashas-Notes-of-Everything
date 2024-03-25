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
    "Country": ":fas_flag:",
    "General Region": ":fas_map:",
    "Kingdom": ":fab_fort_awesome:",
    "Nation": ":fas_flag:"
  };

  return iconMappings[type] || ":fas_question_circle:";
}

// ###########################################################
//                        Main Code Section
// ###########################################################

const quickAdd = app.plugins.plugins.quickadd.api;
let continent, locations, path, type;

// Create array containing all continents with name & path keys
const contData = this.app.vault.getAllLoadedFiles()
  .filter(file => this.app.metadataCache.getFileCache(file)?.frontmatter?.type === 'continent')
  .map(file => ({
    name: file.basename,
    path: file.path.split('/').slice(0, -1).join('/') + '/'
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
    continent = await tp.system.suggester(names, contData, true, "{{name}}'s location?");

    // Manual input
    if (continent.name === manualInput.name) {
      continent.name = await tp.system.prompt("Enter name:", "Leave blank for none", true);
      continent.name = continent.name === "Leave blank for none" ? null : continent.name;
    }
  } else {
    // Warning prompt
    let warning = await quickAdd.yesNoPrompt('Info:', "Regions (i.e. countries) are smaller parts of continents. You currently have no continents. Would you like to add one now?");

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

  // Set variables
  path = continent && continent.path ? continent.path : null;
  locations = continent && continent.name ? `- "[[${continent.name}]]"` : "- ";

  // Select region type
  type = await tp.system.suggester(
    ["Country", "Kingdom", "Nation", "General Region", "[ MANUAL INPUT / NONE ]"],
    ["Country", "Kingdom", "Nation", "General Region", "other"], true, "Type of region?");

  // Manual input
  if (type === "other") {
    type = await tp.system.prompt("Enter type:", "Leave blank for none", true);
    type = type === "Leave blank for none" ? null : type;
  }

  // Get icon
  icon = getIcon(type);

} catch (error) {
  // Exit Early: delete note & show toast notification
  await this.app.vault.trash(tp.file.find_tfile(tp.file.title), true);
  new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled!</span><br>No region has been added`;
  return;
}

// Finished: move note, open note, & show toast notification
await tp.file.move((path ? path : "Compendium/Atlas/") + tp.file.title + "/" + tp.file.title);
await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(tp.file.title));
new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New ${type ? type.toLowerCase() : "region"} <span style="text-decoration: underline;">{{name}}</span> added`;
_%>

---
type: region
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
>Description of the <% type ? type.toLowerCase() : "region" %> {{name}}.

#### marker
> [!column|flex 3]
> > [!hint]-  NPC's
> > <input type="checkbox" id="npc"/><ul class="sortMenu"><li class="sortIcon">:rif_list_settings:<ul class="dropdown npcedit"><li><label for="npc" class="directLabel active">Direct Links Only</label></li><li><label for="npc" class="childLabel">Include Sub-Locations</label></li></ul></li></ul>
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
WHERE file.name != this.file.name AND type= "locale"
SORT file.name ASC
>
>> [!note]- HISTORY
>>```dataview
LIST WITHOUT ID headerLink
FROM "Session Notes" AND [[{{name}}]]
SORT file.ctime DESC
#### marker