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
    const activeSoundsRef = useRef(new Set());

    useEffect(() => {
        // Cleanup function to kill all sounds on unmount
        return () => {
            activeSoundsRef.current.forEach(sound => {
                try {
                    sound.pause();
                    sound.currentTime = 0;
                    sound.src = '';
                } catch (e) { }
            });
            activeSoundsRef.current.clear();
        };
    }, []);

    const playSound = useCallback((type, customDuration) => {
        if (!soundEnabled) return null;

        try {
            const config = SOUND_CONFIG[type];
            const baseAudio = audioCache[type];

            if (!config || !baseAudio) return null;

            // Clone to allow overlapping sounds
            const sound = baseAudio.cloneNode();
            sound.volume = baseAudio.volume;

            activeSoundsRef.current.add(sound);

            const duration = customDuration || config.duration;
            let stopTimeout;

            const stop = () => {
                try {
                    sound.pause();
                    sound.currentTime = 0;
                    sound.volume = 0;
                    sound.src = '';
                    activeSoundsRef.current.delete(sound);
                    if (stopTimeout) clearTimeout(stopTimeout);
                } catch (e) { }
            };

            const playPromise = sound.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.debug('Playback blocked:', error);
                    activeSoundsRef.current.delete(sound);
                });
            }

            // Strictly stop after duration
            stopTimeout = setTimeout(stop, duration);

            return stop; // Return stop function for manual control
        } catch (error) {
            console.debug('Sound error:', error);
            return null;
        }
    }, [soundEnabled]);

    const stopAllSounds = useCallback(() => {
        activeSoundsRef.current.forEach(sound => {
            try {
                sound.pause();
                sound.currentTime = 0;
                sound.src = '';
            } catch (e) { }
        });
        activeSoundsRef.current.clear();
    }, []);

    return { playSound, stopAllSounds };
}

export default useSound;
