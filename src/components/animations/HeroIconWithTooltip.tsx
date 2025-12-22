import { animated } from '@react-spring/web';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface HeroIconWithTooltipProps {
    name: string;
    icon: string;
    // We accept the interpolation result directly or a style object
    style: any;
}

export function HeroIconWithTooltip({ name, icon, style }: HeroIconWithTooltipProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Icon with Ripple Physics (Scale/Rotate) */}
            <animated.div
                style={style}
                className="relative w-12 h-12 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 shadow-lg backdrop-blur-sm flex items-center justify-center transition-colors duration-300 group hover:border-primary/50 hover:shadow-primary/20"
            >
                <div className="absolute inset-0 rounded-xl bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
                <img
                    src={icon}
                    alt={name}
                    className="w-6 h-6 object-contain relative z-10 select-none pointer-events-none"
                />
            </animated.div>

            {/* Stable Tooltip (Unaffected by Ripple) */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                        role="tooltip"
                    >
                        <div className="relative px-3 py-1.5 rounded-lg bg-[#0F1523]/95 dark:bg-slate-900/95 border border-white/10 shadow-xl backdrop-blur-md flex items-center justify-center whitespace-nowrap">
                            <span className="text-[12px] font-medium text-white tracking-wide font-sans leading-none">
                                {name}
                            </span>
                            {/* Bottom Arrow */}
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0F1523]/95 dark:bg-slate-900/95 border-b border-r border-white/10 rotate-45" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
