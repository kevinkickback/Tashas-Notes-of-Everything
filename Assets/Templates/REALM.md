<%*
// ###########################################################
//                        Main Code Section
// ###########################################################

const quickAdd = app.plugins.plugins.quickadd.api;
let plane;

// Create array containing plane names
const planeData = this.app.vault.getAllLoadedFiles()
  .filter(file => this.app.metadataCache.getFileCache(file)?.frontmatter?.type === 'plane')
  .map(file => file.basename);

try {
  // Select plane if available
  if (planeData.length) {
    planeData.push("[ MANUAL INPUT / NONE]");
    plane = await tp.system.suggester(planeData, planeData, true, "Which plane is {{name}} located in?");

    // Manual input
    if (plane === "[ MANUAL INPUT / NONE]") {
      plane = await tp.system.prompt("ENTER NAME (leave blank for none):", null, true);
    }
  } else {
    // Warning prompt
    let warning = await quickAdd.yesNoPrompt('NOTE:', 'Realms (i.e. worlds) are smaller parts of planes (i.e. universes). You currently have no planes. Would you like to add one now?');

    if (warning) {
      // Delete realm & temp note then execute plane template
      await this.app.vault.trash(app.vault.getAbstractFileByPath("temp.md"), true);
      await this.app.vault.trash(tp.file.find_tfile(tp.file.title), true);
      await this.app.commands.executeCommandById('quickadd:choice:733e1e2c-9945-4247-b265-cb4b42fbb875');
      return;
    } else if (warning === false) {
      // Confirmation prompt
      let confirm = await quickAdd.yesNoPrompt('Confirm:', 'Create new realm without any plane?');

      // Exit early        
      if (!confirm) {
        throw new Error;
      }
    } else if (warning === undefined) {
      throw new Error;
    }
  }
} catch (error) {
  // Exit Early: delete temp & note then show toast notification
  await this.app.vault.trash(app.vault.getAbstractFileByPath("temp.md"), true);
  await this.app.vault.trash(tp.file.find_tfile(tp.file.title), true);
  new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled!</span><br>no realm has been added`;
  return;
}

// Finished: delete temp, move note, open note, & show toast notification
await this.app.vault.trash(app.vault.getAbstractFileByPath("temp.md"), true);
await tp.file.move('/Compendium/Atlas/' + (plane ? plane + "/" : "") + tp.file.title + "/" + tp.file.title);
await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(tp.file.title));
new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New realm <span style="text-decoration: underline;">{{name}}</span> added`;
_%>

---
type: realm
locations:
<% plane ? `- "[[${plane}]]"` : "- " %>
tags:
- 
headerLink: "[[{{name}}#{{name}}]]"
---

![[banner.jpg|banner]]
###### {{name}}
<span class="sub2">:fas_globe:  Realm (world)</span>
___

> [!quote|no-t] SUMMARY
>Description of the realm {{name}}.

#### marker
> [!column|flex 3]
>> [!example]- LOCATIONS
>>```dataview
LIST WITHOUT ID headerLink
FROM "Compendium/Atlas/<% plane ? plane + "/" : "" %>{{name}}"
WHERE file.name != this.file.name AND type= "continent"
SORT file.name ASC
>
>> [!note]- HISTORY
>>```dataview
LIST WITHOUT ID headerLink
FROM "Session Notes" AND [[{{name}}]]
SORT file.ctime DESC