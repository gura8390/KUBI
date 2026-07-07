// Buff/Debuff Definitions
// All status effects defined here

var BUFF_DEFS = {
    // === Debuffs ===
    poison: {
        name: 'Poison',
        icon: '☠️',
        description: 'Lose 3% max HP per turn',
        type: 'debuff',
        maxStacks: 3,
        onTick: function(target, stacks, ctx) {
            var dmg = Math.floor(100 * 0.03 * stacks);
            if (target === 'player') player.health = Math.max(0, player.health - dmg);
            else if (ctx && ctx.monster) ctx.monster.health = Math.max(0, ctx.monster.health - dmg);
        }
    },
    burn: {
        name: 'Burn',
        icon: '🔥',
        description: 'Lose 5% current HP per turn',
        type: 'debuff',
        maxStacks: 3,
        onTick: function(target, stacks, ctx) {
            var hp = target === 'player' ? player.health : (ctx && ctx.monster ? ctx.monster.health : 100);
            var dmg = Math.floor(hp * 0.05 * stacks);
            if (target === 'player') player.health = Math.max(0, player.health - dmg);
            else if (ctx && ctx.monster) ctx.monster.health = Math.max(0, ctx.monster.health - dmg);
        }
    },
    freeze: {
        name: 'Freeze',
        icon: '❄️',
        description: 'Skip turn',
        type: 'debuff',
        maxStacks: 1,
        onTick: function() {}
    },
    stun: {
        name: 'Stun',
        icon: '💫',
        description: 'Skip turn',
        type: 'debuff',
        maxStacks: 1,
        onTick: function() {}
    },
    bleed: {
        name: 'Bleed',
        icon: '🩸',
        description: 'Lose 5 HP per turn',
        type: 'debuff',
        maxStacks: 3,
        onTick: function(target, stacks) {
            var dmg = 5 * stacks;
            if (target === 'player') player.health = Math.max(0, player.health - dmg);
        }
    },

    // === Buffs ===
    attackUp: {
        name: 'Attack Up',
        icon: '⚔️',
        description: 'Attack increased',
        type: 'buff',
        maxStacks: 3,
        modifiers: { attack: 10 }
    },
    defenseUp: {
        name: 'Defense Up',
        icon: '🛡️',
        description: 'Defense increased',
        type: 'buff',
        maxStacks: 3,
        modifiers: { defense: 5 }
    },
    warCry: {
        name: 'War Cry',
        icon: '📢',
        description: 'Attack +30%',
        type: 'buff',
        maxStacks: 1,
        modifiers: { attackPercent: 30 }
    },
    invincible: {
        name: 'Invincible',
        icon: '🛡️',
        description: 'Immune to damage',
        type: 'buff',
        maxStacks: 1
    },
    counter: {
        name: 'Counter',
        icon: '🔄',
        description: 'Counter attack on hit',
        type: 'buff',
        maxStacks: 1
    },
    regen: {
        name: 'Regen',
        icon: '💚',
        description: 'Heal over time',
        type: 'buff',
        maxStacks: 3,
        onTick: function(target, stacks) {
            var heal = 5 * stacks;
            if (target === 'player') player.health = Math.min(100, player.health + heal);
        }
    }
};
