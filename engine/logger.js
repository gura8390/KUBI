// Game Logger System - Enhanced with Replay
var GameLogger = {
    logs: [],
    replayData: [],
    maxLogs: 1000,
    recording: false,
    categories: {
        BATTLE: 'battle', EFFECT: 'effect', QUEST: 'quest', EVENT: 'event',
        CRAFT: 'craft', MAP: 'map', NPC: 'npc', SYSTEM: 'system', ERROR: 'error'
    },

    log: function(category, message, data) {
        var entry = {
            time: Date.now(),
            gameTime: player ? { day: player.gameTime.day, hour: player.gameTime.hour } : null,
            category: category, message: message, data: data || null
        };
        this.logs.push(entry);
        if (this.logs.length > this.maxLogs) this.logs.shift();
        // 记录回放数据
        if (this.recording) {
            this.replayData.push({ type: 'log', entry: entry });
        }
        if (typeof EventBus !== 'undefined') EventBus.emit('logger:entry', entry);
    },

    battle: function(msg, data) { this.log(this.categories.BATTLE, msg, data); },
    effect: function(msg, data) { this.log(this.categories.EFFECT, msg, data); },
    quest: function(msg, data) { this.log(this.categories.QUEST, msg, data); },
    event: function(msg, data) { this.log(this.categories.EVENT, msg, data); },
    craft: function(msg, data) { this.log(this.categories.CRAFT, msg, data); },
    map: function(msg, data) { this.log(this.categories.MAP, msg, data); },
    npc: function(msg, data) { this.log(this.categories.NPC, msg, data); },
    system: function(msg, data) { this.log(this.categories.SYSTEM, msg, data); },
    error: function(msg, data) { this.log(this.categories.ERROR, msg, data); },

    query: function(category, limit) {
        var filtered = category ? this.logs.filter(function(l) { return l.category === category; }) : this.logs;
        return filtered.slice(-(limit || 50));
    },

    // === Replay 功能 ===
    startRecording: function() {
        this.recording = true;
        this.replayData = [];
        this.replayData.push({
            type: 'start',
            time: Date.now(),
            playerState: player ? JSON.parse(JSON.stringify(player)) : null
        });
        this.system('Replay recording started');
    },

    stopRecording: function() {
        this.recording = false;
        this.replayData.push({ type: 'stop', time: Date.now() });
        this.system('Replay recording stopped');
        return this.replayData;
    },

    recordAction: function(action, data) {
        if (this.recording) {
            this.replayData.push({ type: 'action', action: action, data: data, time: Date.now() });
        }
    },

    recordRandom: function(seed, result) {
        if (this.recording) {
            this.replayData.push({ type: 'random', seed: seed, result: result, time: Date.now() });
        }
    },

    recordDamage: function(source, target, damage, crit) {
        if (this.recording) {
            this.replayData.push({
                type: 'damage', source: source, target: target,
                damage: damage, crit: crit, time: Date.now()
            });
        }
    },

    exportReplay: function() {
        var blob = new Blob([JSON.stringify(this.replayData, null, 2)], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'replay_' + new Date().toISOString().slice(0, 10) + '.json';
        a.click();
        URL.revokeObjectURL(url);
    },

    importReplay: function(file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            try {
                GameLogger.replayData = JSON.parse(e.target.result);
                GameLogger.system('Replay imported: ' + GameLogger.replayData.length + ' entries');
            } catch (err) {
                GameLogger.error('Replay import failed');
            }
        };
        reader.readAsText(file);
    },

    // === UI ===
    showLogPanel: function() {
        var content = '<div class="log-panel">';
        content += '<div style="margin-bottom:10px;">';
        content += `<button onclick="GameLogger._filterLog('all')">全部</button> `;
        content += `<button onclick="GameLogger._filterLog('all')">全部</button> `;
        content += `<button onclick="GameLogger._filterLog('all')">全部</button> `;
        content += `<button onclick="GameLogger._filterLog('all')">全部</button> `;
        content += `<button onclick="GameLogger._filterLog('all')">全部</button> `;
        content += `<button onclick="GameLogger._filterLog('all')">全部</button> `;
        content += `<button onclick="GameLogger._filterLog('all')">全部</button> `;
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

    getStats: function() {
        var stats = {};
        this.logs.forEach(function(l) { stats[l.category] = (stats[l.category] || 0) + 1; });
        return stats;
    },

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
