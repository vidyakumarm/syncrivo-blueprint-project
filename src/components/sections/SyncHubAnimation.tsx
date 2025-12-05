import { useEffect, useState } from 'react';

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

interface Platform {
  id: string;
  name: string;
  icon: string;
  angle: number;
}

const platforms: Platform[] = [
  { id: 'teams', name: 'Teams', icon: teamsIcon, angle: 0 },
  { id: 'slack', name: 'Slack', icon: slackIcon, angle: 36 },
  { id: 'discord', name: 'Discord', icon: discordIcon, angle: 72 },
  { id: 'whatsapp', name: 'WhatsApp', icon: whatsappIcon, angle: 108 },
  { id: 'telegram', name: 'Telegram', icon: telegramIcon, angle: 144 },
  { id: 'zoom', name: 'Zoom', icon: zoomIcon, angle: 180 },
  { id: 'webex', name: 'Webex', icon: webexIcon, angle: 216 },
  { id: 'mattermost', name: 'Mattermost', icon: mattermostIcon, angle: 252 },
  { id: 'rocketchat', name: 'Rocket.Chat', icon: rocketchatIcon, angle: 288 },
  { id: 'googlemeet', name: 'Google Meet', icon: googleMeetIcon, angle: 324 },
];

interface MessageBubble {
  id: number;
  fromAngle: number;
  toCenter: boolean;
  delay: number;
}

export function SyncHubAnimation() {
  const [bubbles, setBubbles] = useState<MessageBubble[]>([]);
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);

  // Generate continuous message bubbles
  useEffect(() => {
    let bubbleId = 0;
    
    const createBubble = () => {
      const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];
      const toCenter = Math.random() > 0.5;
      
      setBubbles(prev => {
        const newBubbles = [...prev, {
          id: bubbleId++,
          fromAngle: randomPlatform.angle,
          toCenter,
          delay: 0,
        }];
        // Keep only last 8 bubbles for performance
        return newBubbles.slice(-8);
      });
    };

    // Create bubbles at intervals
    const interval = setInterval(createBubble, 800);
    
    // Initial bubbles
    for (let i = 0; i < 4; i++) {
      setTimeout(() => createBubble(), i * 200);
    }

    return () => clearInterval(interval);
  }, []);

  // Calculate position on circle
  const getPosition = (angle: number, radius: number) => {
    const radian = (angle - 90) * (Math.PI / 180);
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius,
    };
  };

  const orbitRadius = 140; // Desktop radius
  const mobileOrbitRadius = 100; // Mobile radius

  return (
    <div className="w-full flex flex-col items-center">
      {/* Label */}
      <p className="text-center text-sm text-muted-foreground mb-6">
        Real-time sync across 26+ platforms
      </p>

      {/* Animation Container */}
      <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px]">
        {/* Orbit ring */}
        <div className="absolute inset-8 sm:inset-6 md:inset-4 rounded-full border border-border/30" />
        <div className="absolute inset-12 sm:inset-10 md:inset-8 rounded-full border border-border/20" />

        {/* Connection lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(239, 84%, 67%)" stopOpacity="0.3" />
              <stop offset="50%" stopColor="hsl(270, 84%, 60%)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(239, 84%, 67%)" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Subtle radial lines */}
          {platforms.map((platform) => {
            const outerPos = getPosition(platform.angle, orbitRadius);
            const isHovered = hoveredPlatform === platform.id;
            return (
              <line
                key={platform.id}
                x1="50%"
                y1="50%"
                x2={`calc(50% + ${outerPos.x}px)`}
                y2={`calc(50% + ${outerPos.y}px)`}
                stroke="url(#lineGradient)"
                strokeWidth={isHovered ? 2 : 1}
                opacity={isHovered ? 0.8 : 0.3}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Message bubbles */}
        {bubbles.map((bubble) => {
          const startPos = bubble.toCenter 
            ? getPosition(bubble.fromAngle, orbitRadius - 20)
            : { x: 0, y: 0 };
          const endPos = bubble.toCenter 
            ? { x: 0, y: 0 }
            : getPosition(bubble.fromAngle, orbitRadius - 20);

          return (
            <div
              key={bubble.id}
              className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent opacity-80"
              style={{
                transform: `translate(-50%, -50%) translate(${startPos.x}px, ${startPos.y}px)`,
                animation: `messageBubble 1.5s ease-in-out forwards`,
                '--start-x': `${startPos.x}px`,
                '--start-y': `${startPos.y}px`,
                '--end-x': `${endPos.x}px`,
                '--end-y': `${endPos.y}px`,
              } as React.CSSProperties}
            />
          );
        })}

        {/* Central Hub */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          {/* Outer glow rings */}
          <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 blur-xl animate-pulse-slow" />
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/5 to-accent/5 blur-lg animate-pulse-slow" style={{ animationDelay: '1s' }} />
          
          {/* Main hub */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[hsl(239,84%,67%)] to-[hsl(270,84%,60%)] shadow-2xl flex items-center justify-center animate-pulse-subtle">
            {/* Inner ring */}
            <div className="absolute inset-1 rounded-full border border-white/20" />
            <div className="absolute inset-2 rounded-full border border-white/10" />
            
            {/* Logo text */}
            <div className="text-center">
              <span className="text-white font-bold text-sm sm:text-base tracking-tight">Sync</span>
              <span className="text-white/80 font-medium text-xs block -mt-0.5">Rivo</span>
            </div>
          </div>
        </div>

        {/* Platform icons in orbit */}
        {platforms.map((platform) => {
          const pos = getPosition(platform.angle, orbitRadius);
          const isHovered = hoveredPlatform === platform.id;
          
          return (
            <div
              key={platform.id}
              className="absolute left-1/2 top-1/2 z-20"
              style={{
                transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px)`,
              }}
              onMouseEnter={() => setHoveredPlatform(platform.id)}
              onMouseLeave={() => setHoveredPlatform(null)}
            >
              <div 
                className={`
                  relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-card border border-border/50 
                  shadow-md flex items-center justify-center cursor-pointer
                  transition-all duration-300 ease-out
                  ${isHovered ? 'scale-110 shadow-lg border-primary/30' : 'scale-100'}
                `}
                style={{
                  boxShadow: isHovered 
                    ? '0 0 20px hsl(239, 84%, 67%, 0.25), 0 4px 12px rgba(0,0,0,0.1)' 
                    : '0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                <img 
                  src={platform.icon} 
                  alt={platform.name} 
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                />
              </div>
              
              {/* Platform name tooltip */}
              <div 
                className={`
                  absolute left-1/2 -translate-x-1/2 top-full mt-1
                  text-[10px] font-medium text-muted-foreground whitespace-nowrap
                  transition-opacity duration-200
                  ${isHovered ? 'opacity-100' : 'opacity-0'}
                `}
              >
                {platform.name}
              </div>
            </div>
          );
        })}

        {/* "+16 more" indicator */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-4 sm:bottom-2">
          <span className="text-xs text-muted-foreground/70 font-medium">
            +16 more platforms
          </span>
        </div>
      </div>
    </div>
  );
}

