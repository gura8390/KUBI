// 地图和怪物数据已迁移到 data/maps.js 和 data/monsters.js
// 本文件只保留工具函数

// 地图数据文件 - 从 map.js 分离，职责：纯数据定义

// 地图数据
// 怪物数据
// 注册到命名空间
if (typeof KBA !== 'undefined') {
    KBA.registerData('MAPS', MAPS);
    KBA.registerData('MONSTERS', MONSTERS);
}
