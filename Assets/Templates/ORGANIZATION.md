<%*
// ###########################################################
//                        Main Code Section
// ###########################################################

// Call modal form & declare variables
const result = await MF.openForm('ORGANIZATION');
const alignment = result.Alignment.value;
const name = result.Name.value;
const location = result.Location.value;

if (result.status === 'ok') {

    // Rename file & open in new tab
    await tp.file.rename(name);
    await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(name));

    // Save & display file-explorer icons
    const iconize = app.plugins.plugins["obsidian-icon-folder"];
    const notePath = `Compendium/Lore/Organizations/${name}.md`;
    iconize.addFolderIcon(notePath, "LiVenetianMask");
    iconize.api.util.dom.createIconNode(iconize, notePath, "LiVenetianMask");

    // Fire success toast notification
    new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New organization <span style="text-decoration: underline;">${name}</span> added`;

} else {

   // Fire cancel toast notification
    new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled:</span><br>Organization has not been added`;
    return;
}
_%>

---
type: organization
locations:
 - <% location ? `"[[${location}]]"` : '' %>
tags:
 - 
---

###### <% name %>
<span class="sub2">:FasSitemap: Organization</span>
___

> [!quote|no-t]
>![[embed.jpg|right wm-sm]]Profile of <% name %>, the <% alignment ? alignment.toLowerCase() : 'unknown' %> aligned organization.

> [!column|flex 3]
> > [!hint]- NPC's
> > ```base
> > properties:
> >   file.name:
> >     displayName: Name
> > views:
> >   - type: table
> >     name: Name
> >     filters:
> >       and:
> >         - file.inFolder("Compendium/NPC's")
> >         - file.hasLink(this.file)
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