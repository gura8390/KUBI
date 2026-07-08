// Monsters Data - 怪物数据

var MONSTERS = {
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
        boss: true,
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
        boss: true,
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
        boss: true,
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
        boss: true,
        name: '骷髅王',
        health: 200,
        attack: 25,
        defense: 15,
        drops: ['soul', 'bone', 'dagger', 'iron'],
        dropChance: 1.0
    },
    demonLord: {
        boss: true,
        name: '魔王',
        health: 400,
        attack: 40,
        defense: 25,
        drops: ['soul', 'dragonBone', 'dragonScale'],
        dropChance: 1.0

    },
    vampireLord: { name: '吸血鬼领主', health: 500, attack: 35, defense: 15, drops: ['darkDust', 'soul'], dropChance: 0.6, description: '地牢15层守关者',
        boss: true,
        abilities: 'bleed,poison' },
    lichKing: { name: '巫妖王', health: 600, attack: 40, defense: 18, drops: ['lightDust', 'darkDust', 'soul'], dropChance: 0.6, description: '地牢20层守关者',
        boss: true,
        abilities: 'freeze,burn' },
    abyssWorm: { name: '深渊巨虫', health: 700, attack: 45, defense: 20, drops: ['dragonBone', 'soul'], dropChance: 0.5, description: '地牢25层守关者',
        boss: true,
        abilities: 'poison,stun' },
    shadowDragon: { name: '暗影龙', health: 800, attack: 50, defense: 22, drops: ['dragonScale', 'dragonBone', 'soul'], dropChance: 0.5, description: '地牢30层守关者',
        boss: true,
        abilities: 'burn,freeze' },
    chaosElemental: { name: '混沌元素', health: 900, attack: 55, defense: 25, drops: ['lightDust', 'darkDust', 'parts'], dropChance: 0.6, description: '地牢35层守关者',
        boss: true,
        abilities: 'burn,freeze,poison' },
    boneColossus: { name: '白骨巨像', health: 1000, attack: 60, defense: 28, drops: ['bone', 'dragonBone', 'soul'], dropChance: 0.6, description: '地牢40层守关者',
        boss: true,
        abilities: 'stun,bleed' },
    voidWraith: { name: '虚空亡灵', health: 1100, attack: 65, defense: 30, drops: ['darkDust', 'soul', 'lightDust'], dropChance: 0.6, description: '地牢45层守关者',
        boss: true,
        abilities: 'freeze,poison' },
    worldEnder: { name: '灭世者', health: 1500, attack: 80, defense: 35, drops: ['dragonScale', 'dragonBone', 'lightDust', 'darkDust'], dropChance: 0.8, description: '地牢50层最终Boss',
        lore: '传说中的灭世者，拥有毁灭世界的力量。只有最勇敢的冒险者才能挑战它。',
        boss: true,
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
