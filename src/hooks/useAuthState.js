import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import useStore from '../store/useStore';

/**
 * Custom hook to track Firebase authentication state
 * Syncs with Zustand store for personalized library
 */
export function useAuthState() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const setCurrentUser = useStore(state => state.setCurrentUser);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setCurrentUser(currentUser); // Sync with store
            setLoading(false);
        });

        return () => unsubscribe();
    }, [setCurrentUser]);

    return { user, loading };
}
