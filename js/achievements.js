// 成就系统文件

// 成就数据
const ACHIEVEMENTS = {
    // 生存成就
    survivor_001: {
        name: '初来乍到',
        description: '活过第一天',
        icon: '🌅',
        category: 'survival',
        condition: { type: 'survive', days: 1 },
        reward: { items: { bread: 3, water: 3 } },
        unlocked: false
    },

    survivor_002: {
        name: '生存新手',
        description: '活过7天',
        icon: '📅',
        category: 'survival',
        condition: { type: 'survive', days: 7 },
        reward: { items: { healthPotion: 2, staminaPotion: 2 } },
        unlocked: false
    },

    survivor_003: {
        name: '生存专家',
        description: '活过30天',
        icon: '🏆',
        category: 'survival',
        condition: { type: 'survive', days: 30 },
        reward: { items: { gearHammer: 1, dragonArmor: 1 } },
        unlocked: false
    },

    survivor_004: {
        name: '生存大师',
        description: '活过100天',
        icon: '👑',
        category: 'survival',
        condition: { type: 'survive', days: 100 },
        reward: { items: { magicStaff: 1, lightHood: 1 } },
        unlocked: false
    },

    // 季节成就
    season_001: {
        name: '春天来了',
        description: '经历第一个春天',
        icon: '🌸',
        category: 'season',
        condition: { type: 'season', season: 'spring' },
        reward: { items: { seed: 20, flower: 10 } },
        unlocked: false
    },

    season_002: {
        name: '夏日炎炎',
        description: '经历第一个夏天',
        icon: '☀️',
        category: 'season',
        condition: { type: 'season', season: 'summer' },
        reward: { items: { iceDew: 10, coolPotion: 3 } },
        unlocked: false
    },

    season_003: {
        name: '秋高气爽',
        description: '经历第一个秋天',
        icon: '🍂',
        category: 'season',
        condition: { type: 'season', season: 'autumn' },
        reward: { items: { wheat: 20, berry: 15 } },
        unlocked: false
    },

    season_004: {
        name: '寒冬将至',
        description: '经历第一个冬天',
        icon: '❄️',
        category: 'season',
        condition: { type: 'season', season: 'winter' },
        reward: { items: { hotSoup: 10, fur: 5 } },
        unlocked: false
    },

    // 建造成就
    build_001: {
        name: '安家落户',
        description: '建造第一个建筑',
        icon: '🏠',
        category: 'building',
        condition: { type: 'build', count: 1 },
        reward: { items: { wood: 10, stone: 5 } },
        unlocked: false
    },

    build_002: {
        name: '建筑师',
        description: '建造5个建筑',
        icon: '🏗️',
        category: 'building',
        condition: { type: 'build', count: 5 },
        reward: { items: { iron: 5, parts: 3 } },
        unlocked: false
    },

    build_003: {
        name: '城市规划师',
        description: '建造所有建筑',
        icon: '🏙️',
        category: 'building',
        condition: { type: 'build', count: 11 },
        reward: { items: { gold: 50, dragonBone: 3, dragonScale: 3 } },
        unlocked: false
    },

    // 制作成就
    craft_001: {
        name: '初级工匠',
        description: '制作10个物品',
        icon: '🔨',
        category: 'crafting',
        condition: { type: 'craft', count: 10 },
        reward: { items: { parts: 5, iron: 3 } },
        unlocked: false
    },

    craft_002: {
        name: '中级工匠',
        description: '制作50个物品',
        icon: '⚒️',
        category: 'crafting',
        condition: { type: 'craft', count: 50 },
        reward: { items: { gearHammer: 1, healthPotion: 5 } },
        unlocked: false
    },

    craft_003: {
        name: '高级工匠',
        description: '制作100个物品',
        icon: '🔧',
        category: 'crafting',
        condition: { type: 'craft', count: 100 },
        reward: { items: { dragonArmor: 1, staminaPotion: 10 } },
        unlocked: false
    },

    // 烹饪成就
    cook_001: {
        name: '新手厨师',
        description: '烹饪10道菜',
        icon: '🍳',
        category: 'cooking',
        condition: { type: 'cook', count: 10 },
        reward: { items: { bread: 10, water: 10 } },
        unlocked: false
    },

    cook_002: {
        name: '中级厨师',
        description: '烹饪50道菜',
        icon: '👨‍🍳',
        category: 'cooking',
        condition: { type: 'cook', count: 50 },
        reward: { items: { megaBurger: 5, seafoodSoup: 5 } },
        unlocked: false
    },

    cook_003: {
        name: '大厨',
        description: '烹饪100道菜',
        icon: '🎖️',
        category: 'cooking',
        condition: { type: 'cook', count: 100 },
        reward: { items: { dragonScaleSoup: 3, magicBread: 5 } },
        unlocked: false
    },

    cook_004: {
        name: '酒神',
        description: '制作所有酒类',
        icon: '🍷',
        category: 'cooking',
        condition: { type: 'cookAll', category: 'alcohol' },
        reward: { items: { warmWine: 10, iceWine: 10 } },
        unlocked: false
    },

    // 战斗成就
    combat_001: {
        name: '初次战斗',
        description: '赢得第一场战斗',
        icon: '⚔️',
        category: 'combat',
        condition: { type: 'battle', count: 1 },
        reward: { items: { healthPotion: 3 } },
        unlocked: false
    },

    combat_002: {
        name: '战士',
        description: '赢得50场战斗',
        icon: '🛡️',
        category: 'combat',
        condition: { type: 'battle', count: 50 },
        reward: { items: { gearHammer: 1, staminaPotion: 5 } },
        unlocked: false
    },

    combat_003: {
        name: '勇士',
        description: '赢得100场战斗',
        icon: '🗡️',
        category: 'combat',
        condition: { type: 'battle', count: 100 },
        reward: { items: { giantHammer: 1, dragonArmor: 1 } },
        unlocked: false
    },

    combat_004: {
        name: '怪物猎人',
        description: '消灭所有类型的怪物',
        icon: '👹',
        category: 'combat',
        condition: { type: 'killAll' },
        reward: { items: { dragonBone: 5, dragonScale: 5, gold: 100 } },
        unlocked: false
    },

    // 探索成就
    explore_001: {
        name: '探索者',
        description: '访问5个不同的地图',
        icon: '🗺️',
        category: 'exploration',
        condition: { type: 'visit', count: 5 },
        reward: { items: { paper: 10, gold: 10 } },
        unlocked: false
    },

    explore_002: {
        name: '冒险家',
        description: '访问所有地图',
        icon: '🌍',
        category: 'exploration',
        condition: { type: 'visit', count: 12 },
        reward: { items: { returnScroll: 5, gold: 50 } },
        unlocked: false
    },

    explore_003: {
        name: '地牢探险者',
        description: '到达地牢第10层',
        icon: '🏰',
        category: 'exploration',
        condition: { type: 'dungeon', floor: 10 },
        reward: { items: { soul: 50, healthPotion: 10 } },
        unlocked: false
    },

    explore_004: {
        name: '地牢征服者',
        description: '到达地牢第50层',
        icon: '👑',
        category: 'exploration',
        condition: { type: 'dungeon', floor: 50 },
        reward: { items: { magicStaff: 1, lightHood: 1, gold: 100 } },
        unlocked: false
    },

    // 交易成就
    trade_001: {
        name: '交易新手',
        description: '完成第一次交易',
        icon: '🤝',
        category: 'trading',
        condition: { type: 'trade', count: 1 },
        reward: { items: { gold: 10 } },
        unlocked: false
    },

    trade_002: {
        name: '商人',
        description: '完成50次交易',
        icon: '💰',
        category: 'trading',
        condition: { type: 'trade', count: 50 },
        reward: { items: { gold: 100 } },
        unlocked: false
    },

    trade_003: {
        name: '商业大亨',
        description: '完成100次交易',
        icon: '🏦',
        category: 'trading',
        condition: { type: 'trade', count: 100 },
        reward: { items: { gold: 500 } },
        unlocked: false
    },

    // 特殊成就
    special_001: {
        name: '美食家',
        description: '制作所有食物',
        icon: '🍽️',
        category: 'special',
        condition: { type: 'cookAll' },
        reward: { items: { dragonScaleSoup: 5, magicBread: 10, gold: 100 } },
        unlocked: false
    },

    special_002: {
        name: '收藏家',
        description: '收集所有特殊物品',
        icon: '🏺',
        category: 'special',
        condition: { type: 'collectAll', category: 'special' },
        reward: { items: { dragonBone: 10, dragonScale: 10, gold: 200 } },
        unlocked: false
    },

    special_003: {
        name: '灵魂收割者',
        description: '收集1000个灵魂',
        icon: '👻',
        category: 'special',
        condition: { type: 'collect', item: 'soul', amount: 1000 },
        reward: { items: { magicStaff: 1, lightHood: 1, blueHood: 1 } },
        unlocked: false
    },

    special_004: {
        name: '富翁',
        description: '拥有1000金币',
        icon: '💎',
        category: 'special',
        condition: { type: 'gold', amount: 1000 },
        reward: { items: { dragonArmor: 1, giantHammer: 1 } },
        unlocked: false
    },

    special_005: {
        name: '万能工匠',
        description: '制作所有物品',
        icon: '🔧',
        category: 'special',
        condition: { type: 'craftAll' },
        reward: { items: { gold: 500, dragonBone: 10, dragonScale: 10 } },
        unlocked: false
    },

    // 隐藏成就
    hidden_001: {
        name: '禁忌之食',
        description: '食用人肉',
        icon: '🥩',
        category: 'hidden',
        condition: { type: 'eat', item: 'humanMeat' },
        reward: { items: { sanityPotion: 5 } },
        unlocked: false,
        hidden: true
    },

    hidden_002: {
        name: '不死之身',
        description: '生命值降至1以下后存活',
        icon: '💀',
        category: 'hidden',
        condition: { type: 'nearDeath' },
        reward: { items: { healthPotion: 10, dragonArmor: 1 } },
        unlocked: false,
        hidden: true
    },

    hidden_003: {
        name: '速通者',
        description: '在10天内到达地牢第10层',
        icon: '⚡',
        category: 'hidden',
        condition: { type: 'speedrun', days: 10, floor: 10 },
        reward: { items: { magicStaff: 1, dragonArmor: 1, gold: 200 } },
        unlocked: false,
        hidden: true
    }
};

