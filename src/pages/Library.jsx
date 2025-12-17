import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Library as LibraryIcon, Film, Search, X, Filter } from 'lucide-react';
import useStore from '../store/useStore';
import { getGenreNames } from '../lib/dsa';
import { Button } from '../components/ui/Button';
import { LibraryCard } from '../components/library/LibraryCard';
import { useSound } from '../hooks/useSound';

/**
 * Library - Saved movies page with search and filter
 */
export function Library() {
    const library = useStore(state => state.library);
    const removeFromLibrary = useStore(state => state.removeFromLibrary);
    const setCurrentPage = useStore(state => state.setCurrentPage);
    const { playSound } = useSound();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('all');

    // Get all unique genres from library
    const allGenres = useMemo(() => {
        const genreSet = new Set();
        library.forEach(movie => {
            const genres = getGenreNames(movie.genre_ids);
            genres.forEach(genre => genreSet.add(genre));
        });
        return ['all', ...Array.from(genreSet).sort()];
    }, [library]);

    // Filter movies based on search and genre
    const filteredMovies = useMemo(() => {
        return library.filter(movie => {
            // Search filter
            const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());

            // Genre filter
            const genres = getGenreNames(movie.genre_ids);
            const matchesGenre = selectedGenre === 'all' || genres.includes(selectedGenre);

            return matchesSearch && matchesGenre;
        });
    }, [library, searchQuery, selectedGenre]);

    const handleRemove = (movieId) => {
        removeFromLibrary(movieId);
    };

    const clearSearch = () => {
        playSound('click');
        setSearchQuery('');
        setSelectedGenre('all');
    };

    if (library.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-12">
                <motion.div
                    className="text-center max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    >
                        <LibraryIcon className="w-28 h-28 text-cinema-gold/40 mx-auto mb-6 drop-shadow-lg" />
                    </motion.div>
                    <h2 className="text-4xl font-serif font-bold text-cinema-gold mb-4">
                        Your Library is Empty
                    </h2>
                    <p className="text-cinema-gold/70 mb-8 text-lg">
                        Start discovering movies and save your favorites here.
                    </p>
                    <Button
                        variant="primary"
                        onClick={() => {
                            playSound('click');
                            setCurrentPage('lobby');
                        }}
                        size="lg"
                    >
                        <Film className="w-6 h-6 mr-2" />
                        Discover Movies
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-4 pt-28 pb-16">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-cinema-gold mb-2">
                                My Library
                            </h1>
                            <p className="text-cinema-gold/60">
                                {filteredMovies.length} of {library.length} {library.length === 1 ? 'movie' : 'movies'}
                            </p>
                        </div>
                        <LibraryIcon className="w-12 h-12 text-cinema-gold/50" />
                    </div>

                    {/* Search and Filter Bar */}
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Input */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cinema-gold/50" />
                            <input
                                type="text"
                                placeholder="Search movies..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-12 py-3 bg-cinema-blackLight border-2 border-cinema-gold/30 rounded-lg 
                                         text-cinema-gold placeholder-cinema-gold/40 focus:border-cinema-gold focus:outline-none
                                         transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => {
                                        playSound('click');
                                        setSearchQuery('');
                                    }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-cinema-gold/50 hover:text-cinema-gold"
                                >
                                    <X className="w-5 h-6" />
                                </button>
                            )}
                        </div>

                        {/* Genre Filter */}
                        <div className="relative">
                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cinema-gold/50 pointer-events-none" />
                            <select
                                value={selectedGenre}
                                onChange={(e) => setSelectedGenre(e.target.value)}
                                className="pl-12 pr-8 py-3 bg-cinema-blackLight border-2 border-cinema-gold/30 rounded-lg 
                                         text-cinema-gold focus:border-cinema-gold focus:outline-none appearance-none cursor-pointer
                                         transition-all min-w-[200px]"
                            >
                                {allGenres.map(genre => (
                                    <option key={genre} value={genre} className="bg-cinema-blackLight text-cinema-gold">
                                        {genre === 'all' ? 'All Genres' : genre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Clear Filters */}
                        {(searchQuery || selectedGenre !== 'all') && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onClick={clearSearch}
                                className="px-4 py-3 bg-cinema-red/20 border-2 border-cinema-red/50 rounded-lg text-cinema-gold
                                         hover:bg-cinema-red/30 hover:border-cinema-red transition-all"
                            >
                                Clear
                            </motion.button>
                        )}
                    </div>
                </motion.div>

                {/* No Results */}
                {filteredMovies.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <Search className="w-20 h-20 text-cinema-gold/30 mx-auto mb-4" />
                        <h3 className="text-2xl font-serif font-bold text-cinema-gold mb-2">
                            No movies found
                        </h3>
                        <p className="text-cinema-gold/60 mb-6">
                            Try adjusting your search or filters
                        </p>
                        <Button variant="secondary" onClick={clearSearch}>
                            Clear Filters
                        </Button>
                    </motion.div>
                )}

                {/* Movie grid */}
                <AnimatePresence mode="popLayout">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {filteredMovies.map((movie, index) => (
                            <motion.div
                                key={movie.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ delay: index * 0.02 }}
                                className="group relative"
                            >
                                <LibraryCard movie={movie} onRemove={handleRemove} />
                            </motion.div>
                        ))}
                    </div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Library;
