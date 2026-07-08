// NPC数据已迁移到 data/npcs.js
// 本文件只保留系统逻辑

// NPC和交易系统文件

// NPC数据
// NPC系统
const npcSystem = {
    init: function() {},
    // 初始化NPC系统

    // NPC记忆系统
    recordNPCAction: function(npcId, action) {
        if (typeof WorldState === 'undefined') return;
        const key = 'npc_' + npcId + '_' + action;
        if (!WorldState.state.triggeredEvents[key]) {
            WorldState.state.triggeredEvents[key] = 0;
        }
        WorldState.state.triggeredEvents[key]++;
        WorldState._recordHistory('npcAction', { npcId, action, count: WorldState.state.triggeredEvents[key] });
    },

    getNPCActionCount: function(npcId, action) {
        if (typeof WorldState === 'undefined') return 0;
        const key = 'npc_' + npcId + '_' + action;
        return WorldState.state.triggeredEvents[key] || 0;
    },

    // 与NPC交互
    interact: function(npcId) {
        const npc = NPCS[npcId];
        if (!npc) {
            showMessage('无效的NPC！', 'error');
            return;
        }

        // 检查季节限制
        if (npc.season && player.gameTime.season !== npc.season) {
            showMessage(`${npc.name}只在${getSeasonName(npc.season)}出现！`, 'warning');
            return;
        }

        // 阵营选择NPC特殊处理
        if (npc.factionChoice) {
            if (player.faction) {
                const factionName = player.faction === 'cannibal' ? '食人族' : '法师';
                showMessage(`你已经选择了${factionName}阵营`, 'info');
                return;
            }
            this.showFactionChoice();
            return;
        }

        // 显示对话
        this.showDialogue(npcId);
    },

    // 获取阵营声望等级
    getFactionLevel: function(faction) {
        if (typeof WorldState === 'undefined') return 0;
        const rep = WorldState.getFactionRep(faction);
        if (rep >= 100) return 5; // 崇拜
        if (rep >= 70) return 4;  // 尊敬
        if (rep >= 40) return 3;  // 友好
        if (rep >= 10) return 2;  // 中立
        if (rep >= -20) return 1; // 冷淡
        return 0; // 敌对
    },

    getFactionLevelName: function(faction) {
        const level = this.getFactionLevel(faction);
        const names = ['敌对', '冷淡', '中立', '友好', '尊敬', '崇拜'];
        return names[level] || '未知';
    },

    // 显示阵营选择界面
    showFactionChoice: function() {
        const content = `
            <div class="faction-choice">
                <h4>选择你的阵营</h4>
                <p>流浪者看着你，等待你的决定...</p>
                <div class="faction-options">
                    <div class="faction-option cannibal" onclick="npcSystem.chooseFaction('cannibal')">
                        <h4>食人族部落</h4>
                        <p>加入食人族，获得强大的近战力量。</p>
                        <p class="faction-bonus">+5 攻击力，解锁食人族部落地图</p>
                        <p class="faction-penalty">无法进入魔法公会</p>
                    </div>
                    <div class="faction-option mage" onclick="npcSystem.chooseFaction('mage')">
                        <h4>魔法公会</h4>
                        <p>加入魔法公会，获得强大的魔法力量。</p>
                        <p class="faction-bonus">+5 魔法伤害，解锁魔法公会地图</p>
                        <p class="faction-penalty">无法进入食人族部落</p>
                    </div>
                </div>
            </div>
        `;

        showModal('阵营选择', content, [
            { text: '再想想', action: 'hideModal();' }
        ]);
    },

    // 选择阵营
    chooseFaction: function(faction) {
        player.faction = faction;

        // 记录阵营选择到世界状态
        if (typeof WorldState !== "undefined") {
            WorldState.changeFactionRep(faction, 20);
        }

        if (faction === 'cannibal') {
            player.attack += 5;
            showMessage('你加入了食人族部落！攻击力+5', 'success');
        } else if (faction === 'mage') {
            player.magicDamage += 5;
            showMessage('你加入了魔法公会！魔法伤害+5', 'success');
        }

        // 检查阵营地图解锁
        if (typeof mapSystem !== 'undefined') {
            mapSystem.checkUnlocks();
        }

        hideModal();
        updateUI();
    },

    // 显示对话
    showDialogue: function(npcId) {
        const npc = NPCS[npcId];
        if (!npc) return;

        // 记录NPC对话到世界状态
        if (typeof WorldState !== "undefined") {
            WorldState.recordNPCDialogue(npcId);
            this.recordNPCAction(npcId, 'talk');
        }

        // 根据阵营声望选择对话
        let dialogue = randomChoice(npc.dialogue);
        if (typeof WorldState !== "undefined" && player.faction) {
            const factionRep = WorldState.getFactionRep(player.faction);
            if (factionRep >= 50 && npc.factionDialogue && npc.factionDialogue[player.faction]) {
                dialogue = randomChoice(npc.factionDialogue[player.faction]);
            } else if (factionRep <= -20 && npc.hostileDialogue) {
                dialogue = randomChoice(npc.hostileDialogue);
            }
        }

        // 根据NPC关系选择对话
        if (typeof WorldState !== "undefined") {
            const relation = WorldState.getNPCRelation(npcId);
            if (relation >= 50 && npc.friendlyDialogue) {
                dialogue = randomChoice(npc.friendlyDialogue);
            } else if (relation <= -30 && npc.angryDialogue) {
                dialogue = randomChoice(npc.angryDialogue);
            }
        }

        let content = `
            <div class="npc-dialogue">
                <h4>${npc.name}</h4>
                <p class="dialogue-text">"${dialogue}"</p>
                <p class="npc-description">${npc.description}</p>
            </div>
        `;

        // 添加交互按钮
        const buttons = [];

        // 如果有交易选项
        if (npc.trades && npc.trades.length > 0) {
            buttons.push({
                text: '交易',
                action: `npcSystem.showTrades('${npcId}');`
            });
        }

        // 如果有解锁地图功能
        if (npc.unlockMap) {
            const isUnlocked = player.unlockedMaps.includes(npc.unlockMap);
            if (!isUnlocked) {
                buttons.push({
                    text: '解锁地图',
                    action: `npcSystem.unlockMap('${npcId}');`
                });
            } else {
                content += '<p class="info">地图已解锁</p>';
            }
        }

        buttons.push({
            text: '关闭',
            action: 'hideModal();'
        });

        showModal(npc.name, content, buttons);
    },

    // 显示交易界面
    // 获取交易折扣（好感度越高折扣越大）
    _getTradeDiscount: function(npcId) {
        if (typeof WorldState === 'undefined') return 1.0;
        const relation = WorldState.getNPCRelation(npcId);
        // 关系 -50~0: 无折扣
        // 关系 0~30: 5%折扣
        // 关系 30~60: 10%折扣
        // 关系 60~100: 20%折扣
        if (relation >= 60) return 0.8;
        if (relation >= 30) return 0.9;
        if (relation > 0) return 0.95;
        return 1.0;
    },

    showTrades: function(npcId) {
        const npc = NPCS[npcId];
        if (!npc || !npc.trades) return;

        const townLevel = (typeof WorldState !== "undefined") ? WorldState.state.townLevel : 1;
        let allTrades = [...npc.trades];
        if (npc.tieredTrades) {
            Object.entries(npc.tieredTrades).forEach(([tier, trades]) => {
                if (townLevel >= parseInt(tier)) allTrades = allTrades.concat(trades);
            });
        }

        let content = `
            <div class="trade-list">
                <h4>${npc.name}的交易</h4>
                <p>城镇等级: ${townLevel}</p>
        `;

        allTrades.forEach((trade, index) => {
            const canTrade = this.canTrade(npcId, index);
            const giveText = Object.entries(trade.give)
                .map(([itemId, amount]) => `${getItemName(itemId)}×${amount}`)
                .join(' + ');
            const receiveText = Object.entries(trade.receive)
                .map(([itemId, amount]) => {
                    if (itemId === 'map') return `解锁${amount}个地图`;
                    return `${getItemName(itemId)}×${amount}`;
                })
                .join(' + ');

            content += `
                <div class="trade-item ${canTrade ? '' : 'disabled'}">
                    <div class="trade-info">
                        <span class="trade-name">${trade.name}</span>
                        <span class="trade-give">需要: ${giveText}</span>
                        <span class="trade-receive">获得: ${receiveText}</span>
                    </div>
                    ${canTrade ? `<button class="trade-btn" onclick="npcSystem.trade('${npcId}', ${index}); npcSystem.showTrades('${npcId}');">交易</button>` : ''}
                </div>
            `;
        });

        content += '</div>';

        showModal('交易', content, [
            { text: '返回', action: `npcSystem.interact('${npcId}');` },
            { text: '关闭', action: 'hideModal();' }
        ]);
    },

    // 检查是否可以交易
    canTrade: function(npcId, tradeIndex) {
        const npc = NPCS[npcId];
        if (!npc) return false;

        const townLevel = (typeof WorldState !== 'undefined') ? WorldState.state.townLevel : 1;
        let allTrades = [...(npc.trades || [])];
        if (npc.tieredTrades) {
            Object.entries(npc.tieredTrades).forEach(([tier, trades]) => {
                if (townLevel >= parseInt(tier)) allTrades = allTrades.concat(trades);
            });
        }

        if (tradeIndex >= allTrades.length) return false;
        const trade = allTrades[tradeIndex];

        // 检查NPC关系 - 关系太差拒绝交易
        if (typeof WorldState !== 'undefined') {
            const relation = WorldState.getNPCRelation(npcId);
            if (relation < -50) {
                return false;
            }
        }

        // 检查给予的物品（考虑好感度折扣）
        const discount = this._getTradeDiscount(npcId);
        for (const [itemId, amount] of Object.entries(trade.give)) {
            const actualAmount = Math.max(1, Math.ceil(amount * discount));
            if (!hasItem(itemId, actualAmount)) {
                return false;
            }
        }

        // 检查背包空间
        for (const [itemId, amount] of Object.entries(trade.receive)) {
            if (itemId === 'map') continue;
            if (!isStackable(itemId) && player.inventory.length >= player.maxInventory) {
                return false;
            }
        }

        return true;
    },

    // 执行交易
    trade: function(npcId, tradeIndex) {
        const npc = NPCS[npcId];
        if (!npc) return false;

        const townLevel = (typeof WorldState !== 'undefined') ? WorldState.state.townLevel : 1;
        let allTrades = [...(npc.trades || [])];
        if (npc.tieredTrades) {
            Object.entries(npc.tieredTrades).forEach(([tier, trades]) => {
                if (townLevel >= parseInt(tier)) allTrades = allTrades.concat(trades);
            });
        }

        if (tradeIndex >= allTrades.length) return false;
        const trade = allTrades[tradeIndex];

        // 检查是否可以交易
        if (!this.canTrade(npcId, tradeIndex)) {
            showMessage('无法完成交易！', 'error');
            return false;
        }

        // 消耗给予的物品（考虑好感度折扣）
        const discount = this._getTradeDiscount(npcId);
        for (const [itemId, amount] of Object.entries(trade.give)) {
            const actualAmount = Math.max(1, Math.ceil(amount * discount));
            removeItemFromInventory(itemId, actualAmount);
        }

        // 获得接收的物品
        for (const [itemId, amount] of Object.entries(trade.receive)) {
            if (itemId === 'map') {
                // 解锁地图
                this.unlockRandomMaps(amount);
            } else {
                addItemToInventory(itemId, amount);
            }
        }

        if (typeof soundSystem !== 'undefined' && soundSystem.enabled) soundSystem.play('exchange');
        showMessage(`交易成功！获得了${trade.name}`, 'success');
        // 记录交易到世界状态
        if (typeof WorldState !== "undefined") {
            WorldState.changeNPCRelation(npcId, 2);
            WorldState.recordMerchantVisit(npcId);
        }
        // 成就统计
        if (typeof achievementSystem !== 'undefined') {
            achievementSystem.updateStat('tradesCompleted', 1);
        }
        // 任务进度
        if (typeof questSystem !== 'undefined') {
            questSystem.updateProgress('talk', npcId);
        }
        updateUI();
        return true;
    },

    // 解锁地图
    unlockMap: function(npcId) {
        const npc = NPCS[npcId];
        if (!npc || !npc.unlockMap) return;

        const mapId = npc.unlockMap;
        if (player.unlockedMaps.includes(mapId)) {
            showMessage('地图已解锁！', 'warning');
            return;
        }

        // 解锁地图
        unlockMap(mapId);
        showMessage(`${npc.name}告诉你${MAPS[mapId]?.name || mapId}的位置`, 'success');
        hideModal();
    },

    // 随机解锁地图
    unlockRandomMaps: function(count) {
        const lockedMaps = Object.keys(MAPS).filter(mapId =>
            !player.unlockedMaps.includes(mapId) &&
            MAPS[mapId].unlockCondition &&
            MAPS[mapId].unlockCondition.type === 'item' &&
            MAPS[mapId].unlockCondition.item === 'paper'
        );

        const mapsToUnlock = lockedMaps.slice(0, count);
        mapsToUnlock.forEach(mapId => {
            unlockMap(mapId);
        });

        if (mapsToUnlock.length > 0) {
            showMessage(`解锁了${mapsToUnlock.length}个新地图！`, 'success');
        }
    },

    // 显示NPC列表
    showNPCList: function() {
        const currentMap = mapSystem.currentMap;
        const npcsInMap = Object.entries(NPCS)
            .filter(([id, npc]) => npc.location === currentMap)
            .map(([id, npc]) => ({ id, ...npc }));

        if (npcsInMap.length === 0) {
            showMessage('这里没有NPC', 'info');
            return;
        }

        let content = '<div class="npc-list">';
        content += `<h4>${MAPS[currentMap]?.name || '当前地图'}的NPC</h4>`;

        npcsInMap.forEach(npc => {
            content += `
                <div class="npc-item">
                    <h4>${npc.name}</h4>
                    <p>${npc.description}</p>
                    <button class="modal-btn" onclick="npcSystem.interact('${npc.id}');">对话</button>
                </div>
            `;
        });

        content += '</div>';

        showModal('NPC列表', content, [
            { text: '关闭', action: 'hideModal();' }
        ]);
    },

    // 检查NPC是否在当前地图

    // 获取当前地图的NPC列表

    // 检查是否有可交易的NPC
};

// 初始化NPC系统
function initNPCSystem() {
    npcSystem.init();
}

// 注册到命名空间
if (typeof KBA !== 'undefined') {
    KBA.registerData('NPCS', NPCS);
    KBA.registerSystem('npcSystem', npcSystem);
}
