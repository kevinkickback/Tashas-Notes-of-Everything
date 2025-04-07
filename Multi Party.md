1. replace the dataviewjs code block with this (changing group1/group2/group3 to whatever names you would like):

```dataviewjs
    // Set path and class
    const vault = this.app.vault.adapter.getResourcePath("").split("?")[0];
    dv.container.className += ' hideSort cards cards-cover cards-1-1';

    // Create and insert the party selector dropdown
    const select = dv.container.createEl("select", { cls: "party-filter" });
    const parties = ["group1", "group2", "group3"]; // Add your actual party names here
    for (const party of parties) {
      select.createEl("option", { text: party, value: party });
    }

    // Add a container for the table
    const tableContainer = dv.container.createDiv();

    // Function to render the table for a given party
    function renderPartyTable(selectedParty) {
      tableContainer.innerHTML = "";

      // Temporarily redirect dv rendering into the container
      const originalContainer = dv.container;
      dv.container = tableContainer;

      dv.table(["cover", "name", "details"],
        dv.pages(`"Compendium/Party/Player Characters"`)
          .where(p => p.party === selectedParty)
          .sort(p => p.file.name, "asc")
          .map(p => [
            `![](${vault}/${p.cover})`,
            p.headerLink,
            obsidian.Platform.isMobile
              ? `:FasCrown: Level ${p.level}<br>:FasUserGroup: ${p.race}<br>:RiSwordFill: ${p.class}`
              : `:FasCrown: Level ${p.level} / :FasUserGroup: ${p.race} / :RiSwordFill: ${p.class}`
          ])
      );

      // Restore original container
      dv.container = originalContainer;
    }

    // Initial render
    renderPartyTable(select.value);

    // Update table when selection changes
    select.addEventListener("change", () => {
      renderPartyTable(select.value);
    });
```

2. Add a new "party" property to the YAML/frontmatter of each player character file: `party: "group1"`, replacing `group1` with one of the names you used in step 1.

Now a dropdown box will appear above the player cards on index that will allow you to switch between the different parties / groups.
