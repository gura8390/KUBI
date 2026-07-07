// Maps Data - 地图数据

var MAPS = {
    darkForest: {
        name: '幽暗森林',
        description: '幽暗的森林，周围树木茂密，阳光透过树叶洒下斑驳的光影。',
        unlockCondition: null, // 初始地图
        resources: {
            wood: { min: 1, max: 3, chance: 0.8 },
            berry: { min: 1, max: 2, chance: 0.6 },
            rawMeat: { min: 1, max: 2, chance: 0.4 },
            seed: { min: 1, max: 1, chance: 0.3 },
            herb: { min: 1, max: 1, chance: 0.2 },
            flower: { min: 1, max: 1, chance: 0.2 },
            treebark: { min: 1, max: 1, chance: 0.3 },
            stone: { min: 1, max: 1, chance: 0.2 }
        },
        waterSources: { min: 1, max: 2, chance: 0.8 },
        monsters: ['vineWhipper', 'sparrow', 'crow', 'rabbit'],
        actions: ['chop', 'gather', 'hunt', 'scavenge', 'water'],
        timeCost: 2,
        staminaCost: 3
    },
    town: {
        name: '小镇',
        description: '人来人往的小镇，有各种商人和设施。',
        unlockCondition: { type: 'item', item: 'berry', amount: 8 },
        resources: {
            parts: { min: 1, max: 2, chance: 0.3 },
            wheat: { min: 1, max: 3, chance: 0.5 },
            seed: { min: 1, max: 2, chance: 0.4 },
            stone: { min: 1, max: 2, chance: 0.3 },
            carrot: { min: 1, max: 2, chance: 0.3 },
            lettuce: { min: 1, max: 2, chance: 0.3 }
        },
        npcs: ['farmer', 'miner', 'merchant', 'mayor', 'waterMerchant', 'seedMerchant', 'woodMerchant', 'soupMerchant', 'eggMerchant', 'milkMerchant'],
        actions: ['scavenge', 'talk'],
        timeCost: 1,
        staminaCost: 2
    },
    creek: {
        name: '溪流',
        description: '清澈的溪流，可以采集水资源。',
        unlockCondition: { type: 'item', item: 'paper', amount: 5 },
        resources: {
            treebark: { min: 1, max: 2, chance: 0.5 },
            fish: { min: 1, max: 2, chance: 0.4 },
            jellyfish: { min: 1, max: 1, chance: 0.2 },
            shrimp: { min: 1, max: 2, chance: 0.25 }
        },
        waterSources: { min: 2, max: 5, chance: 0.9 },
        npcs: ['elder'],
        actions: ['collect', 'water', 'hunt', 'talk'],
        timeCost: 2,
        staminaCost: 3
    },
    deathValley: {
        name: '死亡山谷',
        description: '荒凉的山谷，有珍贵的硝石资源。',
        unlockCondition: { type: 'item', item: 'paper', amount: 5 },
        resources: {
            treebark: { min: 1, max: 3, chance: 0.6 },
            nitre: { min: 1, max: 2, chance: 0.4 },
            iceDew: { min: 1, max: 1, chance: 0.3 },
            fireGrass: { min: 1, max: 1, chance: 0.3 }
        },
        npcs: ['powderMerchant'],
        actions: ['collect', 'talk'],
        timeCost: 3,
        staminaCost: 4
    },
    acidSwamp: {
        name: '酸沼泽',
        description: '散发着恶臭的沼泽，可以找到白骨。',
        unlockCondition: { type: 'item', item: 'paper', amount: 5 },
        resources: {
            bone: { min: 1, max: 3, chance: 0.7 },
            herb: { min: 1, max: 2, chance: 0.4 }
        },
        npcs: ['herbMaster'],
        actions: ['collect', 'talk'],
        timeCost: 3,
        staminaCost: 4
    },
    
    // 蜘蛛洞穴
    spiderCave: {
        name: '蜘蛛洞穴',
        description: '阴暗潮湿的洞穴，蛛网密布，隐约能听到嘶嘶声',
        staminaCost: 5,
        timeCost: 3,
        unlockCondition: { type: 'item', item: 'silk', amount: 3 },
        monsters: ['spider', 'spiderQueen'],
        monsterChance: 0.4,
        resources: {
            silk: { min: 1, max: 3, chance: 0.5 },
            spiderEgg: { min: 1, max: 2, chance: 0.3 },
            treebark: { min: 1, max: 2, chance: 0.4 },
            herb: { min: 1, max: 2, chance: 0.3 }
        },
        waterSources: false,
        npcs: ['spiderHunter'],
        actions: ['gather', 'hunt', 'scavenge', 'explore', 'talk']
    },

    ancientRuin: {
        name: '古老废墟',
        description: '古老的废墟，可以找到零件和铁块。',
        unlockCondition: { type: 'item', item: 'paper', amount: 5 },
        resources: {
            parts: { min: 1, max: 3, chance: 0.6 },
            iron: { min: 1, max: 2, chance: 0.5 },
            alcohol: { min: 1, max: 1, chance: 0.3 },
            ancientRelic: { min: 1, max: 1, chance: 0.1 },
            techBlueprint: { min: 1, max: 1, chance: 0.05 }
        },
        monsters: ['mechanicalSoldier', 'mysteriousStatue'],
        actions: ['collect', 'fight'],
        timeCost: 3,
        staminaCost: 5
    },
    mine: {
        name: '幽暗矿洞',
        description: '黑暗的矿洞，富含铁矿资源。',
        unlockCondition: { type: 'npc', npc: 'miner' },
        resources: {
            iron: { min: 2, max: 5, chance: 0.8 },
            stone: { min: 1, max: 3, chance: 0.6 },
            copper: { min: 1, max: 3, chance: 0.4 },
            silver: { min: 1, max: 2, chance: 0.2 }
        },
        npcs: ['mineWorker'],
        actions: ['mine', 'talk'],
        timeCost: 3,
        staminaCost: 5
    },
    banditDen: {
        name: '贼窝',
        description: '强盗的老巢，可以获得金币。',
        unlockCondition: { type: 'npc', npc: 'mayor' },
        resources: {
            gold: { min: 2, max: 5, chance: 0.7 }
        },
        monsters: ['bandit', 'banditLeader'],
        actions: ['fight', 'scavenge'],
        timeCost: 3,
        staminaCost: 5
    },
    quietForest: {
        name: '静谧森林',
        description: '安静的森林，有更强的野兽。',
        unlockCondition: { type: 'item', item: 'paper', amount: 8 },
        resources: {
            wood: { min: 2, max: 4, chance: 0.8 },
            berry: { min: 1, max: 3, chance: 0.6 },
            rawMeat: { min: 2, max: 4, chance: 0.5 }
        },
        monsters: ['bear', 'ghostWolf', 'vulture', 'creeper', 'bull', 'eagle'],
        npcs: ['wanderer'],
        actions: ['chop', 'gather', 'hunt', 'talk'],
        timeCost: 3,
        staminaCost: 4
    },
    cannibalTribe: {
        name: '食人族部落',
        description: '食人族的领地，危险但资源丰富。',
        unlockCondition: { type: 'faction', faction: 'cannibal' },
        resources: {
            gold: { min: 3, max: 6, chance: 0.7 }
        },
        monsters: ['ogre', 'ogreNinja', 'ogreChief'],
        npcs: ['cannibalQuartermaster'],
        actions: ['fight', 'collect', 'talk'],
        timeCost: 4,
        staminaCost: 6
    },
    mageGuild: {
        name: '魔法公会',
        description: '法师聚集的地方，充满魔法气息。',
        unlockCondition: { type: 'faction', faction: 'mage' },
        resources: {
            gold: { min: 3, max: 6, chance: 0.7 }
        },
        monsters: ['mageApprentice', 'shadowMage', 'darkSage'],
        npcs: ['mageMentor'],
        actions: ['fight', 'collect', 'talk'],
        timeCost: 4,
        staminaCost: 6
    },

    volcano: {
        name: '火山地带',
        description: '炽热的火山地区，岩浆流淌',
        unlockCondition: { type: 'item', item: 'iron', amount: 20 },
        resources: { iron: { min: 3, max: 6, chance: 0.7 }, stone: { min: 2, max: 5, chance: 0.6 }, fireGrass: { min: 1, max: 3, chance: 0.4 }, obsidian: { min: 1, max: 2, chance: 0.3 }, goldOre: { min: 1, max: 2, chance: 0.15 } },
        monsters: ['fireLizard', 'lavaGiant', 'volcanoDragon'],
        monsterChance: 0.4,
        npcs: [],
        actions: ['collect', 'fight', 'explore'],
        timeCost: 4,
        staminaCost: 6
    },
    oceanTemple: {
        name: '海底神殿',
        description: '沉没在海底的古代神殿',
        unlockCondition: { type: 'item', item: 'paper', amount: 15 },
        resources: { lightDust: { min: 1, max: 2, chance: 0.3 }, darkDust: { min: 1, max: 2, chance: 0.3 }, silk: { min: 2, max: 4, chance: 0.5 }, crystal: { min: 1, max: 2, chance: 0.25 }, ancientRelic: { min: 1, max: 1, chance: 0.1 } },
        monsters: ['deepSeaMermaid', 'seaSiren', 'seaDragon'],
        monsterChance: 0.4,
        npcs: [],
        actions: ['collect', 'fight', 'explore'],
        timeCost: 5,
        staminaCost: 7
    },
    skyIsland: {
        name: '天空岛屿',
        description: '漂浮在云端的神秘岛屿',
        unlockCondition: { type: 'item', item: 'lightDust', amount: 10 },
        resources: { lightDust: { min: 2, max: 4, chance: 0.5 }, darkDust: { min: 2, max: 4, chance: 0.5 }, dragonBone: { min: 1, max: 2, chance: 0.2 }, dragonScale: { min: 1, max: 2, chance: 0.2 }, moonstone: { min: 1, max: 2, chance: 0.15 }, sunstone: { min: 1, max: 2, chance: 0.15 }, crystal: { min: 1, max: 3, chance: 0.3 } },
        monsters: ['stormEagle', 'thunderSprite', 'skyGuardian'],
        monsterChance: 0.5,
        npcs: [],
        actions: ['collect', 'fight', 'explore'],
        timeCost: 6,
        staminaCost: 8
    },
    dungeon: {
        name: '地牢',
        description: '危险的地牢，可以获得魂和装备。',
        unlockCondition: { type: 'item', item: 'dungeonKey', amount: 1 },
        resources: {},
        monsters: ['dummy', 'skeleton', 'ghost', 'demon'],
        actions: ['explore'],
        timeCost: 5,
        staminaCost: 8,
        // 地牢楼层配置
        dungeonConfig: {
            maxFloor: 50,
            bossFloors: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
            floorMonsters: {
                1: ['dummy'],
                2: ['dummy', 'skeleton'],
                3: ['skeleton'],
                4: ['skeleton', 'ghost'],
                5: ['skeleton', 'ghost'],
                6: ['ghost'],
                7: ['ghost', 'demon'],
                8: ['demon'],
                9: ['demon'],
                10: ['demon'],
                11: ['demon', 'ghost'], 12: ['demon', 'ghost'], 13: ['demon'], 14: ['demon'],
                15: ['demon'], 16: ['demon', 'ghost'], 17: ['demon', 'ghost'], 18: ['demon'],
                19: ['demon'], 20: ['demon'], 21: ['demon', 'ghost'], 22: ['demon', 'ghost'],
                23: ['demon'], 24: ['demon'], 25: ['demon'], 26: ['demon', 'ghost'],
                27: ['demon', 'ghost'], 28: ['demon'], 29: ['demon'], 30: ['demon'],
                31: ['demon', 'ghost'], 32: ['demon', 'ghost'], 33: ['demon'], 34: ['demon'],
                35: ['demon'], 36: ['demon', 'ghost'], 37: ['demon', 'ghost'], 38: ['demon'],
                39: ['demon'], 40: ['demon'], 41: ['demon', 'ghost'], 42: ['demon', 'ghost'],
                43: ['demon'], 44: ['demon'], 45: ['demon'], 46: ['demon', 'ghost'],
                47: ['demon', 'ghost'], 48: ['demon'], 49: ['demon'], 50: ['demon']
            },
            bosses: {
                5: 'skeletonKing', 10: 'demonLord', 15: 'vampireLord', 20: 'lichKing',
                25: 'abyssWorm', 30: 'shadowDragon', 35: 'chaosElemental', 40: 'boneColossus',
                45: 'voidWraith', 50: 'worldEnder'
            },
            floorMultiplier: 0.15,
            soulMultiplier: 0.2
        }
    }
};
