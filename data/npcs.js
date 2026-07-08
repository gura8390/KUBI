// NPCs Data - NPC数据

var NPCS = {
    farmer: {
        name: '农场主',
        description: '小镇的农场主，可以用小麦交换种子。',
        location: 'town',
        dialogue: [
            '你好，冒险者！我这里有多余的种子，你需要吗？',
            '用12个小麦就可以换30个种子哦！',
            '种田是生存的基础，好好利用这些种子吧。'
        ],
        trades: [
            { give: { wheat: 12 }, receive: { seed: 30 }, name: '小麦换种子' }
        ]
    },
    miner: {
        name: '矿队',
        description: '小镇的矿队，可以开启矿洞地图。',
        location: 'town',
        dialogue: [
            '我们发现了新的矿洞！',
            '想要去挖矿吗？我可以带你去。',
            '矿洞里有丰富的铁矿资源。'
        ],
        unlockMap: 'mine'
    },
    merchant: {
        name: '商人',
        description: '小镇的商人，可以交易各种物品。城镇等级越高，商品越丰富。',
        location: 'town',
        dialogue: [
            '欢迎光临！我这里有很多好东西。',
            '想要什么？尽管说！',
            '做生意讲究的是诚信。'
        ],
        trades: [
            { give: { berry: 5 }, receive: { rawMeat: 3 }, name: '浆果换生肉' },
            { give: { rawMeat: 3 }, receive: { water: 5 }, name: '生肉换水' },
            { give: { gold: 5 }, receive: { berry: 10 }, name: '购买浆果' },
            { give: { gold: 8 }, receive: { rawMeat: 5 }, name: '购买生肉' },
            { give: { gold: 10 }, receive: { wood: 10 }, name: '购买木头' }
        ],
        tieredTrades: {
            2: [
                { give: { gold: 15 }, receive: { iron: 5 }, name: '购买铁矿' },
                { give: { gold: 20 }, receive: { herb: 8 }, name: '购买草药' }
            ],
            3: [
                { give: { gold: 25 }, receive: { silk: 3 }, name: '购买丝绸' },
                { give: { gold: 30 }, receive: { lightDust: 2 }, name: '购买光尘' },
                { give: { gold: 30 }, receive: { darkDust: 2 }, name: '购买暗尘' }
            ],
            4: [
                { give: { gold: 50 }, receive: { crystal: 2 }, name: '购买水晶' },
                { give: { gold: 40 }, receive: { soul: 3 }, name: '购买灵魂' }
            ]
        }
    },
    mayor: {
        name: '镇长',
        description: '小镇的镇长，可以开启贼窝地图。',
        location: 'town',
        dialogue: [
            '冒险者，你来得正好。',
            '最近强盗猖獗，你能帮忙清剿吗？',
            '贼窝的位置我可以告诉你。'
        ],
        unlockMap: 'banditDen'
    },
    elder: {
        name: '长者',
        description: '溪流的长者，可以用纸张解锁新地图。',
        location: 'creek',
        dialogue: [
            '年轻人，你想探索更多的地方吗？',
            '给我12张纸，我可以告诉你4个新地点。',
            '这些地方有很多资源等你去发现。'
        ],
        trades: [
            { give: { paper: 12 }, receive: { map: 4 }, name: '解锁4个新地图' }
        ]
    },
    powderMerchant: {
        name: '火药商人',
        description: '死亡山谷的商人，交易硝石和火药。',
        location: 'deathValley',
        dialogue: [
            '需要火药材料吗？',
            '我这里有硝石，价格公道。',
            '小心使用火药，威力很大！'
        ],
        trades: [
            { give: { gold: 10 }, receive: { nitre: 5 }, name: '购买硝石' }
        ]
    },
    waterMerchant: {
        name: '卖水商人',
        description: '专门卖水的商人。',
        location: 'town',
        dialogue: [
            '口渴了吗？我这里有水。',
            '用食物就可以换水哦！',
            '水是生命之源，多备一些。'
        ],
        trades: [
            { give: { rawMeat: 2 }, receive: { water: 5 }, name: '肉换水' },
            { give: { berry: 3 }, receive: { water: 3 }, name: '浆果换水' }
        ]
    },
    seedMerchant: {
        name: '种子商贩',
        description: '专门卖种子的商人。',
        location: 'town',
        dialogue: [
            '需要种子吗？',
            '我这里有各种种子。',
            '种下去，收获更多！'
        ],
        trades: [
            { give: { gold: 5 }, receive: { seed: 10 }, name: '购买种子' },
            { give: { gold: 10 }, receive: { wheat: 10 }, name: '购买小麦' }
        ]
    },
    woodMerchant: {
        name: '伐木工',
        description: '专门卖木头的商人。',
        location: 'town',
        dialogue: [
            '需要木头吗？',
            '我砍了很多木头，可以卖给你。',
            '木头是建造的基础材料。'
        ],
        trades: [
            { give: { gold: 5 }, receive: { wood: 10 }, name: '购买木头' }
        ]
    },
    soupMerchant: {
        name: '热汤商人',
        description: '冬季救援队，低价换热汤。',
        location: 'town',
        dialogue: [
            '冬天来了，需要热汤保暖吗？',
            '我可以低价提供热汤。',
            '暖暖身子，别冻坏了。'
        ],
        trades: [
            { give: { rawMeat: 1 }, receive: { hotSoup: 2 }, name: '肉换热汤' },
            { give: { water: 1 }, receive: { hotSoup: 1 }, name: '水换热汤' }
        ],
        season: 'winter'
    },
    wanderer: { name: '流浪者', description: '神秘的流浪者', location: 'quietForest', dialogue: ['你走到了很远的地方', '前方有两条路', '食人族或法师？'], factionChoice: true },
    herbMaster: { name: '采药人', description: '酸沼泽采药老人', location: 'acidSwamp', dialogue: ['沼泽草药品质极佳', '小心酸性气泡', '草药换药剂'], trades: [{ give: { herb: 5 }, receive: { healthPotion: 2 }, name: '草药换药剂' }, { give: { nitre: 3 }, receive: { gold: 5 }, name: '收购硝石' }] },
    mineWorker: { name: '矿工老王', description: '经验丰富的老矿工', location: 'mine', dialogue: ['矿洞深处有好东西', '铁矿是装备基础', '给我食物换矿石'], trades: [{ give: { bread: 3 }, receive: { iron: 5 }, name: '面包换铁矿' }, { give: { meatSoup: 2 }, receive: { parts: 3 }, name: '肉汤换零件' }] },
    spiderHunter: { name: '蜘蛛猎人', description: '猎杀蜘蛛的冒险者', location: 'spiderCave', dialogue: ['蜘蛛丝是好材料', '小心蜘蛛女王', '教你处理蜘蛛丝'], trades: [{ give: { silk: 3 }, receive: { gold: 8 }, name: '收购丝绸' }, { give: { spiderEgg: 2 }, receive: { herb: 5 }, name: '蜘蛛蛋换草药' }] },
    cannibalQuartermaster: { name: '食人族军需官', description: '食人族物资管理员', location: 'cannibalTribe', dialogue: ['欢迎加入战士', '战利品换武器', '荣耀与你同在'], trades: [{ give: { boneClub: 2, gold: 10 }, receive: { ironSword: 1 }, name: '骨棒换铁剑' }] },
    mageMentor: { name: '法师导师', description: '法师阵营导师', location: 'mageGuild', dialogue: ['欢迎来到公会', '魔法源于知识', '材料换装备'], trades: [{ give: { lightDust: 5, darkDust: 3, gold: 15 }, receive: { enchantedStaff: 1 }, name: '光尘换附魔杖' }] },
    eggMerchant: { name: '鸡蛋商人', description: '卖鸡蛋的商人', location: 'town', dialogue: ['新鲜鸡蛋', '营养丰富', '买些吧'], trades: [{ give: { gold: 2 }, receive: { egg: 3 }, name: '买鸡蛋' }] },
    milkMerchant: { name: '牛奶商人', description: '卖牛奶的商人', location: 'town', dialogue: ['新鲜牛奶', '可做奶酪黄油', '每天买一些'], trades: [{ give: { gold: 2 }, receive: { milk: 3 }, name: '买牛奶' }] }
};
