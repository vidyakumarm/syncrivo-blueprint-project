import { motion, useTime, useTransform, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { shapePaths, strokeWidths, dimensionalSequence, getShapeByContext, type ShapeKey } from "@/utils/shapePaths";
import { useTheme } from "@/components/theme-provider";

const particleSpeed = 5; // Duration in seconds for particle animation

interface AnimatedLogoProps {
    className?: string;
    isNavigationActive?: boolean;
    forceShape?: ShapeKey;
    scrollProgress?: number;
    isNavHovered?: boolean;
    isCtaHovered?: boolean;
}

export const AnimatedLogo = ({
    className = "h-14 w-auto",
    isNavigationActive = false,
    forceShape,
    scrollProgress = 0,
    isNavHovered = false,
    isCtaHovered = false
}: AnimatedLogoProps) => {
    // Check for reduced motion preference
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [flowDirection, setFlowDirection] = useState(1);

    // 8D Depth Technique #4: Theme-aware flow direction
    const { theme } = useTheme();
    const gradientDirection = theme === 'dark' ? 1 : -1; // Dark: forward, Light: reverse

    // Shape morphing state
    const [currentShape, setCurrentShape] = useState<ShapeKey>('infinity');
    const sequenceIndexRef = useRef(0);
    const morphTimeoutRef = useRef<NodeJS.Timeout>();

    // Time-based animation for spatial drift
    const time = useTime();

    // Subtle spatial drift (±5px on X/Y) - pauses on hover
    const driftX = useTransform(time, (t) => {
        if (isHovered || prefersReducedMotion) return 0;
        return Math.sin(t / 5000) * 5; // 10s cycle
    });

    const driftY = useTransform(time, (t) => {
        if (isHovered || prefersReducedMotion) return 0;
        return Math.cos(t / 5000) * 5; // 10s cycle
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    // Bidirectional energy flow - reverses every 12s
    useEffect(() => {
        if (prefersReducedMotion) return;

        const interval = setInterval(() => {
            setFlowDirection(prev => prev * -1);
        }, 12000);

        return () => clearInterval(interval);
    }, [prefersReducedMotion]);

    // Context-aware shape selection
    useEffect(() => {
        if (prefersReducedMotion) {
            setCurrentShape('infinity');
            return;
        }

        const targetShape = getShapeByContext({
            forceShape,
            isNavHovered,
            scrollProgress,
            isCtaHovered
        });

        // Only morph if shape actually changed
        if (targetShape !== currentShape) {
            setCurrentShape(targetShape);
        }
    }, [forceShape, isNavHovered, scrollProgress, isCtaHovered, currentShape, prefersReducedMotion]);

    // Auto-loop sequence when idle (no context forcing a specific shape)
    useEffect(() => {
        if (prefersReducedMotion || isHovered) {
            // Clear any pending morphs when paused
            if (morphTimeoutRef.current) {
                clearTimeout(morphTimeoutRef.current);
            }
            return;
        }

        // Only pause auto-loop if context is ACTIVELY changing the shape
        const hasActiveContext = forceShape || isNavHovered || isCtaHovered || scrollProgress > 0.3;

        if (hasActiveContext) {
            // Clear auto-loop when context takes over
            if (morphTimeoutRef.current) {
                clearTimeout(morphTimeoutRef.current);
            }
            return;
        }

        const runMorphSequence = () => {
            sequenceIndexRef.current = (sequenceIndexRef.current + 1) % dimensionalSequence.length;
            const nextShape = dimensionalSequence[sequenceIndexRef.current];
            setCurrentShape(nextShape);

            // Schedule next morph: 2.0s morph + 2-3s hold + ~11s wait = ~16s total
            morphTimeoutRef.current = setTimeout(runMorphSequence, 16000);
        };

        // Start the sequence after initial 16s
        morphTimeoutRef.current = setTimeout(runMorphSequence, 16000);

        return () => {
            if (morphTimeoutRef.current) {
                clearTimeout(morphTimeoutRef.current);
            }
        };
    }, [prefersReducedMotion, isHovered, forceShape, isNavHovered, isCtaHovered, scrollProgress > 0.3]);

    // Navigation-aware adjustments
    const glowIntensity = 1;

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {/* Animated Icon with Spatial Drift and Shape Morphing */}
            <motion.div
                className="relative w-28 h-14 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                    x: driftX,
                    y: driftY,
                }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                <svg
                    viewBox="0 0 110 60"
                    className="w-full h-full overflow-visible"
                >
                    <defs>
                        {/* Animated gradient for the logo icon */}
                        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <motion.stop
                                offset="0%"
                                stopColor="#8B5CF6"
                                initial={{ stopOpacity: 0.6 }}
                                animate={prefersReducedMotion ? {} : {
                                    stopOpacity: [0.6, 1, 0.6]
                                }}
                                transition={{
                                    duration: 2.5,
                                    ease: "easeInOut",
                                    times: [0, 0.5, 1],
                                    repeat: Infinity
                                }}
                            />
                            <motion.stop
                                offset="50%"
                                stopColor="#3B82F6"
                                initial={{ stopOpacity: 0.7 }}
                                animate={prefersReducedMotion ? {} : {
                                    stopOpacity: [0.7, 1 * glowIntensity, 0.7]
                                }}
                                transition={{
                                    duration: 2.5,
                                    ease: "easeInOut",
                                    delay: 0.1,
                                    times: [0, 0.5, 1],
                                    repeat: Infinity
                                }}
                            />
                            <motion.stop
                                offset="100%"
                                stopColor="#06B6D4"
                                initial={{ stopOpacity: 0.6 }}
                                animate={prefersReducedMotion ? {} : {
                                    stopOpacity: [0.6, 1, 0.6]
                                }}
                                transition={{
                                    duration: 2.5,
                                    ease: "easeInOut",
                                    delay: 0.2,
                                    times: [0, 0.5, 1],
                                    repeat: Infinity
                                }}
                            />
                        </linearGradient>

                        {/* 8D Depth Technique #2: Directional Gradient Along Path */}
                        <linearGradient id="dimensionalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <motion.stop
                                offset="0%"
                                stopColor="hsl(var(--primary))"
                                animate={{
                                    offset: gradientDirection > 0 ? ['0%', '20%', '0%'] : ['100%', '80%', '100%']
                                }}
                                transition={{
                                    duration: 4,
                                    ease: "easeInOut",
                                    repeat: Infinity
                                }}
                            />
                            <motion.stop
                                offset="50%"
                                stopColor="hsl(var(--primary) / 0.85)"
                                animate={{
                                    stopOpacity: [0.85, 1, 0.85]
                                }}
                                transition={{
                                    duration: 3,
                                    ease: "easeInOut",
                                    repeat: Infinity
                                }}
                            />
                            <motion.stop
                                offset="100%"
                                stopColor="hsl(var(--primary) / 0.6)"
                                animate={{
                                    offset: gradientDirection > 0 ? ['100%', '80%', '100%'] : ['0%', '20%', '0%']
                                }}
                                transition={{
                                    duration: 4,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                    delay: 0.5
                                }}
                            />
                        </linearGradient>

                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation={isNavigationActive ? 2.5 : 2} result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Shape-Morphing Path - Core Logo with Depth Illusion */}
                    <motion.path
                        d={shapePaths.infinity} // Start with infinity
                        animate={{
                            d: shapePaths[currentShape], // Morph to current shape
                            strokeWidth: strokeWidths[currentShape], // 8D Depth Technique #1
                            strokeOpacity: prefersReducedMotion ? 0.8 : 1
                        }}
                        transition={{
                            d: {
                                duration: 2.0,
                                ease: [0.55, 0.06, 0.01, 0.99],
                            },
                            strokeWidth: {
                                duration: 2.0,
                                ease: [0.55, 0.06, 0.01, 0.99]
                            },
                            strokeOpacity: {
                                duration: 0.3
                            }
                        }}
                        fill="none"
                        stroke="url(#dimensionalGradient)" // Use dimensional gradient
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* 8D Depth Technique #3: Traveling Glow (Directional Energy) */}
                    {!prefersReducedMotion && (
                        <motion.path
                            d={shapePaths.infinity}
                            animate={{
                                d: shapePaths[currentShape],
                                strokeDashoffset: gradientDirection > 0 ? [0, -100] : [0, 100],
                                opacity: [0, 0.9, 0.9, 0]
                            }}
                            transition={{
                                d: {
                                    duration: 2.0,
                                    ease: [0.55, 0.06, 0.01, 0.99],
                                },
                                strokeDashoffset: {
                                    duration: 3.5,
                                    repeat: Infinity,
                                    ease: "linear"
                                },
                                opacity: {
                                    duration: 3.5,
                                    repeat: Infinity,
                                    times: [0, 0.1, 0.9, 1]
                                }
                            }}
                            fill="none"
                            stroke="white"
                            strokeWidth={strokeWidths[currentShape] * 0.4} // Thinner glow
                            strokeLinecap="round"
                            strokeDasharray="8 92" // Small dash travels along path
                            style={{ filter: 'blur(1px)' }}
                        />
                    )}

                    {/* Moving Particles (Data Packets) with Bidirectional Flow */}
                    {!prefersReducedMotion && (
                        <>
                            <circle r="3" fill="#FFFFFF" filter="url(#glow)">
                                <animateMotion
                                    dur={`${particleSpeed}s`}
                                    repeatCount="indefinite"
                                    path={shapePaths[currentShape]}
                                    keyPoints={flowDirection > 0 ? "0;1" : "1;0"}
                                    keyTimes="0;1"
                                    calcMode="linear"
                                />
                            </circle>

                            <circle r="2" fill="#06B6D4" opacity="0.8">
                                <animateMotion
                                    dur={`${particleSpeed}s`}
                                    begin="1s"
                                    repeatCount="indefinite"
                                    path={shapePaths[currentShape]}
                                    keyPoints={flowDirection > 0 ? "0;1" : "1;0"}
                                    keyTimes="0;1"
                                    calcMode="linear"
                                />
                            </circle>

                            <circle r="2.5" fill="#8B5CF6" opacity="0.9">
                                <animateMotion
                                    dur={`${particleSpeed}s`}
                                    begin="2.5s"
                                    repeatCount="indefinite"
                                    path={shapePaths[currentShape]}
                                    keyPoints={flowDirection > 0 ? "0;1" : "1;0"}
                                    keyTimes="0;1"
                                    calcMode="linear"
                                />
                            </circle>
                        </>
                    )}

                </svg>
            </motion.div>

            {/* Text with animated gradient */}
            <div className="flex flex-col justify-center">
                <motion.span
                    className="text-3xl font-semibold tracking-tight relative overflow-hidden"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{
                        background: prefersReducedMotion
                            ? "linear-gradient(to bottom, white, rgba(255, 255, 255, 0.7))"
                            : undefined,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent"
                    }}
                >
                    {!prefersReducedMotion && (
                        <motion.span
                            className="absolute inset-0"
                            style={{
                                background: "linear-gradient(90deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)",
                                backgroundSize: "200% 100%",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                color: "transparent"
                            }}
                            initial={{ backgroundPosition: "100% 0%" }}
                            animate={{
                                backgroundPosition: ["100% 0%", "0% 0%", "0% 0%"]
                            }}
                            transition={{
                                duration: 2.2,
                                ease: "easeInOut",
                                delay: 0.3,
                                times: [0, 0.7, 1]
                            }}
                        >
                            SyncRivo
                        </motion.span>
                    )}
                    <span
                        className={prefersReducedMotion ? "" : "opacity-0"}
                        style={prefersReducedMotion ? {
                            background: "linear-gradient(to bottom, white, rgba(255, 255, 255, 0.7))",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            color: "transparent"
                        } : undefined}
                    >
                        SyncRivo
                    </span>
                </motion.span>
            </div>
        </div>
    );
};
