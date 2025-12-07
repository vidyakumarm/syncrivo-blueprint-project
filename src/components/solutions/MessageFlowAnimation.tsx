import { useState, useEffect, useRef } from 'react';
import { Shield, Lock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

// Platform icons
import teamsIcon from "@/assets/brands/teams-official.svg";
import slackIcon from "@/assets/brands/slack-official.svg";
import discordIcon from "@/assets/brands/discord-logo.png";
import telegramIcon from "@/assets/brands/telegram-official.svg";
import zoomIcon from "@/assets/zoom-icon.png";
import webexIcon from "@/assets/webex-icon.png";
import googleChatIcon from "@/assets/brands/google-meet.svg";
import signalIcon from "@/assets/brands/signal-official.svg";
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
  { id: "zoom", name: "Zoom", icon: zoomIcon, angle: 108 },
  { id: "discord", name: "Discord", icon: discordIcon, angle: 144 },
  { id: "telegram", name: "Telegram", icon: telegramIcon, angle: 180 },
  { id: "webex", name: "Webex", icon: webexIcon, angle: 216 },
  { id: "signal", name: "Signal", icon: signalIcon, angle: 252 },
  { id: "mattermost", name: "Mattermost", icon: mattermostIcon, angle: 288 },
  { id: "rocketchat", name: "Rocket.Chat", icon: rocketchatIcon, angle: 324 },
];

interface DataPacket {
  id: number;
  fromPlatform: string;
  progress: number;
  toHub: boolean;
}

interface MessageFlowAnimationProps {
  primaryPlatform?: 'teams' | 'slack' | 'google';
}

