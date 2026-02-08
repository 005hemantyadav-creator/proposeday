/**
 * Lightweight App State Management
 */

window.appState = {
    currentStep: 1, // 1, 2, 3, 4 or 'celebration'
    isMusicPlaying: false,
    loveValue: 100,

    listeners: [],

    subscribe(callback) {
        this.listeners.push(callback);
    },

    setState(newState) {
        const oldState = { ...this };
        Object.assign(this, newState);

        this.listeners.forEach(callback => callback(this, oldState));
    }
};

// UI Reaction logic
window.appState.subscribe((state, oldState) => {

    // ===== Handle Step Changes =====
    if (state.currentStep !== oldState.currentStep) {

        // Hide all question sections + celebration
        document
            .querySelectorAll('.question-section, .celebration')
            .forEach(el => el.classList.add('hidden'));

        if (state.currentStep === 'celebration') {
            document.getElementById('celebration').classList.remove('hidden');
            return;
        }

        // Dynamically show question1, question2, question3, question4...
        const section = document.getElementById(`question${state.currentStep}`);
        if (section) {
            section.classList.remove('hidden');
        } else {
            console.warn(`Question step ${state.currentStep} not found in DOM.`);
        }
    }

    // ===== Handle Music Toggle Text =====
    const musicToggle = document.getElementById('musicToggle');
    if (musicToggle) {
        const config = window.VALENTINE_CONFIG;
        musicToggle.textContent =
            state.isMusicPlaying
                ? config.music.stopText
                : config.music.startText;
    }
});
