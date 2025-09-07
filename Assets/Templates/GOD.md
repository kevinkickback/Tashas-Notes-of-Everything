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

// ###########################################################
//                        Main Code Section
// ###########################################################

// Call modal form & declare variables
const result = await MF.openForm('GOD');
const alignment = result.Alignment.value;
const name = result.Name.value;
const gender = result.Gender.value;
const domains = result.Domains.value;
const pantheon = result.Pantheon.value;
const tags = domains ? domains.map(value => `- domain/${toCamelCase(value)}`).join("\n") : '-';

if (result.status === 'ok') {

    // Rename file & open in new tab
    await tp.file.rename(name);
    await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(name));

    // Save & display file-explorer icons
    const iconize = app.plugins.plugins["obsidian-icon-folder"];
    const notePath = `Compendium/Lore/Deities/${name}.md`;
    iconize.addFolderIcon(notePath, "RiCrossFill");
    iconize.api.util.dom.createIconNode(iconize, notePath, "RiCrossFill");

    // Fire success toast notification
    new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New deity <span style="text-decoration: underline;">${name}</span> added`;

} else {

    // Fire cancel toast notification
    new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled:</span><br>Deity has not been added`;
    return;
}
_%>

---
type: deity
tags:
<% tags ? tags : ' - ' %>
---

###### <% name %>
<span class="sub2">:FasCross: Deity <% alignment ? `&nbsp; | &nbsp; :FasYinYang: ${alignment}` : '' %></span>
___

> [!infobox|no-t right]
> ![[portrait.jpg]]
> ###### Details:
> | Type | Stat |
> | ---- | ---- |
> | :FasBoltLightning: Domains | <% domains ? domains.join(', ') : '' %> |
> | :FasVenusMars: Gender | <% gender ? gender : '' %> |
> | :FasBuildingColumns: Pantheon | <% pantheon ? pantheon : '' %> |

> [!quote|no-t]
>Profile of <% name %>, the <% alignment ? alignment.toLowerCase() : '' %> <% gender ? gender.toLowerCase() : '' %> deity.

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
> >         - or:
>>                - file.hasLink(this.file)
>>                - file.hasLink("Add affiliation here")
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