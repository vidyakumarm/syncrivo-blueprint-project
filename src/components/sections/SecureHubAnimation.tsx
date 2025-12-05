import { useState, useEffect, useRef } from 'react';
import { Shield, Lock } from 'lucide-react';

// Platform icons - 8 unique official icons
import teamsIcon from '@/assets/brands/teams-official.svg';
import slackIcon from '@/assets/brands/slack-official.svg';
import discordIcon from '@/assets/brands/discord-official.png';
import whatsappIcon from '@/assets/brands/whatsapp-official.svg';
import telegramIcon from '@/assets/brands/telegram-official.svg';
import zoomIcon from '@/assets/zoom-icon.png';
import webexIcon from '@/assets/webex-icon.png';
import googleChatIcon from '@/assets/brands/google-meet.svg';

interface Platform {
  id: string;
  name: string;
  icon: string;
  angle: number; // Position angle around the hub (in degrees)
}

const platforms: Platform[] = [
  { id: 'slack', name: 'Slack', icon: slackIcon, angle: 0 },
  { id: 'teams', name: 'Teams', icon: teamsIcon, angle: 45 },
  { id: 'discord', name: 'Discord', icon: discordIcon, angle: 90 },
  { id: 'googlechat', name: 'Google Chat', icon: googleChatIcon, angle: 135 },
  { id: 'whatsapp', name: 'WhatsApp', icon: whatsappIcon, angle: 180 },
  { id: 'telegram', name: 'Telegram', icon: telegramIcon, angle: 225 },
  { id: 'zoom', name: 'Zoom', icon: zoomIcon, angle: 270 },
  { id: 'webex', name: 'Webex', icon: webexIcon, angle: 315 },
];

interface DataPacket {
  id: number;
  fromPlatform: string;
  progress: number;
  toHub: boolean;
}

