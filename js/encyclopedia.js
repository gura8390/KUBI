// Encyclopedia System - 图鉴系统

var EncyclopediaSystem = {
    // 怪物图鉴数据
    monsters: {},
    // 物品图鉴数据
    items: {},

    // 记录击杀
    recordKill: function(monsterId) {
        if (!this.monsters[monsterId]) {
            this.monsters[monsterId] = { kills: 0, discovered: true };
        }
        this.monsters[monsterId].kills++;
        this.checkMonsterLore(monsterId);
    },

    // 记录制作
    recordCraft: function(itemId) {
        if (!this.items[itemId]) {
            this.items[itemId] = { crafts: 0, discovered: true };
        }
        this.items[itemId].crafts++;
        this.checkItemLore(itemId);
    },

    // 检查怪物图鉴解锁
    checkMonsterLore: function(monsterId) {
        var entry = this.monsters[monsterId];
        if (!entry) return;

        var lore = this.getMonsterLore(monsterId);
        if (!lore) return;

        // 击杀5次解锁第一段
        if (entry.kills >= 5 && !entry.lore1) {
            entry.lore1 = true;
            if (typeof showMessage !== 'undefined') {
                showMessage('图鉴解锁: ' + lore.name + ' - 背景故事(1)', 'info');
            }
        }
        // 击杀20次解锁第二段
        if (entry.kills >= 20 && !entry.lore2) {
            entry.lore2 = true;
            if (typeof showMessage !== 'undefined') {
                showMessage('图鉴解锁: ' + lore.name + ' - 背景故事(2)', 'info');
            }
        }
    },

    // 检查物品图鉴解锁
    checkItemLore: function(itemId) {
        var entry = this.items[itemId];
        if (!entry) return;

        var lore = this.getItemLore(itemId);
        if (!lore) return;

        if (entry.crafts >= 10 && !entry.lore1) {
            entry.lore1 = true;
            if (typeof showMessage !== 'undefined') {
                showMessage('图鉴解锁: ' + lore.name + ' - 详细描述', 'info');
            }
        }
    },

    // 获取怪物图鉴
    getMonsterLore: function(monsterId) {
        var monster = (typeof MONSTERS !== 'undefined') ? MONSTERS[monsterId] : null;
        if (!monster) return null;
        return {
            name: monster.name,
            description: monster.description || '',
            kills: (this.monsters[monsterId] || {}).kills || 0
        };
    },

    // 获取物品图鉴
    getItemLore: function(itemId) {
        var item = (typeof ITEMS !== 'undefined') ? ITEMS[itemId] : null;
        if (!item) return null;
        var lore = (typeof ItemLore !== 'undefined') ? ItemLore[itemId] : '';
        return {
            name: item.name,
            description: item.description || '',
            lore: lore,
            crafts: (this.items[itemId] || {}).crafts || 0
        };
    },

    // 显示图鉴界面
    showEncyclopedia: function() {
        var content = '<div class="encyclopedia">';
        content += '<h4>怪物图鉴</h4>';

        if (typeof MONSTERS !== 'undefined') {
            Object.keys(MONSTERS).forEach(function(id) {
                var entry = EncyclopediaSystem.monsters[id];
                var monster = MONSTERS[id];
                var kills = entry ? entry.kills : 0;
                var discovered = entry && entry.discovered;
                content += '<div style="margin:5px 0;padding:5px;border:1px solid #ccc;">';
                content += '<strong>' + (discovered ? monster.name : '???') + '</strong>';
                content += ' - 击杀: ' + kills;
                if (entry && entry.lore1) {
                    content += '<br><em>' + (monster.description || '暂无描述') + '</em>';
                }
                content += '</div>';
            });
        }

        content += '<h4>物品图鉴</h4>';
        if (typeof ITEMS !== 'undefined') {
            Object.keys(ITEMS).slice(0, 20).forEach(function(id) {
                var entry = EncyclopediaSystem.items[id];
                var item = ITEMS[id];
                var crafts = entry ? entry.crafts : 0;
                var discovered = entry && entry.discovered;
                var lore = (typeof ItemLore !== 'undefined') ? ItemLore[id] : '';
                content += '<div style="margin:5px 0;padding:5px;border:1px solid #ccc;">';
                content += '<strong>' + item.name + '</strong>';
                if (lore) {
                    content += '<br><em>' + lore.substring(0, 50) + '...</em>';
                }
                content += '</div>';
            });
        }

        content += '</div>';
        showModal('图鉴', content, [{ text: '关闭', action: 'hideModal();' }]);
    },

    // 保存图鉴数据
    serialize: function() {
        return JSON.stringify({ monsters: this.monsters, items: this.items });
    },

    // 加载图鉴数据
    deserialize: function(data) {
        if (data) {
            try {
                var parsed = typeof data === 'string' ? JSON.parse(data) : data;
                this.monsters = parsed.monsters || {};
                this.items = parsed.items || {};
            } catch (e) {}
        }
    }
};

if (typeof KBA !== "undefined") KBA.systems.encyclopedia = EncyclopediaSystem;
