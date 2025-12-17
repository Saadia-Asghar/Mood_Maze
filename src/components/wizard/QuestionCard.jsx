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
const optionColors = [
    { bg: 'from-cinema-blue/20 to-cinema-purple/20', border: 'border-cinema-blue/50', hover: 'hover:border-cinema-blue', selected: 'bg-gradient-to-br from-cinema-blue to-cinema-purple' },
    { bg: 'from-cinema-purple/20 to-cinema-red/20', border: 'border-cinema-purple/50', hover: 'hover:border-cinema-purple', selected: 'bg-gradient-to-br from-cinema-purple to-cinema-red' },
    { bg: 'from-cinema-green/20 to-cinema-blue/20', border: 'border-cinema-green/50', hover: 'hover:border-cinema-green', selected: 'bg-gradient-to-br from-cinema-green to-cinema-blue' },
    { bg: 'from-cinema-orange/20 to-cinema-gold/20', border: 'border-cinema-orange/50', hover: 'hover:border-cinema-orange', selected: 'bg-gradient-to-br from-cinema-orange to-cinema-gold' },
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
            className="w-full max-w-3xl mx-auto"
        >
            {/* Question number */}
            <motion.div 
                className="text-center mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cinema-gold/10 border border-cinema-gold/30 text-cinema-gold text-sm font-semibold">
                    <span className="w-2 h-2 rounded-full bg-cinema-gold animate-pulse" />
                    Question {questionNumber} of {totalQuestions}
                </span>
            </motion.div>

            {/* Question */}
            <motion.h2 
                className="text-3xl md:text-5xl font-serif font-bold text-cinema-gold text-center mb-12 text-shadow-gold"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
            >
                {question}
            </motion.h2>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {options.map((option, index) => {
                    const IconComponent = iconMap[option.icon] || Film;
                    const colors = optionColors[index % optionColors.length];
                    const isSelected = selectedOption === option.value;

                    return (
                        <motion.button
                            key={option.value}
                            onClick={() => {
                                onSelect(option.value);
                                // Add haptic-like feedback
                                if (navigator.vibrate) {
                                    navigator.vibrate(50);
                                }
                            }}
                            className={cn(
                                'group relative p-6 rounded-xl border-2 transition-all duration-300 overflow-hidden cursor-pointer',
                                isSelected
                                    ? `${colors.selected} text-white border-transparent shadow-[0_0_30px_rgba(212,175,55,0.5)]`
                                    : `bg-gradient-to-br ${colors.bg} ${colors.border} text-cinema-gold ${colors.hover} hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]`
                            )}
                            whileHover={{ scale: 1.05, y: -6, rotate: isSelected ? 0 : 1 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ 
                                opacity: 1, 
                                y: 0,
                                scale: isSelected ? 1.02 : 1
                            }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            title={`Press ${index + 1} to select`}
                        >
                            {/* Keyboard shortcut hint */}
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-xs bg-cinema-black/50 px-2 py-1 rounded border border-cinema-gold/30">
                                    {index + 1}
                                </span>
                            </div>
                        {/* Click ripple effect */}
                        {isSelected && (
                            <motion.div
                                className="absolute inset-0 bg-white/30 rounded-xl"
                                initial={{ scale: 0, opacity: 0.8 }}
                                animate={{ scale: 1.5, opacity: 0 }}
                                transition={{ duration: 0.6 }}
                            />
                        )}
                            {/* Shimmer effect */}
                            {!isSelected && (
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: '200%' }}
                                    transition={{ duration: 0.6 }}
                                />
                            )}

                            <div className="relative z-10 flex flex-col items-center gap-4">
                                <motion.div
                                    animate={isSelected ? { 
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 10, -10, 0]
                                    } : {}}
                                    transition={{ duration: 0.5 }}
                                    className={cn(
                                        'p-3 rounded-full',
                                        isSelected 
                                            ? 'bg-white/20 backdrop-blur-sm' 
                                            : 'bg-cinema-black/30 backdrop-blur-sm'
                                    )}
                                >
                                    <IconComponent className={cn(
                                        'w-8 h-8',
                                        isSelected ? 'text-white' : 'text-cinema-gold'
                                    )} />
                                </motion.div>
                                
                                <div className="text-center">
                                    <div className={cn(
                                        'font-bold text-lg mb-2',
                                        isSelected ? 'text-white' : 'text-cinema-gold'
                                    )}>
                                        {option.label}
                                    </div>
                                    {option.description && (
                                        <div className={cn(
                                            'text-sm leading-relaxed',
                                            isSelected ? 'text-white/90' : 'text-cinema-gold/70'
                                        )}>
                                            {option.description}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Selected indicator */}
                            {isSelected && (
                                <motion.div
                                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white flex items-center justify-center"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 500 }}
                                >
                                    <motion.div
                                        className="w-3 h-3 rounded-full bg-cinema-gold"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    />
                                </motion.div>
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </motion.div>
    );
}

export default QuestionCard;
