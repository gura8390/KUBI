// Data Loader - 统一数据加载器
// 集中管理所有游戏数据配置

const DataLoader = {
    // 数据缓存
    cache: {},

    // 加载所有数据
    loadAll() {
        this.loadItems();
        this.loadMonsters();
        this.loadMaps();
        this.loadSkills();
        this.loadEvents();
        this.loadRecipes();
        this.loadBuildings();
        this.loadNPCs();
        this.loadQuests();
    },

    // 加载物品数据
    loadItems() {
        this.cache.items = ItemData;
        if (typeof KBA !== 'undefined') KBA.data.ITEMS = ItemData;
    },

    // 加载怪物数据
    loadMonsters() {
        this.cache.monsters = MonsterData;
        if (typeof KBA !== 'undefined') KBA.data.MONSTERS = MonsterData;
    },

    // 加载地图数据
    loadMaps() {
        this.cache.maps = MapData;
        if (typeof KBA !== 'undefined') KBA.data.MAPS = MapData;
    },

    // 加载技能数据
    loadSkills() {
        this.cache.skills = SkillData;
        if (typeof KBA !== 'undefined') KBA.data.SKILLS = SkillData;
    },

    // 加载事件数据
    loadEvents() {
        this.cache.events = EventData;
        if (typeof KBA !== 'undefined') KBA.data.EVENTS = EventData;
    },

    // 加载配方数据
    loadRecipes() {
        this.cache.cookingRecipes = CookingRecipeData;
        this.cache.craftingRecipes = CraftingRecipeData;
        if (typeof KBA !== 'undefined') {
            KBA.data.COOKING_RECIPES = CookingRecipeData;
            KBA.data.CRAFTING_RECIPES = CraftingRecipeData;
        }
    },

    // 加载建筑数据
    loadBuildings() {
        this.cache.buildings = BuildingData;
        if (typeof KBA !== 'undefined') KBA.data.BUILDINGS = BuildingData;
    },

    // 加载NPC数据
    loadNPCs() {
        this.cache.npcs = NPCData;
        if (typeof KBA !== 'undefined') KBA.data.NPCS = NPCData;
    },

    // 加载任务数据
    loadQuests() {
        this.cache.quests = QuestData;
        if (typeof KBA !== 'undefined') KBA.data.QUESTS = QuestData;
    },

    // 获取数据
    get(category, id) {
        if (this.cache[category] && id) {
            return this.cache[category][id];
        }
        return this.cache[category];
    },

    // 搜索数据
    search(category, predicate) {
        const data = this.cache[category];
        if (!data) return [];
        return Object.entries(data).filter(([id, item]) => predicate(id, item));
    }
};

// 注册到命名空间
if (typeof KBA !== 'undefined') {
    KBA.systems.dataLoader = DataLoader;
}
