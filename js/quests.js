// 任务系统文件

// 任务数据
const QUESTS = {
    // 主线任务
    main_001: {
        name: '初来乍到',
        description: '收集基础资源，建造你的第一个营地。',
        type: 'main',
        chapter: 1,
        objectives: [
            { type: 'collect', item: 'wood', amount: 10, description: '收集10个木头' },
            { type: 'collect', item: 'stone', amount: 5, description: '收集5个石头' },
            { type: 'build', building: 'bed', description: '建造一张床' }
        ],
        rewards: {
            items: { bread: 5, water: 5 },
            experience: 50
        },
        unlockCondition: null,
        status: 'active'
    },

    main_002: {
        name: '生存基础',
        description: '学会烹饪，填饱肚子。',
        type: 'main',
        chapter: 1,
        objectives: [
            { type: 'build', building: 'cooker', description: '建造炊具' },
            { type: 'craft', item: 'bread', amount: 3, description: '制作3个面包' },
            { type: 'craft', item: 'meatSoup', amount: 2, description: '制作2个肉汤' }
        ],
        rewards: {
            items: { herb: 10, flower: 5 },
            experience: 80
        },
        unlockCondition: 'main_001',
        status: 'locked'
    },

    main_003: {
        name: '探索小镇',
        description: '前往小镇，结识那里的居民。',
        type: 'main',
        chapter: 2,
        objectives: [
            { type: 'collect', item: 'berry', amount: 8, description: '收集8个浆果' },
            { type: 'visit', map: 'town', description: '前往小镇' },
            { type: 'talk', npc: 'farmer', description: '与农场主对话' },
            { type: 'talk', npc: 'merchant', description: '与商人对话' }
        ],
        rewards: {
            items: { seed: 20, wheat: 10 },
            experience: 120
        },
        unlockCondition: 'main_002',
        status: 'locked'
    },

    main_004: {
        name: '资源循环',
        description: '建立稳定的资源产出系统。',
        type: 'main',
        chapter: 2,
        objectives: [
            { type: 'build', building: 'well', description: '建造水井' },
            { type: 'build', building: 'field', description: '建造田地' },
            { type: 'build', building: 'trap', description: '建造陷阱' }
        ],
        rewards: {
            items: { iron: 5, parts: 3 },
            experience: 150
        },
        unlockCondition: 'main_003',
        status: 'locked'
    },

    main_005: {
        name: '冬季准备',
        description: '秋天到了，准备过冬物资。',
        type: 'main',
        chapter: 3,
        objectives: [
            { type: 'collect', item: 'wood', amount: 50, description: '收集50个木头' },
            { type: 'collect', item: 'water', amount: 30, description: '收集30个水' },
            { type: 'build', building: 'firePit', description: '建造火坑' }
        ],
        rewards: {
            items: { hotSoup: 10, fur: 5 },
            experience: 200
        },
        unlockCondition: 'main_004',
        status: 'locked'
    },

    main_006: {
        name: '深入探索',
        description: '解锁更多地图，发现新资源。',
        type: 'main',
        chapter: 3,
        objectives: [
            { type: 'collect', item: 'paper', amount: 12, description: '制作12张纸' },
            { type: 'talk', npc: 'elder', description: '与长者对话' },
            { type: 'visit', map: 'ancientRuin', description: '探索古老废墟' }
        ],
        rewards: {
            items: { parts: 5, iron: 8 },
            experience: 250
        },
        unlockCondition: 'main_005',
        status: 'locked'
    },

    main_007: {
        name: '阵营选择',
        description: '在食人族和法师之间做出选择。',
        type: 'main',
        chapter: 4,
        objectives: [
            { type: 'visit', map: 'quietForest', description: '前往静谧森林' },
            { type: 'talk', npc: 'wanderer', description: '与流浪者对话' },
            { type: 'choose', choice: 'faction', description: '选择阵营' }
        ],
        rewards: {
            items: { gold: 20 },
            experience: 300
        },
        unlockCondition: 'main_006',
        status: 'locked'
    },

    main_008: {
        name: '地牢挑战',
        description: '挑战地牢，获取灵魂力量。',
        type: 'main',
        chapter: 5,
        objectives: [
            { type: 'craft', item: 'dungeonKey', amount: 1, description: '制作地牢钥匙' },
            { type: 'dungeon', floor: 5, description: '到达地牢第5层' },
            { type: 'collect', item: 'soul', amount: 50, description: '收集50个灵魂' }
        ],
        rewards: {
            items: { gearHammer: 1, healthPotion: 5 },
            experience: 500
        },
        unlockCondition: 'main_007',
        status: 'locked'
    },

    // 支线任务
    side_001: {
        name: '猎人的请求',
        description: '帮助猎人收集毛皮。',
        type: 'side',
        objectives: [
            { type: 'collect', item: 'fur', amount: 10, description: '收集10个毛皮' }
        ],
        rewards: {
            items: { rawMeat: 15, wing: 5 },
            experience: 60
        },
        unlockCondition: null,
        status: 'active'
    },

    side_002: {
        name: '药剂师的材料',
        description: '为药剂师收集草药。',
        type: 'side',
        objectives: [
            { type: 'collect', item: 'herb', amount: 15, description: '收集15个草药' },
            { type: 'collect', item: 'flower', amount: 10, description: '收集10个花' }
        ],
        rewards: {
            items: { healthPotion: 3, staminaPotion: 3, sanityPotion: 3 },
            experience: 80
        },
        unlockCondition: null,
        status: 'active'
    },

    side_003: {
        name: '铁匠的订单',
        description: '为铁匠收集铁矿。',
        type: 'side',
        objectives: [
            { type: 'collect', item: 'iron', amount: 20, description: '收集20个铁块' }
        ],
        rewards: {
            items: { gearHammer: 1 },
            experience: 100
        },
        unlockCondition: 'main_003',
        status: 'locked'
    },

    side_004: {
        name: '厨师的挑战',
        description: '制作一道高级料理。',
        type: 'side',
        objectives: [
            { type: 'craft', item: 'hamburger', amount: 5, description: '制作5个汉堡' },
            { type: 'craft', item: 'seafoodSoup', amount: 3, description: '制作3个海鲜汤' }
        ],
        rewards: {
            items: { megaBurger: 3, fruitWine: 3 },
            experience: 120
        },
        unlockCondition: 'main_002',
        status: 'locked'
    },

    side_005: {
        name: '探险家的委托',
        description: '探索所有基础地图。',
        type: 'side',
        objectives: [
            { type: 'visit', map: 'creek', description: '探索溪流' },
            { type: 'visit', map: 'deathValley', description: '探索死亡山谷' },
            { type: 'visit', map: 'acidSwamp', description: '探索酸沼泽' },
            { type: 'visit', map: 'ancientRuin', description: '探索古老废墟' }
        ],
        rewards: {
            items: { paper: 20, gold: 15 },
            experience: 150
        },
        unlockCondition: 'main_003',
        status: 'locked'
    },

    side_006: {
        name: '怪物猎人',
        description: '消灭各种怪物。',
        type: 'side',
        objectives: [
            { type: 'kill', monster: 'bear', amount: 3, description: '消灭3只灰熊' },
            { type: 'kill', monster: 'ghostWolf', amount: 5, description: '消灭5只鬼狼' },
            { type: 'kill', monster: 'banditLeader', amount: 1, description: '消灭1个强盗头目' }
        ],
        rewards: {
            items: { giantHammer: 1, dragonArmor: 1 },
            experience: 200
        },
        unlockCondition: 'main_005',
        status: 'locked'
    },

    side_007: {
        name: '酿酒大师',
        description: '制作各种酒类。',
        type: 'side',
        objectives: [
            { type: 'craft', item: 'beer', amount: 5, description: '制作5个啤酒' },
            { type: 'craft', item: 'fruitWine', amount: 3, description: '制作3个果酒' },
            { type: 'craft', item: 'strongRum', amount: 2, description: '制作2个极列朗姆' }
        ],
        rewards: {
            items: { warmWine: 5, iceWine: 5 },
            experience: 100
        },
        unlockCondition: 'main_004',
        status: 'locked'
    },

    side_008: {
        name: '收藏家',
        description: '收集各种稀有物品。',
        type: 'side',
        objectives: [
            { type: 'collect', item: 'spiderQueenHead', amount: 1, description: '收集1个蛛后之首' },
            { type: 'collect', item: 'ironStatue', amount: 1, description: '收集1个铁像' },
            { type: 'collect', item: 'mysteriousPot', amount: 1, description: '收集1个神秘壶' }
        ],
        rewards: {
            items: { dragonBone: 3, dragonScale: 3 },
            experience: 300
        },
        unlockCondition: 'main_006',
        status: 'locked'
    },

    // 每日任务
    daily_001: {
        name: '日常采集',
        description: '每天收集一些基础资源。',
        type: 'daily',
        objectives: [
            { type: 'collect', item: 'wood', amount: 10, description: '收集10个木头' },
            { type: 'collect', item: 'stone', amount: 5, description: '收集5个石头' }
        ],
        rewards: {
            items: { bread: 3, water: 3 },
            experience: 20
        },
        unlockCondition: null,
        status: 'active',
        resetDaily: true
    },

    daily_002: {
        name: '日常狩猎',
        description: '每天狩猎获取食物。',
        type: 'daily',
        objectives: [
            { type: 'collect', item: 'rawMeat', amount: 5, description: '收集5个生肉' }
        ],
        rewards: {
            items: { berry: 5, herb: 3 },
            experience: 25
        },
        unlockCondition: null,
        status: 'active',
        resetDaily: true
    },

    daily_003: {
        name: '日常烹饪',
        description: '每天制作一些食物。',
        type: 'daily',
        objectives: [
            { type: 'craft', item: 'bread', amount: 3, description: '制作3个面包' }
        ],
        rewards: {
            items: { seed: 5, flower: 3 },
            experience: 15
        },
        unlockCondition: 'main_002',
        status: 'locked',
        resetDaily: true
    }
};

