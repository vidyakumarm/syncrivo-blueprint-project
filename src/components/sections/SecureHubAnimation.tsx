import { useState, useEffect, useRef } from 'react';
import { Shield, Lock } from 'lucide-react';

// Platform icons
import teamsIcon from '@/assets/brands/teams-official.svg';
import slackIcon from '@/assets/brands/slack-official.svg';
import discordIcon from '@/assets/brands/discord-official.png';
import whatsappIcon from '@/assets/brands/whatsapp-official.svg';
import telegramIcon from '@/assets/brands/telegram-official.svg';
import zoomIcon from '@/assets/zoom-icon.png';
import webexIcon from '@/assets/webex-icon.png';
import mattermostIcon from '@/assets/brands/mattermost-official.svg';
import rocketchatIcon from '@/assets/brands/rocketchat-official.svg';
import googleMeetIcon from '@/assets/brands/google-meet.svg';
import intercomIcon from '@/assets/brands/intercom-official.svg';
import lineIcon from '@/assets/brands/line-official.svg';

interface Platform {
  id: string;
  name: string;
  icon: string;
  gridPosition: { row: number; col: number };
}

const platforms: Platform[] = [
  { id: 'teams', name: 'Teams', icon: teamsIcon, gridPosition: { row: 0, col: 0 } },
  { id: 'slack', name: 'Slack', icon: slackIcon, gridPosition: { row: 0, col: 1 } },
  { id: 'zoom', name: 'Zoom', icon: zoomIcon, gridPosition: { row: 0, col: 3 } },
  { id: 'webex', name: 'Webex', icon: webexIcon, gridPosition: { row: 0, col: 4 } },
  { id: 'discord', name: 'Discord', icon: discordIcon, gridPosition: { row: 1, col: 0 } },
  { id: 'googlemeet', name: 'Google Chat', icon: googleMeetIcon, gridPosition: { row: 1, col: 4 } },
  { id: 'whatsapp', name: 'WhatsApp', icon: whatsappIcon, gridPosition: { row: 2, col: 0 } },
  { id: 'telegram', name: 'Telegram', icon: telegramIcon, gridPosition: { row: 2, col: 4 } },
  { id: 'mattermost', name: 'Mattermost', icon: mattermostIcon, gridPosition: { row: 3, col: 0 } },
  { id: 'rocketchat', name: 'Rocket.Chat', icon: rocketchatIcon, gridPosition: { row: 3, col: 1 } },
  { id: 'intercom', name: 'Intercom', icon: intercomIcon, gridPosition: { row: 3, col: 3 } },
  { id: 'line', name: 'Line', icon: lineIcon, gridPosition: { row: 3, col: 4 } },
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
  const containerRef = useRef<HTMLDivElement>(null);
  const packetIdRef = useRef(0);

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
        return newPackets.slice(-6);
      });
    };

    const interval = setInterval(createPacket, 1200);
    
    // Initial packets
    setTimeout(createPacket, 100);
    setTimeout(createPacket, 400);
    setTimeout(createPacket, 700);

    return () => clearInterval(interval);
  }, []);

  // Animate packets
  useEffect(() => {
    const animatePackets = () => {
      setPackets(prev => 
        prev
          .map(p => ({ ...p, progress: p.progress + 2 }))
          .filter(p => p.progress <= 100)
      );
    };

    const animationFrame = setInterval(animatePackets, 50);
    return () => clearInterval(animationFrame);
  }, []);

  const getTilePosition = (row: number, col: number) => {
    const tileSize = 72;
    const gap = 8;
    const totalWidth = 5 * tileSize + 4 * gap;
    const totalHeight = 4 * tileSize + 3 * gap;
    
    return {
      x: col * (tileSize + gap) - totalWidth / 2 + tileSize / 2,
      y: row * (tileSize + gap) - totalHeight / 2 + tileSize / 2,
    };
  };

  const getPacketPosition = (packet: DataPacket) => {
    const platform = platforms.find(p => p.id === packet.fromPlatform);
    if (!platform) return { x: 0, y: 0 };
    
    const platformPos = getTilePosition(platform.gridPosition.row, platform.gridPosition.col);
    const hubPos = { x: 0, y: 0 };
    
    const progress = packet.toHub ? packet.progress / 100 : 1 - packet.progress / 100;
    
    return {
      x: platformPos.x + (hubPos.x - platformPos.x) * progress,
      y: platformPos.y + (hubPos.y - platformPos.y) * progress,
    };
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      {/* Security badge */}
      <div className="flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
        <Shield className="w-4 h-4 text-emerald-500" />
        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
          Enterprise-Grade Encryption
        </span>
      </div>

      {/* Main Grid Container */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-[500px] h-[380px] sm:h-[400px]"
      >
        {/* SVG for connection lines and packets */}
        <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="secureLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(160, 60%, 45%)" stopOpacity="0.2" />
              <stop offset="50%" stopColor="hsl(200, 60%, 50%)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(160, 60%, 45%)" stopOpacity="0.2" />
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
            const pos = getTilePosition(platform.gridPosition.row, platform.gridPosition.col);
            const isHovered = hoveredPlatform === platform.id;
            return (
              <line
                key={platform.id}
                x1="50%"
                y1="50%"
                x2={`calc(50% + ${pos.x}px)`}
                y2={`calc(50% + ${pos.y}px)`}
                stroke="url(#secureLineGradient)"
                strokeWidth={isHovered ? 2 : 1}
                strokeDasharray={isHovered ? "none" : "4 4"}
                opacity={isHovered ? 0.8 : 0.4}
                className="transition-all duration-300"
              />
            );
          })}
          
          {/* Animated data packets */}
          {packets.map((packet) => {
            const pos = getPacketPosition(packet);
            return (
              <g key={packet.id} filter="url(#packetGlow)">
                <rect
                  x={`calc(50% + ${pos.x - 4}px)`}
                  y={`calc(50% + ${pos.y - 3}px)`}
                  width="8"
                  height="6"
                  rx="2"
                  fill="hsl(160, 60%, 50%)"
                  opacity={0.8}
                  className="animate-shimmer"
                />
                <rect
                  x={`calc(50% + ${pos.x - 2}px)`}
                  y={`calc(50% + ${pos.y - 1}px)`}
                  width="4"
                  height="2"
                  rx="1"
                  fill="white"
                  opacity={0.6}
                />
              </g>
            );
          })}
        </svg>

        {/* Central SyncRivo Secure Hub */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          {/* Pulsing security ring */}
          <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 animate-pulse-slow" />
          <div className="absolute -inset-2 rounded-xl border border-emerald-500/20 animate-pulse-slow" style={{ animationDelay: '1s' }} />
          
          {/* Main hub tile */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-card to-card/80 border border-border shadow-lg flex flex-col items-center justify-center gap-1">
            {/* Security icon overlay */}
            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-md">
              <Lock className="w-3 h-3 text-white" />
            </div>
            
            {/* Inner subtle border */}
            <div className="absolute inset-1 rounded-xl border border-primary/10" />
            
            {/* Logo */}
            <div className="text-center">
              <span className="text-primary font-bold text-base sm:text-lg tracking-tight">Sync</span>
              <span className="text-muted-foreground font-semibold text-xs block -mt-0.5">Rivo</span>
            </div>
            
            {/* Security badge */}
            <div className="flex items-center gap-1 mt-1">
              <Shield className="w-3 h-3 text-emerald-500" />
              <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-medium">SECURE</span>
            </div>
          </div>
        </div>

        {/* Platform Tiles Grid */}
        {platforms.map((platform) => {
          const pos = getTilePosition(platform.gridPosition.row, platform.gridPosition.col);
          const isHovered = hoveredPlatform === platform.id;
          
          return (
            <div
              key={platform.id}
              className="absolute left-1/2 top-1/2 z-10"
              style={{
                transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px)`,
              }}
              onMouseEnter={() => setHoveredPlatform(platform.id)}
              onMouseLeave={() => setHoveredPlatform(null)}
            >
              <div 
                className={`
                  relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-card border 
                  shadow-sm flex items-center justify-center cursor-pointer
                  transition-all duration-300 ease-out
                  ${isHovered 
                    ? 'scale-102 shadow-md border-emerald-500/40 bg-emerald-500/5' 
                    : 'border-border/60 hover:border-border'
                  }
                `}
              >
                <img 
                  src={platform.icon} 
                  alt={platform.name} 
                  className="w-6 h-6 sm:w-7 sm:h-7 object-contain opacity-80"
                />
                
                {/* Security indicator on hover */}
                {isHovered && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500/90 flex items-center justify-center">
                    <Lock className="w-2 h-2 text-white" />
                  </div>
                )}
              </div>
              
              {/* Tooltip */}
              <div 
                className={`
                  absolute left-1/2 -translate-x-1/2 top-full mt-2
                  px-2 py-1 rounded bg-card border border-border shadow-md
                  text-[10px] font-medium text-foreground whitespace-nowrap
                  transition-all duration-200 z-30
                  ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'}
                `}
              >
                <div className="flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5 text-emerald-500" />
                  <span>{platform.name}</span>
                </div>
                <span className="text-[8px] text-muted-foreground block">Encrypted Sync</span>
              </div>
            </div>
          );
        })}

        {/* "+14 more" indicator */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50">
            <span className="text-xs text-muted-foreground font-medium">+14 more platforms</span>
            <Shield className="w-3 h-3 text-emerald-500" />
          </div>
        </div>
      </div>

      {/* Trust indicators */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 text-[10px] sm:text-xs text-muted-foreground">
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
