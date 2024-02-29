<%*
// Finished: move note, open note, the show toast notification
await tp.file.move('/Compendium/Atlas/' + tp.file.title + "/" + tp.file.title);
await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(tp.file.title));
new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New plane <span style="text-decoration: underline;">{{name}}</span> added`;
_%>

---
type: plane
tags:
- 
headerLink: "[[{{name}}#{{name}}]]"
---
![[banner.jpg|banner]]
###### {{name}}
<span class="sub2">:fas_circle_half_stroke:  Plane of Existence</span>
___

> [!quote|no-t] SUMMARY
>Description of the plane {{name}}.

#### marker
> [!column|flex 3]
>> [!example]- LOCATIONS
>>```dataview
LIST WITHOUT ID headerLink
FROM "Compendium/Atlas/{{name}}"
WHERE file.name != this.file.name AND type= "realm"
SORT file.name ASC
>
>> [!note]- HISTORY
>>```dataview
LIST WITHOUT ID headerLink
FROM "Session Notes" AND [[{{name}}]]
SORT file.ctime DESC