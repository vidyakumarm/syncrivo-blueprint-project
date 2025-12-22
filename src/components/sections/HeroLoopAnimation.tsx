import { useState, useEffect } from "react";
import { Lock, Layers } from "lucide-react";
import { useTranslationWithFallback } from "@/hooks/useTranslationWithFallback";
import { RippleIcon } from "@/components/ui/RippleIcon";

// Platform icons - Using official high-quality assets
import teamsIcon from "@/assets/brands/teams-official.svg";
import slackIcon from "@/assets/brands/slack-official.svg";
import discordIcon from "@/assets/brands/discord-official.png";
import telegramIcon from "@/assets/brands/telegram-official.svg";
import zoomIcon from "@/assets/zoom-icon.png";
import webexIcon from "@/assets/webex-icon.png";
import googleChatIcon from "@/assets/google-chat-icon.png"; // Use PNG for Chat if SVG is Meet
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

// 10 platforms for the orbit
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
    // console.log removed - was placed before variables were defined

    const [hubRadius, setHubRadius] = useState(160);

    useEffect(() => {
        setMounted(true);
        const handleResize = () => {
            // Adjust radius based on screen size - matched to CSS width/height
            if (window.innerWidth >= 1024) {
                setHubRadius(240);
            } else if (window.innerWidth >= 640) {
                setHubRadius(180);
            } else {
                setHubRadius(140);
            }
        };

        handleResize(); // Initial call
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getPlatformPosition = (angle: number) => {
        const radian = (angle * Math.PI) / 180;
        return {
            x: Math.cos(radian) * hubRadius,
            y: Math.sin(radian) * hubRadius,
        };
    };

    // Render nothing until mounted on client to prevent hydration mismatch
    if (!mounted) {
        return <div className="w-full h-full" />; // Return empty placeholder of same size
    }

    return (
        <div role="region" className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            {/* Pointer events re-enabled for interactive elements inside */}
            <div className="relative w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] lg:w-[580px] lg:h-[580px] pointer-events-auto">
                {/* Outer glow rings - scaled up */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div
                        className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[480px] lg:h-[480px] rounded-full border border-slate-200/40 dark:border-slate-700/30 animate-pulse-slow"
                    />
                    <div
                        className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[400px] lg:h-[400px] rounded-full border border-slate-300/30 dark:border-slate-600/20 animate-[pulse-slow_4s_ease-in-out_infinite_1s]"
                    />
                    {/* Radial glow */}
                    <div
                        className="w-48 h-48 lg:w-64 lg:h-64 bg-gradient-radial from-primary/20 via-primary/5 to-transparent rounded-full blur-2xl animate-[pulse-glow_3s_ease-in-out_infinite]"
                    />
                </div>

                {/* ROTATING ORBIT CONTAINER */}
                <div className="absolute inset-0 w-full h-full animate-spin-slow">
                    {/* SVG for connection lines */}
                    <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
                        <defs>
                            <linearGradient id="heroLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                            </linearGradient>
                        </defs>

                        {/* Connection lines */}
                        {platforms.map((platform) => {
                            const pos = getPlatformPosition(platform.angle);
                            const isHovered = hoveredPlatform === platform.id;
                            return (
                                <line
                                    key={platform.id}
                                    x1="50%"
                                    y1="50%"
                                    x2={`calc(50% + ${pos.x}px)`}
                                    y2={`calc(50% + ${pos.y}px)`}
                                    stroke="url(#heroLineGradient)"
                                    strokeWidth={isHovered ? 2 : 1.5}
                                    strokeDasharray={isHovered ? "0" : "4 4"}
                                    opacity={isHovered ? 0.8 : 0.4}
                                    className="transition-all duration-300"
                                />
                            );
                        })}
                    </svg>

                    {/* Discrete Data Packets (CSS Animation) */}
                    <div className="absolute inset-0 pointer-events-none">
                        {platforms.map((platform, index) => {
                            const pos = getPlatformPosition(platform.angle);
                            // Single packet per line for clean enterprise look
                            const randomDelay = (index * 0.8) % 3;

                            return (
                                <div
                                    key={`packet-${platform.id}`}
                                    className="absolute left-1/2 top-1/2 w-2.5 h-2.5 -ml-1.5 -mt-1.5 animate-packet z-10"
                                    style={{
                                        // @ts-ignore
                                        "--tx": `${pos.x}px`,
                                        "--ty": `${pos.y}px`,
                                        animationDelay: `${randomDelay}s`,
                                        animationDuration: "3s"
                                    }}
                                >
                                    {/* Glowing dot packet */}
                                    <div className="w-full h-full bg-primary rounded-full shadow-[0_0_12px_4px_hsl(var(--primary)/0.6)]" />
                                </div>
                            );
                        })}
                    </div>

                    {/* Platform Icons in orbit */}
                    {platforms.map((platform, index) => {
                        const pos = getPlatformPosition(platform.angle);
                        const isHovered = hoveredPlatform === platform.id;
                        const delay = index * 40;

                        return (
                            <div
                                key={platform.id}
                                className={`absolute left-1/2 top-1/2 z-10 transition-all duration-300 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                                    }`}
                                style={{
                                    transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px)`,
                                    transitionDelay: `${400 + delay}ms`,
                                }}
                                onMouseEnter={() => setHoveredPlatform(platform.id)}
                                onMouseLeave={() => setHoveredPlatform(null)}
                            >
                                {/* COUNTER-ROTATE ICON CONTAINER */}
                                <div className="animate-spin-slow-reverse">
                                    <div
                                        className="relative animate-anti-gravity"
                                        style={{
                                            animationDelay: `${index * 0.5}s`,
                                            animationDuration: `${4 + (index % 3)}s`
                                        }}
                                    >
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
                                            {/* Hub Hover Ripple Reaction */}
                                            {isHubHovered && (
                                                <div className="absolute inset-0 rounded-xl border-2 border-primary/40 bg-primary/5 animate-ripple-effect z-0" />
                                            )}

                                            {/* Incoming Packet Glow - Synchronized with packet travel */}
                                            <div
                                                className="absolute inset-0 rounded-xl animate-receive-glow z-0"
                                                style={{
                                                    animationDelay: `${(index * 0.8) % 3}s`,
                                                    animationDuration: "3s"
                                                }}
                                            />

                                            {/* Hover Water Ripple Effect */}
                                            {isHovered && (
                                                <div className="absolute inset-0 rounded-xl bg-primary/20 animate-water-distortion z-0" />
                                            )}

                                            <img
                                                src={platform.icon}
                                                alt={platform.name}
                                                className={`${platform.id === 'googlechat' ? "w-7 h-7 sm:w-8 sm:h-8" : "w-5 h-5 sm:w-6 sm:h-6"} object-contain transition-all duration-300 relative z-20 ${isHovered ? "opacity-100 scale-110" : "opacity-70"}`}
                                            />

                                            {/* Tooltip */}
                                            {isHovered && (
                                                <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-lg bg-slate-900/95 dark:bg-slate-800/95 border border-slate-700/50 backdrop-blur-md text-white text-[10px] font-medium whitespace-nowrap z-50 shadow-xl animate-in fade-in slide-in-from-top-1 duration-200">
                                                    {platform.name}
                                                    {/* Little arrow */}
                                                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900/95 rotate-45 border-l border-t border-slate-700/50"></div>
                                                </div>
                                            )}
                                        </RippleIcon>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Central Hub (Static in center, does not rotate) */}
                <div
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
                        }`}
                    style={{ transitionDelay: "300ms" }}
                >
                    {/* Floating Wrapper for the entire Hub */}
                    <div className="animate-anti-gravity">
                        {/* Main hub with premium glassmorphism and depth */}
                        <RippleIcon
                            className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center cursor-pointer group"
                            onMouseEnter={() => setIsHubHovered(true)}
                            onMouseLeave={() => setIsHubHovered(false)}
                            ariaLabel="SyncRivo Secure Hub"
                        >

                            {/* Outer breathing glow ring */}
                            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse-slow group-hover:bg-primary/30 transition-colors" />

                            {/* Rotating technical mesh ring */}
                            <div className="absolute inset-[2px] rounded-full border border-dashed border-primary/30 animate-spin-ultra-slow" />

                            {/* Inner glass core */}
                            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-white/90 to-white/50 dark:from-slate-900/90 dark:to-slate-800/50 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 shadow-2xl flex flex-col items-center justify-center z-10">

                                {/* SVG Definitions for Icon Gradient */}
                                <svg width="0" height="0" className="absolute">
                                    <defs>
                                        <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="hsl(var(--primary))" />
                                            <stop offset="100%" stopColor="hsl(var(--accent))" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                {/* Security badge integrated into rim */}
                                <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/40 border-2 border-white dark:border-slate-800 z-20 animate-bounce-subtle">
                                    <Lock className="w-3.5 h-3.5 text-white" />
                                </div>

                                {/* Logo Content */}
                                <div className="flex flex-col items-center relative z-10">
                                    <div className="relative mb-1">
                                        <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full animate-pulse-glow" />
                                        {/* Replaced Zap with Layers for "Universal Messaging Layer" semantics */}
                                        <Layers className="w-10 h-10 text-primary relative z-10 drop-shadow-sm" style={{ stroke: "url(#iconGradient)" }} />
                                    </div>
                                    <span className="text-foreground font-bold text-lg sm:text-xl tracking-tight leading-none">SyncRivo</span>
                                    <span className="text-[10px] text-muted-foreground font-semibold tracking-[0.2em] uppercase mt-1">
                                        SECURE
                                    </span>
                                </div>
                            </div>
                        </RippleIcon>
                    </div>
                </div>

            </div>
        </div>
    );
}

