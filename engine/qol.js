// Quality of Life Improvements
// Auto-sort, batch crafting, quick storage

var QoLSystem = {
    // === 背包自动排序 ===
    sortInventory: function() {
        if (!player || !player.inventory) return;

        // 按类型排序优先级
        var typeOrder = { weapon: 0, armor: 1, accessory: 2, potion: 3, consumable: 4, food: 5, resource: 6 };

        player.inventory.sort(function(a, b) {
            var itemA = ITEMS[a.id];
            var itemB = ITEMS[b.id];
            if (!itemA || !itemB) return 0;

            var orderA = typeOrder[itemA.type] || 99;
            var orderB = typeOrder[itemB.type] || 99;

            if (orderA !== orderB) return orderA - orderB;

            // 同类型按名称排序
            return (itemA.name || '').localeCompare(itemB.name || '');
        });

        showMessage('背包已整理', 'info');
        updateUI();
    },

    // === 堆叠相同物品 ===
    stackInventory: function() {
        if (!player || !player.inventory) return;

        var stacked = {};
        player.inventory.forEach(function(slot) {
            if (stacked[slot.id]) {
                stacked[slot.id] += (slot.count || 1);
            } else {
                stacked[slot.id] = slot.count || 1;
            }
        });

        player.inventory = [];
        Object.keys(stacked).forEach(function(id) {
            var item = ITEMS[id];
            if (!item) return;

            if (item.stackable) {
                // 可堆叠物品合并
                var remaining = stacked[id];
                while (remaining > 0) {
                    var count = Math.min(remaining, item.maxStack || 99);
                    player.inventory.push({ id: id, count: count });
                    remaining -= count;
                }
            } else {
                // 不可堆叠物品分开
                for (var i = 0; i < stacked[id]; i++) {
                    player.inventory.push({ id: id, count: 1 });
                }
            }
        });

        showMessage('物品已堆叠', 'info');
        updateUI();
    },

    // === 批量制作 ===
    batchCraft: function(recipeId, amount) {
        var recipe = CRAFTING_RECIPES[recipeId];
        if (!recipe) return;

        var crafted = 0;
        for (var i = 0; i < amount; i++) {
            // 检查材料
            var canCraft = true;
            for (var itemId in recipe.ingredients) {
                if (!hasItem(itemId, recipe.ingredients[itemId])) {
                    canCraft = false;
                    break;
                }
            }

            if (!canCraft) break;

            // 消耗材料
            for (var itemId in recipe.ingredients) {
                removeItemFromInventory(itemId, recipe.ingredients[itemId]);
            }

            // 制作
            if (addItemToInventory(recipe.result, 1)) {
                crafted++;
            }
        }

        if (crafted > 0) {
            showMessage('制作了 ' + crafted + ' 个 ' + recipe.name, 'success');
            if (typeof soundSystem !== 'undefined' && soundSystem.enabled) soundSystem.play('craft');
        }

        updateUI();
        return crafted;
    },

    // === 快速存取到箱子 ===
    quickStore: function(chestId) {
        // 将背包中所有可堆叠物品存入箱子
        var stored = 0;
        // 这里需要箱子系统的支持
        showMessage('存入了 ' + stored + ' 个物品', 'info');
        updateUI();
    },

    // === 快速取出 ===
    quickRetrieve: function(chestId) {
        showMessage('取出功能开发中', 'info');
    },

    // === 配方筛选 ===
    filterRecipes: function(type, showOnlyAvailable) {
        var recipes = type === 'cooking' ? COOKING_RECIPES : CRAFTING_RECIPES;
        var filtered = [];

        Object.entries(recipes).forEach(function(entry) {
            var id = entry[0], recipe = entry[1];

            if (showOnlyAvailable) {
                var canMake = type === 'cooking' ? craftSystem.canCook(id) : craftSystem.canCraft(id);
                if (!canMake) return;
            }

            filtered.push({ id: id, recipe: recipe });
        });

        return filtered;
    },

    // === 日志过滤 ===
    filterLog: function(filterType) {
        var filtered = gameLog;

        if (filterType === 'combat') {
            filtered = gameLog.filter(function(entry) {
                return entry.text.indexOf('攻击') >= 0 || entry.text.indexOf('伤害') >= 0 || entry.text.indexOf('战斗') >= 0;
            });
        } else if (filterType === 'loot') {
            filtered = gameLog.filter(function(entry) {
                return entry.text.indexOf('获得') >= 0 || entry.text.indexOf('发现') >= 0 || entry.text.indexOf('制作') >= 0;
            });
        } else if (filterType === 'system') {
            filtered = gameLog.filter(function(entry) {
                return entry.text.indexOf('解锁') >= 0 || entry.text.indexOf('完成') >= 0 || entry.text.indexOf('天气') >= 0;
            });
        }

        return filtered;
    },

    // === 显示日志过滤界面 ===
    showFilteredLog: function() {
        var content = '<div class="log-filter">';
        content += '<div style="margin-bottom:10px;">';
        content += `<button onclick="QoLSystem._showLogType('all')">全部</button> `;
        content += `<button onclick="QoLSystem._showLogType('all')">全部</button> `;
        content += `<button onclick="QoLSystem._showLogType('all')">全部</button> `;
        content += `<button onclick="QoLSystem._showLogType('all')">全部</button> `;
        content += '</div>';
        content += '<div id="filtered-log"></div>';
        content += '</div>';

        showModal('操作日志', content, [{ text: '关闭', action: 'hideModal();' }]);
        this._showLogType('all');
    },

    _showLogType: function(type) {
        var logs = this.filterLog(type);
        var el = document.getElementById('filtered-log');
        if (!el) return;

        el.innerHTML = logs.slice(0, 20).map(function(entry) {
            return '<div class="log-entry ' + entry.type + '">' + entry.text + '</div>';
        }).join('');
    }
};

if (typeof KBA !== 'undefined') KBA.systems.qol = QoLSystem;
