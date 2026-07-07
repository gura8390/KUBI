// 事件数据配置
// 所有随机事件定义集中在此文件

const EventData = {
    // === 正面事件 ===
    luckyFind: {
        name: '幸运发现',
        description: '你在探索时发现了一些有用的物品！',
        type: 'positive',
        chance: 0.15,
        season: null,
        effects: [
            { type: 'random', effects: [
                { type: 'item', item: 'berry', count: 3 },
                { type: 'item', item: 'water', count: 2 },
                { type: 'item', item: 'wood', count: 5 },
                { type: 'item', item: 'herb', count: 2 }
            ], weights: [1, 1, 1, 1] },
            { type: 'message', text: '🍀 幸运发现！', msgType: 'success' }
        ]
    },
    herbDiscovery: {
        name: '草药发现',
        description: '你发现了一片草药丛！',
        type: 'positive',
        chance: 0.12,
        season: 'spring',
        effects: [
            { type: 'item', item: 'herb', count: 3 },
            { type: 'message', text: '🌿 发现了草药！', msgType: 'success' }
        ]
    },
    springRain: {
        name: '春雨',
        description: '春雨带来了清新的空气',
        type: 'positive',
        chance: 0.20,
        season: 'spring',
        effects: [
            { type: 'heal', stat: 'thirst', value: 20, max: 100 },
            { type: 'message', text: '🌧️ 春雨！水分+20', msgType: 'success' }
        ]
    },
    autumnHarvest: {
        name: '秋收',
        description: '秋天带来了丰富的收获',
        type: 'positive',
        chance: 0.20,
        season: 'autumn',
        effects: [
            { type: 'item', item: 'wheat', count: 3 },
            { type: 'item', item: 'berry', count: 5 },
            { type: 'message', text: '🍂 秋收！获得了食物', msgType: 'success' }
        ]
    },
    winterSun: {
        name: '冬日暖阳',
        description: '难得的冬日暖阳',
        type: 'positive',
        chance: 0.08,
        season: 'winter',
        effects: [
            { type: 'heal', stat: 'temperature', value: 2, max: 40 },
            { type: 'heal', stat: 'sanity', value: 10, max: 100 },
            { type: 'message', text: '☀️ 冬日暖阳！体温+2，精神+10', msgType: 'success' }
        ]
    },
    explorationFind: {
        name: '探索发现',
        description: '你发现了隐藏的资源！',
        type: 'positive',
        chance: 0.10,
        season: null,
        effects: [
            { type: 'random', effects: [
                { type: 'item', item: 'herb', count: 2 },
                { type: 'item', item: 'iron', count: 1 },
                { type: 'item', item: 'silk', count: 1 }
            ] },
            { type: 'message', text: '🔍 探索发现！', msgType: 'success' }
        ]
    },

    // === 负面事件 ===
    thiefAttack: {
        name: '小偷袭击',
        description: '一个小偷袭击了你！',
        type: 'negative',
        chance: 0.08,
        season: null,
        effects: [
            { type: 'damage', value: 10 },
            { type: 'random', effects: [
                { type: 'item', item: 'gold', count: 2, action: 'remove' },
                { type: 'item', item: 'berry', count: 2, action: 'remove' }
            ] },
            { type: 'message', text: '🗡️ 小偷袭击！', msgType: 'error' }
        ]
    },
    badWeather: {
        name: '恶劣天气',
        description: '天气变得恶劣',
        type: 'negative',
        chance: 0.10,
        season: null,
        effects: [
            { type: 'stat', stat: 'stamina', value: -5 },
            { type: 'stat', stat: 'sanity', value: -3 },
            { type: 'message', text: '🌧️ 恶劣天气！体力-5，精神-3', msgType: 'warning' }
        ]
    },
    illness: {
        name: '生病',
        description: '你生病了',
        type: 'negative',
        chance: 0.06,
        season: 'winter',
        effects: [
            { type: 'stat', stat: 'health', value: -10 },
            { type: 'stat', stat: 'stamina', value: -10 },
            { type: 'message', text: '🤒 生病了！生命-10，体力-10', msgType: 'error' }
        ]
    },
    monsterRaid: {
        name: '怪物入侵',
        description: '一群怪物袭击了你的营地！',
        type: 'negative',
        chance: 0.06,
        season: 'winter',
        effects: [
            { type: 'damage', value: 15 },
            { type: 'message', text: '🐺 怪物入侵！', msgType: 'error' }
        ]
    },

    // === 中性事件 ===
    merchantPassing: {
        name: '路过的商人',
        description: '一个商人路过',
        type: 'neutral',
        chance: 0.10,
        season: null,
        effects: [
            { type: 'message', text: '🧑‍💼 路过的商人', msgType: 'info' }
        ]
    },

    // === 特殊事件 ===
    mysteriousStranger: {
        name: '神秘陌生人',
        description: '一个神秘的陌生人出现',
        type: 'special',
        chance: 0.03,
        season: null,
        effects: [
            { type: 'random', effects: [
                { type: 'xp', value: 50 },
                { type: 'soul', value: 5 },
                { type: 'heal', stat: 'health', value: 30, max: 100 }
            ] },
            { type: 'message', text: '🎩 神秘陌生人给了你帮助', msgType: 'info' }
        ]
    }
};
