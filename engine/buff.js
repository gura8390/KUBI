// Unified Buff/Debuff System
// All status effects use a unified data structure and are processed each turn

const BuffSystem = {
    // Active buffs on player and monster
    activeBuffs: {
        player: [],
        monster: []
    },

    // Register a new buff/debuff
    add: function(target, buffId, duration, stacks) {
        var buffDef = BUFF_DEFS[buffId];
        if (!buffDef) return false;

        // Check if buff already exists
        var existing = this.activeBuffs[target].find(function(b) { return b.id === buffId; });
        if (existing) {
            // Refresh duration, add stacks
            existing.duration = Math.max(existing.duration, duration);
            existing.stacks = Math.min((existing.stacks || 1) + (stacks || 1), buffDef.maxStacks || 1);
        } else {
            this.activeBuffs[target].push({
                id: buffId,
                duration: duration,
                stacks: stacks || 1,
                tickCount: 0
            });
        }
        return true;
    },

    // Remove a buff
    remove: function(target, buffId) {
        this.activeBuffs[target] = this.activeBuffs[target].filter(function(b) { return b.id !== buffId; });
    },

    // Check if target has a buff
    has: function(target, buffId) {
        return this.activeBuffs[target].some(function(b) { return b.id === buffId; });
    },

    // Get buff stacks
    getStacks: function(target, buffId) {
        var buff = this.activeBuffs[target].find(function(b) { return b.id === buffId; });
        return buff ? buff.stacks : 0;
    },

    // Process all buffs for a target (called each turn)
    process: function(target, context) {
        var toRemove = [];
        var self = this;

        this.activeBuffs[target].forEach(function(buff, index) {
            var buffDef = BUFF_DEFS[buff.id];
            if (!buffDef) { toRemove.push(index); return; }

            // Execute tick effect
            if (buffDef.onTick) {
                buffDef.onTick(target, buff.stacks, context);
            }

            // Tick counter
            buff.tickCount++;

            // Reduce duration
            buff.duration--;
            if (buff.duration <= 0) {
                // Execute onExpire
                if (buffDef.onExpire) {
                    buffDef.onExpire(target, buff.stacks, context);
                }
                toRemove.push(index);
            }
        });

        // Remove expired buffs (reverse order)
        toRemove.reverse().forEach(function(i) {
            self.activeBuffs[target].splice(i, 1);
        });
    },

    // Get all active buff icons for display
    getIcons: function(target) {
        return this.activeBuffs[target].map(function(buff) {
            var buffDef = BUFF_DEFS[buff.id];
            if (!buffDef) return '';
            var icon = buffDef.icon || '?';
            if (buff.stacks > 1) icon += buff.stacks;
            return icon;
        }).join(' ');
    },

    // Get stat modifiers from all buffs
    getStatModifiers: function(target, stat) {
        var total = 0;
        this.activeBuffs[target].forEach(function(buff) {
            var buffDef = BUFF_DEFS[buff.id];
            if (buffDef && buffDef.modifiers && buffDef.modifiers[stat]) {
                total += buffDef.modifiers[stat] * buff.stacks;
            }
        });
        return total;
    },

    // Clear all buffs
    clearAll: function(target) {
        this.activeBuffs[target] = [];
    },

    // Get buff count
    count: function(target) {
        return this.activeBuffs[target].length;
    },

    // Serialize for save
    serialize: function() {
        return JSON.parse(JSON.stringify(this.activeBuffs));
    },

    // Deserialize from save
    deserialize: function(data) {
        if (data && data.player && data.monster) {
            this.activeBuffs = data;
        }
    }
};

// Register to namespace
if (typeof KBA !== 'undefined') KBA.systems.buffSystem = BuffSystem;
