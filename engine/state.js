// State Machine - 游戏状态机
// 统一管理游戏状态（主界面、战斗、对话、建造等）

const GameStateMachine = {
    // 当前状态
    currentState: 'main',

    // 状态定义
    states: {},

    // 状态转换历史
    history: [],

    // 注册状态
    register(stateId, stateDef) {
        this.states[stateId] = {
            id: stateId,
            onEnter: stateDef.onEnter || (() => {}),
            onExit: stateDef.onExit || (() => {}),
            onUpdate: stateDef.onUpdate || (() => {}),
            allowedTransitions: stateDef.allowedTransitions || [],
            ...stateDef
        };
    },

    // 切换状态
    transition(newState, data = {}) {
        if (!this.states[newState]) {
            console.warn('Unknown state:', newState);
            return false;
        }

        const current = this.states[this.currentState];
        const next = this.states[newState];

        // 检查是否允许转换
        if (current.allowedTransitions.length > 0 && !current.allowedTransitions.includes(newState)) {
            console.warn(`Transition ${this.currentState} -> ${newState} not allowed`);
            return false;
        }

        // 执行退出回调
        current.onExit(data);

        // 记录历史
        this.history.push({
            from: this.currentState,
            to: newState,
            time: Date.now()
        });

        // 切换状态
        this.currentState = newState;

        // 执行进入回调
        next.onEnter(data);

        // 触发事件
        if (typeof EventBus !== 'undefined') {
            EventBus.emit('state:changed', { from: current.id, to: newState, data });
        }

        return true;
    },

    // 返回上一个状态
    back() {
        if (this.history.length === 0) return false;
        const last = this.history[this.history.length - 1];
        return this.transition(last.from);
    },

    // 获取当前状态
    getCurrent() {
        return this.currentState;
    },

    // 检查是否在某个状态
    is(stateId) {
        return this.currentState === stateId;
    },

    // 更新（每帧调用）
    update() {
        const current = this.states[this.currentState];
        if (current && current.onUpdate) {
            current.onUpdate();
        }
    }
};

// 注册游戏状态
GameStateMachine.register('main', {
    name: '主界面',
    allowedTransitions: ['battle', 'dialogue', 'building', 'crafting', 'inventory', 'map']
});

GameStateMachine.register('battle', {
    name: '战斗',
    allowedTransitions: ['main'],
    onEnter: (data) => {
        // 进入战斗时禁用某些UI
    },
    onExit: (data) => {
        // 退出战斗时清理
    }
});

GameStateMachine.register('dialogue', {
    name: '对话',
    allowedTransitions: ['main', 'trading'],
    onEnter: (data) => {
        // 打开对话UI
    }
});

GameStateMachine.register('trading', {
    name: '交易',
    allowedTransitions: ['dialogue', 'main']
});

GameStateMachine.register('building', {
    name: '建造',
    allowedTransitions: ['main']
});

GameStateMachine.register('crafting', {
    name: '制作',
    allowedTransitions: ['main']
});

GameStateMachine.register('inventory', {
    name: '背包',
    allowedTransitions: ['main']
});

GameStateMachine.register('map', {
    name: '地图',
    allowedTransitions: ['main']
});

// 注册到命名空间
if (typeof KBA !== 'undefined') {
    KBA.systems.stateMachine = GameStateMachine;
}