export function SecureHubAnimation() {
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);
  const [packets, setPackets] = useState<DataPacket[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const packetIdRef = useRef(0);
  
  const hubRadius = 140; // Distance from center to platform icons

  // Intersection Observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
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
        return newPackets.slice(-4); // Keep only 4 packets max for cleaner look
      });
    };

    const interval = setInterval(createPacket, 1500);
    setTimeout(createPacket, 200);
    setTimeout(createPacket, 800);

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

    const animationFrame = setInterval(animatePackets, 40);
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
    <div ref={containerRef} className="w-full flex flex-col items-center py-8 sm:py-12">
      {/* Security badge */}
      <div 
        className={`flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <Shield className="w-4 h-4 text-emerald-500" />
        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
          Enterprise-Grade Encryption
        </span>
      </div>

      {/* Main Radial Container */}
      <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px]">
        {/* SVG for connection lines and packets */}
        <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="secureLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(160, 60%, 45%)" stopOpacity="0.15" />
              <stop offset="50%" stopColor="hsl(200, 60%, 50%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(160, 60%, 45%)" stopOpacity="0.15" />
            </linearGradient>
            <filter id="packetGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Connection lines from each platform to center */}
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
                stroke="url(#secureLineGradient)"
                strokeWidth={isHovered ? 1.5 : 1}
                strokeDasharray="6 6"
                opacity={isHovered ? 0.6 : 0.3}
                className="transition-all duration-300"
              />
            );
          })}
          
          {/* Animated data packets */}
          {packets.map((packet) => {
            const pos = getPacketPosition(packet);
            return (
              <g key={packet.id} filter="url(#packetGlow)">
                <circle
                  cx={`calc(50% + ${pos.x}px)`}
                  cy={`calc(50% + ${pos.y}px)`}
                  r="3"
                  fill="hsl(160, 60%, 50%)"
                  opacity={0.9}
                />
                <circle
                  cx={`calc(50% + ${pos.x}px)`}
                  cy={`calc(50% + ${pos.y}px)`}
                  r="1.5"
                  fill="white"
                  opacity={0.7}
                />
              </g>
            );
          })}
        </svg>

        {/* Central SyncRivo Secure Hub */}
        <div 
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          {/* Outer pulsing ring */}
          <div className="absolute -inset-6 rounded-full border border-emerald-500/15 animate-pulse-slow" />
          <div className="absolute -inset-4 rounded-full border border-emerald-500/20 animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
          
          {/* Main hub */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-card via-card to-card/90 border border-border shadow-xl flex flex-col items-center justify-center">
            {/* Security icon overlay */}
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg border-2 border-background">
              <Lock className="w-3 h-3 text-white" />
            </div>
            
            {/* Logo */}
            <div className="text-center">
              <span className="text-primary font-bold text-sm sm:text-base tracking-tight">Sync</span>
              <span className="text-muted-foreground font-semibold text-[10px] sm:text-xs block -mt-0.5">Rivo</span>
            </div>
            
            {/* Security indicator */}
            <div className="flex items-center gap-0.5 mt-1">
              <Shield className="w-2.5 h-2.5 text-emerald-500" />
              <span className="text-[7px] sm:text-[8px] text-emerald-600 dark:text-emerald-400 font-semibold tracking-wide">SECURE</span>
            </div>
          </div>
        </div>

        {/* Platform Icons (8 total, radial layout) */}
        {platforms.map((platform, index) => {
          const pos = getPlatformPosition(platform.angle);
          const isHovered = hoveredPlatform === platform.id;
          const delay = index * 80; // Staggered entrance
          
          return (
            <div
              key={platform.id}
              className={`absolute left-1/2 top-1/2 z-10 transition-all duration-500 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              }`}
              style={{
                transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px)`,
                transitionDelay: isVisible ? `${delay}ms` : '0ms',
              }}
              onMouseEnter={() => setHoveredPlatform(platform.id)}
              onMouseLeave={() => setHoveredPlatform(null)}
            >
              <div 
                className={`
                  relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-card border 
                  shadow-sm flex items-center justify-center cursor-pointer
                  transition-all duration-300 ease-out
                  ${isHovered 
                    ? 'scale-105 shadow-lg border-emerald-500/50 bg-emerald-500/5' 
                    : 'border-border/50 hover:border-border'
                  }
                `}
              >
                <img 
                  src={platform.icon} 
                  alt={platform.name} 
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain opacity-70"
                />
                
                {/* Security indicator on hover */}
                {isHovered && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
                    <Lock className="w-2 h-2 text-white" />
                  </div>
                )}
              </div>
              
              {/* Tooltip */}
              <div 
                className={`
                  absolute left-1/2 -translate-x-1/2 top-full mt-2
                  px-2 py-1 rounded-md bg-card border border-border shadow-lg
                  text-[10px] font-medium text-foreground whitespace-nowrap
                  transition-all duration-200 z-30
                  ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'}
                `}
              >
                <div className="flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5 text-emerald-500" />
                  <span>{platform.name}</span>
                </div>
                <span className="text-[8px] text-muted-foreground block text-center">Encrypted Sync</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* "+18 more platforms" badge */}
      <div 
        className={`mt-6 flex items-center gap-2 px-4 py-2 rounded-full bg-muted/40 border border-border/50 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: isVisible ? '600ms' : '0ms' }}
      >
        <span className="text-xs text-muted-foreground font-medium">+18 more platforms</span>
        <Shield className="w-3 h-3 text-emerald-500" />
      </div>

      {/* Trust indicators */}
      <div 
        className={`flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 text-[10px] sm:text-xs text-muted-foreground transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: isVisible ? '750ms' : '0ms' }}
      >
        <div className="flex items-center gap-1.5">
          <Lock className="w-3 h-3 text-emerald-500" />
          <span>End-to-End Encryption</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Shield className="w-3 h-3 text-emerald-500" />
          <span>Zero-Trust Architecture</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Lock className="w-3 h-3 text-emerald-500" />
          <span>SOC 2 Compliant</span>
        </div>
      </div>
    </div>
  );
}
