import { useCallback, useRef } from 'react';
import useStore from '../store/useStore';

// Import sound files as assets (for deployment)
// Place your MP3 files in src/assets/sounds/
// If files are missing, sounds will be silently skipped

/**
 * Sound effects hook
 * Plays audio based on action type - sounds play ONLY on click and stop after duration
 */
export function useSound() {
    const soundEnabled = useStore(state => state.soundEnabled);
    const audioRefs = useRef({});

    const playSound = useCallback((type) => {
        if (!soundEnabled) return;

        try {
            // Define sound durations (in milliseconds)
            const soundConfig = {
                click: { path: '/sounds/click.mp3', duration: 200 },      // Very short click
                success: { path: '/sounds/success.mp3', duration: 400 },  // Medium success
                flip: { path: '/sounds/flip.mp3', duration: 300 },        // Quick flip
                reel: { path: '/sounds/reel.mp3', duration: 600 },        // Longer reel
                reject: { path: '/sounds/reject.mp3', duration: 400 },    // Medium reject
            };

            const config = soundConfig[type];
            if (!config) {
                console.debug(`Unknown sound type: ${type}`);
                return;
            }

            // Create audio element if it doesn't exist
            if (!audioRefs.current[type]) {
                audioRefs.current[type] = new Audio(config.path);
                audioRefs.current[type].volume = 0.3;

                // Handle loading errors gracefully
                audioRefs.current[type].addEventListener('error', () => {
                    console.debug(`Sound file not found: ${config.path}`);
                    audioRefs.current[type] = null;
                });
            }

            // Play the sound
            if (audioRefs.current[type]) {
                const audio = audioRefs.current[type];

                // Reset to start
                audio.currentTime = 0;

                // Play the sound
                audio.play().catch(err => {
                    // Silently fail if sound can't play
                    console.debug('Sound play failed:', err);
                });

                // IMPORTANT: Stop sound after specified duration
                setTimeout(() => {
                    if (audio) {
                        audio.pause();
                        audio.currentTime = 0;
                    }
                }, config.duration);
            }
        } catch (error) {
            console.debug('Sound error:', error);
        }
    }, [soundEnabled]);

    return { playSound };
}

export default useSound;
