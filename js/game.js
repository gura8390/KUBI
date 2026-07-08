// 游戏主逻辑文件

// 游戏主对象
const game = {
    // 初始化游戏
    init: function() {
        console.log('游戏初始化开始...');

        try {
            // 初始化音效系统
            if (typeof initSoundSystem === 'function') {
                initSoundSystem();
                console.log('✓ 音效系统');
            }

            // 初始化各个系统
            initPlayer();
            console.log('✓ 玩家系统');

            initTimeSystem();
            console.log('✓ 时间系统');

            initStorageSystem();
            console.log('✓ 存储系统');

            initCraftSystem();
            console.log('✓ 制作系统');

            initNPCSystem();
            console.log('✓ NPC系统');

            initBattleSystem();
            if (typeof GameStateMachine !== "undefined") GameStateMachine.transition("main");
            if (typeof WorldState !== "undefined") WorldState.init();
            console.log('✓ 战斗系统');

            initMapSystem();
            console.log('✓ 地图系统');

            // 初始化新增系统
            if (typeof initEventSystem === 'function') {
                initEventSystem();
                console.log('✓ 事件系统');
            }

            if (typeof initQuestSystem === 'function') {
                initQuestSystem();
                console.log('✓ 任务系统');
            }

            if (typeof initWeatherSystem === 'function') {
                initWeatherSystem();
                console.log('✓ 天气系统');
            }

            if (typeof initAchievementSystem === 'function') {
                initAchievementSystem();
                console.log('✓ 成就系统');
            }

            // 应用已建造建筑的效果（存档加载后恢复）
            if (typeof applyAllBuildingEffects === 'function') {
                applyAllBuildingEffects();
                console.log('✓ 建筑效果');
            }

            // 更新UI
            updateUI();
            console.log('✓ UI更新');

            // 初始化键盘快捷键
            if (typeof initKeyboardShortcuts === 'function') {
                initKeyboardShortcuts();
                console.log('✓ 键盘快捷键');
            }

            // 初始化调试面板
            if (typeof DebugPanel !== 'undefined') {
                DebugPanel.init();
                console.log('✓ 调试面板 (~键打开)');
            }

            // 注册EventBus监听器
            this._registerEventListeners();

            console.log('游戏初始化完成！');
            showMessage('欢迎来到超苦逼冒险者！', 'info');
        if (typeof EventBus !== "undefined") EventBus.emit("game:init", {});
        if (typeof GameLogger !== "undefined") GameLogger.system("游戏初始化完成");

            // 显示新手教程（首次游戏）
            if (player.gameTime.day === 1 && player.gameTime.hour === 6) {
                setTimeout(() => {
                    this.showTutorial();
                }, 1000);
            }
        } catch (error) {
            console.error('游戏初始化失败:', error);
            // 尝试最小化初始化
            try {
                if (typeof player === 'undefined' || !player.inventory) {
                    initPlayer();
                }
                updateUI();
            } catch (e) {
                console.error('最小化初始化也失败:', e);
            }
        }
    },

    // 执行地图行动（由 mapSystem.performMapAction 调用，不再直接调用）
    performAction: function(action) {
        if (battleSystem.isInBattle()) {
            showMessage('战斗中无法执行此操作！', 'error');
            return;
        }

        const currentMap = mapSystem.getCurrentMap();
        if (!currentMap) {
            showMessage('当前没有地图！', 'error');
            return;
        }

        // 委托给 mapSystem 处理（内部已包含体力检查和时间推进）
        mapSystem.performMapAction(action);
    },

    // 回家
    goHome: function() {
        if (battleSystem.isInBattle()) {
            showMessage('战斗中无法回家！', 'error');
            return;
        }

        mapSystem.switchMap('darkForest');
        showMessage('回到了幽暗森林', 'info');
    },

    // 显示地图列表
    showMapList: function() {
        mapSystem.showMapList();
    },

    // 切换地图
    switchMap: function(mapId) {
        mapSystem.switchMap(mapId);
    },

    // 显示烹饪菜单
    showCookingMenu: function() {
        craftSystem.showCookingMenu();
    },

    // 显示制作菜单
    showCraftMenu: function() {
        craftSystem.showCraftingMenu();
    },

    // 显示炼金菜单
    showAlchemyMenu: function() {
        craftSystem.showAlchemyMenu();
    },

    // 显示科研菜单
    showScienceMenu: function() {
        craftSystem.showScienceMenu();
    },

    // 显示建造菜单
    showBuildMenu: function() {
        craftSystem.showBuildMenu();
    },

    // 显示研究菜单
    showResearchMenu: function() {
        // 研究系统暂未实现
        showMessage('研究系统开发中...', 'info');
    },

    // 显示系统菜单
    showSystemMenu: function() {
        let content = `
            <div class="system-menu">
                <h4>系统设置</h4>
                <div class="system-options">
                    <button class="modal-btn" onclick="game.saveGame()">保存游戏</button>
                    <button class="modal-btn" onclick="game.loadGame()">加载游戏</button>
                    <button class="modal-btn" onclick="game.exportSave()">导出存档</button>
                    <button class="modal-btn" onclick="game.importSave()">导入存档</button>
                    <button class="modal-btn" onclick="game.showPlayerStatus()">角色状态</button>
                    <button class="modal-btn" onclick="game.showTimeInfo()">时间信息</button>
                    <button class="modal-btn" onclick="game.togglePause()">暂停/继续</button>
                    <button class="modal-btn" onclick="showResourceEfficiency()">资源效率分析</button>
                    <button class="modal-btn" onclick="game.showResourcePlan()">资源规划</button>
                    <button class="modal-btn" onclick="questSystem.showQuestList()">任务列表</button>
                    <button class="modal-btn" onclick="weatherSystem.showWeatherInfo()">天气信息</button>
                    <button class="modal-btn" onclick="achievementSystem.showAchievementList()">成就列表</button>
                    <button class="modal-btn" onclick="eventSystem.showEventHistory()">事件记录</button>
                </div>
            </div>
        `;

        showModal('系统菜单', content, [
            { text: '关闭', action: 'hideModal();' }
        ]);
    },

    // 保存游戏
    saveGame: function() {
        saveGame();
    },

    // 加载游戏
    loadGame: function() {
        loadGame();
    },

    // 导出存档
    exportSave: function() {
        storage.exportSave();
    },

    // 导入存档
    importSave: function() {
        storage.showSaveMenu();
    },

    // 显示角色状态
    showPlayerStatus: function() {
        showPlayerStatus();
    },

    // 显示背包详情
    showInventory: function() {
        let content = '<div class="inventory-detail">';
        content += `<p>背包容量: ${player.inventory.length}/${player.maxInventory}</p>`;
        content += '<div class="inventory-detail-grid">';

        player.inventory.forEach((slot, index) => {
            const item = ITEMS[slot.id];
            if (!item) return;

            content += `
                <div class="inventory-detail-item" onclick="showItemDetails('${slot.id}', ${index})">
                    <span class="item-icon">${getItemIcon(slot.id)}</span>
                    <span class="item-name">${item.name}</span>
                    <span class="item-count">${slot.count > 1 ? `×${slot.count}` : ''}</span>
                </div>
            `;
        });

        content += '</div></div>';

        showModal('背包', content, [
            { text: '关闭', action: 'hideModal();' }
        ]);
    },

    // 注册EventBus监听器
    _registerEventListeners: function() {
        if (typeof EventBus === 'undefined') return;

        // Boss击杀后触发地图变化
        EventBus.on('world:bossKilled', function(data) {
            if (data.bossId === 'spiderQueen') {
                if (typeof WorldState !== 'undefined') {
                    WorldState.setMapChange('spiderCave', 'monsterReduction', 0.5);
                }
                showMessage('蜘蛛女王被击败了！蜘蛛洞穴的怪物减少了！', 'info');
            }
            if (data.bossId === 'ogreChief') {
                if (typeof WorldState !== 'undefined') {
                    WorldState.setMapChange('cannibalTribe', 'peaceful', true);
                }
                showMessage('食人魔族长被击败了！食人族部落变得安全了！', 'info');
            }
            if (data.bossId === 'darkSage') {
                if (typeof WorldState !== 'undefined') {
                    WorldState.setMapChange('mageGuild', 'peaceful', true);
                }
                showMessage('黑衣贤者被击败了！魔法公会变得安全了！', 'info');
            }
            if (data.bossId === 'skeletonKing') {
                if (typeof WorldState !== 'undefined') {
                    WorldState.setMapChange('dungeon', 'bossProgress', 5);
                }
                showMessage('骷髅王被击败了！地牢深层已经解锁！', 'info');
            }
            if (data.bossId === 'demonLord') {
                if (typeof WorldState !== 'undefined') {
                    WorldState.setMapChange('dungeon', 'bossProgress', 10);
                }
                showMessage('魔王被击败了！地牢更深层已经解锁！', 'info');
            }
            if (data.bossId === 'worldEnder') {
                if (typeof WorldState !== 'undefined') {
                    WorldState.setMapChange('dungeon', 'cleared', true);
                }
                showMessage('灭世者被击败了！世界恢复了和平！', 'success');
            }
        }, null, EventBus.PRIORITY.NORMAL);
    },

    // 显示时间信息
    showTimeInfo: function() {
        timeSystem.showTimeInfo();
    },

    // 暂停/继续
    togglePause: function() {
        timeSystem.togglePause();
    },

    // 显示NPC列表
    showNPCList: function() {
        npcSystem.showNPCList();
    },

    // 显示新手教程
    showTutorial: function() {
        let content = '<div class="tutorial">';
        content += '<h4>🎮 新手教程</h4>';

        content += '<div class="tutorial-section">';
        content += '<h5>📊 核心理念</h5>';
        content += '<p>《超苦逼冒险者》是一款<strong>资源管理</strong>游戏。你的目标是在荒野中生存并发展壮大。</p>';
        content += '<p><strong>资源即生命，决策即命运</strong> - 每个选择都有代价，每个行动都有后果。</p>';
        content += '</div>';

        content += '<div class="tutorial-section">';
        content += '<h5>🎯 初期目标</h5>';
        content += '<ol>';
        content += '<li>前往<strong>幽暗森林</strong>采集资源（木头、浆果、生肉）</li>';
        content += '<li>建造<strong>床</strong>（木头×5）- 解锁睡觉功能</li>';
        content += '<li>建造<strong>炊具</strong>（石头×2+木头×2）- 解锁烹饪</li>';
        content += '<li>建造<strong>箱子</strong>（木头×3）- 扩展背包</li>';
        content += '</ol>';
        content += '</div>';

        content += '<div class="tutorial-section">';
        content += '<h5>⌨️ 快捷键</h5>';
        content += '<ul>';
        content += '<li><strong>1-9</strong> - 触发对应行动按钮</li>';
        content += '<li><strong>M</strong> - 打开地图列表</li>';
        content += '<li><strong>B</strong> - 打开建造菜单（在家时）</li>';
        content += '<li><strong>I</strong> - 打开背包详情</li>';
        content += '<li><strong>E</strong> - 资源效率分析</li>';
        content += '<li><strong>Q</strong> - 任务列表</li>';
        content += '<li><strong>W</strong> - 天气信息</li>';
        content += '<li><strong>R</strong> - 成就列表</li>';
        content += '<li><strong>ESC</strong> - 关闭弹窗</li>';
        content += '</ul>';
        content += '</div>';

        content += '<div class="tutorial-section">';
        content += '<h5>💡 生存技巧</h5>';
        content += '<ul>';
        content += '<li>注意<strong>季节变化</strong> - 秋季要囤积过冬物资</li>';
        content += '<li><strong>体力</strong>是行动的基础 - 合理分配体力</li>';
        content += '<li><strong>烹饪</strong>能制作高效食物 - 比直接吃原材料更划算</li>';
        content += '<li><strong>建筑</strong>提供被动产出 - 水井、田地、陷阱</li>';
        content += '<li><strong>任务</strong>提供目标和奖励 - 按Q查看任务列表</li>';
        content += '<li><strong>天气</strong>影响生存状态 - 按W查看天气信息</li>';
        content += '<li><strong>成就</strong>记录你的里程碑 - 按R查看成就列表</li>';
        content += '</ul>';
        content += '</div>';

        content += '</div>';

        showModal('欢迎来到超苦逼冒险者', content, [
            { text: '开始冒险', action: 'hideModal();' }
        ]);
    },

    // 显示资源规划
    showResourcePlan: function() {
        if (!player) return;

        let content = '<div class="resource-plan">';
        content += '<h4>📊 资源规划建议</h4>';

        // 当前状态分析
        content += '<div class="plan-section">';
        content += '<h5>当前状态</h5>';
        content += `<p>📅 第${player.gameTime.day}天 - ${getSeasonName(player.gameTime.season)}</p>`;
        content += `<p>❤️ 生命: ${Math.round(player.health)}/100</p>`;
        content += `<p>🍖 满腹: ${Math.round(player.hunger)}/100</p>`;
        content += `<p>💧 水分: ${Math.round(player.thirst)}/100</p>`;
        content += `<p>⚡ 体力: ${Math.round(player.stamina)}/100</p>`;
        content += '</div>';

        // 资源储备分析
        content += '<div class="plan-section">';
        content += '<h5>资源储备</h5>';

        const criticalResources = [
            { id: 'water', name: '水', min: 20, icon: '💧' },
            { id: 'rawMeat', name: '生肉', min: 15, icon: '🥩' },
            { id: 'berry', name: '浆果', min: 10, icon: '🫐' },
            { id: 'wood', name: '木头', min: 30, icon: '🪵' },
            { id: 'bread', name: '面包', min: 10, icon: '🍞' }
        ];

        criticalResources.forEach(resource => {
            const count = countItemInInventory(resource.id);
            const status = count >= resource.min ? '✅' : '⚠️';
            const statusClass = count >= resource.min ? 'sufficient' : 'insufficient';
            content += `<p class="resource-status ${statusClass}">${status} ${resource.icon} ${resource.name}: ${count}/${resource.min}</p>`;
        });

        content += '</div>';

        // 季节性建议
        content += '<div class="plan-section">';
        content += '<h5>季节性建议</h5>';

        if (player.gameTime.season === 'spring') {
            content += '<p>🌸 春季：资源丰富，适合探索和建设</p>';
            content += '<p>建议：优先建造基础设施，收集种子准备种植</p>';
        } else if (player.gameTime.season === 'summer') {
            content += '<p>☀️ 夏季：注意防暑降温</p>';
            content += '<p>建议：制作降温药剂，储备冰露</p>';
        } else if (player.gameTime.season === 'autumn') {
            content += '<p>🍂 秋季：准备过冬的关键时期</p>';
            content += '<p>建议：囤积食物、水、木头，建造火坑</p>';

            const daysUntilWinter = 30 - (player.gameTime.day % 30);
            if (daysUntilWinter <= 10) {
                content += `<p class="warning">⚠️ 距离冬季还有${daysUntilWinter}天！</p>`;
            }
        } else if (player.gameTime.season === 'winter') {
            content += '<p>❄️ 冬季：资源停产，生存挑战</p>';
            content += '<p>建议：严格控制消耗，使用被动产出，与商人交易</p>';
        }

        content += '</div>';

        // 行动建议
        content += '<div class="plan-section">';
        content += '<h5>行动建议</h5>';

        const suggestions = [];

        if (player.stamina < 30) {
            suggestions.push('😴 体力不足，建议休息恢复');
        }

        if (player.hunger < 30) {
            suggestions.push('🍖 饥饿状态，建议进食');
        }

        if (player.thirst < 30) {
            suggestions.push('💧 口渴状态，建议饮水');
        }

        if (player.health < 50) {
            suggestions.push('❤️ 生命值较低，建议使用药剂或休息');
        }

        if (player.gameTime.season === 'autumn' && !hasBuilding('firePit')) {
            suggestions.push('🔥 建议建造火坑准备过冬');
        }

        if (suggestions.length === 0) {
            suggestions.push('✅ 状态良好，可以继续探索');
        }

        suggestions.forEach(suggestion => {
            content += `<p>${suggestion}</p>`;
        });

        content += '</div>';
        content += '</div>';

        showModal('资源规划', content, [
            { text: '关闭', action: 'hideModal();' }
        ]);
    },

    // 显示战斗背包
    showBattleInventory: function() {
        battleSystem.showBattleInventory();
    },

    // 检查是否可以执行行动
    canPerformAction: function(action) {
        if (battleSystem.isInBattle()) return false;

        const currentMap = mapSystem.getCurrentMap();
        if (!currentMap) return false;

        return player.stamina >= currentMap.staminaCost;
    },

    // 获取当前地图信息
    getCurrentMapInfo: function() {
        return mapSystem.getCurrentMap();
    },

    // 获取当前地图名称
    getCurrentMapName: function() {
        return mapSystem.getCurrentMapName();
    },

    // 检查是否在战斗中
    isInBattle: function() {
        return battleSystem.isInBattle();
    },

    // 获取玩家状态
    getPlayerStatus: function() {
        return {
            health: player.health,
            hunger: player.hunger,
            stamina: player.stamina,
            thirst: player.thirst,
            sanity: player.sanity,
            temperature: player.temperature,
            attack: player.attack,
            defense: player.defense,
            hitRate: player.hitRate,
            soul: player.soul
        };
    },

    // 使用物品
    useItem: function(index) {
        useItem(index);
    },

    // 丢弃物品
    dropItem: function(index) {
        dropItem(index);
    },

    // 装备武器
    equipWeapon: function(index) {
        if (!player || !player.inventory || index >= player.inventory.length) return;

        const slot = player.inventory[index];
        if (slot && slot.id) {
            equipWeapon(slot.id);
        }
    },

    // 装备防具
    equipArmor: function(index) {
        if (!player || !player.inventory || index >= player.inventory.length) return;

        const slot = player.inventory[index];
        if (slot && slot.id) {
            equipArmor(slot.id);
        }
    },

    // 显示魂点分配
    showSoulAllocation: function() {
        showSoulAllocation();
    },

    // 显示睡菜单
    showSleepMenu: function() {
        timeSystem.showSleepMenu();
    },

    // 睡觉
    sleep: function() {
        timeSystem.sleep();
    },

    // 更新UI
    updateUI: function() {
        updateUI();
    },

    // 显示消息
    showMessage: function(text, type) {
        showMessage(text, type);
    },

    // 显示模态框
    showModal: function(title, content, buttons) {
        showModal(title, content, buttons);
    },

    // 隐藏模态框
    hideModal: function() {
        hideModal();
    }
};

// 页面加载完成后初始化游戏
window.addEventListener('DOMContentLoaded', function() {
    game.init();
});

// 防止页面关闭时丢失进度
window.addEventListener('beforeunload', function(e) {
    if (player.health > 0) {
        storage.save();
    }
});

// 注册到命名空间
if (typeof KBA !== 'undefined') KBA.registerSystem('game', game);
