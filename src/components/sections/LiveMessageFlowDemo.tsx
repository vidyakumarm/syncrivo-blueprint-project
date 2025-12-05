import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import teamsIcon from '@/assets/brands/teams-official.svg';
import zoomIcon from '@/assets/zoom-icon.png';

const LiveMessageFlowDemo = () => {
  const [phase, setPhase] = useState(0);
  // Phase 0: Idle
  // Phase 1: Typing in Teams
  // Phase 2: Message sent from Teams
  // Phase 3: Packet traveling to SyncRivo
  // Phase 4: Packet at SyncRivo (processing)
  // Phase 5: Packet traveling to Zoom
  // Phase 6: Message received in Zoom

  useEffect(() => {
    const phases = [
      { duration: 500 },   // 0: Idle
      { duration: 1500 },  // 1: Typing
      { duration: 800 },   // 2: Message sent
      { duration: 800 },   // 3: Traveling to hub
      { duration: 600 },   // 4: Processing
      { duration: 800 },   // 5: Traveling to Zoom
      { duration: 2000 },  // 6: Received
    ];

    const interval = setInterval(() => {
      setPhase((prev) => (prev + 1) % 7);
    }, phases[phase].duration);

    return () => clearInterval(interval);
  }, [phase]);

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            Live Demo
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Watch Messages Sync in Real Time
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how a message travels securely from Microsoft Teams through SyncRivo to Zoom — instantly and encrypted.
          </p>
        </div>

        {/* Demo Container */}
        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between gap-4 lg:gap-8">
            {/* Teams Panel */}
            <TeamsPanel phase={phase} />
            
            {/* Connection Line Left */}
            <div className="flex-1 relative h-1 max-w-[100px] lg:max-w-[140px]">
              <div className="absolute inset-0 bg-gradient-to-r from-[#5558AF] to-primary/50 rounded-full opacity-30" />
              {/* Animated Packet */}
              <div 
                className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50 transition-all duration-700 ease-out ${
                  phase === 3 ? 'left-0 opacity-100' : 
                  phase === 4 ? 'left-full opacity-100' : 
                  'left-0 opacity-0'
                }`}
              >
                <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" />
              </div>
            </div>

            {/* SyncRivo Hub */}
            <SyncRivoHub phase={phase} />

            {/* Connection Line Right */}
            <div className="flex-1 relative h-1 max-w-[100px] lg:max-w-[140px]">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-[#2D8CFF] rounded-full opacity-30" />
              {/* Animated Packet */}
              <div 
                className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50 transition-all duration-700 ease-out ${
                  phase === 5 ? 'left-0 opacity-100' : 
                  phase === 6 ? 'left-full opacity-0' : 
                  'left-0 opacity-0'
                }`}
              >
                <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" />
              </div>
            </div>

            {/* Zoom Panel */}
            <ZoomPanel phase={phase} />
          </div>

          {/* Mobile Layout - Stacked */}
          <div className="flex md:hidden flex-col items-center gap-6">
            <TeamsPanel phase={phase} />
            
            {/* Vertical Connection */}
            <div className="relative w-1 h-12">
              <div className="absolute inset-0 bg-gradient-to-b from-[#5558AF] to-primary rounded-full opacity-30" />
              <div 
                className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50 transition-all duration-500 ${
                  phase === 3 || phase === 4 ? 'top-0 opacity-100' : 'top-0 opacity-0'
                }`}
              />
            </div>

            <SyncRivoHub phase={phase} />

            {/* Vertical Connection */}
            <div className="relative w-1 h-12">
              <div className="absolute inset-0 bg-gradient-to-b from-primary to-[#2D8CFF] rounded-full opacity-30" />
              <div 
                className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50 transition-all duration-500 ${
                  phase === 5 ? 'top-0 opacity-100' : 'top-0 opacity-0'
                }`}
              />
            </div>

            <ZoomPanel phase={phase} />
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 lg:mt-16">
          <Button asChild size="lg" className="group shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
            <Link to="/features">
              See Full Multi-Platform Sync
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

