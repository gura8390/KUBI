// 随机事件系统文件

// 事件数据
const EVENTS = {
    // 正面事件
    luckyFind: {
        name: '幸运发现',
        description: '你在探索时发现了一些有用的物品！',
        type: 'positive',
        chance: 0.15,
        season: null, // 所有季节
        action: function() {
            const rewards = [
                { item: 'berry', count: randomInt(3, 8) },
                { item: 'water', count: randomInt(2, 5) },
                { item: 'wood', count: randomInt(5, 10) },
                { item: 'stone', count: randomInt(3, 6) },
                { item: 'herb', count: randomInt(2, 4) }
            ];
            const reward = randomChoice(rewards);
            addItemToInventory(reward.item, reward.count);
            showMessage(`🍀 幸运发现！获得了${getItemName(reward.item)}×${reward.count}`, 'success');
            return reward;
        }
    },

    merchantPassing: {
        name: '路过的商人',
        description: '一个商人路过，愿意与你交易。',
        type: 'neutral',
        chance: 0.1,
        season: null,
        action: function() {
            const trades = [
                { give: { berry: 5 }, receive: { gold: 3 }, name: '浆果换金币' },
                { give: { rawMeat: 3 }, receive: { gold: 5 }, name: '生肉换金币' },
                { give: { wood: 10 }, receive: { iron: 2 }, name: '木头换铁块' },
                { give: { water: 5 }, receive: { herb: 3 }, name: '水换草药' }
            ];
            const trade = randomChoice(trades);
            let canTrade = true;
            for (const [itemId, amount] of Object.entries(trade.give)) {
                if (!hasItem(itemId, amount)) {
                    canTrade = false;
                    break;
                }
            }

            if (canTrade) {
                for (const [itemId, amount] of Object.entries(trade.give)) {
                    removeItemFromInventory(itemId, amount);
                }
                for (const [itemId, amount] of Object.entries(trade.receive)) {
                    addItemToInventory(itemId, amount);
                }
                showMessage(`🤝 路过的商人：${trade.name}成功！`, 'success');
            } else {
                showMessage(`🤝 路过的商人想${trade.name}，但你材料不足`, 'info');
            }
            return trade;
        }
    },

    herbDiscovery: {
        name: '草药发现',
        description: '你发现了一片草药丛！',
        type: 'positive',
        chance: 0.12,
        season: 'spring',
        action: function() {
            const herbs = randomInt(3, 6);
            addItemToInventory('herb', herbs);
            showMessage(`🌿 发现草药丛！获得了草药×${herbs}`, 'success');
            return { item: 'herb', count: herbs };
        }
    },

    // 负面事件
    thiefAttack: {
        name: '小偷袭击',
        description: '一个小偷试图偷你的东西！',
        type: 'negative',
        chance: 0.08,
        season: null,
        action: function() {
            if (player.inventory.length > 0) {
                const randomIndex = Math.floor(Math.random() * player.inventory.length);
                const slot = player.inventory[randomIndex];
                const item = ITEMS[slot.id];
                const lostCount = Math.min(slot.count || 1, randomInt(1, 3));
                slot.count -= lostCount;
                if (slot.count <= 0) {
                    player.inventory.splice(randomIndex, 1);
                }
                showMessage(`🗡️ 小偷袭击！失去了${item.name}×${lostCount}`, 'error');
                return { item: slot.id, count: lostCount };
            } else {
                showMessage(`🗡️ 小偷袭击！但你没什么可偷的`, 'warning');
                return null;
            }
        }
    },

    badWeather: {
        name: '恶劣天气',
        description: '突然下起了大雨！',
        type: 'negative',
        chance: 0.1,
        season: null,
        action: function() {
            const staminaLoss = randomInt(5, 15);
            player.stamina = Math.max(0, player.stamina - staminaLoss);
            showMessage(`🌧️ 恶劣天气！体力-${staminaLoss}`, 'warning');
            return { staminaLoss };
        }
    },

    illness: {
        name: '生病',
        description: '你感觉不舒服...',
        type: 'negative',
        chance: 0.06,
        season: 'winter',
        action: function() {
            const healthLoss = randomInt(10, 20);
            const staminaLoss = randomInt(10, 15);
            player.health = Math.max(0, player.health - healthLoss);
            player.stamina = Math.max(0, player.stamina - staminaLoss);
            showMessage(`🤒 生病了！生命-${healthLoss}，体力-${staminaLoss}`, 'error');
            return { healthLoss, staminaLoss };
        }
    },

    // 季节性事件
    springRain: {
        name: '春雨',
        description: '春雨带来了清新的空气。',
        type: 'positive',
        chance: 0.2,
        season: 'spring',
        action: function() {
            const waterGain = randomInt(3, 6);
            addItemToInventory('water', waterGain);
            player.thirst = Math.min(100, player.thirst + 10);
            showMessage(`🌧️ 春雨！获得了水×${waterGain}，水分+10`, 'success');
            return { item: 'water', count: waterGain };
        }
    },

    summerHeat: {
        name: '酷暑',
        description: '天气太热了！',
        type: 'negative',
        chance: 0.15,
        season: 'summer',
        action: function() {
            const tempIncrease = randomInt(3, 8);
            player.temperature = Math.min(42, player.temperature + tempIncrease);
            const thirstLoss = randomInt(10, 20);
            player.thirst = Math.max(0, player.thirst - thirstLoss);
            showMessage(`☀️ 酷暑！体温+${tempIncrease}°C，水分-${thirstLoss}`, 'warning');
            return { tempIncrease, thirstLoss };
        }
    },

    autumnHarvest: {
        name: '秋收',
        description: '秋天是收获的季节！',
        type: 'positive',
        chance: 0.2,
        season: 'autumn',
        action: function() {
            const wheatGain = randomInt(3, 8);
            const berryGain = randomInt(2, 5);
            addItemToInventory('wheat', wheatGain);
            addItemToInventory('berry', berryGain);
            showMessage(`🍂 秋收！获得了小麦×${wheatGain}，浆果×${berryGain}`, 'success');
            return { wheat: wheatGain, berry: berryGain };
        }
    },

    winterBlizzard: {
        name: '暴风雪',
        description: '暴风雪来了！',
        type: 'negative',
        chance: 0.12,
        season: 'winter',
        action: function() {
            const tempDecrease = randomInt(5, 10);
            player.temperature = Math.max(30, player.temperature - tempDecrease);
            const staminaLoss = randomInt(15, 25);
            player.stamina = Math.max(0, player.stamina - staminaLoss);
            showMessage(`❄️ 暴风雪！体温-${tempDecrease}°C，体力-${staminaLoss}`, 'error');
            return { tempDecrease, staminaLoss };
        }
    },

    // 特殊事件
    mysteriousStranger: {
        name: '神秘陌生人',
        description: '一个神秘的陌生人出现了...',
        type: 'special',
        chance: 0.03,
        season: null,
        action: function() {
            const outcomes = [
                () => {
                    const goldGain = randomInt(10, 30);
                    addItemToInventory('gold', goldGain);
                    showMessage(`🎩 神秘陌生人给了你金币×${goldGain}！`, 'success');
                    return { gold: goldGain };
                },
                () => {
                    player.health = Math.min(100, player.health + 30);
                    player.stamina = Math.min(100, player.stamina + 30);
                    showMessage(`🎩 神秘陌生人治愈了你！生命+30，体力+30`, 'success');
                    return { healed: true };
                },
                () => {
                    showMessage(`🎩 神秘陌生人消失了...`, 'info');
                    return null;
                }
            ];
            const outcome = randomChoice(outcomes);
            return outcome();
        }
    },

    animalMigration: {
        name: '动物迁徙',
        description: '一群动物经过这里！',
        type: 'positive',
        chance: 0.08,
        season: 'autumn',
        action: function() {
            const meatGain = randomInt(5, 12);
            const furGain = randomInt(2, 5);
            addItemToInventory('rawMeat', meatGain);
            addItemToInventory('fur', furGain);
            showMessage(`🦌 动物迁徙！获得了生肉×${meatGain}，毛皮×${furGain}`, 'success');
            return { rawMeat: meatGain, fur: furGain };
        }
    },

    abandonedCamp: {
        name: '废弃营地',
        description: '你发现了一个废弃的营地！',
        type: 'positive',
        chance: 0.06,
        season: null,
        action: function() {
            const rewards = [
                { item: 'wood', count: randomInt(5, 15) },
                { item: 'stone', count: randomInt(3, 8) },
                { item: 'iron', count: randomInt(1, 3) },
                { item: 'parts', count: randomInt(1, 2) },
                { item: 'bread', count: randomInt(2, 5) }
            ];
            const reward = randomChoice(rewards);
            addItemToInventory(reward.item, reward.count);
            showMessage(`🏕️ 废弃营地！获得了${getItemName(reward.item)}×${reward.count}`, 'success');
            return reward;
        }
    },

    winterSun: {
        name: '冬日暖阳',
        description: '难得的冬日暖阳',
        type: 'positive',
        chance: 0.08,
        season: 'winter',
        action: function() {
            player.temperature = Math.min(40, player.temperature + 2);
            player.sanity = Math.min(100, player.sanity + 10);
            player.stamina = Math.min(100, player.stamina + 5);
            showMessage('冬日暖阳！体温+2，精神+10，体力+5', 'success');
            return true;
        }
    },
    explorationFind: {
        name: '探索发现',
        description: '你发现了隐藏的资源！',
        type: 'positive',
        chance: 0.1,
        season: null,
        action: function() {
            const finds = [
                { item: 'herb', count: randomInt(2, 5) },
                { item: 'iron', count: randomInt(1, 3) },
                { item: 'silk', count: randomInt(1, 2) }
            ];
            const find = randomChoice(finds);
            addItemToInventory(find.item, find.count);
            showMessage('探索发现！获得了' + getItemName(find.item) + 'x' + find.count, 'success');
            return true;
        }
    },
    monsterRaid: {
        name: '怪物入侵',
        description: '一群怪物袭击了你的营地！',
        type: 'negative',
        chance: 0.06,
        season: 'winter',
        action: function() {
            const damage = randomInt(10, 25);
            player.health = Math.max(1, player.health - damage);
            showMessage('怪物入侵！生命-' + damage, 'error');
            return false;
        }
    }
};

