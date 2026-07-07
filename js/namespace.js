// 命名空间系统 - 避免全局变量污染
// 所有游戏系统挂载到 window.KBA 命名空间下
// 改进：模块注册/发现机制、优先级初始化

(function() {
    'use strict';

    // 主命名空间
    window.KBA = {
        // 数据层
        data: {
            ITEMS: null,
            BUILDINGS: null,
            MAPS: null,
            MONSTERS: null,
            NPCS: null,
            COOKING_RECIPES: null,
            CRAFTING_RECIPES: null
        },

        // 系统层
        systems: {
            player: null,
            mapSystem: null,
            battleSystem: null,
            timeSystem: null,
            craftSystem: null,
            npcSystem: null,
            storage: null,
            soundSystem: null,
            game: null,
            weatherSystem: null,
            eventSystem: null,
            questSystem: null,
            achievementSystem: null
        },

        // 工具函数
        utils: {},

        // 版本
        version: '5.1',

        // ── 模块注册表 ───────────────────────────────

        // 已注册模块列表（用于优先级初始化）
        _modules: [],

        // 注册数据到命名空间
        registerData: function(name, data) {
            this.data[name] = data;
        },

        // 注册系统到命名空间
        registerSystem: function(name, system) {
            this.systems[name] = system;
        },

        // 注册模块（带优先级，用于自动初始化）
        // opts: { name, init: Function, priority: Number(越小越先), deps: [string] }
        registerModule: function(opts) {
            if (!opts || !opts.name || typeof opts.init !== 'function') {
                console.warn('registerModule: 缺少 name 或 init', opts);
                return;
            }
            this._modules.push({
                name: opts.name,
                init: opts.init,
                priority: opts.priority || 100,
                deps: opts.deps || [],
                initialized: false
            });
        },

        // 按优先级初始化所有已注册模块
        initModules: function() {
            // 按优先级排序（数字小的先执行）
            this._modules.sort((a, b) => a.priority - b.priority);

            const results = [];
            for (const mod of this._modules) {
                // 检查依赖是否已初始化
                const missingDeps = mod.deps.filter(dep => {
                    const depMod = this._modules.find(m => m.name === dep);
                    return depMod && !depMod.initialized;
                });

                if (missingDeps.length > 0) {
                    console.warn(`模块 [${mod.name}] 跳过: 缺少依赖 [${missingDeps.join(', ')}]`);
                    results.push({ name: mod.name, status: 'skipped', reason: 'missing deps' });
                    continue;
                }

                try {
                    mod.init();
                    mod.initialized = true;
results.push({ name: mod.name, status: 'ok' });
                } catch (e) {
                    console.error(`✗ ${mod.name} 初始化失败:`, e);
                    results.push({ name: mod.name, status: 'error', error: e });
                }
            }

            return results;
        },

        // 获取数据

        // 获取系统
    };
})();
