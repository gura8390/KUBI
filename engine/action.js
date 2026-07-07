// Action System - 统一行动执行器
// 探索、采集、休息、建造等行动全部通过 executeAction(id) 执行

const ActionSystem = {
    // 行动注册表
    actions: {},

    // 注册行动
    register(id, actionDef) {
        this.actions[id] = actionDef;
    },

    // 执行行动
    execute(actionId, context = {}) {
        const action = this.actions[actionId];
        if (!action) {
            showMessage('未知行动: ' + actionId, 'error');
            return null;
        }

        // 检查前置条件
        if (action.requirements) {
            const reqResult = this.checkRequirements(action.requirements, context);
            if (!reqResult.met) {
                showMessage(reqResult.message, 'error');
                return null;
            }
        }

        // 消耗资源
        if (action.costs) {
            const costResult = this.payCosts(action.costs);
            if (!costResult.paid) {
                showMessage(costResult.message, 'error');
                return null;
            }
        }

        // 推进时间
        if (action.timeCost) {
            timeSystem.advanceTime(action.timeCost);
        }

        // 执行效果
        let results = [];
        if (action.effects) {
            results = EffectSystem.executeAll(action.effects, context);
        }

        // 执行自定义逻辑
        if (action.execute) {
            const customResult = action.execute(context);
            if (customResult) results.push(customResult);
        }

        // 播放音效
        if (action.sound && typeof soundSystem !== 'undefined' && soundSystem.enabled) {
            soundSystem.play(action.sound);
        }

        // 触发事件总线
        if (typeof EventBus !== 'undefined') {
            EventBus.emit('action:executed', { actionId, results, context });
        }

        // 更新UI
        updateUI();

        return results;
    },

    // 检查前置条件
    checkRequirements(requirements, context) {
        for (const req of requirements) {
            switch (req.type) {
                case 'stamina':
                    if (player.stamina < req.value) {
                        return { met: false, message: '体力不足!' };
                    }
                    break;
                case 'item':
                    if (!hasItem(req.item, req.count || 1)) {
                        return { met: false, message: '需要' + getItemName(req.item) + '×' + (req.count || 1) };
                    }
                    break;
                case 'building':
                    if (!hasBuilding(req.building)) {
                        return { met: false, message: '需要先建造' + getBuildingName(req.building) };
                    }
                    break;
                case 'map':
                    if (mapSystem.currentMap !== req.map) {
                        return { met: false, message: '需要在' + (MAPS[req.map] ? MAPS[req.map].name : req.map) };
                    }
                    break;
                case 'level':
                    if ((player.level || 1) < req.value) {
                        return { met: false, message: '需要等级' + req.value };
                    }
                    break;
                case 'notInBattle':
                    if (battleSystem.isInBattle && battleSystem.isInBattle()) {
                        return { met: false, message: '战斗中无法执行此操作!' };
                    }
                    break;
            }
        }
        return { met: true };
    },

    // 支付消耗
    payCosts(costs) {
        for (const cost of costs) {
            switch (cost.type) {
                case 'stamina':
                    if (player.stamina < cost.value) {
                        return { paid: false, message: '体力不足!' };
                    }
                    player.stamina -= cost.value;
                    break;
                case 'item':
                    if (!hasItem(cost.item, cost.count || 1)) {
                        return { paid: false, message: '材料不足!' };
                    }
                    removeItemFromInventory(cost.item, cost.count || 1);
                    break;
            }
        }
        return { paid: true };
    },

    // 获取可用行动列表（用于UI显示）
    getAvailableActions(context = {}) {
        return Object.entries(this.actions)
            .filter(([id, action]) => {
                if (action.hidden) return false;
                if (action.requirements) {
                    const req = this.checkRequirements(action.requirements, context);
                    return req.met;
                }
                return true;
            })
            .map(([id, action]) => ({
                id,
                name: action.name,
                icon: action.icon || '',
                description: action.description || '',
                available: true
            }));
    }
};

// 注册内置行动

// 采集木材
ActionSystem.register('chop', {
    name: '砍树',
    icon: '🪓',
    description: '采集木材',
    timeCost: 2,
    costs: [{ type: 'stamina', value: 3 }],
    effects: [
        { type: 'item', item: 'wood', count: 1 },
        { type: 'achievement', stat: 'itemsCrafted', value: 1 }
    ],
    sound: 'pick'
});

// 采集浆果
ActionSystem.register('gather', {
    name: '采集浆果',
    icon: '🫐',
    description: '采集食物',
    timeCost: 2,
    costs: [{ type: 'stamina', value: 3 }],
    effects: [
        { type: 'item', item: 'berry', count: 1 }
    ],
    sound: 'pick'
});

// 狩猎
ActionSystem.register('hunt', {
    name: '狩猎',
    icon: '🏹',
    description: '狩猎获取肉和皮毛',
    timeCost: 3,
    costs: [{ type: 'stamina', value: 5 }],
    effects: [
        { type: 'item', item: 'rawMeat', count: 1 }
    ],
    sound: 'pick'
});

// 拾荒
ActionSystem.register('scavenge', {
    name: '拾荒',
    icon: '🔍',
    description: '搜索有用物品',
    timeCost: 2,
    costs: [{ type: 'stamina', value: 3 }],
    effects: [
        { type: 'random', effects: [
            { type: 'item', item: 'herb', count: 1 },
            { type: 'item', item: 'stone', count: 1 },
            { type: 'item', item: 'seed', count: 1 }
        ]}
    ],
    sound: 'pick'
});

// 休息
ActionSystem.register('rest', {
    name: '休息',
    icon: '😴',
    description: '恢复体力和生命',
    timeCost: 4,
    effects: [
        { type: 'heal', stat: 'health', value: 20, max: 100 },
        { type: 'heal', stat: 'stamina', value: 30, max: 100 },
        { type: 'heal', stat: 'sanity', value: 10, max: 100 }
    ],
    sound: 'sleep'
});

// 注册到命名空间
if (typeof KBA !== 'undefined') {
    KBA.systems.actionSystem = ActionSystem;
}
