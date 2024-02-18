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

let align, locations, selectLoc;

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

try {
  // Select Location if available
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
      'Is "{{name}}" associated with a specific location?'
    );

    // Manual input
    if (selectLoc.name === manualInput.name) {
      selectLoc.name = await tp.system.prompt("ENTER NAME (leave blank for none):", null, true);
    }
  }

  // Set variables
  locations = selectLoc.parents ? selectLoc.parents.map(value => `- "[[${value}]]"`).join("\n") + `\n- "[[${selectLoc.name}]]"` : selectLoc.name ? `- "[[${selectLoc.name}]]"` : "-";

  // Select alignment
  align = await tp.system.suggester(
    ["Lawful Good", "Neutral Good", "Chaotic Good", "Lawful Neutral", "True Neutral", "Chaotic Neutral", "Lawful Evil", "Neutral Evil", "Chaotic Evil", "[ UNKNOWN ]"],
    ["Lawful Good", "Neutral Good", "Chaotic Good", "Lawful Neutral", "True Neutral", "Chaotic Neutral", "Lawful Evil", "Neutral Evil", "Chaotic Evil", "Unknown"]
    , true, "What is {{name}}'s alignment?");

} catch (error) {
  // Exit Early: delete temp & note then show toast notification
  await this.app.vault.trash(app.vault.getAbstractFileByPath("temp.md"), true);
  await this.app.vault.trash(tp.file.find_tfile(tp.file.title), true);
  new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled!</span><br>No organization has been added`;
  return;
}

// Finished: delete temp, open note, & show toast notification
await this.app.vault.trash(app.vault.getAbstractFileByPath("temp.md"), true);
app.workspace.getLeaf(true).openFile(tp.file.find_tfile(tp.file.title));
new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New organization <span style="text-decoration: underline;">{{name}}</span> added`;
_%>

---
type: organization
locations:
<% locations %>
tags:
- 
headerLink: "[[{{name}}#{{name}}]]"
---

###### {{name}}
:fas_sitemap: *Organization* &nbsp; | &nbsp; :fas_yin_yang:  <% align %>
___

> [!quote|no-t]
>![[embed.jpg|right wm-sm]]Profile of {{name}}, the <% align.toLowerCase() %> aligned organization.

#### marker
> [!column|flex 3]
>>[!hint]- NPC's
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Compendium/NPC's" AND [[{{name}}]]
>
>>[!note]- HISTORY
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Session Notes" AND [[{{name}}]]