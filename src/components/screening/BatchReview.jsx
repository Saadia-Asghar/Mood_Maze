import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, RotateCcw, ArrowRight, Home } from 'lucide-react';
import { getImageUrl } from '../../lib/utils';
import { Button } from '../ui/Button';
import { CameraReel } from '../ui/CameraReel';
import useStore from '../../store/useStore';
import { useSound } from '../../hooks/useSound';

/**
 * Batch Review - The "Intermission" view showing 3 cards
 */
export function BatchReview({ batch, onShowMore, onGenerateAgain, onHome }) {
    const [isSpinning, setIsSpinning] = React.useState(false);
    const { playSound } = useSound();

    const handleAction = (callback) => {
        const stop = playSound('reel', 200);
        setIsSpinning(true);
        setTimeout(() => {
            if (stop) stop();
            setIsSpinning(false);
            if (callback) callback();
        }, 200);
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-cinema-gold mb-4 text-shadow-gold">
                    Intermission
                </h2>
                <p className="text-cinema-gold/70 text-lg">
                    Here's what you just reviewed. Ready for more?
                </p>
            </motion.div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {batch.map((item, index) => (
                    <motion.div
                        key={item.movie.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative"
                    >
                        {/* Card */}
                        <motion.div
                            className="relative rounded-xl overflow-hidden border-2 border-cinema-gold/50 
                          shadow-[0_0_20px_rgba(212,175,55,0.2)] aspect-[2/3] group cursor-pointer"
                            whileHover={{ scale: 1.05, y: -8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.img
                                src={getImageUrl(item.movie.poster_path, 'w500')}
                                alt={item.movie.title}
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Title */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-cinema-black via-cinema-black/80 to-transparent">
                                <h3 className="text-lg font-serif font-bold text-cinema-gold text-shadow-gold line-clamp-2">
                                    {item.movie.title}
                                </h3>
                            </div>

                            {/* Status badge */}
                            <motion.div
                                className="absolute top-4 right-4"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: 'spring', stiffness: 200, delay: index * 0.1 }}
                            >
                                {item.action === 'saved' ? (
                                    <motion.div
                                        className="bg-gradient-to-br from-cinema-green to-cinema-greenLight rounded-full p-3 border-2 border-white shadow-lg"
                                        animate={{
                                            scale: [1, 1.1, 1],
                                            boxShadow: [
                                                '0 0 20px rgba(46, 204, 113, 0.5)',
                                                '0 0 30px rgba(46, 204, 113, 0.8)',
                                                '0 0 20px rgba(46, 204, 113, 0.5)',
                                            ]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <Check className="w-6 h-6 text-white" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        className="bg-gradient-to-br from-red-600 to-red-700 rounded-full p-3 border-2 border-white shadow-lg"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <X className="w-6 h-6 text-white" />
                                    </motion.div>
                                )}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Action buttons */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center justify-center gap-12 md:gap-20"
            >
                {/* Show 3 More - Play Wheel */}
                <div className="flex flex-col items-center gap-3 group">
                    <motion.button
                        onClick={() => handleAction(onShowMore)}
                        className="relative w-20 h-20 rounded-full border-4 border-cinema-gold 
                                 bg-gradient-to-br from-cinema-red to-cinema-redLight 
                                 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)]
                                 group-hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] transition-all duration-300"
                        animate={isSpinning ? { rotate: 360 } : {}}
                        transition={isSpinning ? { duration: 0.2, repeat: Infinity, ease: "linear" } : {}}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <div className="absolute inset-2 rounded-full border border-cinema-gold/50 border-dashed animate-[spin_10s_linear_infinite]" />
                        <ArrowRight className="w-10 h-10 text-cinema-gold drop-shadow-lg" />
                    </motion.button>
                    <span className="text-cinema-gold font-bold text-lg tracking-wide group-hover:text-white transition-colors">
                        Show 3 More
                    </span>
                </div>

                {/* Start Over - Camera Reel */}
                <div className="flex flex-col items-center gap-3">
                    <CameraReel
                        onClick={() => handleAction(onGenerateAgain)}
                        isSpinning={isSpinning}
                        size="lg"
                    />
                    <span className="text-cinema-gold/60 text-sm font-semibold group-hover:text-cinema-gold transition-colors">
                        Start Over
                    </span>
                </div>

                {/* Home - Home Wheel */}
                <div className="flex flex-col items-center gap-3 group">
                    <motion.button
                        onClick={() => handleAction(onHome)}
                        className="relative w-16 h-16 rounded-full border-2 border-cinema-gold/50 
                                 bg-cinema-black/80 flex items-center justify-center 
                                 shadow-[0_0_20px_rgba(212,175,55,0.2)]
                                 group-hover:border-cinema-gold group-hover:bg-cinema-black"
                        animate={isSpinning ? { scale: [1, 1.1, 1] } : {}}
                        transition={isSpinning ? { duration: 0.4, repeat: Infinity } : {}}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Home className="w-8 h-8 text-cinema-gold/70 group-hover:text-cinema-gold transition-colors" />
                    </motion.button>
                    <span className="text-cinema-gold/60 text-sm font-semibold group-hover:text-cinema-gold transition-colors">
                        Lobby
                    </span>
                </div>
            </motion.div>
        </div>
    );
}


export default BatchReview;
