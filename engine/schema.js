// Data Schema System
var DataSchema = {
    schemas: {
        item: {
            required: ['name', 'type'],
            optional: ['description', 'icon', 'stackable', 'maxStack', 'attack', 'defense'],
            types: { name: 'string', type: 'string', description: 'string', icon: 'string', attack: 'number', defense: 'number' }
        },
        monster: {
            required: ['name', 'health', 'attack'],
            optional: ['defense', 'drops', 'dropChance', 'abilities', 'ai'],
            types: { name: 'string', health: 'number', attack: 'number', defense: 'number' }
        },
        map: {
            required: ['name', 'description'],
            optional: ['resources', 'monsters', 'npcs', 'timeCost', 'staminaCost'],
            types: { name: 'string', description: 'string', timeCost: 'number', staminaCost: 'number' }
        },
        npc: {
            required: ['name'],
            optional: ['location', 'dialogue', 'trades'],
            types: { name: 'string', location: 'string' }
        },
        recipe: {
            required: ['result', 'name'],
            optional: ['ingredients', 'station'],
            types: { result: 'string', name: 'string' }
        }
    },

    validate: function(schemaName, id, data) {
        var schema = this.schemas[schemaName];
        if (!schema) return { valid: false, errors: ['Unknown schema'] };
        var errors = [];
        schema.required.forEach(function(field) {
            if (data[field] === undefined) errors.push(id + ': Missing "' + field + '"');
        });
        return { valid: errors.length === 0, errors: errors };
    },

    validateAll: function(schemaName, data) {
        var results = { valid: true, errors: [], count: 0 };
        var self = this;
        if (!data) return results;
        Object.entries(data).forEach(function(entry) {
            results.count++;
            var r = self.validate(schemaName, entry[0], entry[1]);
            if (!r.valid) { results.valid = false; results.errors = results.errors.concat(r.errors); }
        });
        return results;
    },

    checkReferences: function() {
        var errors = [];
        if (typeof MONSTERS !== 'undefined' && typeof ITEMS !== 'undefined') {
            Object.entries(MONSTERS).forEach(function(e) {
                if (e[1].drops) e[1].drops.forEach(function(d) { if (!ITEMS[d]) errors.push(e[0] + ' drops ' + d); });
            });
        }
        if (typeof MAPS !== 'undefined' && typeof MONSTERS !== 'undefined') {
            Object.entries(MAPS).forEach(function(e) {
                if (e[1].monsters) e[1].monsters.forEach(function(m) { if (!MONSTERS[m]) errors.push(e[0] + ' has ' + m); });
            });
        }
        return errors;
    },

    printReport: function() {
        var r = this.validateAll('item', typeof ITEMS !== 'undefined' ? ITEMS : {});
        console.log('Items: ' + r.count + ' entries, ' + (r.valid ? 'VALID' : r.errors.length + ' ERRORS'));
        r = this.validateAll('monster', typeof MONSTERS !== 'undefined' ? MONSTERS : {});
        console.log('Monsters: ' + r.count + ' entries, ' + (r.valid ? 'VALID' : r.errors.length + ' ERRORS'));
        var refs = this.checkReferences();
        console.log('Reference errors: ' + refs.length);
        refs.forEach(function(e) { console.log('  ' + e); });
    }
};

if (typeof KBA !== 'undefined') KBA.systems.dataSchema = DataSchema;
