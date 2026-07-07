// 工具函数文件
// 改进：XSS 防护、UI 节流、命名空间收拢

// ── HTML 转义（XSS 防护）──────────────────────────────

const _escapeHtmlDiv = document.createElement('div');

function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    _escapeHtmlDiv.textContent = String(str);
    return _escapeHtmlDiv.innerHTML;
}

// ── 消息 & 日志 ───────────────────────────────────────

// 显示消息提示
function showMessage(text, type = 'info', duration = 2000) {
    // 移除现有消息
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // 创建新消息（textContent 已天然防 XSS）
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    document.body.appendChild(message);

    // 自动移除
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, duration);

    // 同时写入操作日志
    addLogEntry(text, type);

    // 播放音效
    if (typeof soundSystem !== 'undefined' && soundSystem.enabled) {
        if (type === 'error') soundSystem.play('error');
        else if (type === 'success') soundSystem.play('bell');
    }
}

// 物品获取 Toast 动画
function showItemToast(itemName, count) {
    const toast = document.createElement('div');
    toast.className = 'item-toast';
    toast.textContent = `+${count} ${itemName}`;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
        toast.classList.add('fade-out');
    }, 1200);

    setTimeout(() => {
        if (toast.parentNode) toast.remove();
    }, 1800);
}

// 操作日志系统
const gameLog = [];
const MAX_LOG_ENTRIES = 30;

function addLogEntry(text, type = 'info') {
    const logTypes = {
        'success': 'log-gain',
        'error': 'log-cost',
        'warning': 'log-cost',
        'info': 'log-info'
    };

    gameLog.unshift({ text, type: logTypes[type] || 'log-system', time: Date.now() });

    if (gameLog.length > MAX_LOG_ENTRIES) {
        gameLog.pop();
    }

    // 节流：合并同一帧内的多次日志更新
    _scheduleLogUpdate();
}

let _logUpdatePending = false;
function _scheduleLogUpdate() {
    if (_logUpdatePending) return;
    _logUpdatePending = true;
    requestAnimationFrame(() => {
        _logUpdatePending = false;
        _doUpdateLogDisplay();
    });
}

function _doUpdateLogDisplay() {
    const logContainer = document.getElementById('game-log');
    if (!logContainer) return;

    // 使用 DocumentFragment 批量 DOM 操作
    const fragment = document.createDocumentFragment();
    gameLog.slice(0, 10).forEach(entry => {
        const div = document.createElement('div');
        div.className = `log-entry ${entry.type}`;
        div.textContent = entry.text; // textContent 天然防 XSS
        fragment.appendChild(div);
    });

    logContainer.innerHTML = '';
    logContainer.appendChild(fragment);
}

// ── 模态框 ────────────────────────────────────────────

// 显示模态框（对 title 和 btn.text 做转义，btn.action 来自内部代码不受外部输入影响）
function showModal(title, content, buttons = []) {
    if (typeof soundSystem !== 'undefined' && soundSystem.enabled) soundSystem.play('open');
    const modal = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');

    let html = `<h3>${escapeHtml(title)}</h3>`;
    html += `<div class="modal-body">${content}</div>`; // content 由内部构造，暂信任

    if (buttons.length > 0) {
        html += '<div class="modal-buttons">';
        buttons.forEach(btn => {
            html += `<button class="modal-btn" onclick="${btn.action}">${escapeHtml(btn.text)}</button>`;
        });
        html += '</div>';
    }

    modalContent.innerHTML = html;
    modal.style.display = 'flex';
}

// 隐藏模态框
function hideModal() {
    const modal = document.getElementById('modal-container');
    modal.style.display = 'none';
}

// ── 格式化工具 ─────────────────────────────────────────

// 格式化时间
function formatTime(hour) {
    return hour.toString().padStart(2, '0') + ':00';
}

// 格式化日期
function formatDay(day) {
    return `第${day}天`;
}

// 获取季节名称
function getSeasonName(season) {
    const seasons = {
        spring: '春季',
        summer: '夏季',
        autumn: '秋季',
        winter: '冬季'
    };
    return seasons[season] || season;
}

