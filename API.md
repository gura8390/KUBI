# API.md

> 条件系统、表达式系统完整 API 参考

---

## Condition System (condition.js)

### 概述

统一条件系统，用于判断游戏中的各种条件。支持 15 种条件类型和逻辑组合。

### 基本用法

```javascript
// 简单条件
ConditionSystem.evaluate({ type: 'stat', target: 'health', op: '<', value: 30 })

// 组合条件
ConditionSystem.and(
    ConditionSystem.season('winter'),
    ConditionSystem.level('>=', 5)
)
```

---

### 条件类型

#### stat — 玩家属性

检查玩家的某个属性值。

```javascript
{ type: 'stat', target: '<属性名>', op: '<运算符>', value: <值> }
```

**可用属性:**
- health, hunger, stamina, thirst, sanity, temperature
- attack, defense, hitRate, magicDamage, soul
- level, xp

**运算符:** `>=`, `<=`, `>`, `<`, `==`, `!=`

**示例:**
```javascript
// 生命低于30
{ type: 'stat', target: 'health', op: '<', value: 30 }

// 等级大于等于10
{ type: 'stat', target: 'level', op: '>=', value: 10 }

// 攻击力等于50
{ type: 'stat', target: 'attack', op: '==', value: 50 }
```

---

#### item — 物品数量

检查背包中某个物品的数量。

```javascript
{ type: 'item', target: '<物品ID>', op: '<运算符>', value: <数量> }
```

**示例:**
```javascript
// 有至少10个木头
{ type: 'item', target: 'wood', op: '>=', value: 10 }

// 没有金币
{ type: 'item', target: 'gold', op: '==', value: 0 }
```

---

#### building — 建筑检查

检查是否已建造某个建筑。

```javascript
{ type: 'building', target: '<建筑ID>' }
```

**示例:**
```javascript
// 已建造床
{ type: 'building', target: 'bed' }

// 未建造火坑
ConditionSystem.not({ type: 'building', target: 'firePit' })
```

---

#### level — 等级检查

```javascript
{ type: 'level', op: '<运算符>', value: <等级> }
```

**示例:**
```javascript
{ type: 'level', op: '>=', value: 5 }
```

---

#### map — 当前地图

检查玩家当前是否在某个地图。

```javascript
{ type: 'map', target: '<地图ID>' }
```

**示例:**
```javascript
// 在幽暗森林
{ type: 'map', target: 'darkForest' }

// 不在地牢
ConditionSystem.not({ type: 'map', target: 'dungeon' })
```

---

#### weather — 天气检查

```javascript
{ type: 'weather', target: '<天气ID>' }
```

**可用天气:** clear, cloudy, rain, heavyRain, snow, blizzard, fog, wind, heatwave, rainbow, starry

**示例:**
```javascript
{ type: 'weather', target: 'rain' }
```

---

#### season — 季节检查

```javascript
{ type: 'season', target: '<季节ID>' }
```

**可用季节:** spring, summer, autumn, winter

**示例:**
```javascript
{ type: 'season', target: 'winter' }
```

---

#### faction — 阵营检查

```javascript
{ type: 'faction', target: '<阵营ID>' }
```

**可用阵营:** cannibal, mage

**示例:**
```javascript
{ type: 'faction', target: 'cannibal' }
```

---

#### npcRelation — NPC关系值

```javascript
{ type: 'npcRelation', target: '<NPC_ID>', op: '<运算符>', value: <值> }
```

**值范围:** -100 ~ 100

**示例:**
```javascript
// 与农夫关系 >= 50
{ type: 'npcRelation', target: 'farmer', op: '>=', value: 50 }
```

---

#### factionRep — 阵营声望

```javascript
{ type: 'factionRep', target: '<阵营ID>', op: '<运算符>', value: <值> }
```

**值范围:** -100 ~ 100

**示例:**
```javascript
{ type: 'factionRep', target: 'cannibal', op: '>=', value: 30 }
```

---

#### bossKilled — Boss击杀

检查某个Boss是否被击杀过。

```javascript
{ type: 'bossKilled', target: '<Boss_ID>' }
```

**示例:**
```javascript
{ type: 'bossKilled', target: 'spiderQueen' }
```

---

#### buff — Buff检查

检查玩家是否有某个Buff。

```javascript
{ type: 'buff', target: '<Buff_ID>' }
```