// 事件系统
const eventSystem = {
    // 初始化事件系统
    init: function() {
this.lastEventTime = 0;
        this.eventCooldown = 5; // 事件冷却时间（游戏内小时）
    },

    // 检查并触发事件
    checkEvents: function() {
        // 检查冷却时间
        const currentTime = player.gameTime.day * 24 + player.gameTime.hour;
        if (currentTime - this.lastEventTime < this.eventCooldown) {
            return;
        }

        // 遍历所有事件
        for (const [eventId, event] of Object.entries(EVENTS)) {
            if (event.season && event.season !== player.gameTime.season) continue;
            if (Math.random() < event.chance) {
                const result = event.action();
                this.lastEventTime = currentTime;
                addLogEntry(`事件: ${event.name}`, result ? 'log-gain' : 'log-cost');
                break;
            }
        }
    },

    // 显示事件历史
    showEventHistory: function() {
        let content = '<div class="event-history">';
        content += '<h4>📜 事件记录</h4>';

        const recentEvents = gameLog.filter(entry => entry.text.startsWith('事件:'));
        if (recentEvents.length === 0) {
            content += '<p>暂无事件记录</p>';
        } else {
            recentEvents.slice(0, 10).forEach(event => {
                content += `<div class="event-entry">${event.text}</div>`;
            });
        }

        content += '</div>';

        showModal('事件记录', content, [
            { text: '关闭', action: 'hideModal();' }
        ]);
    },

    // 获取当前季节可触发的事件
};

// 初始化事件系统
function initEventSystem() {
    eventSystem.init();
}

// 注册到命名空间
if (typeof KBA !== 'undefined') {
    KBA.registerSystem('events', eventSystem);
    KBA.registerData('EVENTS', EVENTS);
}
