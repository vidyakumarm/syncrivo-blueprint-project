
import { useState, useEffect } from "react";
import { Lock, Layers } from "lucide-react";

// Platform icons - Using official high-quality assets
import teamsIcon from "@/assets/brands/teams-official.svg";
import slackIcon from "@/assets/brands/slack-official.svg";
import discordIcon from "@/assets/brands/discord-official.png";
import telegramIcon from "@/assets/brands/telegram-official.svg";
import zoomIcon from "@/assets/zoom-icon.png";
import webexIcon from "@/assets/webex-icon.png";
import googleChatIcon from "@/assets/google-chat-icon.png";
import signalIcon from "@/assets/brands/signal-official.svg";
import mattermostIcon from "@/assets/brands/mattermost-official.svg";
import rocketchatIcon from "@/assets/brands/rocketchat-official.svg";

interface Platform {
    id: string;
    name: string;
    icon: string;
    angle: number;
}

// 8 platforms for the auth orbit (slightly fewer than hero for smaller space)
const platforms: Platform[] = [
    { id: "slack", name: "Slack", icon: slackIcon, angle: 0 },
    { id: "teams", name: "Teams", icon: teamsIcon, angle: 45 },
    { id: "googlechat", name: "Google Chat", icon: googleChatIcon, angle: 90 },
    { id: "zoom", name: "Zoom", icon: zoomIcon, angle: 135 },
    { id: "discord", name: "Discord", icon: discordIcon, angle: 180 },
    { id: "webex", name: "Webex", icon: webexIcon, angle: 225 },
    { id: "telegram", name: "Telegram", icon: telegramIcon, angle: 270 },
    { id: "signal", name: "Signal", icon: signalIcon, angle: 315 },
];

export function AuthIllustration() {
    const [isVisible, setIsVisible] = useState(false);

    // Smaller radius for auth card (Hero is 140)
    const hubRadius = 100;

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const getPlatformPosition = (angle: number) => {
        const radian = (angle * Math.PI) / 180;
        return {
            x: Math.cos(radian) * hubRadius,
            y: Math.sin(radian) * hubRadius,
        };
    };

    return (
        <div className="relative w-full aspect-square max-w-[320px] mx-auto flex items-center justify-center overflow-visible">
            {/* Background Glows */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent/5 rounded-full blur-2xl animate-pulse-slow" />
            </div>

            {/* Animation Container */}
            <div className={`relative w-[280px] h-[280px] transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>

                {/* ROTATING ORBIT CONTAINER */}
                <div className="absolute inset-0 w-full h-full animate-spin-slow">
                    {/* SVG for connection lines */}
                    <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
                        <defs>
                            <linearGradient id="authLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                            </linearGradient>
                        </defs>

                        {/* Connection lines */}
                        {platforms.map((platform) => {
                            const pos = getPlatformPosition(platform.angle);
                            return (
                                <line
                                    key={platform.id}
                                    x1="50%"
                                    y1="50%"
                                    x2={`calc(50% + ${pos.x}px)`}
                                    y2={`calc(50% + ${pos.y}px)`}
                                    stroke="url(#authLineGradient)"
                                    strokeWidth={1.5}
                                    strokeDasharray="4 4"
                                    opacity={0.4}
                                />
                            );
                        })}
                    </svg>

                    {/* Discrete Data Packets */}
                    <div className="absolute inset-0 pointer-events-none">
                        {platforms.map((platform, index) => {
                            const pos = getPlatformPosition(platform.angle);
                            const randomDelay = (index * 0.8) % 3;

                            return (
                                <div
                                    key={`packet-${platform.id}`}
                                    className="absolute left-1/2 top-1/2 w-2 h-2 -ml-1 -mt-1 animate-packet z-10"
                                    style={{
                                        // @ts-ignore
                                        "--tx": `${pos.x}px`,
                                        "--ty": `${pos.y}px`,
                                        animationDelay: `${randomDelay}s`,
                                        animationDuration: "3s"
                                    }}
                                >
                                    {/* Glowing dot packet */}
                                    <div className="w-full h-full bg-primary rounded-full shadow-[0_0_8px_2px_hsl(var(--primary)/0.6)]" />
                                </div>
                            );
                        })}
                    </div>

                    {/* Platform Icons in orbit */}
                    {platforms.map((platform, index) => {
                        const pos = getPlatformPosition(platform.angle);
                        return (
                            <div
                                key={platform.id}
                                className="absolute left-1/2 top-1/2 z-10"
                                style={{
                                    transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px)`,
                                }}
                            >
                                {/* COUNTER-ROTATE ICON CONTAINER */}
                                <div className="animate-spin-slow-reverse">
                                    <div className="relative w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center">
                                        <img
                                            src={platform.icon}
                                            alt={platform.name}
                                            className="w-5 h-5 object-contain opacity-90"
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Central Hub (Static, Premium Glassmorphism) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="relative w-24 h-24 flex items-center justify-center">

                        {/* Outer breathing glow ring */}
                        <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse-slow" />

                        {/* Rotating technical mesh ring */}
                        <div className="absolute inset-[2px] rounded-full border border-dashed border-primary/30 animate-spin-ultra-slow" />

                        {/* Inner glass core */}
                        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-white/90 to-white/50 dark:from-slate-900/90 dark:to-slate-800/50 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 shadow-xl flex flex-col items-center justify-center z-10 animate-float">

                            {/* SVG Definitions for Icon Gradient */}
                            <svg width="0" height="0" className="absolute">
                                <defs>
                                    <linearGradient id="authIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="hsl(var(--primary))" />
                                        <stop offset="100%" stopColor="hsl(var(--accent))" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Security badge */}
                            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/40 border-2 border-white dark:border-slate-800 z-20">
                                <Lock className="w-3 h-3 text-white" />
                            </div>

                            {/* Logo Content */}
                            <div className="flex flex-col items-center relative z-10">
                                <div className="relative mb-0.5">
                                    <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full animate-pulse-glow" />
                                    <Layers className="w-8 h-8 text-primary relative z-10 drop-shadow-sm" style={{ stroke: "url(#authIconGradient)" }} />
                                </div>
                                <span className="text-foreground font-bold text-sm tracking-tight leading-none">SyncRivo</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
