// 天气系统文件

// 天气数据
const WEATHER_TYPES = {
    clear: {
        name: '晴天',
        icon: '☀️',
        description: '阳光明媚的好天气',
        effects: {},
        chance: {
            spring: 0.4,
            summer: 0.5,
            autumn: 0.3,
            winter: 0.2
        }
    },

    cloudy: {
        name: '多云',
        icon: '☁️',
        description: '天空布满云层',
        effects: {
            sanity: -0.5
        },
        chance: {
            spring: 0.3,
            summer: 0.2,
            autumn: 0.3,
            winter: 0.3
        }
    },

    rain: {
        name: '下雨',
        icon: '🌧️',
        description: '淅淅沥沥的雨声',
        effects: {
            stamina: -1,
            sanity: -1,
            water: 0.5 // 下雨时采水概率增加
        },
        chance: {
            spring: 0.2,
            summer: 0.15,
            autumn: 0.25,
            winter: 0.1
        }
    },

    heavyRain: {
        name: '大雨',
        icon: '⛈️',
        description: '倾盆大雨，行动不便',
        effects: {
            stamina: -2,
            sanity: -2,
            temperature: -2,
            water: 1 // 大雨时采水概率大幅增加
        },
        chance: {
            spring: 0.1,
            summer: 0.1,
            autumn: 0.15,
            winter: 0.05
        }
    },

    snow: {
        name: '下雪',
        icon: '🌨️',
        description: '雪花纷飞',
        effects: {
            temperature: -5,
            stamina: -1,
            sanity: 1 // 雪景带来精神恢复
        },
        chance: {
            spring: 0,
            summer: 0,
            autumn: 0.05,
            winter: 0.3
        }
    },

    blizzard: {
        name: '暴风雪',
        icon: '❄️',
        description: '狂风暴雪，非常危险',
        effects: {
            temperature: -10,
            stamina: -3,
            health: -2,
            sanity: -3
        },
        chance: {
            spring: 0,
            summer: 0,
            autumn: 0,
            winter: 0.1
        }
    },

    fog: {
        name: '大雾',
        icon: '🌫️',
        description: '浓雾弥漫，视野受限',
        effects: {
            sanity: -2,
            stamina: -1
        },
        chance: {
            spring: 0.1,
            summer: 0.05,
            autumn: 0.15,
            winter: 0.15
        }
    },

    wind: {
        name: '大风',
        icon: '💨',
        description: '呼啸的狂风',
        effects: {
            stamina: -1,
            temperature: -3
        },
        chance: {
            spring: 0.15,
            summer: 0.1,
            autumn: 0.2,
            winter: 0.25
        }
    },

    heatwave: {
        name: '热浪',
        icon: '🔥',
        description: '酷热难耐',
        effects: {
            temperature: 8,
            thirst: -5,
            stamina: -2
        },
        chance: {
            spring: 0,
            summer: 0.2,
            autumn: 0,
            winter: 0
        }
    },

    rainbow: {
        name: '彩虹',
        icon: '🌈',
        description: '美丽的彩虹！',
        effects: {
            sanity: 5,
            health: 2
        },
        chance: {
            spring: 0.05,
            summer: 0.05,
            autumn: 0.03,
            winter: 0
        }
    },

    starry: {
        name: '星空',
        icon: '✨',
        description: '繁星点点的夜空',
        effects: {
            sanity: 3
        },
        chance: {
            spring: 0.1,
            summer: 0.1,
            autumn: 0.1,
            winter: 0.15
        },
        timeRestriction: 'night' // 仅夜晚
    }
};

