import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Badge component for tags and labels
 */
export function Badge({ children, variant = 'default', className }) {
    const variants = {
        default: 'bg-cinema-gold/20 text-cinema-gold border-cinema-gold',
        success: 'bg-cinema-green/20 text-cinema-green border-cinema-green',
        danger: 'bg-red-600/20 text-red-400 border-red-600',
        info: 'bg-blue-600/20 text-blue-400 border-blue-600',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border',
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    );
}

export default Badge;
