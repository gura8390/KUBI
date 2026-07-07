// Configurable Monster AI System
var MonsterAI = {
    types: {
        normal: {
            name: 'normal',
            chooseAction: function(monster, pState) {
                return { type: 'attack' };
            }
        },
        berserker: {
            name: 'berserker',
            chooseAction: function(monster, pState) {
                var hp = monster.health / monster.maxHealth;
                if (hp < 0.3) return { type: 'attack', multiplier: 2.0, message: monster.name + ' rages!' };
                return { type: 'attack' };
            }
        },
        mage: {
            name: 'mage',
            chooseAction: function(monster, pState) {
                var r = Math.random();
                if (r < 0.3) return { type: 'skill', skill: 'fireball', message: monster.name + ' casts Fireball!' };
                if (r < 0.5) return { type: 'skill', skill: 'iceBlast', message: monster.name + ' casts Ice Blast!' };
                if (r < 0.6 && monster.health < monster.maxHealth * 0.5) return { type: 'heal', amount: Math.floor(monster.maxHealth * 0.2), message: monster.name + ' heals!' };
                return { type: 'attack' };
            }
        },
        summoner: {
            name: 'summoner',
            count: 0,
            chooseAction: function(monster, pState) {
                if (this.count < 2 && Math.random() < 0.25) { this.count++; return { type: 'summon', message: monster.name + ' summons!' }; }
                return { type: 'attack' };
            }
        },
        boss: {
            name: 'boss',
            phase: 1,
            chooseAction: function(monster, pState) {
                var hp = monster.health / monster.maxHealth;
                if (hp < 0.3 && this.phase < 3) { this.phase = 3; return { type: 'special', effect: 'enrage', message: monster.name + ' enrages!' }; }
                if (hp < 0.6 && this.phase < 2) { this.phase = 2; return { type: 'special', effect: 'buff', message: monster.name + ' powers up!' }; }
                var r = Math.random();
                if (this.phase === 3 && r < 0.4) return { type: 'attack', multiplier: 2.0 };
                if (this.phase === 2 && r < 0.3) return { type: 'attack', multiplier: 1.5 };
                return { type: 'attack' };
            }
        }
    },

    getAI: function(type) {
        var ai = this.types[type] || this.types.normal;
        return Object.assign({}, ai);
    },

    executeAction: function(action, monster) {
        switch (action.type) {
            case 'attack':
                var dmg = Math.floor(monster.attack * (action.multiplier || 1));
                dmg = Math.max(1, dmg - (player.defense || 0));
                player.health = Math.max(0, player.health - dmg);
                return { damage: dmg };
            case 'skill':
                var sdmg = Math.floor(monster.attack * 1.2);
                sdmg = Math.max(1, sdmg - (player.defense || 0));
                player.health = Math.max(0, player.health - sdmg);
                if (action.skill === 'fireball' && typeof BuffSystem !== 'undefined') BuffSystem.add('player', 'burn', 2, 1);
                if (action.skill === 'iceBlast' && typeof BuffSystem !== 'undefined') BuffSystem.add('player', 'freeze', 1, 1);
                return { damage: sdmg };
            case 'heal':
                monster.health = Math.min(monster.maxHealth, monster.health + action.amount);
                return { healed: action.amount };
            case 'special':
                if (typeof BuffSystem !== 'undefined') BuffSystem.add('monster', 'attackUp', 999, 2);
                return { special: action.effect };
            default:
                var ddmg = Math.max(1, monster.attack - (player.defense || 0));
                player.health = Math.max(0, player.health - ddmg);
                return { damage: ddmg };
        }
    }
};

if (typeof KBA !== 'undefined') KBA.systems.monsterAI = MonsterAI;
