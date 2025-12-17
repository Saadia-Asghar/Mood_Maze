import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Trash2, Info, X } from 'lucide-react';
import { getGenreNames } from '../../lib/dsa';
import { getImageUrl } from '../../lib/utils';
import { Badge } from '../ui/Badge';
import { useSound } from '../../hooks/useSound';

export function LibraryCard({ movie, onRemove }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const { playSound } = useSound();
    const genres = getGenreNames(movie.genre_ids);

    const handleFlip = () => {
        playSound('flip');
        setIsFlipped(!isFlipped);
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        playSound('reject');
        onRemove(movie.id);
    };

    return (
        <div className="group relative w-full aspect-[2/3] perspective-1000 cursor-pointer" onClick={handleFlip}>
            <motion.div
                className="w-full h-full relative preserve-3d transition-all duration-500"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* FRONT */}
                <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden border-2 border-cinema-gold/30 
                                shadow-[0_0_20px_rgba(255,215,0,0.1)] group-hover:border-cinema-gold 
                                group-hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] transition-all bg-cinema-black">
                    <img
                        src={getImageUrl(movie.poster_path, 'w500')}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />

                    {/* Overlay on hover (if not flipped) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <div className="text-white text-xs font-bold flex items-center gap-1 mb-1">
                            <span className="bg-cinema-gold text-cinema-black px-2 py-0.5 rounded-full">Click to details</span>
                        </div>
                    </div>


                </div>

                {/* BACK */}
                <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden bg-cinema-black border-2 border-cinema-gold 
                                shadow-xl p-5 flex flex-col"
                    style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>

                    {/* Header */}
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-cinema-gold font-serif font-bold text-lg leading-tight line-clamp-2">
                            {movie.title}
                        </h3>
                        <div className="flex items-center gap-1 text-yellow-500 shrink-0 ml-2">
                            <Star className="w-4 h-4 fill-yellow-500" />
                            <span className="text-sm font-bold">{movie.vote_average.toFixed(1)}</span>
                        </div>
                    </div>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-1 mb-3">
                        {genres.slice(0, 3).map((genre) => (
                            <Badge key={genre} variant="outline" className="text-[10px] py-0 px-2 h-5 border-cinema-gold/50 text-cinema-gold/80">
                                {genre}
                            </Badge>
                        ))}
                    </div>

                    {/* Overview */}
                    <div className="flex-1 overflow-y-auto mb-4 custom-scrollbar pr-1">
                        <p className="text-cinema-gold/70 text-xs leading-relaxed">
                            {movie.overview || 'No description available.'}
                        </p>
                    </div>

                    {/* Footer / Actions */}
                    <div className="mt-auto pt-2 border-t border-cinema-gold/20">
                        <div className="flex justify-between items-center text-xs text-cinema-gold/50 mb-3">
                            <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</span>
                            <span className="flex items-center gap-1">
                                🔄 Click to flip back
                            </span>
                        </div>

                        <motion.button
                            onClick={handleRemove}
                            className="w-full py-2 bg-red-600/20 hover:bg-red-600/80 border border-red-600/50 text-red-500 hover:text-white 
                                     rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm font-semibold"
                            whileTap={{ scale: 0.95 }}
                        >
                            <Trash2 className="w-4 h-4" />
                            Remove from Library
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
