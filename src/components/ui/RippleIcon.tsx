
import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface RippleIconProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    ariaLabel?: string;
}

interface Ripple {
    x: number;
    y: number;
    id: number;
}

export function RippleIcon({ children, className, onClick, onMouseEnter, onMouseLeave, ariaLabel }: RippleIconProps) {
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    // Throttle ripple creation to avoid chaos if mouse moves rapidly
    const lastRippleTime = useRef(0);

    const addRipple = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const now = Date.now();
        // Allow new ripple every 200ms (faster for snappier feel)
        if (now - lastRippleTime.current < 200 && lastRippleTime.current !== 0) return;

        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const newRipple = { x, y, id: now };
            setRipples((prev) => [...prev.slice(-2), newRipple]); // Keep max 3 ripples in state
            lastRippleTime.current = now;
        }
    }, []);

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        addRipple(e);
        onMouseEnter?.();
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative overflow-hidden cursor-pointer select-none",
                "transform-gpu translate-z-0", // Force GPU promotion
                className
            )}
            onMouseEnter={handleMouseEnter}
            onMouseMove={addRipple}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            role="button"
            aria-label={ariaLabel}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onClick?.();
                }
            }}
        >
            {/* Content Layer - Z-Index higher than ripples */}
            <div className="relative z-10 pointer-events-none">
                {children}
            </div>

            {/* Ripple Layer */}
            <AnimatePresence mode="popLayout">
                {ripples.map((ripple) => (
                    <RippleEffect key={ripple.id} x={ripple.x} y={ripple.y} />
                ))}
            </AnimatePresence>

            {/* Permanent Glow Ring on Hover (CSS triggers this on parent hover) */}
            <div className="absolute inset-0 rounded-xl border-2 border-indigo-400/0 opacity-0 transition-all duration-500 group-hover:border-indigo-400/20 group-hover:opacity-100 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] pointer-events-none" />
        </div>
    );
}

export const RippleEffect = ({ x, y }: { x: number; y: number }) => {
    return (
        <>
            {/* Wave 1: Main Expansion */}
            <motion.div
                initial={{ width: 0, height: 0, opacity: 0.8, x: x, y: y }}
                animate={{
                    width: 120,
                    height: 120,
                    opacity: 0,
                    x: x - 60, // Center the circle (half of max width)
                    y: y - 60
                }}
                exit={{ opacity: 0 }}
                transition={{
                    duration: 0.4,
                    ease: "easeOut"
                }}
                className="absolute rounded-full pointer-events-none z-0"
                style={{
                    background: "radial-gradient(circle, rgba(160,180,255,0.25) 0%, rgba(120,140,255,0.1) 40%, transparent 70%)",
                    boxShadow: "0 0 8px 2px rgba(120,140,255,0.1)",
                    filter: "blur(2px)",
                }}
            />

            {/* Wave 2: Delayed Secondary Echo for "water" feel */}
            <motion.div
                initial={{ width: 0, height: 0, opacity: 0.5, x: x, y: y }}
                animate={{
                    width: 90,
                    height: 90,
                    opacity: 0,
                    x: x - 45,
                    y: y - 45
                }}
                transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: 0.05
                }}
                className="absolute rounded-full pointer-events-none z-0 border border-indigo-400/20"
            />
        </>
    );
};
