// World State System
// Player actions leave lasting impacts on the world

var WorldState = {
    // 世界状态数据
    state: {
        // NPC关系
        npcRelations: {},
        // Boss击杀记录
        bossKills: {},
        // 地图变化
        mapChanges: {},
        // 阵营声望
        factionRep: { cannibal: 0, mage: 0 },
        // 商人库存刷新
        merchantStock: {},
        // 城市发展等级
        townLevel: 1,
        // 全局事件触发记录
        triggeredEvents: {}
    },

    // 初始化
    init: function() {
        this.state.npcRelations = {};
        this.state.bossKills = {};
        this.state.mapChanges = {};
        this.state.factionRep = { cannibal: 0, mage: 0 };
        this.state.merchantStock = {};
        this.state.townLevel = 1;
        this.state.triggeredEvents = {};
    },

    // NPC关系操作
    changeNPCRelation: function(npcId, delta) {
        if (!this.state.npcRelations[npcId]) {
            this.state.npcRelations[npcId] = 0;
        }
        this.state.npcRelations[npcId] = Math.max(-100, Math.min(100, this.state.npcRelations[npcId] + delta));
        if (typeof EventBus !== 'undefined') {
            EventBus.emit('world:npcRelationChanged', { npcId: npcId, value: this.state.npcRelations[npcId] });
        }
    },

    getNPCRelation: function(npcId) {
        return this.state.npcRelations[npcId] || 0;
    },

    // Boss击杀记录
    recordBossKill: function(bossId) {
        this.state.bossKills[bossId] = (this.state.bossKills[bossId] || 0) + 1;
        if (typeof EventBus !== 'undefined') {
            EventBus.emit('world:bossKilled', { bossId: bossId, count: this.state.bossKills[bossId] });
        }
    },

    isBossKilled: function(bossId) {
        return (this.state.bossKills[bossId] || 0) > 0;
    },

    // 地图变化
    setMapChange: function(mapId, changeType, value) {
        if (!this.state.mapChanges[mapId]) {
            this.state.mapChanges[mapId] = {};
        }
        this.state.mapChanges[mapId][changeType] = value;
        if (typeof EventBus !== 'undefined') {
            EventBus.emit('world:mapChanged', { mapId: mapId, changeType: changeType, value: value });
        }
    },

    getMapChange: function(mapId, changeType) {
        if (!this.state.mapChanges[mapId]) return null;
        return this.state.mapChanges[mapId][changeType];
    },

    // 阵营声望
    changeFactionRep: function(faction, delta) {
        this.state.factionRep[faction] = Math.max(-100, Math.min(100, (this.state.factionRep[faction] || 0) + delta));
        if (typeof EventBus !== 'undefined') {
            EventBus.emit('world:factionRepChanged', { faction: faction, value: this.state.factionRep[faction] });
        }
    },

    getFactionRep: function(faction) {
        return this.state.factionRep[faction] || 0;
    },

    // 城镇发展
    upgradeTown: function() {
        this.state.townLevel++;
        if (typeof EventBus !== 'undefined') {
            EventBus.emit('world:townUpgraded', { level: this.state.townLevel });
        }
    },

    // 触发事件记录
    markEventTriggered: function(eventId) {
        this.state.triggeredEvents[eventId] = true;
    },

    isEventTriggered: function(eventId) {
        return this.state.triggeredEvents[eventId] || false;
    },

    // 序列化
    serialize: function() {
        return JSON.parse(JSON.stringify(this.state));
    },

    // 反序列化
    deserialize: function(data) {
        if (data) this.state = data;
    }
};

if (typeof KBA !== 'undefined') KBA.systems.worldState = WorldState;
