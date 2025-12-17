import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { storage } from '../lib/utils';
import {
    addMovieToLibrary as firebaseAddMovie,
    removeMovieFromLibrary as firebaseRemoveMovie,
    getUserLibrary,
    syncLibraryToFirestore,
    addRejectedMovie as firebaseAddRejected
} from '../lib/firebase';

/**
 * MoodMaze Global Store with Firebase Sync
 * Manages library, rejected movies, quiz state, and current batch
 */
const useStore = create(
    persist(
        (set, get) => ({
            // ========================================
            // USER STATE
            // ========================================
            currentUser: null,

            setCurrentUser: (user) => {
                set({ currentUser: user });

                // Load user's library from Firestore when they sign in
                if (user) {
                    getUserLibrary(user.uid).then(library => {
                        set({ library });
                    });
                } else {
                    // Clear library when signing out to prevent tracking
                    set({ library: [], rejectedIds: [] });
                }
            },

            // ========================================
            // LIBRARY STATE
            // ========================================
            library: [],

            addToLibrary: async (movie) => {
                const { currentUser } = get();

                // Requirement: Library should not be tracked without sign in
                if (!currentUser) {
                    console.warn('Cannot add to library: User not signed in');
                    return;
                }

                set((state) => {
                    // Check if already in library
                    if (state.library.some(m => m.id === movie.id)) {
                        return state;
                    }
                    const newLibrary = [...state.library, movie];

                    // Sync to Firestore since user is logged in
                    firebaseAddMovie(currentUser.uid, movie).catch(console.error);

                    return { library: newLibrary };
                });
            },

            removeFromLibrary: async (movieId) => {
                const { currentUser } = get();

                set((state) => {
                    const newLibrary = state.library.filter(m => m.id !== movieId);

                    // Sync to Firestore if user is logged in
                    if (currentUser) {
                        firebaseRemoveMovie(currentUser.uid, movieId).catch(console.error);
                    }

                    return { library: newLibrary };
                });
            },

            clearLibrary: () => {
                set({ library: [] });
            },

            // Sync local library to Firestore
            syncLibrary: async () => {
                const { currentUser, library } = get();
                if (currentUser) {
                    try {
                        await syncLibraryToFirestore(currentUser.uid, library);
                    } catch (error) {
                        console.error('Error syncing library:', error);
                    }
                }
            },

            // ========================================
            // REJECTED MOVIES STATE
            // ========================================
            rejectedIds: [],

            addToRejected: async (movieId) => {
                const { currentUser } = get();

                set((state) => {
                    if (state.rejectedIds.includes(movieId)) {
                        return state;
                    }

                    // Sync to Firestore if user is logged in
                    if (currentUser) {
                        firebaseAddRejected(currentUser.uid, movieId).catch(console.error);
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
