// Unified Condition System - Enhanced with Expression support
var ConditionSystem = {
    evaluate: function(condition, context) {
        if (!condition) return true;
        if (Array.isArray(condition)) {
            return condition.every(function(c) { return ConditionSystem.evaluate(c, context); });
        }
        var operator = condition.operator || 'and';
        var conditions = condition.conditions || [condition];
        if (operator === 'and') return conditions.every(function(c) { return ConditionSystem._evalSingle(c, context); });
        if (operator === 'or') return conditions.some(function(c) { return ConditionSystem._evalSingle(c, context); });
        if (operator === 'not') return !ConditionSystem._evalSingle(conditions[0], context);
        return this._evalSingle(condition, context);
    },

    _evalSingle: function(cond, context) {
        if (!cond || !cond.type) return true;
        var actual = this._getValue(cond.type, cond.target, context);
        var expected = cond.value;
        var op = cond.op || '>=';
        // 支持表达式值
        if (typeof expected === 'string' && typeof ExpressionSystem !== 'undefined') {
            expected = ExpressionSystem.eval(expected, context);
        }
        return this._compare(actual, expected, op);
    },

    _getValue: function(type, target, context) {
        switch (type) {
            case 'stat': return player ? (player[target] || 0) : 0;
            case 'item': return typeof countItemInInventory !== 'undefined' ? countItemInInventory(target) : 0;
            case 'building': return typeof hasBuilding !== 'undefined' && hasBuilding(target) ? 1 : 0;
            case 'level': return player ? (player.level || 1) : 1;
            case 'map': return typeof mapSystem !== 'undefined' && mapSystem.currentMap === target ? 1 : 0;
            case 'weather': return typeof weatherSystem !== 'undefined' && weatherSystem.currentWeather === target ? 1 : 0;
            case 'season': return player && player.gameTime ? (player.gameTime.season === target ? 1 : 0) : 0;
            case 'hour': return player && player.gameTime ? player.gameTime.hour : 0;
            case 'day': return player && player.gameTime ? player.gameTime.day : 0;
            case 'faction': return player && player.faction === target ? 1 : 0;
            case 'worldState': return typeof WorldState !== 'undefined' ? (WorldState.state[target] || 0) : 0;
            case 'npcRelation': return typeof WorldState !== 'undefined' ? WorldState.getNPCRelation(target) : 0;
            case 'factionRep': return typeof WorldState !== 'undefined' ? WorldState.getFactionRep(target) : 0;
            case 'bossKilled': return typeof WorldState !== 'undefined' && WorldState.isBossKilled(target) ? 1 : 0;
            case 'buff': return typeof BuffSystem !== 'undefined' && BuffSystem.has('player', target) ? 1 : 0;
            case 'questCompleted': return typeof questSystem !== 'undefined' && questSystem.completedQuests.includes(target) ? 1 : 0;
            case 'expression': return typeof ExpressionSystem !== 'undefined' ? ExpressionSystem.eval(target, context) : 0;
            case 'constant': return target;
            default: return 0;
        }
    },

    _compare: function(actual, expected, op) {
        switch (op) {
            case '>=': return actual >= expected;
            case '<=': return actual <= expected;
            case '>': return actual > expected;
            case '<': return actual < expected;
            case '==': return actual === expected;
            case '!=': return actual !== expected;
            case 'in': return Array.isArray(expected) && expected.includes(actual);
            case 'not_in': return Array.isArray(expected) && !expected.includes(actual);
            default: return actual >= expected;
        }
    },

    // Helper functions
    stat: function(stat, op, value) { return { type: 'stat', target: stat, op: op, value: value }; },
    item: function(itemId, op, value) { return { type: 'item', target: itemId, op: op, value: value }; },
    building: function(buildingId) { return { type: 'building', target: buildingId, value: 1 }; },
    level: function(op, value) { return { type: 'level', op: op, value: value }; },
    map: function(mapId) { return { type: 'map', target: mapId, value: 1 }; },
    weather: function(weatherId) { return { type: 'weather', target: weatherId, value: 1 }; },
    season: function(seasonId) { return { type: 'season', target: seasonId, value: 1 }; },
    faction: function(factionId) { return { type: 'faction', target: factionId, value: 1 }; },
    expr: function(expr) { return { type: 'expression', target: expr, value: 0, op: '>' }; },
    and: function() { return { operator: 'and', conditions: Array.from(arguments) }; },
    or: function() { return { operator: 'or', conditions: Array.from(arguments) }; },
    not: function(cond) { return { operator: 'not', conditions: [cond] }; }
};

if (typeof KBA !== 'undefined') KBA.systems.conditionSystem = ConditionSystem;
