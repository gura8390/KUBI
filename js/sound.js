// 音效系统 - Web Audio API 程序化生成
// 对标原版 13 种音效 + 战斗/制作额外音效

const soundSystem = {
    ctx: null,
    enabled: true,
    volume: 0.3,

    init() {
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API 不可用:', e);
            this.enabled = false;
        }
    },

    // 确保 AudioContext 处于运行状态（应对浏览器自动暂停）
    resume() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    },

    // 播放音效
    play(name) {
        if (!this.enabled || !this.ctx) return;
        this.resume();
        const fn = this._sounds[name];
        if (fn) fn.call(this);
    },

    // 通用振荡器辅助
    _osc(type, freq, duration, vol) {
        const ctx = this.ctx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.value = (vol || 1) * this.volume;
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
    },

    // 噪声辅助
    _noise(duration, vol) {
        const ctx = this.ctx;
        const bufferSize = ctx.sampleRate * duration;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        const gain = ctx.createGain();
        gain.gain.value = (vol || 0.5) * this.volume;
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        source.connect(gain);
        gain.connect(ctx.destination);
        source.start();
    },

    _sounds: {
        // 物品获取 - 清脆的"叮"声
        pick() {
            this._osc('sine', 880, 0.15, 0.6);
            setTimeout(() => this._osc('sine', 1320, 0.1, 0.4), 50);
        },

        // 进食/饮水
        eat() {
            this._osc('sine', 300, 0.08, 0.5);
            setTimeout(() => this._osc('sine', 250, 0.08, 0.4), 80);
            setTimeout(() => this._osc('sine', 200, 0.1, 0.3), 160);
        },

        // 饮水 - 清脆流水声
        drink() {
            this._osc('sine', 600, 0.1, 0.4);
            setTimeout(() => this._osc('sine', 500, 0.08, 0.3), 60);
            setTimeout(() => this._osc('sine', 700, 0.06, 0.3), 120);
        },

        // 开门/地图切换
        door() {
            this._osc('square', 150, 0.1, 0.3);
            setTimeout(() => this._osc('square', 200, 0.15, 0.2), 100);
        },

        // 交易/交换
        exchange() {
            this._osc('sine', 523, 0.08, 0.5);
            setTimeout(() => this._osc('sine', 659, 0.08, 0.5), 80);
            setTimeout(() => this._osc('sine', 784, 0.12, 0.4), 160);
        },

        // 建造
        build() {
            this._noise(0.08, 0.4);
            setTimeout(() => this._osc('square', 200, 0.1, 0.3), 100);
            setTimeout(() => this._noise(0.06, 0.3), 200);
            setTimeout(() => this._osc('sine', 400, 0.15, 0.4), 300);
        },

        // 铃声/提示
        bell() {
            this._osc('sine', 1047, 0.3, 0.5);
            this._osc('sine', 1319, 0.3, 0.3);
        },

        // 装备穿戴
        wear() {
            this._noise(0.05, 0.3);
            setTimeout(() => this._osc('sine', 350, 0.12, 0.4), 60);
        },

        // 卷轴/阅读
        scroll() {
            this._osc('sine', 400, 0.05, 0.3);
            setTimeout(() => this._osc('sine', 500, 0.05, 0.3), 50);
            setTimeout(() => this._osc('sine', 600, 0.08, 0.2), 100);
        },

        // 打开界面
        open() {
            this._osc('sine', 440, 0.08, 0.4);
            setTimeout(() => this._osc('sine', 660, 0.1, 0.3), 60);
        },

        // 全部拾取
        pickall() {
            this._osc('sine', 660, 0.06, 0.4);
            setTimeout(() => this._osc('sine', 880, 0.06, 0.4), 50);
            setTimeout(() => this._osc('sine', 1100, 0.06, 0.4), 100);
            setTimeout(() => this._osc('sine', 1320, 0.1, 0.3), 150);
        },

        // 战斗攻击 - 打击声
        attack() {
            this._noise(0.06, 0.6);
            this._osc('square', 100, 0.08, 0.4);
        },

        // 制作成功
        craft() {
            this._osc('sine', 523, 0.1, 0.5);
            setTimeout(() => this._osc('sine', 659, 0.1, 0.5), 100);
            setTimeout(() => this._osc('sine', 784, 0.1, 0.5), 200);
            setTimeout(() => this._osc('sine', 1047, 0.2, 0.4), 300);
        },

        // 错误/失败
        error() {
            this._osc('square', 150, 0.15, 0.4);
            setTimeout(() => this._osc('square', 120, 0.2, 0.3), 150);
        },

        // 战斗受伤
        hurt() {
            this._noise(0.08, 0.5);
            this._osc('sawtooth', 200, 0.1, 0.3);
        },

        // 战斗胜利
        victory() {
            const notes = [523, 659, 784, 1047];
            notes.forEach((freq, i) => {
                setTimeout(() => this._osc('sine', freq, 0.15, 0.5), i * 120);
            });
        },

        // 战斗逃跑
        flee() {
            this._osc('sine', 400, 0.05, 0.3);
            setTimeout(() => this._osc('sine', 300, 0.05, 0.3), 50);
            setTimeout(() => this._osc('sine', 200, 0.1, 0.2), 100);
        },

        // 治疗/恢复
        heal() {
            this._osc('sine', 523, 0.1, 0.4);
            setTimeout(() => this._osc('sine', 784, 0.15, 0.4), 100);
        },

        // 地牢下层
        descend() {
            this._osc('sine', 400, 0.1, 0.4);
            setTimeout(() => this._osc('sine', 300, 0.1, 0.4), 100);
            setTimeout(() => this._osc('sine', 200, 0.15, 0.3), 200);
        }
    }
};

function initSoundSystem() {
    soundSystem.init();
}

// 注册到命名空间
if (typeof KBA !== 'undefined') KBA.registerSystem('soundSystem', soundSystem);
