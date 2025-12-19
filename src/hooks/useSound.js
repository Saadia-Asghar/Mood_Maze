import { useCallback, useEffect, useRef } from 'react';
import useStore from '../store/useStore';

// Define sound configurations
const SOUND_CONFIG = {
    click: { path: '/sounds/click.mp3', duration: 250 },      // Short click
    success: { path: '/sounds/success.mp3', duration: 500 },  // Success
    flip: { path: '/sounds/flip.mp3', duration: 400 },        // Quick flip
    reel: { path: '/sounds/reel.mp3', duration: 800 },        // Reel
    reject: { path: '/sounds/reject.mp3', duration: 500 },    // Reject
};

// ==========================================================
// GLOBAL AUDIO REGISTRY
// ==========================================================
const audioCache = {};
const globalActiveSounds = new Set();

// Preload all sounds
Object.entries(SOUND_CONFIG).forEach(([type, config]) => {
    try {
        const audio = new Audio(config.path);
        audio.preload = 'auto';
        audio.volume = 0.3;
        audioCache[type] = audio;
        audio.load();
    } catch (e) {
        console.warn(`Failed to preload sound: ${type}`, e);
    }
});

/**
 * Global stop function to absolutely kill all playing sounds
 */
export const stopEverything = () => {
    globalActiveSounds.forEach(sound => {
        try {
            sound.pause();
            sound.currentTime = 0;
            sound.src = '';
            sound.load(); // Reset buffer
        } catch (e) { }
    });
    globalActiveSounds.clear();
};

/**
 * Sound effects hook with Global Lifecycle Management
 */
export function useSound() {
    const soundEnabled = useStore(state => state.soundEnabled);

    // Per-hook instance tracking for safety, though globalActiveSounds does the heavy lifting
    const localActiveSounds = useRef(new Set());

    useEffect(() => {
        // Cleanup function - stops sounds started by THIS instance
        return () => {
            localActiveSounds.current.forEach(sound => {
                if (globalActiveSounds.has(sound)) {
                    try {
                        sound.pause();
                        sound.src = '';
                        globalActiveSounds.delete(sound);
                    } catch (e) { }
                }
            });
            localActiveSounds.current.clear();
        };
    }, []);

    const playSound = useCallback((type, customDuration) => {
        // If sound is disabled, don't play but return a dummy stop function
        if (!soundEnabled) return () => { };

        try {
            const config = SOUND_CONFIG[type];
            const baseAudio = audioCache[type];

            if (!config || !baseAudio) return () => { };

            // Clone to allow overlaps
            const sound = baseAudio.cloneNode();
            sound.volume = baseAudio.volume;

            globalActiveSounds.add(sound);
            localActiveSounds.current.add(sound);

            const duration = customDuration || config.duration;
            let stopTimeout;

            const stop = () => {
                try {
                    sound.pause();
                    sound.currentTime = 0;
                    sound.volume = 0;
                    sound.src = '';
                    globalActiveSounds.delete(sound);
                    localActiveSounds.current.delete(sound);
                    if (stopTimeout) clearTimeout(stopTimeout);
                } catch (e) { }
            };

            const playPromise = sound.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.debug('Playback blocked:', error);
                    globalActiveSounds.delete(sound);
                    localActiveSounds.current.delete(sound);
                });
            }

            // Strictly stop after duration
            stopTimeout = setTimeout(stop, duration);

            return stop;
        } catch (error) {
            console.debug('Sound error:', error);
            return () => { };
        }
    }, [soundEnabled]);

    return { playSound, stopAllSounds: stopEverything };
}

export default useSound;