// 随机整数
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 随机浮点数
function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

// 随机选择数组元素
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// ── 物品操作 ───────────────────────────────────────────

// 检查物品是否可堆叠
function isStackable(itemId) {
    const item = ITEMS[itemId];
    return item && item.stackable;
}

// 获取物品最大堆叠数
function getMaxStack(itemId) {
    const item = ITEMS[itemId];
    return item ? (item.maxStack || 99) : 1;
}

// 计算物品在背包中的总数量
function countItemInInventory(itemId) {
    if (!player || !player.inventory) return 0;
    return player.inventory.reduce((total, slot) => {
        if (slot.id === itemId) {
            return total + (slot.count || 1);
        }
        return total;
    }, 0);
}

// 检查背包是否有足够物品
function hasItem(itemId, amount = 1) {
    return countItemInInventory(itemId) >= amount;
}

// 从背包移除物品
function removeItemFromInventory(itemId, amount = 1) {
    if (!player || !player.inventory) return false;

    let remaining = amount;
    for (let i = player.inventory.length - 1; i >= 0; i--) {
        const slot = player.inventory[i];
        if (slot.id === itemId) {
            const removeCount = Math.min(remaining, slot.count || 1);
            slot.count = (slot.count || 1) - removeCount;
            remaining -= removeCount;

            if (slot.count <= 0) {
                player.inventory.splice(i, 1);
            }

            if (remaining <= 0) break;
        }
    }

    return remaining <= 0;
}

// 添加物品到背包
function addItemToInventory(itemId, amount = 1) {
    if (!player || !player.inventory) return false;

    const item = ITEMS[itemId];
    if (!item) return false;

    // 检查背包是否已满
    if (player.inventory.length >= player.maxInventory && !isStackable(itemId)) {
        showMessage('背包已满！', 'error');
        return false;
    }

    // 尝试堆叠到现有物品
    if (isStackable(itemId)) {
        const existingSlot = player.inventory.find(slot => slot.id === itemId);
        if (existingSlot) {
            const maxStack = getMaxStack(itemId);
            const canAdd = maxStack - (existingSlot.count || 1);
            const addCount = Math.min(amount, canAdd);

            if (addCount > 0) {
                existingSlot.count = (existingSlot.count || 1) + addCount;
                amount -= addCount;
            }
        }
    }

    // 添加新物品槽位
    while (amount > 0 && player.inventory.length < player.maxInventory) {
        const addCount = isStackable(itemId) ? Math.min(amount, getMaxStack(itemId)) : 1;
        player.inventory.push({
            id: itemId,
            count: addCount
        });
        amount -= addCount;
    }

    if (amount > 0) {
        showMessage('背包空间不足！', 'error');
        return false;
    }

    return true;
}

// ── UI 更新（节流）──────────────────────────────────────

let _uiUpdatePending = false;

// 更新UI显示（使用 requestAnimationFrame 节流）
function updateUI() {
    if (!player) return;
    if (_uiUpdatePending) return;
    _uiUpdatePending = true;
    requestAnimationFrame(() => {
        _uiUpdatePending = false;
        _doUpdateUI();
    });
}

