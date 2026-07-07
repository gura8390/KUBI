// 技能数据配置
// 所有技能定义集中在此文件

const SkillData = {
    // === 攻击技能 ===
    heavyStrike: {
        id: 'heavyStrike',
        name: '重击',
        description: '蓄力一击，造成2倍伤害',
        icon: '💥',
        type: 'attack',
        cooldown: 3,
        unlockLevel: 1,
        effects: [
            { type: 'damage', multiplier: 2, ignoreDefense: false }
        ]
    },
    doubleSlash: {
        id: 'doubleSlash',
        name: '连斩',
        description: '快速斩击两次，每次造成70%伤害',
        icon: '⚔️',
        type: 'attack',
        cooldown: 5,
        unlockLevel: 3,
        effects: [
            { type: 'damage', multiplier: 0.7, hits: 2 }
        ]
    },
    fatalBlow: {
        id: 'fatalBlow',
        name: '致命一击',
        description: '全力一击，造成3倍伤害，但命中率降低30%',
        icon: '☠️',
        type: 'attack',
        cooldown: 8,
        unlockLevel: 5,
        effects: [
            { type: 'damage', multiplier: 3, hitPenalty: 0.3 }
        ]
    },

    // === 防御技能 ===
    ironWall: {
        id: 'ironWall',
        name: '铁壁',
        description: '进入完全防御状态，本回合免疫所有伤害',
        icon: '🛡️',
        type: 'defense',
        cooldown: 4,
        unlockLevel: 2,
        effects: [
            { type: 'status', target: 'player', statusType: 'invincible', duration: 1 }
        ]
    },
    counterAttack: {
        id: 'counterAttack',
        name: '反击',
        description: '防御姿态，受到攻击后反击造成50%伤害',
        icon: '🔄',
        type: 'defense',
        cooldown: 6,
        unlockLevel: 4,
        effects: [
            { type: 'status', target: 'player', statusType: 'counter', duration: 1 }
        ]
    },
    warCry: {
        id: 'warCry',
        name: '战吼',
        description: '发出战吼，提升攻击力30%持续3回合',
        icon: '📢',
        type: 'defense',
        cooldown: 10,
        unlockLevel: 6,
        effects: [
            { type: 'status', target: 'player', statusType: 'warCry', duration: 3, data: { attackBonus: 0.3 } }
        ]
    },

    // === 魔法技能 ===
    fireball: {
        id: 'fireball',
        name: '火球术',
        description: '发射火球，造成魔法伤害并附加灼烧',
        icon: '🔥',
        type: 'magic',
        cooldown: 5,
        unlockLevel: 3,
        effects: [
            { type: 'damage', value: 15, ignoreDefense: true, element: 'fire' },
            { type: 'status', target: 'monster', statusType: 'burn', duration: 2 }
        ]
    },
    iceBlast: {
        id: 'iceBlast',
        name: '冰冻术',
        description: '释放寒冰，造成魔法伤害并冰冻敌人1回合',
        icon: '❄️',
        type: 'magic',
        cooldown: 8,
        unlockLevel: 5,
        effects: [
            { type: 'damage', value: 10, ignoreDefense: true, element: 'ice' },
            { type: 'status', target: 'monster', statusType: 'freeze', duration: 1 }
        ]
    }
};
