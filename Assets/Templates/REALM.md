<%*
// ###########################################################
//                        Main Code Section
// ###########################################################

const quickAdd = app.plugins.plugins.quickadd.api;
let plane;

// Create array containing all planes
const planeData = this.app.vault.getAllLoadedFiles()
  .filter(file => this.app.metadataCache.getFileCache(file)?.frontmatter?.type === 'plane')
  .map(file => file.basename);

try {
  // Select plane if available
  if (planeData.length) {
    planeData.push("[ MANUAL INPUT / NONE]");
    plane = await tp.system.suggester(planeData, planeData, true, "{{name}}'s location?");

    // Manual input
    if (plane === "[ MANUAL INPUT / NONE ]") {
      plane = await tp.system.prompt("Enter name:", "Leave blank for none", true);
      plane = plane === "Leave blank for none" ? null : plane;
    }
  } else {
    // Warning prompt
    let warning = await quickAdd.yesNoPrompt('Info:', 'Realms (i.e. worlds) are smaller parts of planes (i.e. universes). You currently have no planes. Would you like to add one now?');

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
FROM "Compendium/Atlas/<% plane ? plane + "/" : "" %>{{name}}"
WHERE file.name != this.file.name AND type= "continent"
SORT file.name ASC
>
>> [!note]- HISTORY
>>```dataview
LIST WITHOUT ID headerLink
FROM "Session Notes" AND [[{{name}}]]
SORT file.ctime DESC