function _doUpdateUI() {
    try {
        // 更新属性条
        updateStatBar('health', player.health, 100);
        updateStatBar('hunger', player.hunger, 100);
        updateStatBar('stamina', player.stamina, 100);
        updateStatBar('thirst', player.thirst, 100);
        updateStatBar('sanity', player.sanity, 100);

        // 更新体温
        const tempEl = document.getElementById('temperature-value');
        if (tempEl) tempEl.textContent = `${player.temperature}°C`;

        // 更新战斗属性
        const atkEl = document.getElementById('attack-value');
        const defEl = document.getElementById('defense-value');
        const hitEl = document.getElementById('hitrate-value');
        const soulEl = document.getElementById('soul-value');
        const levelEl = document.getElementById('level-value');
        const xpEl = document.getElementById('xp-value');
        if (atkEl) atkEl.textContent = player.attack;
        if (defEl) defEl.textContent = player.defense;
        if (hitEl) hitEl.textContent = `${player.hitRate}%`;
        if (soulEl) soulEl.textContent = player.soul;
        if (levelEl) levelEl.textContent = player.level || 1;
        if (xpEl) {
            const needed = typeof getXPForLevel === 'function' ? getXPForLevel(player.level || 1) : 50;
            xpEl.textContent = `${player.xp || 0}/${needed}`;
        }

        // 更新时间显示
        const dayEl = document.getElementById('day-display');
        const seasonEl = document.getElementById('season-display');
        const timeEl = document.getElementById('time-display');
        if (dayEl) dayEl.textContent = formatDay(player.gameTime.day);
        if (seasonEl) seasonEl.textContent = getSeasonName(player.gameTime.season);
        if (timeEl) timeEl.textContent = formatTime(player.gameTime.hour);

        // 更新天气显示
        if (typeof weatherSystem !== 'undefined') {
            const weatherEl = document.getElementById('weather-display');
            if (weatherEl) {
                weatherEl.textContent = `${weatherSystem.getWeatherIcon()} ${weatherSystem.getWeatherName()}`;
            }
        }

        // 更新装备显示
        const weaponSlot = document.getElementById('weapon-slot');
        const armorSlot = document.getElementById('armor-slot');
        if (weaponSlot) {
            weaponSlot.querySelector('.slot-content').textContent = player.weapon ? getItemName(player.weapon) : '无';
        }
        if (armorSlot) {
            armorSlot.querySelector('.slot-content').textContent = player.armor ? getItemName(player.armor) : '无';
        }

        // 更新背包显示
        updateInventoryUI();

        // 检查地图解锁并更新地图显示和行动按钮
        if (typeof mapSystem !== 'undefined') {
            mapSystem.checkUnlocks();
            mapSystem.updateMapDisplay();
            mapSystem.updateActionButtons();
        }

        // 检查资源警告
        checkResourceWarnings();
    } catch (error) {
        console.error('updateUI 错误:', error);
    }
}

// 更新属性条
function updateStatBar(stat, value, max) {
    const bar = document.getElementById(`${stat}-bar`);
    const valueDisplay = document.getElementById(`${stat}-value`);

    if (bar && valueDisplay) {
        const percentage = Math.max(0, Math.min(100, (value / max) * 100));
        bar.style.width = `${percentage}%`;
        valueDisplay.textContent = Math.round(value);
    }
}

// 资源效率分析系统
function showResourceEfficiency() {
    if (!player) return;

    const currentMap = typeof mapSystem !== 'undefined' ? mapSystem.getCurrentMap() : null;
    if (!currentMap) {
        showMessage('请先选择一个地图', 'warning');
        return;
    }

    let content = '<div class="resource-efficiency">';
    content += `<h4>📊 ${escapeHtml(currentMap.name)} - 资源效率分析</h4>`;
    content += '<div class="efficiency-table">';

    // 表头
    content += '<div class="efficiency-header">';
    content += '<span>资源</span><span>期望产出</span><span>体力消耗</span><span>效率</span>';
    content += '</div>';

    // 分析每个资源的效率
    if (currentMap.resources) {
        Object.entries(currentMap.resources).forEach(([resourceId, resource]) => {
            const item = ITEMS[resourceId];
            if (!item) return;

            const expectedYield = (resource.min + resource.max) / 2 * resource.chance;
            const staminaCost = currentMap.staminaCost || 3;
            const efficiency = expectedYield / staminaCost;

            const efficiencyClass = efficiency > 0.3 ? 'high' : efficiency > 0.15 ? 'medium' : 'low';

            content += '<div class="efficiency-row">';
            content += `<span>${getItemIcon(resourceId)} ${escapeHtml(item.name)}</span>`;
            content += `<span>${expectedYield.toFixed(1)}</span>`;
            content += `<span>${staminaCost}</span>`;
            content += `<span class="efficiency-${efficiencyClass}">${efficiency.toFixed(2)}</span>`;
            content += '</div>';
        });
    }

    content += '</div>';

    // 添加建议
    content += '<div class="efficiency-tips">';
    content += '<h5>💡 效率建议</h5>';

    if (player.gameTime.season === 'autumn') {
        content += '<p>⚠️ 当前为秋季，建议优先囤积食物和水准备过冬</p>';
    } else if (player.gameTime.season === 'winter') {
        content += '<p>❄️ 冬季资源停产，建议使用被动资源产出</p>';
    }

    if (player.stamina < 30) {
        content += '<p>😴 体力不足，建议休息恢复</p>';
    }

    content += '</div>';
    content += '</div>';

    showModal('资源效率分析', content, [
        { text: '关闭', action: 'hideModal()' }
    ]);
}

