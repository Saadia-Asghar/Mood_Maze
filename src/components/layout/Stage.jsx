import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Volume2, VolumeX } from 'lucide-react';
import useStore from '../../store/useStore';
import { cn } from '../../lib/utils';
import { AuthButton } from './AuthButton';

/**
 * Main stage wrapper with curtains and grain effect
 */
export function Stage({ children, className }) {
    const soundEnabled = useStore(state => state.soundEnabled);
    const toggleSound = useStore(state => state.toggleSound);
    const [curtainsOpen, setCurtainsOpen] = useState(false);

    // Open curtains after initial animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurtainsOpen(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-cinema-black relative overflow-hidden">
            {/* Film grain overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.08] bg-repeat"
                style={{ backgroundImage: 'url(/grain.svg)', backgroundSize: '200px' }}
            />

            {/* Left curtain */}
            <motion.div
                initial={{ x: -200 }}
                animate={{
                    x: curtainsOpen ? -180 : 0,
                    transition: {
                        duration: 2,
                        ease: [0.25, 0.1, 0.25, 1],
                        delay: curtainsOpen ? 0 : 1.2
                    }
                }}
                className="fixed top-0 left-0 w-40 h-full z-40 curtain-left"
                style={{
                    clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0 100%)',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-cinema-red via-[#6a0101] to-[#4a0000] opacity-95" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />

                {/* Curtain folds with depth */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute top-0 bottom-0 w-3 bg-gradient-to-r from-black/40 to-transparent"
                        style={{ left: `${i * 3.3}%` }}
                        animate={curtainsOpen ? {
                            x: -2,
                            opacity: [0.4, 0.6, 0.4],
                        } : {}}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: 'easeInOut'
                        }}
                    />
                ))}

                {/* Vertical pleats */}
                {[...Array(6)].map((_, i) => (
                    <div
                        key={`pleat-${i}`}
                        className="absolute top-0 bottom-0 w-px bg-black/20"
                        style={{ left: `${(i + 1) * 16.66}%` }}
                    />
                ))}
            </motion.div>

            {/* Right curtain */}
            <motion.div
                initial={{ x: 200 }}
                animate={{
                    x: curtainsOpen ? 180 : 0,
                    transition: {
                        duration: 2,
                        ease: [0.25, 0.1, 0.25, 1],
                        delay: curtainsOpen ? 0 : 1.2
                    }
                }}
                className="fixed top-0 right-0 w-40 h-full z-40 curtain-right"
                style={{
                    clipPath: 'polygon(5% 0, 100% 0, 100% 100%, 0 100%)',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-l from-cinema-red via-[#6a0101] to-[#4a0000] opacity-95" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />

                {/* Curtain folds with depth */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute top-0 bottom-0 w-3 bg-gradient-to-l from-black/40 to-transparent"
                        style={{ right: `${i * 3.3}%` }}
                        animate={curtainsOpen ? {
                            x: 2,
                            opacity: [0.4, 0.6, 0.4],
                        } : {}}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: 'easeInOut'
                        }}
                    />
                ))}

                {/* Vertical pleats */}
                {[...Array(6)].map((_, i) => (
                    <div
                        key={`pleat-${i}`}
                        className="absolute top-0 bottom-0 w-px bg-black/20"
                        style={{ right: `${(i + 1) * 16.66}%` }}
                    />
                ))}
            </motion.div>

            {/* Top curtain */}
            <motion.div
                initial={{ y: -150 }}
                animate={{
                    y: curtainsOpen ? -100 : 0,
                    transition: {
                        duration: 2,
                        ease: [0.25, 0.1, 0.25, 1],
                        delay: curtainsOpen ? 0 : 1
                    }
                }}
                className="fixed top-0 left-0 right-0 h-28 z-50 curtain-top"
                style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-cinema-red via-[#6a0101] to-[#4a0000] opacity-95" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

                {/* Scalloped valance effect */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute top-0 h-8 bg-cinema-red"
                        style={{
                            left: `${i * 12.5}%`,
                            width: '12.5%',
                            clipPath: `polygon(0 0, 100% 0, 50% 100%, 0 50%)`
                        }}
                        animate={curtainsOpen ? {
                            y: -5,
                            opacity: [0.9, 1, 0.9],
                        } : {}}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: 'easeInOut'
                        }}
                    />
                ))}

                {/* Curtain tassels */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute top-0 w-1 h-full bg-gradient-to-b from-cinema-gold/50 to-transparent"
                        style={{ left: `${(i + 1) * 8.33}%` }}
                        animate={curtainsOpen ? {
                            opacity: [0.3, 0.6, 0.3],
                        } : {}}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.1,
                        }}
                    />
                ))}
            </motion.div>

            {/* Bottom curtain */}
            <motion.div
                initial={{ y: 150 }}
                animate={{
                    y: curtainsOpen ? 100 : 0,
                    transition: {
                        duration: 2,
                        ease: [0.25, 0.1, 0.25, 1],
                        delay: curtainsOpen ? 0 : 1
                    }
                }}
                className="fixed bottom-0 left-0 right-0 h-28 z-50 curtain-bottom"
                style={{
                    clipPath: 'polygon(0 15%, 100% 0, 100% 100%, 0 100%)',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-cinema-red via-[#6a0101] to-[#4a0000] opacity-95" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

                {/* Scalloped valance effect */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bottom-0 h-8 bg-cinema-red"
                        style={{
                            left: `${i * 12.5}%`,
                            width: '12.5%',
                            clipPath: `polygon(50% 0, 100% 50%, 100% 100%, 0 100%)`
                        }}
                        animate={curtainsOpen ? {
                            y: 5,
                            opacity: [0.9, 1, 0.9],
                        } : {}}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: 'easeInOut'
                        }}
                    />
                ))}

                {/* Curtain tassels */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bottom-0 w-1 h-full bg-gradient-to-t from-cinema-gold/50 to-transparent"
                        style={{ left: `${(i + 1) * 8.33}%` }}
                        animate={curtainsOpen ? {
                            opacity: [0.3, 0.6, 0.3],
                        } : {}}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.1,
                        }}
                    />
                ))}
            </motion.div>

            {/* Auth Button - positioned on left */}
            <AuthButton />

            {/* Sound toggle button - positioned to avoid overlap */}
            <motion.button
                onClick={toggleSound}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 }}
                className="fixed top-20 right-6 z-50 p-2.5 rounded-full bg-cinema-black/90 backdrop-blur-sm border-2 border-cinema-gold/50
                   hover:bg-cinema-gold hover:text-cinema-black hover:border-cinema-gold transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                whileHover={{ scale: 1.1, boxShadow: '0 0 25px rgba(212,175,55,0.6)' }}
                whileTap={{ scale: 0.95 }}
            >
                {soundEnabled ? (
                    <Volume2 className="w-4 h-4 text-cinema-gold" />
                ) : (
                    <VolumeX className="w-4 h-4 text-cinema-gold" />
                )}
            </motion.button>

            {/* Main content */}
            <div className={cn('relative z-10', className)}>
                {children}
            </div>

            {/* Spotlight effect */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)'
                    }}
                />
            </div>
        </div>
    );
}

export default Stage;
