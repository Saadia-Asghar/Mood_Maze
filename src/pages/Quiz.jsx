import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Heart, Zap, Clock, Dice6, ArrowRight, ArrowLeft } from 'lucide-react';
import { QuestionCard } from '../components/wizard/QuestionCard';
import { ProgressBar } from '../components/wizard/ProgressBar';
import { Button } from '../components/ui/Button';
import useStore from '../store/useStore';

/**
 * Quiz page - The 5 questions
 */
export function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const quizAnswers = useStore(state => state.quizAnswers);
    const setQuizAnswer = useStore(state => state.setQuizAnswer);
    const setCurrentPage = useStore(state => state.setCurrentPage);

    const questions = [
        {
            id: 'social',
            question: 'Who are you watching with?',
            options: [
                { value: 'solo', label: 'Solo', icon: '🧘', description: 'Just me, myself, and I' },
                { value: 'friends', label: 'Friends', icon: '🎉', description: 'Squad hangout' },
                { value: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦', description: 'All ages welcome' },
            ],
        },
        {
            id: 'vibe',
            question: 'What vibe are you looking for?',
            options: [
                { value: 'mind-bending', label: 'Mind-Bending', icon: '🧠', description: 'Twist my reality' },
                { value: 'feel-good', label: 'Feel-Good', icon: '😊', description: 'Warm and fuzzy' },
                { value: 'adrenaline', label: 'Adrenaline', icon: '💥', description: 'Edge of my seat' },
                { value: 'emotional', label: 'Emotional', icon: '😢', description: 'Make me feel something' },
            ],
        },
        {
            id: 'energy',
            question: 'What\'s your energy level?',
            options: [
                { value: 'low', label: 'Low Energy', icon: '🛋️', description: 'Cozy and relaxed' },
                { value: 'medium', label: 'Medium', icon: '🚶', description: 'Balanced pace' },
                { value: 'high', label: 'High Energy', icon: '🏃', description: 'Ready for action' },
            ],
        },
        {
            id: 'era',
            question: 'Which era speaks to you?',
            options: [
                { value: 'classic', label: 'Classic', icon: '📽️', description: 'Before 1990' },
                { value: '90s-2000s', label: '90s-2000s', icon: '📀', description: 'The golden age' },
                { value: 'modern', label: 'Modern', icon: '🎬', description: '2010 and beyond' },
                { value: 'any', label: 'Any Era', icon: '⏰', description: 'Timeless is timeless' },
            ],
        },
        {
            id: 'risk',
            question: 'How adventurous are you feeling?',
            options: [
                { value: 'safe', label: 'Play it Safe', icon: '⭐', description: 'Popular & well-rated' },
                { value: 'balanced', label: 'Balanced', icon: '⚖️', description: 'Mix of known & new' },
                { value: 'high-risk', label: 'High Risk', icon: '🎲', description: 'Hidden gems only' },
            ],
        },
    ];

    const currentQuestionData = questions[currentQuestion];
    const selectedAnswer = quizAnswers[currentQuestionData.id];

    const handleSelect = (value) => {
        setQuizAnswer(currentQuestionData.id, value);
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Quiz complete, go to screening room
            setCurrentPage('screening');
        }
    };

    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        } else {
            setCurrentPage('lobby');
        }
    };

    const canProceed = selectedAnswer !== null;

    // Keyboard navigation
    React.useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Enter' && canProceed) {
                e.preventDefault();
                handleNext();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                handleBack();
            } else if (e.key === 'ArrowRight' && canProceed) {
                e.preventDefault();
                handleNext();
            } else if (e.key >= '1' && e.key <= '4') {
                e.preventDefault();
                const index = parseInt(e.key) - 1;
                if (questions[currentQuestion].options[index]) {
                    handleSelect(questions[currentQuestion].options[index].value);
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [currentQuestion, canProceed]);

    return (
        <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-12">
            <div className="w-full max-w-4xl">
                {/* Progress bar */}
                <ProgressBar current={currentQuestion + 1} total={questions.length} />

                {/* Question card */}
                <AnimatePresence mode="wait">
                    <QuestionCard
                        key={currentQuestionData.id}
                        question={currentQuestionData.question}
                        options={currentQuestionData.options}
                        selectedOption={selectedAnswer}
                        onSelect={handleSelect}
                        questionNumber={currentQuestion + 1}
                        totalQuestions={questions.length}
                    />
                </AnimatePresence>

                {/* Navigation buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-between items-center mt-12 max-w-2xl mx-auto px-4"
                >
                    <Button
                        variant="secondary"
                        onClick={handleBack}
                        className="flex items-center gap-2 group w-32 justify-center"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back
                    </Button>

                    <Button
                        variant="primary"
                        onClick={handleNext}
                        disabled={!canProceed}
                        className="flex items-center gap-2 group relative w-32 justify-center"
                    >
                        {currentQuestion < questions.length - 1 ? (
                            <>
                                Next
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </>
                        ) : (
                            <>
                                Start
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </>
                        )}
                    </Button>
                </motion.div>

                {/* Keyboard hints */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center mt-6"
                >
                    <p className="text-cinema-gold/40 text-xs">
                        💡 Tip: Use number keys (1-4) to select options, arrow keys to navigate
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

export default Quiz;