// 天气系统
const weatherSystem = {
    // 初始化天气系统
    init: function() {
        this.currentWeather = 'clear';
        this.weatherDuration = 0;
        this.weatherChangeInterval = 6; // 天气变化间隔（游戏内小时）
        this.lastWeatherChange = 0;
        this.weatherHistory = [];

        // 设置初始天气
        this.changeWeather();
    },

    // 改变天气
    changeWeather: function() {
        const season = player.gameTime.season;
        const hour = player.gameTime.hour;
        const isNight = hour >= 18 || hour < 6;

        // 计算各天气的权重
        const weights = {};
        Object.entries(WEATHER_TYPES).forEach(([weatherId, weather]) => {
            // 检查时间限制
            if (weather.timeRestriction === 'night' && !isNight) {
                return;
            }

            // 获取季节概率
            const chance = weather.chance[season] || 0;
            if (chance > 0) {
                weights[weatherId] = chance;
            }
        });

        // 加权随机选择
        const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0);
        let random = Math.random() * totalWeight;

        for (const [weatherId, weight] of Object.entries(weights)) {
            random -= weight;
            if (random <= 0) {
                this.currentWeather = weatherId;
                this.weatherDuration = randomInt(3, 8); // 持续3-8小时
                this.lastWeatherChange = player.gameTime.day * 24 + player.gameTime.hour;

                // 记录天气历史
                this.weatherHistory.push({
                    weather: weatherId,
                    time: player.gameTime.day * 24 + player.gameTime.hour,
                    season: season
                });

                // 保持历史记录在合理范围
                if (this.weatherHistory.length > 50) {
                    this.weatherHistory.shift();
                }

                // 显示天气变化消息
                const weatherData = WEATHER_TYPES[weatherId];
                showMessage(`${weatherData.icon} 天气变化: ${weatherData.name}`, 'info');

                return;
            }
        }
    },

    // 应用天气效果
    applyWeatherEffects: function() {
        // 检查是否需要改变天气
        const currentTime = player.gameTime.day * 24 + player.gameTime.hour;
        if (currentTime - this.lastWeatherChange >= this.weatherDuration) {
            this.changeWeather();
        }

        // 应用当前天气效果
        const weather = WEATHER_TYPES[this.currentWeather];
        if (!weather || !weather.effects) return;

        Object.entries(weather.effects).forEach(([stat, value]) => {
            if (player[stat] !== undefined) {
                // 每小时应用一次效果
                player[stat] = Math.max(0, Math.min(100, player[stat] + value));
            }
        });
    },

    // 获取当前天气
    getCurrentWeather: function() {
        return WEATHER_TYPES[this.currentWeather];
    },

    // 获取当前天气ID

    // 获取天气图标
    getWeatherIcon: function() {
        const weather = WEATHER_TYPES[this.currentWeather];
        return weather ? weather.icon : '☀️';
    },

    // 获取天气名称
    getWeatherName: function() {
        const weather = WEATHER_TYPES[this.currentWeather];
        return weather ? weather.name : '晴天';
    },

    // 检查是否可以采水（天气影响）

    // 显示天气信息
    showWeatherInfo: function() {
        const weather = WEATHER_TYPES[this.currentWeather];
        if (!weather) return;

        let content = '<div class="weather-info">';
        content += `<h4>${weather.icon} ${weather.name}</h4>`;
        content += `<p class="weather-description">${weather.description}</p>`;

        // 显示天气效果
        if (weather.effects && Object.keys(weather.effects).length > 0) {
            content += '<div class="weather-effects">';
            content += '<h5>天气效果</h5>';

            const effectNames = {
                health: '生命',
                hunger: '满腹',
                stamina: '体力',
                thirst: '水分',
                sanity: '精神',
                temperature: '体温',
                water: '采水概率'
            };

            Object.entries(weather.effects).forEach(([stat, value]) => {
                const statName = effectNames[stat] || stat;
                const effectClass = value > 0 ? 'positive' : 'negative';
                const effectIcon = value > 0 ? '+' : '';

                content += `<div class="weather-effect ${effectClass}">`;
                content += `<span class="effect-name">${statName}</span>`;
                content += `<span class="effect-value">${effectIcon}${value}${stat === 'temperature' ? '°C' : ''}${stat === 'water' ? '%' : ''}</span>`;
                content += `</div>`;
            });

            content += '</div>';
        }

        // 显示天气持续时间
        const currentTime = player.gameTime.day * 24 + player.gameTime.hour;
        const remainingHours = this.weatherDuration - (currentTime - this.lastWeatherChange);
        content += `<p class="weather-duration">预计持续 ${remainingHours} 小时</p>`;

        // 显示天气历史
        if (this.weatherHistory.length > 1) {
            content += '<div class="weather-history">';
            content += '<h5>最近天气</h5>';

            this.weatherHistory.slice(-5).reverse().forEach(record => {
                const weatherData = WEATHER_TYPES[record.weather];
                const day = Math.floor(record.time / 24);
                const hour = record.time % 24;
                content += `<div class="history-item">`;
                content += `<span>${weatherData.icon} ${weatherData.name}</span>`;
                content += `<span>第${day}天 ${hour}:00</span>`;
                content += `</div>`;
            });

            content += '</div>';
        }

        content += '</div>';

        showModal('天气信息', content, [
            { text: '关闭', action: 'hideModal();' }
        ]);
    },

    // 获取天气预报

    // 获取季节天气特征
};

// 初始化天气系统
function initWeatherSystem() {
    weatherSystem.init();
}

// 注册到命名空间
if (typeof KBA !== 'undefined') {
    KBA.registerSystem('weather', weatherSystem);
    KBA.registerData('WEATHER_TYPES', WEATHER_TYPES);
}
