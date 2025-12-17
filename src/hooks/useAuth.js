import { useState, useEffect } from 'react';
import { onAuthChange } from '../lib/firebaseService';
import { isFirebaseConfigured } from '../lib/firebase';

/**
 * Custom hook for Firebase authentication
 * Returns current user and loading state
 */
export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [firebaseEnabled, setFirebaseEnabled] = useState(false);

    useEffect(() => {
        // Check if Firebase is configured
        const configured = isFirebaseConfigured();
        setFirebaseEnabled(configured);

        if (!configured) {
            setLoading(false);
            return;
        }

        // Listen to auth state changes
        const unsubscribe = onAuthChange((currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        // Cleanup subscription
        return () => unsubscribe();
    }, []);

    return { user, loading, firebaseEnabled };
}

export default useAuth;
