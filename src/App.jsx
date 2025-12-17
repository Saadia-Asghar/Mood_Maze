import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Stage } from './components/layout/Stage';
import { Header } from './components/layout/Header';
import { Lobby } from './pages/Lobby';
import { Quiz } from './pages/Quiz';
import { ScreeningRoom } from './pages/ScreeningRoom';
import { Library } from './pages/Library';
import useStore from './store/useStore';

function App() {
    const currentPage = useStore(state => state.currentPage);

    const pageVariants = {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -20, scale: 0.95 }
    };

    const pageTransition = {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.4
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'lobby':
                return <Lobby key="lobby" />;
            case 'quiz':
                return <Quiz key="quiz" />;
            case 'screening':
                return <ScreeningRoom key="screening" />;
            case 'library':
                return <Library key="library" />;
            default:
                return <Lobby key="lobby" />;
        }
    };

    return (
        <Stage>
            <Header />
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentPage}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                    transition={pageTransition}
                >
                    {renderPage()}
                </motion.div>
            </AnimatePresence>
        </Stage>
    );
}

export default App;
