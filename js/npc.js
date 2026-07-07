// NPC和交易系统文件

// NPC数据
const NPCS = {
    farmer: {
        name: '农场主',
        description: '小镇的农场主，可以用小麦交换种子。',
        location: 'town',
        dialogue: [
            '你好，冒险者！我这里有多余的种子，你需要吗？',
            '用12个小麦就可以换30个种子哦！',
            '种田是生存的基础，好好利用这些种子吧。'
        ],
        trades: [
            { give: { wheat: 12 }, receive: { seed: 30 }, name: '小麦换种子' }
        ]
    },
    miner: {
        name: '矿队',
        description: '小镇的矿队，可以开启矿洞地图。',
        location: 'town',
        dialogue: [
            '我们发现了新的矿洞！',
            '想要去挖矿吗？我可以带你去。',
            '矿洞里有丰富的铁矿资源。'
        ],
        unlockMap: 'mine'
    },
    merchant: {
        name: '商人',
        description: '小镇的商人，可以交易各种物品。',
        location: 'town',
        dialogue: [
            '欢迎光临！我这里有很多好东西。',
            '想要什么？尽管说！',
            '做生意讲究的是诚信。'
        ],
        trades: [
            { give: { berry: 5 }, receive: { rawMeat: 3 }, name: '浆果换生肉' },
            { give: { rawMeat: 3 }, receive: { water: 5 }, name: '生肉换水' },
            { give: { gold: 5 }, receive: { berry: 10 }, name: '购买浆果' },
            { give: { gold: 8 }, receive: { rawMeat: 5 }, name: '购买生肉' },
            { give: { gold: 10 }, receive: { wood: 10 }, name: '购买木头' }
        ]
    },
    mayor: {
        name: '镇长',
        description: '小镇的镇长，可以开启贼窝地图。',
        location: 'town',
        dialogue: [
            '冒险者，你来得正好。',
            '最近强盗猖獗，你能帮忙清剿吗？',
            '贼窝的位置我可以告诉你。'
        ],
        unlockMap: 'banditDen'
    },
    elder: {
        name: '长者',
        description: '溪流的长者，可以用纸张解锁新地图。',
        location: 'creek',
        dialogue: [
            '年轻人，你想探索更多的地方吗？',
            '给我12张纸，我可以告诉你4个新地点。',
            '这些地方有很多资源等你去发现。'
        ],
        trades: [
            { give: { paper: 12 }, receive: { map: 4 }, name: '解锁4个新地图' }
        ]
    },
    powderMerchant: {
        name: '火药商人',
        description: '死亡山谷的商人，交易硝石和火药。',
        location: 'deathValley',
        dialogue: [
            '需要火药材料吗？',
            '我这里有硝石，价格公道。',
            '小心使用火药，威力很大！'
        ],
        trades: [
            { give: { gold: 10 }, receive: { nitre: 5 }, name: '购买硝石' }
        ]
    },
    waterMerchant: {
        name: '卖水商人',
        description: '专门卖水的商人。',
        location: 'town',
        dialogue: [
            '口渴了吗？我这里有水。',
            '用食物就可以换水哦！',
            '水是生命之源，多备一些。'
        ],
        trades: [
            { give: { rawMeat: 2 }, receive: { water: 5 }, name: '肉换水' },
            { give: { berry: 3 }, receive: { water: 3 }, name: '浆果换水' }
        ]
    },
    seedMerchant: {
        name: '种子商贩',
        description: '专门卖种子的商人。',
        location: 'town',
        dialogue: [
            '需要种子吗？',
            '我这里有各种种子。',
            '种下去，收获更多！'
        ],
        trades: [
            { give: { gold: 5 }, receive: { seed: 10 }, name: '购买种子' },
            { give: { gold: 10 }, receive: { wheat: 10 }, name: '购买小麦' }
        ]
    },
    woodMerchant: {
        name: '伐木工',
        description: '专门卖木头的商人。',
        location: 'town',
        dialogue: [
            '需要木头吗？',
            '我砍了很多木头，可以卖给你。',
            '木头是建造的基础材料。'
        ],
        trades: [
            { give: { gold: 5 }, receive: { wood: 10 }, name: '购买木头' }
        ]
    },
    soupMerchant: {
        name: '热汤商人',
        description: '冬季救援队，低价换热汤。',
        location: 'town',
        dialogue: [
            '冬天来了，需要热汤保暖吗？',
            '我可以低价提供热汤。',
            '暖暖身子，别冻坏了。'
        ],
        trades: [
            { give: { rawMeat: 1 }, receive: { hotSoup: 2 }, name: '肉换热汤' },
            { give: { water: 1 }, receive: { hotSoup: 1 }, name: '水换热汤' }
        ],
        season: 'winter'
    },
    wanderer: { name: '流浪者', description: '神秘的流浪者', location: 'quietForest', dialogue: ['你走到了很远的地方', '前方有两条路', '食人族或法师？'], factionChoice: true },
    herbMaster: { name: '采药人', description: '酸沼泽采药老人', location: 'acidSwamp', dialogue: ['沼泽草药品质极佳', '小心酸性气泡', '草药换药剂'], trades: [{ give: { herb: 5 }, receive: { healthPotion: 2 }, name: '草药换药剂' }, { give: { nitre: 3 }, receive: { gold: 5 }, name: '收购硝石' }] },
    mineWorker: { name: '矿工老王', description: '经验丰富的老矿工', location: 'mine', dialogue: ['矿洞深处有好东西', '铁矿是装备基础', '给我食物换矿石'], trades: [{ give: { bread: 3 }, receive: { iron: 5 }, name: '面包换铁矿' }, { give: { meatSoup: 2 }, receive: { parts: 3 }, name: '肉汤换零件' }] },
    spiderHunter: { name: '蜘蛛猎人', description: '猎杀蜘蛛的冒险者', location: 'spiderCave', dialogue: ['蜘蛛丝是好材料', '小心蜘蛛女王', '教你处理蜘蛛丝'], trades: [{ give: { silk: 3 }, receive: { gold: 8 }, name: '收购丝绸' }, { give: { spiderEgg: 2 }, receive: { herb: 5 }, name: '蜘蛛蛋换草药' }] },
    cannibalQuartermaster: { name: '食人族军需官', description: '食人族物资管理员', location: 'cannibalTribe', dialogue: ['欢迎加入战士', '战利品换武器', '荣耀与你同在'], trades: [{ give: { boneClub: 2, gold: 10 }, receive: { ironSword: 1 }, name: '骨棒换铁剑' }] },
    mageMentor: { name: '法师导师', description: '法师阵营导师', location: 'mageGuild', dialogue: ['欢迎来到公会', '魔法源于知识', '材料换装备'], trades: [{ give: { lightDust: 5, darkDust: 3, gold: 15 }, receive: { enchantedStaff: 1 }, name: '光尘换附魔杖' }] },
    eggMerchant: { name: '鸡蛋商人', description: '卖鸡蛋的商人', location: 'town', dialogue: ['新鲜鸡蛋', '营养丰富', '买些吧'], trades: [{ give: { gold: 2 }, receive: { egg: 3 }, name: '买鸡蛋' }] },
    milkMerchant: { name: '牛奶商人', description: '卖牛奶的商人', location: 'town', dialogue: ['新鲜牛奶', '可做奶酪黄油', '每天买一些'], trades: [{ give: { gold: 2 }, receive: { milk: 3 }, name: '买牛奶' }] }
};

