<%*
// ###########################################################
//                  NPC TOGGLE FOR LOCATION VIEW
// ###########################################################
parent.window.addEventListener('change', (event) => {
    if (event.target.id === 'npc' && event.target.type === 'checkbox') {
        const directView = document.querySelector('.npcDirect');
        const childView = document.querySelector('.npcChild');
        const directLabel = document.querySelector('.directLabel');
        const childLabel = document.querySelector('.childLabel');

        if (event.target.checked) {
            directView.style.display = 'none';
            directLabel.classList.remove('active');
            childView.style.display = 'block';
            childLabel.classList.add('active');
        } else {
            directView.style.display = 'block';
            directLabel.classList.add('active');
            childView.style.display = 'none';
            childLabel.classList.remove('active');
        }
    }
});
console.log('NPC Toggle: event listener attached');

// ###########################################################
//              FIX BROKEN ICON CODES ON STARTUP
// ###########################################################

// Intercept console.info messages & trigger reload on match
console.info = ((originalConsoleInfo) => (...args) => {
    originalConsoleInfo.apply(console, args);
    const trigger = "Loaded icon pack 'remix-icons'";
    if (args[0].includes(trigger)) {
        reload();
    }
})(console.info);

// Reload Tabs (only if reading view mode & broken icons detected)
const reload = async () => {
    const leaves = this.app.workspace.getLeavesOfType('markdown');
    const blank = this.app.vault.getAbstractFileByPath('Assets/Templates/REFRESH.md');
    for (const leaf of leaves) {
        // Can add "leaf.width > 0"  below to check if tab is visible.
        if (leaf.view.currentMode.type === 'preview' && /:[A-z]+:/.test(leaf.containerEl.innerHTML)) {
            const tab = app.workspace.getLeafById(leaf.id);
            const file = leaf.view.file;
            await tab.openFile(blank, { active: false });
            await tab.openFile(file, { active: false });
            console.log('Reloaded tab:', leaf.view.file.basename);
        }
    }
};
_%>