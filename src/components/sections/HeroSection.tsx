import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Shield, Lock, CheckCircle } from 'lucide-react';

// Platform icons - 8 unique official icons
import teamsIcon from '@/assets/brands/teams-official.svg';
import slackIcon from '@/assets/brands/slack-official.svg';
import discordIcon from '@/assets/brands/discord-logo.png';
import whatsappIcon from '@/assets/brands/whatsapp-official.svg';
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

export function HeroSection() {
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);
  const [packets, setPackets] = useState<DataPacket[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const packetIdRef = useRef(0);
  
  const hubRadius = 120;

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
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
        return newPackets.slice(-3);
      });
    };

    const interval = setInterval(createPacket, 2000);
    setTimeout(createPacket, 500);

    return () => clearInterval(interval);
  }, []);

  // Animate packets
  useEffect(() => {
    const animatePackets = () => {
      setPackets(prev => 
        prev
          .map(p => ({ ...p, progress: p.progress + 1.2 }))
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
    <section className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/[0.02] pt-16">
      {/* Subtle background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-500/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Text Content */}
          <div className={`space-y-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Trust badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20"
              style={{ transitionDelay: '100ms' }}
            >
              <Shield className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                Enterprise-Grade Security
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground">
                Your Unified Messaging Hub for{' '}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-emerald-500 bg-clip-text text-transparent">
                  Teams, Slack & Google Chat
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Sync conversations securely across platforms — reliable, compliant, and effortless.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button 
                asChild 
                size="lg" 
                className="group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold px-8 py-6 text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 rounded-xl"
              >
                <Link to="/signup">
                  Try SyncRivo Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="group border-2 border-border hover:border-primary/30 hover:bg-primary/5 font-semibold px-8 py-6 text-base transition-all duration-300 rounded-xl"
              >
                <Play className="mr-2 h-4 w-4" />
                Request a Demo
              </Button>
            </div>

            {/* Quick trust signals */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Setup in 5 minutes</span>
              </div>
            </div>
          </div>

          {/* Right Side - Secure Hub Animation */}
          <div 
            ref={containerRef} 
            className={`flex flex-col items-center lg:items-end transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
            {/* Animation Container */}
            <div className="relative w-[300px] h-[300px] sm:w-[340px] sm:h-[340px]">
              {/* Glow effect behind hub */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
              </div>

              {/* SVG for connection lines and packets */}
              <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
                <defs>
                  <linearGradient id="heroLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="hsl(160, 60%, 50%)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                  </linearGradient>
                  <filter id="heroPacketGlow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
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
                      strokeWidth={isHovered ? 1.5 : 1}
                      strokeDasharray="4 4"
                      opacity={isHovered ? 0.5 : 0.25}
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
                        r="3"
                        fill="hsl(160, 60%, 50%)"
                        opacity={0.8}
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
                {/* Pulsing rings */}
                <div className="absolute -inset-5 rounded-full border border-primary/10 animate-pulse" />
                <div className="absolute -inset-3 rounded-full border border-emerald-500/15 animate-pulse" style={{ animationDelay: '1s' }} />
                
                {/* Main hub */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-card to-card/95 border border-border/50 shadow-xl backdrop-blur-sm flex flex-col items-center justify-center">
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-md">
                    <Lock className="w-2.5 h-2.5 text-white" />
                  </div>
                  <span className="text-primary font-bold text-base sm:text-lg tracking-tight">Sync</span>
                  <div className="flex items-center gap-0.5">
                    <Shield className="w-2 h-2 text-emerald-500" />
                    <span className="text-[6px] sm:text-[7px] text-emerald-500 font-semibold">SECURE</span>
                  </div>
                </div>
              </div>

              {/* Platform Icons */}
              {platforms.map((platform, index) => {
                const pos = getPlatformPosition(platform.angle);
                const isHovered = hoveredPlatform === platform.id;
                const delay = 400 + index * 60;
                
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
                        relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-card/80 backdrop-blur-sm border 
                        shadow-sm flex items-center justify-center cursor-pointer
                        transition-all duration-300 ease-out
                        ${isHovered 
                          ? 'scale-110 shadow-md border-emerald-500/40 bg-card' 
                          : 'border-border/40 hover:border-border/60'
                        }
                      `}
                    >
                      <img 
                        src={platform.icon} 
                        alt={platform.name} 
                        className="w-5 h-5 sm:w-6 sm:h-6 object-contain opacity-75"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* +18 more platforms badge */}
            <div 
              className={`mt-4 flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '700ms' }}
            >
              <span className="text-xs text-muted-foreground font-medium">+18 more platforms</span>
              <Shield className="w-3 h-3 text-emerald-500" />
            </div>
          </div>
        </div>

        {/* Security Trust Indicators - Bottom */}
        <div 
          className={`mt-8 lg:mt-12 flex flex-col items-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 px-6 py-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Lock className="w-4 h-4 text-emerald-500" />
              </div>
              <span className="text-muted-foreground font-medium">End-to-End Encryption</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-border" />
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-emerald-500" />
              </div>
              <span className="text-muted-foreground font-medium">Zero-Trust Architecture</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-border" />
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
              </div>
              <span className="text-muted-foreground font-medium">SOC 2 Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
