// 存储系统文件
// 改进：自动序列化、版本迁移、存档校验、自动保存可控

const storage = {
    // 存储键名
    SAVE_KEY: 'kubition_adventure_save',

    // 当前版本号
    CURRENT_VERSION: '5.1',

    // 自动保存定时器 ID
    _autoSaveTimer: null,

    // 需要序列化的 player 字段白名单（排除函数）
    _PLAYER_FIELDS: [
        'health', 'hunger', 'stamina', 'thirst', 'sanity', 'temperature',
        'attack', 'defense', 'hitRate', 'magicDamage', 'soul', 'xp', 'level',
        'weapon', 'armor',
        'inventory', 'maxInventory',
        'unlockedMaps', 'buildings',
        'dungeonFloor', 'faction',
        'gameTime', 'research', 'skillCooldowns'
    ],

    // ── 工具方法 ──────────────────────────────────────

    // 从 player 对象提取可序列化的数据快照
    _snapshotPlayer: function() {
        const snapshot = {};
        for (const key of this._PLAYER_FIELDS) {
            const val = player[key];
            // 深拷贝引用类型，避免存档与运行时共享同一引用
            snapshot[key] = (val !== null && typeof val === 'object')
                ? JSON.parse(JSON.stringify(val))
                : val;
        }
        return snapshot;
    },

    // 校验存档数据结构完整性
    _validateSaveData: function(data) {
        if (!data || typeof data !== 'object') return false;
        if (!data.version || !data.player) return false;
        // 必须包含核心字段
        const required = ['health', 'hunger', 'stamina', 'inventory', 'gameTime'];
        return required.every(k => k in data.player);
    },

    // 计算简易校验和（基于 JSON 字符串）
    _computeChecksum: function(jsonStr) {
        let hash = 0;
        for (let i = 0; i < jsonStr.length; i++) {
            const ch = jsonStr.charCodeAt(i);
            hash = ((hash << 5) - hash) + ch;
            hash = hash & hash; // 转为 32 位整数
        }
        return hash.toString(36);
    },

    // ── 版本迁移 ─────────────────────────────────────

    // 迁移注册表：key = 源版本，value = 迁移函数
    _migrations: {
        '5.0': function(data) {
            // 5.0 → 5.1: 新增 checksum 字段，补全新属性默认值
            data.version = '5.1';
            if (data.player) {
                if (data.player.magicDamage === undefined) data.player.magicDamage = 0;
                if (data.player.soul === undefined) data.player.soul = 0;
            }
            return data;
        }
    },

    // 执行版本迁移链
    _migrate: function(data) {
        let current = data.version;
        const visited = new Set();

        while (current !== this.CURRENT_VERSION) {
            if (visited.has(current)) {
                console.error('存档迁移检测到循环，终止于版本:', current);
                break;
            }
            visited.add(current);

            const migration = this._migrations[current];
            if (!migration) {
                console.warn(`无可用迁移路径: ${current} → ${this.CURRENT_VERSION}`);
                break;
            }
            data = migration(data);
            current = data.version;
        }

        return data;
    },

    // ── 核心存读档 ─────────────────────────────────────

    // 保存游戏
    save: function() {
        try {
            const playerData = this._snapshotPlayer();
            const saveData = {
                version: this.CURRENT_VERSION,
                timestamp: Date.now(),
                player: playerData,
                currentMap: (typeof mapSystem !== 'undefined') ? mapSystem.currentMap : 'darkForest'
            };

            const jsonStr = JSON.stringify(saveData);
            saveData.checksum = this._computeChecksum(jsonStr);
            // 写入含 checksum 的最终 JSON
            localStorage.setItem(this.SAVE_KEY, JSON.stringify(saveData));
return true;
        } catch (error) {
            console.error('保存游戏失败:', error);
            return false;
        }
    },

    // 加载游戏
    load: function() {
        try {
            const saveDataStr = localStorage.getItem(this.SAVE_KEY);
            if (!saveDataStr) {
return false;
            }

            let saveData = JSON.parse(saveDataStr);

            // 版本迁移
            if (saveData.version !== this.CURRENT_VERSION) {
                saveData = this._migrate(saveData);
}

            // 校验完整性
            if (!this._validateSaveData(saveData)) {
                console.error('存档数据校验失败');
                return false;
            }

            // 恢复玩家数据
            if (saveData.player) {
                Object.assign(player, saveData.player);
            }

            // 恢复地图状态（直接设置，不触发 switchMap 的体力/时间消耗）
            if (saveData.currentMap && typeof mapSystem !== 'undefined') {
                mapSystem.currentMap = saveData.currentMap;
            }
return true;
        } catch (error) {
            console.error('加载游戏失败:', error);
            return false;
        }
    },

    // 检查是否有存档

    // 删除存档
    deleteSave: function() {
        try {
            localStorage.removeItem(this.SAVE_KEY);
return true;
        } catch (error) {
            console.error('删除存档失败:', error);
            return false;
        }
    },

    // ── 导入 / 导出 ─────────────────────────────────

    // 导出存档（下载为 JSON 文件）
    exportSave: function() {
        try {
            const saveDataStr = localStorage.getItem(this.SAVE_KEY);
            if (!saveDataStr) {
                showMessage('没有找到存档', 'error');
                return;
            }

            const blob = new Blob([saveDataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `kubition_save_${new Date().toISOString().slice(0, 10)}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            showMessage('存档已导出', 'success');
        } catch (error) {
            console.error('导出存档失败:', error);
            showMessage('导出存档失败', 'error');
        }
    },

    // 导入存档（从文件读取）
    importSave: function(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const saveData = JSON.parse(e.target.result);

                // 预校验
                if (!storage._validateSaveData(saveData)) {
                    showMessage('无效的存档文件', 'error');
                    return;
                }

                // 保存到 localStorage 后加载
                localStorage.setItem(storage.SAVE_KEY, JSON.stringify(saveData));

                if (storage.load()) {
                    showMessage('存档导入成功', 'success');
                    updateUI();
                } else {
                    showMessage('导入的存档无法加载', 'error');
                }
            } catch (error) {
                console.error('导入存档失败:', error);
                showMessage('导入存档失败', 'error');
            }
        };
        reader.readAsText(file);
    },

    // ── 自动保存 ─────────────────────────────────────

    // 启动自动保存（每 5 分钟一次）
    startAutoSave: function() {
        this.stopAutoSave(); // 防止重复启动
        this._autoSaveTimer = setInterval(() => {
            this.save();
}, 5 * 60 * 1000);
    },

    // 停止自动保存
    stopAutoSave: function() {
        if (this._autoSaveTimer !== null) {
            clearInterval(this._autoSaveTimer);
            this._autoSaveTimer = null;
        }
    },

    // ── 存档信息 & UI ────────────────────────────────

    // 获取存档摘要信息
    getSaveInfo: function() {
        try {
            const saveDataStr = localStorage.getItem(this.SAVE_KEY);
            if (!saveDataStr) return null;

            const saveData = JSON.parse(saveDataStr);
            return {
                version: saveData.version,
                timestamp: saveData.timestamp,
                day: saveData.player?.gameTime?.day || 0,
                season: saveData.player?.gameTime?.season || 'unknown'
            };
        } catch (error) {
            console.error('获取存档信息失败:', error);
            return null;
        }
    },

    // 显示存档管理界面
    showSaveMenu: function() {
        const saveInfo = this.getSaveInfo();
        let content = '';

        if (saveInfo) {
            const saveDate = new Date(saveInfo.timestamp).toLocaleString();
            content = `
                <p>当前存档信息:</p>
                <ul>
                    <li>版本: ${saveInfo.version}</li>
                    <li>天数: 第${saveInfo.day}天</li>
                    <li>季节: ${KBA.utils.getSeasonName(saveInfo.season)}</li>
                    <li>保存时间: ${saveDate}</li>
                </ul>
            `;
        } else {
            content = '<p>暂无存档</p>';
        }

        const buttons = [
            { text: '保存游戏', action: 'KBA.systems.storage.save(); KBA.utils.showMessage("游戏已保存", "success"); KBA.utils.hideModal();' },
            { text: '加载游戏', action: 'KBA.systems.storage.load(); KBA.utils.hideModal();' },
            { text: '导出存档', action: 'KBA.systems.storage.exportSave();' },
            { text: '导入存档', action: 'document.getElementById("import-file").click();' },
            { text: '删除存档', action: 'if(confirm("确定要删除存档吗？")) { KBA.systems.storage.deleteSave(); KBA.utils.showMessage("存档已删除", "warning"); KBA.utils.hideModal(); }' },
            { text: '关闭', action: 'KBA.utils.hideModal();' }
        ];

        KBA.utils.showModal('存档管理', content, buttons);

        // 添加隐藏的文件输入
        if (!document.getElementById('import-file')) {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.id = 'import-file';
            fileInput.accept = '.json';
            fileInput.style.display = 'none';
            fileInput.onchange = function(e) {
                if (e.target.files.length > 0) {
                    storage.importSave(e.target.files[0]);
                }
            };
            document.body.appendChild(fileInput);
        }
    }
};

// 初始化存储系统
function initStorageSystem() {
    storage.startAutoSave();
}

// 注册到命名空间
if (typeof KBA !== 'undefined') KBA.registerSystem('storage', storage);
