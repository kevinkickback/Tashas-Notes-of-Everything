```dataviewjs
const getNestedObject = (nestedObj, pathArr) => {
    return pathArr.reduce((obj, key) =>
        (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
}

function getHotkey(arr) {
    return arr.hotkeys ? [[getNestedObject(arr.hotkeys, [0, 'modifiers'])],
    [getNestedObject(arr.hotkeys, [0, 'key'])]].flat(2).join('+').replace('Mod', 'Ctrl') : '–';
}

let cmds = dv.array(Object.entries(app.commands.commands))
    .sort(v => v[1].id, 'asc');

dv.paragraph(cmds.length + " commands currently enabled.<br><br>");

dv.table(["Command ID", "Name in current locale", "Hotkeys"],
    cmds.map(v => [
    v[1].id,
    v[1].name,
    getHotkey(v[1]),
    ])
    );
```