// 更新背包UI
function updateInventoryUI() {
    if (!player) return;

    const grid = document.getElementById('inventory-grid');
    const countDisplay = document.getElementById('inventory-count');
    const maxDisplay = document.getElementById('inventory-max');

    if (countDisplay) countDisplay.textContent = player.inventory.length;
    if (maxDisplay) maxDisplay.textContent = player.maxInventory;

    if (!grid) return;

    // 使用 DocumentFragment 批量 DOM 操作
    const fragment = document.createDocumentFragment();

    // 创建物品槽位
    for (let i = 0; i < player.maxInventory; i++) {
        const slot = document.createElement('div');
        slot.className = 'inventory-slot';

        if (i < player.inventory.length) {
            const item = player.inventory[i];
            const itemData = ITEMS[item.id];

            if (itemData) {
                slot.innerHTML = `
                    <div class="item-icon">${getItemIcon(item.id)}</div>
                    <div class="item-name">${escapeHtml(itemData.name)}</div>
                    <div class="item-count">${item.count > 1 ? item.count : ''}</div>
                `;
                slot.onclick = () => showItemDetails(item.id, i);
            }
        } else {
            slot.className = 'inventory-slot empty';
        }

        fragment.appendChild(slot);
    }

    grid.innerHTML = '';
    grid.appendChild(fragment);
}

// 显示物品详情
function showItemDetails(itemId, index) {
    const item = ITEMS[itemId];
    if (!item) return;

    const slot = player.inventory[index];
    const count = slot ? (slot.count || 1) : 1;
    const canUse = item.type === 'food' || item.type === 'potion';

    const content = `
        <h4>${escapeHtml(item.name)}</h4>
        <p>${escapeHtml(item.description || '')}</p>
        ${item.effect ? `<p class="tooltip-effects">效果: ${escapeHtml(formatEffects(item.effect))}</p>` : ''}
        ${canUse && count > 1 ? `
        <div class="batch-use-section">
            <label class="batch-label">使用数量</label>
            <div class="batch-controls">
                <button class="batch-btn" onclick="batchAdjustQty(-1)">−</button>
                <input type="number" id="batch-qty" class="batch-input" value="1" min="1" max="${count}" onchange="batchClampQty(${count})">
                <button class="batch-btn" onclick="batchAdjustQty(1)">+</button>
                <button class="batch-btn batch-max" onclick="batchSetMax(${count})">最大</button>
            </div>
        </div>
        ` : ''}
        <div class="item-actions">
            ${canUse ? (count > 1
                ? `<button class="item-action-btn use" onclick="useItemBatch(${index})">使用</button>`
                : `<button class="item-action-btn use" onclick="useItem(${index})">使用</button>`)
            : ''}
            <button class="item-action-btn drop" onclick="dropItem(${index})">丢弃</button>
        </div>
    `;

    showModal(item.name, content, [
        { text: '关闭', action: 'hideModal()' }
    ]);
}

// 批量使用：调整数量
function batchAdjustQty(delta) {
    const input = document.getElementById('batch-qty');
    if (!input) return;
    const max = parseInt(input.max) || 99;
    let val = parseInt(input.value) || 1;
    val = Math.max(1, Math.min(max, val + delta));
    input.value = val;
}

// 批量使用：限制范围
function batchClampQty(max) {
    const input = document.getElementById('batch-qty');
    if (!input) return;
    let val = parseInt(input.value) || 1;
    val = Math.max(1, Math.min(max, val));
    input.value = val;
}

