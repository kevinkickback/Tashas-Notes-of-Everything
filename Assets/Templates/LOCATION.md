<%*
// ###########################################################
//                        Main Code Section
// ###########################################################

// Select location size
let choice = await tp.system.suggester(
  ["Plane of Existence",
    "Realm (world)",
    "Continent / Ocean"],
  ["large", "medium", "small"],
  false,
  "Add new..."
);

switch (choice) {
  case "large":
    // Execute plane template
    await this.app.commands.executeCommandById('quickadd:choice:733e1e2c-9945-4247-b265-cb4b42fbb875');
    break;
  case "medium":
    // Execute realm template
    await this.app.commands.executeCommandById('quickadd:choice:9b399108-ae05-46d4-be43-bcf75f75efd1');
    break;
  case "small":
    // Execute continent template
    await this.app.commands.executeCommandById('quickadd:choice:a9c998c5-d57d-4f0e-8f5e-2c321de24341');
    break;
  default:
    // Delete temp & show toast message
    await this.app.vault.trash(app.vault.getAbstractFileByPath("temp.md"), true);
    new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled!</span><br>No location has been added`;
    break;
}
_%>