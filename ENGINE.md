# ENGINE.md

> 引擎层开发文档

---

## 数据流原则

```
Data (data/)
  ↓ 读取
Logic (js/)
  ↓ 执行
Effect (engine/effect.js)
  ↓ 应用
Event (engine/eventbus.js)
  ↓ 通知
UI (index.html + CSS)
```

### 核心约束

| 规则 | 说明 |
|------|------|
| UI 不修改数据 | UI 只负责显示和接收用户输入，不直接修改 game state |
| Data 不调用 Logic | 数据层是纯声明式的，不包含任何函数调用 |
| Logic 不操作 DOM | 逻辑层通过 UI 更新函数间接操作 DOM，不直接 getElementById |
| Engine 不依赖具体游戏 | 引擎层不知道"蜘蛛女王"或"幽暗森林"，只提供通用能力 |

### 违反示例

```
✗ data/buffs.js 中写 onTick: function() { ... }     → Data 调用了 Logic
✗ js/battle.js 中写 document.getElementById('...')   → Logic 操作了 DOM
✗ engine/buff.js 中写 if (monsterId === 'spider')    → Engine 依赖了具体游戏
✗ index.html 中写 player.health = 100                → UI 修改了数据
```

### 正确示例

```
✓ data/buffs.js: tickEffect: { type: 'damagePercent', percent: 3 }  → 纯数据
✓ js/battle.js: EffectSystem.execute({ type: 'damage', value: 10 }) → 通过 Effect
✓ engine/buff.js: _applyTickEffect(target, buffDef, stacks)         → 通用逻辑
✓ index.html: onclick="game.performAction('chop')"                  → 委托给 Logic
```

---

## 目录规范

### 层级依赖关系

```
engine/ ←── js/ ←── index.html
   ↑
 data/
```