// 批量使用：设为最大
function batchSetMax(max) {
    const input = document.getElementById('batch-qty');
    if (!input) return;
    input.value = max;
}

// 批量使用物品
function useItemBatch(index) {
    if (!player || !player.inventory || index >= player.inventory.length) return;

    const input = document.getElementById('batch-qty');
    let qty = input ? (parseInt(input.value) || 1) : 1;

    const slot = player.inventory[index];
    const item = ITEMS[slot.id];
    if (!item) return;

    const canUse = item.type === 'food' || item.type === 'potion';
    if (!canUse) {
        showMessage('该物品无法使用！', 'error');
        return;
    }

    const count = slot.count || 1;
    qty = Math.max(1, Math.min(count, qty));

    // 应用效果 × qty
    if (item.effect) {
        Object.entries(item.effect).forEach(([stat, value]) => {
            if (player[stat] !== undefined) {
                player[stat] = Math.min(100, player[stat] + value * qty);
            }
        });
    }

    // 移除物品
    slot.count = count - qty;
    if (slot.count <= 0) {
        player.inventory.splice(index, 1);
    }

    if (typeof soundSystem !== 'undefined' && soundSystem.enabled) {
        soundSystem.play(item.type === 'potion' ? 'drink' : 'eat');
    }

    showMessage(`使用了${item.name}×${qty}`, 'success');
    hideModal();
    updateUI();
}

// 格式化效果显示
function formatEffects(effects) {
    const effectNames = {
        health: '生命',
        hunger: '满腹',
        stamina: '体力',
        thirst: '水分',
        sanity: '精神',
        temperature: '体温'
    };

    return Object.entries(effects)
        .map(([key, value]) => `${effectNames[key] || key}: ${value > 0 ? '+' : ''}${value}`)
        .join(', ');
}

// 使用物品
function useItem(index) {
    if (!player || !player.inventory || index >= player.inventory.length) return;

    const slot = player.inventory[index];
    const item = ITEMS[slot.id];

    if (!item || (item.type !== 'food' && item.type !== 'potion')) {
        showMessage('该物品无法使用！', 'error');
        return;
    }

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

    // 播放使用音效
    if (typeof soundSystem !== 'undefined' && soundSystem.enabled) {
        soundSystem.play(item.type === 'potion' ? 'drink' : 'eat');
    }

    showMessage(`使用了${item.name}`, 'success');
    hideModal();
    updateUI();
}

// 丢弃物品
function dropItem(index) {
    if (!player || !player.inventory || index >= player.inventory.length) return;

    const slot = player.inventory[index];
    const item = ITEMS[slot.id];

    if (!item) return;

    // 确认丢弃
    if (confirm(`确定要丢弃${item.name}吗？`)) {
        player.inventory.splice(index, 1);
        showMessage(`丢弃了${item.name}`, 'warning');
        hideModal();
        updateUI();
    }
}

// 保存游戏
function saveGame() {
    if (typeof storage !== 'undefined') {
        storage.save();
        showMessage('游戏已保存', 'success');
    }
}

// 资源警告系统
function checkResourceWarnings() {
    if (!player) return;

    // 检查关键属性
    if (player.health < 20) {
        showMessage('❤️ 生命值过低，请及时恢复！', 'error');
    } else if (player.hunger < 15) {
        showMessage('🍖 饥饿状态，请进食！', 'warning');
    } else if (player.thirst < 15) {
        showMessage('💧 口渴状态，请饮水！', 'warning');
    } else if (player.stamina < 10) {
        showMessage('⚡ 体力不足，请休息！', 'warning');
    }

    // 秋季检查过冬准备
    if (player.gameTime.season === 'autumn') {
        const dayInSeason = player.gameTime.day % 30;
        if (dayInSeason >= 20) {
            const waterCount = countItemInInventory('water');
            const woodCount = countItemInInventory('wood');
            const foodCount = countItemInInventory('rawMeat') + countItemInInventory('berry') + countItemInInventory('bread');

            if (waterCount < 10) {
                showMessage('⚠️ 水储备不足，建议多采集水！', 'warning');
            }
            if (woodCount < 20) {
                showMessage('⚠️ 木头储备不足，冬季需要木头取暖！', 'warning');
            }
            if (foodCount < 15) {
                showMessage('⚠️ 食物储备不足，建议囤积食物！', 'warning');
            }
        }
    }
}

