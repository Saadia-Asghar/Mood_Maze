import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * Cinematic themed button component
 */
export function Button({
    children,
    variant = 'primary',
    size = 'md',
    className,
    disabled,
    onClick,
    ...props
}) {
    const baseStyles = 'font-semibold rounded-lg border-2 border-cinema-gold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';

    const variants = {
        primary: 'bg-gradient-to-r from-cinema-red to-cinema-redLight text-cinema-gold hover:from-cinema-gold hover:to-cinema-goldLight hover:text-cinema-black hover:scale-105 glow-gold-hover shadow-lg',
        secondary: 'bg-transparent text-cinema-gold hover:bg-cinema-gold/20 hover:text-cinema-gold hover:scale-105 border-cinema-gold/50 hover:border-cinema-gold',
        success: 'bg-gradient-to-r from-cinema-green to-cinema-greenLight text-white hover:from-cinema-greenLight hover:to-cinema-green hover:scale-105 border-cinema-green shadow-lg',
        danger: 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 hover:scale-105 border-red-600 shadow-lg',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <motion.button
            className={cn(
                baseStyles,
                variants[variant],
                sizes[size],
                className
            )}
            disabled={disabled}
            onClick={(e) => {
                if (!disabled && onClick) {
                    // Add ripple effect
                    const button = e.currentTarget;
                    const ripple = document.createElement('span');
                    const rect = button.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.cssText = `
                        position: absolute;
                        width: ${size}px;
                        height: ${size}px;
                        border-radius: 50%;
                        background: rgba(255,255,255,0.3);
                        left: ${x}px;
                        top: ${y}px;
                        pointer-events: none;
                        transform: scale(0);
                        animation: ripple 0.6s ease-out;
                    `;
                    
                    button.appendChild(ripple);
                    setTimeout(() => ripple.remove(), 600);
                    
                    onClick(e);
                }
            }}
            whileHover={{ scale: disabled ? 1 : 1.05, y: disabled ? 0 : -2 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            {...props}
        >
            <span className="relative z-10">{children}</span>
            {variant === 'primary' && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cinema-gold/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                />
            )}
        </motion.button>
    );
}

export default Button;
