// Service Worker - 离线缓存支持
// 超苦逼冒险者 v5.1

const CACHE_NAME = 'kubition-v5.1';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './css/style.css',
    './css/inventory.css',
    './css/battle.css',
    './css/responsive.css',
    './js/namespace.js',
    './js/sound.js',
    './js/utils.js',
    './js/storage.js',
    './js/player.js',
    './js/time.js',
    './js/item.js',
    './js/map-data.js',
    './js/map.js',
    './js/craft.js',
    './js/npc.js',
    './js/battle.js',
    './js/events.js',
    './js/quests.js',
    './js/weather.js',
    './js/achievements.js',
    './js/game.js'
];

// 安装：预缓存所有静态资源
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] 预缓存资源');
                return cache.addAll(ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// 激活：清理旧版本缓存
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => {
                        console.log('[SW] 清理旧缓存:', key);
                        return caches.delete(key);
                    })
            );
        }).then(() => self.clients.claim())
    );
});

// 请求拦截：缓存优先策略
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    if (!event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            fetch(event.request).catch(() => caches.match(event.request))
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cached) => {
            if (cached) {
                const fetchPromise = fetch(event.request).then((response) => {
                    if (response && response.status === 200) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, clone);
                        });
                    }
                    return response;
                }).catch(() => {});
                return cached;
            }

            return fetch(event.request).then((response) => {
                if (response && response.status === 200) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, clone);
                    });
                }
                return response;
            });
        })
    );
});
