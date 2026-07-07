// 地图数据文件 - 从 map.js 分离，职责：纯数据定义

// 地图数据
const MAPS = {
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
            floorMultiplier: function(floor) {
                return 1 + (floor - 1) * 0.15;
            },
            soulMultiplier: function(floor) {
                return 1 + (floor - 1) * 0.2;
            }
        }
    }
};

// 怪物数据
const MONSTERS = {
    vineWhipper: {
        name: '藤鞭怪',
        health: 20,
        attack: 5,
        defense: 2,
        drops: ['vine', 'rawMeat', 'berry', 'seed'],
        dropChance: 0.7
    },
    sparrow: {
        name: '麻雀',
        health: 10,
        attack: 3,
        defense: 1,
        drops: ['feather', 'wing', 'rawMeat', 'seed'],
        dropChance: 0.6
    },
    crow: {
        name: '乌鸦',
        health: 15,
        attack: 4,
        defense: 1,
        drops: ['feather', 'wing', 'rawMeat'],
        dropChance: 0.6
    },
    rabbit: {
        name: '兔子',
        health: 10,
        attack: 2,
        defense: 1,
        drops: ['fur', 'rawMeat'],
        dropChance: 0.8
    },
    eagle: {
        name: '老鹰',
        health: 30,
        attack: 8,
        defense: 3,
        drops: ['eagleEye', 'feather', 'wing', 'rawMeat'],
        dropChance: 0.7
    },
    bull: {
        name: '野牛',
        health: 50,
        attack: 12,
        defense: 5,
        drops: ['horn', 'rawMeat'],
        dropChance: 0.8
    },
    bear: {
        name: '灰熊',
        health: 60,
        attack: 15,
        defense: 8,
        drops: ['gallbladder', 'fur', 'rawMeat'],
        dropChance: 0.7
    },
    vulture: {
        name: '秃鹫',
        health: 25,
        attack: 7,
        defense: 3,
        drops: ['feather', 'wing', 'rawMeat'],
        dropChance: 0.6
    },
    creeper: {
        name: '匍匐怪',
        health: 35,
        attack: 10,
        defense: 4,
        drops: ['claw', 'water', 'rawMeat'],
        dropChance: 0.7
    },
    ghostWolf: {
        name: '鬼狼',
        health: 40,
        attack: 12,
        defense: 5,
        drops: ['claw', 'fur', 'rawMeat'],
        dropChance: 0.7
    },
    spider: {
        name: '蛛魔',
        health: 30,
        attack: 8,
        defense: 3,
        drops: ['silk', 'spiderEgg'],
        dropChance: 0.7
    },
    spiderQueen: {
        name: '蛛魔之后',
        health: 80,
        attack: 15,
        defense: 8,
        drops: ['spiderQueenHead', 'silk', 'spiderEgg', 'rawMeat'],
        dropChance: 0.9
    },
    mechanicalSoldier: {
        name: '机械士兵',
        health: 50,
        attack: 12,
        defense: 10,
        drops: ['soul', 'parts', 'gold', 'iron'],
        dropChance: 0.8
    },
    mysteriousStatue: {
        name: '神秘雕像',
        health: 60,
        attack: 10,
        defense: 15,
        drops: ['ironStatue', 'parts', 'iron', 'lightDust'],
        dropChance: 0.8
    },
    bandit: {
        name: '强盗',
        health: 40,
        attack: 10,
        defense: 5,
        drops: ['corpse', 'gold'],
        dropChance: 0.8
    },
    banditLeader: {
        name: '强盗头目',
        health: 80,
        attack: 18,
        defense: 10,
        drops: ['mysteriousPot', 'corpse', 'gold'],
        dropChance: 0.9
    },
    ogre: {
        name: '食人魔',
        health: 100,
        attack: 20,
        defense: 12,
        drops: ['ogreEar', 'gold', 'axe', 'giantHammer'],
        dropChance: 0.8
    },
    ogreNinja: {
        name: '食人魔忍者',
        health: 80,
        attack: 25,
        defense: 8,
        drops: ['ninjaBoots'],
        dropChance: 0.5
    },
    ogreChief: {
        name: '食人魔族长',
        health: 150,
        attack: 30,
        defense: 15,
        drops: ['blueHood'],
        dropChance: 0.3
    },
    mageApprentice: {
        name: '法师学徒',
        health: 60,
        attack: 15,
        defense: 5,
        drops: ['mageHead', 'magicStaff', 'gold'],
        dropChance: 0.7
    },
    shadowMage: {
        name: '影子法师',
        health: 80,
        attack: 20,
        defense: 8,
        drops: ['darkDust', 'mageHead', 'gold'],
        dropChance: 0.7
    },
    darkSage: {
        name: '黑衣贤者',
        health: 120,
        attack: 25,
        defense: 12,
        drops: ['lightHood'],
        dropChance: 0.3
    },
    dummy: {
        name: '木偶',
        health: 30,
        attack: 8,
        defense: 3,
        drops: ['soul'],
        dropChance: 0.8
    },
    skeleton: {
        name: '骷髅',
        health: 50,
        attack: 12,
        defense: 5,
        drops: ['soul', 'bone', 'dagger'],
        dropChance: 0.8
    },
    ghost: {
        name: '幽灵',
        health: 70,
        attack: 15,
        defense: 8,
        drops: ['soul', 'sanityPotion'],
        dropChance: 0.7
    },
    demon: {
        name: '恶魔',
        health: 100,
        attack: 20,
        defense: 12,
        drops: ['soul'],
        dropChance: 0.9
    },
    skeletonKing: {
        name: '骷髅王',
        health: 200,
        attack: 25,
        defense: 15,
        drops: ['soul', 'bone', 'dagger', 'iron'],
        dropChance: 1.0
    },
    demonLord: {
        name: '魔王',
        health: 400,
        attack: 40,
        defense: 25,
        drops: ['soul', 'dragonBone', 'dragonScale'],
        dropChance: 1.0

    },
    vampireLord: { name: '吸血鬼领主', health: 500, attack: 35, defense: 15, drops: ['darkDust', 'soul'], dropChance: 0.6, description: '地牢15层守关者',
        abilities: 'bleed,poison' },
    lichKing: { name: '巫妖王', health: 600, attack: 40, defense: 18, drops: ['lightDust', 'darkDust', 'soul'], dropChance: 0.6, description: '地牢20层守关者',
        abilities: 'freeze,burn' },
    abyssWorm: { name: '深渊巨虫', health: 700, attack: 45, defense: 20, drops: ['dragonBone', 'soul'], dropChance: 0.5, description: '地牢25层守关者',
        abilities: 'poison,stun' },
    shadowDragon: { name: '暗影龙', health: 800, attack: 50, defense: 22, drops: ['dragonScale', 'dragonBone', 'soul'], dropChance: 0.5, description: '地牢30层守关者',
        abilities: 'burn,freeze' },
    chaosElemental: { name: '混沌元素', health: 900, attack: 55, defense: 25, drops: ['lightDust', 'darkDust', 'parts'], dropChance: 0.6, description: '地牢35层守关者',
        abilities: 'burn,freeze,poison' },
    boneColossus: { name: '白骨巨像', health: 1000, attack: 60, defense: 28, drops: ['bone', 'dragonBone', 'soul'], dropChance: 0.6, description: '地牢40层守关者',
        abilities: 'stun,bleed' },
    voidWraith: { name: '虚空亡灵', health: 1100, attack: 65, defense: 30, drops: ['darkDust', 'soul', 'lightDust'], dropChance: 0.6, description: '地牢45层守关者',
        abilities: 'freeze,poison' },
    worldEnder: { name: '灭世者', health: 1500, attack: 80, defense: 35, drops: ['dragonScale', 'dragonBone', 'lightDust', 'darkDust'], dropChance: 0.8, description: '地牢50层最终Boss',
        abilities: 'burn,freeze,poison,stun' },
    fireLizard: { name: '火焰蜥蜴', health: 80, attack: 20, defense: 8, drops: ['fireGrass', 'iron'], dropChance: 0.5, description: '栖息在火山的蜥蜴', abilities: 'burn' },
    lavaGiant: { name: '熔岩巨人', health: 150, attack: 30, defense: 15, drops: ['iron', 'stone'], dropChance: 0.6, description: '由熔岩构成的巨人', abilities: 'burn,stun' },
    volcanoDragon: { name: '火山龙', health: 250, attack: 40, defense: 20, drops: ['dragonScale', 'fireGrass'], dropChance: 0.4, description: '守护火山的龙', abilities: 'burn,bleed' },
    deepSeaMermaid: { name: '深海鱼人', health: 100, attack: 22, defense: 10, drops: ['silk', 'lightDust'], dropChance: 0.5, description: '深海的鱼人战士', abilities: 'poison' },
    seaSiren: { name: '海妖', health: 120, attack: 25, defense: 12, drops: ['darkDust', 'silk'], dropChance: 0.5, description: '迷惑水手的海妖', abilities: 'freeze,poison' },
    seaDragon: { name: '海龙', health: 300, attack: 45, defense: 22, drops: ['dragonScale', 'lightDust'], dropChance: 0.4, description: '统治海洋的龙', abilities: 'freeze,poison,stun' },
    stormEagle: { name: '风暴鹰', health: 90, attack: 28, defense: 8, drops: ['feather', 'lightDust'], dropChance: 0.5, description: '驾驭风暴的巨鹰', abilities: 'stun' },
    thunderSprite: { name: '雷电精灵', health: 110, attack: 32, defense: 10, drops: ['lightDust', 'darkDust'], dropChance: 0.5, description: '由雷电构成的精灵', abilities: 'burn,stun' },
    skyGuardian: { name: '天空守护者', health: 400, attack: 50, defense: 25, drops: ['dragonBone', 'lightDust', 'darkDust'], dropChance: 0.5, description: '守护天空岛屿的传说生物', abilities: 'burn,freeze,stun' },
    timeMessenger: { name: '时间使者', health: 200, attack: 35, defense: 18, drops: ['lightDust', 'darkDust'], dropChance: 0.6, description: '操控时间的神秘存在', abilities: 'freeze,stun' },
    voidWalker: { name: '虚空行者', health: 180, attack: 38, defense: 15, drops: ['darkDust', 'soul'], dropChance: 0.5, description: '来自虚空的行者', abilities: 'poison,bleed' },
    chaosLord: { name: '混沌领主', health: 500, attack: 55, defense: 28, drops: ['dragonBone', 'dragonScale', 'lightDust', 'darkDust'], dropChance: 0.6, description: '混沌之力的化身', abilities: 'burn,freeze,poison,stun,bleed' },
};

// 注册到命名空间
if (typeof KBA !== 'undefined') {
    KBA.registerData('MAPS', MAPS);
    KBA.registerData('MONSTERS', MONSTERS);
}
