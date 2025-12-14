import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface WorkflowDotsProps {
    workflows: { id: string }[];
    activeId: string;
    onSelect: (id: string) => void;
    className?: string;
}

export function WorkflowDots({
    workflows,
    activeId,
    onSelect,
    className,
}: WorkflowDotsProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Keyboard navigation logic
    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            const nextIndex = (index + 1) % workflows.length;
            onSelect(workflows[nextIndex].id);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const prevIndex = (index - 1 + workflows.length) % workflows.length;
            onSelect(workflows[prevIndex].id);
        } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(workflows[index].id);
        }
    };

    // Auto-center active dot
    useEffect(() => {
        if (scrollContainerRef.current) {
            const activeElement = scrollContainerRef.current.querySelector(
                `[data-active="true"]`
            ) as HTMLElement;

            if (activeElement) {
                const container = scrollContainerRef.current;
                const scrollLeft =
                    activeElement.offsetLeft -
                    container.clientWidth / 2 +
                    activeElement.clientWidth / 2;

                container.scrollTo({
                    left: scrollLeft,
                    behavior: 'smooth',
                });
            }
        }
    }, [activeId]);

    return (
        <div
            className={cn(
                'relative w-full flex justify-center',
                className
            )}
        >
            <div
                ref={scrollContainerRef}
                className="flex items-center gap-4 overflow-x-auto px-12 py-6 scrollbar-none snap-x snap-mandatory max-w-full"
                role="tablist"
                aria-label="Workflow Selector"
            >
                {workflows.map((workflow, index) => {
                    const isActive = workflow.id === activeId;

                    return (
                        <button
                            key={workflow.id}
                            onClick={() => onSelect(workflow.id)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="relative group outline-none snap-center flex-shrink-0"
                            role="tab"
                            aria-selected={isActive}
                            aria-label={`Select workflow ${index + 1}`}
                            tabIndex={isActive ? 0 : -1}
                            data-active={isActive}
                        >
                            {/* Hit target extension for better usability */}
                            <div className="absolute -inset-2 bg-transparent" />

                            <div className="relative flex items-center justify-center">
                                {/* Active Glow Ring */}
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-glow"
                                            className="absolute inset-0 rounded-full bg-primary/30 blur-md"
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1.8, opacity: 1 }}
                                            exit={{ scale: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </AnimatePresence>

                                {/* The Dot itself */}
                                <motion.div
                                    className={cn(
                                        "rounded-full transition-colors duration-300",
                                        isActive
                                            ? "bg-primary shadow-[0_0_10px_2px_rgba(99,102,241,0.5)]"
                                            : "bg-slate-300 dark:bg-slate-700 group-hover:bg-slate-400 dark:group-hover:bg-slate-600"
                                    )}
                                    animate={{
                                        width: isActive ? 12 : 8,
                                        height: isActive ? 12 : 8,
                                        scale: isActive ? 1 : 1,
                                    }}
                                    whileHover={{ scale: isActive ? 1.1 : 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30
                                    }}
                                />
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
