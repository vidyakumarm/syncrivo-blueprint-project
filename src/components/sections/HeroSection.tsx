import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Shield, Lock, CheckCircle, Zap } from 'lucide-react';

// Platform icons - 7 unique official icons (no WhatsApp)
import teamsIcon from '@/assets/brands/teams-official.svg';
import slackIcon from '@/assets/brands/slack-official.svg';
import discordIcon from '@/assets/brands/discord-logo.png';
import telegramIcon from '@/assets/brands/telegram-official.svg';
import zoomIcon from '@/assets/zoom-icon.png';
import webexIcon from '@/assets/webex-icon.png';
import googleChatIcon from '@/assets/brands/google-meet.svg';

interface Platform {
  id: string;
  name: string;
  icon: string;
  angle: number;
}

const platforms: Platform[] = [
  { id: 'slack', name: 'Slack', icon: slackIcon, angle: 0 },
  { id: 'teams', name: 'Teams', icon: teamsIcon, angle: 51.4 },
  { id: 'discord', name: 'Discord', icon: discordIcon, angle: 102.8 },
  { id: 'googlechat', name: 'Google Chat', icon: googleChatIcon, angle: 154.3 },
  { id: 'telegram', name: 'Telegram', icon: telegramIcon, angle: 205.7 },
  { id: 'zoom', name: 'Zoom', icon: zoomIcon, angle: 257.1 },
  { id: 'webex', name: 'Webex', icon: webexIcon, angle: 308.6 },
];

interface DataPacket {
  id: number;
  fromPlatform: string;
  progress: number;
  toHub: boolean;
}

// Trust logos (grayscale with hover color)
const trustLogos = [
  { name: 'Fortune 500', text: 'Fortune 500' },
  { name: 'Enterprise', text: 'Enterprise Ready' },
  { name: 'GDPR', text: 'GDPR Compliant' },
  { name: 'ISO', text: 'ISO 27001' },
  { name: 'SOC2', text: 'SOC 2 Type II' },
];

