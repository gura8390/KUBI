// Debug Panel
var DebugPanel = {
    visible: false,
    godMode: false,
    init: function() {
        this.createPanel();
        var self = this;
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'd') { e.preventDefault(); self.toggle(); }
        });
    },
    createPanel: function() {
        var p = document.createElement('div');
        p.id = 'debug-panel';
        p.style.cssText = 'display:none;position:fixed;top:10px;right:10px;width:300px;background:#1a1a2e;color:#eee;padding:15px;border-radius:8px;z-index:10000;font-family:monospace;font-size:12px;';
        p.innerHTML = '<h3>Debug</h3>' +
            '<div><button id="dbg-wood">+10 Wood</button> <button id="dbg-gold">+100 Gold</button> <button id="dbg-iron">+10 Iron</button></div>' +
            '<div><button id="dbg-heal">Heal</button> <button id="dbg-lvl">+1 Lvl</button> <button id="dbg-soul">+50 Soul</button></div>' +
            '<div><select id="debug-map-select"></select> <button id="dbg-unlock">Unlock</button></div>' +
            '<div><button id="dbg-save">Save</button> <button id="dbg-load">Load</button></div>' +
            '<div id="debug-status" style="margin-top:10px;background:#16213e;padding:8px;border-radius:4px;"></div>';
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
        document.getElementById('dbg-save').onclick = function() { self.saveGame(); };
        document.getElementById('dbg-load').onclick = function() { self.loadGame(); };
        document.getElementById('debug-map-select').onchange = function() { self.teleport(this.value); };
    },
    toggle: function() { this.visible = !this.visible; this.panel.style.display = this.visible ? 'block' : 'none'; },
    addItem: function(id, n) { addItemToInventory(id, n); showMessage('+' + n + ' ' + getItemName(id), 'info'); updateUI(); },
    healAll: function() { player.health=100; player.hunger=100; player.stamina=100; player.thirst=100; player.sanity=100; updateUI(); },
    addLevel: function(n) { for(var i=0;i<n;i++){player.level=(player.level||1)+1;player.attack+=2;player.defense+=1;} updateUI(); },
    addSoul: function(n) { player.soul+=n; updateUI(); },
    teleport: function(id) { if(id) mapSystem.switchMap(id); },
    unlockAllMaps: function() { Object.keys(MAPS).forEach(function(id){if(player.unlockedMaps.indexOf(id)<0) player.unlockedMaps.push(id);}); mapSystem.updateMapButtons(); },
    saveGame: function() { storage.save(); },
    loadGame: function() { storage.load(); updateUI(); },
    testBattle: function(id) { battleSystem.startBattle(id); },
    winBattle: function() { if(battleSystem.inBattle){battleSystem.monsterHealth=0;battleSystem.victory();} },
    updateMapSelect: function() {
        var s = document.getElementById('debug-map-select');
        if(!s) return;
        s.innerHTML = '<option value="">--Map--</option>';
        Object.keys(MAPS).forEach(function(id){ s.innerHTML += '<option value="'+id+'">'+MAPS[id].name+'</option>'; });
    },
    updateStatus: function() {
        var el = document.getElementById('debug-status');
        if(!el||!this.visible) return;
        el.textContent = 'HP:'+Math.round(player.health)+' STA:'+Math.round(player.stamina)+' ATK:'+player.attack+' LVL:'+(player.level||1);
    }
};
