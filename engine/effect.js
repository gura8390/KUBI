// Effect System - 统一效果处理器
// 所有属性变化（回血、扣血、获得物品、Buff等）统一走这个系统

const EffectSystem = {
    // 效果类型注册表
    effectHandlers: {},

    // 注册效果处理器
    register(type, handler) {
        this.effectHandlers[type] = handler;
    },

    // 执行单个效果
    execute(effect, context = {}) {
        const handler = this.effectHandlers[effect.type];
        if (!handler) {
            console.warn('Unknown effect type:', effect.type);
            return null;
        }
        return handler(effect, context);
    },

    // 执行效果列表
    executeAll(effects, context = {}) {
        const results = [];
        for (const effect of effects) {
            const result = this.execute(effect, context);
            results.push(result);
        }
        return results;
    },

    // 创建效果实例
    create(type, params = {}) {
        return { type, ...params };
    }
};

// 注册内置效果处理器

// 属性修改效果
EffectSystem.register('stat', (effect, context) => {
    const { target = 'player', stat, value, mode = 'add' } = effect;
    const obj = target === 'player' ? player : context[target];
    if (!obj || obj[stat] === undefined) return null;

    const oldVal = obj[stat];
    if (mode === 'add') obj[stat] += value;
    else if (mode === 'set') obj[stat] = value;
    else if (mode === 'multiply') obj[stat] = Math.floor(obj[stat] * value);
    else if (mode === 'max') obj[stat] = Math.min(obj[stat], value);
    else if (mode === 'min') obj[stat] = Math.max(obj[stat], value);

    return { type: 'stat', stat, oldVal, newVal: obj[stat], delta: obj[stat] - oldVal };
});

// 回复效果（生命、体力等，带上限）
EffectSystem.register('heal', (effect) => {
    const { stat = 'health', value, max = 100 } = effect;
    const oldVal = player[stat];
    player[stat] = Math.min(max, player[stat] + value);
    return { type: 'heal', stat, healed: player[stat] - oldVal, newVal: player[stat] };
});

// 伤害效果
EffectSystem.register('damage', (effect, context) => {
    const { target = 'player', value, ignoreDefense = false } = effect;
    const obj = target === 'player' ? player : context[target];
    if (!obj) return null;

    let finalDmg = value;
    if (!ignoreDefense && obj.defense) {
        finalDmg = Math.max(1, value - obj.defense);
    }

    const oldVal = obj.health || obj.hp;
    if (target === 'player') {
        player.health = Math.max(0, player.health - finalDmg);
    } else if (context.monster) {
        context.monster.health = Math.max(0, context.monster.health - finalDmg);
    }
    return { type: 'damage', target, damage: finalDmg };
});

// 物品获取效果
EffectSystem.register('item', (effect) => {
    const { item, count = 1, action = 'add' } = effect;
    if (action === 'add') {
        const success = addItemToInventory(item, count);
        return { type: 'item', action: 'add', item, count, success };
    } else if (action === 'remove') {
        const success = removeItemFromInventory(item, count);
        return { type: 'item', action: 'remove', item, count, success };
    }
});

// 状态效果（Buff/Debuff）
EffectSystem.register('status', (effect, context) => {
    const { target = 'player', statusType, duration, data = {} } = effect;
    if (context.battle) {
        context.battle.addStatusEffect(target, statusType, duration, data);
    }
    return { type: 'status', target, statusType, duration };
});

// 消息效果
EffectSystem.register('message', (effect) => {
    const { text, msgType = 'info' } = effect;
    showMessage(text, msgType);
    return { type: 'message', text };
});

// 音效效果
EffectSystem.register('sound', (effect) => {
    const { sound } = effect;
    if (typeof soundSystem !== 'undefined' && soundSystem.enabled) {
        soundSystem.play(sound);
    }
    return { type: 'sound', sound };
});

// 经验值效果
EffectSystem.register('xp', (effect) => {
    const { value } = effect;
    if (typeof addXP === 'function') addXP(value);
    return { type: 'xp', value };
});

// 魂效果
EffectSystem.register('soul', (effect) => {
    const { value } = effect;
    if (typeof addSoul === 'function') addSoul(value);
    return { type: 'soul', value };
});

// 成就统计效果
EffectSystem.register('achievement', (effect) => {
    const { stat, value = 1 } = effect;
    if (typeof achievementSystem !== 'undefined') {
        achievementSystem.updateStat(stat, value);
    }
    return { type: 'achievement', stat, value };
});

// 任务进度效果
EffectSystem.register('quest', (effect) => {
    const { questType, target, amount = 1 } = effect;
    if (typeof questSystem !== 'undefined') {
        questSystem.updateProgress(questType, target, amount);
    }
    return { type: 'quest', questType, target };
});

// 随机效果（从列表中随机选择一个执行）
EffectSystem.register('random', (effect, context) => {
    const { effects, weights } = effect;
    if (!effects || effects.length === 0) return null;

    let selected;
    if (weights) {
        const total = weights.reduce((a, b) => a + b, 0);
        let roll = Math.random() * total;
        for (let i = 0; i < effects.length; i++) {
            roll -= weights[i];
            if (roll <= 0) { selected = effects[i]; break; }
        }
    } else {
        selected = effects[Math.floor(Math.random() * effects.length)];
    }

    return selected ? EffectSystem.execute(selected, context) : null;
});

// 条件效果（满足条件才执行）
EffectSystem.register('conditional', (effect, context) => {
    const { condition, thenEffects, elseEffects } = effect;
    const met = evaluateCondition(condition, context);
    if (met && thenEffects) {
        return EffectSystem.executeAll(thenEffects, context);
    } else if (!met && elseEffects) {
        return EffectSystem.executeAll(elseEffects, context);
    }
    return { type: 'conditional', met };
});

// 条件评估辅助函数
function evaluateCondition(condition, context) {
    if (!condition) return true;
    const { type, stat, value, operator = '>=' } = condition;
    let actual;
    switch (type) {
        case 'stat': actual = player[stat]; break;
        case 'item': actual = countItemInInventory(stat); break;
        case 'building': actual = hasBuilding(stat) ? 1 : 0; break;
        case 'level': actual = player.level || 1; break;
        default: actual = 0;
    }
    switch (operator) {
        case '>=': return actual >= value;
        case '<=': return actual <= value;
        case '>': return actual > value;
        case '<': return actual < value;
        case '==': return actual === value;
        case '!=': return actual !== value;
        default: return false;
    }
}

// 注册到命名空间
if (typeof KBA !== 'undefined') {
    KBA.systems.effectSystem = EffectSystem;
}
