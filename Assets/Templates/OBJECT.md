<%*
// ###########################################################
//                        Helper Functions
// ###########################################################

// Convert string to camelCase
function toCamelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|\s+|[-_])/g, (match, index) =>
      index === 0 ? match.toLowerCase() : match.toUpperCase()
    )
    .replace(/[\s-_]+/g, '');
}

// Return icon based on type
function getIcon(type) {
    const iconMappings = {
        'Magic Item': ':FasWandMagicSparkles:',
        'Religious Artifact': ':FasCross:',
        'Quest Item': ':fas_scroll:',
        Treasure: ':RiVipDiamondFill:'
    };

    return iconMappings[type] || ':FasCircleQuestion:';
}

// ###########################################################
//                        Main Code Section
// ###########################################################

// Call modal form & declare variables
const result = await MF.openForm('OBJECT');
const name = result.Name.value;
const type = result.Type.value;
const icon = getIcon(type);

if (result.status === 'ok') {

    // Rename file & open in new tab
    await tp.file.rename(name);
    await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(name));

    // Save & display file-explorer icons
    const iconize = app.plugins.plugins["obsidian-icon-folder"];
    const notePath = `Compendium/Lore/Objects/${name}.md`;
    iconize.addFolderIcon(notePath, icon.replace(/:/g, ''));
    iconize.api.util.dom.createIconNode(iconize, notePath, icon.replace(/:/g, ''));

    // Fire success toast notification
    new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New object <span style="text-decoration: underline;">${name}</span> added`;

} else {

    // Fire cancel toast notification
    new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled:</span><br>Object has not been added`;
    return;
}
_%>

---
type: object
tags:
 - <% type ? "object/" + toCamelCase(type) : '' %>
---

###### <% name %>
<span class="sub2"><% type ? `${icon} ${type}` : '' %></span>
___

> [!quote|no-t]
>![[embed.jpg|right wm-sm]]Description of the  <% type ? type.toLowerCase() : 'object' %>, <% name %>.
<span class="clearfix"></span>

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