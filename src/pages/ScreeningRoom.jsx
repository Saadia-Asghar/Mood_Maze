import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react';
import { Card3D } from '../components/screening/Card3D';
import { BatchReview } from '../components/screening/BatchReview';
import { Button } from '../components/ui/Button';
import useStore from '../store/useStore';
import { RecommendationEngine } from '../lib/dsa';
import { fetchMixedMovies, isApiKeyConfigured, DEMO_MOVIES } from '../hooks/useTMDB';
import { useSound } from '../hooks/useSound';

/**
 * Screening Room - The main movie discovery interface
 */
export function ScreeningRoom() {
    const [engine, setEngine] = useState(null);
    const [currentMovie, setCurrentMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showBatchReview, setShowBatchReview] = useState(false);

    const quizAnswers = useStore(state => state.quizAnswers);
    const rejectedIds = useStore(state => state.rejectedIds);
    const addToLibrary = useStore(state => state.addToLibrary);
    const addToRejected = useStore(state => state.addToRejected);
    const currentBatch = useStore(state => state.currentBatch);
    const addToBatch = useStore(state => state.addToBatch);
    const clearBatch = useStore(state => state.clearBatch);
    const isBatchComplete = useStore(state => state.isBatchComplete);
    const setCurrentPage = useStore(state => state.setCurrentPage);
    const demoMode = useStore(state => state.demoMode);
    const setDemoMode = useStore(state => state.setDemoMode);

    const { playSound } = useSound();

    // Initialize the recommendation engine
    useEffect(() => {
        initializeEngine();
    }, []);

    const initializeEngine = async () => {
        try {
            setLoading(true);
            setError(null);

            let movies;

            // Check if API key is configured
            if (isApiKeyConfigured()) {
                // Fetch real movies from TMDB based on quiz answers
                movies = await fetchMixedMovies(quizAnswers);
                setDemoMode(false);
                console.log('Fetched movies based on your preferences:', movies.length);
            } else {
                // Use demo data
                console.log('No API key found, using demo mode');
                movies = DEMO_MOVIES;
                setDemoMode(true);
            }

            // Create and initialize the recommendation engine
            const newEngine = new RecommendationEngine();
            newEngine.initialize(movies, quizAnswers, rejectedIds);

            setEngine(newEngine);

            // Get the first movie
            const firstMovie = newEngine.getNextMovie();
            if (firstMovie) {
                setCurrentMovie(firstMovie);
            } else {
                setError('No movies found matching your preferences. Try adjusting your answers.');
            }

            setLoading(false);
        } catch (err) {
            console.error('Error initializing engine:', err);
            setError('Failed to load movies. Please try again.');
            setLoading(false);
        }
    };

    const handleTick = (movie) => {
        playSound('success');

        // Add to library
        addToLibrary(movie);

        // Add to batch with action
        addToBatch({ movie, action: 'saved' });

        // Check if batch is complete
        if (isBatchComplete()) {
            setShowBatchReview(true);
        } else {
            // Get next movie
            loadNextMovie();
        }
    };

    const handleCross = (movie) => {
        playSound('reject');

        // Add to rejected
        addToRejected(movie.id);
        engine.rejectMovie(movie.id);

        // Add to batch with action
        addToBatch({ movie, action: 'rejected' });

        // Check if batch is complete
        if (isBatchComplete()) {
            setShowBatchReview(true);
        } else {
            // Get next movie
            loadNextMovie();
        }
    };

    const loadNextMovie = () => {
        const nextMovie = engine.getNextMovie();
        if (nextMovie) {
            setCurrentMovie(nextMovie);
        } else {
            // No more movies, reinitialize
            setError('No more movies available. Generating new recommendations...');
            setTimeout(() => {
                initializeEngine();
            }, 2000);
        }
    };

    const handleShowMore = () => {
        playSound('click');
        clearBatch();
        setShowBatchReview(false);
        loadNextMovie();
    };

    const handleGenerateAgain = () => {
        playSound('reel');
        clearBatch();
        setShowBatchReview(false);
        setCurrentPage('quiz');
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 pt-20">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                        <Loader2 className="w-20 h-20 text-cinema-gold mx-auto mb-6 drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]" />
                    </motion.div>
                    <motion.p
                        className="text-cinema-gold text-xl font-semibold"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        {demoMode ? 'Loading demo movies...' : 'Finding your perfect matches...'}
                    </motion.p>
                    <div className="flex justify-center gap-2 mt-6">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 rounded-full bg-cinema-gold"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        );
    }

    // Error state
    if (error && !currentMovie) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 pt-20">
                <div className="text-center max-w-md">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <p className="text-cinema-gold text-lg mb-6">{error}</p>
                    <Button variant="primary" onClick={() => setCurrentPage('quiz')}>
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-12">
            <AnimatePresence mode="wait">
                {showBatchReview ? (
                    <motion.div
                        key="batch-review"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="w-full"
                    >
                        <BatchReview
                            batch={currentBatch}
                            onShowMore={handleShowMore}
                            onGenerateAgain={handleGenerateAgain}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="card-view"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="w-full"
                    >
                        {currentMovie && (
                            <>
                                {/* Demo mode banner */}
                                {demoMode && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="max-w-md mx-auto mb-6 p-4 bg-yellow-600/20 border-2 border-yellow-600 rounded-lg"
                                    >
                                        <p className="text-yellow-500 text-sm text-center">
                                            <strong>Demo Mode:</strong> Add your TMDB API key to .env for full functionality
                                        </p>
                                    </motion.div>
                                )}

                                {/* Progress indicator */}
                                <motion.div
                                    className="max-w-md mx-auto mb-6"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="flex justify-center gap-3 mb-3 relative">
                                        {/* Progress line */}
                                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-cinema-gold/20 -translate-y-1/2" />
                                        <motion.div
                                            className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-cinema-gold to-cinema-goldDark -translate-y-1/2"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(currentBatch.length / 3) * 100}%` }}
                                            transition={{ duration: 0.5 }}
                                        />

                                        {[0, 1, 2].map((i) => (
                                            <motion.div
                                                key={i}
                                                className={`relative w-5 h-5 rounded-full transition-all duration-300 ${i < currentBatch.length
                                                        ? 'bg-gradient-to-br from-cinema-gold to-cinema-goldDark shadow-[0_0_20px_rgba(212,175,55,0.9)] border-2 border-cinema-gold'
                                                        : 'bg-cinema-gold/20 border-2 border-cinema-gold/30'
                                                    }`}
                                                animate={i < currentBatch.length ? {
                                                    scale: [1, 1.4, 1],
                                                    rotate: [0, 180, 360],
                                                } : {
                                                    scale: [1, 1.1, 1],
                                                }}
                                                transition={{
                                                    duration: 0.6,
                                                    delay: i * 0.15,
                                                    repeat: i < currentBatch.length ? Infinity : 0,
                                                    repeatDelay: 2
                                                }}
                                            >
                                                {i < currentBatch.length && (
                                                    <motion.div
                                                        className="absolute inset-0 rounded-full bg-cinema-gold/50"
                                                        animate={{
                                                            scale: [1, 1.5, 1],
                                                            opacity: [0.5, 0, 0.5],
                                                        }}
                                                        transition={{
                                                            duration: 1.5,
                                                            repeat: Infinity,
                                                        }}
                                                    />
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                    <motion.p
                                        className="text-center text-cinema-gold/80 text-sm font-semibold"
                                        animate={{
                                            scale: currentBatch.length > 0 ? [1, 1.05, 1] : 1,
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {currentBatch.length} of 3 reviewed
                                    </motion.p>
                                </motion.div>

                                {/* Movie card */}
                                <Card3D
                                    movie={currentMovie}
                                    onTick={handleTick}
                                    onCross={handleCross}
                                />
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default ScreeningRoom;
