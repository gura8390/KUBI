// Data Validation System
// Validates game data integrity at startup

var DataValidator = {
    errors: [],
    warnings: [],

    validateAll: function() {
        this.errors = [];
        this.warnings = [];

        this.validateItems();
        this.validateMonsters();
        this.validateMaps();
        this.validateRecipes();
        this.validateNPCs();

        return {
            errors: this.errors,
            warnings: this.warnings,
            valid: this.errors.length === 0
        };
    },

    validateItems: function() {
        if (typeof ITEMS === 'undefined') return;
        Object.entries(ITEMS).forEach(function(entry) {
            var id = entry[0], item = entry[1];
            if (!item.name) this.errors.push('Item ' + id + ': missing name');
            if (!item.type) this.errors.push('Item ' + id + ': missing type');
            if (item.type === 'weapon' && !item.attack) this.warnings.push('Item ' + id + ': weapon without attack');
            if (item.type === 'armor' && !item.defense) this.warnings.push('Item ' + id + ': armor without defense');
        }.bind(this));
    },

    validateMonsters: function() {
        if (typeof MONSTERS === 'undefined') return;
        Object.entries(MONSTERS).forEach(function(entry) {
            var id = entry[0], m = entry[1];
            if (!m.name) this.errors.push('Monster ' + id + ': missing name');
            if (!m.health || m.health <= 0) this.errors.push('Monster ' + id + ': invalid health');
            if (!m.attack || m.attack <= 0) this.errors.push('Monster ' + id + ': invalid attack');
            if (m.drops) {
                m.drops.forEach(function(drop) {
                    if (typeof ITEMS !== 'undefined' && !ITEMS[drop]) {
                        this.warnings.push('Monster ' + id + ': drop item "' + drop + '" not found in ITEMS');
                    }
                }.bind(this));
            }
        }.bind(this));
    },

    validateMaps: function() {
        if (typeof MAPS === 'undefined') return;
        Object.entries(MAPS).forEach(function(entry) {
            var id = entry[0], map = entry[1];
            if (!map.name) this.errors.push('Map ' + id + ': missing name');
            if (map.monsters) {
                map.monsters.forEach(function(mId) {
                    if (typeof MONSTERS !== 'undefined' && !MONSTERS[mId]) {
                        this.errors.push('Map ' + id + ': monster "' + mId + '" not found');
                    }
                }.bind(this));
            }
            if (map.npcs) {
                map.npcs.forEach(function(nId) {
                    if (typeof NPCS !== 'undefined' && !NPCS[nId]) {
                        this.errors.push('Map ' + id + ': NPC "' + nId + '" not found');
                    }
                }.bind(this));
            }
            if (map.resources) {
                Object.keys(map.resources).forEach(function(rId) {
                    if (typeof ITEMS !== 'undefined' && !ITEMS[rId]) {
                        this.warnings.push('Map ' + id + ': resource "' + rId + '" not found in ITEMS');
                    }
                }.bind(this));
            }
        }.bind(this));
    },

    validateRecipes: function() {
        if (typeof CRAFTING_RECIPES === 'undefined') return;
        Object.entries(CRAFTING_RECIPES).forEach(function(entry) {
            var id = entry[0], r = entry[1];
            if (!r.name) this.errors.push('Recipe ' + id + ': missing name');
            if (!r.result) this.errors.push('Recipe ' + id + ': missing result');
            if (typeof ITEMS !== 'undefined' && !ITEMS[r.result]) {
                this.errors.push('Recipe ' + id + ': result "' + r.result + '" not found');
            }
            if (r.ingredients) {
                Object.keys(r.ingredients).forEach(function(iId) {
                    if (typeof ITEMS !== 'undefined' && !ITEMS[iId]) {
                        this.errors.push('Recipe ' + id + ': ingredient "' + iId + '" not found');
                    }
                }.bind(this));
            }
        }.bind(this));
    },

    validateNPCs: function() {
        if (typeof NPCS === 'undefined') return;
        Object.entries(NPCS).forEach(function(entry) {
            var id = entry[0], npc = entry[1];
            if (!npc.name) this.errors.push('NPC ' + id + ': missing name');
            if (npc.trades) {
                npc.trades.forEach(function(t, i) {
                    if (t.give) {
                        Object.keys(t.give).forEach(function(gId) {
                            if (typeof ITEMS !== 'undefined' && !ITEMS[gId] && gId !== 'map') {
                                this.warnings.push('NPC ' + id + ' trade ' + i + ': give item "' + gId + '" not found');
                            }
                        }.bind(this));
                    }
                    if (t.receive) {
                        Object.keys(t.receive).forEach(function(rId) {
                            if (typeof ITEMS !== 'undefined' && !ITEMS[rId] && rId !== 'map') {
                                this.warnings.push('NPC ' + id + ' trade ' + i + ': receive item "' + rId + '" not found');
                            }
                        }.bind(this));
                    }
                }.bind(this));
            }
        }.bind(this));
    },

    printReport: function() {
        var result = this.validateAll();
        console.log('=== Data Validation Report ===');
        console.log('Errors: ' + result.errors.length);
        result.errors.forEach(function(e) { console.log('  ERROR: ' + e); });
        console.log('Warnings: ' + result.warnings.length);
        result.warnings.forEach(function(w) { console.log('  WARN: ' + w); });
        console.log('Valid: ' + result.valid);
        return result;
    }
};

if (typeof KBA !== 'undefined') KBA.systems.dataValidator = DataValidator;
