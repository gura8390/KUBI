// Recipes Data - 配方数据

// 烹饪配方
var COOKING_RECIPES = {
    // 食材系+食材系
    jelly: { result: 'jelly', ingredients: { water: 1, herb: 1 }, name: '凉粉' },
    strongRum: { result: 'strongRum', ingredients: { water: 1, alcohol: 1 }, name: '极列朗姆' },
    flowerTea: { result: 'flowerTea', ingredients: { water: 1, flower: 1 }, name: '花茶' },
    iceWater: { result: 'iceWater', ingredients: { water: 1, iceDew: 1 }, name: '冰水' },
    vegSoup: { result: 'vegSoup', ingredients: { water: 1, carrot: 1 }, name: '菜汤' },
    vegSoup2: { result: 'vegSoup', ingredients: { water: 1, lettuce: 1 }, name: '菜汤' },
    coffee: { result: 'coffee', ingredients: { water: 1, seed: 1 }, name: '咖啡' },
    juice: { result: 'juice', ingredients: { water: 1, berry: 1 }, name: '果汁' },
    bread: { result: 'bread', ingredients: { water: 1, wheat: 1 }, name: '面包' },
    beer: { result: 'beer', ingredients: { water: 2, wheat: 1 }, name: '啤酒' },
    meatSoup: { result: 'meatSoup', ingredients: { water: 1, rawMeat: 1 }, name: '肉汤' },
    steamedEgg: { result: 'steamedEgg', ingredients: { water: 1, spiderEgg: 1 }, name: '蒸蛋' },
    fireWater: { result: 'fireWater', ingredients: { water: 1, fireGrass: 1 }, name: '火水' },
    fishSoup: { result: 'fishSoup', ingredients: { water: 1, fish: 1 }, name: '鱼汤' },

    // 新增配方 - 蘑菇系
    mushroomSoup: { result: 'mushroomSoup', ingredients: { water: 1, mushroom: 2 }, name: '蘑菇汤' },
    roastMushroom: { result: 'roastMushroom', ingredients: { wood: 1, mushroom: 2 }, name: '烤蘑菇' },
    mushroomStew: { result: 'mushroomStew', ingredients: { mushroom: 2, rawMeat: 1 }, name: '蘑菇炖肉' },

    // 新增配方 - 蛋系
    friedEgg: { result: 'friedEgg', ingredients: { wood: 1, egg: 1 }, name: '煎蛋' },
    eggSoup: { result: 'eggSoup', ingredients: { water: 1, egg: 1 }, name: '蛋花汤' },
    eggSandwich: { result: 'eggSandwich', ingredients: { bread: 1, egg: 1 }, name: '鸡蛋三明治' },

    // 新增配方 - 奶系
    cheese: { result: 'cheese', ingredients: { milk: 2 }, name: '奶酪' },
    butter: { result: 'butter', ingredients: { milk: 1 }, name: '黄油' },
    milkTea: { result: 'milkTea', ingredients: { milk: 1, flower: 1 }, name: '奶茶' },
    hotMilk: { result: 'hotMilk', ingredients: { wood: 1, milk: 1 }, name: '热牛奶' },

    // 新增配方 - 高级料理
    steak: { result: 'steak', ingredients: { rawMeat: 2, butter: 1 }, name: '牛排' },
    mushroomPizza: { result: 'mushroomPizza', ingredients: { bread: 1, mushroom: 2, cheese: 1 }, name: '蘑菇披萨' },
    cheeseBurger: { result: 'cheeseBurger', ingredients: { hamburger: 1, cheese: 1 }, name: '芝士汉堡' },
    seafoodFeast: { result: 'seafoodFeast', ingredients: { fish: 2, jellyfish: 1, shrimp: 1 }, name: '海鲜大餐' },
    royalBanquet: { result: 'royalBanquet', ingredients: { megaBurger: 1, seafoodFeast: 1, fruitWine: 1 }, name: '皇家宴会' },

    // 种子系
    salad: { result: 'salad', ingredients: { seed: 1, lettuce: 1 }, name: '色拉' },
    salad2: { result: 'salad', ingredients: { seed: 1, flower: 1 }, name: '色拉' },
    jamSalad: { result: 'jamSalad', ingredients: { seed: 1, berry: 1 }, name: '果酱色拉' },
    hazelnutToast: { result: 'hazelnutToast', ingredients: { seed: 1, bread: 1 }, name: '榛仁吐司' },

    // 浆果系
    jamSalad2: { result: 'jamSalad', ingredients: { berry: 1, wheat: 1 }, name: '果酱色拉' },
    jamSalad3: { result: 'jamSalad', ingredients: { berry: 1, flower: 1 }, name: '果酱色拉' },
    jamSalad4: { result: 'jamSalad', ingredients: { berry: 1, iceDew: 1 }, name: '果酱色拉' },
    jamSalad5: { result: 'jamSalad', ingredients: { berry: 1, salad: 1 }, name: '果酱色拉' },
    lettuceSalad: { result: 'lettuceSalad', ingredients: { berry: 1, lettuce: 1 }, name: '生菜沙拉' },
    jamToast: { result: 'jamToast', ingredients: { berry: 1, bread: 1 }, name: '果干吐司' },
    cocktail: { result: 'cocktail', ingredients: { berry: 1, alcohol: 1 }, name: '鸡尾酒' },
    fruitJuice: { result: 'fruitJuice', ingredients: { berry: 1, carrot: 1 }, name: '果蔬汁' },

    // 生肉系
    bigMeal: { result: 'bigMeal', ingredients: { rawMeat: 1, lettuce: 1 }, name: '大餐' },
    bigMeal2: { result: 'bigMeal', ingredients: { rawMeat: 1, carrot: 1 }, name: '大餐' },
    hamburger: { result: 'hamburger', ingredients: { rawMeat: 1, bread: 1 }, name: '汉堡' },
    megaBurger: { result: 'megaBurger', ingredients: { rawMeat: 1, hamburger: 1 }, name: '巨无霸' },
    fishSheep: { result: 'fishSheep', ingredients: { rawMeat: 1, fish: 1 }, name: '鱼羊鲜' },
    meatball: { result: 'meatball', ingredients: { rawMeat: 1, wood: 1 }, name: '肉丸' },
    familyBucket: { result: 'familyBucket', ingredients: { rawMeat: 1, wing: 1 }, name: '全家桶' },

    // 胡萝卜系
    lettuceSalad2: { result: 'lettuceSalad', ingredients: { carrot: 1, lettuce: 1 }, name: '生菜沙拉' },

    // 面包系
    sandwich: { result: 'sandwich', ingredients: { bread: 1, lettuce: 1 }, name: '三文治' },
    spiceBread: { result: 'spiceBread', ingredients: { bread: 1, jamSalad: 1 }, name: '香料面包' },
    flowerCake: { result: 'flowerCake', ingredients: { bread: 1, flower: 1 }, name: '花饼' },
    fishBread: { result: 'fishBread', ingredients: { bread: 1, fish: 1 }, name: '麦香鱼' },

    // 果酱色拉系
    fruitWine: { result: 'fruitWine', ingredients: { jamSalad: 1, alcohol: 1 }, name: '果酒' },

    // 冰露系
    iceWine: { result: 'iceWine', ingredients: { iceDew: 1, fruitWine: 1 }, name: '冰镇酒' },
    iceWine2: { result: 'iceWine', ingredients: { iceDew: 1, beer: 1 }, name: '冰镇酒' },
    iceWine3: { result: 'iceWine', ingredients: { iceDew: 1, strongRum: 1 }, name: '冰镇酒' },

    // 生鱼系
    seafoodSoup: { result: 'seafoodSoup', ingredients: { fish: 1, jellyfish: 1 }, name: '海鲜汤' },

    // 混合系
    carbonBread: { result: 'carbonBread', ingredients: { wood: 1, bread: 1 }, name: '碳烤面包' },
    hotSoup: { result: 'hotSoup', ingredients: { wood: 1, water: 1 }, name: '热汤' },
    roastWings: { result: 'roastWings', ingredients: { wood: 1, wing: 1 }, name: '烤翅' },
    warmWine: { result: 'warmWine', ingredients: { wood: 1, fruitWine: 1 }, name: '温酒' },
    hotCoffee: { result: 'hotCoffee', ingredients: { wood: 1, coffee: 1 }, name: '热咖啡' },
    roastFish: { result: 'roastFish', ingredients: { wood: 1, fish: 1 }, name: '烤鱼' },
    hotFlowerTea: { result: 'hotFlowerTea', ingredients: { wood: 1, flowerTea: 1 }, name: '热花茶' },

    // 特殊配方
    fishSlice: { result: 'fishSlice', ingredients: { fish: 1, dagger: 1 }, name: '生鱼切片' },
    fishBall: { result: 'fishBall', ingredients: { fish: 1, wood: 1 }, name: '鱼丸' },
    jellyfishSkin: { result: 'jellyfishSkin', ingredients: { jellyfish: 1, dagger: 1 }, name: '海蜇皮' },
    magicBread: { result: 'magicBread', ingredients: { bread: 1, lightDust: 1 }, name: '魔法面包' },
    hornBread: { result: 'hornBread', ingredients: { bread: 1, horn: 1 }, name: '牛角面包' },
    boneMeat: { result: 'boneMeat', ingredients: { rawMeat: 1, bone: 1 }, name: '骨肉相连' },
    dragonBoneSoup: { result: 'dragonBoneSoup', ingredients: { dragonBone: 1, water: 1 }, name: '龙骨汤' },
    humanMeat: { result: 'humanMeat', ingredients: { corpse: 1, anything: 1 }, name: '煮人肉' },
    dragonScaleSoup: { result: 'dragonScaleSoup', ingredients: { dragonScale: 1, anything: 1 }, name: '龙鳞汤' }
};

