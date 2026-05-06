function createSidebar() {
    const sidebar = document.createElement("nav");
    sidebar.id = "sidebar-container";
    return sidebar;
}

function createMainDisplay() {
    const mainDisplay = document.createElement("div");
    mainDisplay.id = "main-display-container";
    return mainDisplay;
}

export function loadLayout() {
    const sidebar = createSidebar();
    const mainDisplay = createMainDisplay();

    document.body.appendChild(sidebar);
    document.body.appendChild(mainDisplay);

    return { sidebar, mainDisplay };
};