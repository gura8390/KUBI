// Unified Buff/Debuff System
// 纯数据驱动，自动解释 tickEffect

var BuffSystem = {
    activeBuffs: { player: [], monster: [] },

    add: function(target, buffId, duration, stacks) {
        var buffDef = BUFF_DEFS[buffId];
        if (!buffDef) return false;
        var existing = this.activeBuffs[target].find(function(b) { return b.id === buffId; });
        if (existing) {
            existing.duration = Math.max(existing.duration, duration);
            existing.stacks = Math.min((existing.stacks || 1) + (stacks || 1), buffDef.maxStacks || 1);
        } else {
            this.activeBuffs[target].push({ id: buffId, duration: duration, stacks: stacks || 1, tickCount: 0 });
        }
        return true;
    },

    remove: function(target, buffId) {
        this.activeBuffs[target] = this.activeBuffs[target].filter(function(b) { return b.id !== buffId; });
    },

    has: function(target, buffId) {
        return this.activeBuffs[target].some(function(b) { return b.id === buffId; });
    },

    getStacks: function(target, buffId) {
        var buff = this.activeBuffs[target].find(function(b) { return b.id === buffId; });
        return buff ? buff.stacks : 0;
    },

    // 解释 tickEffect 数据并执行
    _applyTickEffect: function(target, buffDef, stacks, context) {
        var effect = buffDef.tickEffect;
        if (!effect) return;

        var isPlayer = target === 'player';
        var hp = isPlayer ? player.health : (context.monster ? context.monster.health : 100);
        var maxHp = isPlayer ? 100 : (context.monster ? context.monster.maxHealth : 100);
        var dmg = 0;

        switch (effect.type) {
            case 'damagePercent':
                var base = effect.base === 'maxHp' ? maxHp : hp;
                dmg = Math.floor(base * (effect.percent / 100) * stacks);
                if (isPlayer) player.health = Math.max(0, player.health - dmg);
                else if (context.monster) context.monster.health = Math.max(0, context.monster.health - dmg);
                break;

            case 'damageFlat':
                dmg = effect.base * stacks;
                if (isPlayer) player.health = Math.max(0, player.health - dmg);
                else if (context.monster) context.monster.health = Math.max(0, context.monster.health - dmg);
                break;

            case 'healFlat':
                var heal = effect.base * stacks;
                if (isPlayer) player.health = Math.min(100, player.health + heal);
                else if (context.monster) context.monster.health = Math.min(context.monster.maxHealth, context.monster.health + heal);
                break;

            case 'healPercent':
                var healBase = effect.base === 'maxHp' ? maxHp : hp;
                var healAmt = Math.floor(healBase * (effect.percent / 100) * stacks);
                if (isPlayer) player.health = Math.min(100, player.health + healAmt);
                else if (context.monster) context.monster.health = Math.min(context.monster.maxHealth, context.monster.health + healAmt);
                break;

            case 'statFlat':
                if (isPlayer && player[effect.stat] !== undefined) {
                    player[effect.stat] = Math.max(0, Math.min(100, player[effect.stat] + effect.base * stacks));
                }
                break;
        }
    },

    // 检查是否跳过回合
    shouldSkipTurn: function(target) {
        var self = this;
        return this.activeBuffs[target].some(function(buff) {
            var def = BUFF_DEFS[buff.id];
            return def && def.skipTurn;
        });
    },

    process: function(target, context) {
        var toRemove = [];
        var self = this;

        this.activeBuffs[target].forEach(function(buff, index) {
            var buffDef = BUFF_DEFS[buff.id];
            if (!buffDef) { toRemove.push(index); return; }

            // 执行数据驱动的 tick 效果
            self._applyTickEffect(target, buffDef, buff.stacks, context || {});

            buff.tickCount++;
            buff.duration--;
            if (buff.duration <= 0) toRemove.push(index);
        });

        toRemove.reverse().forEach(function(i) { self.activeBuffs[target].splice(i, 1); });
    },

    getIcons: function(target) {
        return this.activeBuffs[target].map(function(buff) {
            var buffDef = BUFF_DEFS[buff.id];
            if (!buffDef) return '';
            var icon = buffDef.icon || '?';
            if (buff.stacks > 1) icon += buff.stacks;
            return icon;
        }).join(' ');
    },

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

    hasInvincible: function(target) {
        return this.activeBuffs[target].some(function(buff) {
            var def = BUFF_DEFS[buff.id];
            return def && def.modifiers && def.modifiers.invincible;
        });
    },

    hasCounter: function(target) {
        return this.activeBuffs[target].some(function(buff) {
            var def = BUFF_DEFS[buff.id];
            return def && def.modifiers && def.modifiers.counter;
        });
    },

    clearAll: function(target) { this.activeBuffs[target] = []; },
    count: function(target) { return this.activeBuffs[target].length; },
    serialize: function() { return JSON.parse(JSON.stringify(this.activeBuffs)); },
    deserialize: function(data) { if (data && data.player && data.monster) this.activeBuffs = data; }
};

if (typeof KBA !== 'undefined') KBA.systems.buffSystem = BuffSystem;
