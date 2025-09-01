<%*
// ###########################################################
//              FIX BROKEN ICON CODES ON STARTUP
// ###########################################################

const iconize = app.plugins.plugins["obsidian-icon-folder"];
if (iconize) {
    const event = iconize.api.getEventEmitter();
    const rerender = () => {
        const leaves = app.workspace
            .getLeavesOfType("markdown")
            .filter(leaf =>
                leaf?.view?.getMode?.() === "preview" &&
                leaf?.view?.containerEl &&
                /:[A-Za-z]+:/.test(leaf.view.containerEl.innerText || "")
            );

        for (const leaf of leaves) {
            leaf.view?.previewMode?.rerender?.(true);
            console.log("Refreshed tab:", leaf.getDisplayText());
        }
    };
    event.on("allIconsLoaded", rerender);
}
_%>