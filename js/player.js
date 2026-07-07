// 玩家属性系统文件

// 玩家数据对象
const player = {
    // 基础属性
    health: 100,
    hunger: 100,
    stamina: 100,
    thirst: 100,
    sanity: 100,
    temperature: 37,

    // 战斗属性
    attack: 10,
    defense: 0,
    hitRate: 80,
    magicDamage: 0,
    soul: 0,

    // 经验/等级
    xp: 0,
    level: 1,

    // 装备
    weapon: null,
    armor: null,

    // 背包
    inventory: [],
    maxInventory: 10,

    // 已解锁地图
    unlockedMaps: ['darkForest'],

    // 已建造设施
    buildings: [],

    // 地牢当前层数
    dungeonFloor: 1,

    // 阵营
    faction: null, // 'cannibal' 或 'mage'

    // 游戏时间
    gameTime: {
        day: 1,
        hour: 6,
        season: 'spring'
    },

    // 研究进度
    research: {
        paper: false,
        horseCart: false,
        moreMerchants: false,
        finalMap: false
    }
};

// 经验值升级表（每级所需经验递增）
function getXPForLevel(level) {
    return Math.floor(50 * Math.pow(level, 1.5));
}

// 添加经验值
function addXP(amount) {
    player.xp += amount;
    showMessage(`✨ 获得 ${amount} 经验值`, 'info');

    // 检查升级
    while (player.xp >= getXPForLevel(player.level)) {
        player.xp -= getXPForLevel(player.level);
        player.level++;

        // 升级奖励：提升基础属性
        player.health = 100;
        player.stamina = 100;
        player.hunger = 100;
        player.thirst = 100;
        player.attack += 2;
        player.defense += 1;
        player.hitRate = Math.min(95, player.hitRate + 1);

        showMessage(`🎉 升级到 Lv.${player.level}！攻击+2，防御+1，命中+1%`, 'success');

        // 成就统计
        if (typeof achievementSystem !== 'undefined') {
            achievementSystem.updateStat('levelReached', player.level);
        }
    }

    updateUI();
}

// 获取等级进度百分比
function getLevelProgress() {
    const needed = getXPForLevel(player.level);
    return Math.floor((player.xp / needed) * 100);
}

// 注册到命名空间
if (typeof KBA !== 'undefined') KBA.registerSystem('player', player);

// 初始化玩家
function initPlayer() {
    // 重置所有属性
    player.health = 100;
    player.hunger = 100;
    player.stamina = 100;
    player.thirst = 100;
    player.sanity = 100;
    player.temperature = 37;

    player.attack = 10;
    player.defense = 0;
    player.hitRate = 80;
    player.magicDamage = 0;
    player.soul = 0;
    player.xp = 0;
    player.level = 1;

    player.weapon = null;
    player.armor = null;

    player.inventory = [];
    player.maxInventory = 10;

    player.unlockedMaps = ['darkForest'];
    player.buildings = [];
    player.dungeonFloor = 1;
    player.faction = null;

    player.gameTime = {
        day: 1,
        hour: 6,
        season: 'spring'
    };

    player.research = {
        paper: false,
        horseCart: false,
        moreMerchants: false,
        finalMap: false
    };

    // 给予初始物品
    addItemToInventory('wood', 5);
    addItemToInventory('bread', 2);
    addItemToInventory('water', 3);
}

// 更新玩家属性
function updatePlayerStats(deltaTime) {
    var hungerDrain = 2 * deltaTime;
    var thirstDrain = 3 * deltaTime;

    player.hunger = Math.max(0, player.hunger - hungerDrain);
    player.thirst = Math.max(0, player.thirst - thirstDrain);

    if (player.hunger <= 0) player.health = Math.max(0, player.health - 5 * deltaTime);
    if (player.thirst <= 0) player.health = Math.max(0, player.health - 5 * deltaTime);

    updateTemperature(deltaTime);

    // 体温加成
    var bonus = getTemperatureBonus();
    if (bonus.staminaRegen !== 0) player.stamina = Math.min(100, Math.max(0, player.stamina + bonus.staminaRegen * deltaTime));
    if (bonus.sanityRegen !== 0) player.sanity = Math.min(100, Math.max(0, player.sanity + bonus.sanityRegen * deltaTime));

    // 精神恢复
    if (player.sanity < 100) player.sanity = Math.min(100, player.sanity + 0.5 * deltaTime);

    // 严重体温异常额外效果
    if (player.temperature < 33) { player.stamina = Math.max(0, player.stamina - 3 * deltaTime); player.sanity = Math.max(0, player.sanity - 2 * deltaTime); }
    if (player.temperature > 42) { player.thirst = Math.max(0, player.thirst - 3 * deltaTime); player.sanity = Math.max(0, player.sanity - 2 * deltaTime); }

    player.health = Math.max(0, Math.min(100, player.health));
    player.hunger = Math.max(0, Math.min(100, player.hunger));
    player.stamina = Math.max(0, Math.min(100, player.stamina));
    player.thirst = Math.max(0, Math.min(100, player.thirst));
    player.sanity = Math.max(0, Math.min(100, player.sanity));
}