// 加载游戏
function loadGame() {
    if (typeof storage !== 'undefined') {
        if (storage.load()) {
            showMessage('游戏已加载', 'success');
            updateUI();
            return true;
        }
    }
    showMessage('没有找到存档', 'error');
    return false;
}

// 键盘快捷键系统
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // 如果模态框打开，ESC 关闭
        if (e.key === 'Escape') {
            const modal = document.getElementById('modal-container');
            if (modal && modal.style.display === 'flex') {
                hideModal();
                e.preventDefault();
                return;
            }
        }

        // 如果焦点在输入框中，不处理快捷键
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
            return;
        }

        // 数字键 1-9 触发对应行动按钮
        if (e.key >= '1' && e.key <= '9') {
            const buttons = document.querySelectorAll('#action-buttons .action-btn');
            const index = parseInt(e.key) - 1;
            if (index < buttons.length) {
                buttons[index].click();
                e.preventDefault();
            }
            return;
        }

        // M 键打开地图列表
        if (e.key === 'm' || e.key === 'M') {
            if (typeof game !== 'undefined' && game.showMapList) {
                game.showMapList();
                e.preventDefault();
            }
            return;
        }

        // B 键打开建造菜单（仅在家）
        if (e.key === 'b' || e.key === 'B') {
            if (typeof mapSystem !== 'undefined' && mapSystem.currentMap === 'darkForest') {
                if (typeof game !== 'undefined' && game.showBuildMenu) {
                    game.showBuildMenu();
                    e.preventDefault();
                }
            }
            return;
        }

        // I 键打开背包详情
        if (e.key === 'i' || e.key === 'I') {
            if (typeof game !== 'undefined' && game.showInventory) {
                game.showInventory();
                e.preventDefault();
            }
            return;
        }

        // E 键打开资源效率分析
        if (e.key === 'e' || e.key === 'E') {
            if (typeof showResourceEfficiency === 'function') {
                showResourceEfficiency();
                e.preventDefault();
            }
            return;
        }

        // Q 键打开任务列表
        if (e.key === 'q' || e.key === 'Q') {
            if (typeof questSystem !== 'undefined' && questSystem.showQuestList) {
                questSystem.showQuestList();
                e.preventDefault();
            }
            return;
        }

        // W 键打开天气信息
        if (e.key === 'w' || e.key === 'W') {
            if (typeof weatherSystem !== 'undefined' && weatherSystem.showWeatherInfo) {
                weatherSystem.showWeatherInfo();
                e.preventDefault();
            }
            return;
        }

        // R 键打开成就列表
        if (e.key === 'r' || e.key === 'R') {
            if (typeof achievementSystem !== 'undefined' && achievementSystem.showAchievementList) {
                achievementSystem.showAchievementList();
                e.preventDefault();
            }
            return;
        }
    });
}

// ── 注册到命名空间 ─────────────────────────────────────

if (typeof KBA !== 'undefined') {
    KBA.utils = Object.assign(KBA.utils || {}, {
        escapeHtml,
        showMessage,
        showItemToast,
        addLogEntry,
        showModal,
        hideModal,
        updateUI,
        updateStatBar,
        addItemToInventory,
        removeItemFromInventory,
        hasItem,
        countItemInInventory,
        isStackable,
        getMaxStack,
        useItem,
        useItemBatch,
        dropItem,
        saveGame,
        loadGame,
        formatTime,
        formatDay,
        getSeasonName,
        formatEffects,
        randomInt,
        randomFloat,
        randomChoice,
        showResourceEfficiency,
        showItemDetails,
        initKeyboardShortcuts,
        batchAdjustQty,
        batchClampQty,
        batchSetMax
    });
}