// NPC系统
const npcSystem = {
    init: function() {},
    // 初始化NPC系统

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

        // 随机选择对话
        const dialogue = randomChoice(npc.dialogue);

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
    showTrades: function(npcId) {
        const npc = NPCS[npcId];
        if (!npc || !npc.trades) return;

        let content = `
            <div class="trade-list">
                <h4>${npc.name}的交易</h4>
        `;

        npc.trades.forEach((trade, index) => {
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
        if (!npc || !npc.trades || tradeIndex >= npc.trades.length) return false;

        const trade = npc.trades[tradeIndex];

        // 检查给予的物品
        for (const [itemId, amount] of Object.entries(trade.give)) {
            if (!hasItem(itemId, amount)) {
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
        if (!npc || !npc.trades || tradeIndex >= npc.trades.length) return false;

        const trade = npc.trades[tradeIndex];

        // 检查是否可以交易
        if (!this.canTrade(npcId, tradeIndex)) {
            showMessage('无法完成交易！', 'error');
            return false;
        }

        // 消耗给予的物品
        for (const [itemId, amount] of Object.entries(trade.give)) {
            removeItemFromInventory(itemId, amount);
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
    getNPCsInCurrentMap: function() {
        const currentMap = mapSystem.currentMap;
        return Object.entries(NPCS)
            .filter(([id, npc]) => npc.location === currentMap)
            .map(([id, npc]) => ({ id, ...npc }));
    },

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
