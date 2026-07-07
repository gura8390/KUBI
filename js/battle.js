// 战斗系统文件

// 战斗系统
const battleSystem = {
    // 当前战斗状态
    inBattle: false,
    currentMonster: null,
    monsterHealth: 0,
    monsterMaxHealth: 0,
    playerHealth: 0,
    isInvincible: false,
    isCountering: false,
    turnCount: 0,
    statusEffects: { player: [], monster: [] },
    isDefending: false,
    battleLog: [],

    // 初始化战斗系统
        init: function() {},

    addStatusEffect: function(target, type, duration, data) {
        this.statusEffects[target].push({ type: type, duration: duration, data: data });
    },
    hasStatusEffect: function(target, type) {
        return this.statusEffects[target].some(function(e) { return e.type === type; });
    },
    getStatusBonus: function(target, type) {
        return this.statusEffects[target].filter(function(e) { return e.type === type; }).reduce(function(s, e) { return s + (e.data && e.data.attackBonus || 0); }, 0);
    },
    clearStatusEffects: function(target) {
        this.statusEffects[target] = [];
    },
    processStatusEffects: function(target) {
        var effects = this.statusEffects[target];
        var toRemove = [];
        var self = this;
        effects.forEach(function(effect, index) {
            var name = target === 'monster' ? self.currentMonster.name : 'you';
            if (effect.type === 'poison') {
                var dmg = Math.floor((target === 'monster' ? self.monsterMaxHealth : 100) * 0.03);
                if (target === 'monster') self.monsterHealth -= dmg; else player.health -= dmg;
                self.addBattleLog(name + ' lost ' + dmg + ' HP from poison', 'enemy-action');
            } else if (effect.type === 'burn') {
                var dmg = Math.floor((target === 'monster' ? self.monsterHealth : player.health) * 0.05);
                if (target === 'monster') self.monsterHealth -= dmg; else player.health -= dmg;
                self.addBattleLog(name + ' lost ' + dmg + ' HP from burn', 'enemy-action');
            } else if (effect.type === 'freeze' || effect.type === 'stun') {
                self.addBattleLog(name + ' cannot act!', 'system-message');
            } else if (effect.type === 'bleed') {
                if (target === 'monster') self.monsterHealth -= 5; else player.health -= 5;
                self.addBattleLog(name + ' lost 5 HP from bleed', 'enemy-action');
            }
            effect.duration--;
            if (effect.duration <= 0) toRemove.push(index);
        });
        toRemove.reverse().forEach(function(i) { effects.splice(i, 1); });
    },
    useSkill: function(skillId) {
        if (!this.inBattle || typeof skillSystem === 'undefined') return;
        if (!skillSystem.canUseSkill(skillId)) return;
        skillSystem.useSkill(skillId, this);
        if (this.monsterHealth <= 0) { this.victory(); return; }
        this.monsterTurn();
        this.endTurn();
    },
    endTurn: function() {
        this.turnCount++;
        this.processStatusEffects('player');
        this.processStatusEffects('monster');
        if (typeof skillSystem !== 'undefined') skillSystem.reduceCooldowns();
        this.updateHealthBars();
    },
    processMonsterAbilities: function() {
        var monster = this.currentMonster;
        if (!monster || !monster.abilities) return;
        var abilities = monster.abilities.split(',');
        var self = this;
        abilities.forEach(function(ability) {
            if (Math.random() < 0.3) {
                if (ability === 'poison') { self.addStatusEffect('player', 'poison', 3, {}); self.addBattleLog(monster.name + ' poisoned you!', 'enemy-action'); }
                else if (ability === 'burn') { self.addStatusEffect('player', 'burn', 2, {}); self.addBattleLog(monster.name + ' burned you!', 'enemy-action'); }
                else if (ability === 'freeze') { self.addStatusEffect('player', 'freeze', 1, {}); self.addBattleLog(monster.name + ' froze you!', 'enemy-action'); }
                else if (ability === 'stun') { self.addStatusEffect('player', 'stun', 1, {}); self.addBattleLog(monster.name + ' stunned you!', 'enemy-action'); }
                else if (ability === 'bleed') { self.addStatusEffect('player', 'bleed', 3, {}); self.addBattleLog(monster.name + ' made you bleed!', 'enemy-action'); }
            }
        });
    },

    // 开始战斗
    startBattle: function(monsterId) {
        const monster = MONSTERS[monsterId];
        if (!monster) {
            showMessage('无效的怪物！', 'error');
            return;
        }

        // 设置战斗状态
        this.inBattle = true;
        this.currentMonster = { id: monsterId, ...monster };
        this.monsterHealth = monster.health;
        this.monsterMaxHealth = monster.health;
        this.playerHealth = player.health;
        this.isDefending = false;
        this.isInvincible = false;
        this.isCountering = false;
        this.turnCount = 0;
        this.statusEffects = { player: [], monster: [] };
        if (typeof skillSystem !== "undefined") skillSystem.resetCooldowns();
        this.battleLog = [];

        // 显示战斗界面
        this.showBattleUI();

        // 添加战斗日志
        this.addBattleLog(`遭遇了${monster.name}！`, 'system-message');
    },

    // 显示战斗UI
    showBattleUI: function() {
        const battleModal = document.getElementById('battle-modal');
        battleModal.style.display = 'flex';

        // 更新怪物信息
        document.getElementById('enemy-name').textContent = this.currentMonster.name;
        document.getElementById('enemy-health-value').textContent = `${this.monsterHealth}/${this.monsterMaxHealth}`;
        document.getElementById('enemy-attack-value').textContent = this.currentMonster.attack;

        // 更新玩家信息
        document.getElementById('player-health-value').textContent = `${Math.round(player.health)}/100`;

        // 更新血条
        this.updateHealthBars();

        // 清空战斗日志
        document.getElementById('battle-log').innerHTML = '';

        // 添加初始日志
        this.battleLog.forEach(log => {
            this.displayBattleLog(log.text, log.type);
        });
    },

    // 更新血条
    updateHealthBars: function() {
        // 怪物血条
        const enemyHealthBar = document.getElementById('enemy-health-bar');
        const enemyHealthPercent = (this.monsterHealth / this.monsterMaxHealth) * 100;
        enemyHealthBar.style.width = `${enemyHealthPercent}%`;

        // 玩家血条
        const playerHealthBar = document.getElementById('player-health-bar');
        const playerHealthPercent = (player.health / 100) * 100;
        playerHealthBar.style.width = `${playerHealthPercent}%`;
    },

    // 添加战斗日志
    addBattleLog: function(text, type = '') {
        this.battleLog.push({ text, type });
        this.displayBattleLog(text, type);
    },

    // 显示战斗日志
    displayBattleLog: function(text, type = '') {
        const battleLog = document.getElementById('battle-log');
        const p = document.createElement('p');
        p.className = type;
        p.textContent = text;
        battleLog.appendChild(p);
        battleLog.scrollTop = battleLog.scrollHeight;
    },

    // 玩家攻击
    attack: function() {
        if (!this.inBattle) return;

        // 计算命中
        const hitChance = player.hitRate / 100;
        const isHit = Math.random() < hitChance;

        if (!isHit) {
            this.addBattleLog('你的攻击未命中！', 'miss');
            this.monsterTurn();
            return;
        }

        if (typeof soundSystem !== 'undefined' && soundSystem.enabled) soundSystem.play('attack');

        // 计算伤害
        var warCryBonus = this.getStatusBonus("player", "warCry");
        let damage = (player.attack + warCryBonus) - this.currentMonster.defense;
        damage = Math.max(1, damage); // 最少造成1点伤害

        // 检查暴击
        const critChance = 0.1; // 10%暴击率
        const isCrit = Math.random() < critChance;
        if (isCrit) {
            damage = Math.floor(damage * 1.5);
            this.addBattleLog(`暴击！造成${damage}点伤害！`, 'critical-hit');
        } else {
            this.addBattleLog(`你攻击了${this.currentMonster.name}，造成${damage}点伤害`, 'player-action');
        }

        // 应用伤害
        this.monsterHealth -= damage;
        this.monsterHealth = Math.max(0, this.monsterHealth);

        // 更新显示
        this.updateHealthBars();
        document.getElementById('enemy-health-value').textContent = `${this.monsterHealth}/${this.monsterMaxHealth}`;

        // 检查怪物是否死亡
        if (this.monsterHealth <= 0) {
            this.victory();
            return;
        }

        // 怪物回合
        this.monsterTurn();
        this.endTurn();
    },

    // 玩家防御
    defend: function() {
        if (!this.inBattle) return;

        this.isDefending = true;
        if (typeof soundSystem !== 'undefined' && soundSystem.enabled) soundSystem.play('wear');
        this.addBattleLog('你摆出防御姿态', 'player-action');
        this.monsterTurn();
        this.endTurn();
    },

    // 玩家逃跑
    flee: function() {
        if (!this.inBattle) return;

        // 逃跑成功率
        const fleeChance = 0.5;
        const success = Math.random() < fleeChance;

        if (success) {
            this.addBattleLog('你成功逃跑了！', 'system-message');
            if (typeof soundSystem !== 'undefined' && soundSystem.enabled) soundSystem.play('flee');
            this.endBattle();
            showMessage('成功逃离战斗', 'success');
        } else {
            this.addBattleLog('逃跑失败！', 'system-message');
            this.monsterTurn();
            this.endTurn();
        }
    },

    // 怪物回合
    monsterTurn: function() {
        if (!this.inBattle || this.monsterHealth <= 0) return;
        if (this.hasStatusEffect("monster", "freeze") || this.hasStatusEffect("monster", "stun")) {
            this.addBattleLog(this.currentMonster.name + " cannot act!", "system-message");
            return;
        }

        // 计算怪物伤害
        let damage = this.currentMonster.attack - player.defense;

        // 如果玩家防御，伤害减半
        if (this.isDefending) {
            damage = Math.floor(damage / 2);
            this.isDefending = false;
        }

        damage = Math.max(1, damage); // 最少造成1点伤害

        // 检查怪物命中
        const monsterHitChance = 0.8; // 80%命中率
        const isHit = Math.random() < monsterHitChance;

        if (!isHit) {
            this.addBattleLog(`${this.currentMonster.name}的攻击未命中！`, 'miss');
            return;
        }

        // 应用伤害
        player.health -= damage;
        player.health = Math.max(0, player.health);

        if (typeof soundSystem !== 'undefined' && soundSystem.enabled) soundSystem.play('hurt');
        this.addBattleLog(`${this.currentMonster.name}攻击了你，造成${damage}点伤害`, 'enemy-action');

        // 更新显示
        this.updateHealthBars();
        document.getElementById('player-health-value').textContent = `${Math.round(player.health)}/100`;

        // 检查玩家是否死亡
        if (player.health <= 0) {
            this.defeat();
        }
    },

    // 战斗胜利
    victory: function() {
        if (typeof soundSystem !== 'undefined' && soundSystem.enabled) soundSystem.play('victory');
        this.addBattleLog(`击败了${this.currentMonster.name}！`, 'system-message');

        // 计算掉落
        const drops = this.calculateDrops();
        let lootText = '';

        if (drops.length > 0) {
            lootText = '获得了: ';
            drops.forEach(drop => {
                addItemToInventory(drop.id, drop.amount);
                lootText += `${getItemName(drop.id)}×${drop.amount} `;
            });
            this.addBattleLog(lootText, 'loot-message');
        }

        // 获得魂
        const soulGain = Math.floor(this.currentMonster.health / 10);
        if (soulGain > 0) {
            addSoul(soulGain);
            this.addBattleLog(`获得了${soulGain}魂`, 'loot-message');
        }

        // 显示胜利结果
        this.showBattleResult('victory', drops, soulGain);
    },

    // 战斗失败
    defeat: function() {
        this.addBattleLog('你被击败了！', 'system-message');

        // 显示失败结果
        this.showBattleResult('defeat', [], 0);
    },

    // 计算掉落物品
    calculateDrops: function() {
        const drops = [];
        const monster = this.currentMonster;

        if (!monster.drops) return drops;

        monster.drops.forEach(itemId => {
            if (Math.random() < monster.dropChance) {
                const amount = randomInt(1, 2);
                drops.push({ id: itemId, amount });
            }
        });

        return drops;
    },

    // 显示战斗结果
    showBattleResult: function(result, drops, soulGain) {
        const battleModal = document.getElementById('battle-modal');
        battleModal.style.display = 'none';

        let content = '';

        if (result === 'victory') {
            content += `<h3 style="color: #2ecc71;">战斗胜利！</h3>`;
            content += `<p>击败了${this.currentMonster.name}</p>`;

            if (drops.length > 0) {
                content += '<div class="battle-result loot">';
                content += '<h4>战利品</h4>';
                content += '<ul>';
                drops.forEach(drop => {
                    content += `<li>${getItemName(drop.id)} ×${drop.amount}</li>`;
                });
                content += '</ul>';
                content += '</div>';
            }

            if (soulGain > 0) {
                content += `<p>获得魂: ${soulGain}</p>`;
            }
        } else {
            content += `<h3 style="color: #e74c3c;">战斗失败</h3>`;
            content += `<p>你被${this.currentMonster.name}击败了</p>`;
            content += '<p>失去了一些物品...</p>';

            // 失败惩罚
            this.defeatPenalty();
        }

        const buttons = [
            { text: '继续', action: 'hideModal(); battleSystem.endBattle();' }
        ];

        if (result === 'victory') {
            buttons.unshift({
                text: '分配魂点',
                action: 'hideModal(); battleSystem.endBattle(); showSoulAllocation();'
            });
        }

        showModal('战斗结果', content, buttons);
    },

    // 失败惩罚
    defeatPenalty: function() {
        // 失去一些物品
        if (player.inventory.length > 0) {
            const lostItems = randomInt(1, 3);
            for (let i = 0; i < lostItems && player.inventory.length > 0; i++) {
                const randomIndex = randomInt(0, player.inventory.length - 1);
                const lost = player.inventory.splice(randomIndex, 1)[0];
                showMessage(`失去了${getItemName(lost.id)}`, 'warning');
            }
        }

        // 恢复部分生命
        player.health = 30;
    },

    // 结束战斗
    endBattle: function() {
        this.clearStatusEffects("player");
        this.clearStatusEffects("monster");
        // 清理地牢临时怪物数据
        if (this._dungeonTempId) {
            delete MONSTERS[this._dungeonTempId];
            this._dungeonTempId = null;
        }

        this.inBattle = false;
        this.currentMonster = null;
        this.monsterHealth = 0;
        this.monsterMaxHealth = 0;
        this.isDefending = false;
        this.battleLog = [];

        // 关闭战斗界面
        const battleModal = document.getElementById('battle-modal');
        if (battleModal) {
            battleModal.style.display = 'none';
        }

        updateUI();
    },

    // 使用物品（战斗中）
    useItemInBattle: function(index) {
        if (!this.inBattle) return;

        if (index >= player.inventory.length) return;

        const slot = player.inventory[index];
        const item = ITEMS[slot.id];

        if (!item) return;

        // 检查是否是药剂
        if (item.type === 'potion') {
            // 应用效果
            if (item.effect) {
                Object.entries(item.effect).forEach(([stat, value]) => {
                    if (player[stat] !== undefined) {
                        player[stat] = Math.min(100, player[stat] + value);
                    }
                });
            }

            // 移除物品
            slot.count = (slot.count || 1) - 1;
            if (slot.count <= 0) {
                player.inventory.splice(index, 1);
            }

            this.addBattleLog(`使用了${item.name}`, 'player-action');
            this.updateHealthBars();
            document.getElementById('player-health-value').textContent = `${Math.round(player.health)}/100`;
        } else if (item.type === 'food') {
            // 使用食物
            if (item.effect) {
                Object.entries(item.effect).forEach(([stat, value]) => {
                    if (player[stat] !== undefined) {
                        player[stat] = Math.min(100, player[stat] + value);
                    }
                });
            }

            // 移除物品
            slot.count = (slot.count || 1) - 1;
            if (slot.count <= 0) {
                player.inventory.splice(index, 1);
            }

            this.addBattleLog(`使用了${item.name}`, 'player-action');
            this.updateHealthBars();
            document.getElementById('player-health-value').textContent = `${Math.round(player.health)}/100`;
        } else {
            showMessage('该物品无法在战斗中使用！', 'error');
        }
    },

    // 显示战斗背包
    showBattleInventory: function() {
        if (!this.inBattle) return;

        let content = '<div class="battle-inventory">';
        content += '<h4>背包</h4>';

        player.inventory.forEach((slot, index) => {
            const item = ITEMS[slot.id];
            if (!item) return;

            const canUse = item.type === 'potion' || item.type === 'food';
            content += `
                <div class="battle-item ${canUse ? '' : 'disabled'}">
                    <span class="item-icon">${getItemIcon(slot.id)}</span>
                    <span class="item-name">${item.name}</span>
                    <span class="item-count">${slot.count > 1 ? `×${slot.count}` : ''}</span>
                    ${canUse ? `<button class="use-btn" onclick="battleSystem.useItemInBattle(${index}); battleSystem.showBattleInventory();">使用</button>` : ''}
                </div>
            `;
        });

        content += '</div>';

        showModal('战斗背包', content, [
            { text: '关闭', action: 'hideModal();' }
        ]);
    },

    // 检查是否在战斗中
    isInBattle: function() {
        return this.inBattle;
    },

    // 获取当前怪物信息

    // 获取怪物血量百分比
};

// 初始化战斗系统
function initBattleSystem() {
    battleSystem.init();
}

// 注册到命名空间
if (typeof KBA !== 'undefined') KBA.registerSystem('battleSystem', battleSystem);
