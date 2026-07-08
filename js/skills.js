// 技能系统文件
// 使用 data/skills.js 中的 SkillData 数据

const skillSystem = {
    cooldowns: {},

    init: function() {
        this.cooldowns = {};
        Object.keys(SkillData).forEach(id => { this.cooldowns[id] = 0; });
    },

    getAvailableSkills: function() {
        return Object.values(SkillData).filter(skill => player.level >= skill.unlockLevel);
    },

    canUseSkill: function(skillId) {
        const skill = SkillData[skillId];
        if (!skill) return false;
        if (player.level < skill.unlockLevel) return false;
        if (this.cooldowns[skillId] > 0) return false;
        return true;
    },

    useSkill: function(skillId, battle) {
        const skill = SkillData[skillId];
        if (!skill || !this.canUseSkill(skillId)) {
            showMessage('技能不可用！', 'error');
            return false;
        }

        // 处理技能效果
        if (skill.effects) {
            for (const effect of skill.effects) {
                this._executeEffect(effect, battle);
            }
        }

        this.cooldowns[skillId] = skill.cooldown;
        if (typeof soundSystem !== 'undefined' && soundSystem.enabled) soundSystem.play('attack');
        return true;
    },

    _executeEffect: function(effect, battle) {
        switch (effect.type) {
            case 'damage':
                let dmg = 0;
                if (effect.multiplier) {
                    const baseDmg = player.attack + (player.magicDamage || 0);
                    dmg = Math.max(1, Math.floor(baseDmg * effect.multiplier) - (battle.currentMonster.defense || 0));
                } else if (effect.value) {
                    dmg = effect.ignoreDefense ? effect.value : Math.max(1, effect.value - (battle.currentMonster.defense || 0));
                }
                if (effect.hits) {
                    for (let i = 0; i < effect.hits; i++) {
                        battle.monsterHealth -= dmg;
                    }
                } else {
                    battle.monsterHealth -= dmg;
                }
                battle.monsterHealth = Math.max(0, battle.monsterHealth);
                battle.addBattleLog('造成' + dmg + '点伤害！', 'critical-hit');
                break;

            case 'status':
                if (typeof BuffSystem !== 'undefined') {
                    BuffSystem.add(effect.target || 'player', effect.statusType, effect.duration || 1, 1);
                }
                break;

            case 'heal':
                const healStat = effect.stat || 'health';
                const healMax = effect.max || 100;
                player[healStat] = Math.min(healMax, player[healStat] + effect.value);
                break;
        }
    },

    reduceCooldowns: function() {
        Object.keys(this.cooldowns).forEach(id => {
            if (this.cooldowns[id] > 0) this.cooldowns[id]--;
        });
    },

    resetCooldowns: function() {
        Object.keys(this.cooldowns).forEach(id => { this.cooldowns[id] = 0; });
    },

    getCooldown: function(skillId) {
        return this.cooldowns[skillId] || 0;
    },

    showSkillMenu: function() {
        const skills = this.getAvailableSkills();
        let content = '<div class="skill-menu"><h4>技能列表</h4>';
        skills.forEach(skill => {
            const canUse = this.canUseSkill(skill.id);
            const cooldown = this.cooldowns[skill.id] || 0;
            content += '<div class="skill-item ' + (canUse ? '' : 'disabled') + '">';
            content += '<span>' + skill.icon + ' ' + skill.name + '</span>';
            content += '<small>' + skill.description + '</small>';
            if (cooldown > 0) content += '<span class="cooldown">冷却: ' + cooldown + '回合</span>';
            content += '</div>';
        });
        content += '</div>';
        showModal('技能', content, [{ text: '关闭', action: 'hideModal();' }]);
    }
};

function initSkillSystem() {
    skillSystem.init();
}

if (typeof KBA !== 'undefined') KBA.registerSystem('skillSystem', skillSystem);
