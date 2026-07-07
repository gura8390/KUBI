// 物品数据已迁移到 data/items.js
// 本文件只保留工具函数

// 物品系统文件

// 物品数据库
// 建筑数据
// 获取物品信息
function getItem(itemId) {
    return ITEMS[itemId] || null;
}

// 获取物品名称
function getItemName(itemId) {
    const item = ITEMS[itemId];
    return item ? item.name : '未知物品';
}

// 获取物品描述
function getItemDescription(itemId) {
    const item = ITEMS[itemId];
    return item ? item.description : '';
}

// 获取物品图标
function getItemIcon(itemId) {
    const item = ITEMS[itemId];
    return item ? item.icon : '📦';
}

// 获取物品效果
function getItemEffect(itemId) {
    const item = ITEMS[itemId];
    return item ? item.effect : null;
}

// 检查物品是否存在
function itemExists(itemId) {
    return ITEMS[itemId] !== undefined;
}

// 获取所有物品列表
function getAllItems() {
    return Object.keys(ITEMS);
}

// 按类型获取物品
function getItemsByType(type) {
    return Object.entries(ITEMS)
        .filter(([id, item]) => item.type === type)
        .map(([id, item]) => ({ id, ...item }));
}

// 获取建筑信息
function getBuilding(buildingId) {
    return BUILDINGS[buildingId] || null;
}

// 获取建筑名称
function getBuildingName(buildingId) {
    const building = BUILDINGS[buildingId];
    return building ? building.name : '未知建筑';
}

// 获取所有建筑列表
function getAllBuildings() {
    return Object.keys(BUILDINGS);
}

// 注册到命名空间
if (typeof KBA !== 'undefined') {
    KBA.registerData('ITEMS', ITEMS);
    KBA.registerData('BUILDINGS', BUILDINGS);
}