- **engine/** 不依赖 js/ 或 data/（只通过全局变量间接访问）
- **data/** 不依赖任何层（纯数据声明）
- **js/** 可以读取 data/ 和 engine/
- **index.html** 只调用 js/ 中的函数

### 具体约束

| 目录 | 可以做 | 不可以做 |
|------|--------|----------|
| engine/ | 提供通用能力、定义 API | 引用具体游戏数据、写 if (monsterId === 'xxx') |
| data/ | 声明数据结构、定义配置 | 写 function、调用任何函数、import 任何模块 |
| js/ | 读取数据、执行逻辑、调用引擎 | 直接操作 DOM（通过 UI 函数间接操作） |
| index.html | 加载脚本、绑定事件、显示 UI | 内联游戏逻辑（只调用顶层函数） |
| css/ | 定义样式 | 包含任何 JavaScript |

### 通信规范

| 场景 | 推荐方式 | 避免方式 |
|------|----------|----------|
| 系统间通信 | EventBus.emit / EventBus.on | 直接调用其他系统的函数 |
| 数据读取 | 直接访问 data/ 中的变量 | 在 data/ 中写 getter 函数 |
| 状态修改 | 通过 EffectSystem 或直接修改 player 对象 | 在 UI 层直接修改 |
| UI 更新 | 调用 updateUI() 函数 | 在逻辑层直接 getElementById |
| 错误上报 | GameLogger.error() | console.error（生产环境） |

### 新增文件检查清单

添加新文件时，确认：

- [ ] 文件放在正确的目录（engine/data/js）
- [ ] 不违反层级依赖关系
- [ ] data/ 文件中没有 function
- [ ] engine/ 文件中没有游戏专有内容
- [ ] 系统间通信通过 EventBus
- [ ] 新增变量注册到 KBA 命名空间

---

## 架构概览

```
engine/
├── effect.js       统一效果处理器
├── action.js       统一行动执行器
├── buff.js         Buff/Debuff系统
├── trigger.js      战斗触发器
├── ai.js           怪物AI系统
├── state.js        游戏状态机
├── eventbus.js     事件总线
├── worldstate.js   世界状态系统
├── logger.js       日志+Replay系统
├── schema.js       数据Schema校验
├── condition.js    统一条件系统
├── expression.js   表达式系统
├── plugin.js       插件系统
├── validator.js    数据校验器
├── debug.js        调试面板
└── qol.js          QoL改进
```

---

## 核心系统详解

### Effect System (effect.js)

统一效果处理器，所有游戏内的属性变化都通过此系统执行。

**效果类型:**

| 类型 | 说明 | 参数 |
|------|------|------|
| stat | 属性修改 | target, stat, value, mode(add/set/multiply) |
| heal | 回复(带上限) | stat, value, max |
| damage | 伤害 | value, ignoreDefense |
| item | 物品操作 | item, count, action(add/remove) |
| status | 状态效果 | target, statusType, duration, data |
| message | 消息 | text, msgType |
| sound | 音效 | sound |
| xp | 经验值 | value |
| soul | 魂 | value |
| achievement | 成就统计 | stat, value |
| quest | 任务进度 | questType, target, amount |
| random | 随机效果 | effects[], weights[] |
| conditional | 条件效果 | condition, thenEffects[], elseEffects[] |

**使用方式:**
```javascript
// 单个效果
EffectSystem.execute({ type: 'heal', stat: 'health', value: 20, max: 100 });

// 效果列表
EffectSystem.executeAll([
    { type: 'damage', value: 10 },
    { type: 'message', text: '受伤！', msgType: 'error' }
]);
```

---

### Action System (action.js)

统一行动执行器，所有玩家行动（采集、制作、休息等）通过此系统执行。

**行动定义:**
```javascript
ActionSystem.register('chop', {
    name: '砍树',
    icon: '🪓',
    description: '采集木材',
    timeCost: 2,
    costs: [{ type: 'stamina', value: 3 }],
    effects: [{ type: 'item', item: 'wood', count: 1 }],
    sound: 'pick',
    requirements: [{ type: 'notInBattle' }]
});
```

**前置条件类型:**
| 类型 | 说明 |
|------|------|
| stamina | 检查体力 |
| item | 检查物品 |
| building | 检查建筑 |
| map | 检查当前地图 |
| level | 检查等级 |
| notInBattle | 检查不在战斗中 |

---

### Buff System (buff.js)

纯数据驱动的状态效果系统。

**Buff 定义 (data/buffs.js):**
```javascript
poison: {
    name: '中毒',
    icon: '☠️',
    type: 'debuff',
    maxStacks: 3,
    skipTurn: false,
    tickEffect: { type: 'damagePercent', stat: 'health', base: 'maxHp', percent: 3 }
}
```

**tickEffect 类型:**
| 类型 | 说明 | 参数 |
|------|------|------|
| damagePercent | 百分比伤害 | stat, base(maxHp/currentHp), percent |
| damageFlat | 固定伤害 | stat, base |
| healPercent | 百分比回复 | stat, base, percent |
| healFlat | 固定回复 | stat, base |
| statFlat | 属性修改 | stat, base |

**API:**
```javascript
BuffSystem.add('player', 'poison', 3, 1)     // 添加Buff
BuffSystem.remove('player', 'poison')         // 移除Buff
BuffSystem.has('player', 'poison')            // 检查是否有
BuffSystem.getStacks('player', 'poison')      // 获取层数
BuffSystem.process('player', context)          // 每回合结算
BuffSystem.getIcons('player')                  // 获取图标字符串
BuffSystem.getStatModifiers('player', 'attack') // 获取属性加成
BuffSystem.shouldSkipTurn('player')            // 是否跳过回合
BuffSystem.clearAll('player')                  // 清除所有
```

---

### Trigger System (trigger.js)

战斗触发器系统，支持 18 种事件。

**触发事件:**
| 事件 | 说明 |
|------|------|
| battle:start | 战斗开始 |
| battle:end | 战斗结束 |
| turn:start | 回合开始 |
| turn:end | 回合结束 |
| before:attack | 攻击前 |
| after:attack | 攻击后 |
| before:damage | 受伤前 |
| after:damage | 受伤后 |
| before:heal | 回复前 |
| after:heal | 回复后 |
| hp:below30 | 生命低于30% |
| hp:below50 | 生命低于50% |
| on:kill | 击杀时 |
| on:death | 死亡时 |
| on:crit | 暴击时 |
| on:dodge | 闪避时 |
| on:buff:apply | 获得Buff时 |
| on:buff:remove | 移除Buff时 |
| on:skill:use | 使用技能时 |
| on:item:use | 使用物品时 |

**使用方式:**
```javascript
TriggerSystem.register({
    id: 'lowHpRage',
    event: 'hp:below30',
    condition: function(ctx) { return ctx.target === 'player'; },
    effect: function(ctx) { BuffSystem.add('player', 'attackUp', 3, 1); },
    source: 'skill',
    priority: 100,
    once: false
});

TriggerSystem.fire('hp:below30', { target: 'player' });
```

---

### AI System (ai.js)

怪物AI配置化，5种通用类型。

| 类型 | 说明 | 行为 |
|------|------|------|
| normal | 普通型 | 每回合普通攻击 |
| berserker | 狂暴型 | 低血量时攻击翻倍 |
| mage | 法师型 | 释放火球/冰冻/治疗 |
| summoner | 召唤型 | 召唤小弟 |
| boss | Boss型 | 多阶段，低血量狂暴 |

**怪物配置:**
```javascript
{ name: '火焰龙', health: 500, attack: 40, ai: 'boss' }
```

---

### State Machine (state.js)

游戏状态管理，避免大量布尔变量。

| 状态 | 说明 | 允许转换 |
|------|------|----------|
| main | 主界面 | battle, dialogue, building, crafting, inventory, map |
| battle | 战斗 | main |
| dialogue | 对话 | main, trading |
| trading | 交易 | dialogue, main |
| building | 建造 | main |
| crafting | 制作 | main |
| inventory | 背包 | main |
| map | 地图 | main |

**使用方式:**
```javascript
GameStateMachine.transition('battle', { monster: monster });
GameStateMachine.is('battle');  // true/false
GameStateMachine.back();        // 返回上一个状态
```

---

### EventBus (eventbus.js)

事件总线，支持优先级。

**优先级:**
| 级别 | 值 | 说明 |
|------|------|------|
| HIGH | 0 | 最先执行（死亡、任务完成） |
| NORMAL | 100 | 默认优先级 |
| LOW | 200 | 最后执行（日志、UI更新） |

**预定义事件:**
| 事件 | 说明 |
|------|------|
| game:init | 游戏初始化 |
| game:save | 游戏保存 |
| game:load | 游戏加载 |
| player:levelUp | 玩家升级 |
| player:died | 玩家死亡 |
| battle:start | 战斗开始 |
| battle:end | 战斗结束 |
| battle:victory | 战斗胜利 |
| battle:defeat | 战斗失败 |
| item:acquired | 获得物品 |
| item:used | 使用物品 |
| item:crafted | 制作物品 |
| map:entered | 进入地图 |
| map:resourceCollected | 采集资源 |
| npc:talked | NPC对话 |
| npc:traded | NPC交易 |
| time:advanced | 时间推进 |
| time:dayChanged | 日期变化 |
| time:seasonChanged | 季节变化 |
| quest:started | 任务开始 |
| quest:completed | 任务完成 |
| achievement:unlocked | 成就解锁 |
| weather:changed | 天气变化 |

**使用方式:**
```javascript
// 监听（普通优先级）
EventBus.on('battle:victory', function(data) {
    console.log('击败了 ' + data.monster.name);
});

// 监听（高优先级，先执行）
EventBus.onHigh('player:died', function(data) {
    // 处理死亡逻辑
});

// 监听（低优先级，后执行）
EventBus.onLow('item:crafted', function(data) {
    // 记录日志
});

// 触发事件
EventBus.emit('battle:victory', { monster: monster });

// 一次性监听
EventBus.once('quest:completed', function(data) {
    console.log('任务完成');
});

// 取消监听
EventBus.off('battle:victory', handler);
```

---

### WorldState (worldstate.js)

世界状态系统，记录玩家行为对世界的影响。

**状态数据:**
```javascript
{
    npcRelations: { npcId: number },      // NPC关系值 (-100~100)
    bossKills: { bossId: number },        // Boss击杀次数
    mapChanges: { mapId: { type: value } }, // 地图变化
    factionRep: { cannibal: number, mage: number }, // 阵营声望
    townLevel: number,                     // 城镇发展等级
    triggeredEvents: { eventId: true }     // 事件触发记录
}
```

**历史记录:**
```javascript
WorldState.history = [
    { time: 1234567890, gameTime: { day: 1, hour: 6 }, type: 'bossKill', detail: { bossId: 'spiderQueen' } },
    { time: 1234567891, gameTime: { day: 1, hour: 7 }, type: 'npcRelation', detail: { npcId: 'farmer', delta: 5 } }
]
```

**API:**
```javascript
WorldState.changeNPCRelation('farmer', 5)    // 改变NPC关系
WorldState.getNPCRelation('farmer')           // 获取NPC关系
WorldState.recordBossKill('spiderQueen')      // 记录Boss击杀
WorldState.isBossKilled('spiderQueen')        // 检查Boss是否被击杀
WorldState.recordMapVisit('darkForest')       // 记录地图访问
WorldState.getMapVisitCount('darkForest')     // 获取访问次数
WorldState.recordNPCDialogue('farmer')        // 记录NPC对话
WorldState.getNPCDialogueCount('farmer')      // 获取对话次数
WorldState.changeFactionRep('cannibal', 10)   // 改变阵营声望
WorldState.getFactionRep('cannibal')          // 获取阵营声望
WorldState.setMapChange('darkForest', 'explored', true) // 设置地图变化
WorldState.getMapChange('darkForest', 'explored')       // 获取地图变化
WorldState.upgradeTown()                      // 升级城镇
WorldState.getHistory('bossKill', 10)         // 查询历史
WorldState.serialize()                        // 序列化
WorldState.deserialize(data)                  // 反序列化
```

---

### Logger (logger.js)

日志系统，支持 Replay 回放。

**日志类别:**
| 类别 | 说明 |
|------|------|
| battle | 战斗日志 |
| effect | 效果执行 |
| quest | 任务进度 |
| event | 事件触发 |
| craft
