import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, LogOut, User, Cloud, CloudOff } from 'lucide-react';
import { signInWithGoogle, signOut, syncToCloud } from '../../lib/firebaseService';
import { useAuth } from '../../hooks/useAuth';
import useStore from '../../store/useStore';
import { Button } from '../ui/Button';

/**
 * Auth Button Component
 * Shows sign in/out button and user info
 */
export function AuthButton() {
    const { user, loading, firebaseEnabled } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const [syncing, setSyncing] = useState(false);

    const library = useStore(state => state.library);
    const rejectedIds = useStore(state => state.rejectedIds);
    const soundEnabled = useStore(state => state.soundEnabled);

    // Don't show if Firebase is not configured
    if (!firebaseEnabled) {
        return null;
    }

    const handleSignIn = async () => {
        try {
            await signInWithGoogle();
            setShowMenu(false);
        } catch (error) {
            console.error('Sign in error:', error);
            alert('Failed to sign in. Please try again.');
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut();
            setShowMenu(false);
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    const handleSync = async () => {
        if (!user) return;

        try {
            setSyncing(true);
            await syncToCloud(user.uid, {
                library,
                rejectedIds,
                soundEnabled,
            });
            alert('✅ Library synced to cloud!');
        } catch (error) {
            console.error('Sync error:', error);
            alert('❌ Failed to sync. Please try again.');
        } finally {
            setSyncing(false);
        }
    };

    if (loading) {
        return (
            <div className="fixed top-6 left-6 z-50">
                <div className="w-10 h-10 rounded-full bg-cinema-black/80 border-2 border-cinema-gold/30 
                      flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-cinema-gold border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <div className="fixed top-6 left-6 z-50">
            {/* Auth Button */}
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-3 rounded-full bg-cinema-black/80 border-2 border-cinema-gold
                 hover:bg-cinema-gold hover:text-cinema-black transition-all duration-300
                 flex items-center gap-2"
            >
                {user ? (
                    <>
                        {user.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt={user.displayName || 'User'}
                                className="w-6 h-6 rounded-full"
                            />
                        ) : (
                            <User className="w-5 h-5 text-cinema-gold" />
                        )}
                    </>
                ) : (
                    <LogIn className="w-5 h-5 text-cinema-gold" />
                )}
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {showMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-16 left-0 min-w-[250px] bg-cinema-black border-2 border-cinema-gold rounded-lg p-4 shadow-2xl"
                    >
                        {user ? (
                            <>
                                {/* User Info */}
                                <div className="mb-4 pb-4 border-b border-cinema-gold/30">
                                    <div className="flex items-center gap-3 mb-2">
                                        {user.photoURL && (
                                            <img
                                                src={user.photoURL}
                                                alt={user.displayName || 'User'}
                                                className="w-10 h-10 rounded-full border-2 border-cinema-gold"
                                            />
                                        )}
                                        <div>
                                            <p className="text-cinema-gold font-semibold">
                                                {user.displayName || 'User'}
                                            </p>
                                            <p className="text-cinema-gold/60 text-xs">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-cinema-gold/60 text-sm">
                                        <p>{library.length} movies saved</p>
                                    </div>
                                </div>

                                {/* Sync Button */}
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={handleSync}
                                    disabled={syncing}
                                    className="w-full mb-2 flex items-center justify-center gap-2"
                                >
                                    {syncing ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-cinema-gold border-t-transparent rounded-full animate-spin" />
                                            Syncing...
                                        </>
                                    ) : (
                                        <>
                                            <Cloud className="w-4 h-4" />
                                            Sync to Cloud
                                        </>
                                    )}
                                </Button>

                                {/* Sign Out Button */}
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={handleSignOut}
                                    className="w-full flex items-center justify-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </Button>
                            </>
                        ) : (
                            <>
                                {/* Sign In Info */}
                                <div className="mb-4">
                                    <p className="text-cinema-gold text-sm mb-2">
                                        Sign in to sync your library across devices
                                    </p>
                                    <div className="flex items-center gap-2 text-cinema-gold/60 text-xs">
                                        <CloudOff className="w-4 h-4" />
                                        <span>Not synced</span>
                                    </div>
                                </div>

                                {/* Sign In Button */}
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={handleSignIn}
                                    className="w-full flex items-center justify-center gap-2"
                                >
                                    <LogIn className="w-4 h-4" />
                                    Sign in with Google
                                </Button>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default AuthButton;
