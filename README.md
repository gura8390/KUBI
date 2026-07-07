# 超苦逼冒险者 · 架构版

> 数据驱动的 HTML5 生存冒险游戏，支持模块化扩展。

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
│  引擎层 (engine/) - 12个文件                     │
│  effect/action/buff/trigger/ai/state/eventbus   │
│  validator/simulator/dataloader/debug/qol       │
├─────────────────────────────────────────────────┤
│  数据层 (data/) - 6个文件                        │
│  skills/events/buffs/dynamic_events/lore/scenes │
├─────────────────────────────────────────────────┤
│  逻辑层 (js/) - 18个文件                         │
│  battle/craft/map/npc/player/time/...           │
└─────────────────────────────────────────────────┘
```

### 设计原则

| 原则 | 说明 |
|------|------|
| 数据驱动 | 游戏内容配置化，新增内容只改数据 |
| 系统解耦 | 通过 EventBus 通信 |
| 可扩展 | 引擎层通用，逻辑层专注玩法 |

---

## 引擎层 (engine/)

| 文件 | 功能 |
|------|------|
| effect.js | 统一效果处理器（13种效果类型） |
| action.js | 统一行动执行器 |
| buff.js | Buff/Debuff系统（统一数据结构+每回合结算） |
| trigger.js | 战斗触发器（18种事件） |
| ai.js | 怪物AI配置化（5种通用AI类型） |
| state.js | 游戏状态机（8种状态） |
| eventbus.js | 事件总线 |
| validator.js | 自动数据校验 |
| simulator.js | 平衡模拟器 |
| dataloader.js | 数据加载器 |
| debug.js | 开发者调试面板 |
| qol.js | QoL改进（排序/堆叠/批量/日志过滤） |

---

## 数据层 (data/)

| 文件 | 内容 |
|------|------|
| skills.js | 8个技能配置 |
| events.js | 12个随机事件 |
| buffs.js | 11种状态效果 |
| dynamic_events.js | 极端天气/游荡商人/黑市/收集品 |
| lore.js | 物品描述+NPC个性化对话 |
| scenes.js | 动态场景描述+图鉴系统 |

---

## 核心系统

### 战斗系统
- 8个主动技能 + 6种状态效果
- 20种怪物特殊能力 + 5种AI类型
- 装备特效（冰冻/反击）

### 制作系统
- 74种烹饪 + 84种制作配方
- 22种建筑
- 批量制作支持

### 体温系统
- 天气/昼夜/装备/建筑影响体温
- 体温影响命中率/制作成功率/体力恢复

### 动态事件
- 极端天气：猩红之月/极寒风暴/酸雨
- 游荡商人（夜间出现）
- 黑市商人（深夜出现）

### 碎片化叙事
- 日记/遗书/石板收集品
- 怪物/物品图鉴（击杀/制作解锁背景描述）

### QoL改进
- 背包自动排序
- 物品堆叠
- 日志过滤（战斗/获得/系统）

---

## 游戏内容

- **17张地图** — 从幽暗森林到天空岛屿
- **48种怪物** — 10层地牢Boss
- **18个NPC** — 交易/阵营/任务
- **218种物品** — 武器/防具/资源/食物
- **8项科技研究** — 解锁高级内容

---

## 开发指南

### 添加新物品
```javascript
// js/item.js ITEMS对象
newItem: { name: '物品名', type: 'resource', icon: 'X', stackable: true, maxStack: 99 }
```

### 添加新配方
```javascript
// js/craft.js CRAFTING_RECIPES对象
newRecipe: { result: 'newItem', name: '配方名', ingredients: { wood: 3 } }
```

### 添加新怪物
```javascript
// js/map-data.js MONSTERS对象
newMonster: { name: '怪物名', health: 100, attack: 20, defense: 10, ai: 'normal', abilities: 'burn' }
```

### 添加新Buff
```javascript
// data/buffs.js BUFF_DEFS对象
newBuff: { name: 'Buff名', icon: 'X', type: 'debuff', maxStacks: 3, onTick: function() {} }
```

### 数据校验
```javascript
DataValidator.printReport();
```

### 平衡模拟
```javascript
BalanceSimulator.runFullSimulation(1000);
```

---

## 项目结构

```
xbvg-mimo/
├── index.html
├── manifest.json / sw.js
├── engine/        # 12个引擎文件
├── data/          # 6个数据文件
├── js/            # 18个逻辑文件
└── css/           # 4个样式文件
```

---

## 版本历史

| 版本 | 主要变更 |
|------|----------|
| v7.0 | 引擎/数据/逻辑三层分离，Buff/Trigger/AI系统 |
| v6.0 | 技能系统，科技研究，体温管理，动态事件 |
| v5.1 | XSS防护，存档重构，PWA支持 |
| v5.0 | 初始版本 |

---

MIT License
