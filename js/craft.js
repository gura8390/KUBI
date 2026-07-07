// 制作系统文件

// 烹饪配方
const COOKING_RECIPES = {
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
const CRAFTING_RECIPES = {
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

// 制作系统
const craftSystem = {
    // 初始化制作系统
    init: function() {
    },

    // 烹饪
    cook: function(recipeId) {
        const recipe = COOKING_RECIPES[recipeId];
        if (!recipe) {
            showMessage('无效的配方！', 'error');
            return false;
        }

        // 检查材料
        let hasAnything = false;
        for (const [itemId, amount] of Object.entries(recipe.ingredients)) {
            if (itemId === 'anything') {
                hasAnything = true;
                continue;
            }
            if (!hasItem(itemId, amount)) {
                showMessage(`材料不足！需要${getItemName(itemId)}×${amount}`, 'error');
                return false;
            }
        }

        // 如果配方需要"任意物品"，检查玩家是否有至少一个其他物品
        if (hasAnything) {
            const otherItems = player.inventory.filter(slot => {
                return !recipe.ingredients[slot.id] || slot.id === 'anything';
            });
            if (otherItems.length === 0) {
                showMessage('材料不足！需要一个任意物品', 'error');
                return false;
            }
        }

        // 消耗材料
        for (const [itemId, amount] of Object.entries(recipe.ingredients)) {
            if (itemId === 'anything') continue;
            removeItemFromInventory(itemId, amount);
        }

        // 消耗一个任意物品
        if (hasAnything && player.inventory.length > 0) {
            const randomIndex = Math.floor(Math.random() * player.inventory.length);
            const removed = player.inventory.splice(randomIndex, 1)[0];
            showMessage(`消耗了${getItemName(removed.id)}`, 'info');
        }

        // 添加结果物品
        if (addItemToInventory(recipe.result, 1)) {
            if (typeof soundSystem !== 'undefined' && soundSystem.enabled) soundSystem.play('craft');
            showMessage(`制作了${recipe.name}`, 'success');
            updateUI();
            return true;
        }

        return false;
    },

    // 制作
    craft: function(recipeId) {
        const recipe = CRAFTING_RECIPES[recipeId];
        if (!recipe) {
            showMessage('无效的配方！', 'error');
            return false;
        }

        // 检查是否需要工作台
        if (recipe.station && !hasBuilding(recipe.station)) {
            showMessage(`需要先建造${getBuildingName(recipe.station)}！`, 'error');
            return false;
        }

        // 检查材料
        for (const [itemId, amount] of Object.entries(recipe.ingredients)) {
            if (!hasItem(itemId, amount)) {
                showMessage(`材料不足！需要${getItemName(itemId)}×${amount}`, 'error');
                return false;
            }
        }

        // 消耗材料
        for (const [itemId, amount] of Object.entries(recipe.ingredients)) {
            removeItemFromInventory(itemId, amount);
        }

        // 添加结果物品
        if (addItemToInventory(recipe.result, 1)) {
            if (typeof soundSystem !== 'undefined' && soundSystem.enabled) soundSystem.play('craft');
            showMessage(`制作了${recipe.name}`, 'success');
            updateUI();
            return true;
        }

        return false;
    },

    // 显示烹饪菜单
    showCookingMenu: function() {
        if (!hasBuilding('cooker')) {
            showMessage('你需要先建造炊具！', 'error');
            return;
        }

        let content = '<div class="recipe-list">';
        content += '<h4>可用配方</h4>';

        Object.entries(COOKING_RECIPES).forEach(([recipeId, recipe]) => {
            const canCraft = this.canCook(recipeId);
            const ingredientText = Object.entries(recipe.ingredients)
                .map(([itemId, amount]) => `${getItemName(itemId)}×${amount}`)
                .join(' + ');

            content += `
                <div class="recipe-item ${canCraft ? '' : 'disabled'}">
                    <div class="recipe-info">
                        <span class="recipe-name">${recipe.name}</span>
                        <span class="recipe-ingredients">${ingredientText}</span>
                    </div>
                    ${canCraft ? `<button class="recipe-btn" onclick="craftSystem.cook('${recipeId}'); craftSystem.showCookingMenu();">制作</button>` : ''}
                </div>
            `;
        });

        content += '</div>';

        showModal('烹饪', content, [
            { text: '关闭', action: 'hideModal();' }
        ]);
    },

    // 显示制作菜单
    showCraftingMenu: function() {
        let content = '<div class="recipe-list">';

        // 基础手工配方（无站点要求）
        const basicRecipes = Object.entries(CRAFTING_RECIPES).filter(([id, r]) => !r.station);
        if (basicRecipes.length > 0) {
            content += '<h4>基础手工</h4>';
            basicRecipes.forEach(([recipeId, recipe]) => {
                const canCraft = this.canCraft(recipeId);
                const ingredientText = Object.entries(recipe.ingredients)
                    .map(([itemId, amount]) => `${getItemName(itemId)}×${amount}`)
                    .join(' + ');

                content += `
                    <div class="recipe-item ${canCraft ? '' : 'disabled'}">
                        <div class="recipe-info">
                            <span class="recipe-name">${recipe.name}</span>
                            <span class="recipe-ingredients">${ingredientText}</span>
                        </div>
                        ${canCraft ? `<button class="recipe-btn" onclick="craftSystem.craft('${recipeId}'); craftSystem.showCraftingMenu();">制作</button>` : ''}
                    </div>
                `;
            });
        }

        // 工桌配方
        const workbenchRecipes = Object.entries(CRAFTING_RECIPES).filter(([id, r]) => r.station === 'workbench');
        if (workbenchRecipes.length > 0) {
            content += '<h4>工桌配方' + (hasBuilding('workbench') ? '' : ' (需要建造工桌)') + '</h4>';
            workbenchRecipes.forEach(([recipeId, recipe]) => {
                const canCraft = this.canCraft(recipeId);
                const ingredientText = Object.entries(recipe.ingredients)
                    .map(([itemId, amount]) => `${getItemName(itemId)}×${amount}`)
                    .join(' + ');

                content += `
                    <div class="recipe-item ${canCraft ? '' : 'disabled'}">
                        <div class="recipe-info">
                            <span class="recipe-name">${recipe.name}</span>
                            <span class="recipe-ingredients">${ingredientText}</span>
                        </div>
                        ${canCraft ? `<button class="recipe-btn" onclick="craftSystem.craft('${recipeId}'); craftSystem.showCraftingMenu();">制作</button>` : ''}
                    </div>
                `;
            });
        }

        content += '</div>';

        showModal('制造', content, [
            { text: '关闭', action: 'hideModal();' }
        ]);
    },

    // 显示炼金菜单
    showAlchemyMenu: function() {
        if (!hasBuilding('alchemyTable')) {
            showMessage('你需要先建造炼金桌！', 'error');
            return;
        }

        let content = '<div class="recipe-list">';
        content += '<h4>炼金配方</h4>';

        Object.entries(CRAFTING_RECIPES).forEach(([recipeId, recipe]) => {
            if (recipe.station !== 'alchemyTable') return;

            const canCraft = this.canCraft(recipeId);
            const ingredientText = Object.entries(recipe.ingredients)
                .map(([itemId, amount]) => `${getItemName(itemId)}×${amount}`)
                .join(' + ');

            content += `
                <div class="recipe-item ${canCraft ? '' : 'disabled'}">
                    <div class="recipe-info">
                        <span class="recipe-name">${recipe.name}</span>
                        <span class="recipe-ingredients">${ingredientText}</span>
                    </div>
                    ${canCraft ? `<button class="recipe-btn" onclick="craftSystem.craft('${recipeId}'); craftSystem.showAlchemyMenu();">制作</button>` : ''}
                </div>
            `;
        });

        content += '</div>';

        showModal('炼金', content, [
            { text: '关闭', action: 'hideModal();' }
        ]);
    },

    // 显示科研菜单
    showScienceMenu: function() {
        if (!hasBuilding('scienceTable')) {
            showMessage('你需要先建造科研桌！', 'error');
            return;
        }

        let content = '<div class="recipe-list">';
        content += '<h4>科研配方</h4>';

        Object.entries(CRAFTING_RECIPES).forEach(([recipeId, recipe]) => {
            if (recipe.station !== 'scienceTable') return;

            const canCraft = this.canCraft(recipeId);
            const ingredientText = Object.entries(recipe.ingredients)
                .map(([itemId, amount]) => `${getItemName(itemId)}×${amount}`)
                .join(' + ');

            content += `
                <div class="recipe-item ${canCraft ? '' : 'disabled'}">
                    <div class="recipe-info">
                        <span class="recipe-name">${recipe.name}</span>
                        <span class="recipe-ingredients">${ingredientText}</span>
                    </div>
                    ${canCraft ? `<button class="recipe-btn" onclick="craftSystem.craft('${recipeId}'); craftSystem.showScienceMenu();">制作</button>` : ''}
                </div>
            `;
        });

        content += '</div>';

        showModal('科研', content, [
            { text: '关闭', action: 'hideModal();' }
        ]);
    },

    // 检查是否可以烹饪
    canCook: function(recipeId) {
        const recipe = COOKING_RECIPES[recipeId];
        if (!recipe) return false;

        let hasAnything = false;

        for (const [itemId, amount] of Object.entries(recipe.ingredients)) {
            if (itemId === 'anything') {
                hasAnything = true;
                continue;
            }
            if (!hasItem(itemId, amount)) {
                return false;
            }
        }

        // 如果配方需要"任意物品"，检查玩家是否有至少一个其他物品
        if (hasAnything) {
            const otherItems = player.inventory.filter(slot => {
                // 排除配方中已指定的物品
                return !recipe.ingredients[slot.id] || slot.id === 'anything';
            });
            if (otherItems.length === 0) {
                return false;
            }
        }

        return true;
    },

    // 检查是否可以制作
    canCraft: function(recipeId) {
        const recipe = CRAFTING_RECIPES[recipeId];
        if (!recipe) return false;

        // 检查工作台
        if (recipe.station && !hasBuilding(recipe.station)) {
            return false;
        }

        // 检查材料
        for (const [itemId, amount] of Object.entries(recipe.ingredients)) {
            if (!hasItem(itemId, amount)) {
                return false;
            }
        }

        return true;
    },

    // 获取所有可用配方
    getAvailableRecipes: function(type) {
        const recipes = type === 'cooking' ? COOKING_RECIPES : CRAFTING_RECIPES;
        const available = [];

        Object.entries(recipes).forEach(([recipeId, recipe]) => {
            if (type === 'cooking') {
                if (this.canCook(recipeId)) {
                    available.push({ id: recipeId, ...recipe });
                }
            } else {
                if (this.canCraft(recipeId)) {
                    available.push({ id: recipeId, ...recipe });
                }
            }
        });

        return available;
    },

    // 建造设施
    build: function(buildingId) {
        const building = BUILDINGS[buildingId];
        if (!building) {
            showMessage('无效的设施！', 'error');
            return false;
        }

        // 检查是否已建造
        if (hasBuilding(buildingId)) {
            showMessage('已经建造了该设施！', 'warning');
            return false;
        }

        // 检查材料
        for (const [itemId, amount] of Object.entries(building.materials)) {
            if (!hasItem(itemId, amount)) {
                showMessage(`材料不足！需要${getItemName(itemId)}×${amount}`, 'error');
                return false;
            }
        }

        // 消耗材料
        for (const [itemId, amount] of Object.entries(building.materials)) {
            removeItemFromInventory(itemId, amount);
        }

        // 建造设施
        player.buildings.push(buildingId);

        // 应用建筑效果
        applyBuildingEffect(buildingId);

        if (typeof soundSystem !== 'undefined' && soundSystem.enabled) soundSystem.play('build');
        showMessage(`建造了${building.name}`, 'success');
        updateUI();
        return true;
    },

    // 显示建造菜单
    showBuildMenu: function() {
        let content = '<div class="build-list">';
        content += '<h4>可建造设施</h4>';

        // 添加建造优先级建议
        content += '<div class="build-priority-guide">';
        content += '<h5>📋 建造优先级建议</h5>';
        content += '<div class="priority-tips">';

        const buildOrder = [
            { id: 'bed', name: '床', reason: '解锁睡觉功能，恢复状态' },
            { id: 'cooker', name: '炊具', reason: '解锁烹饪，制作高效食物' },
            { id: 'chest', name: '箱子', reason: '扩展背包容量' },
            { id: 'workbench', name: '工桌', reason: '解锁高级制作' },
            { id: 'well', name: '水井', reason: '被动产出水分' },
            { id: 'field', name: '田地', reason: '被动产出小麦' },
            { id: 'trap', name: '陷阱', reason: '被动出生肉类' },
            { id: 'alchemyTable', name: '炼金桌', reason: '解锁药剂制作' },
            { id: 'scienceTable', name: '科研桌', reason: '解锁科研功能' },
            { id: 'firePit', name: '火坑', reason: '冬季保暖必备' }
        ];

        buildOrder.forEach((item, index) => {
            const isBuilt = hasBuilding(item.id);
            const status = isBuilt ? '✅' : '⬜';
            content += `<div class="priority-item ${isBuilt ? 'built' : ''}">`;
            content += `<span>${status} ${index + 1}. ${item.name}</span>`;
            content += `<span class="priority-reason">${item.reason}</span>`;
            content += `</div>`;
        });

        content += '</div>';
        content += '</div>';

        // 季节性建议
        if (player.gameTime.season === 'autumn') {
            content += '<div class="season-advice autumn">';
            content += '<p>🍂 秋季提醒：优先建造火坑和囤积食物准备过冬！</p>';
            content += '</div>';
        } else if (player.gameTime.season === 'winter') {
            content += '<div class="season-advice winter">';
            content += '<p>❄️ 冬季提醒：资源停产，优先使用被动产出设施！</p>';
            content += '</div>';
        }

        content += '<h4>可建造设施</h4>';

        Object.entries(BUILDINGS).forEach(([buildingId, building]) => {
            const isBuilt = hasBuilding(buildingId);
            const canBuild = !isBuilt && this.canBuild(buildingId);
            const materialText = Object.entries(building.materials)
                .map(([itemId, amount]) => `${getItemName(itemId)}×${amount}`)
                .join(' + ');

            content += `
                <div class="build-item ${isBuilt ? 'built' : ''} ${canBuild ? '' : 'disabled'}">
                    <div class="build-info">
                        <span class="build-name">${building.name} ${isBuilt ? '(已建造)' : ''}</span>
                        <span class="build-description">${building.description}</span>
                        <span class="build-materials">材料: ${materialText}</span>
                    </div>
                    ${canBuild ? `<button class="build-btn" onclick="craftSystem.build('${buildingId}'); craftSystem.showBuildMenu();">建造</button>` : ''}
                </div>
            `;
        });

        content += '</div>';

        showModal('建造', content, [
            { text: '关闭', action: 'hideModal();' }
        ]);
    },

    // 检查是否可以建造
    canBuild: function(buildingId) {
        const building = BUILDINGS[buildingId];
        if (!building) return false;

        // 检查是否已建造
        if (hasBuilding(buildingId)) return false;

        // 检查材料
        for (const [itemId, amount] of Object.entries(building.materials)) {
            if (!hasItem(itemId, amount)) {
                return false;
            }
        }

        return true;
    }
};

// 初始化制作系统
function initCraftSystem() {
    craftSystem.init();
}

// 应用单个建筑效果
function applyBuildingEffect(buildingId) {
    const building = BUILDINGS[buildingId];
    if (!building) return;

    // 立即效果（如背包扩容）
    if (building.effect) {
        if (building.effect.maxInventory) {
            player.maxInventory += building.effect.maxInventory;
        }
    }
}

// 应用所有已建造建筑的效果（存档加载后调用）
function applyAllBuildingEffects() {
    // 先重置为基础值
    player.maxInventory = 10;

    player.buildings.forEach(buildingId => {
        const building = BUILDINGS[buildingId];
        if (!building || !building.effect) return;

        if (building.effect.maxInventory) {
            player.maxInventory += building.effect.maxInventory;
        }
    });
}

// 收集被动资源（每天触发，由 timeSystem 调用）
function collectPassiveResources() {
    // 冬季所有资源停产（田地、水井、陷阱等）
    if (player.gameTime.season === 'winter') {
        return;
    }

    player.buildings.forEach(buildingId => {
        const building = BUILDINGS[buildingId];
        if (!building || !building.passive) return;

        Object.entries(building.passive).forEach(([itemId, amount]) => {
            addItemToInventory(itemId, amount);
        });
    });
}

// 注册到命名空间
if (typeof KBA !== 'undefined') {
    KBA.registerData('COOKING_RECIPES', COOKING_RECIPES);
    KBA.registerData('CRAFTING_RECIPES', CRAFTING_RECIPES);
    KBA.registerSystem('craftSystem', craftSystem);
}
