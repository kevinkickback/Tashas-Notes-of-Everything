<%*
// FIX BROKEN ICON CODES ON STARTUP
const iconize = app.plugins.plugins["obsidian-icon-folder"];
if (!iconize) return;

const event = iconize.api.getEventEmitter();
const rerender = () => {
    for (const leaf of app.workspace.getLeavesOfType("markdown")) {
        const view = leaf.view;
        const el = view?.containerEl;
        if (view?.getMode?.() === "preview" && el && /:[A-Za-z]+:/.test(el.innerText)) {
            view.previewMode?.rerender?.(true);
            console.log("Refreshed tab:", leaf.getDisplayText());
        }
    }
};
event.on("allIconsLoaded", rerender);

// APPLY ICONS TO NEW ELEMENTS IN EXPLORER
app.workspace.onLayoutReady(() => {
    const explorerRoot = document.querySelector(".nav-files-container");
    if (!explorerRoot) return;

    const observer = new MutationObserver(muts => {
        for (const m of muts)
            for (const n of m.addedNodes)
                if (n instanceof HTMLElement) {
                    const els = n.matches("[data-path]") ? [n] : n.querySelectorAll("[data-path]");
                    for (const el of els) {
                        const path = el.getAttribute("data-path");
                        const iconName = path && iconize.getIconNameFromPath(path);
                        if (iconName) iconize.api.util.dom.createIconNode(iconize, path, iconName);
                    }
                }
    });
    observer.observe(explorerRoot, { childList: true, subtree: true });
});

// METABIND TAG ENHANCER
const metabind = app.plugins.plugins["obsidian-meta-bind-plugin"];
if (!metabind) return;

app.workspace.onLayoutReady(() => {
    const enhance = (root = document) => {
        for (const el of root.querySelectorAll(".sub2 .mb-view-type-text")) {
            const raw = el.textContent?.trim();
            if (!raw || el.dataset.sourceText === raw) continue;

            const frag = document.createDocumentFragment();
            for (const [i, part] of raw.split(",").map(s => s.trim()).filter(Boolean).entries()) {
                const name = part.replace(/^#/, "");
                const a = document.createElement("a");
                a.className = "tag";
                a.href = "#" + encodeURIComponent(name);
                a.textContent = "#" + name;
                frag.append(a);
                if (i < raw.split(",").length - 1) frag.append(", ");
            }
            el.replaceChildren(frag);
            el.dataset.sourceText = raw;
        }
    };

    const observer = new MutationObserver(muts => {
        for (const m of muts)
            for (const n of m.addedNodes)
                if (n.nodeType === 1) enhance(n);
    });

    enhance();
    observer.observe(document.body, { childList: true, subtree: true });
    app.workspace.on("active-leaf-change", enhance);
});
%>