// 任务系统
const questSystem = {
    // 初始化任务系统
    init: function() {
        console.log('任务系统初始化完成');
        this.activeQuests = [];
        this.completedQuests = [];
        this.questLog = [];

        // 激活初始任务
        Object.entries(QUESTS).forEach(([questId, quest]) => {
            if (quest.status === 'active') {
                this.activeQuests.push(questId);
            }
        });
    },

    // 检查任务解锁
    checkUnlocks: function() {
        Object.entries(QUESTS).forEach(([questId, quest]) => {
            if (quest.status === 'locked' && quest.unlockCondition) {
                if (this.completedQuests.includes(quest.unlockCondition)) {
                    quest.status = 'active';
                    this.activeQuests.push(questId);
                    showMessage(`📋 新任务解锁: ${quest.name}`, 'info');
                }
            }
        });
    },

    // 更新任务进度
    updateProgress: function(type, target, amount = 1) {
        this.activeQuests.forEach(questId => {
            const quest = QUESTS[questId];
            if (!quest) return;

            quest.objectives.forEach(objective => {
                if (objective.type === type && !objective.completed) {
                    if (objective.item === target || objective.building === target ||
                        objective.npc === target || objective.map === target ||
                        objective.monster === target || objective.choice === target) {
                        objective.current = (objective.current || 0) + amount;
                        if (objective.current >= (objective.amount || 1)) {
                            objective.completed = true;
                            showMessage(`✅ 任务目标完成: ${objective.description}`, 'success');
                        }
                    }
                }
            });

            // 检查任务是否完成
            this.checkQuestCompletion(questId);
        });
    },

    // 检查任务完成
    checkQuestCompletion: function(questId) {
        const quest = QUESTS[questId];
        if (!quest) return;

        const allCompleted = quest.objectives.every(obj => obj.completed);
        if (allCompleted && !this.completedQuests.includes(questId)) {
            this.completeQuest(questId);
        }
    },

    // 完成任务
    completeQuest: function(questId) {
        const quest = QUESTS[questId];
        if (!quest) return;

        // 发放奖励
        if (quest.rewards.items) {
            Object.entries(quest.rewards.items).forEach(([itemId, amount]) => {
                addItemToInventory(itemId, amount);
            });
        }

        // 添加经验
        if (quest.rewards.experience) {
            // 经验系统待实现
            console.log(`获得经验: ${quest.rewards.experience}`);
        }

        // 更新状态
        quest.status = 'completed';
        this.activeQuests = this.activeQuests.filter(id => id !== questId);
        this.completedQuests.push(questId);
        if (typeof EventBus !== "undefined") EventBus.emit("quest:completed", { questId: questId });
        if (typeof GameLogger !== "undefined") GameLogger.quest("完成任务");

        // 记录日志
        this.questLog.push({
            questId,
            name: quest.name,
            completedAt: player.gameTime.day,
            type: quest.type
        });

        showMessage(`🎉 任务完成: ${quest.name}`, 'success');

        // 检查新任务解锁
        this.checkUnlocks();
    },

    // 显示任务列表
    showQuestList: function() {
        let content = '<div class="quest-list">';
        content += '<h4>📋 任务列表</h4>';

        // 主线任务
        const mainQuests = this.activeQuests.filter(id => QUESTS[id]?.type === 'main');
        if (mainQuests.length > 0) {
            content += '<h5>主线任务</h5>';
            mainQuests.forEach(questId => {
                content += this.renderQuest(questId);
            });
        }

        // 支线任务
        const sideQuests = this.activeQuests.filter(id => QUESTS[id]?.type === 'side');
        if (sideQuests.length > 0) {
            content += '<h5>支线任务</h5>';
            sideQuests.forEach(questId => {
                content += this.renderQuest(questId);
            });
        }

        // 每日任务
        const dailyQuests = this.activeQuests.filter(id => QUESTS[id]?.type === 'daily');
        if (dailyQuests.length > 0) {
            content += '<h5>每日任务</h5>';
            dailyQuests.forEach(questId => {
                content += this.renderQuest(questId);
            });
        }

        if (this.activeQuests.length === 0) {
            content += '<p>暂无进行中的任务</p>';
        }

        content += '</div>';

        showModal('任务列表', content, [
            { text: '关闭', action: 'hideModal();' }
        ]);
    },

    // 渲染单个任务
    renderQuest: function(questId) {
        const quest = QUESTS[questId];
        if (!quest) return '';

        let html = `<div class="quest-item ${quest.type}">`;
        html += `<div class="quest-header">`;
        html += `<span class="quest-name">${quest.name}</span>`;
        html += `<span class="quest-type-badge">${this.getQuestTypeBadge(quest.type)}</span>`;
        html += `</div>`;
        html += `<p class="quest-description">${quest.description}</p>`;
        html += `<div class="quest-objectives">`;

        quest.objectives.forEach(obj => {
            const progress = obj.current || 0;
            const target = obj.amount || 1;
            const isCompleted = obj.completed;
            const progressPercent = Math.min(100, (progress / target) * 100);

            html += `<div class="objective ${isCompleted ? 'completed' : ''}">`;
            html += `<span class="objective-icon">${isCompleted ? '✅' : '⬜'}</span>`;
            html += `<span class="objective-text">${obj.description}</span>`;
            if (obj.amount) {
                html += `<span class="objective-progress">${progress}/${target}</span>`;
            }
            html += `</div>`;
        });

        html += `</div>`;
        html += `<div class="quest-rewards">`;
        html += `<span class="rewards-label">奖励:</span>`;

        if (quest.rewards.items) {
            Object.entries(quest.rewards.items).forEach(([itemId, amount]) => {
                html += `<span class="reward-item">${getItemIcon(itemId)} ${getItemName(itemId)}×${amount}</span>`;
            });
        }

        html += `</div>`;
        html += `</div>`;

        return html;
    },

    // 获取任务类型徽章
    getQuestTypeBadge: function(type) {
        const badges = {
            main: '📖 主线',
            side: '📜 支线',
            daily: '🔄 每日'
        };
        return badges[type] || type;
    },

    // 显示任务详情
    showQuestDetail: function(questId) {
        const quest = QUESTS[questId];
        if (!quest) return;

        let content = '<div class="quest-detail">';
        content += `<h4>${quest.name}</h4>`;
        content += `<p class="quest-description">${quest.description}</p>`;

        content += '<div class="quest-objectives">';
        content += '<h5>任务目标</h5>';

        quest.objectives.forEach(obj => {
            const progress = obj.current || 0;
            const target = obj.amount || 1;
            const isCompleted = obj.completed;

            content += `<div class="objective ${isCompleted ? 'completed' : ''}">`;
            content += `<span class="objective-icon">${isCompleted ? '✅' : '⬜'}</span>`;
            content += `<span class="objective-text">${obj.description}</span>`;
            if (obj.amount) {
                content += `<span class="objective-progress">${progress}/${target}</span>`;
            }
            content += `</div>`;
        });

        content += '</div>';

        content += '<div class="quest-rewards">';
        content += '<h5>任务奖励</h5>';

        if (quest.rewards.items) {
            Object.entries(quest.rewards.items).forEach(([itemId, amount]) => {
                content += `<div class="reward-item">`;
                content += `<span class="reward-icon">${getItemIcon(itemId)}</span>`;
                content += `<span class="reward-name">${getItemName(itemId)}</span>`;
                content += `<span class="reward-amount">×${amount}</span>`;
                content += `</div>`;
            });
        }

        if (quest.rewards.experience) {
            content += `<div class="reward-item">`;
            content += `<span class="reward-icon">⭐</span>`;
            content += `<span class="reward-name">经验</span>`;
            content += `<span class="reward-amount">+${quest.rewards.experience}</span>`;
            content += `</div>`;
        }

        content += '</div>';
        content += '</div>';

        showModal('任务详情', content, [
            { text: '关闭', action: 'hideModal();' }
        ]);
    },

    // 获取当前活跃任务
    getActiveQuests: function() {
        return this.activeQuests.map(id => ({ id, ...QUESTS[id] }));
    },

    // 获取已完成任务
    getCompletedQuests: function() {
        return this.completedQuests.map(id => ({ id, ...QUESTS[id] }));
    },

    // 检查任务是否完成
    isQuestCompleted: function(questId) {
        return this.completedQuests.includes(questId);
    },

    // 获取任务进度
    getQuestProgress: function(questId) {
        const quest = QUESTS[questId];
        if (!quest) return 0;

        const completedObjectives = quest.objectives.filter(obj => obj.completed).length;
        return Math.floor((completedObjectives / quest.objectives.length) * 100);
    }
};

// 初始化任务系统
function initQuestSystem() {
    questSystem.init();
}

// 注册到命名空间
if (typeof KBA !== 'undefined') {
    KBA.registerSystem('quests', questSystem);
    KBA.registerData('QUESTS', QUESTS);
}
