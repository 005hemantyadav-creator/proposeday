/**
 * Valentine Shareable Config System
 * Handles encoding/decoding of configuration via URL parameters
 */

(function() {
    const DEFAULT_CONFIG = window.DEFAULT_CONFIG;

    function decodeConfig(base64) {
        try {
            const json = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(json);
        } catch (e) {
            console.error("Failed to decode config:", e);
            return null;
        }
    }

    function encodeConfig(config) {
        try {
            const json = JSON.stringify(config);
            const base64 = btoa(encodeURIComponent(json).replace(/%([0-9A-F]{2})/g,
                function(match, p1) {
                    return String.fromCharCode('0x' + p1);
                }));
            return base64;
        } catch (e) {
            console.error("Failed to encode config:", e);
            return null;
        }
    }

    function sanitizeConfig(config) {
        if (!config || typeof config !== 'object') return DEFAULT_CONFIG;

        const sanitized = JSON.parse(JSON.stringify(DEFAULT_CONFIG));

        const limitStr = (val, max = 200) =>
            (typeof val === 'string' ? val.substring(0, max) : null);

        if (config.valentineName)
            sanitized.valentineName = limitStr(config.valentineName, 50);

        if (config.pageTitle)
            sanitized.pageTitle = limitStr(config.pageTitle, 100);

        // ===== Questions Validation =====
        if (config.questions) {

            if (config.questions.first) {
                sanitized.questions.first.text =
                    limitStr(config.questions.first.text) || sanitized.questions.first.text;

                sanitized.questions.first.yesBtn =
                    limitStr(config.questions.first.yesBtn, 20) || sanitized.questions.first.yesBtn;

                sanitized.questions.first.noBtn =
                    limitStr(config.questions.first.noBtn, 20) || sanitized.questions.first.noBtn;

                sanitized.questions.first.secretAnswer =
                    limitStr(config.questions.first.secretAnswer) || sanitized.questions.first.secretAnswer;
            }

            if (config.questions.second) {
                sanitized.questions.second.text =
                    limitStr(config.questions.second.text) || sanitized.questions.second.text;

                sanitized.questions.second.yesBtn =
                    limitStr(config.questions.second.yesBtn, 20) || sanitized.questions.second.yesBtn;

                sanitized.questions.second.noBtn =
                    limitStr(config.questions.second.noBtn, 20) || sanitized.questions.second.noBtn;

                sanitized.questions.second.secretAnswer =
                    limitStr(config.questions.second.secretAnswer) || sanitized.questions.second.secretAnswer;
            }

            if (config.questions.third) {
                sanitized.questions.third.text =
                    limitStr(config.questions.third.text) || sanitized.questions.third.text;

                sanitized.questions.third.startText =
                    limitStr(config.questions.third.startText, 50) || sanitized.questions.third.startText;

                sanitized.questions.third.nextBtn =
                    limitStr(config.questions.third.nextBtn, 20) || sanitized.questions.third.nextBtn;
            }

            // ✅ NEW: Fourth Question Support
            if (config.questions.fourth) {
                sanitized.questions.fourth.text =
                    limitStr(config.questions.fourth.text) || sanitized.questions.fourth.text;

                sanitized.questions.fourth.yesBtn =
                    limitStr(config.questions.fourth.yesBtn, 20) || sanitized.questions.fourth.yesBtn;

                sanitized.questions.fourth.noBtn =
                    limitStr(config.questions.fourth.noBtn, 20) || sanitized.questions.fourth.noBtn;
            }
        }

        // ===== Love Messages =====
        if (config.loveMessages) {
            sanitized.loveMessages.extreme =
                limitStr(config.loveMessages.extreme, 200) || sanitized.loveMessages.extreme;

            sanitized.loveMessages.high =
                limitStr(config.loveMessages.high, 200) || sanitized.loveMessages.high;

            sanitized.loveMessages.normal =
                limitStr(config.loveMessages.normal, 200) || sanitized.loveMessages.normal;
        }

        // ===== Celebration =====
        if (config.celebration) {
            sanitized.celebration.title =
                limitStr(config.celebration.title) || sanitized.celebration.title;

            sanitized.celebration.message =
                limitStr(config.celebration.message, 500) || sanitized.celebration.message;

            sanitized.celebration.emojis =
                limitStr(config.celebration.emojis, 50) || sanitized.celebration.emojis;
        }

        // ===== Floating Emojis =====
        if (config.floatingEmojis) {
            if (Array.isArray(config.floatingEmojis.hearts)) {
                sanitized.floatingEmojis.hearts = config.floatingEmojis.hearts
                    .slice(0, 10)
                    .filter(e => typeof e === 'string' && e.length <= 10);

                if (sanitized.floatingEmojis.hearts.length === 0)
                    sanitized.floatingEmojis.hearts = DEFAULT_CONFIG.floatingEmojis.hearts;
            }

            if (Array.isArray(config.floatingEmojis.bears)) {
                sanitized.floatingEmojis.bears = config.floatingEmojis.bears
                    .slice(0, 10)
                    .filter(e => typeof e === 'string' && e.length <= 10);

                if (sanitized.floatingEmojis.bears.length === 0)
                    sanitized.floatingEmojis.bears = DEFAULT_CONFIG.floatingEmojis.bears;
            }
        }

        // ===== Animations =====
        if (config.animations) {
            sanitized.animations.floatDuration =
                limitStr(config.animations.floatDuration, 10) || sanitized.animations.floatDuration;

            sanitized.animations.floatDistance =
                limitStr(config.animations.floatDistance, 10) || sanitized.animations.floatDistance;

            sanitized.animations.bounceSpeed =
                limitStr(config.animations.bounceSpeed, 10) || sanitized.animations.bounceSpeed;

            const explosionSize = parseFloat(config.animations.heartExplosionSize);
            if (!isNaN(explosionSize) && explosionSize >= 0.5 && explosionSize <= 5) {
                sanitized.animations.heartExplosionSize = explosionSize;
            }
        }

        // ===== Colors =====
        const isValidHex = (hex) =>
            /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);

        if (config.colors) {
            for (const key in sanitized.colors) {
                if (config.colors[key] && isValidHex(config.colors[key])) {
                    sanitized.colors[key] = config.colors[key];
                }
            }
        }

        // ===== Music =====
        if (config.music) {
            if (typeof config.music.enabled === 'boolean')
                sanitized.music.enabled = config.music.enabled;

            if (config.music.musicUrl &&
                typeof config.music.musicUrl === 'string' &&
                config.music.musicUrl.startsWith('https://')) {
                sanitized.music.musicUrl =
                    limitStr(config.music.musicUrl, 500);
            }

            if (config.music.startText)
                sanitized.music.startText =
                    limitStr(config.music.startText, 50) || sanitized.music.startText;

            if (config.music.stopText)
                sanitized.music.stopText =
                    limitStr(config.music.stopText, 50) || sanitized.music.stopText;

            const vol = parseFloat(config.music.volume);
            if (!isNaN(vol) && vol >= 0 && vol <= 1) {
                sanitized.music.volume = vol;
            }
        }

        return sanitized;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const encodedConfig = urlParams.get('conf');

    if (encodedConfig) {
        const decoded = decodeConfig(encodedConfig);
        if (decoded) {
            window.VALENTINE_CONFIG = sanitizeConfig(decoded);
            console.log("Config loaded from URL");
        }
    }

    window.ValentineConfig = {
        generateShareLink: function() {
            const currentConfig = window.VALENTINE_CONFIG;
            const encoded = encodeConfig(currentConfig);
            const url = new URL(window.location.href);
            url.searchParams.set('conf', encoded);
            return url.toString();
        },

        copyShareLink: function() {
            const link = this.generateShareLink();
            return navigator.clipboard.writeText(link)
                .then(() => true)
                .catch(err => {
                    console.error('Could not copy text: ', err);
                    return false;
                });
        }
    };

})();
