import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import teamsIcon from '@/assets/brands/teams-official.svg';
import zoomIcon from '@/assets/zoom-icon.png';

interface Message {
  id: number;
  sender: string;
  avatar: string;
  text: string;
  from: 'teams' | 'zoom';
}

const conversations: Message[] = [
  { id: 1, sender: 'John Doe', avatar: 'JD', text: 'Hello team, checking sync! 👋', from: 'teams' },
  { id: 2, sender: 'Sarah Chen', avatar: 'SC', text: 'Got it! Sync is working perfectly ✨', from: 'zoom' },
  { id: 3, sender: 'John Doe', avatar: 'JD', text: 'Great! Let\'s schedule the demo call', from: 'teams' },
];

const LiveMessageFlowDemo = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [phase, setPhase] = useState(0);
  // Phase 0: Idle
  // Phase 1: Typing in source
  // Phase 2: Message sent from source
  // Phase 3: Packet traveling to SyncRivo
  // Phase 4: Packet at SyncRivo (processing)
  // Phase 5: Packet traveling to destination
  // Phase 6: Message received in destination

  useEffect(() => {
    const phases = [
      { duration: 400 },   // 0: Idle
      { duration: 1200 },  // 1: Typing
      { duration: 600 },   // 2: Message sent
      { duration: 600 },   // 3: Traveling to hub
      { duration: 500 },   // 4: Processing
      { duration: 600 },   // 5: Traveling to destination
      { duration: 1500 },  // 6: Received - show longer
    ];

    const interval = setInterval(() => {
      setPhase((prev) => {
        if (prev === 6) {
          // Move to next message
          setCurrentMessage((m) => (m + 1) % conversations.length);
          return 0;
        }
        return prev + 1;
      });
    }, phases[phase].duration);

    return () => clearInterval(interval);
  }, [phase]);

  const message = conversations[currentMessage];
  const isFromTeams = message.from === 'teams';

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
            See how conversations flow securely between Microsoft Teams and Zoom — instantly and encrypted.
          </p>
        </div>

        {/* Demo Container */}
        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between gap-4 lg:gap-8">
            {/* Teams Panel */}
            <TeamsPanel 
              phase={phase} 
              message={message}
              isSource={isFromTeams}
              allMessages={conversations}
              currentIndex={currentMessage}
            />
            
            {/* Connection Line Left */}
            <div className="flex-1 relative h-1 max-w-[100px] lg:max-w-[140px]">
              <div className="absolute inset-0 bg-gradient-to-r from-[#5558AF] to-primary/50 rounded-full opacity-30" />
              {/* Animated Packet - Teams to Hub */}
              <div 
                className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50 transition-all duration-500 ease-out ${
                  isFromTeams && phase === 3 ? 'left-0 opacity-100' : 
                  isFromTeams && phase === 4 ? 'left-full opacity-100' : 
                  !isFromTeams && phase === 5 ? 'left-full opacity-100' :
                  !isFromTeams && phase === 6 ? 'left-0 opacity-0' :
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
              {/* Animated Packet - Hub to Zoom */}
              <div 
                className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50 transition-all duration-500 ease-out ${
                  isFromTeams && phase === 5 ? 'left-0 opacity-100' : 
                  isFromTeams && phase === 6 ? 'left-full opacity-0' : 
                  !isFromTeams && phase === 3 ? 'left-full opacity-100' :
                  !isFromTeams && phase === 4 ? 'left-0 opacity-100' :
                  'left-0 opacity-0'
                }`}
              >
                <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" />
              </div>
            </div>

            {/* Zoom Panel */}
            <ZoomPanel 
              phase={phase} 
              message={message}
              isSource={!isFromTeams}
              allMessages={conversations}
              currentIndex={currentMessage}
            />
          </div>

          {/* Mobile Layout - Stacked */}
          <div className="flex md:hidden flex-col items-center gap-6">
            <TeamsPanel 
              phase={phase} 
              message={message}
              isSource={isFromTeams}
              allMessages={conversations}
              currentIndex={currentMessage}
            />
            
            {/* Vertical Connection */}
            <div className="relative w-1 h-12">
              <div className="absolute inset-0 bg-gradient-to-b from-[#5558AF] to-primary rounded-full opacity-30" />
              <div 
                className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50 transition-all duration-500 ${
                  (isFromTeams && (phase === 3 || phase === 4)) || (!isFromTeams && (phase === 5 || phase === 6)) ? 'top-0 opacity-100' : 'top-0 opacity-0'
                }`}
              />
            </div>

            <SyncRivoHub phase={phase} />

            {/* Vertical Connection */}
            <div className="relative w-1 h-12">
              <div className="absolute inset-0 bg-gradient-to-b from-primary to-[#2D8CFF] rounded-full opacity-30" />
              <div 
                className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50 transition-all duration-500 ${
                  (isFromTeams && phase === 5) || (!isFromTeams && (phase === 3 || phase === 4)) ? 'top-0 opacity-100' : 'top-0 opacity-0'
                }`}
              />
            </div>

            <ZoomPanel 
              phase={phase} 
              message={message}
              isSource={!isFromTeams}
              allMessages={conversations}
              currentIndex={currentMessage}
            />
          </div>
        </div>

        {/* Message Counter */}
        <div className="flex justify-center gap-2 mt-8">
          {conversations.map((_, idx) => (
            <div 
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentMessage ? 'bg-primary w-6' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
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
const TeamsPanel = ({ 
  phase, 
  message, 
  isSource,
  allMessages,
  currentIndex
}: { 
  phase: number; 
  message: Message;
  isSource: boolean;
  allMessages: Message[];
  currentIndex: number;
}) => {
  const showTyping = isSource && phase === 1;
  const showCurrentMessage = isSource ? phase >= 2 : phase >= 6;
  
  // Get previous messages that should show in Teams
  const previousTeamsMessages = allMessages
    .slice(0, currentIndex)
    .filter((_, idx) => {
      // Show messages that have completed their cycle
      return true;
    });

  return (
    <div className="w-full md:w-[280px] lg:w-[320px] bg-card border border-border rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#5558AF] text-white">
        <img src={teamsIcon} alt="Teams" className="w-5 h-5" />
        <span className="font-semibold text-sm">Microsoft Teams</span>
      </div>
      
      {/* Chat Area */}
      <div className="p-4 min-h-[180px] bg-card space-y-3 overflow-hidden">
        {/* Previous messages */}
        {previousTeamsMessages.map((msg, idx) => (
          <MessageBubble 
            key={msg.id} 
            message={msg} 
            showVia={msg.from === 'zoom'}
            viaText="via Zoom"
          />
        ))}
        
        {/* Current message */}
        {(showTyping || showCurrentMessage) && (
          <div className="flex items-start gap-3 animate-fade-in">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${
              message.from === 'teams' ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gradient-to-br from-cyan-500 to-blue-600'
            }`}>
              {message.avatar}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-foreground">{message.sender}</span>
                <span className="text-xs text-muted-foreground">now</span>
              </div>
              
              {showTyping && !showCurrentMessage && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
              
              {showCurrentMessage && (
                <>
                  <div className="bg-muted/50 rounded-lg px-3 py-2 inline-block animate-fade-in">
                    <p className="text-sm text-foreground">{message.text}</p>
                  </div>
                  {message.from === 'zoom' && (
                    <div className="flex items-center gap-1 mt-1.5">
                      <Shield className="w-3 h-3 text-primary" />
                      <span className="text-[10px] text-muted-foreground">via Zoom</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
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
const ZoomPanel = ({ 
  phase, 
  message,
  isSource,
  allMessages,
  currentIndex
}: { 
  phase: number; 
  message: Message;
  isSource: boolean;
  allMessages: Message[];
  currentIndex: number;
}) => {
  const showTyping = isSource && phase === 1;
  const showCurrentMessage = isSource ? phase >= 2 : phase >= 6;

  // Get previous messages
  const previousZoomMessages = allMessages.slice(0, currentIndex);

  return (
    <div className="w-full md:w-[280px] lg:w-[320px] bg-card border border-border rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#2D8CFF] text-white">
        <img src={zoomIcon} alt="Zoom" className="w-5 h-5" />
        <span className="font-semibold text-sm">Zoom Chat</span>
      </div>
      
      {/* Chat Area */}
      <div className="p-4 min-h-[180px] bg-card space-y-3 overflow-hidden">
        {/* Previous messages */}
        {previousZoomMessages.map((msg) => (
          <MessageBubble 
            key={msg.id} 
            message={msg} 
            showVia={msg.from === 'teams'}
            viaText="via Teams"
          />
        ))}
        
        {/* Current message or waiting state */}
        {!showTyping && !showCurrentMessage && currentIndex === 0 && (
          <div className="flex items-center justify-center h-[100px] text-muted-foreground text-sm">
            Waiting for messages...
          </div>
        )}
        
        {(showTyping || showCurrentMessage) && (
          <div className="flex items-start gap-3 animate-fade-in">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${
              message.from === 'zoom' ? 'bg-gradient-to-br from-cyan-500 to-blue-600' : 'bg-gradient-to-br from-blue-500 to-purple-600'
            }`}>
              {message.avatar}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-foreground">{message.sender}</span>
                <span className="text-xs text-muted-foreground">{message.from === 'teams' ? 'via Teams' : 'now'}</span>
              </div>
              
              {showTyping && !showCurrentMessage && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
              
              {showCurrentMessage && (
                <>
                  <div className="bg-muted/50 rounded-lg px-3 py-2 inline-block animate-fade-in">
                    <p className="text-sm text-foreground">{message.text}</p>
                  </div>
                  {message.from === 'teams' && (
                    <div className="flex items-center gap-1 mt-1.5">
                      <Shield className="w-3 h-3 text-primary" />
                      <span className="text-[10px] text-muted-foreground">Delivered via SyncRivo</span>
                    </div>
                  )}
                </>
              )}
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

// Reusable Message Bubble
const MessageBubble = ({ 
  message, 
  showVia, 
  viaText 
}: { 
  message: Message; 
  showVia: boolean;
  viaText: string;
}) => (
  <div className="flex items-start gap-3">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${
      message.from === 'teams' ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gradient-to-br from-cyan-500 to-blue-600'
    }`}>
      {message.avatar}
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm font-medium text-foreground">{message.sender}</span>
        {showVia && <span className="text-xs text-muted-foreground">{viaText}</span>}
      </div>
      <div className="bg-muted/50 rounded-lg px-3 py-2 inline-block">
        <p className="text-sm text-foreground">{message.text}</p>
      </div>
      {showVia && (
        <div className="flex items-center gap-1 mt-1">
          <Shield className="w-3 h-3 text-primary" />
          <span className="text-[10px] text-muted-foreground">via SyncRivo</span>
        </div>
      )}
    </div>
  </div>
);

export default LiveMessageFlowDemo;
