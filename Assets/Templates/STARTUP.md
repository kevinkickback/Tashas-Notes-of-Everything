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

console.log("NPC toggle event listener attached.");
_%>