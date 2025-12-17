import React from 'react';
import { motion } from 'framer-motion';
import { Film } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Camera Reel - The "Generate Again" spinning button
 */
export function CameraReel({ onClick, className, isSpinning = false }) {
    return (
        <motion.button
            onClick={onClick}
            className={cn(
                'relative w-20 h-20 rounded-full bg-cinema-red border-4 border-cinema-gold',
                'flex items-center justify-center cursor-pointer',
                'hover:scale-110 transition-all duration-300',
                'shadow-[0_0_30px_rgba(212,175,55,0.5)]',
                className
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={isSpinning ? { rotate: 720 } : { rotate: 0 }}
            transition={{
                duration: 1.5,
                ease: [0.68, -0.55, 0.265, 1.55]
            }}
        >
            {/* Film sprocket holes */}
            <div className="absolute inset-0 rounded-full">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-cinema-black rounded-full"
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: `rotate(${i * 45}deg) translateY(-30px) translateX(-50%)`,
                        }}
                    />
                ))}
            </div>

            {/* Center icon */}
            <Film className="w-8 h-8 text-cinema-gold z-10" />

            {/* Inner circle */}
            <div className="absolute inset-3 rounded-full border-2 border-cinema-gold/30" />
        </motion.button>
    );
}

export default CameraReel;
