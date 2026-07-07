// Plugin System
// Unified plugin registration mechanism for extending game content

var PluginSystem = {
    plugins: {},
    hooks: {},

    // Register a plugin
    register: function(plugin) {
        if (!plugin || !plugin.id) {
            console.warn('PluginSystem: Invalid plugin');
            return false;
        }

        this.plugins[plugin.id] = {
            id: plugin.id,
            name: plugin.name || plugin.id,
            version: plugin.version || '1.0.0',
            description: plugin.description || '',
            author: plugin.author || 'Unknown',
            enabled: true,
            init: plugin.init || null,
            data: plugin.data || {},
            hooks: plugin.hooks || {}
        };

        // Register hooks
        if (plugin.hooks) {
            Object.entries(plugin.hooks).forEach(function(entry) {
                var event = entry[0], handler = entry[1];
                PluginSystem.addHook(event, plugin.id, handler);
            });
        }

        console.log('Plugin registered: ' + plugin.id);
        return true;
    },

    // Initialize all plugins
    initAll: function() {
        Object.values(this.plugins).forEach(function(plugin) {
            if (plugin.enabled && plugin.init) {
                try {
                    plugin.init();
                    console.log('Plugin initialized: ' + plugin.id);
                } catch (e) {
                    console.error('Plugin init failed: ' + plugin.id, e);
                }
            }
        });
    },

    // Add a hook
    addHook: function(event, pluginId, handler) {
        if (!this.hooks[event]) this.hooks[event] = [];
        this.hooks[event].push({ pluginId: pluginId, handler: handler });
    },

    // Execute hooks for an event
    executeHooks: function(event, data) {
        var hooks = this.hooks[event];
        if (!hooks) return data;

        hooks.forEach(function(hook) {
            var plugin = PluginSystem.plugins[hook.pluginId];
            if (plugin && plugin.enabled) {
                try {
                    data = hook.handler(data) || data;
                } catch (e) {
                    console.error('Hook error: ' + event + ' (' + hook.pluginId + ')', e);
                }
            }
        });

        return data;
    },

    // Enable/disable plugin
    setEnabled: function(pluginId, enabled) {
        if (this.plugins[pluginId]) {
            this.plugins[pluginId].enabled = enabled;
        }
    },

    // Get plugin info
    getPlugin: function(pluginId) {
        return this.plugins[pluginId] || null;
    },

    // List all plugins
    listPlugins: function() {
        return Object.values(this.plugins).map(function(p) {
            return { id: p.id, name: p.name, version: p.version, enabled: p.enabled };
        });
    },

    // Inject plugin data into game data
    injectData: function(pluginId) {
        var plugin = this.plugins[pluginId];
        if (!plugin || !plugin.data) return;

        var data = plugin.data;
        if (data.items && typeof ITEMS !== 'undefined') Object.assign(ITEMS, data.items);
        if (data.monsters && typeof MONSTERS !== 'undefined') Object.assign(MONSTERS, data.monsters);
        if (data.maps && typeof MAPS !== 'undefined') Object.assign(MAPS, data.maps);
        if (data.skills && typeof SKILLS !== 'undefined') Object.assign(SKILLS, data.skills);
        if (data.events && typeof EVENTS !== 'undefined') Object.assign(EVENTS, data.events);
    }
};

if (typeof KBA !== 'undefined') KBA.systems.pluginSystem = PluginSystem;