**示例:**
```javascript
{ type: 'buff', target: 'poison' }
```

---

#### questCompleted — 任务完成

检查某个任务是否已完成。

```javascript
{ type: 'questCompleted', target: '<任务ID>' }
```

**示例:**
```javascript
{ type: 'questCompleted', target: 'main_001' }
```

---

#### expression — 表达式

使用表达式系统计算条件。

```javascript
{ type: 'expression', target: '<表达式字符串>' }
```

**示例:**
```javascript
// 生命 < 最大生命 * 0.3
{ type: 'expression', target: 'hp < maxHp * 0.3' }

// 攻击力 > 等级 * 5
{ type: 'expression', target: 'atk > level * 5' }
```

---

#### constant — 常量

返回固定值，用于调试或特殊逻辑。

```javascript
{ type: 'constant', target: <值> }
```

---

### 运算符

| 运算符 | 说明 | 示例 |
|--------|------|------|
| >= | 大于等于 | value >= 10 |
| <= | 小于等于 | value <= 5 |
| > | 大于 | value > 0 |
| < | 小于 | value < 100 |
| == | 等于 | value == 1 |
| != | 不等于 | value != 0 |
| in | 在数组中 | value in [1,2,3] |
| not_in | 不在数组中 | value not_in [4,5,6] |

---

### 组合条件

#### and — 且

所有条件都必须满足。

```javascript
ConditionSystem.and(
    { type: 'stat', target: 'health', op: '>', value: 50 },
    { type: 'stat', target: 'stamina', op: '>', value: 30 }
)
```

#### or — 或

至少一个条件满足。

```javascript
ConditionSystem.or(
    { type: 'weather', target: 'rain' },
    { type: 'weather', target: 'heavyRain' }
)
```

#### not — 非

条件不满足。

```javascript
ConditionSystem.not({ type: 'buff', target: 'poison' })
```

---

### 辅助函数

```javascript
ConditionSystem.stat('health', '<', 30)           // 创建stat条件
ConditionSystem.item('wood', '>=', 10)            // 创建item条件
ConditionSystem.building('bed')                    // 创建building条件
ConditionSystem.level('>=', 5)                     // 创建level条件
ConditionSystem.map('darkForest')                  // 创建map条件
ConditionSystem.weather('rain')                    // 创建weather条件
ConditionSystem.season('winter')                   // 创建season条件
ConditionSystem.faction('cannibal')                // 创建faction条件
ConditionSystem.expr('hp < maxHp * 0.3')           // 创建expression条件
```

---

### 实际应用示例

**事件触发条件:**
```javascript
// 冬季且等级>=5时触发
{
    name: '暴风雪',
    condition: ConditionSystem.and(
        ConditionSystem.season('winter'),
        ConditionSystem.level('>=', 5)
    ),
    chance: 0.1
}
```

**NPC对话条件:**
```javascript
// 与农夫关系好且有10个小麦
{
    text: '谢谢你帮我种地！',
    condition: ConditionSystem.and(
        { type: 'npcRelation', target: 'farmer', op: '>=', value: 50 },
        { type: 'item', target: 'wheat', op: '>=', value: 10 }
    )
}
```

**Boss技能条件:**
```javascript
// 生命低于30%时狂暴
{
    name: '狂暴',
    condition: { type: 'expression', target: 'hp < maxHp * 0.3' },
    effect: { type: 'status', statusType: 'attackUp', duration: 999 }
}
```

---

## Expression System (expression.js)

### 概述

表达式系统，支持数学运算和变量引用。用于数据配置中的动态计算。

### 基本用法

```javascript
ExpressionSystem.eval('attack * 1.5', { attack: 20 })  // = 30
ExpressionSystem.eval('maxHp * 0.2')                    // = 20
```

---

### 运算符

| 运算符 | 说明 | 优先级 |
|--------|------|--------|
| ( ) | 括号 | 最高 |
| * | 乘法 | 高 |
| / | 除法 | 高 |
| % | 取模 | 高 |
| + | 加法 | 低 |
| - | 减法 | 低 |

---

### 内置变量

| 变量 | 说明 | 来源 |
|------|------|------|
| hp | 当前生命 | player.health |
| maxHp | 最大生命 | 100 |
| atk | 攻击力 | player.attack |
| def | 防御力 | player.defense |
| hit | 命中率 | player.hitRate |
| level | 等级 | player.level |
| soul | 魂 | player.soul |
| magic | 魔法伤害 | player.magicDamage |

