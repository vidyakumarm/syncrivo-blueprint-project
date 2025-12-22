import { useState, useEffect, useRef } from "react";
import { Lock, Layers } from "lucide-react";
import { motion, useTime, useTransform, useMotionValue, useSpring, AnimatePresence, useReducedMotion } from "framer-motion";
import { RippleIcon, RippleEffect } from "@/components/ui/RippleIcon";

// Platform icons
import teamsIcon from "@/assets/brands/teams-official.svg";
import slackIcon from "@/assets/brands/slack-official.svg";
import discordIcon from "@/assets/brands/discord-official.png";
import telegramIcon from "@/assets/brands/telegram-official.svg";
import zoomIcon from "@/assets/zoom-icon.png";
import webexIcon from "@/assets/webex-icon.png";
import googleChatIcon from "@/assets/brands/google-chat-update.png";
import whatsappIcon from "@/assets/brands/whatsapp-official.svg";
import syncrivoHubIcon from "@/assets/brands/syncrivo-hub-official.png";
import mattermostIcon from "@/assets/brands/mattermost-official.svg";
import rocketchatIcon from "@/assets/brands/rocketchat-official.svg";

interface Platform {
    id: string;
    name: string;
    icon: string;
    angle: number;
}

const platforms: Platform[] = [
    { id: "slack", name: "Slack", icon: slackIcon, angle: 0 },
    { id: "teams", name: "Teams", icon: teamsIcon, angle: 36 },
    { id: "googlechat", name: "Google Chat", icon: googleChatIcon, angle: 72 },
    { id: "whatsapp", name: "WhatsApp Business", icon: whatsappIcon, angle: 108 },
    { id: "webex", name: "Cisco Webex", icon: webexIcon, angle: 144 },
    { id: "telegram", name: "Telegram", icon: telegramIcon, angle: 180 },
    { id: "syncrivohub", name: "Arattai", icon: syncrivoHubIcon, angle: 216 },
    { id: "zoom", name: "Zoom", icon: zoomIcon, angle: 252 },
    { id: "mattermost", name: "Mattermost", icon: mattermostIcon, angle: 288 },
    { id: "rocketchat", name: "Rocket.Chat", icon: rocketchatIcon, angle: 324 },
];

export function HeroLoopAnimation({ isVisible }: { isVisible: boolean }) {
    const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);
    const [isHubHovered, setIsHubHovered] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [hubRadius, setHubRadius] = useState(240);
    const [bgRipples, setBgRipples] = useState<{ x: number; y: number; id: number }[]>([]);

    // Physics & Motion
    const containerRef = useRef<HTMLDivElement>(null);
    const time = useTime();

    // Mouse position (Start far away so no initial ripple)
    const mouseX = useMotionValue(9999);
    const mouseY = useMotionValue(9999);

    // Smooth mouse for fluid feeling (Stiffness 400: Instant but fluid response)
    const smoothMouseX = useSpring(mouseX, { stiffness: 400, damping: 25 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 400, damping: 25 });

    useEffect(() => {
        setMounted(true);
        const handleResize = () => {
            if (window.innerWidth >= 1024) setHubRadius(240);
            else if (window.innerWidth >= 640) setHubRadius(180);
            else setHubRadius(140);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            // Calculate mouse position relative to center of container
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            mouseX.set(x);
            mouseY.set(y);
        }
    };

    const handleMouseLeave = () => {
        // Move influence away smoothly
        mouseX.set(9999);
        mouseY.set(9999);
    };

    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const now = Date.now();
            setBgRipples((prev) => [...prev.slice(-4), { x, y, id: now }]); // Keep max 5 ripples
        }
    };

    if (!mounted) return <div className="w-full h-full" />;

    return (
        <div
            role="region"
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden="true"
        >
            <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleContainerClick}
                className="relative w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] lg:w-[580px] lg:h-[580px] pointer-events-auto flex items-center justify-center cursor-pointer"
            >
                {/* Background Glows (Static/Pulse) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[480px] lg:h-[480px] rounded-full border border-slate-200/40 dark:border-slate-700/30 animate-pulse-slow" />
                    <div className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[400px] lg:h-[400px] rounded-full border border-slate-300/30 dark:border-slate-600/20 animate-[pulse-slow_4s_ease-in-out_infinite_1s]" />
                    <div className="w-48 h-48 lg:w-64 lg:h-64 bg-gradient-radial from-primary/20 via-primary/5 to-transparent rounded-full blur-2xl animate-[pulse-glow_3s_ease-in-out_infinite]" />
                </div>

                {/* SVG Lines Layer */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
                    <defs>
                        <linearGradient id="heroLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                        </linearGradient>
                    </defs>
                    {platforms.map((platform) => (
                        <OrbitalLine
                            key={`line-${platform.id}`}
                            platform={platform}
                            time={time}
                            radius={hubRadius}
                            mouseX={smoothMouseX}
                            mouseY={smoothMouseY}
                            hoveredId={hoveredPlatform}
                        />
                    ))}
                </svg>

                {/* Global Background Ripples (Tap anywhere) */}
                <div className="absolute inset-0 overflow-visible rounded-full pointer-events-none">
                    <AnimatePresence mode="popLayout">
                        {bgRipples.map((ripple) => (
                            <RippleEffect key={ripple.id} x={ripple.x} y={ripple.y} />
                        ))}
                    </AnimatePresence>
                </div>

                {/* Packet Layer - Rendered separately to stay 'behind' icons but 'above' lines if needed */}
                <div className="absolute inset-0 pointer-events-none">
                    {platforms.map((platform, index) => (
                        <OrbitalPacket
                            key={`packet-${platform.id}`}
                            platform={platform}
                            time={time}
                            radius={hubRadius}
                            index={index}
                        />
                    ))}
                </div>

                {/* Icons Layer */}
                {platforms.map((platform, index) => (
                    <OrbitalIcon
                        key={platform.id}
                        platform={platform}
                        index={index}
                        time={time}
                        radius={hubRadius}
                        mouseX={smoothMouseX}
                        mouseY={smoothMouseY}
                        isVisible={isVisible}
                        hoveredId={hoveredPlatform}
                        setHoveredId={setHoveredPlatform}
                        isHubHovered={isHubHovered}
                    />
                ))}

                {/* Central Hub (Static) */}
                <CentralHub isVisible={isVisible} onHover={setIsHubHovered} />

            </div>
        </div>
    );
}

