<%*
// ###########################################################
//                        Helper Functions
// ###########################################################

// Tag Formatter: convert string to camel case
function toCamelCase(str) {
  return str.replace(/\s(.)/g, function (match, group1) {
    return group1.toUpperCase();
  }).replace(/\s/g, '').replace(/^(.)/, function (match, group1) {
    return group1.toLowerCase();
  });
}

// Icons: get icon based on type
function getIcon(type) {
  const iconMappings = {
    "Blacksmith": ":fas_hammer:",
    "Camp": ":fas_campground:",
    "Guildhall": ":fas_shield:",
    "Inn": ":fas_bed:",
    "Library": ":fas_book_open:",
    "Market": ":fas_balance_scale_left:",
    "Port": ":fas_sailboat:",
    "Residence": ":fas_house:",
    "Shop": ":fas_shopping_cart:",
    "Stable": ":fas_horse_head:",
    "Tavern": ":fas_glass_martini_alt:",
    "Temple": ":fas_church:",
  };

  return iconMappings[type] || ":fas_question_circle:";
}
// ###########################################################
//                        Main Code Section
// ###########################################################

const quickAdd = app.plugins.plugins.quickadd.api;
let  icon, locale, locations, path, type;

// Create array containing all locales with name & path keys
const locData = this.app.vault.getAllLoadedFiles()
  .filter(file => this.app.metadataCache.getFileCache(file)?.frontmatter?.type === 'locale')
  .map(file => ({
    name: file.basename,
    path: file.path.split('/').slice(0, -1).join('/') + '/'
  }));

try {
  // Select locale if available
  if (locData.length) {
    const manualInput = {
      name: "[ MANUAL INPUT / NONE ]",
      parents: null,
      path: null
    };
    locData.push(manualInput);

    // Select prompt
    let names = locData.map(file => file.name);
    locale = await tp.system.suggester(names, locData, true, "{{name}}'s location?");

    // Manual input
    if (locale.name === manualInput.name) {
      locale.name = await tp.system.prompt("Enter name:", "Leave blank for none", true);
      locale.name = locale.name === "Leave blank for none" ? null : locale.name;
    }
  } else {
    // Warning prompt
    let warning = await quickAdd.yesNoPrompt('Info:', 'A landmark (i.e. tavern) is a smaller part of a locale (i.e. town). You currently have no locales. Would you like to add one now?');

    if (warning) {
      // Delete note and execute locale template
      await this.app.vault.trash(tp.file.find_tfile(tp.file.title), true);
      await this.app.commands.executeCommandById('quickadd:choice:deed9b32-4e1c-45fd-a967-960c0829555c');
      return;
    } else if (warning === false) {
      // Confirmation prompt
      let confirm = await quickAdd.yesNoPrompt('Confirm:', 'Create new landmark without any locale?');

      // Exit Early
      if (!confirm) {
        throw new Error;
      }
    } else if (warning === undefined) {
      throw new Error;
    }
  }

  // Set variables
  path = locale && locale.path ? locale.path : null;
  locations = locale && locale.name ? `- "[[${locale.name}]]"` : "- ";

  // Select venue type
  type = await tp.system.suggester(
    ["Blacksmith", "Camp", "Guildhall", "Inn", "Library", "Market", "Port", "Residence", "Shop", "Stable", "Tavern", "Temple", "[ MANUAL INPUT ]"],
    ["Blacksmith", "Camp", "Guildhall", "Inn", "Library", "Market", "Port", "Residence", "Shop", "Stable", "Tavern", "Temple", "Other"],
    true,
    "Type of landmark?"
  );

  // Manual input
  if (type === "other") {
    type = await tp.system.prompt("Enter type:", "Leave blank for none", true);
    type = type === "Leave blank for none" ? null : type;
  }

  // Get Icon
  icon = getIcon(type);

} catch (error) {
  // Exit Early: delete note & show toast notification
  await this.app.vault.trash(tp.file.find_tfile(tp.file.title), true);
  new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled!</span><br>No landmark has been added`;
  return;
}

// Finished: move note, open note, & show toast notification
await tp.file.move((path ? path : "Compendium/Atlas/") + tp.file.title + "/" + tp.file.title);
await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(tp.file.title));
new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New ${type ? type.toLowerCase() : "locale"} <span style="text-decoration: underline;">{{name}}</span> added`;
_%>

---
cssClasses: grayTable, wideTable
type: landmark
locations:
<% locations %>
tags:
<% type ? "- location/" + toCamelCase(type) : "- " %>
headerLink: "[[{{name}}#{{name}}]]"
---

![[banner.jpg|banner]]
###### {{name}}
<span class="sub2"><% type ? `${icon} ${type}` : "" %></span>
___

> [!quote|no-t] SUMMARY
>Description of the <% type ? type.toLowerCase() : "landmark" %> {{name}}.

#### marker
| INVENTORY                  | PRICE |
| -------------------------- | ----- |
| Item 1 | 80 <span class="goldcoin">:rif_coins:</span>  |
| Item 2 | 20 <span class="silvercoin">:rif_coins:</span>   |
| Item 3 | 100 <span class="coppercoin">:rif_coins:</span>  |

<span class="clearfix"></span>

#### marker
> [!column|flex 3]
> > [!hint]-  NPC's
> >```dataview
LIST WITHOUT ID headerLink
FROM "Compendium/NPC's" AND [[{{name}}]]
SORT file.name ASC
> 
>> [!note]- HISTORY
>>```dataview
LIST WITHOUT ID headerLink
FROM "Session Notes" AND [[{{name}}]]
SORT file.ctime DESC