/**
 * Sound Manager for MoodMaze
 * Handles all sound effects with volume control and muting
 */

class SoundManager {
    constructor() {
        this.sounds = {};
        this.volume = 0.5; // Default volume (0.0 to 1.0)
        this.muted = false;
    }

    /**
     * Preload a sound
     * @param {string} name - Sound identifier
     * @param {string} path - Path to sound file
     */
    preload(name, path) {
        const audio = new Audio(path);
        audio.volume = this.volume;
        audio.preload = 'auto';
        this.sounds[name] = audio;
    }

    /**
     * Play a sound
     * @param {string} name - Sound identifier
     * @param {boolean} loop - Whether to loop the sound
     */
    play(name, loop = false) {
        if (this.muted || !this.sounds[name]) return;

        const sound = this.sounds[name].cloneNode();
        sound.volume = this.volume;
        sound.loop = loop;

        sound.play().catch(err => {
            console.warn(`Failed to play sound: ${name}`, err);
        });

        return sound;
    }

    /**
     * Stop a sound
     * @param {string} name - Sound identifier
     */
    stop(name) {
        if (!this.sounds[name]) return;
        this.sounds[name].pause();
        this.sounds[name].currentTime = 0;
    }

    /**
     * Set volume for all sounds
     * @param {number} vol - Volume level (0.0 to 1.0)
     */
    setVolume(vol) {
        this.volume = Math.max(0, Math.min(1, vol));
        Object.values(this.sounds).forEach(sound => {
            sound.volume = this.volume;
        });
    }

    /**
     * Mute/unmute all sounds
     * @param {boolean} mute - Whether to mute
     */
    setMuted(mute) {
        this.muted = mute;
    }

    /**
     * Toggle mute
     */
    toggleMute() {
        this.muted = !this.muted;
        return this.muted;
    }
}

// Create singleton instance
const soundManager = new SoundManager();

// Preload sounds
soundManager.preload('click', '/sounds/click.mp3');
soundManager.preload('swipe', '/sounds/swipe.mp3');
soundManager.preload('accept', '/sounds/accept.mp3');
soundManager.preload('reject', '/sounds/reject.mp3');
soundManager.preload('complete', '/sounds/complete.mp3');
soundManager.preload('transition', '/sounds/transition.mp3');
soundManager.preload('ambient', '/sounds/ambient.mp3');

export default soundManager;
