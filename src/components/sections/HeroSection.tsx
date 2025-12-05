import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Shield, Lock, CheckCircle } from 'lucide-react';

// Platform icons - 7 unique official icons
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

export function HeroSection() {
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);
  const [packets, setPackets] = useState<DataPacket[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [hubPulse, setHubPulse] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const packetIdRef = useRef(0);
  
  const hubRadius = 140; // Increased from 120

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Hub pulse every 3-4 seconds
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setHubPulse(true);
      setTimeout(() => setHubPulse(false), 600);
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
    <section className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden pt-12">
      {/* Premium radial gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-background to-accent/[0.02]" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-primary/[0.08] via-primary/[0.03] to-transparent rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-accent/[0.06] via-accent/[0.02] to-transparent rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-gradient-radial from-primary/[0.04] to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Side - Text Content */}
          <div className={`space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Trust badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 shadow-sm"
              style={{ transitionDelay: '100ms' }}
            >
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">
                Enterprise-Grade Security
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] tracking-tight text-foreground">
                Your Unified Messaging Hub for{' '}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
                  Teams, Slack & Google Chat
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Sync conversations securely across platforms — reliable, compliant, and effortless.
              </p>
            </div>

            {/* CTA Buttons with enhanced shadows */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button 
                asChild 
                size="lg" 
                className="group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold px-8 py-6 text-base shadow-brand-lg hover:shadow-brand-xl hover:shadow-primary/40 transition-all duration-300 rounded-xl hover:scale-[1.02]"
              >
                <Link to="/signup">
                  Try SyncRivo Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="group border-2 border-border hover:border-primary/40 hover:bg-primary/5 font-semibold px-8 py-6 text-base transition-all duration-300 rounded-xl shadow-sm hover:shadow-md hover:shadow-primary/10 hover:scale-[1.02]"
              >
                <Play className="mr-2 h-4 w-4" />
                Request a Demo
              </Button>
            </div>

            {/* Quick trust signals - improved visibility */}
            <div className="flex flex-wrap items-center gap-6 pt-3">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center">
                  <CheckCircle className="w-3.5 h-3.5 text-accent" />
                </div>
                <span className="text-sm font-medium text-foreground/80">No credit card required</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center">
                  <CheckCircle className="w-3.5 h-3.5 text-accent" />
                </div>
                <span className="text-sm font-medium text-foreground/80">14-day free trial</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center">
                  <CheckCircle className="w-3.5 h-3.5 text-accent" />
                </div>
                <span className="text-sm font-medium text-foreground/80">Setup in 5 minutes</span>
              </div>
            </div>
          </div>

          {/* Right Side - Secure Hub Animation - Increased size */}
          <div 
            ref={containerRef} 
            className={`flex flex-col items-center justify-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
            {/* Animation Container - Increased size by ~20% */}
            <div className="relative w-[360px] h-[360px] sm:w-[400px] sm:h-[400px]">
              {/* Glow effect behind hub - enhanced */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-40 h-40 bg-primary/25 rounded-full blur-[60px] transition-all duration-500 ${hubPulse ? 'scale-125 opacity-80' : 'scale-100 opacity-60'}`} />
                <div className="absolute w-28 h-28 bg-accent/20 rounded-full blur-[40px]" />
              </div>

              {/* SVG for connection lines and packets */}
              <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
                <defs>
                  <linearGradient id="heroLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
                    <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
                  </linearGradient>
                  <filter id="heroPacketGlow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
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
                      strokeWidth={isHovered ? 2 : 1.5}
                      strokeDasharray="6 4"
                      opacity={isHovered ? 0.6 : 0.3}
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
                        r="4"
                        fill="hsl(var(--accent))"
                        opacity={0.85}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Central Hub - Glassmorphism effect */}
              <div 
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                {/* Pulsing rings */}
                <div className={`absolute -inset-6 rounded-full border border-primary/15 transition-all duration-500 ${hubPulse ? 'scale-110 opacity-100' : 'scale-100 opacity-50'}`} />
                <div className={`absolute -inset-4 rounded-full border border-accent/20 transition-all duration-500 ${hubPulse ? 'scale-105 opacity-100' : 'scale-100 opacity-60'}`} style={{ animationDelay: '0.5s' }} />
                
                {/* Main hub - Glassmorphism */}
                <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-card/70 backdrop-blur-md border border-border/60 shadow-2xl flex flex-col items-center justify-center transition-all duration-500 ${hubPulse ? 'shadow-primary/30' : 'shadow-primary/20'}`}
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--card) / 0.85) 0%, hsl(var(--card) / 0.7) 100%)',
                    boxShadow: hubPulse 
                      ? '0 0 40px hsl(var(--primary) / 0.35), 0 0 60px hsl(var(--accent) / 0.15), inset 0 0 20px hsl(var(--primary) / 0.1)'
                      : '0 0 30px hsl(var(--primary) / 0.2), 0 0 40px hsl(var(--accent) / 0.1), inset 0 0 15px hsl(var(--primary) / 0.05)'
                  }}
                >
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent flex items-center justify-center shadow-lg shadow-accent/30">
                    <Lock className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-primary font-bold text-lg sm:text-xl tracking-tight">Sync</span>
                  <div className="flex items-center gap-0.5">
                    <Shield className="w-2.5 h-2.5 text-accent" />
                    <span className="text-[7px] sm:text-[8px] text-accent font-semibold tracking-wide">SECURE</span>
                  </div>
                </div>
              </div>

              {/* Platform Icons - with hover lift */}
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
                        relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-card/90 backdrop-blur-sm border 
                        flex items-center justify-center cursor-pointer
                        transition-all duration-300 ease-out
                        ${isHovered 
                          ? 'scale-110 -translate-y-1 shadow-lg shadow-primary/20 border-accent/50 bg-card' 
                          : 'border-border/50 shadow-md shadow-primary/5 hover:border-border'
                        }
                      `}
                    >
                      <img 
                        src={platform.icon} 
                        alt={platform.name} 
                        className={`w-6 h-6 sm:w-7 sm:h-7 object-contain transition-all duration-300 drop-shadow-sm ${isHovered ? 'opacity-100' : 'opacity-80'}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* +18 more platforms badge - moved closer */}
            <div 
              className={`mt-2 flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 shadow-sm transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '700ms' }}
            >
              <span className="text-sm text-muted-foreground font-medium">+18 more platforms</span>
              <Shield className="w-3.5 h-3.5 text-accent" />
            </div>
          </div>
        </div>

        {/* Security Trust Indicators - Bottom */}
        <div 
          className={`mt-6 lg:mt-10 flex flex-col items-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 px-6 py-4 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 shadow-lg shadow-primary/5">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center shadow-inner">
                <Lock className="w-4.5 h-4.5 text-accent" />
              </div>
              <span className="text-foreground/90 font-medium">End-to-End Encryption</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-border/60" />
            <div className="flex items-center gap-3 text-sm">
              <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center shadow-inner">
                <Shield className="w-4.5 h-4.5 text-accent" />
              </div>
              <span className="text-foreground/90 font-medium">Zero-Trust Architecture</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-border/60" />
            <div className="flex items-center gap-3 text-sm">
              <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center shadow-inner">
                <CheckCircle className="w-4.5 h-4.5 text-accent" />
              </div>
              <span className="text-foreground/90 font-medium">SOC 2 Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
