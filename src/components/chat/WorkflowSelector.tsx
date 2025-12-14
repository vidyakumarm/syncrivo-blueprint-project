import { useRef, useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WorkflowPill } from './WorkflowPill';
import { Scenario } from '@/data/chatScenarios';

interface WorkflowSelectorProps {
    scenarios: Scenario[];
    activeScenarioIndex: number;
    onSelect: (index: number) => void;
    className?: string;
}

export function WorkflowSelector({
    scenarios,
    activeScenarioIndex,
    onSelect,
    className,
}: WorkflowSelectorProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    // --- Scroll Management ---
    const checkScroll = () => {
        if (!scrollContainerRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowLeftArrow(scrollLeft > 10);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [scenarios]); // Check when data changes

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    // --- Scroll to Active Selection ---
    useEffect(() => {
        if (scrollContainerRef.current) {
            const activeElement = scrollContainerRef.current.querySelector(
                `[data-id="${scenarios[activeScenarioIndex].id}"]`
            ) as HTMLElement;

            if (activeElement) {
                // Center the active element
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
    }, [activeScenarioIndex, scenarios]);


    // --- Keyboard Navigation (Roving Tabindex) ---
    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            const nextIndex = (index + 1) % scenarios.length;
            onSelect(nextIndex);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const prevIndex = (index - 1 + scenarios.length) % scenarios.length;
            onSelect(prevIndex);
        } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(index);
        }
    };


    return (
        <div className={cn('relative w-full group', className)}>
            {/* Scroll Controls (Left) */}
            <div
                className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-gradient-to-r from-background to-transparent transition-opacity duration-300",
                    !showLeftArrow && "opacity-0 pointer-events-none"
                )}
            >
                <button
                    onClick={() => scroll('left')}
                    className="p-1.5 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 hover:scale-110 transition-transform"
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </button>
            </div>

            {/* Scrollable Container */}
            <div
                ref={scrollContainerRef}
                onScroll={checkScroll}
                className="flex items-center gap-3 overflow-x-auto px-4 py-4 md:px-12 scrollbar-none snap-x snap-mandatory"
                role="tablist"
                aria-label="Messaging Scenarios"
            >
                {scenarios.map((scenario, index) => {
                    // Extract source/destination from label or other data if needed
                    // Assuming label is "Teams ↔ Slack" or similar
                    const parts = scenario.label.split(' ↔ ');
                    const source = parts[0] || scenario.leftPlatform.name;
                    const destination = parts[1] || scenario.rightPlatform.name;

                    return (
                        <div key={scenario.id} className="snap-center">
                            <WorkflowPill
                                id={scenario.id}
                                source={source}
                                destination={destination}
                                isActive={index === activeScenarioIndex}
                                onClick={() => onSelect(index)}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Scroll Controls (Right) */}
            <div
                className={cn(
                    "absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-gradient-to-l from-background to-transparent transition-opacity duration-300",
                    !showRightArrow && "opacity-0 pointer-events-none"
                )}
            >
                <button
                    onClick={() => scroll('right')}
                    className="p-1.5 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 hover:scale-110 transition-transform"
                    aria-label="Scroll right"
                >
                    <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </button>
            </div>
        </div>
    );
}
