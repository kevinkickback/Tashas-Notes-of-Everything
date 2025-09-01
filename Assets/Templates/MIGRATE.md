<%*
const { vault } = app;

// Regex to detect date suffix in filename: space + (YYYY-MM-DD) at end of filename (before .md)
const dateSuffixRegex = / \((\d{4}-\d{2}-\d{2})\)$/;

// Shared rules for similar types
const locationType = [
  { find: /^headerLink:\s*".*"\s*\n?/m, replace: "" },
  { find: /\[\[([^\]\|#]+)(#[^\]\|]+)?(\|[^\]]+)?\]\]/g, replace: "[[$1$3]]" },
  {
    find: /#### marker[\s\S]+?>>\s*\[!note\]- HISTORY[\s\S]+?SORT file\.ctime DESC[\s\S]*?/g,
    replace: `> [!column|flex 3]
>> [!hint]- NPC's
>> \`\`\`base
>> formulas:
>>   LinkedIndirectly: |
>>     locations.contains(this.file)
>>     || list(locations)
>>          .filter(file(value)
>>            && list(file(value).properties.locations).contains(this))
>>          .length > 0
>> properties:
>>   file.name:
>>     displayName: Name
>> views:
>>   - type: table
>>     name: This Location Only
>>     filters:
>>       and:
>>         - file.inFolder("Compendium/NPC's")
>>         - locations.contains(this.file)
>>   - type: table
>>     name: Sub-Locations Included
>>     filters:
>>       and:
>>         - file.inFolder("Compendium/NPC's")
>>         - formula.LinkedIndirectly
>> \`\`\`
>
>> [!example]- LOCATIONS
>> \`\`\`base
>> properties:
>>   file.name:
>>     displayName: Name
>> views:
>>   - type: table
>>     name: Provinces
>>     filters:
>>       and:
>>         - file.inFolder("Compendium/Atlas")
>>         - locations.contains(this.file)
>> \`\`\`
>
>> [!note]- HISTORY
>> \`\`\`base
>> properties:
>>   file.name:
>>     displayName: Name
>> views:
>>   - type: table
>>     name: Session Notes
>>     filters:
>>       and:
>>         - file.inFolder("Session Notes")
>>         - file.hasLink(this.file)
>> \`\`\``
  }
];

const loreType = [
  { find: /^headerLink:\s*".*"\s*\n?/m, replace: "" },
  { find: /\[\[([^\]\|#]+)(#[^\]\|]+)?(\|[^\]]+)?\]\]/g, replace: "[[$1$3]]" },
  {
    find: /#### marker[\s\S]+?>>\s*\[!note\]- HISTORY[\s\S]+?FROM "Session Notes" AND \[\[.*?\]\][\s\S]*?/g,
    replace: `> [!column|flex 3]
>> [!hint]- NPC's
>> \`\`\`base
>> properties:
>>   file.name:
>>     displayName: Name
>> views:
>>   - type: table
>>     name: Name
>>     filters:
>>       and:
>>         - file.inFolder("Compendium/NPC's")
>>         - file.hasLink(this.file)
>> \`\`\`
>
>> [!note]- HISTORY
>> \`\`\`base
>> properties:
>>   file.name:
>>     displayName: Name
>> views:
>>   - type: table
>>     name: Session Notes
>>     filters:
>>       and:
>>         - file.inFolder("Session Notes")
>>         - file.hasLink(this.file)
>> \`\`\``
  }
];

// Define migration rules for all types
const migrationText = {
  landmark: [
    { find: /^headerLink:\s*".*"\s*\n?/m, replace: "" },
    { find: /\[\[([^\]\|#]+)(#[^\]\|]+)?(\|[^\]]+)?\]\]/g, replace: "[[$1$3]]" },
    {
      find: /#### marker[\s\S]+?>>\s*\[!note\]- HISTORY[\s\S]+?SORT file\.ctime DESC[\s\S]*?/g,
      replace: `> [!column|flex 3]
>> [!hint]- NPC's
>> \`\`\`base
>> properties:
>>   file.name:
>>     displayName: Name
>> views:
>>   - type: table
>>     name: Name
>>     filters:
>>       and:
>>         - file.inFolder("Compendium/NPC's")
>>         - file.hasLink(this.file)
>> \`\`\`
>
>> [!note]- HISTORY
>> \`\`\`base
>> properties:
>>   file.name:
>>     displayName: Name
>> views:
>>   - type: table
>>     name: Session Notes
>>     filters:
>>       and:
>>         - file.inFolder("Session Notes")
>>         - file.hasLink(this.file)
>> \`\`\``
    }
  ],
  npc: [
    { find: /^headerLink:\s*".*"\s*\n?/m, replace: "" },
    { find: /\[\[([^\]\|#]+)(#[^\]\|]+)?(\|[^\]]+)?\]\]/g, replace: "[[$1$3]]" },
    {
      find: /#### marker[\s\S]+?>>\s*\[!note\]- HISTORY[\s\S]+?FROM "Session Notes" AND \[\[.*?\]\][\s\S]*?/g,
      replace: `> [!column|flex 3]
>> [!important]- QUESTS:
>> \`\`\`base
>> properties:
>>   file.name:
>>     displayName: Name
>> views:
>>   - type: table
>>     name: Name
>>     filters:
>>       and:
>>         - file.inFolder("Compendium/Party/Quests")
>>         - file.hasLink(this.file)
>>     order:
>>       - file.name
>> \`\`\`
>
>> [!note]- HISTORY
>> \`\`\`base
>> properties:
>>   file.name:
>>     displayName: Name
>> views:
>>   - type: table
>>     name: Session Notes
>>     filters:
>>       and:
>>         - file.inFolder("Session Notes")
>>         - file.hasLink(this.file)
>> \`\`\``
    }
  ],
  pc: [
    { find: /^headerLink:\s*".*"\s*\n?/m, replace: "" },
    { find: /\[\[([^\]\|#]+)(#[^\]\|]+)?(\|[^\]]+)?\]\]/g, replace: "[[$1$3]]" },
    {
      find: /#### marker[\s\S]+?>>\s*\[!note\]- HISTORY[\s\S]+?SORT file\.ctime DESC[\s\S]*?/g,
      replace: `> [!column|flex 3]
>> [!important]- STORYLINES:
>> \`\`\`base
>> properties:
>>   file.name:
>>     displayName: Name
>> views:
>>   - type: table
>>     name: Name
>>     filters:
>>       and:
>>         - file.inFolder("Compendium/Party/Quests")
>>         - file.hasLink(this.file)
>>     order:
>>       - file.name
>> \`\`\`
>
>> [!note]- HISTORY
>> \`\`\`base
>> properties:
>>   file.name:
>>     displayName: Name
>> views:
>>   - type: table
>>     name: Session Notes
>>     filters:
>>       and:
>>         - file.inFolder("Session Notes")
>>         - file.hasLink(this.file)
>> \`\`\``
    }
  ],
  quest: [
    { find: /^headerLink:\s*".*"\s*\n?/m, replace: "" },
    { find: /\[\[([^\]\|#]+)(#[^\]\|]+)?(\|[^\]]+)?\]\]/g, replace: "[[$1$3]]" },
    {
      find: /#### marker[\s\S]+?>>\s*\[!note\]- HISTORY[\s\S]+?FROM "Session Notes" AND \[\[.*?\]\][\s\S]*?/g,
      replace: `> [!column|flex 3]
>> [!note]- HISTORY
>> \`\`\`base
>> properties:
>>   file.name:
>>     displayName: Name
>> views:
>>   - type: table
>>     name: Session Notes
>>     filters:
>>       and:
>>         - file.inFolder("Session Notes")
>>         - file.hasLink(this.file)
>> \`\`\``
    }
  ],
  notes: [
    // For notes type, the date-handling logic is done below, so only apply these:
    { find: /^headerLink:\s*".*"\s*\n?/m, replace: "" },
    { find: /####\s*marker/g, replace: "" },
    { find: /\[\[([^\]\|#]+)(#[^\]\|]+)?(\|[^\]]+)?\]\]/g, replace: "[[$1$3]]" },
  ],
  plane: locationType,
  realm: locationType,
  continent: locationType,
  territory: locationType,
  province: locationType,
  locale: locationType,
  event: loreType,
  deity: loreType,
  object: loreType,
  organization: loreType
};

// Extracts the "type" field from YAML frontmatter
function getType(content) {
  const match = /^---\n([\s\S]*?)\n---/m.exec(content);
  if (!match) return null;
  const yamlBlock = match[1];
  const typeMatch = /^type:\s*(\w+)/m.exec(yamlBlock);
  return typeMatch ? typeMatch[1] : null;
}

// Parse YAML frontmatter to an object
function parseFrontmatter(content) {
  const match = /^---\n([\s\S]*?)\n---/m.exec(content);
  if (!match) return null;
  const yaml = match[1];
  try {
    return app.plugins.plugins["metaedit"]?.yaml.parse(yaml) || YAML.parse(yaml);
  } catch {
    return null;
  }
}

// Serialize frontmatter object back to YAML string
function serializeFrontmatter(obj) {
  try {
    return app.plugins.plugins["metaedit"]?.yaml.stringify(obj) || YAML.stringify(obj);
  } catch {
    return null;
  }
}

// Replace the frontmatter in content with updated YAML string
function replaceFrontmatter(content, newYaml) {
  return content.replace(/^---\n[\s\S]*?\n---/, `---\n${newYaml}\n---`);
}

// Rename a file within vault and return new path
async function renameFile(file, newPath) {
  try {
    await vault.rename(file, newPath);
    return newPath;
  } catch (e) {
    console.error(`Failed to rename file ${file.path} to ${newPath}:`, e);
    return file.path; // fallback
  }
}

// Collect all markdown files in the vault
const files = vault.getMarkdownFiles();
let candidates = [];

for (const file of files) {
  if (file.path.toLowerCase().startsWith("assets/")) continue;

  const content = await vault.read(file);
  let updated = content;
  let matchedRules = []; // always initialized

  // Get type of note (case-insensitive)
  const type = getType(content)?.toLowerCase();


  // Apply type-specific migration rules
  if (type && migrationText[type]) {
    for (const { find, replace } of migrationText[type]) {
      if (find.test(updated)) matchedRules.push(`Type-specific (${type}) rule: ${find}`);
      updated = updated.replace(find, replace);
    }
  }

  // Extra processing for notes type: handle date in filename and frontmatter
  if (type === "notes") {
    const fileName = file.basename; // filename without extension
    const dateMatch = dateSuffixRegex.exec(fileName);

    if (dateMatch) {
      const extractedDate = dateMatch[1];
      const newName = fileName.replace(dateSuffixRegex, ""); // strip the date suffix
      const newPath = file.parent.path + "/" + newName + ".md";

      // Extract YAML frontmatter manually
      const fmMatch = updated.match(/^---\n([\s\S]*?)\n---/);
      if (!fmMatch) {
        matchedRules.push("⚠️ No frontmatter block found in " + fileName);
      } else {
        let yamlBlock = fmMatch[1];

        if (/^date:/m.test(yamlBlock)) {
          // Update existing date
          yamlBlock = yamlBlock.replace(/^date:.*/m, `date: ${extractedDate}`);
          matchedRules.push(`Updated frontmatter date to ${extractedDate}`);
        } else {
          // Add new date at the bottom of the block
          yamlBlock = yamlBlock + `\ndate: ${extractedDate}`;
          matchedRules.push(`Added frontmatter date at bottom: ${extractedDate}`);
        }

        const newYaml = `---\n${yamlBlock}\n---`;
        updated = updated.replace(/^---\n([\s\S]*?)\n---/, newYaml);
      }

      candidates.push({
        file,
        newContent: updated,
        newPath
      });
      continue;
    }
  }


  // Track files with changes
  if (updated !== content) {
    console.log("File flagged for changes:", file.path);
    if (matchedRules.length === 0) {
      console.log("No specific rule matched — possible whitespace or line-ending changes.");
    } else {
      console.log("Matched rules:");
      matchedRules.forEach(r => console.log("  -", r));
    }
    candidates.push({ file, newContent: updated });
  }
}

// Exit if no files need changes
if (candidates.length === 0) {
  new Notice(`Everything is already up to date!`);
  return;
}

// Show confirmation modal before applying changes
const modalForm = app.plugins.plugins.modalforms.api;

const fileCount = candidates.length;
const fileList =
  `📄 ${fileCount} note(s) detected!\n\n` +
  candidates.map(c => `- ${c.file.path}`).join("\n");

const values = {
  info: fileList,
  confirm: false
};

const result = await modalForm.openForm("VaultMigration", { values });

// Stop if modal is canceled or toggle is not enabled
if (result.status !== 'ok') {
  new Notice("Migration cancelled.");
  return;
}

// Apply changes to all flagged files
for (const { file, newContent, newPath } of candidates) {
  if (newPath) {
    const finalPath = await renameFile(file, newPath);
    file.path = finalPath;
  }
  await vault.modify(file, newContent);
}

new Notice(`Migration complete! ${candidates.length} file(s) updated.`);
%>
