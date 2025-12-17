import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import {
    User, Heart, Users, Baby,
    Brain, Smile, Zap, Heart as HeartIcon,
    Sofa, Activity, Footprints,
    Film, Disc, Clock, Sparkles
} from 'lucide-react';

// Icon mapping for better visual consistency
const iconMap = {
    '🧘': User,
    '💑': Heart,
    '🎉': Users,
    '👨‍👩‍👧‍👦': Baby,
    '🧠': Brain,
    '😊': Smile,
    '💥': Zap,
    '😢': HeartIcon,
    '🛋️': Sofa,
    '🚶': Activity,
    '🏃': Footprints,
    '📽️': Film,
    '📀': Disc,
    '🎬': Film,
    '⏰': Clock,
    '⭐': Sparkles,
    '⚖️': Activity,
    '🎲': Zap,
};

// Color themes for each option
// Elegant maroon-gold theme
const optionColors = [
    { bg: 'bg-cinema-blackLight/40', border: 'border-cinema-gold/30', hover: 'hover:border-cinema-gold hover:bg-cinema-blackLight/60', selected: 'bg-cinema-gold text-cinema-black border-cinema-gold' },
];

/**
 * Quiz question card component
 */
export function QuestionCard({
    question,
    options,
    selectedOption,
    onSelect,
    questionNumber,
    totalQuestions
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl mx-auto"
        >
            {/* Question number */}
            <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cinema-gold/10 border border-cinema-gold/20 text-cinema-gold text-xs font-semibold tracking-wider uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-cinema-gold animate-pulse" />
                    Question {questionNumber} / {totalQuestions}
                </span>
            </motion.div>

            {/* Question */}
            <motion.h2
                className="text-2xl md:text-3xl font-serif font-bold text-cinema-gold text-center mb-8 drop-shadow-md"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
            >
                {question}
            </motion.h2>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {options.map((option, index) => {
                    const IconComponent = iconMap[option.icon] || Film;
                    // Use uniform styling for professional consistency
                    const colors = optionColors[0];
                    const isSelected = selectedOption === option.value;

                    return (
                        <motion.button
                            key={option.value}
                            onClick={() => {
                                onSelect(option.value);
                                if (navigator.vibrate) {
                                    navigator.vibrate(20); // Subtle tick
                                }
                            }}
                            className={cn(
                                'group relative p-4 rounded-lg border transition-all duration-300 overflow-hidden cursor-pointer text-left h-full flex flex-col',
                                isSelected
                                    ? `${colors.selected} shadow-[0_0_20px_rgba(255,215,0,0.3)] scale-[1.02]`
                                    : `${colors.bg} ${colors.border} text-cinema-gold ${colors.hover}`
                            )}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                        >
                            <div className="flex items-center gap-3 w-full">
                                <div className={cn(
                                    'p-2 rounded-full transition-colors duration-300',
                                    isSelected
                                        ? 'bg-cinema-black/20 text-cinema-black'
                                        : 'bg-cinema-gold/10 text-cinema-gold group-hover:bg-cinema-gold/20'
                                )}>
                                    <IconComponent className="w-5 h-5 flex-shrink-0" />
                                </div>

                                <div className="flex-1">
                                    <div className={cn(
                                        'font-bold text-base leading-tight',
                                        isSelected ? 'text-cinema-black' : 'text-cinema-gold'
                                    )}>
                                        {option.label}
                                    </div>
                                    {option.description && (
                                        <div className={cn(
                                            'text-xs mt-1 leading-relaxed',
                                            isSelected ? 'text-cinema-black/80' : 'text-cinema-gold/60'
                                        )}>
                                            {option.description}
                                        </div>
                                    )}
                                </div>

                                {/* Radio Circle Indicator */}
                                <div className={cn(
                                    'w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-300',
                                    isSelected
                                        ? 'border-cinema-black bg-cinema-black'
                                        : 'border-cinema-gold/30 group-hover:border-cinema-gold/80'
                                )}>
                                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-cinema-gold" />}
                                </div>
                            </div>
                        </motion.button>
                    );
                })}
            </div>
        </motion.div>
    );
}

export default QuestionCard;
