## Migrate Notes to the New V3 Format

Before proceeding, please be aware that the **safest and most reliable** way to transition to V3 is to manually recreate your notes using the buttons provided in `INDEX.md`.  

However, I understand that not everyone has the time or patience for a full manual migration. As an alternative, I have created an **experimental automated migration tool**.

> **⚠️ WARNING:**  
> This makes **destructive changes** to your notes and **cannot be undone.**  
> **Please ensure you have a full backup of your vault before proceeding.**  
> Use at your own risk.

---

### What This Does

Attempts to convert notes created with earlier versions of Tasha’s templates to the new V3 format using regular expressions. It assumes the default V2 layout, so customizations may not be recognized or converted correctly.

- ✅ Remove  `headingLink` property from frontmatter
- ✅ Strip `#header` tag from internal (wiki-style) links
- ✅ Strip `(YYYY-MM-DD)` from session filenames;  add as frontmatter property
- ✅ Replace `dataview` code blocks with the appropriate `bases` code blocks

---

### How To Use

- **Step 1 (optional):** Delete the example files that came with this vault (the entire `Compendium` and `Session Notes` folders)
- **Step 2:** Move / copy your `Compendium` and `Session Notes` folders from your previous Tasha's vault into this one.
- **Step 3:** Click the `MIGRATE NOTES` button below
---

After running the tool you will be notified when the process has finished. Once completed feel free to delete this note, the `migrate.md` file in Assets/Templates, and the `migrate` button from Settings > Metabind > Edit Templates.

If you accept the risks and are ready to proceed, click the button below to begin the conversion.

`BUTTON[migrate]`
