import React from 'react';
import { motion } from 'framer-motion';
import { Film, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import useStore from '../store/useStore';

/**
 * Lobby - The landing page
 */
export function Lobby() {
    const setCurrentPage = useStore(state => state.setCurrentPage);
    const resetQuiz = useStore(state => state.resetQuiz);

    const handleStart = () => {
        resetQuiz();
        // Add a smooth transition effect
        setTimeout(() => {
            setCurrentPage('quiz');
        }, 300);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 pt-20">
            <div className="max-w-4xl mx-auto text-center">
                {/* Logo animation */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="mb-8 relative"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    >
                        <Film className="w-24 h-24 text-cinema-gold mx-auto drop-shadow-[0_0_30px_rgba(212,175,55,0.6)]" />
                    </motion.div>
                    {/* Pulsing glow */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.1, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    >
                        <div className="w-32 h-32 rounded-full bg-cinema-gold/20 blur-2xl" />
                    </motion.div>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-6xl md:text-7xl font-serif font-bold text-cinema-gold mb-6 text-shadow-gold relative inline-block"
                >
                    <motion.span
                        animate={{
                            textShadow: [
                                '0 0 20px rgba(212,175,55,0.5), 0 0 40px rgba(212,175,55,0.3)',
                                '0 0 30px rgba(212,175,55,0.7), 0 0 60px rgba(212,175,55,0.5)',
                                '0 0 20px rgba(212,175,55,0.5), 0 0 40px rgba(212,175,55,0.3)',
                            ],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    >
                        MoodMaze
                    </motion.span>
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-2xl md:text-3xl text-cinema-gold/80 mb-4 font-serif italic"
                >
                    Stop scrolling. Start watching.
                </motion.p>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-lg text-cinema-gold/60 mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                    Discover movies that match your <span className="text-cinema-gold font-semibold">current mood</span>,
                    not just your history. Answer 5 quick questions and find your perfect cinematic match.
                </motion.p>

                {/* Features */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-3xl mx-auto"
                >
                    <motion.div
                        className="group relative p-8 rounded-xl border-2 border-cinema-gold/20 bg-gradient-to-br from-cinema-black/80 to-cinema-black/40 backdrop-blur-md overflow-hidden cursor-pointer"
                        whileHover={{ scale: 1.03, y: -8, borderColor: 'rgba(212, 175, 55, 0.6)' }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.0 }}
                    >
                        {/* Animated background gradient */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-cinema-gold/5 via-transparent to-cinema-red/5"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        />
                        
                        {/* Shimmer effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-cinema-gold/10 to-transparent"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '200%' }}
                            transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
                        />

                        <div className="relative z-10">
                            <motion.div
                                className="mb-5 flex justify-center"
                                whileHover={{ 
                                    scale: 1.3,
                                    rotate: [0, -15, 15, -15, 0],
                                }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="relative">
                                    <motion.div
                                        className="absolute inset-0 bg-cinema-gold/30 rounded-full blur-xl"
                                        animate={{
                                            scale: [1, 1.5, 1],
                                            opacity: [0.5, 0.8, 0.5],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: 'easeInOut'
                                        }}
                                    />
                                    <Sparkles className="w-14 h-14 text-cinema-gold drop-shadow-[0_0_20px_rgba(212,175,55,0.8)] relative z-10" />
                                </div>
                            </motion.div>
                            <h3 className="text-cinema-gold font-bold mb-3 text-2xl group-hover:text-cinema-goldLight transition-colors text-center">
                                Mood-Based
                            </h3>
                            <p className="text-cinema-gold/80 text-sm leading-relaxed group-hover:text-cinema-gold/95 transition-colors text-center">
                                Recommendations based on how you feel right now
                            </p>
                        </div>

                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cinema-gold/10 to-transparent blur-xl" />
                    </motion.div>

                    <motion.div
                        className="group relative p-8 rounded-xl border-2 border-cinema-gold/20 bg-gradient-to-br from-cinema-black/80 to-cinema-black/40 backdrop-blur-md overflow-hidden cursor-pointer"
                        whileHover={{ scale: 1.03, y: -8, borderColor: 'rgba(212, 175, 55, 0.6)' }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1 }}
                    >
                        {/* Animated background gradient */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-cinema-gold/5 via-transparent to-cinema-red/5"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        />
                        
                        {/* Shimmer effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-cinema-gold/10 to-transparent"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '200%' }}
                            transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
                        />

                        <div className="relative z-10">
                            <motion.div
                                className="mb-5 flex justify-center"
                                whileHover={{ 
                                    scale: 1.3,
                                    rotate: [0, 20, -20, 20, 0],
                                }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="relative">
                                    <motion.div
                                        className="absolute inset-0 bg-cinema-gold/30 rounded-full blur-xl"
                                        animate={{
                                            scale: [1, 1.5, 1],
                                            opacity: [0.5, 0.8, 0.5],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                            delay: 0.5
                                        }}
                                    />
                                    <Film className="w-14 h-14 text-cinema-gold drop-shadow-[0_0_20px_rgba(212,175,55,0.8)] relative z-10" />
                                </div>
                            </motion.div>
                            <h3 className="text-cinema-gold font-bold mb-3 text-2xl group-hover:text-cinema-goldLight transition-colors text-center">
                                Cinematic Experience
                            </h3>
                            <p className="text-cinema-gold/80 text-sm leading-relaxed group-hover:text-cinema-gold/95 transition-colors text-center">
                                Swipe through movies like a vintage theatre experience
                            </p>
                        </div>

                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cinema-gold/10 to-transparent blur-xl" />
                    </motion.div>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1 }}
                    className="relative"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={handleStart}
                                className="text-xl px-12 py-6 relative overflow-hidden group cursor-pointer"
                            >
                                {/* Ripple effect on click */}
                                <motion.div
                                    className="absolute inset-0 bg-white/20 rounded-lg"
                                    initial={{ scale: 0, opacity: 0.5 }}
                                    whileTap={{ scale: 2, opacity: 0 }}
                                    transition={{ duration: 0.6 }}
                                />
                                
                                <motion.span
                                    className="relative z-10 flex items-center"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                    >
                                        <Film className="w-6 h-6 mr-3" />
                                    </motion.div>
                                    Start the Show
                                </motion.span>
                                
                                {/* Animated border glow */}
                                <motion.div
                                    className="absolute inset-0 rounded-lg border-2 border-cinema-gold/50"
                                    animate={{
                                        boxShadow: [
                                            '0 0 20px rgba(212,175,55,0.5)',
                                            '0 0 40px rgba(212,175,55,0.8)',
                                            '0 0 20px rgba(212,175,55,0.5)',
                                        ],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'easeInOut'
                                    }}
                                />
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Footer note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                    className="text-cinema-gold/40 text-sm mt-8"
                >
                    Powered by TMDB • Built with React
                </motion.p>
            </div>
        </div>
    );
}

export default Lobby;
