import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const AnimatedLogo = ({ className = "h-14 w-auto" }: { className?: string }) => {
    // Check for reduced motion preference
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    // Infinity loop path definition
    const correctInfinityPath = "M 30 30 C 30 16 42 16 52.5 26.5 L 57.5 31.5 C 68 42 80 42 80 30 C 80 18 68 18 57.5 28.5 L 52.5 33.5 C 42 44 30 44 30 30 Z";

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {/* Animated Icon */}
            <motion.div
                className="relative w-28 h-14 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
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
                                    times: [0, 0.5, 1]
                                }}
                            />
                            <motion.stop
                                offset="50%"
                                stopColor="#3B82F6"
                                initial={{ stopOpacity: 0.7 }}
                                animate={prefersReducedMotion ? {} : {
                                    stopOpacity: [0.7, 1, 0.7]
                                }}
                                transition={{
                                    duration: 2.5,
                                    ease: "easeInOut",
                                    delay: 0.1,
                                    times: [0, 0.5, 1]
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
                                    times: [0, 0.5, 1]
                                }}
                            />
                        </linearGradient>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Base Path (The Track) - Animated stroke opacity */}
                    <motion.path
                        d={correctInfinityPath}
                        fill="none"
                        stroke="url(#logoGradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ strokeOpacity: 0.5 }}
                        animate={prefersReducedMotion ? { strokeOpacity: 0.8 } : {
                            strokeOpacity: [0.5, 0.95, 0.8]
                        }}
                        transition={{
                            duration: 2.5,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Subtle sheen/pulse effect on the track */}
                    <motion.path
                        d={correctInfinityPath}
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={prefersReducedMotion ? {} : {
                            pathLength: [0.1, 0.2, 0.1],
                            opacity: [0, 0.5, 0],
                            strokeDashoffset: [0, -200]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />

                    {/* Moving Particles (Data Packets) */}
                    <circle r="3" fill="#FFFFFF" filter="url(#glow)">
                        <animateMotion
                            dur="4s"
                            repeatCount="indefinite"
                            path={correctInfinityPath}
                            keyPoints="0;1"
                            keyTimes="0;1"
                            calcMode="linear"
                        />
                    </circle>

                    <circle r="2" fill="#06B6D4" opacity="0.8">
                        <animateMotion
                            dur="4s"
                            begin="1s"
                            repeatCount="indefinite"
                            path={correctInfinityPath}
                            keyPoints="0;1"
                            keyTimes="0;1"
                            calcMode="linear"
                        />
                    </circle>

                    <circle r="2.5" fill="#8B5CF6" opacity="0.9">
                        <animateMotion
                            dur="4s"
                            begin="2.5s"
                            repeatCount="indefinite"
                            path={correctInfinityPath}
                            keyPoints="0;1"
                            keyTimes="0;1"
                            calcMode="linear"
                        />
                    </circle>

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
