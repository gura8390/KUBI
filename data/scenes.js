// Dynamic Scene Descriptions
// Map descriptions change based on weather and time

var SceneDescriptions = {
    darkForest: {
        default: '幽暗的森林，周围树木茂密，阳光透过树叶洒下斑驳的光影。',
        clear_day: '阳光透过稀疏的枝叶洒下斑驳光影，空气中弥漫着松木清香。',
        clear_night: '月光穿过树梢，在地面上投下银色的光斑。远处偶尔传来夜鸟的啼鸣。',
        rain_day: '雨水顺着树叶滴落，形成细密的水帘。空气中弥漫着泥土的芬芳。',
        rain_night: '雨声掩盖了一切声响，黑暗中只有水滴落下的声音。你感到一丝不安。',
        snow_day: '雪花轻轻飘落，将森林装点成银白色的世界。一切都很安静。',
        snow_night: '寒风呼啸，雪花在黑暗中飞舞。远处传来狼嚎，让人脊背发凉。',
        storm_day: '狂风裹挟着冰粒抽打树干，每一声狼嚎都让你脊背发凉。',
        storm_night: '暴风雪肆虐，你几乎看不见前方。寒冷侵蚀着你的身体。',
        heatwave_day: '烈日当空，连空气都在扭曲。树叶耷拉着，毫无生气。',
        heatwave_night: '夜晚的热浪依然逼人，蝉鸣声此起彼伏。难以入眠。'
    },
    town: {
        default: '一个安静的小镇，几间简陋的房屋散布其间。',
        clear_day: '阳光洒在石板路上，居民们在街上闲聊。空气中飘来面包的香气。',
        clear_night: '镇上点起了灯火，透过窗户能看到温暖的光。一切都显得宁静。',
        rain_day: '雨水顺着屋檐流下，形成一道道水帘。街上空无一人。',
        rain_night: '雨夜的小镇格外安静，只有雨滴敲打屋顶的声音。',
        snow_day: '雪花覆盖了整个小镇，烟囱里冒出袅袅炊烟。',
        snow_night: '镇上的灯火在雪夜中显得格外温暖。'
    },
    volcano: {
        default: '炽热的火山地区，岩浆流淌，空气灼热。',
        clear_day: '烈日照耀下的火山更加炎热，空气中弥漫着硫磺的味道。',
        clear_night: '岩浆的红光照亮了夜空，映出诡异的色彩。',
        rain_day: '雨水遇到滚烫的岩石，化作蒸汽升腾。一切都笼罩在白雾中。',
        heatwave_day: '极端高温让火山地区更加危险，岩浆流动得更快了。'
    },
    oceanTemple: {
        default: '沉没在海底的古代神殿，神秘而庄严。',
        clear_day: '阳光透过海水照进神殿，折射出梦幻般的光影。',
        clear_night: '月光无法穿透海水，神殿陷入深沉的黑暗。只有荧光生物在闪烁。',
        storm_day: '海面上的风暴让海底也变得汹涌，神殿的废墟在水流中摇晃。'
    },
    skyIsland: {
        default: '漂浮在云端的神秘岛屿，传说中的终极之地。',
        clear_day: '阳光穿透云层，将岛屿照得金碧辉煌。脚下是无尽的云海。',
        clear_night: '星空近在咫尺，仿佛伸手就能触碰。银河在头顶流淌。',
        storm_day: '雷暴在岛屿周围肆虐，闪电劈开云层。这里离天空太近了。',
        starry: '满天繁星环绕着岛屿，每一颗都在诉说着古老的故事。'
    }
};

// 图鉴系统
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

if (typeof KBA !== 'undefined') {
    KBA.data.sceneDescriptions = SceneDescriptions;
    KBA.systems.encyclopedia = EncyclopediaSystem;
}
