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

// ###########################################################
//       DISPLAY NEW ICONS IN EXPLORER EVEN WHEN HIDDEN
// ###########################################################

if (iconize) {
    const explorerRoot = document.querySelector(".nav-files-container");
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    if (!(node instanceof HTMLElement)) continue;

                    // Check if the node itself or its descendants have `data-path`
                    const elements = node.matches?.("[data-path]") 
                        ? [node] 
                        : Array.from(node.querySelectorAll("[data-path]"));

                    for (const el of elements) {
                        const path = el.getAttribute("data-path");
                        if (!path) continue;

                        const iconName = iconize.getIconNameFromPath(path);
                        if (iconName) {
                            // Use Iconize’s internal DOM logic to apply the icon
                            iconize.api.util.dom.createIconNode(iconize, path, iconName);
                        }
                    }
                }
            }
        });

        // Observe only the file explorer container
        observer.observe(explorerRoot, { childList: true, subtree: true });
    }
%>