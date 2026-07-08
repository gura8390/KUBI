# 超苦逼冒险者 · 架构版

> 数据驱动的 HTML5 生存冒险游戏，数据层零 function，引擎层完全通用。

![Version](https://img.shields.io/badge/Version-8.0-purple)
![Architecture](https://img.shields.io/badge/Architecture-Pure--Data-green)

---

## 快速开始

浏览器直接打开 `index.html`，或 `npx serve .` 启动本地服务器。

调试面板：`~`（波浪号键）

---

## 系统关系图

```
┌─────────────────────────────────────────────────────────────────────┐
│                           UI层 (index.html)                         │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐             │
│  │   Action    │───→│  Condition  │───→│   Effect    │             │
│  │   System    │    │+Expression  │    │   System    │             │
│  └─────────────┘    └─────────────┘    └─────────────┘             │
│         │                  │                  │                     │
│         ▼                  ▼                  ▼                     │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐             │
│  │  Expression │    │   Trigger   │    │    Buff     │             │
│  │   System    │    │   System    │    │(纯数据驱动)  │             │
│  └─────────────┘    └─────────────┘    └─────────────┘             │
│         │                  │                  │                     │
│         └──────────────────┼──────────────────┘                     │
│                            ▼                                        │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                   EventBus (优先级: HIGH→NORMAL→LOW)          │   │
│  └─────────────────────────────────────────────────────────────┘   │
│         │              │              │              │              │
│         ▼              ▼              ▼              ▼              │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐       │
│  │  World   │   │  Logger  │   │  Quest   │   │ Achieve  │       │
│  │  State   │   │ (Replay) │   │  System  │   │  System  │       │
│  └──────────┘   └──────────┘   └──────────┘   └──────────┘       │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                   Plugin System (MOD 支持)                    │   │
│  │  onLoad → onGameStart → onTick → onBattleStart → onUnload  │   │
│  │  支持数据注入: items/monsters/maps/npcs/recipes/skills/buffs │   │
│  └─────────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────┤
│  引擎层 (engine/) - 16个文件 - 通用能力，零游戏专有内容              │
├─────────────────────────────────────────────────────────────────────┤
│  数据层 (data/) - 9个文件 - 纯数据，零 function                     │
├─────────────────────────────────────────────────────────────────────┤
│  逻辑层 (js/) - 19个文件 - 只读取数据，执行游戏逻辑                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 核心系统

### 战斗系统
- 8个主动技能 + 11种状态效果
- 48种怪物 + 5种AI类型 + Boss阶段转换
- BuffSystem 纯数据驱动
- Boss特殊技能（AOE/减益/治疗）
- 13个Boss有阶段转换机制

### 制作系统
- 74种烹饪 + 84种制作配方 + 4个阵营配方
- 22种建筑 + 城镇发展等级系统
- 阵营专属装备（食人族/法师）
- 阵营检查系统（canCraft检查阵营限制）

### 体温系统
- 天气/昼夜/装备/建筑影响
- 影响命中率/制作成功率/体力恢复
- 季节性资源加成

### 世界状态系统
- NPC关系 + 好感度折扣 + 阵营声望等级
- Boss击杀后地图变化（6种效果）
- 地图探索度（访问次数影响资源获取率）
- 城镇发展等级影响商人商品
- NPC记忆系统（记录对话/交易次数）

### 图鉴系统
- 怪物图鉴（击杀数/掉落物/弱点/背景故事）
- 物品图鉴（制作次数/用途/来源）

### 事件系统
- 21个随机事件（季节/天气/行为触发）
- 季节性事件（春日祭典/夏日收获/秋日感恩/冬日新年）
- 天气联动事件（暴风雨沉船/雷击火灾/彩虹祝福）
- 玩家行为触发事件（战斗疲劳/制作灵感）

---

## 引擎层 (engine/)

| 文件 | 功能 |
|------|------|
| effect.js | 统一效果处理器 (13种效果) |
| action.js | 统一行动执行器 |
| buff.js | Buff/Debuff (纯数据驱动) |
| trigger.js | 战斗触发器 (18种事件) |
| ai.js | 怪物AI (5种类型) |
| state.js | 游戏状态机 (8种状态) |
| eventbus.js | 事件总线 (优先级) |
| worldstate.js | 世界状态 + 历史记录 |
| logger.js | 日志 + Replay 回放 |
| schema.js | 数据Schema校验 |
| condition.js | 统一条件系统 |
| expression.js | 表达式系统 |
| plugin.js | 插件系统 (MOD支持) |
| validator.js | 数据校验 |
| debug.js | 调试面板 (~键) |
| qol.js | QoL改进 |

---

## 数据层 (data/)

| 文件 | 内容 |
|------|------|
| items.js | 物品(218种) + 建筑(22种) |
| monsters.js | 怪物(48种) + Boss标记 + 背景故事 |
| maps.js | 地图(17张) |
| npcs.js | NPC(18个) + 等级交易 |
| recipes.js | 配方(158种) + 阵营配方 |
| skills.js | 技能(8个) |
| events.js | 事件(21个) |
| buffs.js | 状态效果(11种) |
| scenes.js | 动态场景描述 |

---

## 游戏内容

### 地图 (17张)
幽暗森林、小镇、溪流、死亡山谷、酸沼泽、蜘蛛洞穴、古老废墟、幽暗矿洞、贼窝、静谧森林、食人族部落、魔法公会、火山地带、海底神殿、天空岛屿、地牢(50层)

### 怪物 (48种)
- 普通怪物: 26种
- 元素系: 12种
- 地牢Boss: 10种 + 3个野外Boss

### NPC (18个)
- 小镇: 10个
- 其他地图: 8个
- 阵营军需官: 2个

### 物品 (218种)
- 武器: 23种 (含4个阵营专属)
- 防具: 17种 (含4个阵营专属)
- 饰品: 5种
- 资源: 56种
- 食物: 74种
- 药剂: 7种
- 消耗品: 6种
- 建筑: 22种

### 配方 (158种)
- 烹饪: 74种
- 制作: 84种 (含4个阵营配方)

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
newMonster: { name: '怪物名', health: 100, attack: 20, defense: 10, ai: 'normal', boss: true }
```

### 添加新Buff
```javascript
// data/buffs.js
newBuff: { name: 'Buff名', icon: 'X', type: 'debuff', maxStacks: 3, tickEffect: { type: 'damagePercent', stat: 'health', base: 'maxHp', percent: 3 } }
```

### 条件系统
```javascript
ConditionSystem.evaluate({ type: 'expression', target: 'hp < maxHp * 0.3' })
```

### 表达式系统
```javascript
ExpressionSystem.eval('attack * 1.5', { attack: 20 })  // = 30
```

---

## 项目结构

```
xbvg-mimo/
├── index.html
├── manifest.json / sw.js
├── engine/        # 16个引擎文件
├── data/          # 9个数据文件 (零function)
├── js/            # 19个逻辑文件
└── css/           # 4个样式文件
```

---

## 版本历史

| 版本 | 主要变更 |
|------|----------|
| v8.0 | 世界演化版：WorldState集成、Boss阶段转换、阵营系统、图鉴系统、NPC记忆、城镇发展 |
| v7.2 | 数据层零function、Buff纯数据驱动、Debug集成DataSchema |
| v7.1 | EventBus优先级、Logger Replay、Condition+Expression融合 |
| v7.0 | Schema校验器、条件系统、表达式系统、插件系统 |
| v6.0 | 技能系统，科技研究，体温管理 |
| v5.1 | XSS防护，存档重构，PWA支持 |
| v5.0 | 初始版本 |

---

MIT License
