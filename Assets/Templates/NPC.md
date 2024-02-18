<%*
// ###########################################################
//                        Helper Functions
// ###########################################################

// File Tree Style: format entries with a file tree look
function fileTreeStyle(data) {
    let treeLines = [];
    let previousDepths = [];
    for (let i = 0; i < data.length; i++) {
        const { name, depth } = data[i];
        let prefix = '';
        for (let j = 0; j < depth - 1; j++) {
            if (previousDepths[j]) {
                prefix += '│  ';
            } else {
                prefix += '   ';
            }
        }
        if (depth > 0) {
            if (previousDepths[depth - 1]) {
                prefix += '├─ ';
            } else {
                prefix += '└─ ';
            }
        }
        treeLines.push(prefix + name);
        previousDepths = previousDepths.slice(0, depth - 1);
        for (let j = previousDepths.length; j < depth; j++) {
            previousDepths.push(j === depth - 1 || j === depth - 2); // Adjusted logic
        }
    }
    return treeLines;
}

// Sort: by path with parent file name priority
function pppSort(a, b) {
    const pathA = a.path.split('/');
    const pathB = b.path.split('/');
    const parentA = pathA[pathA.length - 2];
    const parentB = pathB[pathB.length - 2];

    if (parentA === parentB && (a.basename === parentA || b.basename === parentB)) return a.basename === parentA ? -1 : 1;
    for (let i = 0; i < Math.min(pathA.length, pathB.length); i++)
        if (pathA[i] !== pathB[i])
            return i === pathA.length - 1 ? -1 : i === pathB.length - 1 ? 1 : pathA[i].localeCompare(pathB[i], undefined, {
                numeric: true
            });
    return pathA.length - pathB.length;
};

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

let job, like, locations, race, selectLoc, sex;

// Create array containing all locations with name, depth, & parent keys
const locData = app.vault.getMarkdownFiles()
  .filter(file => file.path.startsWith("Compendium/Atlas"))
  .sort(pppSort)
  .map(file => ({
    name: file.basename,
    depth: file.path.split('/').length - (file.basename === file.path.split('/')[file.path.split('/').length - 2] ? 3 : 2),
    parents: (this.app.metadataCache.getFileCache(file)?.frontmatter?.locations
      ?.map(location => typeof location === 'string' ? location.replace(/^\[\[|\]\]$/g, "") : location)),
  }));

// Create array containing races
const races = [
  "Aarakocra", "Aasimar", "Bugbear", "Centaur", "Changeling", "Dhampir", "Dragonborn", "Dwarf", "Elf",
  "Firbolg", "Genasi", "Gith", "Gnome", "Goblin", "Goliath", "Half-Elf", "Half-Orc", "Hexblood", "Hobgoblin",
  "Human", "Kalashtar", "Kenku", "Kobold", "Leonin", "Lizardfolk", "Loxodon", "Minotaur", "Orc", "Reborn Lineage",
  "Satyr", "Shifter", "Simic Hybrid", "Tabaxi", "Tortle", "Triton", "Vedalken", "Verdan", "Warforged", "Yuan-Ti Pureblood"
];

try {
  // Select sex
  sex = await tp.system.suggester(["Male", "Female", "Other"], ["Male", "Female", "Other"], true, "What is {{name}}'s gender?");
  
  // Manual Input
  if (sex === "Other") {
      sex = await tp.system.prompt("ENTER GENDER (leave blank for none):", null, true);
  }

  // Select race
  race = await tp.system.suggester(races, races, true, "What race is {{name}}?");

  // Select Location
  if (locData.length) {
    const manualInput = {
      name: "[ MANUAL INPUT / NONE ]",
      depth: 0,
      parents: null
    };
    locData.push(manualInput);

    // Select prompt
    const names = fileTreeStyle(locData);
    selectLoc = await tp.system.suggester(
      names,
      locData,
      true,
      "Is {{name}} associated with a specific location?"
    );

    // Manually enter location
    if (selectLoc.name === manualInput.name) {
      selectLoc.name = await tp.system.prompt("ENTER NAME (leave blank for none):", null, true);
    }
  }

  // Set variables
  locations = selectLoc.parents ? selectLoc.parents.map(value => `- "[[${value}]]"`).join("\n") + `\n- "[[${selectLoc.name}]]"` : selectLoc.name ? `- "[[${selectLoc.name}]]"` : "-";


  // Select affinity
  like = await tp.system.suggester(
    ["Friendly", "Neutral", "Hostile", "Unknown"],
    ["Friendly", "Neutral", "Hostile", "Unknown"],
    true,
    "What is {{name}}'s' affinity towards the party?"
  );

  // Enter occupation
  job = await tp.system.prompt("What is {{name}}'s occupation? (leave blank for none)", null, true);
  
} catch (error) {
  // Exit Early: delete note then show toast notification
  await this.app.vault.trash(tp.file.find_tfile(tp.file.title), true);
  new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled!</span><br>No NPC has been added`;
  return;
}

// Finished: open note, fire toast message
app.workspace.getLeaf(true).openFile(tp.file.find_tfile(tp.file.title));
new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New NPC <span style="text-decoration: underline;">{{name}}</span> added`;
_%>


---
type: npc
locations:
<% locations %>
tags:
<% `- race/${toCamelCase(race)}` %><% like ? `\n- affinity/${toCamelCase(like)}` : "" %><% job ? `\n- job/${toCamelCase(job)}` : "" %>
headerLink: "[[{{name}}#{{name}}]]"
---
###### {{name}}
<span class="sub2"><% selectLoc.name ? `:fas_map_location_dot: [[${selectLoc.name}#${selectLoc.name}]] &nbsp; | &nbsp; ` : "" %><% like ? `:fas_heartbeat: *${like}*` : "" %> </span>
___

> [!infobox|no-t right]
> ![[portrait.jpg]]
> ###### :fas_magnifying_glass_plus:  [[portrait.jpg|Enlarge Image]]
> | Type | Stat |
> | ---- | ---- |
> | :fas_briefcase: Job | <% job ? job : "???" %> |
> | :fas_venus_mars: Gender | <% sex %> |
> | :fas_user: Race | <% race %> |
<span class="clearfix"></span>

> [!quote|no-t]
>Profile of {{name}}, the <% sex.toLowerCase() %> <% race.toLowerCase() %> NPC.

#### marker
> [!column|flex 3]
>> [!important]- QUESTS:
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Compendium/Party/Quests" AND [[{{name}}]]
>
>>[!note]- HISTORY
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Session Notes" AND [[{{name}}]]