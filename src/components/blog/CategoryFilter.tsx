import React, { useRef, useEffect } from 'react';
import type { BlogCategory } from '@/blog/posts';

interface CategoryFilterProps {
    categories: BlogCategory[];
    activeCategory: string;
    onSelect: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, activeCategory, onSelect }) => {
    const allCategories = ['All Insights', ...categories];
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Keyboard navigation helper
    const handleKeyDown = (e: React.KeyboardEvent, cat: string) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(cat === 'All Insights' ? 'All' : cat);
        }
    };

    return (
        <div className="w-full mb-12 border-b border-slate-800 sticky top-0 bg-[#0B0D0F]/95 backdrop-blur-sm z-30 pt-4">
            <div
                ref={scrollContainerRef}
                className="flex items-center gap-8 overflow-x-auto pb-4 no-scrollbar"
                role="tablist"
                aria-label="Blog Categories"
            >
                {allCategories.map((cat) => {
                    const isActive = activeCategory === (cat === 'All Insights' ? 'All' : cat);

                    return (
                        <button
                            key={cat}
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => onSelect(cat === 'All Insights' ? 'All' : cat)}
                            onKeyDown={(e) => handleKeyDown(e, cat)}
                            className={`
                                whitespace-nowrap text-sm font-medium transition-all duration-200 relative pb-1
                                focus:outline-none focus:text-blue-400
                                ${isActive
                                    ? 'text-white'
                                    : 'text-slate-400 hover:text-slate-200'
                                }
                            `}
                        >
                            {cat}
                            {/* Active Underline Indicator */}
                            {isActive && (
                                <span className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-blue-500 rounded-t-full transition-all duration-300" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
