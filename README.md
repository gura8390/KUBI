# 超苦逼冒险者 · KUBI

浏览器中的文字生存冒险游戏：采集资源、制作工具、建造家园、探索地图，并应对饥饿、口渴和战斗。A data-driven browser survival and text-adventure game.

## 开始游戏

打开 [在线游戏](https://gura8390.github.io/KUBI/)。也可以下载源码并在本地启动静态服务器：

```bash
git clone https://github.com/gura8390/KUBI.git
cd KUBI
python -m http.server 8000
```

访问 `http://localhost:8000/`。推荐使用 HTTP/HTTPS 页面，不依赖双击 HTML 后的文件协议行为。网页存档保存在浏览器本地，清除网站数据前请先确认存档处理方式。

## 游戏内容

- 探索地图、采集材料、制作装备与消耗品。
- 管理生命和生存需求，选择战斗或休整。
- 建造家园设施、发展科技，与 NPC 交易和互动。
- 数据与引擎分离，包含事件、任务、状态和扩展模块。

仓库包含实验性游戏系统，文档列出的系统不等于所有路径都已完成实机验收。完整游戏流程和存档兼容性仍需单独测试。

## 代码导航

| 目录/文件 | 用途 |
|---|---|
| `index.html` | 游戏入口 |
| `css/` | 页面样式 |
| `js/` | 游戏与界面逻辑 |
| `data/` | 游戏数据 |
| `engine/` | 通用引擎模块 |
| `manifest.json`、`sw.js` | 网页应用与缓存配置 |
| [API.md](API.md) | 扩展 API 参考 |
| [ENGINE.md](ENGINE.md) | 现有引擎实现参考 |

## 其他文字游戏

[BIGMCXM / 冒险者](https://github.com/gura8390/BIGMCXM) 与 [NEW / 荒境纪元](https://github.com/gura8390/NEW) 分别作为独立项目保留。目前没有确认三者的存档或代码兼容关系，不应直接覆盖彼此的文件。

## 项目状态

本仓库目前没有独立的项目许可证文件。仓库名称 `KUBI` 和现有在线地址保持不变。
