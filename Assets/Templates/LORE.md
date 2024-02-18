<%*
// Select lore type
let choice = await tp.system.suggester(
  ["Deity", "Event", "Object", "Organization"],
  ["deity", "event", "obj", "org"],
  false,
  "What type of lore is it?"
);

switch (choice) {
  case "deity":
    // Execute God template
    await this.app.commands.executeCommandById('quickadd:choice:c3dd5ef3-4f65-4f23-9e25-43d2ec1a6b68');
    break;
  case "event":
    // Execute event template
    await this.app.commands.executeCommandById('quickadd:choice:2a3ec5ba-6c9c-40fe-940d-126640b80d8e');
    break;
  case "obj":
    // Execute object template
    await this.app.commands.executeCommandById('quickadd:choice:2eb13346-ac02-4808-ad7b-4b2f78bb048f');
    break;
  case "org":
    // Execute organization template
    await this.app.commands.executeCommandById('quickadd:choice:df211763-e446-4275-8398-5ccd52c248e1');
    break;
  default:
    // Delete temp then show toast message
    await this.app.vault.trash(app.vault.getAbstractFileByPath("temp.md"), true);
    new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled!</span><br>No lore has been added`;
    break;
}
_%>