const dv = app.plugins.plugins.dataview?.api;
module.exports = {
    asArray: v => v == null ? [] : Array.isArray(v) ? v : [v],

    yamlList: arr => arr.length ? arr.map(v => ` - "${v}"`).join("\n") : " -",

    toCamelCase: str => String(str)
        .replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : "")
        .replace(/^(.)/, c => c.toLowerCase()),

    getIcon: (type) => {
        const iconMappings = {
            Blacksmith: 'FasHammer',
            Camp: 'FasCampground',
            Cave: 'FasMound',
            City: 'FasCity',
            Continent: 'FasEarthAmericas',
            County: 'FasLandmark',
            Country: 'FasFlag',
            Desert: 'FasSun',
            Encampment: 'FasTowerObservation',
            Forest: 'FasTree',
            'General Region': 'FasMap',
            Guildhall: 'FasShield',
            Inn: 'FasBed',
            Jewelry: 'FasGem',
            Kingdom: 'FasChessRook',
            Lake: 'FasWater',
            Library: 'FasBookOpen',
            'Magic Item': 'FasWandMagicSparkles',
            Market: 'FasScaleUnbalanced',
            Mountain: 'FasMountain',
            Nation: 'FasFlag',
            Ocean: 'FasWater',
            Personal: 'FasCalendarDays',
            Plains: 'FasWheatAwn',
            Political: 'FasBullhorn',
            Port: 'FasSailboat',
            Province: 'FasLandmark',
            'Quest Item': 'fasScroll',
            Religious: 'FasCross',
            'Religious Artifact': 'FasCross',
            Residence: 'FasHouse',
            Seasonal: 'RiSunFoggyFill',
            Shop: 'FasCartShopping',
            Stable: 'FasHorseHead',
            State: 'FasLandmark',
            Swamp: 'FasSmog',
            Tavern: 'RiBeerLine',
            Temple: 'FasChurch',
            Town: 'RiBuilding4Fill',
            Treasure: 'RiVipDiamondFill',
            Village: 'FasTents'
        };
        return iconMappings[type] || 'FasQuestion';
    },

    getPath: (location, type, folder = "Compendium/Atlas") => {
        if (!dv || !location || !type) return "";
        const match = dv.pages(`"${folder}"`)
            .where(p => p.type === type && p.file.name === location)
            .map(obj => obj.file.path.split("/").slice(2, -1).join("/"))
            .find(Boolean);
        return match || "";
    },

    moveAndOpenFile: async (tp, name, newPath) => {
        if (newPath) {
            await tp.file.move(newPath);
            await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(newPath));
        } else {
            await tp.file.rename(name);
            await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(name));
        }
    }
};