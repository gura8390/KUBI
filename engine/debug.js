// Debug Panel - Enhanced with DataSchema integration
var DebugPanel = {
    visible: false,
    godMode: false,
    init: function() {
        this.createPanel();
        var self = this;
        document.addEventListener('keydown', function(e) {
            if (e.key === '~' || e.key === '`' || e.keyCode === 192) { e.preventDefault(); e.stopPropagation(); self.toggle(); return false; }
        });
    },
    createPanel: function() {
        var p = document.createElement('div');
        p.id = 'debug-panel';
        p.style.cssText = 'display:none;position:fixed;top:10px;right:10px;width:400px;background:#1a1a2e;color:#eee;padding:15px;border-radius:8px;z-index:10000;font-family:monospace;font-size:12px;max-height:80vh;overflow-y:auto;';
        p.innerHTML = '<h3>Debug Panel</h3>' +
            '<div><b>Resources</b></div>' +
            '<div><button id="dbg-wood">+10 Wood</button> <button id="dbg-gold">+100 Gold</button> <button id="dbg-iron">+10 Iron</button></div>' +
            '<div><button id="dbg-heal">Full Heal</button> <button id="dbg-lvl">+1 Lvl</button> <button id="dbg-soul">+50 Soul</button></div>' +
            '<div><b>Map</b></div>' +
            '<div><select id="debug-map-select"></select> <button id="dbg-unlock">Unlock All</button></div>' +
            '<div><b>Tools</b></div>' +
            '<div><button id="dbg-log">Game Log</button> <button id="dbg-buffs">Buffs</button> <button id="dbg-world">World State</button></div>' +
            '<div><button id="dbg-validate">Data Validate</button> <button id="dbg-plugins">Plugins</button></div>' +
            '<div><button id="dbg-save">Save</button> <button id="dbg-load">Load</button> <button id="dbg-sort">Sort Inv</button></div>' +
            '<div id="debug-status" style="margin-top:10px;background:#16213e;padding:8px;border-radius:4px;"></div>' +
            '<div id="debug-validate" style="margin-top:10px;background:#1a2e1a;padding:8px;border-radius:4px;display:none;"></div>';
        document.body.appendChild(p);
        this.panel = p;
        this.bindButtons();
        this.updateMapSelect();
        var self = this;
        setInterval(function() { self.updateStatus(); }, 1000);
    },
    bindButtons: function() {
        var self = this;
        document.getElementById('dbg-wood').onclick = function() { self.addItem('wood', 10); };
        document.getElementById('dbg-gold').onclick = function() { self.addItem('gold', 100); };
        document.getElementById('dbg-iron').onclick = function() { self.addItem('iron', 10); };
        document.getElementById('dbg-heal').onclick = function() { self.healAll(); };
        document.getElementById('dbg-lvl').onclick = function() { self.addLevel(1); };
        document.getElementById('dbg-soul').onclick = function() { self.addSoul(50); };
        document.getElementById('dbg-unlock').onclick = function() { self.unlockAllMaps(); };
        document.getElementById('dbg-log').onclick = function() { if (typeof GameLogger !== 'undefined') GameLogger.showLogPanel(); };
        document.getElementById('dbg-buffs').onclick = function() { self.showBuffs(); };
        document.getElementById('dbg-world').onclick = function() { self.showWorldState(); };
        document.getElementById('dbg-validate').onclick = function() { self.showValidation(); };
        document.getElementById('dbg-plugins').onclick = function() { if (typeof PluginSystem !== 'undefined') PluginSystem.showPluginPanel(); };
        document.getElementById('dbg-save').onclick = function() { storage.save(); };
        document.getElementById('dbg-load').onclick = function() { storage.load(); updateUI(); };
        document.getElementById('dbg-sort').onclick = function() { if (typeof QoLSystem !== 'undefined') QoLSystem.sortInventory(); };
        document.getElementById('debug-map-select').onchange = function() { self.teleport(this.value); };
    },
    toggle: function() { this.visible = !this.visible; this.panel.style.display = this.visible ? 'block' : 'none'; },
    addItem: function(id, n) { addItemToInventory(id, n); showMessage('+' + n + ' ' + getItemName(id), 'info'); updateUI(); },
    healAll: function() { player.health=100; player.hunger=100; player.stamina=100; player.thirst=100; player.sanity=100; updateUI(); },
    addLevel: function(n) { for(var i=0;i<n;i++){player.level=(player.level||1)+1;player.attack+=2;player.defense+=1;} updateUI(); },
    addSoul: function(n) { player.soul+=n; updateUI(); },
    teleport: function(id) { if(id) mapSystem.switchMap(id); },
    unlockAllMaps: function() { Object.keys(MAPS).forEach(function(id){if(player.unlockedMaps.indexOf(id)<0) player.unlockedMaps.push(id);}); mapSystem.updateMapButtons(); },
    showBuffs: function() {
        if (typeof BuffSystem === 'undefined') return;
        var icons = BuffSystem.getIcons('player');
        showMessage('Player Buffs: ' + (icons || 'None'), 'info');
    },
    showWorldState: function() {
        if (typeof WorldState === 'undefined') return;
        var s = WorldState.state;
        showMessage('Town Lv:' + s.townLevel + ' | Boss Kills:' + Object.keys(s.bossKills).length, 'info');
    },
    // 数据校验 - 直接显示在面板上
    showValidation: function() {
        var el = document.getElementById('debug-validate');
        if (!el) return;

        if (typeof DataSchema === 'undefined') {
            el.style.display = 'block';
            el.innerHTML = '<b style="color:#e94560;">DataSchema not loaded</b>';
            return;
        }

        var report = DataSchema.runFullValidation();
        var html = '<b>Data Validation Report</b><br>';
        html += '<div style="margin-top:5px;">';

        ['items', 'monsters', 'maps', 'npcs', 'recipes'].forEach(function(key) {
            var r = report[key];
            var color = r.valid ? '#5a7a4e' : '#b85450';
            html += '<div style="color:' + color + ';">' + key + ': ' + r.count + ' entries ' + (r.valid ? 'VALID' : r.errors.length + ' ERRORS') + '</div>';
            if (!r.valid) {
                r.errors.slice(0, 3).forEach(function(e) {
                    html += '<div style="color:#d4a0a0;margin-left:10px;font-size:11px;">' + e + '</div>';
                });
                if (r.errors.length > 3) html += '<div style="color:#d4a0a0;margin-left:10px;">... +' + (r.errors.length - 3) + ' more</div>';
            }
        });

        if (report.duplicates.length > 0) {
            html += '<div style="color:#b85450;">Duplicates: ' + report.duplicates.length + '</div>';
        }
        if (report.references.length > 0) {
            html += '<div style="color:#b85450;">Ref Errors: ' + report.references.length + '</div>';
            report.references.slice(0, 3).forEach(function(r) {
                html += '<div style="color:#d4a0a0;margin-left:10px;font-size:11px;">' + r + '</div>';
            });
        }

        var totalErrors = (report.items.errors||[]).length + (report.monsters.errors||[]).length +
            (report.maps.errors||[]).length + (report.npcs.errors||[]).length + (report.recipes.errors||[]).length +
            report.duplicates.length + report.references.length;

        html += '<div style="margin-top:5px;font-weight:bold;color:' + (totalErrors === 0 ? '#5a7a4e' : '#b85450') + ';">Total Errors: ' + totalErrors + '</div>';
        html += '</div>';

        el.style.display = 'block';
        el.innerHTML = html;
    },
    updateMapSelect: function() {
        var s = document.getElementById('debug-map-select');
        if(!s) return;
        s.innerHTML = '<option value="">--Map--</option>';
        Object.keys(MAPS).forEach(function(id){ s.innerHTML += '<option value="'+id+'">'+MAPS[id].name+'</option>'; });
    },
    updateStatus: function() {
        var el = document.getElementById('debug-status');
        if(!el||!this.visible) return;
        el.textContent = 'HP:'+Math.round(player.health)+' STA:'+Math.round(player.stamina)+' LVL:'+
(player.level||1)+" Map:"+(MAPS[mapSystem.currentMap]||{}).name;
    }
};
