// Items Data - 物品数据
// 所有物品定义集中在此文件

var ITEMS = {
    // 基础资源
    wood: {
        name: '木头',
        type: 'resource',
        description: '基础建造材料，也可用作燃料',
        stackable: true,
        maxStack: 99,
        icon: '🪵'
    },
    stone: {
        name: '石头',
        type: 'resource',
        description: '坚硬的建造材料',
        stackable: true,
        maxStack: 99,
        icon: '🪨'
    },
    iron: {
        name: '铁块',
        type: 'resource',
        description: '高级建造和制造材料',
        stackable: true,
        maxStack: 99,
        icon: '⚙️'
    },
    parts: {
        name: '零件',
        type: 'resource',
        description: '机械零件，用于高级制造',
        stackable: true,
        maxStack: 99,
        icon: '🔧'
    },
    gold: {
        name: '金币',
        type: 'currency',
        description: '用于交易的货币',
        stackable: true,
        maxStack: 999,
        icon: '💰'
    },

    // 食物材料
    berry: {
        name: '浆果',
        type: 'food',
        description: '酸甜的野果，可以充饥解渴',
        stackable: true,
        maxStack: 99,
        icon: '🫐',
        effect: { hunger: 5, thirst: 5, health: 3 }
    },
    rawMeat: {
        name: '生肉',
        type: 'food',
        description: '新鲜的生肉，需要烹饪后食用',
        stackable: true,
        maxStack: 99,
        icon: '🥩',
        effect: { hunger: 10 }
    },
    wheat: {
        name: '小麦',
        type: 'resource',
        description: '可以磨成面粉制作面包',
        stackable: true,
        maxStack: 99,
        icon: '🌾'
    },
    seed: {
        name: '种子',
        type: 'resource',
        description: '可以种植获得作物',
        stackable: true,
        maxStack: 99,
        icon: '🌱'
    },
    carrot: {
        name: '胡萝卜',
        type: 'food',
        description: '营养丰富的蔬菜',
        stackable: true,
        maxStack: 99,
        icon: '🥕',
        effect: { hunger: 8, health: 2 }
    },
    lettuce: {
        name: '生菜',
        type: 'food',
        description: '新鲜的生菜叶',
        stackable: true,
        maxStack: 99,
        icon: '🥬',
        effect: { hunger: 5, thirst: 3 }
    },
    herb: {
        name: '草药',
        type: 'resource',
        description: '可以用于制作药剂',
        stackable: true,
        maxStack: 99,
        icon: '🌿'
    },
    flower: {
        name: '花',
        type: 'resource',
        description: '美丽的花朵，可用于烹饪',
        stackable: true,
        maxStack: 99,
        icon: '🌸'
    },
    fireGrass: {
        name: '火草',
        type: 'resource',
        description: '发热的草药，可以升温',
        stackable: true,
        maxStack: 99,
        icon: '🔥'
    },
    iceDew: {
        name: '冰露',
        type: 'resource',
        description: '冰冷的露水，可以降温',
        stackable: true,
        maxStack: 99,
        icon: '❄️'
    },

    // 水资源
    water: {
        name: '水',
        type: 'food',
        description: '清洁的饮用水',
        stackable: true,
        maxStack: 99,
        icon: '💧',
        effect: { thirst: 30 }
    },

    // 烹饪产物
    bread: {
        name: '面包',
        type: 'food',
        description: '基础食物，可以充饥',
        stackable: true,
        maxStack: 99,
        icon: '🍞',
        effect: { hunger: 15 }
    },
    meatSoup: {
        name: '肉汤',
        type: 'food',
        description: '热乎乎的肉汤，可以充饥解渴',
        stackable: true,
        maxStack: 99,
        icon: '🍲',
        effect: { hunger: 15, thirst: 8 }
    },
    hamburger: {
        name: '汉堡',
        type: 'food',
        description: '美味的汉堡，很饱腹',
        stackable: true,
        maxStack: 99,
        icon: '🍔',
        effect: { hunger: 40 }
    },
    juice: {
        name: '果汁',
        type: 'food',
        description: '清爽的果汁，可以解渴降温',
        stackable: true,
        maxStack: 99,
        icon: '🧃',
        effect: { thirst: 12, temperature: -5 }
    },
    flowerTea: {
        name: '花茶',
        type: 'food',
        description: '芳香的花茶，可以恢复体力和精神',
        stackable: true,
        maxStack: 99,
        icon: '🍵',
        effect: { thirst: 10, stamina: 10, sanity: 3 }
    },
    coffee: {
        name: '咖啡',
        type: 'food',
        description: '提神的咖啡，可以恢复体力',
        stackable: true,
        maxStack: 99,
        icon: '☕',
        effect: { thirst: 10, stamina: 10, sanity: 2 }
    },
    jelly: {
        name: '凉粉',
        type: 'food',
        description: '清凉的凉粉',
        stackable: true,
        maxStack: 99,
        icon: '🍮',
        effect: { thirst: 15, health: 8, sanity: 2 }
    },
    strongRum: {
        name: '极列朗姆',
        type: 'food',
        description: '烈性酒，可以大幅恢复精神',
        stackable: true,
        maxStack: 99,
        icon: '🥃',
        effect: { sanity: 40, thirst: 5, temperature: 8 }
    },
    iceWater: {
        name: '冰水',
        type: 'food',
        description: '冰凉的水，可以大幅降温',
        stackable: true,
        maxStack: 99,
        icon: '🧊',
        effect: { thirst: 10, temperature: -15 }
    },
    fireWater: {
        name: '火水',
        type: 'food',
        description: '发热的水，可以升温',
        stackable: true,
        maxStack: 99,
        icon: '🌶️',
        effect: { thirst: 10, temperature: 15 }
    },
    fishSoup: {
        name: '鱼汤',
        type: 'food',
        description: '鲜美的鱼汤',
        stackable: true,
        maxStack: 99,
        icon: '🐟',
        effect: { hunger: 15, thirst: 10, stamina: 10 }
    },
    vegSoup: {
        name: '菜汤',
        type: 'food',
        description: '营养的蔬菜汤',
        stackable: true,
        maxStack: 99,
        icon: '🥗',
        effect: { hunger: 10, thirst: 8, health: 5 }
    },
    salad: {
        name: '色拉',
        type: 'food',
        description: '新鲜的蔬菜色拉',
        stackable: true,
        maxStack: 99,
        icon: '🥗',
        effect: { hunger: 4, thirst: 4, health: 2 }
    },
    steamedEgg: {
        name: '蒸蛋',
        type: 'food',
        description: '嫩滑的蒸蛋',
        stackable: true,
        maxStack: 99,
        icon: '🥚',
        effect: { hunger: 30, stamina: 5 }
    },
    hotSoup: {
        name: '热汤',
        type: 'food',
        description: '热乎乎的汤，可以保暖',
        stackable: true,
        maxStack: 99,
        icon: '🍜',
        effect: { thirst: 10, temperature: 10 }
    },
    hotCoffee: {
        name: '热咖啡',
        type: 'food',
        description: '热乎乎的咖啡',
        stackable: true,
        maxStack: 99,
        icon: '☕',
        effect: { thirst: 10, stamina: 12, sanity: 4, temperature: 10 }
    },
    hotFlowerTea: {
        name: '热花茶',
        type: 'food',
        description: '热乎乎的花茶',
        stackable: true,
        maxStack: 99,
        icon: '🍵',
        effect: { thirst: 10, stamina: 10, sanity: 10, temperature: 10 }
    },
    roastFish: {
        name: '烤鱼',
        type: 'food',
        description: '香喷喷的烤鱼',
        stackable: true,
        maxStack: 99,
        icon: '🐟',
        effect: { hunger: 15, stamina: 10 }
    },
    roastWings: {
        name: '烤翅',
        type: 'food',
        description: '美味的烤鸡翅',
        stackable: true,
        maxStack: 99,
        icon: '🍗',
        effect: { hunger: 12 }
    },
    carbonBread: {
        name: '碳烤面包',
        type: 'food',
        description: '烤过的面包，更香',
        stackable: true,
        maxStack: 99,
        icon: '🍞',
        effect: { hunger: 22 }
    },
    bigMeal: {
        name: '大餐',
        type: 'food',
        description: '丰盛的大餐',
        stackable: true,
        maxStack: 99,
        icon: '🍽️',
        effect: { hunger: 30 }
    },
    megaBurger: {
        name: '巨无霸',
        type: 'food',
        description: '超大的汉堡，非常饱腹',
        stackable: true,
        maxStack: 99,
        icon: '🍔',
        effect: { hunger: 55 }
    },
    sandwich: {
        name: '三文治',
        type: 'food',
        description: '美味的三文治',
        stackable: true,
        maxStack: 99,
        icon: '🥪',
        effect: { hunger: 25, health: 4 }
    },
    fishSheep: {
        name: '鱼羊鲜',
        type: 'food',
        description: '鱼和羊的美味组合',
        stackable: true,
        maxStack: 99,
        icon: '🍲',
        effect: { hunger: 30, stamina: 10 }
    },
    meatball: {
        name: '肉丸',
        type: 'food',
        description: '弹牙的肉丸',
        stackable: true,
        maxStack: 99,
        icon: '🧆',
        effect: { hunger: 25, sanity: 2 }
    },
    familyBucket: {
        name: '全家桶',
        type: 'food',
        description: '丰盛的全家桶',
        stackable: true,
        maxStack: 99,
        icon: '🍗',
        effect: { hunger: 35 }
    },
    jamSalad: {
        name: '果酱色拉',
        type: 'food',
        description: '甜美的果酱色拉',
        stackable: true,
        maxStack: 99,
        icon: '🥗',
        effect: { hunger: 10, thirst: 5, health: 5 }
    },
    jamToast: {
        name: '果干吐司',
        type: 'food',
        description: '涂了果酱的吐司',
        stackable: true,
        maxStack: 99,
        icon: '🍞',
        effect: { hunger: 20, health: 3 }
    },
    lettuceSalad: {
        name: '生菜沙拉',
        type: 'food',
        description: '清爽的生菜沙拉',
        stackable: true,
        maxStack: 99,
        icon: '🥗',
        effect: { hunger: 8, thirst: 5, health: 3 }
    },
    cocktail: {
        name: '鸡尾酒',
        type: 'food',
        description: '调制的鸡尾酒',
        stackable: true,
        maxStack: 99,
        icon: '🍹',
        effect: { sanity: 20, thirst: 10 }
    },
    fruitJuice: {
        name: '果蔬汁',
        type: 'food',
        description: '混合果蔬汁',
        stackable: true,
        maxStack: 99,
        icon: '🥤',
        effect: { thirst: 15, health: 5, temperature: -3 }
    },
    spiceBread: {
        name: '香料面包',
        type: 'food',
        description: '加了香料的面包',
        stackable: true,
        maxStack: 99,
        icon: '🍞',
        effect: { hunger: 25, sanity: 5 }
    },
    flowerCake: {
        name: '花饼',
        type: 'food',
        description: '用花制作的饼',
        stackable: true,
        maxStack: 99,
        icon: '🌸',
        effect: { hunger: 15, sanity: 10 }
    },
    fishBread: {
        name: '麦香鱼',
        type: 'food',
        description: '面包夹鱼',
        stackable: true,
        maxStack: 99,
        icon: '🐟',
        effect: { hunger: 20, stamina: 5 }
    },
    hazelnutToast: {
        name: '榛仁吐司',
        type: 'food',
        description: '加了榛仁的吐司',
        stackable: true,
        maxStack: 99,
        icon: '🍞',
        effect: { hunger: 18, stamina: 8 }
    },
    fruitWine: {
        name: '果酒',
        type: 'food',
        description: '自酿的果酒',
        stackable: true,
        maxStack: 99,
        icon: '🍷',
        effect: { sanity: 25, thirst: 5, temperature: 5 }
    },
    beer: {
        name: '啤酒',
        type: 'food',
        description: '清爽的啤酒',
        stackable: true,
        maxStack: 99,
        icon: '🍺',
        effect: { sanity: 15, thirst: 10 }
    },
    iceWine: {
        name: '冰镇酒',
        type: 'food',
        description: '冰镇过的酒',
        stackable: true,
        maxStack: 99,
        icon: '🍷',
        effect: { sanity: 20, thirst: 8, temperature: -10 }
    },
    warmWine: {
        name: '温酒',
        type: 'food',
        description: '温热的酒',
        stackable: true,
        maxStack: 99,
        icon: '🍷',
        effect: { sanity: 20, thirst: 5, temperature: 10 }
    },
    seafoodSoup: {
        name: '海鲜汤',
        type: 'food',
        description: '鲜美的海鲜汤',
        stackable: true,
        maxStack: 99,
        icon: '🦐',
        effect: { hunger: 20, thirst: 15, stamina: 10 }
    },
    fishSlice: {
        name: '生鱼切片',
        type: 'food',
        description: '切成薄片的生鱼',
        stackable: true,
        maxStack: 99,
        icon: '🍣',
        effect: { hunger: 12, stamina: 5 }
    },
    fishBall: {
        name: '鱼丸',
        type: 'food',
        description: '弹牙的鱼丸',
        stackable: true,
        maxStack: 99,
        icon: '🧆',
        effect: { hunger: 15, sanity: 3 }
    },
    jellyfishSkin: {
        name: '海蜇皮',
        type: 'food',
        description: '爽口的海蜇皮',
        stackable: true,
        maxStack: 99,
        icon: '🪼',
        effect: { hunger: 8, thirst: 5 }
    },
    hornBread: {
        name: '牛角面包',
        type: 'food',
        description: '形似牛角的面包',
        stackable: true,
        maxStack: 99,
        icon: '🥐',
        effect: { hunger: 22, stamina: 5 }
    },
    boneMeat: {
        name: '骨肉相连',
        type: 'food',
        description: '骨头和肉的组合',
        stackable: true,
        maxStack: 99,
        icon: '🍖',
        effect: { hunger: 20, health: 5 }
    },
    humanMeat: {
        name: '煮人肉',
        type: 'food',
        description: '禁忌的食物',
        stackable: true,
        maxStack: 99,
        icon: '🥩',
        effect: { hunger: 50, sanity: -30 }
    },

    // 特殊食物
    magicBread: {
        name: '魔法面包',
        type: 'food',
        description: '充满魔力的面包',
        stackable: true,
        maxStack: 99,
        icon: '✨',
        effect: { hunger: 20, sanity: 30 }
    },
    dragonBoneSoup: {
        name: '龙骨汤',
        type: 'food',
        description: '用龙骨熬制的汤',
        stackable: true,
        maxStack: 99,
        icon: '🐲',
        effect: { hunger: 15, thirst: 15 }
    },
    dragonScaleSoup: {
        name: '龙鳞汤',
        type: 'food',
        description: '用龙鳞熬制的汤，营养丰富',
        stackable: true,
        maxStack: 99,
        icon: '🐲',
        effect: { hunger: 20, thirst: 20, stamina: 20, health: 20 }
    },

    // 狩猎掉落
    feather: {
        name: '羽毛',
        type: 'resource',
        description: '轻盈的羽毛',
        stackable: true,
        maxStack: 99,
        icon: '🪶'
    },
    wing: {
        name: '翅膀',
        type: 'resource',
        description: '鸟的翅膀',
        stackable: true,
        maxStack: 99,
        icon: '🍗'
    },
    fur: {
        name: '毛皮',
        type: 'resource',
        description: '动物的毛皮',
        stackable: true,
        maxStack: 99,
        icon: '🧶'
    },
    claw: {
        name: '尖牙',
        type: 'resource',
        description: '猛兽的尖牙',
        stackable: true,
        maxStack: 99,
        icon: '🦷'
    },
    horn: {
        name: '牛角',
        type: 'resource',
        description: '野牛的角',
        stackable: true,
        maxStack: 99,
        icon: '🐂'
    },
    gallbladder: {
        name: '胆汁',
        type: 'resource',
        description: '熊的胆汁，可入药',
        stackable: true,
        maxStack: 99,
        icon: '💊'
    },
    silk: {
        name: '丝线',
        type: 'resource',
        description: '蜘蛛的丝线',
        stackable: true,
        maxStack: 99,
        icon: '🕸️'
    },
    spiderEgg: {
        name: '蛛卵',
        type: 'resource',
        description: '蜘蛛的卵',
        stackable: true,
        maxStack: 99,
        icon: '🥚'
    },
    vine: {
        name: '藤蔓',
        type: 'resource',
        description: '植物的藤蔓',
        stackable: true,
        maxStack: 99,
        icon: '🌿'
    },
    eagleEye: {
        name: '鹰眼',
        type: 'resource',
        description: '老鹰的眼睛',
        stackable: true,
        maxStack: 99,
        icon: '👁️'
    },

    // 特殊掉落
    soul: {
        name: '灵魂',
        type: 'resource',
        description: '机械士兵的灵魂',
        stackable: true,
        maxStack: 99,
        icon: '👻'
    },
    darkDust: {
        name: '暗尘',
        type: 'resource',
        description: '影子法师留下的暗尘',
        stackable: true,
        maxStack: 99,
        icon: '🌑'
    },
    lightDust: {
        name: '光尘',
        type: 'resource',
        description: '闪耀的光尘',
        stackable: true,
        maxStack: 99,
        icon: '✨'
    },
    corpse: {
        name: '尸体',
        type: 'resource',
        description: '敌人的尸体',
        stackable: true,
        maxStack: 99,
        icon: '💀'
    },
    bone: {
        name: '白骨',
        type: 'resource',
        description: '骨头，可以制作武器',
        stackable: true,
        maxStack: 99,
        icon: '🦴'
    },
    paper: {
        name: '纸张',
        type: 'resource',
        description: '用于研究和解锁地图',
        stackable: true,
        maxStack: 99,
        icon: '📄'
    },
    alcohol: {
        name: '酒精',
        type: 'resource',
        description: '用于制作药剂和酒类',
        stackable: true,
        maxStack: 99,
        icon: '🍶'
    },
    treebark: {
        name: '树皮',
        type: 'resource',
        description: '树的外皮',
        stackable: true,
        maxStack: 99,
        icon: '🌳'
    },
    nitre: {
        name: '硝石',
        type: 'resource',
        description: '可以制作火药',
        stackable: true,
        maxStack: 99,
        icon: '💎'
    },
    fish: {
        name: '生鱼',
        type: 'food',
        description: '新鲜的鱼',
        stackable: true,
        maxStack: 99,
        icon: '🐟',
        effect: { hunger: 8 }
    },
    jellyfish: {
        name: '水母',
        type: 'resource',
        description: '海里的水母',
        stackable: true,
        maxStack: 99,
        icon: '🪼'
    },
    dragonBone: {
        name: '龙骨',
        type: 'resource',
        description: '龙的骨头',
        stackable: true,
        maxStack: 99,
        icon: '🐲'
    },
    dragonScale: {
        name: '龙鳞',
        type: 'resource',
        description: '龙的鳞片',
        stackable: true,
        maxStack: 99,
        icon: '🐲'
    },

    // 武器
    woodStick: {
        name: '木棍',
        type: 'weapon',
        description: '基础的木棍武器',
        stackable: false,
        icon: '🪵',
        attack: 2
    },
    boneClub: {
        name: '骨棒',
        type: 'weapon',
        description: '用骨头制作的武器',
        stackable: false,
        icon: '🦴',
        attack: 5
    },
    gearHammer: {
        name: '齿轮战锤',
        type: 'weapon',
        description: '强力的齿轮武器',
        stackable: false,
        icon: '⚔️',
        attack: 15
    },
    axe: {
        name: '斧头',
        type: 'weapon',
        description: '食人魔掉落的斧头',
        stackable: false,
        icon: '🪓',
        attack: 10
    },
    giantHammer: {
        name: '巨型战锤',
        type: 'weapon',
        description: '食人魔掉落的巨型战锤',
        stackable: false,
        icon: '🔨',
        attack: 20
    },
    magicStaff: {
        name: '法杖',
        type: 'weapon',
        description: '法师的法杖',
        stackable: false,
        icon: '🪄',
        attack: 5,
        magicDamage: 10
    },
    dagger: {
        name: '匕首',
        type: 'weapon',
        description: '锋利的匕首',
        stackable: false,
        icon: '🗡️',
        attack: 3
    },

    // 防具
    dragonArmor: {
        name: '龙甲',
        type: 'armor',
        description: '用龙鳞制作的铠甲',
        stackable: false,
        icon: '🛡️',
        defense: 20
    },
    blueHood: {
        name: '蓝雾兜帽',
        type: 'armor',
        description: '食人魔族长掉落的兜帽',
        stackable: false,
        icon: '🧢',
        defense: 5,
        magicDamage: 20,
        special: '30% freeze attacker'
    },
    lightHood: {
        name: '流光兜帽',
        type: 'armor',
        description: '黑衣贤者掉落的兜帽',
        stackable: false,
        icon: '🧢',
        defense: 3,
        magicDamage: 50
    },
    ninjaBoots: {
        name: '忍者足具',
        type: 'armor',
        description: '忍者掉落的鞋子',
        stackable: false,
        icon: '👟',
        defense: 2,
        special: 'agility bonus'
    },

    // 特殊物品
    dungeonKey: {
        name: '地牢钥匙',
        type: 'key',
        description: '用于进入地牢',
        stackable: true,
        maxStack: 10,
        icon: '🔑'
    },
    returnScroll: {
        name: '回城卷轴',
        type: 'consumable',
        description: '从地牢返回基地',
        stackable: true,
        maxStack: 10,
        icon: '📜'
    },
    mysteriousPot: {
        name: '神秘壶',
        type: 'special',
        description: '强盗头目掉落的神秘物品',
        stackable: false,
        icon: '🏺'
    },
    ironStatue: {
        name: '铁像',
        type: 'special',
        description: '神秘雕像掉落的铁像',
        stackable: false,
        icon: '🗿'
    },
    spiderQueenHead: {
        name: '蛛后之首',
        type: 'special',
        description: '蛛魔之后的头颅',
        stackable: false,
        icon: '👑'
    },
    ogreEar: {
        name: '食人魔耳朵',
        type: 'special',
        description: '食人魔的耳朵',
        stackable: true,
        maxStack: 99,
        icon: '👂'
    },
    mageHead: {
        name: '法师首级',
        type: 'special',
        description: '法师的头颅',
        stackable: true,
        maxStack: 99,
        icon: '💀'
    },

    // 新增食材
    mushroom: {
        name: '蘑菇',
        type: 'food',
        description: '新鲜的蘑菇，可以充饥',
        stackable: true,
        maxStack: 99,
        icon: '🍄',
        effect: { hunger: 8, health: 3 }
    },
    egg: {
        name: '鸡蛋',
        type: 'food',
        description: '新鲜的鸡蛋，营养丰富',
        stackable: true,
        maxStack: 99,
        icon: '🥚',
        effect: { hunger: 10, stamina: 5 }
    },
    milk: {
        name: '牛奶',
        type: 'food',
        description: '新鲜的牛奶，可以解渴',
        stackable: true,
        maxStack: 99,
        icon: '🥛',
        effect: { thirst: 15, health: 5, stamina: 5 }
    },
    cheese: {
        name: '奶酪',
        type: 'food',
        description: '发酵的奶酪，很饱腹',
        stackable: true,
        maxStack: 99,
        icon: '🧀',
        effect: { hunger: 25, stamina: 10 }
    },
    butter: {
        name: '黄油',
        type: 'food',
        description: '制作高级食物的材料',
        stackable: true,
        maxStack: 99,
        icon: '🧈',
        effect: { hunger: 5 }
    },

    // 新增食材
    shrimp: {
        name: '虾',
        type: 'food',
        description: '新鲜的虾，营养丰富',
        stackable: true,
        maxStack: 99,
        icon: '🦐',
        effect: { hunger: 12, stamina: 8 }
    },

    // 新增烹饪产物
    mushroomSoup: {
        name: '蘑菇汤',
        type: 'food',
        description: '鲜美的蘑菇汤',
        stackable: true,
        maxStack: 99,
        icon: '🍲',
        effect: { hunger: 15, thirst: 10, health: 5 }
    },
    roastMushroom: {
        name: '烤蘑菇',
        type: 'food',
        description: '香喷喷的烤蘑菇',
        stackable: true,
        maxStack: 99,
        icon: '🍄',
        effect: { hunger: 12, stamina: 5 }
    },
    mushroomStew: {
        name: '蘑菇炖肉',
        type: 'food',
        description: '营养丰富的蘑菇炖肉',
        stackable: true,
        maxStack: 99,
        icon: '🍲',
        effect: { hunger: 25, health: 8, stamina: 10 }
    },
    friedEgg: {
        name: '煎蛋',
        type: 'food',
        description: '金黄的煎蛋',
        stackable: true,
        maxStack: 99,
        icon: '🍳',
        effect: { hunger: 12, stamina: 8 }
    },
    eggSoup: {
        name: '蛋花汤',
        type: 'food',
        description: '清淡的蛋花汤',
        stackable: true,
        maxStack: 99,
        icon: '🍲',
        effect: { hunger: 10, thirst: 12, health: 3 }
    },
    eggSandwich: {
        name: '鸡蛋三明治',
        type: 'food',
        description: '美味的鸡蛋三明治',
        stackable: true,
        maxStack: 99,
        icon: '🥪',
        effect: { hunger: 20, stamina: 10 }
    },
    milkTea: {
        name: '奶茶',
        type: 'food',
        description: '香浓的奶茶',
        stackable: true,
        maxStack: 99,
        icon: '🍵',
        effect: { thirst: 15, sanity: 8, temperature: 5 }
    },
    hotMilk: {
        name: '热牛奶',
        type: 'food',
        description: '温暖的热牛奶',
        stackable: true,
        maxStack: 99,
        icon: '🥛',
        effect: { thirst: 12, health: 5, temperature: 8 }
    },
    steak: {
        name: '牛排',
        type: 'food',
        description: '美味的牛排',
        stackable: true,
        maxStack: 99,
        icon: '🥩',
        effect: { hunger: 40, stamina: 15 }
    },
    mushroomPizza: {
        name: '蘑菇披萨',
        type: 'food',
        description: '香喷喷的蘑菇披萨',
        stackable: true,
        maxStack: 99,
        icon: '🍕',
        effect: { hunger: 35, sanity: 10 }
    },
    cheeseBurger: {
        name: '芝士汉堡',
        type: 'food',
        description: '浓郁的芝士汉堡',
        stackable: true,
        maxStack: 99,
        icon: '🍔',
        effect: { hunger: 50, stamina: 15 }
    },
    seafoodFeast: {
        name: '海鲜大餐',
        type: 'food',
        description: '丰盛的海鲜大餐',
        stackable: true,
        maxStack: 99,
        icon: '🦐',
        effect: { hunger: 45, thirst: 20, stamina: 20 }
    },
    royalBanquet: {
        name: '皇家宴会',
        type: 'food',
        description: '奢华的皇家宴会',
        stackable: true,
        maxStack: 99,
        icon: '👑',
        effect: { hunger: 80, thirst: 30, stamina: 30, health: 20, sanity: 20 }
    },

    // 药剂
    healthPotion: {
        name: '生命药剂',
        type: 'potion',
        description: '恢复生命值',
        stackable: true,
        maxStack: 20,
        icon: '❤️',
        effect: { health: 30 }
    },
    staminaPotion: {
        name: '体力药剂',
        type: 'potion',
        description: '恢复体力值',
        stackable: true,
        maxStack: 20,
        icon: '💙',
        effect: { stamina: 30 }
    },
    sanityPotion: {
        name: '精神药剂',
        type: 'potion',
        description: '恢复精神值',
        stackable: true,
        maxStack: 20,
        icon: '💜',
        effect: { sanity: 30 }
    },
    coolPotion: {
        name: '降温药剂',
        type: 'potion',
        description: '降低体温',
        stackable: true,
        maxStack: 20,
        icon: '❄️',
        effect: { temperature: -10 }
    },

    // 新增防具
    barkArmor: { name: '树皮甲', type: 'armor', description: '用树皮和草药编织的简易护甲', stackable: false, icon: '🛡️', defense: 2, special: '' },
    boneArmor: { name: '骨甲', type: 'armor', description: '用骨头和丝绸制成的护甲', stackable: false, icon: '🦴', defense: 5, special: '' },
    ironArmor: { name: '铁甲', type: 'armor', description: '坚固的铁制护甲', stackable: false, icon: '🛡️', defense: 8, special: '' },
    elfCloak: { name: '精灵斗篷', type: 'armor', description: '用丝绸和光尘制成的魔法斗篷', stackable: false, icon: '🧝', defense: 10, special: 'magic_resist' },
    dragonScaleArmor: { name: '龙鳞甲', type: 'armor', description: '用龙鳞打造的传说级护甲', stackable: false, icon: '🐲', defense: 15, special: 'fire_resist' },

    // 新增武器
    stoneAxe: { name: '石斧', type: 'weapon', description: '用石头和木头制成的斧头', stackable: false, icon: '🪓', attack: 6 },
    ironSword: { name: '铁剑', type: 'weapon', description: '锋利的铁制长剑', stackable: false, icon: '⚔️', attack: 12 },
    enchantedStaff: { name: '附魔杖', type: 'weapon', description: '经过附魔的法杖', stackable: false, icon: '🪄', attack: 18, magicDamage: 10 },
    dragonBoneSword: { name: '龙骨剑', type: 'weapon', description: '用龙骨打造的传说级武器', stackable: false, icon: '🗡️', attack: 25, magicDamage: 5 },
    flameSword: { name: '火焰剑', type: 'weapon', description: '燃烧的烈焰之剑', stackable: false, icon: '🔥', attack: 22, magicDamage: 8 },
    frostStaff: { name: '寒冰杖', type: 'weapon', description: '散发寒气的法杖', stackable: false, icon: '❄️', attack: 15, magicDamage: 15 },
    thunderHammer: { name: '雷神锤', type: 'weapon', description: '雷电缠绕的战锤', stackable: false, icon: '⚡', attack: 28, magicDamage: 5 },
    shadowDagger: { name: '暗影匕首', type: 'weapon', description: '暗影中的致命一击', stackable: false, icon: '🗡️', attack: 20, magicDamage: 10 },
    holyLance: { name: '圣光枪', type: 'weapon', description: '神圣光芒的长枪', stackable: false, icon: '🌟', attack: 25, magicDamage: 12 },
    flameArmor: { name: '火焰铠甲', type: 'armor', description: '火焰铸造的铠甲', stackable: false, icon: '🛡️', defense: 12, special: 'burn_resist' },
    frostArmor: { name: '寒冰护甲', type: 'armor', description: '寒冰凝结的护甲', stackable: false, icon: '❄️', defense: 11, special: 'freeze_resist' },
    thunderCloak: { name: '雷电斗篷', type: 'armor', description: '雷电编织的斗篷', stackable: false, icon: '⚡', defense: 10, special: 'agility bonus' },
    shadowCloak: { name: '暗影披风', type: 'armor', description: '融入暗影的披风', stackable: false, icon: '🌑', defense: 9, special: 'stealth' },
    holyShield: { name: '圣光盾', type: 'armor', description: '神圣光芒的盾牌', stackable: false, icon: '🛡️', defense: 14, special: 'holy_ward' },
    strengthRing: { name: '力量戒指', type: 'accessory', description: '提升攻击力的戒指', stackable: false, icon: '💍', effect: { attack: 5 } },
    agilityNecklace: { name: '敏捷项链', type: 'accessory', description: '提升命中率的项链', stackable: false, icon: '📿', effect: { hitRate: 10 } },
    wisdomCrown: { name: '智慧头冠', type: 'accessory', description: '提升魔法伤害的头冠', stackable: false, icon: '👑', effect: { magicDamage: 10 } },
    lifeAmulet: { name: '生命护符', type: 'accessory', description: '提升最大生命的护符', stackable: false, icon: '❤️', effect: { maxHealth: 30 } },
    manaGem: { name: '魔力宝石', type: 'accessory', description: '蕴含魔力的宝石', stackable: false, icon: '💎', effect: { magicDamage: 8, sanity: 10 } },
    smokeBomb: { name: '烟雾弹', type: 'consumable', description: '投掷后100%逃跑成功', stackable: true, maxStack: 10, icon: '💨' },
    poisonVial: { name: '毒药瓶', type: 'consumable', description: '涂抹武器附加中毒效果', stackable: true, maxStack: 10, icon: '☠️' },
    holyWater: { name: '圣水', type: 'consumable', description: '驱散所有负面状态', stackable: true, maxStack: 10, icon: '💧' },
    ragePotion: { name: '狂暴药剂', type: 'potion', description: '攻击力+50%持续3回合', stackable: true, maxStack: 5, icon: '💪', effect: { attack: 25 } },
    invisPotion: { name: '隐身药剂', type: 'potion', description: '饮用后跳过一次战斗', stackable: true, maxStack: 5, icon: '👻' },
    fireEssence: { name: '火焰精华', type: 'resource', description: '火元素凝聚的精华', stackable: true, maxStack: 99, icon: '🔥' },
    iceEssence: { name: '寒冰精华', type: 'resource', description: '冰元素凝聚的精华', stackable: true, maxStack: 99, icon: '❄️' },
    thunderEssence: { name: '雷电精华', type: 'resource', description: '雷元素凝聚的精华', stackable: true, maxStack: 99, icon: '⚡' },
    shadowEssence: { name: '暗影精华', type: 'resource', description: '暗元素凝聚的精华', stackable: true, maxStack: 99, icon: '🌑' },
    holyEssence: { name: '圣光精华', type: 'resource', description: '光元素凝聚的精华', stackable: true, maxStack: 99, icon: '🌟' },
    // === 新增资源 - 矿物类 ===
    copper: { name: '铜矿', type: 'resource', description: '常见的铜矿石', stackable: true, maxStack: 99, icon: '🟤' },
    silver: { name: '银矿', type: 'resource', description: '稀有的银矿石', stackable: true, maxStack: 99, icon: '⚪' },
    goldOre: { name: '金矿', type: 'resource', description: '珍贵的金矿石', stackable: true, maxStack: 99, icon: '🟡' },
    crystal: { name: '水晶', type: 'resource', description: '蕴含魔力的水晶', stackable: true, maxStack: 99, icon: '💎' },
    obsidian: { name: '黑曜石', type: 'resource', description: '坚硬的火山玻璃', stackable: true, maxStack: 99, icon: '⬛' },
    moonstone: { name: '月光石', type: 'resource', description: '在月光下闪耀的宝石', stackable: true, maxStack: 99, icon: '🌙' },
    sunstone: { name: '太阳石', type: 'resource', description: '蕴含阳光能量的宝石', stackable: true, maxStack: 99, icon: '☀️' },
    
    // === 新增资源 - 精炼材料 ===
    copperIngot: { name: '铜锭', type: 'resource', description: '精炼后的铜锭', stackable: true, maxStack: 99, icon: '🟫' },
    silverIngot: { name: '银锭', type: 'resource', description: '精炼后的银锭', stackable: true, maxStack: 99, icon: '⬜' },
    goldIngot: { name: '金锭', type: 'resource', description: '精炼后的金锭', stackable: true, maxStack: 99, icon: '🟨' },
    steelIngot: { name: '钢锭', type: 'resource', description: '铁和碳的合金', stackable: true, maxStack: 99, icon: '⬛' },
    enchantedIron: { name: '附魔铁', type: 'resource', description: '被魔力浸润的铁', stackable: true, maxStack: 99, icon: '✨' },
    
    // === 新增资源 - 温度相关 ===
    warmingStone: { name: '温暖石', type: 'resource', description: '持续散发热量的石头', stackable: true, maxStack: 20, icon: '🔥' },
    coolingCrystal: { name: '寒冰水晶', type: 'resource', description: '散发寒气的水晶', stackable: true, maxStack: 20, icon: '❄️' },
    thermalCloth: { name: '恒温布', type: 'resource', description: '能调节温度的特殊布料', stackable: true, maxStack: 20, icon: '🧵' },
    
    // === 新增科技物品 ===
    techBlueprint: { name: '科技蓝图', type: 'resource', description: '记录着先进技术的图纸', stackable: true, maxStack: 10, icon: '📜' },
    magicScroll: { name: '魔法卷轴', type: 'resource', description: '蕴含魔法知识的卷轴', stackable: true, maxStack: 10, icon: '📜' },
    ancientRelic: { name: '古代遗物', type: 'resource', description: '来自远古文明的遗物', stackable: true, maxStack: 10, icon: '🏺' },
    researchNotes: { name: '研究笔记', type: 'resource', description: '记录着研究发现的笔记', stackable: true, maxStack: 50, icon: '📝' },
    
    // === 新增消耗品 - 温度管理 ===
    heatPack: { name: '暖手宝', type: 'consumable', description: '使用后体温+5', stackable: true, maxStack: 20, icon: '🔥', effect: { temperature: 5 } },
    coolPack: { name: '冰袋', type: 'consumable', description: '使用后体温-5', stackable: true, maxStack: 20, icon: '❄️', effect: { temperature: -5 } },
    thermalPotion: { name: '恒温药剂', type: 'potion', description: '30分钟内体温保持正常', stackable: true, maxStack: 10, icon: '🌡️' },
    
    // === 新增装备 - 温度抗性 ===
    furCoat: { name: '毛皮大衣', type: 'armor', description: '提供优秀的抗寒能力', stackable: false, icon: '🧥', defense: 3, special: 'cold_resist' },
    desertRobe: { name: '沙漠长袍', type: 'armor', description: '提供优秀的耐热能力', stackable: false, icon: '👘', defense: 2, special: 'heat_resist' },
    thermalArmor: { name: '恒温铠甲', type: 'armor', description: '自动调节温度的高级铠甲', stackable: false, icon: '🛡️', defense: 10, special: 'thermal_regulate' },
    
    // === 新增武器 - 元素增强 ===
    copperSword: { name: '铜剑', type: 'weapon', description: '基础的铜制武器', stackable: false, icon: '⚔️', attack: 8 },
    silverSword: { name: '银剑', type: 'weapon', description: '对魔物有额外伤害', stackable: false, icon: '⚔️', attack: 15, magicDamage: 5 },
    goldSword: { name: '金剑', type: 'weapon', description: '华丽而强大的武器', stackable: false, icon: '⚔️', attack: 20, magicDamage: 8 },
    steelSword: { name: '钢剑', type: 'weapon', description: '坚固耐用的钢制武器', stackable: false, icon: '⚔️', attack: 18 },
    enchantedSword: { name: '附魔剑', type: 'weapon', description: '被魔法强化的剑', stackable: false, icon: '⚔️', attack: 25, magicDamage: 12 },
    crystalStaff: { name: '水晶法杖', type: 'weapon', description: '增幅魔法的法杖', stackable: false, icon: '🪄', attack: 12, magicDamage: 20 },
    obsidianAxe: { name: '黑曜石斧', type: 'weapon', description: '极其锋利的黑曜石武器', stackable: false, icon: '🪓', attack: 30 }

};