---

### 使用示例

#### 基础运算

```javascript
ExpressionSystem.eval('10 + 5')           // = 15
ExpressionSystem.eval('10 - 5')           // = 5
ExpressionSystem.eval('10 * 5')           // = 50
ExpressionSystem.eval('10 / 5')           // = 2
ExpressionSystem.eval('10 % 3')           // = 1
```

#### 使用变量

```javascript
ExpressionSystem.eval('atk * 2', { atk: 15 })     // = 30
ExpressionSystem.eval('level * 10', { level: 5 })   // = 50
```

#### 复合表达式

```javascript
ExpressionSystem.eval('atk * 1.5 + level * 2', { atk: 20, level: 5 })  // = 40
ExpressionSystem.eval('(atk + def) * 0.5', { atk: 20, def: 10 })       // = 15
```

#### 内置变量

```javascript
// 假设 player.attack = 20
ExpressionSystem.eval('atk * 1.5')    // = 30
ExpressionSystem.eval('maxHp * 0.3')  // = 30
ExpressionSystem.eval('level * 10')   // = 50 (假设 level=5)
```

---

### 在数据中使用

#### Buff tickEffect

```javascript
// 每回合损失 maxHp * 0.03 的生命
poison: {
    tickEffect: { type: 'damagePercent', stat: 'health', base: 'maxHp', percent: 3 }
}
```

#### 事件条件

```javascript
// 生命 < maxHp * 0.3 时触发
{
    condition: { type: 'expression', target: 'hp < maxHp * 0.3' }
}
```

#### 技能效果

```javascript
// 伤害 = attack * 2
{
    effects: [{ type: 'damage', formula: 'atk * 2' }]
}
```

---

### 辅助函数