// 获取体温加成/惩罚
function getTemperatureBonus() {
    var temp = player.temperature;
    var bonus = { staminaRegen: 0, sanityRegen: 0, hitRate: 0, craftBonus: 0, damageReduction: 0 };
    if (temp >= 36 && temp <= 38) { bonus.staminaRegen = 1; bonus.sanityRegen = 0.5; bonus.hitRate = 5; bonus.craftBonus = 10; }
    else if (temp >= 34 && temp < 36) { bonus.staminaRegen = -0.5; bonus.hitRate = -5; bonus.craftBonus = -5; }
    else if (temp > 38 && temp <= 40) { bonus.staminaRegen = -0.5; bonus.hitRate = -3; bonus.craftBonus = -5; }
    else if (temp >= 32 && temp < 34) { bonus.staminaRegen = -2; bonus.sanityRegen = -1; bonus.hitRate = -15; bonus.craftBonus = -20; }
    else if (temp > 40 && temp <= 42) { bonus.staminaRegen = -2; bonus.sanityRegen = -1; bonus.hitRate = -10; bonus.craftBonus = -15; }
    else if (temp < 32) { bonus.staminaRegen = -5; bonus.sanityRegen = -3; bonus.hitRate = -30; bonus.craftBonus = -50; }
    else if (temp > 42) { bonus.staminaRegen = -5; bonus.sanityRegen = -3; bonus.hitRate = -25; bonus.craftBonus = -40; }
    // 装备抗性
    if (player.armor) { var a = ITEMS[player.armor]; if (a) { if (a.special === 'cold_resist' && temp < 36) { bonus.hitRate += 10; bonus.craftBonus += 10; } if (a.special === 'heat_resist' && temp > 38) { bonus.hitRate += 10; bonus.craftBonus += 10; } if (a.special === 'thermal_regulate') { bonus.hitRate += 5; bonus.craftBonus += 5; } } }
    return bonus;
}

// 更新体温（天气联动增强版）
function updateTemperature(deltaTime) {
    var season = player.gameTime.season;
    var hour = player.gameTime.hour;
    var targetTemp = 37;

    // 季节基础温度
    if (season === 'spring') targetTemp = 37;
    else if (season === 'summer') targetTemp = 39;
    else if (season === 'autumn') targetTemp = 35;
    else if (season === 'winter') targetTemp = 33;

    // 昼夜温差
    if (hour >= 6 && hour < 10) targetTemp -= 1;
    else if (hour >= 12 && hour < 16) targetTemp += 1;
    else if (hour >= 20 || hour < 6) targetTemp -= 2;

    // 天气影响
    if (typeof weatherSystem !== 'undefined' && weatherSystem.currentWeather) {
        var w = weatherSystem.currentWeather;
        if (w === 'clear') targetTemp += 1;
        else if (w === 'cloudy') targetTemp -= 0.5;
        else if (w === 'rain') targetTemp -= 2;
        else if (w === 'heavyRain') targetTemp -= 3;
        else if (w === 'snow') targetTemp -= 4;
        else if (w === 'blizzard') targetTemp -= 7;
        else if (w === 'fog') targetTemp -= 1;
        else if (w === 'wind') targetTemp -= 2;
        else if (w === 'heatwave') targetTemp += 5;
        else if (w === 'starry') targetTemp -= 1;
    }

    // 建筑保护
    if (hasBuilding('firePit') && targetTemp < 35) targetTemp = Math.max(targetTemp, 35);
    if (hasBuilding('greenhouse') && season === 'winter') targetTemp += 3;
    if (hasBuilding('fortress') && Math.abs(targetTemp - 37) > 3) targetTemp = 37 + (targetTemp - 37) * 0.5;

    // 装备保护
    if (player.armor) {
        var a = ITEMS[player.armor];
        if (a) {
            if (a.special === 'cold_resist' && targetTemp < 36) targetTemp += 3;
            if (a.special === 'heat_resist' && targetTemp > 38) targetTemp -= 3;
            if (a.special === 'thermal_regulate') targetTemp = 37 + (targetTemp - 37) * 0.3;
        }
    }

    // 体温趋向目标
    player.temperature += (targetTemp - player.temperature) * 0.15 * deltaTime;

    // 体温异常生命损失
    if (player.temperature < 35) player.health = Math.max(0, player.health - (35 - player.temperature) * 0.5 * deltaTime);
    if (player.temperature > 40) player.health = Math.max(0, player.health - (player.temperature - 40) * 0.5 * deltaTime);

    // 正常范围恢复
    if (player.temperature >= 36 && player.temperature <= 38) player.temperature += (37 - player.temperature) * 0.05 * deltaTime;

    player.temperature = Math.max(28, Math.min(48, player.temperature));
}

