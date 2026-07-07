# 超苦逼冒险者 · 架构版

> 数据驱动的 HTML5 生存冒险游戏，数据层零 function，引擎层完全通用。

![Version](https://img.shields.io/badge/Version-7.2-purple)
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
│                                                                     │
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
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│  引擎层 (engine/) - 16个文件 - 通用能力，零游戏专有内容              │
├─────────────────────────────────────────────────────────────────────┤
│  数据层 (data/) - 9个文件 - 纯数据，零 function                     │
├─────────────────────────────────────────────────────────────────────┤
│  逻辑层 (js/) - 19个文件 - 只读取数据，执行游戏逻辑                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 游戏生命周期

```
玩家输入
    │
    ▼
┌─────────────┐
│   Action    │ ← 统一行动执行器
└──────┬──────┘
       │ 检查前置条件
       ▼
┌─────────────┐
│  Condition  │ ← 统一条件系统 + Expression
└──────┬──────┘
       │ 执行效果
       ▼
┌─────────────┐
│   Effect    │ ← 统一效果处理器 (13种)
└──────┬──────┘
       │ 应用 Buff/Debuff
       ▼
┌─────────────┐
│    Buff     │ ← 纯数据驱动，自动解释 tickEffect
└──────┬──────┘
       │ 触发器检查
       ▼
┌─────────────┐
│   Trigger   │ ← 18种触发事件
└──────┬──────┘
       │ 发送事件 (HIGH → NORMAL → LOW)
       ▼
┌─────────────┐
│  EventBus   │
└──────┬──────┘
       │ 分发给订阅者
       ├──────────┬──────────┬──────────┐
       ▼          ▼          ▼          ▼
  WorldState    Logger    Quest    Achievement
  (历史记录)    (Replay)
       │
       ▼
   UI 更新
```

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

## 数据层 (data/) - 零 function

| 文件 | 内容 |
|------|------|
| items.js | 物品+建筑数据 |
| monsters.js | 怪物数据 |
| maps.js | 地图数据 (倍率用数值，非函数) |
| npcs.js | NPC数据 |
| recipes.js | 烹饪+制作配方 |
| skills.js | 技能数据 |
| events.js | 随机事件 |
| buffs.js | 状态效果 (tickEffect纯数据) |
| scenes.js | 动态场景描述 |

---

## 核心系统

### 战斗系统
- 8个主动技能 + 6种状态效果
- 48种怪物 + 5种AI类型
- BuffSystem 纯数据驱动

### 制作系统
- 74种烹饪 + 84种制作配方
- 22种建筑

### 体温系统
- 天气/昼夜/装备/建筑影响
- 影响命中率/制作成功率/体力恢复

### 世界状态
- NPC关系 + 历史记录
- Boss击杀 + 阵营声望

---

## 开发指南

### 添加新物品
```javascript
// data/items.js - 纯数据
newItem: { name: '物品名', type: 'resource', icon: 'X', stackable: true, maxStack: 99 }
```

### 添加新Buff
```javascript
// data/buffs.js - 纯数据，零function
newBuff: {
    name: 'Buff名', icon: 'X', type: 'debuff', maxStacks: 3,
    skipTurn: false,
    tickEffect: { type: 'damagePercent', stat: 'health', base: 'maxHp', percent: 3 }
}
```

### 添加新怪物
```javascript
// data/monsters.js - 纯数据
newMonster: { name: '怪物名', health: 100, attack: 20, defense: 10, ai: 'normal' }
```

### MOD 插件示例
```javascript
PluginSystem.register({
    id: 'my-mod',
    name: 'My Mod',
    version: '1.0.0',
    data: {
        items: { myItem: { name: '自定义物品', type: 'resource' } },
        monsters: { myMonster: { name: '自定义怪物', health: 200, attack: 30 } }
    },
    onGameStart: function() { console.log('Mod loaded!'); }
});
```

### 条件 + 表达式
```javascript
ConditionSystem.evaluate({ type: 'expression', target: 'hp < maxHp * 0.3' })
ExpressionSystem.eval('attack * 1.5', { attack: 20 })  // = 30
```

### 数据校验 (调试面板)
按 `~` 打开调试面板，点击 "Data Validate" 直接在 UI 上显示校验结果。

### 日志回放
```javascript
GameLogger.startRecording()
// ... 游戏操作 ...
GameLogger.stopRecording()
GameLogger.exportReplay()
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
| v7.2 | 数据层零function、Buff纯数据驱动、Debug集成DataSchema |
| v7.1 | EventBus优先级、Logger Replay、Condition+Expression融合 |
| v7.0 | Schema校验器、条件系统、表达式系统、插件系统 |
| v6.0 | 技能系统，科技研究，体温管理 |
| v5.1 | XSS防护，存档重构，PWA支持 |
| v5.0 | 初始版本 |

---

MIT License