// 成就系统
const achievementSystem = {
    // 初始化成就系统
    init: function() {
        this.unlockedAchievements = [];
        this.achievementLog = [];

        // 统计数据
        this.stats = {
            daysSurvived: 0,
            battlesWon: 0,
            itemsCrafted: 0,
            itemsCooked: 0,
            tradesCompleted: 0,
            mapsVisited: new Set(),
            monstersKilled: new Set(),
            buildingsBuilt: 0,
            seasonsExperienced: new Set()
        };
    },

    // 更新统计数据
    updateStat: function(stat, value = 1) {
        if (this.stats[stat] instanceof Set) {
            this.stats[stat].add(value);
        } else {
            this.stats[stat] += value;
        }

        // 检查成就
        this.checkAchievements();
    },

    // 检查成就
    checkAchievements: function() {
        Object.entries(ACHIEVEMENTS).forEach(([achievementId, achievement]) => {
            if (achievement.unlocked) return;

            let unlocked = false;

            switch (achievement.condition.type) {
                case 'survive':
                    unlocked = this.stats.daysSurvived >= achievement.condition.days;
                    break;

                case 'season':
                    unlocked = this.stats.seasonsExperienced.has(achievement.condition.season);
                    break;

                case 'build':
                    unlocked = this.stats.buildingsBuilt >= achievement.condition.count;
                    break;

                case 'craft':
                    unlocked = this.stats.itemsCrafted >= achievement.condition.count;
                    break;

                case 'cook':
                    unlocked = this.stats.itemsCooked >= achievement.condition.count;
                    break;

                case 'battle':
                    unlocked = this.stats.battlesWon >= achievement.condition.count;
                    break;

                case 'visit':
                    unlocked = this.stats.mapsVisited.size >= achievement.condition.count;
                    break;

                case 'dungeon':
                    unlocked = player.dungeonFloor >= achievement.condition.floor;
                    break;

                case 'trade':
                    unlocked = this.stats.tradesCompleted >= achievement.condition.count;
                    break;

                case 'collect':
                    if (achievement.condition.item === 'soul') {
                        unlocked = player.soul >= achievement.condition.amount;
                    }
                    break;

                case 'gold':
                    unlocked = countItemInInventory('gold') >= achievement.condition.amount;
                    break;

                case 'eat':
                    // 特殊处理：食用人肉
                    break;

                case 'nearDeath':
                    // 特殊处理：濒死状态
                    break;

                case 'speedrun':
                    unlocked = this.stats.daysSurvived <= achievement.condition.days &&
                              player.dungeonFloor >= achievement.condition.floor;
                    break;
            }

            if (unlocked) {
                this.unlockAchievement(achievementId);
            }
        });
    },

    // 解锁成就
    unlockAchievement: function(achievementId) {
        const achievement = ACHIEVEMENTS[achievementId];
        if (!achievement || achievement.unlocked) return;

        achievement.unlocked = true;
        this.unlockedAchievements.push(achievementId);

        // 发放奖励
        if (achievement.reward.items) {
            Object.entries(achievement.reward.items).forEach(([itemId, amount]) => {
                addItemToInventory(itemId, amount);
            });
        }

        // 记录日志
        this.achievementLog.push({
            id: achievementId,
            name: achievement.name,
            unlockedAt: player.gameTime.day
        });

        // 显示成就解锁消息
        showMessage(`🏆 成就解锁: ${achievement.name}`, 'success');

        // 显示成就详情
        this.showAchievementNotification(achievementId);
    },

    // 显示成就通知
    showAchievementNotification: function(achievementId) {
        const achievement = ACHIEVEMENTS[achievementId];
        if (!achievement) return;

        let content = '<div class="achievement-notification">';
        content += `<div class="achievement-icon">${achievement.icon}</div>`;
        content += `<h4>${achievement.name}</h4>`;
        content += `<p>${achievement.description}</p>`;

        if (achievement.reward.items) {
            content += '<div class="achievement-rewards">';
            content += '<span>奖励:</span>';
            Object.entries(achievement.reward.items).forEach(([itemId, amount]) => {
                content += `<span class="reward">${getItemIcon(itemId)} ${getItemName(itemId)}×${amount}</span>`;
            });
            content += '</div>';
        }

        content += '</div>';

        showModal('成就解锁！', content, [
            { text: '太棒了！', action: 'hideModal();' }
        ]);
    },

    // 显示成就列表
    showAchievementList: function() {
        let content = '<div class="achievement-list">';
        content += '<h4>🏆 成就列表</h4>';

        // 按类别分组
        const categories = {
            survival: { name: '生存成就', icon: '❤️' },
            season: { name: '季节成就', icon: '🌍' },
            building: { name: '建造成就', icon: '🏠' },
            crafting: { name: '制作成就', icon: '🔨' },
            cooking: { name: '烹饪成就', icon: '🍳' },
            combat: { name: '战斗成就', icon: '⚔️' },
            exploration: { name: '探索成就', icon: '🗺️' },
            trading: { name: '交易成就', icon: '🤝' },
            special: { name: '特殊成就', icon: '⭐' },
            hidden: { name: '隐藏成就', icon: '❓' }
        };

        Object.entries(categories).forEach(([category, categoryInfo]) => {
            const categoryAchievements = Object.entries(ACHIEVEMENTS)
                .filter(([id, ach]) => ach.category === category && !ach.hidden);

            if (categoryAchievements.length === 0) return;

            content += `<div class="achievement-category">`;
            content += `<h5>${categoryInfo.icon} ${categoryInfo.name}</h5>`;

            categoryAchievements.forEach(([achievementId, achievement]) => {
                const isUnlocked = achievement.unlocked;
                const statusClass = isUnlocked ? 'unlocked' : 'locked';

                content += `<div class="achievement-item ${statusClass}">`;
                content += `<div class="achievement-icon">${achievement.icon}</div>`;
                content += `<div class="achievement-info">`;
                content += `<span class="achievement-name">${achievement.name}</span>`;
                content += `<span class="achievement-description">${achievement.description}</span>`;
                content += `</div>`;
                content += `<div class="achievement-status">`;
                content += isUnlocked ? '✅' : '🔒';
                content += `</div>`;
                content += `</div>`;
            });

            content += `</div>`;
        });

        // 显示隐藏成就数量
        const hiddenCount = Object.values(ACHIEVEMENTS).filter(a => a.hidden).length;
        const hiddenUnlocked = Object.values(ACHIEVEMENTS).filter(a => a.hidden && a.unlocked).length;
        content += `<div class="hidden-count">隐藏成就: ${hiddenUnlocked}/${hiddenCount}</div>`;

        content += '</div>';

        showModal('成就列表', content, [
            { text: '关闭', action: 'hideModal();' }
        ]);
    },

    // 获取成就进度
    getAchievementProgress: function() {
        const total = Object.keys(ACHIEVEMENTS).length;
        const unlocked = this.unlockedAchievements.length;
        return Math.floor((unlocked / total) * 100);
    },

    // 获取成就统计

    // 检查特定成就

    // 重置成就（新游戏）
};

// 初始化成就系统
function initAchievementSystem() {
    achievementSystem.init();
}

// 注册到命名空间
if (typeof KBA !== 'undefined') {
    KBA.registerSystem('achievements', achievementSystem);
    KBA.registerData('ACHIEVEMENTS', ACHIEVEMENTS);
}
