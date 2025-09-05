<%*
// ###########################################################
//                        Main Code Section
// ###########################################################

const result = await MF.openForm('PLANE');
const name = result.Name.value;

if (result.status === 'ok') {
  // Rename file & open in new tab
  const newPath = `Compendium/Atlas/${name}/${name}`;
  await tp.file.move(newPath);
  await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(name));

  // Save & display file-explorer icons
  const iconize = app.plugins.plugins["obsidian-icon-folder"];
  const folderPath = newPath.replace(/\/[^/]+$/, "");
  const notePath = `${newPath}.md`;
  iconize.addFolderIcon(folderPath, "FasCircleHalfStroke");
  iconize.addFolderIcon(notePath, "FasCircleHalfStroke");
  iconize.api.util.dom.createIconNode(iconize, folderPath, "FasCircleHalfStroke");
  iconize.api.util.dom.createIconNode(iconize, notePath, "FasCircleHalfStroke");

  //Fire success toast notification
  new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New plane <span style="text-decoration: underline;">${name}</span> added`;

} else {

  // Fire cancel toast notification & exit templater
  new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled:</span><br>Plane has not been added`;
  return;
}
_%>

---
type: plane
tags:
 - 
---
![[banner.jpg|banner]]
###### <% name %>
<span class="sub2">:FasCircleHalfStroke:  Plane of Existence</span>
___

> [!quote|no-t] SUMMARY
>Description of the plane <% name %>.

> [!column|flex 3]
> > [!hint]- NPC's
> > ```base
> > formulas:
> >   LinkedIndirectly: |
> >     locations.contains(this.file)
> >     || list(locations)
> >          .filter(file(value)
> >            && list(file(value).properties.locations).contains(this))
> >          .length > 0
> > 
> > properties:
> >   file.name:
> >     displayName: Name
> > 
> > views:
> >   - type: table
> >     name: This Location Only
> >     filters:
> >       and:
> >         - file.inFolder("Compendium/NPC's")
> >         - locations.contains(this.file)
> > 
> >   - type: table
> >     name: Sub-Locations Included
> >     filters:
> >       and:
> >         - file.inFolder("Compendium/NPC's")
> >         - formula.LinkedIndirectly
> > ```
>
>> [!example]- LOCATIONS
> > ```base
> > properties:
> >   file.name:
> >     displayName: Name
> > views:
> >   - type: table
> >     name: Realms
> >     filters:
> >       and:
> >         - file.inFolder("Compendium/Atlas")
> >         - locations.contains(this.file)
> > ```
>
>> [!note]- HISTORY
> > ```base
> > properties:
> >   file.name:
> >     displayName: Name
> > views:
> >   - type: table
> >     name: Session Notes
> >     filters:
> >       and:
> >         - file.inFolder("Session Notes")
> >         - file.hasLink(this.file)
> > ```