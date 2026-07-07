// 地图系统文件 - 职责：地图交互逻辑
// 数据定义已分离到 map-data.js

// 地图系统
const mapSystem = {
    currentMap: 'darkForest',

    // 初始化地图系统
    init: function() {
        this.updateMapButtons();
        this.updateMapDisplay();
},

    // 切换地图
    switchMap: function(mapId) {
        const map = MAPS[mapId];
        if (!map) {
            showMessage('无效的地图！', 'error');
            return false;
        }

        // 检查是否已解锁
        if (!this.isMapUnlocked(mapId)) {
            showMessage(`地图未解锁！${this.getUnlockHint(mapId)}`, 'error');
            return false;
        }

        // 检查体力
        if (!consumeStamina(map.staminaCost)) {
            return false;
        }

        // 切换地图
        this.currentMap = mapId;

        // 成就统计：访问地图
        if (typeof achievementSystem !== 'undefined') {
            achievementSystem.updateStat('mapsVisited', mapId);
        }

        // 稳定效果：快速旅行减少时间消耗
        let timeCost = map.timeCost;
        if (hasBuilding('stable')) {
            timeCost = Math.max(1, timeCost - 1);
        }

        // 推进时间
        timeSystem.advanceTime(timeCost);

        // 播放地图切换音效
        if (typeof soundSystem !== 'undefined' && soundSystem.enabled) soundSystem.play('door');

        // 更新显示
        this.updateMapDisplay();
        this.updateMapButtons();

        showMessage(`到达了${map.name}`, 'success');
        if (typeof EventBus !== "undefined") EventBus.emit("map:entered", { mapId: mapId });
        if (typeof GameLogger !== "undefined") GameLogger.map("到达了" + map.name);
        return true;
    },

    // 检查地图是否已解锁
    isMapUnlocked: function(mapId) {
        return player.unlockedMaps.includes(mapId);
    },

    // 检查并自动解锁满足条件的地图
    checkUnlocks: function() {
        let unlocked = false;

        Object.entries(MAPS).forEach(([mapId, map]) => {
            if (player.unlockedMaps.includes(mapId)) return;
            if (!map.unlockCondition) return;

            const condition = map.unlockCondition;

            if (condition.type === 'item') {
                if (hasItem(condition.item, condition.amount)) {
                    player.unlockedMaps.push(mapId);
                    showMessage(`解锁了新地图: ${map.name}！`, 'success');
                    unlocked = true;
                }
            } else if (condition.type === 'npc') {
                // NPC解锁通过NPC交互处理，此处跳过
            } else if (condition.type === 'faction') {
                if (player.faction === condition.faction) {
                    player.unlockedMaps.push(mapId);
                    showMessage(`解锁了新地图: ${map.name}！`, 'success');
                    unlocked = true;
                }
            }
        });

        if (unlocked) {
            this.updateMapButtons();
        }

        return unlocked;
    },

    // 获取解锁提示
    getUnlockHint: function(mapId) {
        const map = MAPS[mapId];
        if (!map || !map.unlockCondition) return '';

        const condition = map.unlockCondition;
        switch (condition.type) {
            case 'item':
                return `需要${getItemName(condition.item)}×${condition.amount}`;
            case 'npc':
                return `需要与${condition.npc}对话`;
            case 'faction':
                return `需要选择${condition.faction === 'cannibal' ? '食人族' : '法师'}阵营`;
            default:
                return '未知条件';
        }
    },

    // 更新地图显示
        // 获取动态场景描述
    getDynamicDescription: function() {
        var mapId = this.currentMap;
        var scenes = (typeof SceneDescriptions !== 'undefined') ? SceneDescriptions[mapId] : null;
        if (!scenes) return null;

        var weather = 'clear';
        if (typeof weatherSystem !== 'undefined' && weatherSystem.currentWeather) {
            weather = weatherSystem.currentWeather;
        }

        var hour = player.gameTime.hour;
        var timeOfDay = (hour >= 6 && hour < 18) ? 'day' : 'night';

        // 构建key: weather_timeOfDay
        var key = weather + '_' + timeOfDay;
        if (scenes[key]) return scenes[key];

        // 降级到天气描述
        if (scenes[weather]) return scenes[weather];

        return scenes.default;
    },

    updateMapDisplay: function() {
        const map = MAPS[this.currentMap];
        if (!map) return;

        // 更新地图名称（地牢显示楼层）
        let mapName = map.name;
        if (this.currentMap === 'dungeon') {
            const config = map.dungeonConfig;
            const floor = player.dungeonFloor;
            mapName = `${map.name} - 第${floor}层`;
            if (config.bossFloors.includes(floor)) {
                mapName += ' [BOSS]';
            }
        }
        document.getElementById('current-map-name').textContent = `[${mapName}]`;

        // 更新文字描述
        const gameText = document.getElementById('game-text');
        var desc = this.getDynamicDescription() || map.description;
        if (this.currentMap === 'dungeon') {
            const floor = player.dungeonFloor;
            const config = map.dungeonConfig;
            if (config.bossFloors.includes(floor)) {
                desc += `<br><span style="color:#c0392b;">一股强大的气息从深处传来...</span>`;
            } else if (floor >= 7) {
                desc += `<br><span style="color:#8e44ad;">空气中弥漫着硫磺的味道。</span>`;
            } else if (floor >= 4) {
                desc += `<br><span style="color:#7f8c8d;">阴冷的风从暗处吹来。</span>`;
            }
        }
        gameText.innerHTML = `<p>${desc}</p>`;

        // 更新行动按钮
        this.updateActionButtons();
    },

    // 更新行动按钮
    updateActionButtons: function() {
        const map = MAPS[this.currentMap];
        if (!map) return;

        const actionButtons = document.getElementById('action-buttons');
        actionButtons.innerHTML = '';

        // 地牢特殊按钮
        if (this.currentMap === 'dungeon') {
            const config = map.dungeonConfig;
            const floor = player.dungeonFloor;

            // 显示当前层数
            const floorInfo = document.createElement('button');
            floorInfo.className = 'action-btn floor-info';
            floorInfo.textContent = `第${floor}层/${config.maxFloor}层`;
            floorInfo.disabled = true;
            actionButtons.appendChild(floorInfo);

            // 探索按钮
            const exploreBtn = document.createElement('button');
            exploreBtn.className = 'action-btn';
            exploreBtn.onclick = () => this.performMapAction('explore');
            if (config.bossFloors.includes(floor)) {
                exploreBtn.textContent = '挑战Boss';
                exploreBtn.classList.add('boss-action');
            } else {
                exploreBtn.textContent = '探索';
            }
            actionButtons.appendChild(exploreBtn);

            // 下层按钮
            if (floor < config.maxFloor) {
                const descendBtn = document.createElement('button');
                descendBtn.className = 'action-btn';
                descendBtn.onclick = () => this.performMapAction('dungeonDescend');
                descendBtn.textContent = '下层';
                actionButtons.appendChild(descendBtn);
            }

            // 离开按钮
            const leaveBtn = document.createElement('button');
            leaveBtn.className = 'action-btn';
            leaveBtn.onclick = () => this.performMapAction('dungeonLeave');
            leaveBtn.textContent = '离开地牢';
            actionButtons.appendChild(leaveBtn);
        }
        // 添加地图特有的行动
        else if (map.actions) {
            map.actions.forEach(action => {
                const button = document.createElement('button');
                button.className = 'action-btn';
                button.onclick = () => this.performMapAction(action);
                button.textContent = this.getActionName(action);
                actionButtons.appendChild(button);
            });
        }

        // 在家中（darkForest）显示建筑功能按钮
        if (this.currentMap === 'darkForest') {
            if (hasBuilding('bed')) {
                const sleepBtn = document.createElement('button');
                sleepBtn.className = 'action-btn home-action';
                sleepBtn.onclick = () => game.showSleepMenu();
                sleepBtn.textContent = '睡觉';
                actionButtons.appendChild(sleepBtn);
            }
            if (hasBuilding('cooker')) {
                const cookBtn = document.createElement('button');
                cookBtn.className = 'action-btn home-action';
                cookBtn.onclick = () => game.showCookingMenu();
                cookBtn.textContent = '烹饪';
                actionButtons.appendChild(cookBtn);
            }
            if (hasBuilding('workbench')) {
                const craftBtn = document.createElement('button');
                craftBtn.className = 'action-btn home-action';
                craftBtn.onclick = () => game.showCraftMenu();
                craftBtn.textContent = '制造';
                actionButtons.appendChild(craftBtn);
            }
            if (hasBuilding('alchemyTable')) {
                const alchemyBtn = document.createElement('button');
                alchemyBtn.className = 'action-btn home-action';
                alchemyBtn.onclick = () => game.showAlchemyMenu();
                alchemyBtn.textContent = '炼金';
                actionButtons.appendChild(alchemyBtn);
            }
            if (hasBuilding('scienceTable')) {
                const scienceBtn = document.createElement('button');
                scienceBtn.className = 'action-btn home-action';
                scienceBtn.onclick = () => game.showScienceMenu();
                scienceBtn.textContent = '科研';
                actionButtons.appendChild(scienceBtn);
            }

            // 建造按钮始终在家可用
            const buildBtn = document.createElement('button');
            buildBtn.className = 'action-btn home-action';
            buildBtn.onclick = () => game.showBuildMenu();
            buildBtn.textContent = '建造';
            actionButtons.appendChild(buildBtn);
        }

        // 添加通用按钮
        const commonActions = [
            { name: '回家', action: 'goHome' },
            { name: '查看地图', action: 'showMapList' }
        ];

        commonActions.forEach(item => {
            const button = document.createElement('button');
            button.className = 'action-btn';
            button.onclick = () => game[item.action]();
            button.textContent = item.name;
            actionButtons.appendChild(button);
        });
    },

    // 获取行动名称
    getActionName: function(action) {
        const names = {
            chop: '砍树',
            gather: '采集浆果',
            hunt: '狩猎',
            scavenge: '拾荒',
            collect: '采集',
            water: '采水',
            mine: '采矿',
            fight: '战斗',
            talk: '对话',
            explore: '探索',
            dungeonDescend: '下层',
            dungeonLeave: '离开地牢'
        };
        return names[action] || action;
    },

    // 执行地图行动
    performMapAction: function(action) {
        const map = MAPS[this.currentMap];
        if (!map) return;

        // 检查体力
        if (!consumeStamina(map.staminaCost)) {
            return;
        }

        // 推进时间
        timeSystem.advanceTime(map.timeCost);

        // 根据行动类型执行
        switch (action) {
            case 'chop':
            case 'gather':
            case 'collect':
            case 'mine':
            case 'scavenge':
                this.collectResources();
                break;
            case 'water':
                this.collectWater();
                break;
            case 'hunt':
                this.hunt();
                break;
            case 'fight':
                this.fight();
                break;
            case 'talk':
                this.talk();
                break;
            case 'explore':
                this.explore();
                break;
            case 'dungeonDescend':
                this.descendDungeon();
                break;
            case 'dungeonLeave':
                this.leaveDungeon();
                break;
            default:
                showMessage('未知行动', 'error');
        }

        updateUI();
    },

    // 采集资源
    collectResources: function() {
        const map = MAPS[this.currentMap];
        if (!map || !map.resources) return;

        let collected = [];
        let totalItems = 0;

        // 遍历所有可能的资源
        Object.entries(map.resources).forEach(([itemId, resource]) => {
            if (Math.random() < resource.chance) {
                const amount = randomInt(resource.min, resource.max);
                if (addItemToInventory(itemId, amount)) {
                    collected.push(`${getItemName(itemId)}×${amount}`);
                    totalItems += amount;
                }
            }
        });

        if (collected.length > 0) {
            if (typeof soundSystem !== 'undefined' && soundSystem.enabled) soundSystem.play('pick');
            showMessage(`获得了: ${collected.join(', ')}`, 'success');
        } else {
            showMessage('没有找到任何东西', 'warning');
        }

        // 检查是否有新地图可解锁
        this.checkUnlocks();
    },

    // 采水
    collectWater: function() {
        const map = MAPS[this.currentMap];
        if (!map || !map.waterSources) {
            showMessage('这里没有水源', 'warning');
            return;
        }

        const source = map.waterSources;
        if (Math.random() < source.chance) {
            const amount = randomInt(source.min, source.max);
            if (addItemToInventory('water', amount)) {
                if (typeof soundSystem !== 'undefined' && soundSystem.enabled) soundSystem.play('drink');
                showMessage(`取到了水×${amount}`, 'success');
            }
        } else {
            showMessage('没有取到水', 'warning');
        }

        this.checkUnlocks();
    },

    // 狩猎
    hunt: function() {
        const map = MAPS[this.currentMap];
        if (!map || !map.monsters) return;

        // 随机遭遇怪物
        const monsterId = randomChoice(map.monsters);
        this.startBattle(monsterId);
    },

    // 战斗
    fight: function() {
        const map = MAPS[this.currentMap];
        if (!map || !map.monsters) return;

        // 随机遭遇怪物
        const monsterId = randomChoice(map.monsters);
        this.startBattle(monsterId);
    },

    // 对话
    talk: function() {
        const map = MAPS[this.currentMap];
        if (!map || !map.npcs) return;

        // 显示NPC列表
        this.showNPCList(map.npcs);
    },

    // 探索
    explore: function() {
        const map = MAPS[this.currentMap];
        if (!map) return;

        // 地牢特殊逻辑
        if (this.currentMap === 'dungeon') {
            this.exploreDungeon();
            return;
        }

        // 随机事件
        const event = randomInt(1, 3);
        switch (event) {
            case 1:
                // 找到资源
                this.collectResources();
                break;
            case 2:
                // 遭遇怪物
                if (map.monsters && map.monsters.length > 0) {
                    const monsterId = randomChoice(map.monsters);
                    this.startBattle(monsterId);
                }
                break;
            case 3:
                // 什么都没发生
                showMessage('探索了一番，没有发现什么特别的', 'info');
                break;
        }
    },

    // 地牢探索（多样化事件）
    exploreDungeon: function() {
        const map = MAPS.dungeon;
        const config = map.dungeonConfig;
        const floor = player.dungeonFloor;

        // Boss层检查
        if (config.bossFloors.includes(floor)) {
            const bossId = config.bosses[floor];
            showMessage(`第${floor}层出现了强大的守卫！`, 'warning');
            this.startDungeonBattle(bossId, floor);
            return;
        }

        // 多样化随机事件
        const roll = Math.random();
        if (roll < 0.50) {
            // 50% 遭遇怪物
            const floorMonsters = config.floorMonsters[floor] || ['demon'];
            const monsterId = randomChoice(floorMonsters);
            this.startDungeonBattle(monsterId, floor);
        } else if (roll < 0.65) {
            // 15% 宝箱房间
            const lootTable = [
                { item: 'soul', amount: randomInt(5, 15) },
                { item: 'gold', amount: randomInt(3, 10) },
                { item: 'healthPotion', amount: randomInt(1, 3) },
                { item: 'iron', amount: randomInt(2, 5) },
                { item: 'lightDust', amount: randomInt(1, 2) },
                { item: 'darkDust', amount: randomInt(1, 2) }
            ];
            const loot = lootTable[Math.floor(Math.random() * lootTable.length)];
            const scaledAmount = Math.floor(loot.amount * (1 + floor * 0.1));
            addItemToInventory(loot.item, scaledAmount);
            if (typeof soundSystem !== 'undefined' && soundSystem.enabled) soundSystem.play('pick');
            showMessage(`🎁 发现宝箱！获得${getItemName(loot.item)}×${scaledAmount}`, 'success');
        } else if (roll < 0.75) {
            // 10% 陷阱房间
            const trapDamage = randomInt(5, 15) + Math.floor(floor * 0.5);
            player.health = Math.max(1, player.health - trapDamage);
            // 10% 概率丢失物品
            if (Math.random() < 0.1 && player.inventory.length > 0) {
                const lostIdx = randomInt(0, player.inventory.length - 1);
                const lost = player.inventory.splice(lostIdx, 1)[0];
                showMessage(`💀 触发陷阱！生命-${trapDamage}，失去了${getItemName(lost.id)}`, 'error');
            } else {
                showMessage(`💀 触发陷阱！生命-${trapDamage}`, 'error');
            }
        } else if (roll < 0.80) {
            // 5% 恢复泉
            const healAmount = randomInt(20, 40);
            player.health = Math.min(100, player.health + healAmount);
            player.stamina = Math.min(100, player.stamina + 20);
            showMessage(`💧 发现恢复泉！生命+${healAmount}，体力+20`, 'success');
        } else if (roll < 0.85) {
            // 5% 分支选择
            this.showDungeonChoice(floor);
        } else if (roll < 0.90) {
            // 5% 灵魂收获
            const soulGain = Math.floor(randomInt(5, 12) * (1 + floor * 0.1));
            addSoul(soulGain);
            if (typeof soundSystem !== 'undefined' && soundSystem.enabled) soundSystem.play('pick');
            showMessage(`✨ 发现灵魂水晶，获得${soulGain}魂！`, 'success');
        } else {
            // 10% 空房间
            showMessage(`第${floor}层一片寂静，什么也没发生`, 'info');
        }

        // 成就统计
        if (typeof achievementSystem !== 'undefined') {
            achievementSystem.updateStat('dungeonFloor', floor);
        }
    },

    // 地牢分支选择
    showDungeonChoice: function(floor) {
        const content = `
            <p>你在第${floor}层发现了两条路：</p>
            <div class="dungeon-choice">
                <p><strong>左边</strong>：安全通道，直接通过</p>
                <p><strong>右边</strong>：危险通道，可能有丰厚奖励或强大敌人</p>
            </div>
        `;

        showModal('地牢分支', content, [
            {
                text: '走左边（安全）',
                action: `hideModal(); showMessage('你选择了安全通道，平稳通过', 'info');`
            },
            {
                text: '走右边（危险）',
                action: `hideModal(); mapSystem._dungeonDangerousPath(${floor});`
            }
        ]);
    },

    // 地牢危险路径
    _dungeonDangerousPath: function(floor) {
        if (Math.random() < 0.5) {
            // 奖励
            const rewards = [
                { item: 'soul', amount: randomInt(10, 25) },
                { item: 'dragonBone', amount: 1 },
                { item: 'lightDust', amount: randomInt(2, 4) },
                { item: 'darkDust', amount: randomInt(2, 4) }
            ];
            const reward = rewards[Math.floor(Math.random() * rewards.length)];
            addItemToInventory(reward.item, reward.amount);
            showMessage(`💎 危险路径的宝藏！获得${getItemName(reward.item)}×${reward.amount}`, 'success');
        } else {
            // 强敌
            showMessage('⚠️ 危险路径遭遇了强敌！', 'warning');
            const floorMonsters = MAPS.dungeon.dungeonConfig.floorMonsters[floor] || ['demon'];
            const monsterId = randomChoice(floorMonsters);
            this.startDungeonBattle(monsterId, floor);
        }
    },

    // 地牢战斗（带楼层属性加成）
    startDungeonBattle: function(monsterId, floor) {
        if (typeof battleSystem === 'undefined') return;

        const config = MAPS.dungeon.dungeonConfig;
        const multiplier = config.floorMultiplier(floor);

        // 临时修改怪物属性（按楼层倍率缩放）
        const originalMonster = MONSTERS[monsterId];
        if (!originalMonster) return;

        const scaledMonster = {
            name: originalMonster.name + (floor > 1 ? ` Lv.${floor}` : ''),
            health: Math.floor(originalMonster.health * multiplier),
            attack: Math.floor(originalMonster.attack * multiplier),
            defense: Math.floor(originalMonster.defense * multiplier),
            drops: originalMonster.drops,
            dropChance: originalMonster.dropChance
        };

        // 创建临时怪物数据
        const tempId = '_dungeon_' + monsterId;
        MONSTERS[tempId] = scaledMonster;

        // 标记当前为地牢战斗
        battleSystem._dungeonTempId = tempId;

        // 开始战斗
        battleSystem.startBattle(tempId);
    },

    // 下层
    descendDungeon: function() {
        const config = MAPS.dungeon.dungeonConfig;
        const currentFloor = player.dungeonFloor;

        if (currentFloor >= config.maxFloor) {
            showMessage('已经到达地牢最深处！', 'warning');
            return;
        }

        // 消耗体力
        if (!consumeStamina(5)) {
            return;
        }

        // 推进时间
        timeSystem.advanceTime(2);

        player.dungeonFloor++;

        if (typeof soundSystem !== 'undefined' && soundSystem.enabled) soundSystem.play('descend');

        const newFloor = player.dungeonFloor;
        if (config.bossFloors.includes(newFloor)) {
            showMessage(`进入了第${newFloor}层，感受到了强大的气息...`, 'warning');
        } else {
            showMessage(`下到了第${newFloor}层`, 'info');
        }

        updateUI();
    },

    // 离开地牢（重置楼层）
    leaveDungeon: function() {
        player.dungeonFloor = 1;
        this.switchMap('darkForest');
        showMessage('离开了地牢，回到了幽暗森林', 'info');
    },

    // 开始战斗
    startBattle: function(monsterId) {
        if (typeof battleSystem !== 'undefined') {
            battleSystem.startBattle(monsterId);
        }
    },

    // 显示NPC列表
    showNPCList: function(npcIds) {
        let content = '<div class="npc-list">';
        npcIds.forEach(npcId => {
            const npc = NPCS[npcId];
            if (npc) {
                content += `
                    <div class="npc-item">
                        <h4>${npc.name}</h4>
                        <p>${npc.description}</p>
                        <button class="modal-btn" onclick="mapSystem.interactWithNPC('${npcId}')">对话</button>
                    </div>
                `;
            }
        });
        content += '</div>';

        showModal('NPC列表', content, [
            { text: '关闭', action: 'hideModal();' }
        ]);
    },

    // 与NPC交互
    interactWithNPC: function(npcId) {
        if (typeof npcSystem !== 'undefined') {
            npcSystem.interact(npcId);
        }
    },

    // 更新地图按钮
    updateMapButtons: function() {
        const mapButtons = document.getElementById('map-buttons');
        if (!mapButtons) return;

        mapButtons.innerHTML = '';

        Object.entries(MAPS).forEach(([mapId, map]) => {
            const button = document.createElement('button');
            button.className = 'map-btn';

            if (this.currentMap === mapId) {
                button.classList.add('active');
            }

            if (!this.isMapUnlocked(mapId)) {
                button.classList.add('locked');
                button.title = this.getUnlockHint(mapId);
            }

            button.textContent = map.name;
            button.onclick = () => this.switchMap(mapId);
            mapButtons.appendChild(button);
        });
    },

    // 显示地图列表
    showMapList: function() {
        let content = '<div class="map-list">';

        Object.entries(MAPS).forEach(([mapId, map]) => {
            const isUnlocked = this.isMapUnlocked(mapId);
            const isCurrent = this.currentMap === mapId;

            content += `
                <div class="map-item ${isCurrent ? 'current' : ''} ${isUnlocked ? '' : 'locked'}">
                    <h4>${map.name} ${isCurrent ? '(当前)' : ''}</h4>
                    <p>${map.description}</p>
                    ${!isUnlocked ? `<p class="unlock-hint">解锁条件: ${this.getUnlockHint(mapId)}</p>` : ''}
                    ${isUnlocked && !isCurrent ? `<button class="modal-btn" onclick="mapSystem.switchMap('${mapId}'); hideModal();">前往</button>` : ''}
                </div>
            `;
        });

        content += '</div>';

        showModal('地图列表', content, [
            { text: '关闭', action: 'hideModal();' }
        ]);
    },

    // 获取当前地图信息
    getCurrentMap: function() {
        return MAPS[this.currentMap];
    },

    // 获取当前地图名称
    getCurrentMapName: function() {
        const map = MAPS[this.currentMap];
        return map ? map.name : '未知';
    },

    // 检查是否有怪物

    // 检查是否有NPC
};

// 初始化地图系统
function initMapSystem() {
    mapSystem.init();
}

// 注册到命名空间
if (typeof KBA !== 'undefined') {
    KBA.registerSystem('mapSystem', mapSystem);
}
