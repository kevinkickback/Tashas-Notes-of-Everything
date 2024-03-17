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
    "Continent": ":fas_earth_americas:",
    "Ocean": ":fas_water:",
  };

  return iconMappings[type] || ":fas_question:";
}

// ###########################################################
//                        Main Code Section
// ###########################################################

const quickAdd = app.plugins.plugins.quickadd.api;
let icon, locations, path, type;

// Create array containing all realms with name & path keys
const realmData = this.app.vault.getAllLoadedFiles()
  .filter(file => this.app.metadataCache.getFileCache(file)?.frontmatter?.type === 'realm')
  .map(file => ({
    name: file.basename,
    path: file.path.split('/').slice(0, -1).join('/') + '/'
  }));
realmData.forEach(realm => {
    console.log(realm.path);
});


try {
  // Select realm if available
  if (realmData.length) {
    const manualInput = {
      name: "[ MANUAL INPUT / NONE ]",
      parents: null,
      path: null
    };
    realmData.push(manualInput);

    // Select prompt
    let names = realmData.map(file => file.name);
    realm = await tp.system.suggester(names, realmData, true, "{{name}}'s location?");

    // Manual input
    if (realm.name === manualInput.name) {
      realm.name = await tp.system.prompt("Enter name:", "Leave blank for none", true);
      realm.name = realm.name === "Leave blank for none" ? null : realm.name;
    }
  } else {
    // Warning prompt
    let warning = await quickAdd.yesNoPrompt('Info:', "Continents/Oceans are smaller parts of realms (i.e. worlds). You currently have no realms. Would you like to add one now?");

    if (warning) {
      // Delete continent & temp note then execute realm template
      await this.app.vault.trash(app.vault.getAbstractFileByPath("temp.md"), true);
      await this.app.vault.trash(tp.file.find_tfile(tp.file.title), true);
      await this.app.commands.executeCommandById('quickadd:choice:9b399108-ae05-46d4-be43-bcf75f75efd1');
      return;
    } else if (warning === false) {
      // Confirmation prompt
      let confirm = await quickAdd.yesNoPrompt('Confirm:', 'Create new continent/ocean without any realm?');

      // Exit early
      if (!confirm) {
        throw new Error;
      }
    } else if (warning === undefined) {
      throw new Error;
    }
  }

  // Set variables
  path = realm && realm.path ? realm.path : null;
  plane = realm && realm.parents ? realm.parents : null;
  locations = realm && realm.name ? `- "[[${realm.name}]]"` : "- ";

  // Select type of geography
  type = await tp.system.suggester(
    ["Continent", "Ocean", "[MANUAL INPUT / NONE]"],
    ["Continent", "Ocean", "other"],
    true,
    "Type of location?"
  );

  // Manual input
  if (type === "other") {
    type = await tp.system.prompt("Enter type:", "Leave blank for none", true);
    type = type === "Leave blank for none" ? null : type;
  }

  icon = getIcon(type);

} catch (error) {
  // Exit Early: delete temp & note then show toast notification
  await this.app.vault.trash(app.vault.getAbstractFileByPath("temp.md"), true);
  await this.app.vault.trash(tp.file.find_tfile(tp.file.title), true);
  new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled!</span><br>No continent / ocean has been added`;
  return;
}

// Finished: delete temp, move note, open note, & show toast notification
await tp.file.move((path ? path : "Compendium/Atlas/") + tp.file.title + "/" + tp.file.title);
await this.app.vault.trash(app.vault.getAbstractFileByPath("temp.md"), true);
await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(tp.file.title));
new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New ${type ? type.toLowerCase() : "location"} <span style="text-decoration: underline;">{{name}}</span> added`;
_%>

---
type: continent
locations:
<% locations %>
tags:
- 
headerLink: "[[{{name}}#{{name}}]]"
---

![[banner.jpg|banner]]
###### {{name}}
<span class="sub2"><% type ? `${icon} ${type}` : "" %></span>
___

> [!quote|no-t]
>Quick description of the <% type ? type.toLowerCase() : "location" %> {{name}}.

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
WHERE file.name != this.file.name AND type= "region"
SORT file.name ASC
>
>> [!note]- HISTORY
>>```dataview
LIST WITHOUT ID headerLink
FROM "Session Notes" AND [[{{name}}]]
SORT file.ctime DESC
#### marker