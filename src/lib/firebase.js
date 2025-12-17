// Firebase Configuration
// Get your config from: https://console.firebase.google.com/

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

// Firebase config from environment variables
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Configure Google Provider
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

// Check if Firebase is configured
export const isFirebaseConfigured = () => {
    return !!(
        firebaseConfig.apiKey &&
        firebaseConfig.projectId &&
        firebaseConfig.apiKey !== 'undefined'
    );
};

/**
 * Sign in with Google
 */
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Create or update user document in Firestore
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            // New user - create document
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                library: [],
                rejectedIds: [],
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
            });
        } else {
            // Existing user - update last login
            await updateDoc(userRef, {
                lastLogin: new Date().toISOString(),
            });
        }

        return user;
    } catch (error) {
        console.error('Error signing in with Google:', error);
        throw error;
    }
};

/**
 * Sign out
 */
export const signOut = async () => {
    try {
        await firebaseSignOut(auth);
    } catch (error) {
        console.error('Error signing out:', error);
        throw error;
    }
};

/**
 * Get user's library from Firestore
 */
export const getUserLibrary = async (userId) => {
    try {
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            return userDoc.data().library || [];
        }
        return [];
    } catch (error) {
        console.error('Error getting user library:', error);
        return [];
    }
};

/**
 * Add movie to user's library in Firestore
 */
export const addMovieToLibrary = async (userId, movie) => {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            library: arrayUnion(movie)
        });
    } catch (error) {
        console.error('Error adding movie to library:', error);
        throw error;
    }
};

/**
 * Remove movie from user's library in Firestore
 */
export const removeMovieFromLibrary = async (userId, movieId) => {
    try {
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const library = userDoc.data().library || [];
            const updatedLibrary = library.filter(movie => movie.id !== movieId);

            await updateDoc(userRef, {
                library: updatedLibrary
            });
        }
    } catch (error) {
        console.error('Error removing movie from library:', error);
        throw error;
    }
};

/**
 * Sync local library to Firestore
 */
export const syncLibraryToFirestore = async (userId, library) => {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            library: library
        });
    } catch (error) {
        console.error('Error syncing library:', error);
        throw error;
    }
};

/**
 * Add rejected movie ID to Firestore
 */
export const addRejectedMovie = async (userId, movieId) => {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            rejectedIds: arrayUnion(movieId)
        });
    } catch (error) {
        console.error('Error adding rejected movie:', error);
        throw error;
    }
};

export default app;