```javascript
ExpressionSystem.isExpression('atk * 1.5')  // true
ExpressionSystem.isExpression('42')          // false
ExpressionSystem.clearCache()                //


---

## 附录：完整参考列表

### 条件类型完整列表

| ID | 类型 | target 含义 | 可用运算符 | 值类型 | 示例 |
|----|------|------------|-----------|--------|------|
| 1 | stat | 玩家属性名 | >=, <=, >, <, ==, != | number | `{ type: 'stat', target: 'health', op: '<', value: 30 }` |
| 2 | item | 物品ID | >=, <=, >, <, ==, != | number | `{ type: 'item', target: 'wood', op: '>=', value: 10 }` |
| 3 | building | 建筑ID | (隐含 == 1) | - | `{ type: 'building', target: 'bed' }` |
| 4 | level | (忽略) | >=, <=, >, <, ==, != | number | `{ type: 'level', op: '>=', value: 5 }` |
| 5 | map | 地图ID | (隐含 == 1) | - | `{ type: 'map', target: 'darkForest' }` |
| 6 | weather | 天气ID | (隐含 == 1) | - | `{ type: 'weather', target: 'rain' }` |
| 7 | season | 季节ID | (隐含 == 1) | - | `{ type: 'season', target: 'winter' }` |
| 8 | faction | 阵营ID | (隐含 == 1) | - | `{ type: 'faction', target: 'cannibal' }` |
| 9 | npcRelation | NPC ID | >=, <=, >, <, ==, != | number | `{ type: 'npcRelation', target: 'farmer', op: '>=', value: 50 }` |
| 10 | factionRep | 阵营ID | >=, <=, >, <, ==, != | number | `{ type: 'factionRep', target: 'cannibal', op: '>=', value: 30 }` |
| 11 | bossKilled | Boss ID | (隐含 >= 1) | - | `{ type: 'bossKilled', target: 'spiderQueen' }` |
| 12 | buff | Buff ID | (隐含 == 1) | - | `{ type: 'buff', target: 'poison' }` |
| 13 | questCompleted | 任务ID | (隐含 == 1) | - | `{ type: 'questCompleted', target: 'main_001' }` |
| 14 | expression | 表达式字符串 | (返回值 > 0 为 true) | - | `{ type: 'expression', target: 'hp < maxHp * 0.3' }` |
| 15 | constant | 任意值 | >=, <=, >, <, ==, != | any | `{ type: 'constant', target: 42 }` |

### stat 类型可用属性

| 属性名 | 说明 | 范围 |
|--------|------|------|
| health | 当前生命 | 0-100 |
| hunger | 满腹值 | 0-100 |
| stamina | 体力 | 0-100 |
| thirst | 水分 | 0-100 |
| sanity | 精神值 | 0-100 |
| temperature | 体温 | 28-48 |
| attack | 攻击力 | 1+ |
| defense | 防御力 | 0+ |
| hitRate | 命中率 | 0-100 |
| magicDamage | 魔法伤害 | 0+ |
| soul | 魂 | 0+ |
| level | 等级 | 1+ |
| xp | 经验值 | 0+ |
| maxInventory | 背包容量 | 10+ |

### item 类型可用物品ID

| 分类 | ID 示例 |
|------|---------|
| 基础资源 | wood, stone, iron, parts, gold, herb, flower, fireGrass, iceDew, feather, silk, treebark, nitre, bone, soul, lightDust, darkDust, paper, alcohol, crystal, obsidian, moonstone, sunstone, copper, silver, goldOre, dragonBone, dragonScale |
| 精炼材料 | copperIngot, silverIngot, goldIngot, steelIngot, enchantedIron |
| 温度物品 | warmingStone, coolingCrystal, thermalCloth |
| 科技物品 | techBlueprint, magicScroll, ancientRelic, researchNotes |
| 食物 | berry, rawMeat, mushroom, egg, milk, fish, shrimp, bread, meatSoup, coffee, juice, hamburger |
| 药剂 | healthPotion, staminaPotion, sanityPotion, coolPotion, ragePotion, invisPotion, thermalPotion |
| 消耗品 | smokeBomb, poisonVial, holyWater, heatPack, coolPack, returnScroll |
| 武器 | woodStick, boneClub, copperSword, ironSword, steelSword, enchantedSword, crystalStaff, dragonBoneSword, flameSword, frostStaff, thunderHammer, shadowDagger, holyLance, obsidianAxe |
| 防具 | barkArmor, boneArmor, ironArmor, furCoat, desertRobe, elfCloak, dragonScaleArmor, flameArmor, frostArmor, thunderCloak, shadowCloak, holyShield, thermalArmor |
| 饰品 | strengthRing, agilityNecklace, wisdomCrown, lifeAmulet, manaGem |
| 建筑 | bed, cooker, chest, bigChest, workbench, well, field, trap, alchemyTable, scienceTable, firePit, herbGarden, mushroomFarm, chickenCoop, cowPen, greenhouse, watchtower, workshop, brewery, library, enchantTable, stable, fortress |

### building 类型可用建筑ID

| ID | 名称 |
|----|------|
| bed | 床 |
| cooker | 炊具 |
| chest | 箱子 |
| bigChest | 大箱子 |
| workbench | 工桌 |
| well | 水井 |
| field | 田地 |
| trap | 陷阱 |
| alchemyTable | 炼金桌 |
| scienceTable | 科研桌 |
| firePit | 火坑 |
| herbGarden | 草药园 |
| mushroomFarm | 蘑菇农场 |
| chickenCoop | 鸡舍 |
| cowPen | 牛棚 |
| greenhouse | 温室 |
| watchtower | 瞭望塔 |
| workshop | 高级工坊 |
| brewery | 酿酒坊 |
| library | 图书馆 |
| enchantTable | 附魔台 |
| stable | 马厩 |
| fortress | 要塞 |

### map 类型可用地图ID

| ID | 名称 |
|----|------|
| darkForest | 幽暗森林 |
| town | 小镇 |
| creek | 溪流 |
| deathValley | 死亡山谷 |
| acidSwamp | 酸沼泽 |
| spiderCave | 蜘蛛洞穴 |
| ancientRuin | 古老废墟 |
| mine | 幽暗矿洞 |
| banditDen | 贼窝 |
| quietForest | 静谧森林 |
| cannibalTribe | 食人族部落 |
| mageGuild | 魔法公会 |
| volcano | 火山地带 |
| oceanTemple | 海底神殿 |
| skyIsland | 天空岛屿 |
| dungeon | 地牢 |

### weather 类型可用天气ID

| ID | 名称 |
|----|------|
| clear | 晴天 |
| cloudy | 多云 |
| rain | 下雨 |
| heavyRain | 大雨 |
| snow | 下雪 |
| blizzard | 暴风雪 |
| fog | 大雾 |
| wind | 大风 |
| heatwave | 热浪 |
| rainbow | 彩虹 |
| starry | 星空 |

### season 类型可用季节ID

| ID | 名称 |
|----|------|
| spring | 春季 |
| summer | 夏季 |
| autumn | 秋季 |
| winter | 冬季 |

### faction 类型可用阵营ID

| ID | 名称 |
|----|------|
| cannibal | 食人族 |
| mage | 法师 |

### buff 类型可用Buff ID

| ID | 名称 | 类型 |
|----|------|------|
| poison | 中毒 | debuff |
| burn | 灼烧 | debuff |
| freeze | 冰冻 | debuff |
| stun | 眩晕 | debuff |
| bleed | 流血 | debuff |
| attackUp | 攻击提升 | buff |
| defenseUp | 防御提升 | buff |
| warCry | 战吼 | buff |
| invincible | 无敌 | buff |
| counter | 反击 | buff |
| regen | 再生 | buff |

### bossKilled 类型可用Boss ID

| ID | 名称 | 层 |
|----|------|-----|
| skeletonKing | 骷髅王 | 5 |
| demonLord | 魔王 | 10 |
| vampireLord | 吸血鬼领主 | 15 |
| lichKing | 巫妖王 | 20 |
| abyssWorm | 深渊巨虫 | 25 |
| shadowDragon | 暗影龙 | 30 |
| chaosElemental | 混沌元素 | 35 |
| boneColossus | 白骨巨像 | 40 |
| voidWraith | 虚空亡灵 | 45 |
| worldEnder | 灭世者 | 50 |
| spiderQueen | 蜘蛛女王 | 地图 |

### expression 类型可用变量

| 变量 | 说明 | 来源 |
|------|------|------|
| hp | 当前生命 | player.health |
| maxHp | 最大生命 | 100 |
| atk | 攻击力 | player.attack |
| def | 防御力 | player.defense |
| hit | 命中率 | player.hitRate |
| level | 等级 | player.level |
| soul | 魂 | player.soul |
| magic | 魔法伤害 | player.magicDamage |

### expression 类型可用运算符

| 运算符 | 说明 | 示例 |
|--------|------|------|
| + | 加法 | atk + 10 |
| - | 减法 | hp - 50 |
| * | 乘法 | atk * 1.5 |
| / | 除法 | hp / 2 |
| % | 取模 | level % 5 |
| ( ) | 括号 | (atk + def) * 0.5 |

### expression 类型示例

| 表达式 | 说明 |
|--------|------|
| `hp < maxHp * 0.3` | 生命低于30% |
| `atk > level * 5` | 攻击力大于等级×5 |
| `def >= 20` | 防御力≥20 |
| `soul >= 100` | 魂≥100 |
| `hit < 50` | 命中率<50% |
| `(atk + magic) * 1.5` | 物理+魔法伤害×1.5 |
| `maxHp - hp` | 已损失生命 |
| `level * 10 + soul` | 等级×10+魂 |

### Condition 辅助函数

| 函数 | 等价写法 |
|------|----------|
| `ConditionSystem.stat('health', '<', 30)` | `{ type: 'stat', target: 'health', op: '<', value: 30 }` |
| `ConditionSystem.item('wood', '>=', 10)` | `{ type: 'item', target: 'wood', op: '>=', value: 10 }` |
| `ConditionSystem.building('bed')` | `{ type: 'building', target: 'bed', value: 1 }` |
| `ConditionSystem.level('>=', 5)` | `{ type: 'level', op: '>=', value: 5 }` |
| `ConditionSystem.map('darkForest')` | `{ type: 'map', target: 'darkForest', value: 1 }` |
| `ConditionSystem.weather('rain')` | `{ type: 'weather', target: 'rain', value: 1 }` |
| `ConditionSystem.season('winter')` | `{ type: 'season', target: 'winter', value: 1 }` |
| `ConditionSystem.faction('cannibal')` | `{ type: 'faction', target: 'cannibal', value: 1 }` |
| `ConditionSystem.expr('hp < maxHp * 0.3')` | `{ type: 'expression', target: 'hp < maxHp * 0.3', value: 0, op: '>' }` |
| `ConditionSystem.and(a, b)` | `{ operator: 'and', conditions: [a, b] }` |
| `ConditionSystem.or(a, b)` | `{ operator: 'or', conditions: [a, b] }` |
| `ConditionSystem.not(a)` | `{ operator: 'not', conditions: [a] }` |
