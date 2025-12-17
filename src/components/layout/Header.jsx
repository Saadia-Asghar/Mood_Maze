import React from 'react';
import { Film, Library, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import useStore from '../../store/useStore';

/**
 * Header component with navigation
 */
export function Header() {
    const currentPage = useStore(state => state.currentPage);
    const setCurrentPage = useStore(state => state.setCurrentPage);
    const library = useStore(state => state.library);

    const navItems = [
        { id: 'lobby', label: 'Home', icon: Home },
        { id: 'library', label: 'My Library', icon: Library, badge: library.length },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-cinema-black/95 backdrop-blur-md border-b-2 border-cinema-gold/40 shadow-[0_4px_20px_rgba(212,175,55,0.2)]">
            <div className="container mx-auto px-4 py-4">
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
                        <h1 className="text-2xl font-serif font-bold text-cinema-gold text-shadow-gold group-hover:text-shadow-gold">
                            MoodMaze
                        </h1>
                    </motion.div>

                    {/* Navigation */}
                    <nav className="flex items-center gap-4">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentPage === item.id;

                            return (
                                <motion.button
                                    key={item.id}
                                    onClick={() => setCurrentPage(item.id)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 relative
                    ${isActive
                                            ? 'bg-gradient-to-r from-cinema-gold to-cinema-goldLight text-cinema-black shadow-lg'
                                            : 'text-cinema-gold hover:bg-cinema-gold/20 hover:border-cinema-gold/50 border-2 border-transparent'
                                        }`}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Icon className={`w-5 h-5 ${isActive ? 'drop-shadow-md' : ''}`} />
                                    <span className="font-semibold">{item.label}</span>

                                    {/* Badge */}
                                    {item.badge > 0 && (
                                        <motion.span 
                                            className="absolute -top-2 -right-2 bg-gradient-to-br from-cinema-red to-cinema-redLight text-white text-xs font-bold 
                                   rounded-full w-6 h-6 flex items-center justify-center border-2 border-cinema-gold shadow-lg"
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
                </div>
            </div>
        </header>
    );
}

export default Header;
