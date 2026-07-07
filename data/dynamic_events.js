// Dynamic Events Data
// Extreme weather, wandering merchant, black market

var DynamicEventData = {
    // === 极端天气事件 ===
    bloodMoon: {
        name: '猩红之月',
        description: '天空变成血红色，所有怪物变得狂暴',
        type: 'disaster',
        chance: 0.02,
        season: 'autumn',
        duration: 24,
        effects: [
            { type: 'message', text: '猩红之月升起！怪物属性翻倍！', msgType: 'error' },
            { type: 'stat', stat: 'sanity', value: -20 }
        ],
        onEnter: function() {
            // 怪物属性翻倍标记
            if (typeof KBA !== 'undefined') KBA.data.bloodMoonActive = true;
        },
        onExit: function() {
            if (typeof KBA !== 'undefined') KBA.data.bloodMoonActive = false;
        }
    },
    extremeBlizzard: {
        name: '极寒风暴',
        description: '极度寒冷的风暴席卷大地',
        type: 'disaster',
        chance: 0.03,
        season: 'winter',
        duration: 12,
        effects: [
            { type: 'message', text: '极寒风暴来袭！体温流失极快！', msgType: 'error' },
            { type: 'stat', stat: 'temperature', value: -10 },
            { type: 'stat', stat: 'stamina', value: -30 }
        ]
    },
    acidRain: {
        name: '酸雨',
        description: '带有腐蚀性的雨水',
        type: 'disaster',
        chance: 0.025,
        season: 'summer',
        duration: 8,
        effects: [
            { type: 'message', text: '酸雨降临！出门会持续受伤！', msgType: 'error' },
            { type: 'damage', value: 5 }
        ]
    },
    goldenSunrise: {
        name: '金色日出',
        description: '罕见的金色阳光洒满大地',
        type: 'blessing',
        chance: 0.015,
        season: 'spring',
        duration: 12,
        effects: [
            { type: 'message', text: '金色日出！所有属性恢复！', msgType: 'success' },
            { type: 'heal', stat: 'health', value: 50, max: 100 },
            { type: 'heal', stat: 'stamina', value: 50, max: 100 },
            { type: 'heal', stat: 'sanity', value: 30, max: 100 }
        ]
    },
    spiritFog: {
        name: '灵魂迷雾',
        description: '神秘的迷雾中出现灵魂',
        type: 'mystery',
        chance: 0.02,
        season: 'autumn',
        duration: 6,
        effects: [
            { type: 'message', text: '灵魂迷雾出现...你感到不安', msgType: 'warning' },
            { type: 'stat', stat: 'sanity', value: -15 },
            { type: 'soul', value: 10 }
        ]
    },

    // === 游荡商人 ===
    wanderingMerchant: {
        name: '游荡商人',
        description: '神秘的游荡商人，在特定条件下出现',
        type: 'special',
        chance: 0.008,
        season: null,
        weather: ['clear', 'starry'],
        hourRange: [18, 6],
        items: [
            { id: 'techBlueprint', price: 50, name: '科技蓝图' },
            { id: 'magicScroll', price: 60, name: '魔法卷轴' },
            { id: 'ancientRelic', price: 80, name: '古代遗物' },
            { id: 'crystal', price: 30, name: '水晶' },
            { id: 'moonstone', price: 45, name: '月光石' },
            { id: 'thermalPotion', price: 25, name: '恒温药剂' }
        ],
        dialogue: [
            '嘘...别出声，我有些好东西...',
            '这些可不是普通货色，识货的才卖。',
            '下次见面不知何时了，抓紧机会。'
        ]
    },
    blackMarket: {
        name: '黑市商人',
        description: '在深夜出现的黑市商人，出售稀有物品',
        type: 'special',
        chance: 0.005,
        season: null,
        weather: null,
        hourRange: [0, 4],
        items: [
            { id: 'dragonBone', price: 100, name: '龙骨' },
            { id: 'dragonScale', price: 120, name: '龙鳞' },
            { id: 'lightDust', price: 40, name: '光尘' },
            { id: 'darkDust', price: 40, name: '暗尘' },
            { id: 'soul', price: 20, name: '灵魂', amount: 5 }
        ],
        dialogue: [
            '...你怎么找到这里的？',
            '既然来了，就看看吧。别问来源。',
            '这些东西...不该存在于这个世界。'
        ]
    },

    // === 收集品 ===
    loreFragments: {
        diary: {
            name: '血迹斑斑的日记',
            description: '一本沾满血迹的日记，记录着冒险者的最后时光',
            locations: ['ancientRuin', 'dungeon'],
            chance: 0.08,
            entries: [
                '第1天：我来到了这片森林，听说这里藏着远古的秘密...',
                '第7天：我发现了一座废墟，里面有些奇怪的符号...',
                '第15天：那些符号是龙语！它们记录着一场远古战争...',
                '第23天：我找到了入口...但里面的东西...不，我不能说...',
                '第30天：如果有人读到这篇日记...请离开这里...越远越好...'
            ]
        },
        letter: {
            name: '冒险者遗书',
            description: '一封未寄出的信，写给远方的家人',
            locations: ['dungeon', 'quietForest'],
            chance: 0.06,
            entries: [
                '亲爱的妈妈：我在森林里发现了一些东西，等我回来告诉你...',
                '亲爱的妈妈：我受了伤，但我会没事的。这里有很多药草...',
                '亲爱的妈妈：我见到了一些...不该见到的东西。我想回家...',
                '亲爱的妈妈：对不起，我可能回不去了。请原谅我...',
                '亲爱的妈妈：我爱你。永远爱你。'
            ]
        },
        stoneTablet: {
            name: '古老的石板',
            description: '刻满古老文字的石板，记录着世界的历史',
            locations: ['ancientRuin', 'skyIsland'],
            chance: 0.04,
            entries: [
                '远古之时，龙族统治着这片大地...',
                '人类与龙族的战争持续了百年...',
                '最终，英雄用龙骨铸造了神器，封印了龙王...',
                '龙王的诅咒仍在...森林在蔓延...',
                '只有集齐五种精华，才能打破诅咒...'
            ]
        }
    }
};

if (typeof KBA !== 'undefined') KBA.data.dynamicEvents = DynamicEventData;
