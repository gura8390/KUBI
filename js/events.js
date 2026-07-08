// 随机事件系统文件
// 使用 data/events.js 中的 EventData 数据

// 事件系统
const eventSystem = {
    init: function() {
        this.lastEventTime = 0;
        this.eventCooldown = 5;
    },

    // 检查并触发事件
    checkEvents: function() {
        const currentTime = player.gameTime.day * 24 + player.gameTime.hour;
        if (currentTime - this.lastEventTime < this.eventCooldown) return;

        // 获取当前天气
        const currentWeather = (typeof weatherSystem !== 'undefined') ? weatherSystem.currentWeather : null;

        // 遍历数据层事件
        for (const [eventId, event] of Object.entries(EventData)) {
            // 季节检查
            if (event.season && event.season !== player.gameTime.season) continue;
            // 天气检查
            if (event.weather && event.weather !== currentWeather) continue;
            // 随机触发
            if (Math.random() < event.chance) {
                this.executeEvent(eventId, event);
                this.lastEventTime = currentTime;
                break;
            }
        }
    },

    // 执行事件效果
    executeEvent: function(eventId, event) {
        if (!event.effects) return;

        for (const effect of event.effects) {
            switch (effect.type) {
                case 'message':
                    showMessage(effect.text, effect.msgType || 'info');
                    break;
                case 'heal':
                    if (player[effect.stat] !== undefined) {
                        player[effect.stat] = Math.min(effect.max || 100, player[effect.stat] + effect.value);
                    }
                    break;
                case 'damage':
                    player.health = Math.max(0, player.health - effect.value);
                    break;
                case 'stat':
                    if (player[effect.stat] !== undefined) {
                        player[effect.stat] = Math.max(0, Math.min(100, player[effect.stat] + effect.value));
                    }
                    break;
                case 'item':
                    if (effect.action === 'remove') {
                        removeItemFromInventory(effect.item, Math.abs(effect.count));
                    } else {
                        addItemToInventory(effect.item, effect.count);
                    }
                    break;
                case 'xp':
                    if (typeof addXP === 'function') addXP(effect.value);
                    break;
                case 'soul':
                    if (typeof addSoul === 'function') addSoul(effect.value);
                    break;
                case 'random':
                    if (effect.effects && effect.effects.length > 0) {
                        const randomEffect = effect.effects[Math.floor(Math.random() * effect.effects.length)];
                        this.executeEvent(eventId, { effects: [randomEffect] });
                    }
                    break;
            }
        }

        addLogEntry('事件: ' + event.name, event.type === 'positive' ? 'log-gain' : 'log-cost');
    },

    // 显示事件历史
    showEventHistory: function() {
        let content = '<div class="event-history">';
        content += '<h4>事件记录</h4>';
        const recentEvents = gameLog.filter(entry => entry.text.startsWith('事件:'));
        if (recentEvents.length === 0) {
            content += '<p>暂无事件记录</p>';
        } else {
            recentEvents.slice(0, 10).forEach(event => {
                content += '<div class="event-entry">' + escapeHtml(event.text) + '</div>';
            });
        }
        content += '</div>';
        showModal('事件记录', content, [{ text: '关闭', action: 'hideModal();' }]);
    }
};

function initEventSystem() {
    eventSystem.init();
}

if (typeof KBA !== 'undefined') {
    KBA.registerSystem('eventSystem', eventSystem);
}
