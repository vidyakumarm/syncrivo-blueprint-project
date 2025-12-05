import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Lock, CheckCircle, Zap, Building2 } from "lucide-react";

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

// Compliance badges
const complianceBadges = [
  { label: "SOC2", tooltip: "SOC 2 Type II Certified" },
  { label: "ISO 27001", tooltip: "ISO 27001 Certified" },
  { label: "GDPR", tooltip: "GDPR Compliant" },
  { label: "HIPAA", tooltip: "HIPAA Ready" },
];

// Placeholder customer logos
const customerLogos = [
  "Acme Corp",
  "TechFlow",
  "DataSync",
  "CloudFirst",
  "SecureNet",
];

export function HeroSection() {
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);
  const [packets, setPackets] = useState<DataPacket[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [hubPulse, setHubPulse] = useState(false);
  const [orbitRotation, setOrbitRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const packetIdRef = useRef(0);

  const hubRadius = 140;

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
      setOrbitRotation((prev) => (prev + 0.1) % 360);
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

    const interval = setInterval(createPacket, 1500);
    setTimeout(createPacket, 300);

    return () => clearInterval(interval);
  }, []);

  // Animate packets
  useEffect(() => {
    const animatePackets = () => {
      setPackets((prev) => prev.map((p) => ({ ...p, progress: p.progress + 1.8 })).filter((p) => p.progress <= 100));
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
    <section className="relative min-h-[calc(100vh-64px)] flex flex-col justify-center overflow-hidden py-12 lg:py-20">
      {/* Premium gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-background to-slate-100/50 dark:from-slate-950 dark:via-background dark:to-slate-900/50" />
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-gradient-radial from-primary/[0.08] via-primary/[0.03] to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-accent/[0.06] via-accent/[0.02] to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Two-Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Content */}
          <div
            className={`space-y-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Enterprise Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Enterprise Communication Platform</span>
            </div>

            {/* Headline */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-bold leading-[1.05] tracking-tight text-foreground">
                The{" "}
                <span className="bg-gradient-to-r from-primary via-primary-600 to-accent bg-clip-text text-transparent">
                  Universal Messaging Layer
                </span>
                {" "}for Every Enterprise.
              </h1>

              <p className="text-lg sm:text-xl lg:text-[1.35rem] text-muted-foreground max-w-xl leading-relaxed">
                Unify Teams, Slack, Google Chat, Zoom, and 20+ platforms into one secure, intelligent communication hub.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="group bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white font-semibold px-8 py-6 text-base shadow-xl shadow-slate-900/20 dark:shadow-white/10 hover:shadow-2xl transition-all duration-300 rounded-xl hover:scale-[1.02]"
              >
                <Link to="/signup">
                  Try SyncRivo Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="group border-2 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 font-semibold px-8 py-6 text-base transition-all duration-300 rounded-xl"
              >
                <Building2 className="mr-2 h-4 w-4" />
                Book an Enterprise Demo
              </Button>
            </div>

            {/* Micro-trust line */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span>No credit card required. Setup in 2 minutes.</span>
            </div>

            {/* Enterprise Trust Row */}
            <div
              className={`pt-6 border-t border-border/50 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
              style={{ transitionDelay: "400ms" }}
            >
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                Trusted by enterprise teams worldwide
              </p>
              
              {/* Customer Logos */}
              <div className="flex flex-wrap items-center gap-6 mb-5">
                {customerLogos.map((logo, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 rounded-lg bg-slate-100/80 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50"
                  >
                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{logo}</span>
                  </div>
                ))}
              </div>

              {/* Compliance Badges */}
              <div className="flex flex-wrap items-center gap-3">
                {complianceBadges.map((badge, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 dark:bg-accent/20 border border-accent/20 dark:border-accent/30"
                    title={badge.tooltip}
                  >
                    <Shield className="w-3 h-3 text-accent" />
                    <span className="text-xs font-semibold text-accent">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Hub Animation */}
          <div
            ref={containerRef}
            className={`flex flex-col items-center justify-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "200ms" }}
          >
            {/* Animation Container */}
            <div className="relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] lg:w-[440px] lg:h-[440px]">
              {/* Outer glow rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-slate-200/40 dark:border-slate-700/30 transition-all duration-1000 ${hubPulse ? "scale-110 opacity-100" : "scale-100 opacity-50"}`}
                />
                <div
                  className={`absolute w-60 h-60 sm:w-68 sm:h-68 rounded-full border border-slate-300/30 dark:border-slate-600/20 transition-all duration-700 ${hubPulse ? "scale-105 opacity-100" : "scale-100 opacity-40"}`}
                />
                {/* Radial glow */}
                <div
                  className={`w-48 h-48 bg-gradient-radial from-primary/20 via-primary/5 to-transparent rounded-full blur-2xl transition-all duration-1000 ${hubPulse ? "scale-130 opacity-100" : "scale-100 opacity-70"}`}
                />
              </div>

              {/* SVG for connection lines and packets */}
              <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
                <defs>
                  <linearGradient id="heroLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
                    <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
                  </linearGradient>
                  <linearGradient id="packetGradient">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" />
                  </linearGradient>
                  <filter id="heroPacketGlow">
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
                      stroke="url(#heroLineGradient)"
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
                    <g key={packet.id} filter="url(#heroPacketGlow)">
                      {/* Outer glow */}
                      <circle
                        cx={`calc(50% + ${pos.x}px)`}
                        cy={`calc(50% + ${pos.y}px)`}
                        r="8"
                        fill="url(#packetGradient)"
                        opacity={0.4}
                      />
                      {/* Inner packet */}
                      <circle
                        cx={`calc(50% + ${pos.x}px)`}
                        cy={`calc(50% + ${pos.y}px)`}
                        r="5"
                        fill="url(#packetGradient)"
                        opacity={0.95}
                      />
                      {/* Lock indicator dot */}
                      <circle
                        cx={`calc(50% + ${pos.x}px)`}
                        cy={`calc(50% + ${pos.y}px)`}
                        r="2"
                        fill="white"
                        opacity={0.8}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Central Hub */}
              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                {/* Main hub with premium glow */}
                <div
                  className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200/80 dark:border-slate-700/60 flex flex-col items-center justify-center transition-all duration-700`}
                  style={{
                    boxShadow: hubPulse
                      ? "0 0 60px hsl(var(--primary) / 0.35), 0 0 100px hsl(var(--primary) / 0.15), 0 25px 50px -12px rgba(0,0,0,0.2)"
                      : "0 0 40px hsl(var(--primary) / 0.2), 0 0 70px hsl(var(--primary) / 0.08), 0 25px 50px -12px rgba(0,0,0,0.15)",
                  }}
                >
                  {/* Security badge */}
                  <div className="absolute -top-2.5 -right-2.5 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/40 border-2 border-white dark:border-slate-900">
                    <Lock className="w-4 h-4 text-white" />
                  </div>

                  {/* Logo */}
                  <div className="flex flex-col items-center">
                    <Zap className="w-8 h-8 text-primary mb-1.5" />
                    <span className="text-foreground font-bold text-xl tracking-tight">SyncRivo</span>
                    <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">
                      Secure Hub
                    </span>
                  </div>
                </div>
              </div>

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
                        relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white dark:bg-slate-800 border 
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
                        className={`w-5 h-5 sm:w-6 sm:h-6 object-contain transition-all duration-300 ${isHovered ? "opacity-100 scale-110" : "opacity-70"}`}
                      />
                      
                      {/* Tooltip */}
                      {isHovered && (
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-slate-900 dark:bg-slate-700 text-white text-xs font-medium whitespace-nowrap">
                          {platform.name}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* +18 more platforms badge */}
            <div
              className={`mt-6 flex items-center gap-3 px-5 py-3 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "700ms" }}
            >
              {/* Mini icon cluster */}
              <div className="flex -space-x-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 border-2 border-white dark:border-slate-800 flex items-center justify-center"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-400 dark:bg-slate-500" />
                  </div>
                ))}
              </div>
              <span className="text-sm text-slate-700 dark:text-slate-300 font-semibold">+18 more platforms</span>
            </div>
          </div>
        </div>

        {/* Security Trust Bar - Bottom */}
        <div
          className={`mt-16 lg:mt-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "800ms" }}
        >
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 px-8 py-6 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-sm">
            {[
              { icon: Lock, text: "End-to-End Encryption" },
              { icon: Shield, text: "Zero-Trust Architecture" },
              { icon: CheckCircle, text: "99.99% Uptime SLA" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center shadow-sm">
                  <item.icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </div>
                <span className="text-slate-700 dark:text-slate-300 font-medium">{item.text}</span>
                {i < 2 && <div className="hidden sm:block w-px h-6 bg-slate-200 dark:bg-slate-700 ml-6" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
