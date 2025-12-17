import {
    signInWithPopup,
    signOut as firebaseSignOut,
    onAuthStateChanged
} from 'firebase/auth';
import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    serverTimestamp
} from 'firebase/firestore';
import { auth, db, googleProvider, isFirebaseConfigured } from './firebase';

/**
 * Firebase Service - Handles authentication and database operations
 */

// ============================================
// AUTHENTICATION
// ============================================

/**
 * Sign in with Google
 */
export const signInWithGoogle = async () => {
    if (!isFirebaseConfigured()) {
        throw new Error('Firebase is not configured. Add your Firebase config to .env');
    }

    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
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
 * Listen to auth state changes
 */
export const onAuthChange = (callback) => {
    return onAuthStateChanged(auth, callback);
};

// ============================================
// FIRESTORE OPERATIONS
// ============================================

/**
 * Save user library to Firestore
 */
export const saveLibraryToCloud = async (userId, library) => {
    if (!userId) return;

    try {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, {
            library,
            updatedAt: serverTimestamp(),
        }, { merge: true });
    } catch (error) {
        console.error('Error saving library to cloud:', error);
        throw error;
    }
};

/**
 * Load user library from Firestore
 */
export const loadLibraryFromCloud = async (userId) => {
    if (!userId) return null;

    try {
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            return userDoc.data().library || [];
        }
        return [];
    } catch (error) {
        console.error('Error loading library from cloud:', error);
        throw error;
    }
};

/**
 * Save rejected movies to Firestore
 */
export const saveRejectedToCloud = async (userId, rejectedIds) => {
    if (!userId) return;

    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            rejectedIds,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error('Error saving rejected movies to cloud:', error);
        throw error;
    }
};

/**
 * Load rejected movies from Firestore
 */
export const loadRejectedFromCloud = async (userId) => {
    if (!userId) return [];

    try {
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            return userDoc.data().rejectedIds || [];
        }
        return [];
    } catch (error) {
        console.error('Error loading rejected movies from cloud:', error);
        throw error;
    }
};

/**
 * Sync all user data to cloud
 */
export const syncToCloud = async (userId, data) => {
    if (!userId) return;

    try {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, {
            library: data.library || [],
            rejectedIds: data.rejectedIds || [],
            soundEnabled: data.soundEnabled ?? true,
            updatedAt: serverTimestamp(),
        }, { merge: true });
    } catch (error) {
        console.error('Error syncing to cloud:', error);
        throw error;
    }
};

/**
 * Load all user data from cloud
 */
export const loadFromCloud = async (userId) => {
    if (!userId) return null;

    try {
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const data = userDoc.data();
            return {
                library: data.library || [],
                rejectedIds: data.rejectedIds || [],
                soundEnabled: data.soundEnabled ?? true,
            };
        }
        return null;
    } catch (error) {
        console.error('Error loading from cloud:', error);
        throw error;
    }
};

/**
 * Create or update user profile
 */
export const updateUserProfile = async (userId, profileData) => {
    if (!userId) return;

    try {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, {
            profile: profileData,
            updatedAt: serverTimestamp(),
        }, { merge: true });
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};
