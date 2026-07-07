// Plugin System - MOD 时代
// 支持注册、钩子、数据注入、生命周期

var PluginSystem = {
    plugins: {},
    hooks: {},
    modDirectories: [],

    register: function(plugin) {
        if (!plugin || !plugin.id) return false;
        this.plugins[plugin.id] = {
            id: plugin.id,
            name: plugin.name || plugin.id,
            version: plugin.version || '1.0.0',
            description: plugin.description || '',
            author: plugin.author || 'Unknown',
            enabled: true,
            lifecycle: {
                onLoad: plugin.onLoad || null,
                onGameStart: plugin.onGameStart || null,
                onBattleStart: plugin.onBattleStart || null,
                onBattleEnd: plugin.onBattleEnd || null,
                onTick: plugin.onTick || null,
                onDayChange: plugin.onDayChange || null,
                onSeasonChange: plugin.onSeasonChange || null,
                onUnload: plugin.onUnload || null
            },
            data: plugin.data || {},
            hooks: plugin.hooks || {}
        };
        if (plugin.hooks) {
            Object.entries(plugin.hooks).forEach(function(entry) {
                PluginSystem.addHook(entry[0], plugin.id, entry[1]);
            });
        }
        console.log('Plugin registered: ' + plugin.id);
        return true;
    },

    // 从 mods/ 目录加载插件
    loadMods: function() {
        // 检查 mods/ 目录是否存在
        var modDirs = ['mods/'];
        modDirs.forEach(function(dir) {
            // 实际项目中需要通过 fetch 或 require 加载
            // 这里提供接口供外部调用
            console.log('PluginSystem: Scanning ' + dir + ' for mods...');
        });
    },

    // 注入插件数据到游戏
    injectData: function(pluginId) {
        var plugin = this.plugins[pluginId];
        if (!plugin || !plugin.data) return;

        var data = plugin.data;
        if (data.items && typeof ITEMS !== 'undefined') {
            Object.assign(ITEMS, data.items);
            console.log('Injected ' + Object.keys(data.items).length + ' items from ' + pluginId);
        }
        if (data.monsters && typeof MONSTERS !== 'undefined') {
            Object.assign(MONSTERS, data.monsters);
            console.log('Injected ' + Object.keys(data.monsters).length + ' monsters from ' + pluginId);
        }
        if (data.maps && typeof MAPS !== 'undefined') {
            Object.assign(MAPS, data.maps);
            console.log('Injected ' + Object.keys(data.maps).length + ' maps from ' + pluginId);
        }
        if (data.npcs && typeof NPCS !== 'undefined') {
            Object.assign(NPCS, data.npcs);
            console.log('Injected ' + Object.keys(data.npcs).length + ' NPCs from ' + pluginId);
        }
        if (data.recipes && typeof CRAFTING_RECIPES !== 'undefined') {
            Object.assign(CRAFTING_RECIPES, data.recipes);
            console.log('Injected ' + Object.keys(data.recipes).length + ' recipes from ' + pluginId);
        }
        if (data.skills && typeof SKILLS !== 'undefined') {
            Object.assign(SKILLS, data.skills);
        }
        if (data.events && typeof EVENTS !== 'undefined') {
            Object.assign(EVENTS, data.events);
        }
        if (data.buffs && typeof BUFF_DEFS !== 'undefined') {
            Object.assign(BUFF_DEFS, data.buffs);
        }
    },

    triggerLifecycle: function(event, data) {
        Object.values(this.plugins).forEach(function(plugin) {
            if (plugin.enabled && plugin.lifecycle[event]) {
                try {
                    plugin.lifecycle[event](data);
                } catch (e) {
                    console.error('Plugin lifecycle error: ' + plugin.id + '.' + event, e);
                }
            }
        });
    },

    initAll: function() {
        this.loadMods();
        this.triggerLifecycle('onLoad');
        Object.keys(this.plugins).forEach(function(id) {
            PluginSystem.injectData(id);
        });
    },

    onGameStart: function() { this.triggerLifecycle('onGameStart'); },
    onBattleStart: function(data) { this.triggerLifecycle('onBattleStart', data); },
    onBattleEnd: function(data) { this.triggerLifecycle('onBattleEnd', data); },
    onTick: function(data) { this.triggerLifecycle('onTick', data); },
    onDayChange: function(data) { this.triggerLifecycle('onDayChange', data); },
    onSeasonChange: function(data) { this.triggerLifecycle('onSeasonChange', data); },

    addHook: function(event, pluginId, handler) {
        if (!this.hooks[event]) this.hooks[event] = [];
        this.hooks[event].push({ pluginId: pluginId, handler: handler });
    },

    executeHooks: function(event, data) {
        var hooks = this.hooks[event];
        if (!hooks) return data;
        hooks.forEach(function(hook) {
            var plugin = PluginSystem.plugins[hook.pluginId];
            if (plugin && plugin.enabled) {
                try { data = hook.handler(data) || data; } catch (e) {}
            }
        });
        return data;
    },

    setEnabled: function(pluginId, enabled) {
        if (this.plugins[pluginId]) {
            this.plugins[pluginId].enabled = enabled;
            if (!enabled && this.plugins[pluginId].lifecycle.onUnload) {
                this.plugins[pluginId].lifecycle.onUnload();
            }
        }
    },

    listPlugins: function() {
        return Object.values(this.plugins).map(function(p) {
            return { id: p.id, name: p.name, version: p.version, enabled: p.enabled };
        });
    },

    // 显示插件管理界面
    showPluginPanel: function() {
        var plugins = this.listPlugins();
        var content = '<div class="plugin-panel">';
        content += '<h4>插件管理</h4>';
        if (plugins.length === 0) {
            content += '<p>暂无已注册插件</p>';
            content += '<p>将插件放入 mods/ 目录即可自动加载</p>';
        } else {
            plugins.forEach(function(p) {
                content += '<div style="margin:5px 0;padding:8px;border:1px solid #ccc;">';
                content += '<strong>' + p.name + '</strong> v' + p.version;
                content += ' [' + (p.enabled ? '已启用' : '已禁用') + ']';
                content += '</div>';
            });
        }
        content += '</div>';
        showModal('插件管理', content, [{ text: '关闭', action: 'hideModal();' }]);
    }
};

if (typeof KBA !== 'undefined') KBA.systems.pluginSystem = PluginSystem;
