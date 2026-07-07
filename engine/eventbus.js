// Event Bus - 事件总线
// 解耦各系统之间的通信

const EventBus = {
    // 事件监听器
    listeners: {},

    // 注册监听
    on(event, callback, context = null) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push({ callback, context });
        return () => this.off(event, callback);
    },

    // 注册一次性监听
    once(event, callback, context = null) {
        const wrapper = (...args) => {
            callback.apply(context, args);
            this.off(event, wrapper);
        };
        return this.on(event, wrapper);
    },

    // 移除监听
    off(event, callback) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event].filter(l => l.callback !== callback);
    },

    // 触发事件
    emit(event, data = {}) {
        if (!this.listeners[event]) return;
        for (const listener of this.listeners[event]) {
            try {
                listener.callback.call(listener.context, data);
            } catch (e) {
                console.error('EventBus error:', event, e);
            }
        }
    },

    // 清除所有监听
    clear() {
        this.listeners = {};
    },

    // 获取事件监听器数量
    listenerCount(event) {
        return (this.listeners[event] || []).length;
    }
};

// 预定义游戏事件
const GameEvents = {
    // 系统事件
    GAME_INIT: 'game:init',
    GAME_SAVE: 'game:save',
    GAME_LOAD: 'game:load',

    // 玩家事件
    PLAYER_LEVEL_UP: 'player:levelUp',
    PLAYER_DIED: 'player:died',
    PLAYER_STAT_CHANGED: 'player:statChanged',

    // 战斗事件
    BATTLE_START: 'battle:start',
    BATTLE_END: 'battle:end',
    BATTLE_VICTORY: 'battle:victory',
    BATTLE_DEFEAT: 'battle:defeat',
    BATTLE_DAMAGE_DEALT: 'battle:damageDealt',
    BATTLE_DAMAGE_TAKEN: 'battle:damageTaken',

    // 物品事件
    ITEM_ACQUIRED: 'item:acquired',
    ITEM_USED: 'item:used',
    ITEM_CRAFTED: 'item:crafted',

    // 地图事件
    MAP_ENTERED: 'map:entered',
    MAP_RESOURCE_COLLECTED: 'map:resourceCollected',

    // NPC事件
    NPC_TALKED: 'npc:talked',
    NPC_TRADED: 'npc:traded',

    // 时间事件
    TIME_ADVANCED: 'time:advanced',
    DAY_CHANGED: 'time:dayChanged',
    SEASON_CHANGED: 'time:seasonChanged',

    // 任务事件
    QUEST_STARTED: 'quest:started',
    QUEST_COMPLETED: 'quest:completed',

    // 成就事件
    ACHIEVEMENT_UNLOCKED: 'achievement:unlocked',

    // 天气事件
    WEATHER_CHANGED: 'weather:changed',

    // 行动事件
    ACTION_EXECUTED: 'action:executed',

    // 状态机事件
    STATE_CHANGED: 'state:changed'
};

// 注册到命名空间
if (typeof KBA !== 'undefined') {
    KBA.systems.eventBus = EventBus;
    KBA.data.GameEvents = GameEvents;
}
