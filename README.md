# 超苦逼冒险者 · 架构版

> 数据驱动的 HTML5 生存冒险游戏，引擎层与数据层完全分离。

![Version](https://img.shields.io/badge/Version-7.0-purple)
![Architecture](https://img.shields.io/badge/Architecture-Data--Driven-green)

---

## 快速开始

浏览器直接打开 `index.html`，或 `npx serve .` 启动本地服务器。

调试面板：`Ctrl+D`

---

## 架构设计

```
┌─────────────────────────────────────────────────┐
│  UI层 (index.html)                              │
├─────────────────────────────────────────────────┤
│  引擎层 (engine/) - 14个文件, 1863行             │
│  通用能力，不包含任何游戏专有内容                 │
├─────────────────────────────────────────────────┤
│  数据层 (data/) - 11个文件, 3041行               │
│  所有游戏数据：物品/怪物/地图/配方/NPC/技能/事件  │
├─────────────────────────────────────────────────┤
│  逻辑层 (js/) - 18个文件                         │
│  只读取数据，执行游戏逻辑，不定义数据             │
└─────────────────────────────────────────────────┘
```

### 设计原则

| 原则 | 说明 |
|------|------|
| 数据驱动 | 所有游戏内容在 data/ 中配置，新增内容只改数据 |
| 引擎通用 | engine/ 不含游戏专有内容，可长期复用 |
| 逻辑纯净 | js/ 只读取数据并执行逻辑，不定义数据 |
| 系统解耦 | 通过 EventBus 通信，减少直接调用 |

---

## 引擎层 (engine/)

| 文件 | 功能 |
|------|------|
| effect.js | 统一效果处理器（13种效果类型） |
| action.js | 统一行动执行器 |
| buff.js | Buff/Debuff系统 |
| trigger.js | 战斗触发器（18种事件） |
| ai.js | 怪物AI配置化（5种类型） |
| state.js | 游戏状态机（8种状态） |
| eventbus.js | 事件总线 |
| worldstate.js | 世界状态系统 |
| logger.js | 完整日志系统 |
| validator.js | 自动数据校验 |
| simulator.js | 平衡模拟器 |
| dataloader.js | 数据加载器 |
| debug.js | 增强调试面板 |
| qol.js | QoL改进引擎 |

---

## 数据层 (data/)

| 文件 | 内容 |
|------|------|
| items.js | 物品+建筑数据 (218物品, 22建筑) |
| monsters.js | 怪物数据 (48种) |
| maps.js | 地图数据 (17张) |
| npcs.js | NPC数据 (18个) |
| recipes.js | 烹饪+制作配方 (158种) |
| skills.js | 技能数据 (8个) |
| events.js | 随机事件 (12个) |
| buffs.js | 状态效果 (11种) |
| dynamic_events.js | 动态事件 (极端天气/游荡商人/黑市) |
| lore.js | 物品描述+NPC对话 |
| scenes.js | 动态场景+图鉴系统 |

---

## 核心系统

### 战斗系统
- 8个主动技能 + 6种状态效果
- 48种怪物 + 5种AI类型
- 装备特效 + 暴击/闪避

### 制作系统
- 74种烹饪 + 84种制作配方
- 22种建筑
- 批量制作

### 体温系统
- 天气/昼夜/装备/建筑影响
- 影响命中率/制作成功率/体力恢复

### 动态事件
- 极端天气：猩红之月/极寒风暴/酸雨
- 游荡商人 + 黑市商人
- 日记/遗书/石板收集品

### 世界状态
- NPC关系系统
- Boss击杀记录
- 阵营声望
- 城镇发展

---

## 开发指南

### 添加新物品
```javascript
// data/items.js
newItem: { name: '物品名', type: 'resource', icon: 'X', stackable: true, maxStack: 99 }
```

### 添加新配方
```javascript
// data/recipes.js
newRecipe: { result: 'newItem', name: '配方名', ingredients: { wood: 3 } }
```

### 添加新怪物
```javascript
// data/monsters.js
newMonster: { name: '怪物名', health: 100, attack: 20, defense: 10, ai: 'normal' }
```

### 添加新Buff
```javascript
// data/buffs.js
newBuff: { name: 'Buff名', icon: 'X', type: 'debuff', maxStacks: 3, onTick: function() {} }
```

---

## 项目结构

```
xbvg-mimo/
├── index.html
├── manifest.json / sw.js
├── engine/        # 14个引擎文件
├── data/          # 11个数据文件
├── js/            # 18个逻辑文件
└── css/           # 4个样式文件
```

---

## 版本历史

| 版本 | 主要变更 |
|------|----------|
| v7.0 | 数据层/引擎层/逻辑层完全分离，世界状态系统，日志系统 |
| v6.0 | 技能系统，科技研究，体温管理，动态事件 |
| v5.1 | XSS防护，存档重构，PWA支持 |
| v5.0 | 初始版本 |

---

MIT License