// 恢复生命
function healPlayer(amount) {
    player.health = Math.min(100, player.health + amount);
    updateUI();
}

// 恢复体力
function restoreStamina(amount) {
    player.stamina = Math.min(100, player.stamina + amount);
    updateUI();
}

// 恢复水分
function restoreThirst(amount) {
    player.thirst = Math.min(100, player.thirst + amount);
    updateUI();
}

// 恢复满腹
function restoreHunger(amount) {
    player.hunger = Math.min(100, player.hunger + amount);
    updateUI();
}

// 恢复精神
function restoreSanity(amount) {
    player.sanity = Math.min(100, player.sanity + amount);
    updateUI();
}

// 调整体温
function adjustTemperature(amount) {
    player.temperature += amount;
    player.temperature = Math.max(30, Math.min(45, player.temperature));
    updateUI();
}

// 消耗体力
function consumeStamina(amount) {
    if (player.stamina < amount) {
        showMessage('体力不足！', 'error');
        return false;
    }
    player.stamina -= amount;
    updateUI();
    return true;
}

// 装备武器
function equipWeapon(weaponId) {
    const weapon = ITEMS[weaponId];
    if (!weapon || weapon.type !== 'weapon') {
        showMessage('无效的武器！', 'error');
        return false;
    }

    // 卸下当前武器
    if (player.weapon) {
        addItemToInventory(player.weapon, 1);
    }

    // 装备新武器
    player.weapon = weaponId;
    player.attack = 10 + (weapon.attack || 0);
    player.magicDamage = weapon.magicDamage || 0;

    // 从背包移除
    removeItemFromInventory(weaponId, 1);

    if (typeof soundSystem !== 'undefined' && soundSystem.enabled) soundSystem.play('wear');
    showMessage(`装备了${weapon.name}`, 'success');
    updateUI();
    return true;
}

// 卸下武器
function unequipWeapon() {
    if (!player.weapon) {
        showMessage('没有装备武器！', 'error');
        return false;
    }

    // 添加到背包
    if (addItemToInventory(player.weapon, 1)) {
        player.weapon = null;
        player.attack = 10;
        player.magicDamage = 0;
        showMessage('卸下了武器', 'success');
        updateUI();
        return true;
    }

    return false;
}

// 装备防具
function equipArmor(armorId) {
    const armor = ITEMS[armorId];
    if (!armor || armor.type !== 'armor') {
        showMessage('无效的防具！', 'error');
        return false;
    }

    // 卸下当前防具
    if (player.armor) {
        addItemToInventory(player.armor, 1);
    }

    // 装备新防具
    player.armor = armorId;
    player.defense = (armor.defense || 0) + (hasBuilding('fortress') ? 10 : 0);

    // 从背包移除
    removeItemFromInventory(armorId, 1);

    if (typeof soundSystem !== 'undefined' && soundSystem.enabled) soundSystem.play('wear');
    showMessage(`装备了${armor.name}`, 'success');
    updateUI();
    return true;
}

// 卸下防具
function unequipArmor() {
    if (!player.armor) {
        showMessage('没有装备防具！', 'error');
        return false;
    }

    // 添加到背包
    if (addItemToInventory(player.armor, 1)) {
        player.armor = null;
        player.defense = hasBuilding('fortress') ? 10 : 0;
        showMessage('卸下了防具', 'success');
        updateUI();
        return true;
    }

    return false;
}

// 增加魂
function addSoul(amount) {
    player.soul += amount;
    showMessage(`获得了${amount}魂`, 'success');
    updateUI();
}

// 分配魂点
function allocateSoulPoint(stat) {
    const costs = {
        defense: 10,
        hitRate: 20,
        attack: 30
    };

    const cost = costs[stat];
    if (!cost) {
        showMessage('无效的属性！', 'error');
        return false;
    }

    if (player.soul < cost) {
        showMessage(`魂不足！需要${cost}魂`, 'error');
        return false;
    }

    // 扣除魂
    player.soul -= cost;

    // 提升属性
    switch (stat) {
        case 'defense':
            player.defense += 1;
            showMessage(`防御力+1，当前: ${player.defense}`, 'success');
            break;
        case 'hitRate':
            player.hitRate += 1;
            showMessage(`命中率+1%，当前: ${player.hitRate}%`, 'success');
            break;
        case 'attack':
            player.attack += 1;
            showMessage(`攻击力+1，当前: ${player.attack}`, 'success');
            break;
    }

    updateUI();
    return true;
}

