# 超苦逼冒险者 · 架构版

> 数据驱动的 HTML5 生存冒险游戏，引擎层与数据层完全分离。

![Version](https://img.shields.io/badge/Version-7.0-purple)
![Architecture](https://img.shields.io/badge/Architecture-Data--Driven-green)

---

## 快速开始

浏览器直接打开 `index.html`，或 `npx serve .` 启动本地服务器。

调试面板：`~`（波浪号键）

---

## 架构设计

```
┌─────────────────────────────────────────────────┐
│  UI层 (index.html)                              │
├─────────────────────────────────────────────────┤
│  引擎层 (engine/) - 16个文件                     │
│  通用能力，不包含游戏专有内容                     │
├─────────────────────────────────────────────────┤
│  数据层 (data/) - 9个文件                        │
│  所有游戏数据：物品/怪物/地图/配方/NPC/技能/事件  │
├─────────────────────────────────────────────────┤
│  逻辑层 (js/) - 18个文件                         │
│  只读取数据，执行游戏逻辑，不定义数据             │
└─────────────────────────────────────────────────┘
```

### 设计原则

| 原则 | 说明 |
|------|------|
| 数据驱动 | 所有游戏内容在 data/ 中配置 |
| 引擎通用 | engine/ 不含游戏专有内容 |
| 逻辑纯净 | js/ 只读取数据并执行逻辑 |
| 系统解耦 | 通过 EventBus 通信 |

---

## 引擎层 (engine/)

| 文件 | 功能 | 集成状态 |
|------|------|----------|
| effect.js | 统一效果处理器 | ✅ 已集成 |
| action.js | 统一行动执行器 | ✅ 已集成 |
| buff.js | Buff/Debuff系统 | ✅ battle.js |
| trigger.js | 战斗触发器 | ✅ battle.js |
| ai.js | 怪物AI配置化 | ✅ 已集成 |
| state.js | 游戏状态机 | ✅ game.js |
| eventbus.js | 事件总线 | ✅ 5个系统 |
| worldstate.js | 世界状态系统 | ✅ game.js, battle.js |
| logger.js | 完整日志系统 | ✅ 5个系统 |
| schema.js | 数据Schema校验器 | ✅ 启动时校验 |
| condition.js | 统一条件系统 | ✅ 15种条件类型 |
| expression.js | 表达式系统 | ✅ 数学运算+变量 |
| plugin.js | 插件系统 | ✅ 注册/钩子/注入 |
| validator.js | 数据校验 | ✅ 已集成 |
| debug.js | 增强调试面板 | ✅ ~键打开 |
| qol.js | QoL改进引擎 | ✅ 已集成 |

---

## 数据层 (data/)

| 文件 | 内容 |
|------|------|
| items.js | 物品+建筑数据 |
| monsters.js | 怪物数据 |
| maps.js | 地图数据 |
| npcs.js | NPC数据 |
| recipes.js | 烹饪+制作配方 |
| skills.js | 技能数据 |
| events.js | 随机事件 |
| buffs.js | 状态效果 |
| scenes.js | 动态场景+图鉴 |

---

## 核心系统

### 战斗系统
- 8个主动技能 + 6种状态效果
- 48种怪物 + 5种AI类型
- BuffSystem 统一状态管理
- TriggerSystem 战斗事件触发

### 制作系统
- 74种烹饪 + 84种制作配方
- 22种建筑
- EventBus 事件通知

### 体温系统
- 天气/昼夜/装备/建筑影响
- 影响命中率/制作成功率/体力恢复

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

### 数据校验
```javascript
DataSchema.printReport();
```

### 条件系统
```javascript
// 统一条件判断
ConditionSystem.evaluate({ type: 'stat', target: 'health', op: '<', value: 30 })
ConditionSystem.and(ConditionSystem.season('winter'), ConditionSystem.level('>=', 5))
```

### 表达式系统
```javascript
// 数据中使用表达式
ExpressionSystem.eval('attack * 1.5', { attack: 20 })  // = 30
```

---

## 项目结构

```
xbvg-mimo/
├── index.html
├── manifest.json / sw.js
├── engine/        # 16个引擎文件
├── data/          # 9个数据文件
├── js/            # 18个逻辑文件
└── css/           # 4个样式文件
```

---

## 版本历史

| 版本 | 主要变更 |
|------|----------|
| v7.0 | Schema校验器、条件系统、表达式系统、插件系统 |
| v6.0 | 技能系统，科技研究，体温管理 |
| v5.1 | XSS防护，存档重构，PWA支持 |
| v5.0 | 初始版本 |

---

MIT License