// ------------------------------------------------------------------
// Sub-Components for Performance & Encapsulation
// ------------------------------------------------------------------

function useOrbitPosition(
    angleDeg: number,
    radius: number,
    time: any,
    mouseX: any,
    mouseY: any
) {
    // 60s per orbit loop for calm "Enterprise" feel (60000ms)
    // Negative speed for clockwise, Positive for counter-clockwise
    // Current design had clockwise container rotation.
    const shouldReduceMotion = useReducedMotion();

    return useTransform([time, mouseX, mouseY], ([t, mx, my]: any) => {
        // 1. Calculate Standard Orbit Position
        // 35s per orbit loop - Faster "Enterprise" feel (35000ms)
        const orbitSpeed = (2 * Math.PI) / 35000;
        const currentAngle = (angleDeg * Math.PI / 180) + (t * orbitSpeed);

        const orbitX = Math.cos(currentAngle) * radius;
        const orbitY = Math.sin(currentAngle) * radius;

        // If reduced motion, skip physics
        if (shouldReduceMotion === true) {
            return { x: orbitX, y: orbitY, scale: 1, rotate: 0 };
        }

        // 2. Calculate Mouse Interaction (Water Ripple Physics)
        const dx = orbitX - mx;
        const dy = orbitY - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Interaction Radius: Increased to 500 to simulate a shared pool of water
        // This ensures moving the mouse anywhere affects most icons
        const maxDist = 500;

        if (dist < maxDist) {
            // Ripple Influence (0 to 1) - Smoother falloff
            const influence = Math.pow(1 - dist / maxDist, 2);

            // Repulsion Force (Push away) - Subtle but broad
            const repelStrength = 30 * influence;

            // Oscillating Wave Effect
            // t/200 -> Faster wave propagation
            // dist/40 -> Broader wavelengths looking like water rings
            const wavePhase = t / 200 - dist / 40;
            const wave = Math.sin(wavePhase) * (15 * influence);

            // Calculate "Tilt" based on the wave slope to simulate bobbing
            // Derivative-ish approximation for tilt
            const tilt = Math.cos(wavePhase) * (8 * influence);

            // Apply forces
            const dirX = dx / dist;
            const dirY = dy / dist;

            const totalDisplacement = repelStrength + wave;

            return {
                x: orbitX + dirX * totalDisplacement,
                y: orbitY + dirY * totalDisplacement,
                scale: 1 + (influence * 0.15), // Stronger breath
                rotate: tilt // Pass rotation
            };
        }

        return { x: orbitX, y: orbitY, scale: 1, rotate: 0 };
    });
}

