// Battle Trigger System
// Unified trigger mechanism for skills, equipment, boss abilities, etc.

const TriggerSystem = {
    // Registered triggers
    triggers: [],

    // Register a trigger
    register: function(triggerDef) {
        this.triggers.push({
            id: triggerDef.id,
            event: triggerDef.event,
            condition: triggerDef.condition || null,
            effect: triggerDef.effect,
            source: triggerDef.source || 'system',
            priority: triggerDef.priority || 100,
            once: triggerDef.once || false,
            triggered: false
        });
        // Sort by priority
        this.triggers.sort(function(a, b) { return a.priority - b.priority; });
    },

    // Fire a trigger event
    fire: function(event, context) {
        var results = [];
        var toRemove = [];

        this.triggers.forEach(function(trigger, index) {
            if (trigger.event !== event) return;
            if (trigger.once && trigger.triggered) return;

            // Check condition
            if (trigger.condition && !trigger.condition(context)) return;

            // Execute effect
            var result = trigger.effect(context);
            trigger.triggered = true;
            results.push({ trigger: trigger.id, result: result });

            if (trigger.once) toRemove.push(index);
        });

        // Remove one-time triggers
        toRemove.reverse().forEach(function(i) {
            this.triggers.splice(i, 1);
        }.bind(this));

        return results;
    },

    // Clear all triggers
    clear: function() {
        this.triggers = [];
    },

    // Clear triggers by source
    clearBySource: function(source) {
        this.triggers = this.triggers.filter(function(t) { return t.source !== source; });
    },

    // Get trigger count
    count: function() {
        return this.triggers.length;
    }
};

// Trigger events
var TRIGGER_EVENTS = {
    BATTLE_START: 'battle:start',
    BATTLE_END: 'battle:end',
    TURN_START: 'turn:start',
    TURN_END: 'turn:end',
    BEFORE_ATTACK: 'before:attack',
    AFTER_ATTACK: 'after:attack',
    BEFORE_DAMAGE: 'before:damage',
    AFTER_DAMAGE: 'after:damage',
    BEFORE_HEAL: 'before:heal',
    AFTER_HEAL: 'after:heal',
    HP_BELOW_30: 'hp:below30',
    HP_BELOW_50: 'hp:below50',
    ON_KILL: 'on:kill',
    ON_DEATH: 'on:death',
    ON_CRIT: 'on:crit',
    ON_DODGE: 'on:dodge',
    ON_BUFF_APPLY: 'buff:apply',
    ON_BUFF_REMOVE: 'buff:remove',
    ON_SKILL_USE: 'skill:use',
    ON_ITEM_USE: 'item:use'
};

// Register to namespace
if (typeof KBA !== 'undefined') {
    KBA.systems.triggerSystem = TriggerSystem;
    KBA.data.TRIGGER_EVENTS = TRIGGER_EVENTS;
}
