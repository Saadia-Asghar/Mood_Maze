import { useCallback, useRef } from 'react';
import useStore from '../store/useStore';

// Import sound files as assets (for deployment)
// Place your MP3 files in src/assets/sounds/
// If files are missing, sounds will be silently skipped

/**
 * Sound effects hook
 * Plays audio based on action type
 */
export function useSound() {
    const soundEnabled = useStore(state => state.soundEnabled);
    const audioRefs = useRef({});

    const playSound = useCallback((type) => {
        if (!soundEnabled) return;

        try {
            // Create audio element if it doesn't exist
            if (!audioRefs.current[type]) {
                // Sound file paths - using dynamic imports for better bundling
                const soundPaths = {
                    click: '/sounds/click.mp3',
                    success: '/sounds/success.mp3',
                    flip: '/sounds/flip.mp3',
                    reel: '/sounds/reel.mp3',
                    reject: '/sounds/reject.mp3',
                };

                if (soundPaths[type]) {
                    audioRefs.current[type] = new Audio(soundPaths[type]);
                    audioRefs.current[type].volume = 0.3;

                    // Handle loading errors gracefully
                    audioRefs.current[type].addEventListener('error', () => {
                        console.debug(`Sound file not found: ${soundPaths[type]}`);
                        audioRefs.current[type] = null;
                    });
                }
            }

            // Play the sound
            if (audioRefs.current[type]) {
                audioRefs.current[type].currentTime = 0;
                audioRefs.current[type].play().catch(err => {
                    // Silently fail if sound can't play
                    console.debug('Sound play failed:', err);
                });
            }
        } catch (error) {
            console.debug('Sound error:', error);
        }
    }, [soundEnabled]);

    return { playSound };
}

export default useSound;
