import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Check, X, Info } from 'lucide-react';
import { getGenreNames } from '../../lib/dsa';
import { getImageUrl } from '../../lib/utils';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';
import confetti from 'canvas-confetti';

import { useSound } from '../../hooks/useSound';

/**
 * 3D Flippable Movie Card
 * Shows poster on front, details on back
 */
export function Card3D({ movie, onTick, onCross }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const { playSound } = useSound();

    // Reset flip state when movie changes
    useEffect(() => {
        setIsFlipped(false);
    }, [movie.id]);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
        playSound('flip');
        // Add haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(30);
        }
    };

    const handleTick = () => {
        playSound('success');
        // Trigger confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#d4af37', '#2ecc71', '#ffffff']
        });
        onTick(movie);
    };

    const handleCross = () => {
        playSound('reject');
        onCross(movie);
    };

    const genres = getGenreNames(movie.genre_ids);

    return (
        <div className="w-full max-w-md mx-auto perspective-1000">
            <motion.div
                className={cn('flip-card relative w-full h-[600px]', isFlipped && 'flipped')}
                style={{ perspective: '1000px' }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flip-card-inner w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
                    {/* FRONT - Poster */}
                    <div className="flip-card-front absolute w-full h-full rounded-lg overflow-hidden shadow-2xl glow-gold"
                        style={{ backfaceVisibility: 'hidden' }}>
                        <motion.div
                            className="relative w-full h-full group cursor-pointer"
                            onClick={handleFlip}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {/* Poster Image */}
                            <motion.img
                                src={getImageUrl(movie.poster_path, 'w500')}
                                alt={movie.title}
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            />

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-transparent to-transparent" />

                            {/* Shine effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                initial={{ x: '-100%' }}
                                animate={{ x: '200%' }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 3,
                                    ease: 'easeInOut'
                                }}
                            />

                            {/* Match reason badge */}
                            {movie.matchReason && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute top-4 left-4 right-4"
                                >
                                    <Badge variant="default" className="text-xs backdrop-blur-sm bg-cinema-black/90 border-cinema-gold/50">
                                        <Info className="w-3 h-3 mr-1" />
                                        {movie.matchReason}
                                    </Badge>
                                </motion.div>
                            )}

                            {/* Title and rating at bottom */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-cinema-black via-cinema-black/80 to-transparent">
                                <h3 className="text-2xl font-serif font-bold text-cinema-gold mb-2 text-shadow-gold">
                                    {movie.title}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 drop-shadow-lg" />
                                    <span className="text-cinema-gold font-bold">{movie.vote_average.toFixed(1)}</span>
                                    <span className="text-cinema-gold/60 text-sm">({(movie.vote_count || 0).toLocaleString()} votes)</span>
                                </div>
                            </div>

                            {/* Flip hint */}
                            <motion.div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileHover={{ opacity: 1, scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    className="bg-cinema-black/95 backdrop-blur-sm border-2 border-cinema-gold rounded-full px-6 py-3 glow-gold"
                                    animate={{
                                        boxShadow: [
                                            '0 0 20px rgba(212,175,55,0.5)',
                                            '0 0 30px rgba(212,175,55,0.8)',
                                            '0 0 20px rgba(212,175,55,0.5)',
                                        ],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'easeInOut'
                                    }}
                                >
                                    <span className="text-cinema-gold font-semibold flex items-center gap-2">
                                        <motion.span
                                            animate={{ rotate: [0, 180, 360] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                        >
                                            🔄
                                        </motion.span>
                                        Click to flip
                                    </span>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* BACK - Details */}
                    <div className="flip-card-back absolute w-full h-full rounded-lg overflow-hidden shadow-2xl bg-cinema-black border-2 border-cinema-gold glow-gold"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                        <div className="w-full h-full p-6 flex flex-col bg-gradient-to-b from-cinema-black via-cinema-black to-cinema-black/95">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-xl font-serif font-bold text-cinema-gold flex-1 text-shadow-gold">
                                    {movie.title}
                                </h3>
                                <motion.button
                                    onClick={handleFlip}
                                    className="text-cinema-gold hover:text-white transition-colors p-1 rounded-full hover:bg-cinema-gold/20"
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X className="w-6 h-6" />
                                </motion.button>
                            </div>

                            {/* Genres */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {genres.slice(0, 3).map((genre) => (
                                    <Badge key={genre} variant="default">
                                        {genre}
                                    </Badge>
                                ))}
                            </div>

                            {/* Overview */}
                            <div className="flex-1 overflow-y-auto mb-6 custom-scrollbar">
                                <p className="text-cinema-gold/80 leading-relaxed">
                                    {movie.overview || 'No description available.'}
                                </p>
                            </div>

                            {/* Release date */}
                            {movie.release_date && (
                                <div className="text-sm text-cinema-gold/60 mb-6">
                                    Released: {new Date(movie.release_date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                            )}

                            {/* Action buttons */}
                            <div className="flex gap-4">
                                <motion.button
                                    onClick={handleCross}
                                    className="group flex-1 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg border-2 border-red-600
                           hover:from-red-700 hover:to-red-800 transition-all duration-300 font-bold flex items-center justify-center gap-2 shadow-lg relative overflow-hidden"
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(220, 38, 38, 0.7)' }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-white/20"
                                        initial={{ x: '-100%' }}
                                        whileHover={{ x: '100%' }}
                                        transition={{ duration: 0.5 }}
                                    />
                                    <X className="w-5 h-5 relative z-10" />
                                    <span className="relative z-10">Pass</span>
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        Skip this movie
                                    </span>
                                </motion.button>

                                <motion.button
                                    onClick={handleTick}
                                    className="group flex-1 py-4 bg-gradient-to-r from-cinema-green to-cinema-greenLight text-white rounded-lg border-2 border-cinema-green
                           hover:from-cinema-greenLight hover:to-cinema-green transition-all duration-300 font-bold flex items-center justify-center gap-2 shadow-lg relative overflow-hidden"
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(46, 204, 113, 0.7)' }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-white/20"
                                        initial={{ x: '-100%' }}
                                        whileHover={{ x: '100%' }}
                                        transition={{ duration: 0.5 }}
                                    />
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <Check className="w-5 h-5 relative z-10" />
                                    </motion.div>
                                    <span className="relative z-10">Save</span>
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        Add to library
                                    </span>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Card3D;