export function HeroSection() {
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);
  const [packets, setPackets] = useState<DataPacket[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [hubPulse, setHubPulse] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const packetIdRef = useRef(0);
  
  const hubRadius = 150;

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Hub pulse every 3-4 seconds
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setHubPulse(true);
      setTimeout(() => setHubPulse(false), 800);
    }, 3500);
    return () => clearInterval(pulseInterval);
  }, []);

  // Generate data packets
  useEffect(() => {
    const createPacket = () => {
      const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];
      const toHub = Math.random() > 0.5;
      
      setPackets(prev => {
        const newPackets = [...prev, {
          id: packetIdRef.current++,
          fromPlatform: randomPlatform.id,
          progress: 0,
          toHub,
        }];
        return newPackets.slice(-4);
      });
    };

    const interval = setInterval(createPacket, 1800);
    setTimeout(createPacket, 400);

    return () => clearInterval(interval);
  }, []);

  // Animate packets
  useEffect(() => {
    const animatePackets = () => {
      setPackets(prev => 
        prev
          .map(p => ({ ...p, progress: p.progress + 1.5 }))
          .filter(p => p.progress <= 100)
      );
    };

    const animationFrame = setInterval(animatePackets, 35);
    return () => clearInterval(animationFrame);
  }, []);

  const getPlatformPosition = (angle: number) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: Math.cos(radian) * hubRadius,
      y: Math.sin(radian) * hubRadius,
    };
  };

  const getPacketPosition = (packet: DataPacket) => {
    const platform = platforms.find(p => p.id === packet.fromPlatform);
    if (!platform) return { x: 0, y: 0 };
    
    const platformPos = getPlatformPosition(platform.angle);
    const progress = packet.toHub ? packet.progress / 100 : 1 - packet.progress / 100;
    
    return {
      x: platformPos.x * (1 - progress),
      y: platformPos.y * (1 - progress),
    };
  };

  return (
    <section className="relative min-h-[calc(100vh-64px)] flex flex-col justify-center overflow-hidden pt-20 pb-8">
      {/* Premium gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-background to-slate-50/80 dark:from-slate-950 dark:via-background dark:to-slate-950/80" />
        <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-gradient-radial from-primary/[0.06] via-primary/[0.02] to-transparent rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-radial from-slate-400/[0.04] via-slate-400/[0.01] to-transparent rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Centered Badge - with proper spacing */}
        <div 
          className={`flex justify-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '50ms' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 shadow-sm">
            <Shield className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Enterprise-Grade Security
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left Side - Text Content (Centered) */}
          <div className={`space-y-6 text-center lg:text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Headline - Enterprise typography */}
            <div className="space-y-5">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-bold leading-[1.1] tracking-tight text-foreground">
                Your Unified Messaging Hub for{' '}
                <span className="bg-gradient-to-r from-slate-700 via-slate-600 to-slate-500 dark:from-slate-300 dark:via-slate-400 dark:to-slate-500 bg-clip-text text-transparent">
                  Teams, Slack & Google Chat
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed font-light">
                Sync conversations securely across platforms — reliable, compliant, and effortless. Trusted by enterprise teams worldwide.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-1">
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
                className="group border-2 border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 font-semibold px-8 py-6 text-base transition-all duration-300 rounded-xl"
              >
                <Play className="mr-2 h-4 w-4" />
                Request a Demo
              </Button>
            </div>

            {/* Quick trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
              {[
                'No credit card required',
                '14-day free trial',
                'Setup in 5 minutes'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Secure Hub Animation */}
          <div 
            ref={containerRef} 
            className={`flex flex-col items-center justify-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
            {/* Animation Container */}
            <div className="relative w-[380px] h-[380px] sm:w-[420px] sm:h-[420px]">
              {/* Outer glow rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`absolute w-64 h-64 rounded-full border border-slate-200/50 dark:border-slate-700/30 transition-all duration-700 ${hubPulse ? 'scale-110 opacity-100' : 'scale-100 opacity-60'}`} />
                <div className={`absolute w-52 h-52 rounded-full border border-slate-300/40 dark:border-slate-600/20 transition-all duration-500 ${hubPulse ? 'scale-105 opacity-100' : 'scale-100 opacity-50'}`} />
                <div className={`w-44 h-44 bg-gradient-radial from-primary/15 via-primary/5 to-transparent rounded-full blur-2xl transition-all duration-700 ${hubPulse ? 'scale-125 opacity-90' : 'scale-100 opacity-60'}`} />
              </div>

              {/* SVG for connection lines and packets */}
              <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
                <defs>
                  <linearGradient id="heroLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                  </linearGradient>
                  <filter id="heroPacketGlow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
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
                      strokeDasharray="4 6"
                      opacity={isHovered ? 0.7 : 0.35}
                      className="transition-all duration-300"
                    />
                  );
                })}
                
                {/* Data packets */}
                {packets.map((packet) => {
                  const pos = getPacketPosition(packet);
                  return (
                    <g key={packet.id} filter="url(#heroPacketGlow)">
                      <circle
                        cx={`calc(50% + ${pos.x}px)`}
                        cy={`calc(50% + ${pos.y}px)`}
                        r="5"
                        fill="hsl(var(--primary))"
                        opacity={0.9}
                      />
                      <circle
                        cx={`calc(50% + ${pos.x}px)`}
                        cy={`calc(50% + ${pos.y}px)`}
                        r="3"
                        fill="white"
                        opacity={0.6}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Central Hub */}
              <div 
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                {/* Main hub */}
                <div 
                  className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 border border-slate-200/80 dark:border-slate-700/60 shadow-2xl flex flex-col items-center justify-center transition-all duration-500`}
                  style={{
                    boxShadow: hubPulse 
                      ? '0 0 50px hsl(var(--primary) / 0.25), 0 25px 50px -12px rgba(0,0,0,0.15)'
                      : '0 0 30px hsl(var(--primary) / 0.12), 0 25px 50px -12px rgba(0,0,0,0.1)'
                  }}
                >
                  {/* Secure badge */}
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <Lock className="w-3.5 h-3.5 text-white" />
                  </div>
                  
                  {/* Logo */}
                  <div className="flex flex-col items-center">
                    <Zap className="w-7 h-7 text-primary mb-1" />
                    <span className="text-foreground font-bold text-lg tracking-tight">SyncRivo</span>
                    <span className="text-[9px] text-muted-foreground font-medium tracking-wider uppercase">Secure Hub</span>
                  </div>
                </div>
              </div>

              {/* Platform Icons */}
              {platforms.map((platform, index) => {
                const pos = getPlatformPosition(platform.angle);
                const isHovered = hoveredPlatform === platform.id;
                const delay = 400 + index * 50;
                
                return (
                  <div
                    key={platform.id}
                    className={`absolute left-1/2 top-1/2 z-10 transition-all duration-500 ${
                      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
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
                        relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white dark:bg-slate-800 border 
                        flex items-center justify-center cursor-pointer
                        transition-all duration-300 ease-out
                        ${isHovered 
                          ? 'scale-115 -translate-y-1.5 shadow-xl border-primary/30 dark:border-primary/40' 
                          : 'border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg'
                        }
                      `}
                    >
                      <img 
                        src={platform.icon} 
                        alt={platform.name} 
                        className={`w-6 h-6 sm:w-7 sm:h-7 object-contain transition-all duration-300 ${isHovered ? 'opacity-100 scale-110' : 'opacity-75'}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* +18 more platforms badge */}
            <div 
              className={`mt-4 flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '700ms' }}
            >
              {/* Mini icon cluster */}
              <div className="flex -space-x-1.5">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500" />
                  </div>
                ))}
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">+18 more platforms</span>
            </div>
          </div>
        </div>

        {/* Trust Logos Row */}
        <div 
          className={`mt-12 lg:mt-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '900ms' }}
        >
          <p className="text-center text-sm text-muted-foreground mb-6 font-medium">Trusted by security-conscious enterprises</p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {trustLogos.map((logo, i) => (
              <div 
                key={i}
                className="group px-4 py-2 rounded-lg transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"
              >
                <span className="text-sm font-semibold text-slate-400 dark:text-slate-600 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300 tracking-wide">
                  {logo.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Security Trust Indicators */}
        <div 
          className={`mt-8 flex flex-col items-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 px-8 py-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60">
            {[
              { icon: Lock, text: 'End-to-End Encryption' },
              { icon: Shield, text: 'Zero-Trust Architecture' },
              { icon: CheckCircle, text: 'SOC 2 Compliant' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </div>
                <span className="text-slate-700 dark:text-slate-300 font-medium">{item.text}</span>
                {i < 2 && <div className="hidden sm:block w-px h-5 bg-slate-200 dark:bg-slate-700 ml-4" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
