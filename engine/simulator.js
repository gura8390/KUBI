// Balance Simulator
// Runs thousands of simulations to validate game balance

var BalanceSimulator = {
    results: null,

    simulateBattle: function(monsterId, playerStats) {
        var monster = Object.assign({}, (typeof MONSTERS !== 'undefined' && MONSTERS[monsterId]) || { health: 100, attack: 10, defense: 5 });
        monster.maxHealth = monster.health;
        var pStats = Object.assign({ health: 100, attack: 10, defense: 0, hitRate: 80 }, playerStats || {});
        var turns = 0;
        var maxTurns = 50;

        while (pStats.health > 0 && monster.health > 0 && turns < maxTurns) {
            turns++;
            // Player attacks
            if (Math.random() * 100 < pStats.hitRate) {
                var dmg = Math.max(1, pStats.attack - monster.defense);
                if (Math.random() < 0.1) dmg = Math.floor(dmg * 1.5);
                monster.health -= dmg;
            }
            if (monster.health <= 0) break;
            // Monster attacks
            if (Math.random() < 80) {
                var mdmg = Math.max(1, monster.attack - pStats.defense);
                pStats.health -= mdmg;
            }
        }

        return {
            victory: pStats.health > 0,
            turns: turns,
            playerHP: Math.max(0, pStats.health),
            monsterHP: Math.max(0, monster.health)
        };
    },

    simulateExploration: function(mapId, iterations) {
        var map = (typeof MAPS !== 'undefined' && MAPS[mapId]) || {};
        var resources = map.resources || {};
        var results = { items: {}, totalItems: 0, runs: iterations };

        for (var i = 0; i < iterations; i++) {
            Object.entries(resources).forEach(function(entry) {
                var rId = entry[0], r = entry[1];
                if (Math.random() < r.chance) {
                    var amount = r.min + Math.floor(Math.random() * (r.max - r.min + 1));
                    results.items[rId] = (results.items[rId] || 0) + amount;
                    results.totalItems += amount;
                }
            });
        }

        results.avgItems = results.totalItems / iterations;
        return results;
    },

    simulateDropRate: function(monsterId, iterations) {
        var monster = (typeof MONSTERS !== 'undefined' && MONSTERS[monsterId]) || {};
        var drops = monster.drops || [];
        var chance = monster.dropChance || 0.5;
        var results = {};

        drops.forEach(function(dId) { results[dId] = 0; });
        for (var i = 0; i < iterations; i++) {
            drops.forEach(function(dId) {
                if (Math.random() < chance) results[dId]++;
            });
        }

        Object.keys(results).forEach(function(k) {
            results[k] = { count: results[k], rate: (results[k] / iterations * 100).toFixed(1) + '%' };
        });
        return results;
    },

    runFullSimulation: function(iterations) {
        iterations = iterations || 1000;
        this.results = {
            battles: {},
            exploration: {},
            drops: {},
            timestamp: new Date().toISOString()
        };

        // Simulate battles
        if (typeof MONSTERS !== 'undefined') {
            var battleMonsters = ['rabbit', 'bear', 'demonLord', 'worldEnder'];
            battleMonsters.forEach(function(mId) {
                if (MONSTERS[mId]) {
                    var wins = 0, totalTurns = 0;
                    for (var i = 0; i < iterations; i++) {
                        var r = BalanceSimulator.simulateBattle(mId);
                        if (r.victory) wins++;
                        totalTurns += r.turns;
                    }
                    BalanceSimulator.results.battles[mId] = {
                        winRate: (wins / iterations * 100).toFixed(1) + '%',
                        avgTurns: (totalTurns / iterations).toFixed(1)
                    };
                }
            });
        }

        // Simulate exploration
        if (typeof MAPS !== 'undefined') {
            Object.keys(MAPS).slice(0, 5).forEach(function(mapId) {
                BalanceSimulator.results.exploration[mapId] = BalanceSimulator.simulateExploration(mapId, iterations);
            });
        }

        return this.results;
    },

    printReport: function() {
        if (!this.results) this.runFullSimulation();
        console.log('=== Balance Simulation Report ===');
        console.log('Battles:', JSON.stringify(this.results.battles, null, 2));
        console.log('Exploration:', JSON.stringify(this.results.exploration, null, 2));
        return this.results;
    }
};

if (typeof KBA !== 'undefined') KBA.systems.balanceSimulator = BalanceSimulator;
