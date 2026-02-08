// ============================================
// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
// ============================================

const CONFIG = {
    // Your Valentine's name that will appear in the title
    // Example: "Delisha", "Anjitesh", "Mike"
    valentineName: "Rinku aka my Queen 👑",

    // The title that appears in the browser tab
    // You can use emojis! 💝 💖 💗 💓 💞 💕
    pageTitle: "Will You Be My Valentine? 💝",

    // Floating emojis that appear in the background
    // Find more emojis at: https://emojipedia.org
    floatingEmojis: {
        hearts: ['❤️', '💖', '💝', '💗', '💓'],  // Heart emojis
        bears: ['🧸', '🐻']                       // Cute bear emojis
    },

    // Questions and answers
    // Customize each question and its possible responses
    questions: [
    {
        type: "choice",
        text: "Be honest… do you still get butterflies when you see me? 🦋❤️",
        yesBtn: "Every single time",
        noBtn: "Maybe…"
    },
    {
        type: "choice",
        text: "Be honest… do you just like me? 😏❤️",
        yesBtn: "Yes",
        noBtn: "No",
        secretAnswer: "I don't like you, I love you! ❤️"
    },
    {
        type: "slider",
        text: "How much do you love me?",
        startText: "This much!",
        nextBtn: "Next ❤️"
    },
    {
        type: "final",
        text: "Will you be my Valentine on February 14th, 2026? 🌹",
        yesBtn: "Yes!",
        noBtn: "No"
    }
],

    // Love meter messages
    // They show up depending on how far they slide the meter
    loveMessages: {
        extreme: "WOOOOW You love me that much?? 🥰🚀💝",  // Shows when they go past 5000%
        high: "To infinity and beyond! 🚀💝",              // Shows when they go past 1000%
        normal: "And beyond! 🥰"                           // Shows when they go past 100%
    },

    // Messages that appear after they say "Yes!"
    celebration: {
        title: "Rinku, you chose me… again. And once again, I became the luckiest man alive. I’d marry you in every lifetime. ✨🎉💝💖💝💓",
        message: "I may be far from you right now, but close your eyes and come into my arms. I’m sending you the warmest hug and the softest kiss across the distance. Until I can hold you for real.❤️",
        emojis: "💖👑🤗💋✨💕"  // These will bounce around
    },

    // Color scheme for the website
    // Use https://colorhunt.co or https://coolors.co to find beautiful color combinations
    // colors: {
    //    backgroundStart: "#ffafbd",      // Gradient start (try pastel colors for a soft look)
    //    backgroundEnd: "#ffc3a0",        // Gradient end (should complement backgroundStart)
    //    buttonBackground: "#ff6b6b",     // Button color (should stand out against the background)
    //    buttonHover: "#ff8787",          // Button hover color (slightly lighter than buttonBackground)
    //    textColor: "#ff4757"             // Text color (make sure it's readable!)
    // },
    colors: {
        backgroundStart: "#ff9a9e",
        backgroundEnd: "#fad0c4",
        buttonBackground: "#ff4d6d",
        buttonHover: "#ff758f",
        textColor: "#ffffff"
    },

    // Animation settings
    // Adjust these if you want faster/slower animations
    // animations: {
    //    floatDuration: "15s",           // How long it takes hearts to float up (10-20s recommended)
    //    floatDistance: "50px",          // How far hearts move sideways (30-70px recommended)
    //    bounceSpeed: "0.5s",            // Speed of bouncing animations (0.3-0.7s recommended)
    //   heartExplosionSize: 1.5         // Size of heart explosion effect (1.2-2.0 recommended)
    // },

    animations: {
        floatDuration: "12s",
        floatDistance: "70px",
        bounceSpeed: "0.4s",
        heartExplosionSize: 1.8
    },

    // Background Music (Optional)
    // Add your own music URL after getting proper licenses
    music: {
        enabled: true,                     // Music feature is enabled
        autoplay: false,                    // Try to autoplay (note: some browsers may block this)
        musicUrl: "https://res.cloudinary.com/dncywqfpb/video/upload/v1738399057/music_qrhjvy.mp3", // Music streaming URL
        startText: "🎵 Play Music",        // Button text to start music
        stopText: "🔇 Stop Music",         // Button text to stop music
        volume: 0.5                        // Volume level (0.0 to 1.0)
    }
};

// Export for use in other scripts
window.DEFAULT_CONFIG = CONFIG;
window.VALENTINE_CONFIG = { ...CONFIG };