export function MessageFlowAnimation({ primaryPlatform = 'teams' }: MessageFlowAnimationProps) {
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);
  const [packets, setPackets] = useState<DataPacket[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [hubPulse, setHubPulse] = useState(false);
  const [orbitRotation, setOrbitRotation] = useState(0);
  const packetIdRef = useRef(0);

  const hubRadius = 120;

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Hub pulse every 4 seconds
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setHubPulse(true);
      setTimeout(() => setHubPulse(false), 1000);
    }, 4000);
    return () => clearInterval(pulseInterval);
  }, []);

  // Slow orbit rotation
  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setOrbitRotation((prev) => (prev + 0.08) % 360);
    }, 50);
    return () => clearInterval(rotationInterval);
  }, []);

  // Generate data packets
  useEffect(() => {
    const createPacket = () => {
      const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];
      const toHub = Math.random() > 0.5;

      setPackets((prev) => {
        const newPackets = [
          ...prev,
          {
            id: packetIdRef.current++,
            fromPlatform: randomPlatform.id,
            progress: 0,
            toHub,
          },
        ];
        return newPackets.slice(-5);
      });
    };

    const interval = setInterval(createPacket, 1800);
    setTimeout(createPacket, 500);

    return () => clearInterval(interval);
  }, []);

  // Animate packets
  useEffect(() => {
    const animatePackets = () => {
      setPackets((prev) => prev.map((p) => ({ ...p, progress: p.progress + 1.6 })).filter((p) => p.progress <= 100));
    };

    const animationFrame = setInterval(animatePackets, 30);
    return () => clearInterval(animationFrame);
  }, []);

  const getPlatformPosition = (angle: number) => {
    const radian = ((angle + orbitRotation) * Math.PI) / 180;
    return {
      x: Math.cos(radian) * hubRadius,
      y: Math.sin(radian) * hubRadius,
    };
  };

  const getPacketPosition = (packet: DataPacket) => {
    const platform = platforms.find((p) => p.id === packet.fromPlatform);
    if (!platform) return { x: 0, y: 0 };

    const platformPos = getPlatformPosition(platform.angle);
    const progress = packet.toHub ? packet.progress / 100 : 1 - packet.progress / 100;

    return {
      x: platformPos.x * (1 - progress),
      y: platformPos.y * (1 - progress),
    };
  };

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-background to-slate-100/50 dark:from-slate-950 dark:via-background dark:to-slate-900/50 rounded-3xl" />
      <div className="absolute inset-0 bg-gradient-radial from-primary/[0.06] via-primary/[0.02] to-transparent rounded-3xl" />

      {/* Animation Container */}
      <div 
        className={`relative w-full h-full flex items-center justify-center transition-all duration-700 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Outer glow rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`absolute w-64 h-64 rounded-full border border-slate-200/40 dark:border-slate-700/30 transition-all duration-1000 ${hubPulse ? "scale-110 opacity-100" : "scale-100 opacity-50"}`}
          />
          <div
            className={`absolute w-52 h-52 rounded-full border border-slate-300/30 dark:border-slate-600/20 transition-all duration-700 ${hubPulse ? "scale-105 opacity-100" : "scale-100 opacity-40"}`}
          />
          {/* Radial glow */}
          <div
            className={`absolute w-40 h-40 bg-gradient-radial from-primary/20 via-primary/5 to-transparent rounded-full blur-2xl transition-all duration-1000 ${hubPulse ? "scale-130 opacity-100" : "scale-100 opacity-70"}`}
          />
        </div>

        {/* SVG for connection lines and packets */}
        <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id="solutionLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.35" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="solutionPacketGradient">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
            <filter id="solutionPacketGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
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
                stroke="url(#solutionLineGradient)"
                strokeWidth={isHovered ? 2.5 : 1.5}
                strokeDasharray="6 8"
                opacity={isHovered ? 0.8 : 0.4}
                className="transition-all duration-300"
              />
            );
          })}

          {/* Data packets with encryption icon effect */}
          {packets.map((packet) => {
            const pos = getPacketPosition(packet);
            return (
              <g key={packet.id} filter="url(#solutionPacketGlow)">
                {/* Outer glow */}
                <circle
                  cx={`calc(50% + ${pos.x}px)`}
                  cy={`calc(50% + ${pos.y}px)`}
                  r="7"
                  fill="url(#solutionPacketGradient)"
                  opacity={0.4}
                />
                {/* Inner packet */}
                <circle
                  cx={`calc(50% + ${pos.x}px)`}
                  cy={`calc(50% + ${pos.y}px)`}
                  r="4"
                  fill="url(#solutionPacketGradient)"
                  opacity={0.95}
                />
                {/* Lock indicator dot */}
                <circle
                  cx={`calc(50% + ${pos.x}px)`}
                  cy={`calc(50% + ${pos.y}px)`}
                  r="1.5"
                  fill="white"
                  opacity={0.8}
                />
              </g>
            );
          })}
        </svg>

        {/* Central Hub */}
        <motion.div
          className={`absolute z-20 transition-all duration-500 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Main hub with premium glow */}
          <div
            className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200/80 dark:border-slate-700/60 flex flex-col items-center justify-center transition-all duration-700"
            style={{
              boxShadow: hubPulse
                ? "0 0 50px hsl(var(--primary) / 0.35), 0 0 80px hsl(var(--primary) / 0.15), 0 20px 40px -10px rgba(0,0,0,0.2)"
                : "0 0 30px hsl(var(--primary) / 0.2), 0 0 60px hsl(var(--primary) / 0.08), 0 20px 40px -10px rgba(0,0,0,0.15)",
            }}
          >
            {/* Security badge */}
            <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/40 border-2 border-white dark:border-slate-900">
              <Lock className="w-3.5 h-3.5 text-white" />
            </div>

            {/* Logo */}
            <div className="flex flex-col items-center">
              <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-primary mb-1" />
              <span className="text-foreground font-bold text-base sm:text-lg tracking-tight">SyncRivo</span>
              <span className="text-[9px] sm:text-[10px] text-muted-foreground font-medium tracking-wider uppercase">
                Secure Hub
              </span>
            </div>
          </div>
        </motion.div>

        {/* Platform Icons in orbit */}
        {platforms.map((platform, index) => {
          const pos = getPlatformPosition(platform.angle);
          const isHovered = hoveredPlatform === platform.id;
          const delay = 400 + index * 40;

          return (
            <div
              key={platform.id}
              className={`absolute left-1/2 top-1/2 z-10 transition-all duration-300 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
              style={{
                transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px)`,
                transitionDelay: `${delay}ms`,
              }}
              onMouseEnter={() => setHoveredPlatform(platform.id)}
              onMouseLeave={() => setHoveredPlatform(null)}
            >
              <div
                className={`
                  relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-slate-800 border 
                  flex items-center justify-center cursor-pointer
                  transition-all duration-300 ease-out
                  ${
                    isHovered
                      ? "scale-125 -translate-y-1 shadow-xl border-primary/40 dark:border-primary/50 z-30"
                      : "border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg"
                  }
                `}
              >
                <img
                  src={platform.icon}
                  alt={platform.name}
                  className={`w-4 h-4 sm:w-5 sm:h-5 object-contain transition-all duration-300 ${isHovered ? "opacity-100 scale-110" : "opacity-70"}`}
                />
                
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-slate-900 dark:bg-slate-700 text-white text-[10px] font-medium whitespace-nowrap z-50">
                    {platform.name}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* +More platforms badge */}
        <motion.div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {/* Mini icon cluster */}
          <div className="flex -space-x-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 border-2 border-white dark:border-slate-800 flex items-center justify-center"
              >
                <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500" />
              </div>
            ))}
          </div>
          <span className="text-xs text-slate-700 dark:text-slate-300 font-semibold">+18 more</span>
        </motion.div>

        {/* Security Trust Indicators */}
        <motion.div 
          className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-4 text-xs text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Lock className="w-3 h-3 text-slate-600 dark:text-slate-400" />
            </div>
            <span className="text-slate-600 dark:text-slate-400 font-medium">E2E Encrypted</span>
          </div>
          <div className="w-px h-4 bg-slate-200 dark:bg-slate-700" />
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Shield className="w-3 h-3 text-slate-600 dark:text-slate-400" />
            </div>
            <span className="text-slate-600 dark:text-slate-400 font-medium">Zero-Trust</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
