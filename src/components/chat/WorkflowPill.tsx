import { memo } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface WorkflowPillProps {
    id: string;
    source: string;
    destination: string;
    isActive: boolean;
    onClick: () => void;
    className?: string; // Allow extending styles
}

export const WorkflowPill = memo(function WorkflowPill({
    id,
    source,
    destination,
    isActive,
    onClick,
    className,
}: WorkflowPillProps) {
    return (
        <motion.button
            layoutId={`workflow-pill-${id}`} // For potential layout animations
            onClick={onClick}
            className={cn(
                'group relative flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                // Default state (Glassmorphism + Border)
                'bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400',
                // Hover state
                'hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm',
                // Active state (Scale + Shadow + Color)
                isActive &&
                'bg-white dark:bg-slate-900 text-foreground border-primary/20 dark:border-primary/50 shadow-brand-md scale-105 z-10',
                className
            )}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1} // Roving tabindex
            data-id={id}
        >
            {/* Active Indicator Dot */}
            {isActive && (
                <motion.span
                    layoutId="active-dot"
                    className="absolute -top-1 -right-1 flex h-3 w-3"
                >
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </motion.span>
            )}

            {/* Content */}
            <span className="flex items-center gap-1.5 whitespace-nowrap">
                <span>{source}</span>
                <span className={cn("text-slate-300 dark:text-slate-600", isActive && "text-slate-400 dark:text-slate-500")}>
                    →
                </span>
                <span>{destination}</span>
            </span>

            {/* Bottom active gradient line */}
            {isActive && (
                <motion.div
                    layoutId="active-gradient"
                    className="absolute inset-x-4 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"
                />
            )}
        </motion.button>
    );
});
