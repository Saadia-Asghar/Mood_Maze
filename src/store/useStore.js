import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { storage } from '../lib/utils';

/**
 * MoodMaze Global Store
 * Manages library, rejected movies, quiz state, and current batch
 */
const useStore = create(
    persist(
        (set, get) => ({
            // ========================================
            // LIBRARY STATE
            // ========================================
            library: [],

            addToLibrary: (movie) => {
                set((state) => {
                    // Check if already in library
                    if (state.library.some(m => m.id === movie.id)) {
                        return state;
                    }
                    return { library: [...state.library, movie] };
                });
            },

            removeFromLibrary: (movieId) => {
                set((state) => ({
                    library: state.library.filter(m => m.id !== movieId)
                }));
            },

            clearLibrary: () => {
                set({ library: [] });
            },

            // ========================================
            // REJECTED MOVIES STATE
            // ========================================
            rejectedIds: [],

            addToRejected: (movieId) => {
                set((state) => {
                    if (state.rejectedIds.includes(movieId)) {
                        return state;
                    }
                    return { rejectedIds: [...state.rejectedIds, movieId] };
                });
            },

            clearRejected: () => {
                set({ rejectedIds: [] });
            },

            // ========================================
            // QUIZ STATE
            // ========================================
            quizAnswers: {
                social: null,
                vibe: null,
                energy: null,
                era: null,
                risk: null,
            },

            setQuizAnswer: (question, answer) => {
                set((state) => ({
                    quizAnswers: {
                        ...state.quizAnswers,
                        [question]: answer
                    }
                }));
            },

            resetQuiz: () => {
                set({
                    quizAnswers: {
                        social: null,
                        vibe: null,
                        energy: null,
                        era: null,
                        risk: null,
                    }
                });
            },

            isQuizComplete: () => {
                const { quizAnswers } = get();
                return Object.values(quizAnswers).every(answer => answer !== null);
            },

            // ========================================
            // CURRENT BATCH STATE
            // ========================================
            currentBatch: [],

            addToBatch: (movie) => {
                set((state) => ({
                    currentBatch: [...state.currentBatch, movie]
                }));
            },

            clearBatch: () => {
                set({ currentBatch: [] });
            },

            isBatchComplete: () => {
                return get().currentBatch.length >= 3;
            },

            // ========================================
            // UI STATE
            // ========================================
            soundEnabled: true,

            toggleSound: () => {
                set((state) => ({ soundEnabled: !state.soundEnabled }));
            },

            currentPage: 'lobby', // 'lobby', 'quiz', 'screening', 'library'

            setCurrentPage: (page) => {
                set({ currentPage: page });
            },

            // ========================================
            // DEMO MODE (for when no API key is set)
            // ========================================
            demoMode: false,

            setDemoMode: (enabled) => {
                set({ demoMode: enabled });
            },

            // ========================================
            // RESET ALL
            // ========================================
            resetAll: () => {
                set({
                    library: [],
                    rejectedIds: [],
                    quizAnswers: {
                        social: null,
                        vibe: null,
                        energy: null,
                        era: null,
                        risk: null,
                    },
                    currentBatch: [],
                    currentPage: 'lobby',
                });
            },
        }),
        {
            name: 'moodmaze-storage', // localStorage key
            partialize: (state) => ({
                library: state.library,
                rejectedIds: state.rejectedIds,
                soundEnabled: state.soundEnabled,
            }),
        }
    )
);

export default useStore;