// Teams Mock Panel
const TeamsPanel = ({ phase }: { phase: number }) => {
  const showTyping = phase === 1;
  const showMessage = phase >= 2;

  return (
    <div className="w-full md:w-[280px] lg:w-[320px] bg-card border border-border rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#5558AF] text-white">
        <img src={teamsIcon} alt="Teams" className="w-5 h-5" />
        <span className="font-semibold text-sm">Microsoft Teams</span>
      </div>
      
      {/* Chat Area */}
      <div className="p-4 min-h-[140px] bg-card">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            JD
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-foreground">John Doe</span>
              <span className="text-xs text-muted-foreground">now</span>
            </div>
            
            {/* Typing Indicator */}
            {showTyping && !showMessage && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
            
            {/* Message */}
            {showMessage && (
              <div className="bg-muted/50 rounded-lg px-3 py-2 inline-block animate-fade-in">
                <p className="text-sm text-foreground">Hello team, checking sync! 👋</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Input */}
      <div className="px-4 py-3 border-t border-border bg-muted/30">
        <div className="flex items-center gap-2 px-3 py-2 bg-background rounded-lg border border-border/50">
          <span className="text-sm text-muted-foreground">Type a message...</span>
        </div>
      </div>
    </div>
  );
};

// SyncRivo Hub
const SyncRivoHub = ({ phase }: { phase: number }) => {
  const isProcessing = phase === 4;

  return (
    <div className="relative">
      {/* Glow Background */}
      <div className={`absolute inset-0 bg-primary/20 rounded-2xl blur-xl transition-all duration-500 ${isProcessing ? 'scale-125 opacity-100' : 'scale-100 opacity-50'}`} />
      
      {/* Hub Card */}
      <div className={`relative w-24 h-24 lg:w-28 lg:h-28 rounded-2xl bg-gradient-to-br from-card to-muted border border-border/50 shadow-xl backdrop-blur-sm flex flex-col items-center justify-center transition-all duration-300 ${isProcessing ? 'scale-110' : 'scale-100'}`}>
        {/* Icon */}
        <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg transition-all duration-300 ${isProcessing ? 'animate-pulse' : ''}`}>
          <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-primary-foreground" />
        </div>
        <span className="text-xs font-semibold text-foreground mt-2">SyncRivo</span>
        
        {/* Processing Indicator */}
        {isProcessing && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-medium rounded-full animate-fade-in">
            Encrypting...
          </div>
        )}
      </div>
    </div>
  );
};

// Zoom Mock Panel
const ZoomPanel = ({ phase }: { phase: number }) => {
  const showMessage = phase >= 6;

  return (
    <div className="w-full md:w-[280px] lg:w-[320px] bg-card border border-border rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#2D8CFF] text-white">
        <img src={zoomIcon} alt="Zoom" className="w-5 h-5" />
        <span className="font-semibold text-sm">Zoom Chat</span>
      </div>
      
      {/* Chat Area */}
      <div className="p-4 min-h-[140px] bg-card">
        {!showMessage && (
          <div className="flex items-center justify-center h-[100px] text-muted-foreground text-sm">
            Waiting for messages...
          </div>
        )}
        
        {showMessage && (
          <div className="flex items-start gap-3 animate-fade-in">
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              JD
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-foreground">John Doe</span>
                <span className="text-xs text-muted-foreground">via Teams</span>
              </div>
              
              <div className="bg-muted/50 rounded-lg px-3 py-2 inline-block">
                <p className="text-sm text-foreground">Hello team, checking sync! 👋</p>
              </div>
              
              {/* Delivered Tag */}
              <div className="flex items-center gap-1 mt-1.5">
                <Shield className="w-3 h-3 text-primary" />
                <span className="text-[10px] text-muted-foreground">Delivered via SyncRivo</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Input */}
      <div className="px-4 py-3 border-t border-border bg-muted/30">
        <div className="flex items-center gap-2 px-3 py-2 bg-background rounded-lg border border-border/50">
          <span className="text-sm text-muted-foreground">Reply...</span>
        </div>
      </div>
    </div>
  );
};

export default LiveMessageFlowDemo;
