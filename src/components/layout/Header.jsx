import React, { useState } from 'react';
import { Film, Library, Home, Search, Volume2, VolumeX, LogIn, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../../store/useStore';
import { signInWithGoogle, signOut, auth } from '../../lib/firebase';
import { useAuthState } from '../../hooks/useAuthState';

/**
 * Header component with navigation, search, sound toggle, and auth
 */
export function Header() {
    const currentPage = useStore(state => state.currentPage);
    const setCurrentPage = useStore(state => state.setCurrentPage);
    const library = useStore(state => state.library);
    const soundEnabled = useStore(state => state.soundEnabled);
    const toggleSound = useStore(state => state.toggleSound);

    const [showUserMenu, setShowUserMenu] = useState(false);
    const { user, loading } = useAuthState();

    const navItems = [
        { id: 'lobby', label: 'Home', icon: Home },
        { id: 'library', label: 'My Library', icon: Library, badge: library.length },
    ];


    const handleSignIn = async () => {
        console.log('🖱️ Sign In button clicked!');
        try {
            console.log('Calling signInWithGoogle...');
            const user = await signInWithGoogle();
            console.log('Sign in completed successfully:', user);
        } catch (error) {
            console.error('❌ Sign in error in Header:', error);
        }
    };


    const handleSignOut = async () => {
        try {
            await signOut();
            setShowUserMenu(false);
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-cinema-black/95 backdrop-blur-md border-b-2 border-cinema-gold/40 shadow-[0_4px_20px_rgba(255,215,0,0.2)]">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => setCurrentPage('lobby')}
                        whileHover={{ scale: 1.05 }}
                    >
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Film className="w-8 h-8 text-cinema-gold drop-shadow-lg" />
                        </motion.div>
                        <h1 className="text-2xl font-serif font-bold text-cinema-gold">
                            MoodMaze
                        </h1>
                    </motion.div>

                    {/* Right Side: Navigation + Actions */}
                    <div className="flex items-center gap-3">
                        {/* Navigation */}
                        <nav className="flex items-center gap-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = currentPage === item.id;

                                return (
                                    <motion.button
                                        key={item.id}
                                        onClick={() => setCurrentPage(item.id)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 relative
                                            ${isActive
                                                ? 'bg-gradient-to-r from-cinema-gold to-cinema-goldLight text-cinema-black shadow-lg'
                                                : 'text-cinema-gold hover:bg-cinema-gold/20 border-2 border-transparent'
                                            }`}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Icon className={`w-5 h-5 ${isActive ? 'drop-shadow-md' : ''}`} />
                                        <span className="font-semibold hidden sm:inline">{item.label}</span>

                                        {/* Badge */}
                                        {item.badge > 0 && (
                                            <motion.span
                                                className="absolute -top-1 -right-1 bg-gradient-to-br from-cinema-red to-cinema-redLight text-white text-xs font-bold 
                                                   rounded-full w-5 h-5 flex items-center justify-center border-2 border-cinema-gold shadow-lg"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                whileHover={{ scale: 1.2 }}
                                            >
                                                {item.badge}
                                            </motion.span>
                                        )}
                                    </motion.button>
                                );
                            })}
                        </nav>

                        {/* Divider */}
                        <div className="h-8 w-px bg-cinema-gold/30" />

                        {/* Search Button */}
                        <motion.button
                            onClick={() => setCurrentPage('library')}
                            className="p-2.5 rounded-lg text-cinema-gold hover:bg-cinema-gold/20 border-2 border-transparent hover:border-cinema-gold/50 transition-all"
                            whileHover={{ scale: 1.1, rotate: 15 }}
                            whileTap={{ scale: 0.9 }}
                            title="Search Movies"
                        >
                            <Search className="w-5 h-5" />
                        </motion.button>

                        {/* Sound Toggle */}
                        <motion.button
                            onClick={toggleSound}
                            className={`p-2.5 rounded-lg transition-all border-2 ${soundEnabled
                                ? 'text-cinema-gold bg-cinema-gold/10 border-cinema-gold/50'
                                : 'text-cinema-gold/50 border-transparent hover:border-cinema-gold/30'
                                }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title={soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}
                        >
                            <AnimatePresence mode="wait">
                                {soundEnabled ? (
                                    <motion.div
                                        key="on"
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        exit={{ scale: 0, rotate: 180 }}
                                    >
                                        <Volume2 className="w-5 h-5" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="off"
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        exit={{ scale: 0, rotate: 180 }}
                                    >
                                        <VolumeX className="w-5 h-5" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        {/* Auth Button */}
                        {loading ? (
                            <div className="w-10 h-10 rounded-full bg-cinema-gold/20 animate-pulse" />
                        ) : user ? (
                            <div className="relative">
                                <motion.button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-cinema-gold/20 to-cinema-goldDark/20 border-2 border-cinema-gold/50 hover:border-cinema-gold transition-all"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt={user.displayName} className="w-7 h-7 rounded-full border-2 border-cinema-gold" />
                                    ) : (
                                        <User className="w-5 h-5 text-cinema-gold" />
                                    )}
                                    <span className="text-cinema-gold font-semibold hidden md:inline text-sm">{user.displayName?.split(' ')[0]}</span>
                                </motion.button>

                                {/* User Menu Dropdown */}
                                <AnimatePresence>
                                    {showUserMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                            className="absolute right-0 mt-2 w-48 bg-cinema-blackLight border-2 border-cinema-gold/50 rounded-lg shadow-[0_0_30px_rgba(255,215,0,0.3)] overflow-hidden"
                                        >
                                            <div className="p-3 border-b border-cinema-gold/30">
                                                <p className="text-cinema-gold font-semibold text-sm">{user.displayName}</p>
                                                <p className="text-cinema-gold/60 text-xs truncate">{user.email}</p>
                                            </div>
                                            <button
                                                onClick={handleSignOut}
                                                className="w-full flex items-center gap-2 px-4 py-3 text-cinema-gold hover:bg-cinema-gold/20 transition-all"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                <span className="text-sm font-semibold">Sign Out</span>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <motion.button
                                onClick={handleSignIn}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cinema-gold to-cinema-goldLight text-cinema-black font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(255,215,0,0.5)] transition-all"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <LogIn className="w-5 h-5" />
                                <span className="hidden sm:inline">Sign In</span>
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