// 检查玩家是否死亡
function checkPlayerDeath() {
    if (player.health <= 0) {
        showMessage('你死了！', 'error');
        // 这里可以添加死亡处理逻辑
        return true;
    }
    return false;
}

// 解锁地图
function unlockMap(mapId) {
    if (!player.unlockedMaps.includes(mapId)) {
        player.unlockedMaps.push(mapId);
        showMessage(`解锁了新地图: ${MAPS[mapId]?.name || mapId}`, 'success');
        updateUI();
        return true;
    }
    return false;
}

// 建造设施
function buildStructure(buildingId) {
    if (player.buildings.includes(buildingId)) {
        showMessage('已经建造了该设施！', 'warning');
        return false;
    }

    const building = BUILDINGS[buildingId];
    if (!building) {
        showMessage('无效的设施！', 'error');
        return false;
    }

    // 检查材料
    for (const [itemId, amount] of Object.entries(building.materials)) {
        if (!hasItem(itemId, amount)) {
            showMessage(`材料不足！需要${ITEMS[itemId]?.name || itemId}×${amount}`, 'error');
            return false;
        }
    }

    // 消耗材料
    for (const [itemId, amount] of Object.entries(building.materials)) {
        removeItemFromInventory(itemId, amount);
    }

    // 建造设施
    player.buildings.push(buildingId);
    showMessage(`建造了${building.name}`, 'success');
    updateUI();
    return true;
}

// 检查是否已建造设施
function hasBuilding(buildingId) {
    return player.buildings.includes(buildingId);
}

// 显示玩家状态详情
function showPlayerStatus() {
    const content = `
        <div class="player-status">
            <h4>基础属性</h4>
            <ul>
                <li>生命: ${Math.round(player.health)}/100</li>
                <li>满腹: ${Math.round(player.hunger)}/100</li>
                <li>体力: ${Math.round(player.stamina)}/100</li>
                <li>水分: ${Math.round(player.thirst)}/100</li>
                <li>精神: ${Math.round(player.sanity)}/100</li>
                <li>体温: ${player.temperature.toFixed(1)}°C</li>
            </ul>

            <h4>战斗属性</h4>
            <ul>
                <li>攻击力: ${player.attack}</li>
                <li>防御力: ${player.defense}</li>
                <li>命中率: ${player.hitRate}%</li>
                <li>魔法伤害: ${player.magicDamage}</li>
                <li>魂: ${player.soul}</li>
            </ul>

            <h4>装备</h4>
            <ul>
                <li>武器: ${player.weapon ? ITEMS[player.weapon]?.name || '无' : '无'}</li>
                <li>防具: ${player.armor ? ITEMS[player.armor]?.name || '无' : '无'}</li>
            </ul>

            <h4>背包</h4>
            <p>容量: ${player.inventory.length}/${player.maxInventory}</p>

            <h4>游戏进度</h4>
            <ul>
                <li>天数: 第${player.gameTime.day}天</li>
                <li>季节: ${getSeasonName(player.gameTime.season)}</li>
                <li>时间: ${formatTime(player.gameTime.hour)}</li>
                <li>阵营: ${player.faction === 'cannibal' ? '食人族' : player.faction === 'mage' ? '法师' : '未选择'}</li>
            </ul>
        </div>
    `;

    showModal('玩家状态', content, [
        { text: '分配魂点', action: 'showSoulAllocation()' },
        { text: '关闭', action: 'hideModal();' }
    ]);
}

// 显示魂点分配界面
function showSoulAllocation() {
    const content = `
        <div class="soul-allocation">
            <p>当前魂: ${player.soul}</p>

            <div class="allocation-option">
                <span>防御力: ${player.defense}</span>
                <button class="modal-btn" onclick="allocateSoulPoint('defense'); showSoulAllocation();">
                    +1 (消耗10魂)
                </button>
            </div>

            <div class="allocation-option">
                <span>命中率: ${player.hitRate}%</span>
                <button class="modal-btn" onclick="allocateSoulPoint('hitRate'); showSoulAllocation();">
                    +1% (消耗20魂)
                </button>
            </div>

            <div class="allocation-option">
                <span>攻击力: ${player.attack}</span>
                <button class="modal-btn" onclick="allocateSoulPoint('attack'); showSoulAllocation();">
                    +1 (消耗30魂)
                </button>
            </div>
        </div>
    `;

    showModal('魂点分配', content, [
        { text: '返回', action: 'showPlayerStatus();' },
        { text: '关闭', action: 'hideModal();' }
    ]);
}
