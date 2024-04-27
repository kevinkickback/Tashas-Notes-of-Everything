<%*
// NPC Toggle View
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
console.log('NPC Toggle: event listener attached to parent window.');

setTimeout(async () => {
    const leaves = this.app.workspace.getLeavesOfType('markdown');
    const blank = this.app.vault.getAbstractFileByPath('Assets/Templates/blank.md');
    for (const leaf of leaves) {
        if (leaf.view.currentMode.type === "preview" && leaf.width > 0 && /:[A-z]+:/.test(leaf.containerEl.innerHTML)) {
            const tab = app.workspace.getLeafById(leaf.id)
            const file = leaf.view.file
            await tab.openFile(blank, { active: false });
            await tab.openFile(file, { active: false });
            console.log('Reloading leaf:', leaf.view.file.basename);
        }
    }
}, 2500);
_%>