// Initialize configuration
const config = window.VALENTINE_CONFIG;

// Validate configuration
function validateConfig() {
    const warnings = [];

    if (!config.valentineName) {
        warnings.push("Valentine's name is not set! Using default.");
        config.valentineName = "My Love";
    }

    const isValidHex = (hex) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    Object.entries(config.colors).forEach(([key, value]) => {
        if (!isValidHex(value)) {
            warnings.push(`Invalid color for ${key}! Using default.`);
            config.colors[key] = getDefaultColor(key);
        }
    });

    if (parseFloat(config.animations.floatDuration) < 5) {
        warnings.push("Float duration too short! Setting to 5s minimum.");
        config.animations.floatDuration = "5s";
    }

    if (config.animations.heartExplosionSize < 1 || config.animations.heartExplosionSize > 3) {
        warnings.push("Heart explosion size should be between 1 and 3! Using default.");
        config.animations.heartExplosionSize = 1.5;
    }

    if (warnings.length > 0) {
        console.warn("⚠️ Configuration Warnings:");
        warnings.forEach(warning => console.warn("- " + warning));
    }
}

function getDefaultColor(key) {
    const defaults = {
        backgroundStart: "#ffafbd",
        backgroundEnd: "#ffc3a0",
        buttonBackground: "#ff6b6b",
        buttonHover: "#ff8787",
        textColor: "#ff4757"
    };
    return defaults[key];
}

document.title = config.pageTitle;

window.addEventListener('DOMContentLoaded', () => {
    validateConfig();

    document.getElementById('valentineTitle').textContent =
        `${config.valentineName}, my love...`;

    // STEP 1 (Butterflies)
    document.getElementById('question1Text').textContent =
        config.questions.first.text;
    document.getElementById('yesBtn1').textContent =
        config.questions.first.yesBtn;
    document.getElementById('noBtn1').textContent =
        config.questions.first.noBtn;

    // STEP 2 (Like Question with Secret)
    document.getElementById('question2Text').textContent =
        config.questions.second.text;
    document.getElementById('yesBtn2').textContent =
        config.questions.second.yesBtn;
    document.getElementById('noBtn2').textContent =
        config.questions.second.noBtn;

    if (config.questions.second.secretAnswer) {
        document.getElementById('secretAnswerBtn').textContent =
            config.questions.second.secretAnswer;
    }

    // STEP 3 (Love Meter)
    document.getElementById('question3Text').textContent =
        config.questions.third.text;
    document.getElementById('startText').textContent =
        config.questions.third.startText;
    document.getElementById('nextBtn').textContent =
        config.questions.third.nextBtn;

    // STEP 4 (Final Valentine Question)
    document.getElementById('question4Text').textContent =
        config.questions.fourth.text;
    document.getElementById('yesBtn4').textContent =
        config.questions.fourth.yesBtn;
    document.getElementById('noBtn4').textContent =
        config.questions.fourth.noBtn;

    createFloatingElements();
    setupMusicPlayer();
    setupShareButton();
});

// Show next question
function showNextQuestion(stepNumber) {
    window.appState.setState({ currentStep: stepNumber });
}

// Move “No” button randomly
function moveButton(button) {
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    button.style.position = 'fixed';
    button.style.left = x + 'px';
    button.style.top = y + 'px';
}

// Floating elements
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');

    config.floatingEmojis.hearts.forEach(heart => {
        const div = document.createElement('div');
        div.className = 'heart';
        div.innerHTML = heart;
        setRandomPosition(div);
        container.appendChild(div);
    });

    config.floatingEmojis.bears.forEach(bear => {
        const div = document.createElement('div');
        div.className = 'bear';
        div.innerHTML = bear;
        setRandomPosition(div);
        container.appendChild(div);
    });
}

function setRandomPosition(element) {
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDelay = Math.random() * 5 + 's';
    element.style.animationDuration = 10 + Math.random() * 20 + 's';
}

// LOVE METER
const loveMeter = document.getElementById('loveMeter');
const loveValue = document.getElementById('loveValue');
const extraLove = document.getElementById('extraLove');

function setInitialPosition() {
    loveMeter.value = 100;
    loveValue.textContent = 100;
    loveMeter.style.width = '100%';
}

loveMeter.addEventListener('input', () => {
    const value = parseInt(loveMeter.value);
    loveValue.textContent = value;
    window.appState.setState({ loveValue: value });

    if (value > 100) {
        extraLove.classList.remove('hidden');

        if (value >= 5000) {
            extraLove.classList.add('super-love');
            extraLove.textContent = config.loveMessages.extreme;
        } else if (value > 1000) {
            extraLove.classList.remove('super-love');
            extraLove.textContent = config.loveMessages.high;
        } else {
            extraLove.classList.remove('super-love');
            extraLove.textContent = config.loveMessages.normal;
        }
    } else {
        extraLove.classList.add('hidden');
        extraLove.classList.remove('super-love');
    }
});

window.addEventListener('DOMContentLoaded', setInitialPosition);
window.addEventListener('load', setInitialPosition);

// Celebration
function celebrate() {
    window.appState.setState({ currentStep: 'celebration' });

    document.getElementById('celebrationTitle').textContent =
        config.celebration.title;
    document.getElementById('celebrationMessage').textContent =
        config.celebration.message;
    document.getElementById('celebrationEmojis').textContent =
        config.celebration.emojis;

    createHeartExplosion();
}

function createHeartExplosion() {
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        const randomHeart =
            config.floatingEmojis.hearts[
                Math.floor(Math.random() * config.floatingEmojis.hearts.length)
            ];
        heart.innerHTML = randomHeart;
        heart.className = 'heart';
        document.querySelector('.floating-elements').appendChild(heart);
        setRandomPosition(heart);
    }
}

function setupMusicPlayer() {
    const musicControls = document.getElementById('musicControls');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicSource = document.getElementById('musicSource');

    if (!config.music.enabled) {
        musicControls.style.display = 'none';
        return;
    }

    musicSource.src = config.music.musicUrl;
    bgMusic.volume = config.music.volume || 0.5;
    bgMusic.load();

    // 👇 Start music on first user interaction anywhere
    const startMusicOnFirstClick = () => {
        bgMusic.play().then(() => {
            window.appState.setState({ isMusicPlaying: true });
        }).catch(err => {
            console.log("Autoplay blocked:", err);
        });

        document.removeEventListener('click', startMusicOnFirstClick);
    };

    document.addEventListener('click', startMusicOnFirstClick);

    // Manual toggle button still works
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            window.appState.setState({ isMusicPlaying: true });
        } else {
            bgMusic.pause();
            window.appState.setState({ isMusicPlaying: false });
        }
    });
}

// Share
function setupShareButton() {
    const shareBtn = document.getElementById('shareBtn');
    if (!shareBtn) return;

    shareBtn.addEventListener('click', () => {
        window.ValentineConfig.copyShareLink().then(success => {
            if (success) {
                const originalText = shareBtn.textContent;
                shareBtn.textContent = "Link Copied! ❤️";
                setTimeout(() => {
                    shareBtn.textContent = originalText;
                }, 2000);
            }
        });
    });
}