// 建筑数据
var BUILDINGS = {
    bed: {
        name: '床',
        description: '睡觉恢复状态',
        materials: { wood: 5 }
    },
    chest: {
        name: '箱子',
        description: '背包容量 +5',
        materials: { wood: 3 },
        effect: { maxInventory: 5 }
    },
    bigChest: {
        name: '大箱子',
        description: '背包容量 +10',
        materials: { wood: 8 },
        effect: { maxInventory: 10 }
    },
    workbench: {
        name: '工桌',
        description: '基础制造',
        materials: { wood: 5 }
    },
    alchemyTable: {
        name: '炼金桌',
        description: '制作药剂',
        materials: { wood: 5, iron: 3 }
    },
    scienceTable: {
        name: '科研桌',
        description: '研究解锁',
        materials: { wood: 5, parts: 3 }
    },
    cooker: {
        name: '炊具',
        description: '制作食物',
        materials: { stone: 2, wood: 2 }
    },
    well: {
        name: '水井',
        description: '每天自动获得 2 水',
        materials: { stone: 8, iron: 3 },
        passive: { water: 2 }
    },
    field: {
        name: '田地',
        description: '每天自动获得 1 小麦',
        materials: { wood: 5 },
        passive: { wheat: 1 }
    },
    firePit: {
        name: '火坑',
        description: '冬季体温不会过低',
        materials: { stone: 5 },
        effect: { winterWarmth: true }
    },
    trap: {
        name: '陷阱',
        description: '每天自动获得 1 生肉',
        materials: { wood: 3 },
        passive: { rawMeat: 1 }
    },
    // 新增建筑
    greenhouse: {
        name: '温室',
        description: '冬季也能种植作物',
        materials: { wood: 10, iron: 5, parts: 3 },
        effect: { winterFarming: true }
    },
    watchtower: {
        name: '瞭望塔',
        description: '提前发现危险，减少怪物袭击',
        materials: { wood: 15, stone: 10, iron: 5 },
        effect: { monsterWarning: true }
    },
    workshop: {
        name: '高级工坊',
        description: '解锁高级制作配方',
        materials: { wood: 10, iron: 8, parts: 5 },
        effect: { advancedCrafting: true }
    },
    brewery: {
        name: '酿酒坊',
        description: '解锁酒类制作配方',
        materials: { wood: 8, stone: 5, iron: 3 },
        effect: { brewing: true }
    },
    herbGarden: {
        name: '草药园',
        description: '每天自动获得 1 草药',
        materials: { wood: 5, stone: 3, herb: 5 },
        passive: { herb: 1 }
    },
    mushroomFarm: {
        name: '蘑菇农场',
        description: '每天自动获得 1 蘑菇',
        materials: { wood: 5, stone: 3, seed: 5 },
        passive: { mushroom: 1 }
    },
    chickenCoop: {
        name: '鸡舍',
        description: '每天自动获得 1 鸡蛋',
        materials: { wood: 8, seed: 10 },
        passive: { egg: 1 }
    },
    cowPen: {
        name: '牛棚',
        description: '每天自动获得 1 牛奶',
        materials: { wood: 10, stone: 5, wheat: 10 },
        passive: { milk: 1 }
    },
    library: {
        name: '图书馆',
        description: '研究速度提升',
        materials: { wood: 10, paper: 20, iron: 5 },
        effect: { researchSpeed: 2 }
    },
    enchantTable: {
        name: '附魔台',
        description: '为装备附魔',
        materials: { wood: 5, iron: 5, parts: 5, lightDust: 3, darkDust: 3 },
        effect: { enchanting: true }
    },
    stable: {
        name: '马厩',
        description: '解锁马车，快速旅行',
        materials: { wood: 15, iron: 8, parts: 5 },
        effect: { fastTravel: true }
    },
    fortress: {
        name: '要塞',
        description: '大幅减少怪物伤害',
        materials: { stone: 20, iron: 15, parts: 10 },
        effect: { defenseBonus: 10 }
    },

    // === 阵营专属装备 ===
    cannibalAxe: {
        name: '食人族战斧',
        description: '食人族的传家武器，沾满了鲜血。',
        type: 'weapon',
        icon: '🪓',
        attack: 25,
        magicDamage: 0,
        faction: 'cannibal',
        stackable: false
    },
    cannibalArmor: {
        name: '食人族骨甲',
        description: '用敌人的骨头制成的铠甲。',
        type: 'armor',
        icon: '🦴',
        defense: 15,
        faction: 'cannibal',
        stackable: false
    },
    mageStaff: {
        name: '法师法杖',
        description: '蕴含强大魔力的法杖。',
        type: 'weapon',
        icon: '🪄',
        attack: 10,
        magicDamage: 25,
        faction: 'mage',
        stackable: false
    },
    mageRobe: {
        name: '法师长袍',
        description: '附魔的法师长袍，提升魔法抗性。',
        type: 'armor',
        icon: '👘',
        defense: 10,
        magicDefense: 20,
        faction: 'mage',
        stackable: false
    }
};
