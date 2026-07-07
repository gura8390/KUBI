// 时间系统文件
// 时间仅在玩家行动时推进，不自动流逝

const timeSystem = {
    init: function() {},
    // 初始化时间系统

    // 推进时间
    advanceTime: function(hours) {
        if (!player) return;

        // 更新小时
        player.gameTime.hour += hours;

        // 处理跨天
        while (player.gameTime.hour >= 24) {
            player.gameTime.hour -= 24;
            player.gameTime.day++;

            // 检查季节变化
            this.checkSeasonChange();

            // 收集建筑被动资源（水井、田地、陷阱）
            if (typeof collectPassiveResources === 'function') {
                collectPassiveResources();
            }

            // 重置每日任务
            if (typeof resetDailyQuests === 'function') {
                resetDailyQuests();
            }

            // 成就统计：存活天数
            if (typeof achievementSystem !== 'undefined') {
                achievementSystem.updateStat('daysSurvived', 1);
                achievementSystem.updateStat('seasonsExperienced', player.gameTime.season);
            }
        }

        // 更新玩家属性
        updatePlayerStats(hours);

        // 检查特殊时间事件
        this.checkTimeEvents();

        // 检查随机事件
        if (typeof eventSystem !== 'undefined') {
            eventSystem.checkEvents();
        }

        // 检查天气效果
        if (typeof weatherSystem !== 'undefined') {
            weatherSystem.applyWeatherEffects();
        }

        // 更新UI
        updateUI();

        // 检查玩家死亡
        checkPlayerDeath();
    },

    // 检查季节变化
    checkSeasonChange: function() {
        const seasons = ['spring', 'summer', 'autumn', 'winter'];
        const currentSeasonIndex = seasons.indexOf(player.gameTime.season);

        // 每30天换季
        if (player.gameTime.day % 30 === 0) {
            const nextSeasonIndex = (currentSeasonIndex + 1) % 4;
            player.gameTime.season = seasons[nextSeasonIndex];

            showMessage(`季节变化: ${getSeasonName(player.gameTime.season)}`, 'info');

            // 触发季节事件
            this.onSeasonChange(seasons[nextSeasonIndex]);
        }

        // 季节预警系统 - 提前5天预警
        this.checkSeasonWarning();
    },

    // 季节预警系统
    checkSeasonWarning: function() {
        const dayInSeason = player.gameTime.day % 30;
        const seasons = ['spring', 'summer', 'autumn', 'winter'];
        const currentSeasonIndex = seasons.indexOf(player.gameTime.season);

        // 秋季第25天预警冬季
        if (player.gameTime.season === 'autumn' && dayInSeason >= 25) {
            const daysUntilWinter = 30 - dayInSeason;
            if (daysUntilWinter <= 5 && daysUntilWinter > 0) {
                showMessage(`⚠️ 距离冬季还有${daysUntilWinter}天，请准备过冬物资！`, 'warning');
            }
        }

        // 冬季第25天预警春季
        if (player.gameTime.season === 'winter' && dayInSeason >= 25) {
            const daysUntilSpring = 30 - dayInSeason;
            if (daysUntilSpring <= 5 && daysUntilSpring > 0) {
                showMessage(`🌸 距离春季还有${daysUntilSpring}天，即将迎来资源恢复！`, 'info');
            }
        }
    },

    // 季节变化事件
    onSeasonChange: function(newSeason) {
        switch (newSeason) {
            case 'summer':
                showMessage('夏天来了，注意防暑降温！', 'warning');
                break;
            case 'autumn':
                showMessage('秋天来了，准备过冬物资！', 'warning');
                break;
            case 'winter':
                showMessage('冬天来了，资源停产，注意保暖！', 'error');
                break;
            case 'spring':
                showMessage('春天来了，万物复苏！', 'success');
                break;
        }
    },

    // 检查时间事件
    checkTimeEvents: function() {
        const hour = player.gameTime.hour;

        // 白天/夜晚切换
        if (hour === 6) {
            showMessage('天亮了', 'info');
        } else if (hour === 18) {
            showMessage('天黑了', 'warning');
        }

        // 午夜事件
        if (hour === 0) {
            // 午夜精神值下降
            player.sanity = Math.max(0, player.sanity - 5);
        }

        // 检查是否是夜晚
        const isNight = hour >= 18 || hour < 6;
        if (isNight) {
            // 夜间精神值缓慢下降
            player.sanity = Math.max(0, player.sanity - 0.5);
        }
    },

    // 是否是白天
    isDaytime: function() {
        if (!player) return true;
        return player.gameTime.hour >= 6 && player.gameTime.hour < 18;
    },

    // 是否是夜晚

    // 获取时间段描述
    getTimeOfDay: function() {
        if (!player) return '白天';

        const hour = player.gameTime.hour;
        if (hour >= 6 && hour < 12) return '上午';
        if (hour >= 12 && hour < 18) return '下午';
        if (hour >= 18 && hour < 22) return '晚上';
        return '深夜';
    },

    // 睡眠
    sleep: function(hours) {
        if (!player) return;

        // 检查是否有床
        if (!hasBuilding('bed')) {
            showMessage('你需要先建造一张床！', 'error');
            return;
        }

        // 冬季睡眠消耗木头
        if (player.gameTime.season === 'winter') {
            const woodCost = hours;
            if (!hasItem('wood', woodCost)) {
                showMessage(`冬季睡眠需要${woodCost}个木头取暖！`, 'error');
                return;
            }
            removeItemFromInventory('wood', woodCost);
            showMessage(`消耗了${woodCost}个木头取暖`, 'info');
        }

        // 推进时间
        this.advanceTime(hours);

        // 恢复状态
        const recoveryRate = hasBuilding('bed') ? 1.5 : 1;
        player.health = Math.min(100, player.health + 20 * hours * recoveryRate);
        player.stamina = Math.min(100, player.stamina + 30 * hours * recoveryRate);
        player.sanity = Math.min(100, player.sanity + 10 * hours * recoveryRate);

        showMessage(`睡了${hours}小时，感觉好多了`, 'success');
        updateUI();
    },

    // 显示睡眠菜单
    showSleepMenu: function() {
        if (!hasBuilding('bed')) {
            showMessage('你需要先建造一张床！', 'error');
            return;
        }

        const content = `
            <p>选择睡眠时间：</p>
            <p>当前时间: ${formatTime(player.gameTime.hour)}</p>
            ${player.gameTime.season === 'winter' ? '<p class="warning">冬季睡眠需要消耗木头（1木头/小时）</p>' : ''}
        `;

        showModal('睡眠', content, [
            { text: '睡2小时', action: 'timeSystem.sleep(2); hideModal();' },
            { text: '睡4小时', action: 'timeSystem.sleep(4); hideModal();' },
            { text: '睡6小时', action: 'timeSystem.sleep(6); hideModal();' },
            { text: '睡8小时', action: 'timeSystem.sleep(8); hideModal();' },
            { text: '取消', action: 'hideModal();' }
        ]);
    },

    // 设置时间速度（保留接口，但不再使用）

    // 获取季节信息
    getSeasonInfo: function() {
        if (!player) return null;

        const season = player.gameTime.season;
        const info = {
            spring: {
                name: '春季',
                description: '万物复苏的季节，资源丰富',
                effects: ['资源正常刷新', '适合开局'],
                temperature: '适中'
            },
            summer: {
                name: '夏季',
                description: '炎热的季节，需要注意降温',
                effects: ['资源正常刷新', '需要降温措施'],
                temperature: '高温'
            },
            autumn: {
                name: '秋季',
                description: '收获的季节，准备过冬',
                effects: ['资源正常刷新', '准备过冬物资'],
                temperature: '适中'
            },
            winter: {
                name: '冬季',
                description: '寒冷的季节，资源匮乏',
                effects: ['所有资源停产', '需要保暖措施', '睡眠消耗木头'],
                temperature: '低温'
            }
        };

        return info[season] || null;
    },

    // 显示时间信息
    showTimeInfo: function() {
        const seasonInfo = this.getSeasonInfo();
        const timeOfDay = this.getTimeOfDay();

        const content = `
            <div class="time-info">
                <h4>时间信息</h4>
                <ul>
                    <li>天数: 第${player.gameTime.day}天</li>
                    <li>时间: ${formatTime(player.gameTime.hour)} (${timeOfDay})</li>
                    <li>季节: ${seasonInfo?.name || '未知'}</li>
                    <li>天气: ${this.getWeather()}</li>
                </ul>

                <h4>季节信息</h4>
                <p>${seasonInfo?.description || ''}</p>
                <ul>
                    ${seasonInfo?.effects.map(e => `<li>${e}</li>`).join('') || ''}
                </ul>
                <p>温度: ${seasonInfo?.temperature || '未知'}</p>

                <h4>当前状态</h4>
                <ul>
                    <li>白天/夜晚: ${this.isDaytime() ? '白天' : '夜晚'}</li>
                    <li>时间模式: 行动推进（每次行动消耗时间）</li>
                </ul>
            </div>
        `;

        showModal('时间信息', content, [
            { text: '关闭', action: 'hideModal();' }
        ]);
    },

    // 切换暂停状态（保留接口兼容）
    togglePause: function() {
        showMessage('时间已改为行动推进模式', 'info');
    },

    // 获取天气（简化版）
    getWeather: function() {
        const season = player.gameTime.season;
        const hour = player.gameTime.hour;

        // 简化天气系统
        if (season === 'winter') {
            return hour >= 18 || hour < 6 ? '寒冷夜晚' : '寒冷白天';
        } else if (season === 'summer') {
            return hour >= 12 && hour < 15 ? '炎热' : '温暖';
        } else {
            return hour >= 18 || hour < 6 ? '凉爽夜晚' : '晴朗';
        }
    }
};

// 初始化时间系统
function initTimeSystem() {
    timeSystem.init();
}

// 注册到命名空间
if (typeof KBA !== 'undefined') KBA.registerSystem('timeSystem', timeSystem);