const OrbitalLine = ({ platform, time, radius, mouseX, mouseY, hoveredId }: any) => {
    const pos = useOrbitPosition(platform.angle, radius, time, mouseX, mouseY);
    // Extract x/y for SVG lines
    const x2 = useTransform(pos, (p) => `calc(50% + ${p.x}px)`);
    const y2 = useTransform(pos, (p) => `calc(50% + ${p.y}px)`);

    // Check if THIS line is hovered (via platform ID)
    const isHovered = hoveredId === platform.id;

    return (
        <motion.line
            x1="50%"
            y1="50%"
            x2={x2}
            y2={y2}
            stroke="url(#heroLineGradient)"
            strokeWidth={isHovered ? 2 : 1.5}
            strokeDasharray={isHovered ? "0" : "4 4"}
            opacity={isHovered ? 0.8 : 0.4}
            className="transition-[stroke-width,opacity] duration-300"
        />
    );
};

const OrbitalIcon = ({ platform, index, time, radius, mouseX, mouseY, isVisible, hoveredId, setHoveredId, isHubHovered }: any) => {
    const pos = useOrbitPosition(platform.angle, radius, time, mouseX, mouseY);
    const x = useTransform(pos, (p) => p.x);
    const y = useTransform(pos, (p) => p.y);
    const scale = useTransform(pos, (p) => p.scale);
    const rotate = useTransform(pos, (p) => p.rotate);

    const isHovered = hoveredId === platform.id;

    return (
        <motion.div
            style={{
                x,
                y,
                scale,
                rotate,
                // Center the div on its coordinates
                position: "absolute",
                top: "50%",
                left: "50%",
                marginLeft: -24, // Half of w-12
                marginTop: -24,
            }}
            className={`z-10 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
            onMouseEnter={() => setHoveredId(platform.id)}
            onMouseLeave={() => setHoveredId(null)}
        >
            <div className="relative animate-anti-gravity" style={{ animationDelay: `${index * 0.5}s`, animationDuration: `${4 + (index % 3)}s` }}>
                <RippleIcon
                    className={`
                        relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white dark:bg-slate-800 border
                        flex items-center justify-center
                        transition-all duration-300 ease-out group
                        ${isHovered
                            ? "scale-[1.03] -translate-y-0.5 shadow-brand-lg border-primary/30 dark:border-primary/40 z-30"
                            : "border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg"
                        }
                    `}
                    ariaLabel={`${platform.name} integration`}
                >
                    {/* Hub Hover Ripple */}
                    {isHubHovered && (
                        <div className="absolute inset-0 rounded-xl border-2 border-primary/40 bg-primary/5 animate-ripple-effect z-0" />
                    )}

                    {/* Incoming Packet Glow */}
                    <div
                        className="absolute inset-0 rounded-xl animate-receive-glow z-0"
                        style={{
                            animationDelay: `${(index * 0.8) % 3}s`,
                            animationDuration: "3s"
                        }}
                    />

                    {/* Hover Water Ripple */}
                    {isHovered && (
                        <div className="absolute inset-0 rounded-xl bg-primary/20 animate-water-distortion z-0" />
                    )}

                    <img
                        src={platform.icon}
                        alt={platform.name}
                        className={`${platform.id === 'googlechat' ? "w-7 h-7 sm:w-8 sm:h-8" : "w-5 h-5 sm:w-6 sm:h-6"} object-contain transition-all duration-300 relative z-20 ${isHovered ? "opacity-100 scale-110" : "opacity-70"}`}
                    />


                </RippleIcon>

                {/* Tooltip - Moved outside RippleIcon to escape overflow-hidden */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-slate-900/95 dark:bg-slate-800/95 border border-slate-700/50 backdrop-blur-md text-white text-[11px] font-medium whitespace-nowrap z-[100] shadow-xl pointer-events-none"
                        >
                            {platform.name}
                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900/95 rotate-45 border-l border-t border-slate-700/50"></div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

const OrbitalPacket = ({ platform, time, radius, index }: any) => {
    // Packets follow the 'Ideal' orbit to avoid visual jitter, representing 'secure stable pipe'
    // They travel FROM center TO orbit.

    // We reuse the orbit calculation BUT without mouse interaction to keep packets stable
    // Or do we? If the pipe moves (line moves), the packet should probably move with the line.
    // Let's assume packets are separate 'quantum' bits. 

    // NOTE: CSS Animation for packets is complex to replicate purely in Framer Motion without logic duplications.
    // We will use a hybrid: Calculate the 'end point' (Orbital pos) and set it as CSS var.

    // For simplicity and performance, we'll calculate just the BASE orbit position here.
    const orbitSpeed = (2 * Math.PI) / 35000;
    const currentAngle = useTransform(time, (t: number) => (platform.angle * Math.PI / 180) + (t * orbitSpeed));

    const x = useTransform(currentAngle, (a) => Math.cos(a) * radius);
    const y = useTransform(currentAngle, (a) => Math.sin(a) * radius);

    return (
        <motion.div
            style={{
                // @ts-ignore
                "--tx": useTransform(x, v => `${v}px`),
                // @ts-ignore
                "--ty": useTransform(y, v => `${v}px`),
            }}
            className="absolute left-1/2 top-1/2 w-0 h-0"
        >
            <div
                className="absolute -ml-1.5 -mt-1.5 w-2.5 h-2.5 animate-packet z-10"
                style={{
                    animationDelay: `${(index * 0.8) % 3}s`,
                    animationDuration: "3s"
                }}
            >
                <div className="w-full h-full bg-primary rounded-full shadow-[0_0_12px_4px_hsl(var(--primary)/0.6)]" />
            </div>
        </motion.div>
    );
};

const CentralHub = ({ isVisible, onHover }: { isVisible: boolean, onHover: (v: boolean) => void }) => {
    // Glow animation variants for the lock
    const lockGlowVariants = {
        idle: {
            boxShadow: "0 0 0 1px rgba(16, 185, 129, 0.2), 0 0 12px -2px rgba(16, 185, 129, 0.3)",
            scale: 1,
            transition: {
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse" as const,
                ease: "easeInOut" as const
            }
        },
        hover: {
            boxShadow: "0 0 0 1px rgba(52, 211, 153, 0.4), 0 0 20px -2px rgba(52, 211, 153, 0.5)",
            scale: 1,
            transition: { duration: 0.3, ease: "easeOut" as const }
        }
    };

    // Text glow variants
    const textGlowVariants = {
        idle: {
            textShadow: "0 0 8px rgba(16, 185, 129, 0.1)",
            opacity: 0.8,
            transition: {
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse" as const,
                ease: "easeInOut" as const
            }
        },
        hover: {
            textShadow: "0 0 12px rgba(52, 211, 153, 0.3)",
            opacity: 1,
            transition: { duration: 0.3, ease: "easeOut" as const }
        }
    };

    return (
        <div
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
            style={{ transitionDelay: "300ms" }}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
        >
            {/* Anti-Gravity Float - Requested by user */}
            <div className="animate-anti-gravity">
                {/* Stable, motionless container content */}
                <motion.div
                    className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center cursor-default group"
                    initial="idle"
                    whileHover="hover"
                    animate="idle"
                >
                    {/* Static Background Glow - Subtle & Professional */}
                    <div className="absolute inset-0 rounded-full bg-slate-100/5 dark:bg-slate-900/40 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl z-10" />

                    {/* Stable decorative ring (No spin) */}
                    <div className="absolute inset-[3px] rounded-full border border-dashed border-slate-300/50 dark:border-slate-600/30 z-10 opacity-60" />

                    {/* Main Content */}
                    <div className="relative w-full h-full rounded-full flex flex-col items-center justify-center z-20 overflow-visible">
                        <svg width="0" height="0" className="absolute">
                            <defs>
                                <linearGradient id="iconGradientSecure" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#334155" className="dark:stop-color-slate-400" />
                                    <stop offset="100%" stopColor="#475569" className="dark:stop-color-slate-500" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Lock Icon - The Authority Anchor */}
                        <motion.div
                            variants={lockGlowVariants}
                            className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-900/90 to-emerald-950/90 border border-emerald-500/30 flex items-center justify-center z-30 overflow-hidden"
                        >
                            {/* Inner bevel/highlight for "closed" feel */}
                            <div className="absolute inset-0 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" />
                            <Lock className="w-3.5 h-3.5 text-emerald-400/90 drop-shadow-[0_0_2px_rgba(52,211,153,0.5)]" />
                        </motion.div>

                        <div className="flex flex-col items-center relative z-10 mt-1">
                            {/* Icon */}
                            <Layers
                                className="w-10 h-10 text-slate-700 dark:text-slate-300 drop-shadow-sm mb-1.5"
                                strokeWidth={1.5}
                            />

                            {/* Brand */}
                            <span className="text-slate-900 dark:text-slate-100 font-semibold text-lg sm:text-l tracking-tight leading-none mb-1">
                                SyncRivo
                            </span>

                            {/* Badge - Certified, not advertised */}
                            <motion.span
                                variants={textGlowVariants}
                                className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 font-medium tracking-[0.15em] uppercase"
                            >
                                SECURE
                            </motion.span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
