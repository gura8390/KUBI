// 制作系统文件

// 烹饪配方
// COOKING_RECIPES 已迁移到 data/recipes.js
// 制作配方
// CRAFTING_RECIPES 已迁移到 data/recipes.js
// 制作系统
const craftSystem = {
    // 初始化制作系统
    init: function() {
        console.log('制作系统初始化完成');
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
            if (typeof EventBus !== "undefined") EventBus.emit("item:crafted", { item: recipe.result });
            if (typeof GameLogger !== "undefined") GameLogger.craft("制作了" + recipe.name);
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