// 制作配方
var CRAFTING_RECIPES = {
    // 基础手工配方（无站点要求）
    paper: { result: 'paper', ingredients: { water: 1, treebark: 1 }, name: '纸张' },
    boneClub: { result: 'boneClub', ingredients: { bone: 3 }, name: '骨棒' },
    trap: { result: 'trap', ingredients: { wood: 3 }, name: '陷阱' },

    // 工桌配方
    gearHammer: { result: 'gearHammer', ingredients: { parts: 1, iron: 1 }, station: 'workbench', name: '齿轮战锤' },
    dungeonKey: { result: 'dungeonKey', ingredients: { iron: 1, parts: 1 }, station: 'workbench', name: '地牢钥匙' },

    // 炼金桌配方
    healthPotion: { result: 'healthPotion', ingredients: { berry: 1, nitre: 1 }, station: 'alchemyTable', name: '生命药剂' },
    staminaPotion: { result: 'staminaPotion', ingredients: { berry: 1, treebark: 1 }, station: 'alchemyTable', name: '体力药剂' },
    sanityPotion: { result: 'sanityPotion', ingredients: { berry: 1, bone: 1 }, station: 'alchemyTable', name: '精神药剂' },
    coolPotion: { result: 'coolPotion', ingredients: { iceDew: 1, herb: 1 }, station: 'alchemyTable', name: '降温药剂' },

    // 科研桌配方
    returnScroll: { result: 'returnScroll', ingredients: { paper: 1, soul: 1 }, station: 'scienceTable', name: '回城卷轴' }
};
