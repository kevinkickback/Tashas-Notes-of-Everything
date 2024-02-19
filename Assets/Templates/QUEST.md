<%*
// ###########################################################
//                        Helper Functions
// ###########################################################

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

// ###########################################################
//                        Main Code Section
// ###########################################################

let npc, selectLoc, locations;

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

// Create array containing NPC names
const npcNames = this.app.vault.getMarkdownFiles()
    .filter(file => file.path.startsWith('Compendium/NPC\'s/'))
    .map(file => file.basename);

try {
    // Select NPC if available
    if (npcNames.length) {
        npcNames.push("[ MANUAL INPUT / NONE ]");

        // Select Prompt
        npc = await tp.system.suggester(npcNames, npcNames, true, "Which NPC gave the quest?");

        // Manual input
        if (npc === "[ MANUAL INPUT / NONE ]") {
            npc = await tp.system.prompt("ENTER NAME (leave blank for none):", null, true);
        }
    }

    // Select region if available
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
            'Where did the quest originate?'
        );

        if (selectLoc.name === manualInput.name) {
            selectLoc.name = await tp.system.prompt("ENTER NAME (leave blank for none):", null, true);
        }
    }

    // Set variables
    locations = selectLoc.parents ? selectLoc.parents.map(value => `- "[[${value}]]"`).join("\n") + `\n- "[[${selectLoc.name}]]"` : selectLoc.name ? `- "[[${selectLoc.name}]]"` : "-";
    
} catch (error) {
    // Handle any errors here
    console.error("An error occurred:", error);
}

// Finished: open note & show toast notification
app.workspace.getLeaf(true).openFile(tp.file.find_tfile(tp.file.title));
new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New quest <span style="text-decoration: underline;">{{name}}</span> added`;
_%>

---
type: quest
locations:
<% locations %>
tags:
- 
headerLink: "[[{{name}}#{{name}}]]"
---
###### {{name}}
<span class="sub2">:fas_scroll: *Quest*<% npc ? ` | :fas_user: *[[${npc}#${npc}|${npc}]]*` : "" %></span>
___

> [!quote|no-t]
>![[quest.png|right wm-sm]]Quest description here...

#### marker
> [!column|flex 3]
>>[!note]- HISTORY
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Session Notes" AND [[{{name}}]]

