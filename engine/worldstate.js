// World State System - Enhanced with History
var WorldState = {
    state: {
        npcRelations: {},
        bossKills: {},
        mapChanges: {},
        factionRep: { cannibal: 0, mage: 0 },
        townLevel: 1,
        triggeredEvents: {}
    },

    // 历史记录
    history: [],

    init: function() {
        this.state.npcRelations = {};
        this.state.bossKills = {};
        this.state.mapChanges = {};
        this.state.factionRep = { cannibal: 0, mage: 0 };
        this.state.townLevel = 1;
        this.state.triggeredEvents = {};
        this.history = [];
    },

    // 记录历史
    _recordHistory: function(type, detail) {
        this.history.push({
            time: Date.now(),
            gameTime: player ? { day: player.gameTime.day, hour: player.gameTime.hour } : null,
            type: type,
            detail: detail
        });
        // 限制历史记录数量
        if (this.history.length > 500) this.history.shift();
    },

    // NPC关系
    changeNPCRelation: function(npcId, delta) {
        if (!this.state.npcRelations[npcId]) this.state.npcRelations[npcId] = 0;
        this.state.npcRelations[npcId] = Math.max(-100, Math.min(100, this.state.npcRelations[npcId] + delta));
        this._recordHistory('npcRelation', { npcId: npcId, delta: delta, total: this.state.npcRelations[npcId] });
        if (typeof EventBus !== 'undefined') EventBus.emit('world:npcRelationChanged', { npcId: npcId, value: this.state.npcRelations[npcId] });
    },

    getNPCRelation: function(npcId) { return this.state.npcRelations[npcId] || 0; },

    // NPC对话记录
    recordNPCDialogue: function(npcId) {
        var key = 'dialogue_' + npcId;
        this.state.triggeredEvents[key] = (this.state.triggeredEvents[key] || 0) + 1;
        this._recordHistory('npcDialogue', { npcId: npcId, count: this.state.triggeredEvents[key] });
    },

    getNPCDialogueCount: function(npcId) {
        return this.state.triggeredEvents['dialogue_' + npcId] || 0;
    },

    // Boss击杀
    recordBossKill: function(bossId) {
        this.state.bossKills[bossId] = (this.state.bossKills[bossId] || 0) + 1;
        this._recordHistory('bossKill', { bossId: bossId, count: this.state.bossKills[bossId] });
        if (typeof EventBus !== 'undefined') EventBus.emit('world:bossKilled', { bossId: bossId, count: this.state.bossKills[bossId] });
    },

    isBossKilled: function(bossId) { return (this.state.bossKills[bossId] || 0) > 0; },

    // 地图访问记录
    recordMapVisit: function(mapId) {
        var key = 'visit_' + mapId;
        this.state.triggeredEvents[key] = (this.state.triggeredEvents[key] || 0) + 1;
        if (this.state.triggeredEvents[key] === 1) {
            this._recordHistory('firstVisit', { mapId: mapId });
        }
    },

    getMapVisitCount: function(mapId) {
        return this.state.triggeredEvents['visit_' + mapId] || 0;
    },

    // 商人访问记录
    recordMerchantVisit: function(npcId) {
        var key = 'merchant_' + npcId;
        this.state.triggeredEvents[key] = (this.state.triggeredEvents[key] || 0) + 1;
        this._recordHistory('merchantVisit', { npcId: npcId, count: this.state.triggeredEvents[key] });
    },

    // 地图变化
    setMapChange: function(mapId, changeType, value) {
        if (!this.state.mapChanges[mapId]) this.state.mapChanges[mapId] = {};
        this.state.mapChanges[mapId][changeType] = value;
        this._recordHistory('mapChange', { mapId: mapId, changeType: changeType, value: value });
        if (typeof EventBus !== 'undefined') EventBus.emit('world:mapChanged', { mapId: mapId, changeType: changeType, value: value });
    },

    getMapChange: function(mapId, changeType) {
        if (!this.state.mapChanges[mapId]) return null;
        return this.state.mapChanges[mapId][changeType];
    },

    // 阵营声望
    changeFactionRep: function(faction, delta) {
        this.state.factionRep[faction] = Math.max(-100, Math.min(100, (this.state.factionRep[faction] || 0) + delta));
        this._recordHistory('factionRep', { faction: faction, delta: delta, total: this.state.factionRep[faction] });
        if (typeof EventBus !== 'undefined') EventBus.emit('world:factionRepChanged', { faction: faction, value: this.state.factionRep[faction] });
    },

    getFactionRep: function(faction) { return this.state.factionRep[faction] || 0; },

    // 城镇发展
    upgradeTown: function() {
        this.state.townLevel++;
        this._recordHistory('townUpgrade', { level: this.state.townLevel });
        if (typeof EventBus !== 'undefined') EventBus.emit('world:townUpgraded', { level: this.state.townLevel });
    },

    // 事件触发记录
    markEventTriggered: function(eventId) {
        this.state.triggeredEvents[eventId] = true;
        this._recordHistory('eventTriggered', { eventId: eventId });
    },

    isEventTriggered: function(eventId) { return this.state.triggeredEvents[eventId] || false; },

    // 查询历史
    getHistory: function(type, limit) {
        var filtered = type ? this.history.filter(function(h) { return h.type === type; }) : this.history;
        return filtered.slice(-(limit || 50));
    },

    // 序列化
    serialize: function() { return JSON.parse(JSON.stringify(this.state)); },

    // 反序列化
    deserialize: function(data) { if (data) this.state = data; }
};

if (typeof KBA !== 'undefined') KBA.systems.worldState = WorldState;
