import React from 'react';
import { motion } from 'framer-motion';
import { Film, Sparkles, Zap } from 'lucide-react';
import { Button } from '../components/ui/Button';
import useStore from '../store/useStore';

/**
 * Lobby - The landing page with cinema spotlight theme
 */
export function Lobby() {
    const setCurrentPage = useStore(state => state.setCurrentPage);
    const resetQuiz = useStore(state => state.resetQuiz);

    const handleStart = () => {
        resetQuiz();
        setTimeout(() => {
            setCurrentPage('quiz');
        }, 300);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-24 relative overflow-hidden">
            {/* Animated spotlight beams */}
            <motion.div
                className="absolute top-0 left-1/4 w-96 h-96 bg-cinema-gold/5 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            />
            <motion.div
                className="absolute bottom-0 right-1/4 w-96 h-96 bg-cinema-burgundy/10 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1
                }}
            />

            <div className="max-w-5xl mx-auto text-center relative z-10">
                {/* Cinema Film Reel Logo */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="mb-12 relative"
                >
                    <motion.div
                        animate={{
                            rotate: 360,
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: 'linear'
                        }}
                        className="relative inline-block"
                    >
                        <Film className="w-28 h-28 text-cinema-gold mx-auto drop-shadow-[0_0_40px_rgba(255,215,0,0.6)]" />
                    </motion.div>

                    {/* Pulsing spotlight glow */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.4, 0.1, 0.4],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    >
                        <div className="w-40 h-40 rounded-full bg-cinema-gold/30 blur-3xl" />
                    </motion.div>
                </motion.div>

                {/* Title with spotlight effect */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-7xl md:text-8xl font-serif font-black mb-6 relative"
                >
                    <motion.span
                        className="bg-gradient-to-r from-cinema-goldLight via-cinema-gold to-cinema-goldDark bg-clip-text text-transparent"
                        animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: 'linear'
                        }}
                        style={{
                            backgroundSize: '200% 200%',
                        }}
                    >
                        MoodMaze
                    </motion.span>
                    <motion.div
                        className="absolute -inset-4 bg-gradient-to-r from-cinema-gold/20 via-cinema-spotlight/10 to-cinema-gold/20 blur-2xl -z-10"
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    />
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-3xl md:text-4xl text-cinema-goldLight mb-3 font-serif italic"
                >
                    Stop scrolling. Start watching.
                </motion.p>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-lg text-cinema-gold/70 mb-16 max-w-2xl mx-auto leading-relaxed"
                >
                    Discover movies that match your <span className="text-cinema-goldBright font-semibold">current mood</span>,
                    not just your history. Answer 5 quick questions and find your perfect cinematic match.
                </motion.p>

                {/* Feature Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto"
                >
                    {[
                        {
                            icon: Sparkles,
                            title: 'Mood-Based',
                            description: 'Recommendations based on how you feel right now',
                            gradient: 'from-cinema-gold/10 to-cinema-goldDark/10'
                        },
                        {
                            icon: Film,
                            title: 'Cinematic Experience',
                            description: 'Swipe through movies like a vintage theatre',
                            gradient: 'from-cinema-burgundy/10 to-cinema-red/10'
                        },
                        {
                            icon: Zap,
                            title: 'Instant Results',
                            description: '5 questions, 60+ personalized movies',
                            gradient: 'from-cinema-amber/10 to-cinema-bronze/10'
                        }
                    ].map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                className={`group relative p-8 rounded-2xl border-2 border-cinema-gold/30 bg-gradient-to-br ${feature.gradient} backdrop-blur-sm overflow-hidden cursor-pointer`}
                                whileHover={{ scale: 1.05, y: -8, borderColor: 'rgba(255,215,0,0.6)' }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.0 + index * 0.1 }}
                            >
                                {/* Shimmer effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cinema-gold/20 to-transparent"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: '200%' }}
                                    transition={{ duration: 0.8 }}
                                />

                                <div className="relative z-10">
                                    <motion.div
                                        className="mb-4 flex justify-center"
                                        whileHover={{
                                            scale: 1.2,
                                            rotate: [0, -10, 10, -10, 0],
                                        }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className="relative">
                                            <motion.div
                                                className="absolute inset-0 bg-cinema-gold/40 rounded-full blur-xl"
                                                animate={{
                                                    scale: [1, 1.3, 1],
                                                    opacity: [0.5, 0.8, 0.5],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    delay: index * 0.3
                                                }}
                                            />
                                            <Icon className="w-12 h-12 text-cinema-gold drop-shadow-[0_0_20px_rgba(255,215,0,0.8)] relative z-10" />
                                        </div>
                                    </motion.div>
                                    <h3 className="text-cinema-goldLight font-bold mb-2 text-xl group-hover:text-cinema-goldBright transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-cinema-gold/70 text-sm leading-relaxed group-hover:text-cinema-gold/90 transition-colors">
                                        {feature.description}
                                    </p>
                                </div>

                                {/* Glow effect */}
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cinema-gold/5 to-transparent blur-xl" />
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* CTA Button with spotlight */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 }}
                    className="relative"
                >
                    <motion.div
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={handleStart}
                            className="text-2xl px-16 py-7 relative overflow-hidden group cursor-pointer bg-gradient-to-r from-cinema-gold via-cinema-goldBright to-cinema-gold border-2 border-cinema-goldLight shadow-[0_0_40px_rgba(255,215,0,0.4)] hover:shadow-[0_0_60px_rgba(255,215,0,0.6)]"
                        >
                            {/* Animated shine effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                animate={{
                                    x: ['-200%', '200%'],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatDelay: 1,
                                }}
                            />

                            <span className="relative z-10 flex items-center text-cinema-black font-bold">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                >
                                    <Film className="w-7 h-7 mr-3" />
                                </motion.div>
                                Start the Show
                            </span>
                        </Button>
                    </motion.div>

                    {/* Button spotlight glow */}
                    <motion.div
                        className="absolute -inset-8 bg-cinema-gold/20 rounded-full blur-3xl -z-10"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    />
                </motion.div>

                {/* Footer note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    className="text-cinema-gold/40 text-sm mt-12"
                >
                    Powered by TMDB • Built with React • Cinema Experience
                </motion.p>
            </div>
        </div>
    );
}

export default Lobby;
