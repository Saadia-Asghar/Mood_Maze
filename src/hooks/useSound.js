import { useCallback, useEffect } from 'react';
import useStore from '../store/useStore';

// Define sound configurations
const SOUND_CONFIG = {
    click: { path: '/sounds/click.mp3', duration: 250 },      // Short click
    success: { path: '/sounds/success.mp3', duration: 500 },  // Success
    flip: { path: '/sounds/flip.mp3', duration: 400 },        // Quick flip
    reel: { path: '/sounds/reel.mp3', duration: 800 },        // Reel
    reject: { path: '/sounds/reject.mp3', duration: 500 },    // Reject
};

// Global audio cache to share across hook instances
const audioCache = {};

// Preload all sounds immediately when the module is loaded
Object.entries(SOUND_CONFIG).forEach(([type, config]) => {
    try {
        const audio = new Audio(config.path);
        audio.preload = 'auto';
        audio.volume = 0.3;
        audioCache[type] = audio;

        // Force browser to start loading
        audio.load();
    } catch (e) {
        console.warn(`Failed to preload sound: ${type}`, e);
    }
});

/**
 * Sound effects hook
 * Plays audio based on action type - preloaded for instant feedback
 */
export function useSound() {
    const soundEnabled = useStore(state => state.soundEnabled);

    const playSound = useCallback((type) => {
        if (!soundEnabled) return;

        try {
            const config = SOUND_CONFIG[type];
            const baseAudio = audioCache[type];

            if (!config || !baseAudio) return;

            // Clone the node so multiple sounds can overlap for instant feedback
            const sound = baseAudio.cloneNode();
            sound.volume = baseAudio.volume;

            const playPromise = sound.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.debug('Playback blocked until interaction:', error);
                });
            }
        } catch (error) {
            console.debug('Sound error:', error);
        }
    }, [soundEnabled]);

    return { playSound };
}

export default useSound;
