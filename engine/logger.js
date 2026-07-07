// Game Logger System
// Records all important game actions for debugging and analysis

var GameLogger = {
    logs: [],
    maxLogs: 1000,
    categories: {
        BATTLE: 'battle',
        EFFECT: 'effect',
        QUEST: 'quest',
        EVENT: 'event',
        CRAFT: 'craft',
        MAP: 'map',
        NPC: 'npc',
        SYSTEM: 'system',
        ERROR: 'error'
    },

    // 记录日志
    log: function(category, message, data) {
        var entry = {
            time: Date.now(),
            gameTime: player ? { day: player.gameTime.day, hour: player.gameTime.hour } : null,
            category: category,
            message: message,
            data: data || null
        };

        this.logs.push(entry);

        // 限制日志数量
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }

        // 触发事件
        if (typeof EventBus !== 'undefined') {
            EventBus.emit('logger:entry', entry);
        }
    },

    // 快捷方法
    battle: function(msg, data) { this.log(this.categories.BATTLE, msg, data); },
    effect: function(msg, data) { this.log(this.categories.EFFECT, msg, data); },
    quest: function(msg, data) { this.log(this.categories.QUEST, msg, data); },
    event: function(msg, data) { this.log(this.categories.EVENT, msg, data); },
    craft: function(msg, data) { this.log(this.categories.CRAFT, msg, data); },
    map: function(msg, data) { this.log(this.categories.MAP, msg, data); },
    npc: function(msg, data) { this.log(this.categories.NPC, msg, data); },
    system: function(msg, data) { this.log(this.categories.SYSTEM, msg, data); },
    error: function(msg, data) { this.log(this.categories.ERROR, msg, data); },

    // 查询日志
    query: function(category, limit) {
        var filtered = category ? this.logs.filter(function(l) { return l.category === category; }) : this.logs;
        return filtered.slice(-(limit || 50));
    },

    // 显示日志界面
    showLogPanel: function() {
        var content = '<div class="log-panel">';
        content += '<div style="margin-bottom:10px;">';
        content += '<button onclick="GameLogger._filterLog(\'all\')">全部</button> ';
        content += '<button onclick="GameLogger._filterLog(\'battle\')">战斗</button> ';
        content += '<button onclick="GameLogger._filterLog(\'effect\')">效果</button> ';
        content += '<button onclick="GameLogger._filterLog(\'quest\')">任务</button> ';
        content += '<button onclick="GameLogger._filterLog(\'event\')">事件</button> ';
        content += '<button onclick="GameLogger._filterLog(\'craft\')">制作</button> ';
        content += '<button onclick="GameLogger._filterLog(\'error\')">错误</button>';
        content += '</div>';
        content += '<div id="log-content" style="max-height:400px;overflow-y:auto;font-family:monospace;font-size:12px;"></div>';
        content += '</div>';
        showModal('游戏日志', content, [{ text: '关闭', action: 'hideModal();' }]);
        this._filterLog('all');
    },

    _filterLog: function(category) {
        var logs = this.query(category, 100);
        var el = document.getElementById('log-content');
        if (!el) return;
        el.innerHTML = logs.map(function(l) {
            var time = l.gameTime ? 'D' + l.gameTime.day + ' ' + l.gameTime.hour + ':00' : '';
            return '<div style="padding:2px 0;border-bottom:1px solid #eee;">[' + time + '] <b>' + l.category + '</b> ' + l.message + '</div>';
        }).join('');
    },

    // 统计
    getStats: function() {
        var stats = {};
        this.logs.forEach(function(l) {
            stats[l.category] = (stats[l.category] || 0) + 1;
        });
        return stats;
    },

    // 导出日志
    exportLogs: function() {
        var blob = new Blob([JSON.stringify(this.logs, null, 2)], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'game_log_' + new Date().toISOString().slice(0, 10) + '.json';
        a.click();
        URL.revokeObjectURL(url);
    }
};

if (typeof KBA !== 'undefined') KBA.systems.logger = GameLogger;
