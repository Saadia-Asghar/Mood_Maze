import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * Progress bar for quiz
 */
export function ProgressBar({ current, total }) {
    const percentage = (current / total) * 100;

    return (
        <div className="w-full max-w-3xl mx-auto mb-8">
            <div className="flex items-center justify-between mb-3">
                <span className="text-cinema-gold/80 text-sm font-semibold">Progress</span>
                <span className="text-cinema-gold font-bold text-lg">{Math.round(percentage)}%</span>
            </div>
            <div className="relative h-3 bg-cinema-black/50 rounded-full border border-cinema-gold/30 overflow-hidden backdrop-blur-sm">
                <motion.div
                    className="h-full bg-gradient-to-r from-cinema-purple via-cinema-blue to-cinema-gold relative overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    {/* Shimmer effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                </motion.div>
                
                {/* Progress dots */}
                <div className="absolute inset-0 flex items-center justify-between px-1">
                    {[...Array(total)].map((_, i) => (
                        <motion.div
                            key={i}
                            className={cn(
                                'w-2 h-2 rounded-full',
                                i < current 
                                    ? 'bg-cinema-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]' 
                                    : 'bg-cinema-gold/20'
                            )}
                            animate={i < current ? {
                                scale: [1, 1.3, 1],
                            } : {}}
                            transition={{ delay: i * 0.1, duration: 0.3 }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProgressBar;
