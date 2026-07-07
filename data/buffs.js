// Buff/Debuff Definitions
// 纯数据驱动，零 function

var BUFF_DEFS = {
    // === Debuffs ===
    poison: {
        name: '中毒',
        icon: '☠️',
        description: '每回合损失3%最大生命',
        type: 'debuff',
        maxStacks: 3,
        skipTurn: false,
        tickEffect: { type: 'damagePercent', stat: 'health', base: 'maxHp', percent: 3 }
    },
    burn: {
        name: '灼烧',
        icon: '🔥',
        description: '每回合损失5%当前生命',
        type: 'debuff',
        maxStacks: 3,
        skipTurn: false,
        tickEffect: { type: 'damagePercent', stat: 'health', base: 'currentHp', percent: 5 }
    },
    freeze: {
        name: '冰冻',
        icon: '❄️',
        description: '跳过回合',
        type: 'debuff',
        maxStacks: 1,
        skipTurn: true,
        tickEffect: null
    },
    stun: {
        name: '眩晕',
        icon: '💫',
        description: '跳过回合',
        type: 'debuff',
        maxStacks: 1,
        skipTurn: true,
        tickEffect: null
    },
    bleed: {
        name: '流血',
        icon: '🩸',
        description: '每回合损失5×层数生命',
        type: 'debuff',
        maxStacks: 3,
        skipTurn: false,
        tickEffect: { type: 'damageFlat', stat: 'health', base: 5 }
    },

    // === Buffs ===
    attackUp: {
        name: '攻击提升',
        icon: '⚔️',
        description: '攻击力增加',
        type: 'buff',
        maxStacks: 3,
        skipTurn: false,
        tickEffect: null,
        modifiers: { attack: 10 }
    },
    defenseUp: {
        name: '防御提升',
        icon: '🛡️',
        description: '防御力增加',
        type: 'buff',
        maxStacks: 3,
        skipTurn: false,
        tickEffect: null,
        modifiers: { defense: 5 }
    },
    warCry: {
        name: '战吼',
        icon: '📢',
        description: '攻击力+30%',
        type: 'buff',
        maxStacks: 1,
        skipTurn: false,
        tickEffect: null,
        modifiers: { attackPercent: 30 }
    },
    invincible: {
        name: '无敌',
        icon: '🛡️',
        description: '免疫所有伤害',
        type: 'buff',
        maxStacks: 1,
        skipTurn: false,
        tickEffect: null,
        modifiers: { invincible: true }
    },
    counter: {
        name: '反击',
        icon: '🔄',
        description: '受击后反击',
        type: 'buff',
        maxStacks: 1,
        skipTurn: false,
        tickEffect: null,
        modifiers: { counter: true }
    },
    regen: {
        name: '再生',
        icon: '💚',
        description: '每回合回复5×层数生命',
        type: 'buff',
        maxStacks: 3,
        skipTurn: false,
        tickEffect: { type: 'healFlat', stat: 'health', base: 5 }
    }
};
