// Event Bus - 增强版
// 支持事件优先级 (HIGH/NORMAL/LOW)

var EventBus = {
    listeners: {},

    // 优先级常量
    PRIORITY: { HIGH: 0, NORMAL: 100, LOW: 200 },

    on: function(event, callback, context, priority) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push({
            callback: callback,
            context: context || null,
            priority: priority || this.PRIORITY.NORMAL
        });
        // 按优先级排序
        this.listeners[event].sort(function(a, b) { return a.priority - b.priority; });
        var self = this;
        return function() { self.off(event, callback); };
    },

    onHigh: function(event, callback, context) {
        return this.on(event, callback, context, this.PRIORITY.HIGH);
    },

    onLow: function(event, callback, context) {
        return this.on(event, callback, context, this.PRIORITY.LOW);
    },

    once: function(event, callback, context, priority) {
        var wrapper = function(data) {
            callback.call(context, data);
            EventBus.off(event, wrapper);
        };
        return this.on(event, wrapper, context, priority);
    },

    off: function(event, callback) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event].filter(function(l) { return l.callback !== callback; });
    },

    emit: function(event, data) {
        if (!this.listeners[event]) return [];
        var results = [];
        for (var i = 0; i < this.listeners[event].length; i++) {
            var listener = this.listeners[event][i];
            try {
                var result = listener.callback.call(listener.context, data);
                results.push({ priority: listener.priority, result: result });
            } catch (e) {
                console.error('EventBus error:', event, e);
                results.push({ priority: listener.priority, error: e });
            }
        }
        return results;
    },

    clear: function() { this.listeners = {}; },

    listenerCount: function(event) {
        return (this.listeners[event] || []).length;
    },

    // 获取事件监听器信息
    getListeners: function(event) {
        return (this.listeners[event] || []).map(function(l) {
            return { priority: l.priority, name: l.callback.name || 'anonymous' };
        });
    }
};

// 预定义游戏事件
var GameEvents = {
    GAME_INIT: 'game:init', GAME_SAVE: 'game:save', GAME_LOAD: 'game:load',
    PLAYER_LEVEL_UP: 'player:levelUp', PLAYER_DIED: 'player:died',
    BATTLE_START: 'battle:start', BATTLE_END: 'battle:end',
    BATTLE_VICTORY: 'battle:victory', BATTLE_DEFEAT: 'battle:defeat',
    ITEM_ACQUIRED: 'item:acquired', ITEM_USED: 'item:used', ITEM_CRAFTED: 'item:crafted',
    MAP_ENTERED: 'map:entered', MAP_RESOURCE_COLLECTED: 'map:resourceCollected',
    NPC_TALKED: 'npc:talked', NPC_TRADED: 'npc:traded',
    TIME_ADVANCED: 'time:advanced', DAY_CHANGED: 'time:dayChanged', SEASON_CHANGED: 'time:seasonChanged',
    QUEST_STARTED: 'quest:started', QUEST_COMPLETED: 'quest:completed',
    ACHIEVEMENT_UNLOCKED: 'achievement:unlocked',
    WEATHER_CHANGED: 'weather:changed',
    ACTION_EXECUTED: 'action:executed', STATE_CHANGED: 'state:changed'
};

if (typeof KBA !== 'undefined') {
    KBA.systems.eventBus = EventBus;
    KBA.data.GameEvents = GameEvents;
}
