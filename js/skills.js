// 技能系统文件
// 8个主动技能 + 状态效果系统

// 技能定义
const SKILLS = {
    // === 攻击技能 ===
    heavyStrike: {
        id: 'heavyStrike',
        name: '重击',
        description: '蓄力一击，造成2倍伤害',
        icon: '💥',
        type: 'attack',
        cooldown: 3,
        manaCost: 0,
        unlockLevel: 1,
        effect: function(battle) {
            const baseDmg = player.attack + (player.magicDamage || 0);
            const damage = Math.max(1, (baseDmg * 2) - battle.currentMonster.defense);
            battle.monsterHealth -= damage;
            battle.monsterHealth = Math.max(0, battle.monsterHealth);
            battle.addBattleLog('重击！造成' + damage + '点伤害！', 'critical-hit');
            return damage;
        }
    },
    doubleSlash: {
        id: 'doubleSlash',
        name: '连斩',
        description: '快速斩击两次，每次造成70%伤害',
        icon: '⚔️',
        type: 'attack',
        cooldown: 5,
        manaCost: 0,
        unlockLevel: 3,
        effect: function(battle) {
            let totalDmg = 0;
            for (let i = 0; i < 2; i++) {
                const baseDmg = player.attack + (player.magicDamage || 0);
                const damage = Math.max(1, Math.floor(baseDmg * 0.7) - battle.currentMonster.defense);
                battle.monsterHealth -= damage;
                battle.monsterHealth = Math.max(0, battle.monsterHealth);
                totalDmg += damage;
            }
            battle.addBattleLog('连斩！造成' + totalDmg + '点伤害！', 'critical-hit');
            return totalDmg;
        }
    },
    fatalBlow: {
        id: 'fatalBlow',
        name: '致命一击',
        description: '全力一击，造成3倍伤害，但命中率降低30%',
        icon: '☠️',
        type: 'attack',
        cooldown: 8,
        manaCost: 0,
        unlockLevel: 5,
        effect: function(battle) {
            if (Math.random() < 0.3) {
                battle.addBattleLog('致命一击未命中！', 'miss');
                return 0;
            }
            const baseDmg = player.attack + (player.magicDamage || 0);
            const damage = Math.max(1, (baseDmg * 3) - battle.currentMonster.defense);
            battle.monsterHealth -= damage;
            battle.monsterHealth = Math.max(0, battle.monsterHealth);
            battle.addBattleLog('致命一击！造成' + damage + '点伤害！', 'critical-hit');
            return damage;
        }
    },

    // === 防御技能 ===
    ironWall: {
        id: 'ironWall',
        name: '铁壁',
        description: '进入完全防御状态，本回合免疫所有伤害',
        icon: '🛡️',
        type: 'defense',
        cooldown: 4,
        manaCost: 0,
        unlockLevel: 2,
        effect: function(battle) {
            battle.isInvincible = true;
            battle.addBattleLog('铁壁！本回合免疫伤害！', 'player-action');
        }
    },
    counterAttack: {
        id: 'counterAttack',
        name: '反击',
        description: '防御姿态，受到攻击后反击造成50%伤害',
        icon: '🔄',
        type: 'defense',
        cooldown: 6,
        manaCost: 0,
        unlockLevel: 4,
        effect: function(battle) {
            battle.isDefending = true;
            battle.isCountering = true;
            battle.addBattleLog('反击姿态！受到攻击后将反击！', 'player-action');
        }
    },
    warCry: {
        id: 'warCry',
        name: '战吼',
        description: '发出战吼，提升攻击力30%持续3回合',
        icon: '📢',
        type: 'defense',
        cooldown: 10,
        manaCost: 0,
        unlockLevel: 6,
        effect: function(battle) {
            battle.addStatusEffect('player', 'warCry', 3, { attackBonus: Math.floor(player.attack * 0.3) });
            battle.addBattleLog('战吼！攻击力提升30%！', 'player-action');
        }
    },

    // === 魔法技能 ===
    fireball: {
        id: 'fireball',
        name: '火球术',
        description: '发射火球，造成魔法伤害并附加灼烧',
        icon: '🔥',
        type: 'magic',
        cooldown: 5,
        manaCost: 15,
        unlockLevel: 3,
        effect: function(battle) {
            const magicDmg = (player.magicDamage || 0) + 15;
            const damage = Math.max(1, magicDmg);
            battle.monsterHealth -= damage;
            battle.monsterHealth = Math.max(0, battle.monsterHealth);
            battle.addStatusEffect('monster', 'burn', 2, { damagePercent: 5 });
            battle.addBattleLog('火球术！造成' + damage + '点魔法伤害，敌人被灼烧！', 'critical-hit');
            return damage;
        }
    },
    iceBlast: {
        id: 'iceBlast',
        name: '冰冻术',
        description: '释放寒冰，造成魔法伤害并冰冻敌人1回合',
        icon: '❄️',
        type: 'magic',
        cooldown: 8,
        manaCost: 20,
        unlockLevel: 5,
        effect: function(battle) {
            const magicDmg = (player.magicDamage || 0) + 10;
            const damage = Math.max(1, magicDmg);
            battle.monsterHealth -= damage;
            battle.monsterHealth = Math.max(0, battle.monsterHealth);
            battle.addStatusEffect('monster', 'freeze', 1, {});
            battle.addBattleLog('冰冻术！造成' + damage + '点魔法伤害，敌人被冰冻！', 'critical-hit');
            return damage;
        }
    }
};

// 技能系统
const skillSystem = {
    // 玩家技能冷却追踪
    cooldowns: {},

    // 初始化
    init: function() {
        this.cooldowns = {};
        Object.keys(SKILLS).forEach(id => {
            this.cooldowns[id] = 0;
        });
    },

    // 获取可用技能列表

    // 检查技能是否可用
    canUseSkill: function(skillId) {
        const skill = SKILLS[skillId];
        if (!skill) return false;
        if (player.level < skill.unlockLevel) return false;
        if (this.cooldowns[skillId] > 0) return false;
        return true;
    },

    // 使用技能
    useSkill: function(skillId, battle) {
        const skill = SKILLS[skillId];
        if (!skill || !this.canUseSkill(skillId)) {
            showMessage('技能不可用！', 'error');
            return false;
        }

        // 执行技能效果
        skill.effect(battle);

        // 设置冷却
        this.cooldowns[skillId] = skill.cooldown;

        // 播放音效
        if (typeof soundSystem !== 'undefined' && soundSystem.enabled) {
            soundSystem.play('attack');
        }

        return true;
    },

    // 回合结束时减少冷却
    reduceCooldowns: function() {
        Object.keys(this.cooldowns).forEach(id => {
            if (this.cooldowns[id] > 0) {
                this.cooldowns[id]--;
            }
        });
    },

    // 重置所有冷却
    resetCooldowns: function() {
        Object.keys(this.cooldowns).forEach(id => {
            this.cooldowns[id] = 0;
        });
    },

    // 获取技能冷却剩余
};

// 初始化技能系统
function initSkillSystem() {
    skillSystem.init();
}

// 注册到命名空间
if (typeof KBA !== 'undefined') {
    KBA.registerData('SKILLS', SKILLS);
    KBA.registerSystem('skillSystem', skillSystem);
}
