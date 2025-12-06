import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Play, Lock, CheckCircle2, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import teamsIcon from '@/assets/brands/teams-official.svg';
import slackIcon from '@/assets/brands/slack-official.svg';
import sergeyPhoto from '@/assets/profiles/sergey-kizunov.jpeg';
import kumarPhoto from '@/assets/profiles/kumar-makala.jpg';

interface Message {
  id: number;
  sender: string;
  photo: string;
  text: string;
  from: 'teams' | 'slack';
}

const conversations: Message[] = [
  { id: 1, sender: 'Sergey Kizunov', photo: sergeyPhoto, text: 'Team, can everyone review the Q4 proposal?', from: 'teams' },
  { id: 2, sender: 'Kumar Makala', photo: kumarPhoto, text: 'On it! Will have feedback by EOD ✓', from: 'slack' },
  { id: 3, sender: 'Sergey Kizunov', photo: sergeyPhoto, text: 'Perfect. Let\'s sync at 3pm EST.', from: 'teams' },
  { id: 4, sender: 'Kumar Makala', photo: kumarPhoto, text: 'Just shared the updated deck in Slack. Check the channel!', from: 'slack' },
];

const LiveMessageFlowDemo = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [phase, setPhase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    
    const phases = [
      { duration: 500 },   // 0: Idle
      { duration: 1400 },  // 1: Typing
      { duration: 700 },   // 2: Message sent
      { duration: 700 },   // 3: Traveling to hub
      { duration: 600 },   // 4: Processing
      { duration: 700 },   // 5: Traveling to destination
      { duration: 2000 },  // 6: Received
    ];

    const interval = setInterval(() => {
      setPhase((prev) => {
        if (prev === 6) {
          setCurrentMessage((m) => (m + 1) % conversations.length);
          return 0;
        }
        return prev + 1;
      });
    }, phases[phase].duration);

    return () => clearInterval(interval);
  }, [phase, isPlaying]);

  const message = conversations[currentMessage];
  const isFromTeams = message.from === 'teams';

  // Progress calculation for the step indicator
  const getStepProgress = () => {
    if (phase <= 2) return 1;
    if (phase <= 4) return 2;
    return 3;
  };

  return (
    <section className="py-28 lg:py-36 bg-gradient-to-b from-slate-50/50 via-background to-slate-50/30 dark:from-slate-950/50 dark:via-background dark:to-slate-950/30 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm font-medium mb-6">
            <Play className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <span className="text-slate-600 dark:text-slate-400">Live Demo</span>
          </span>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 tracking-tight leading-[1.1]">
            See How SyncRivo Syncs Messages{' '}
            <span className="text-slate-500 dark:text-slate-400">Instantly</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Watch real conversations flow securely in both directions — Teams ↔ SyncRivo ↔ Slack — encrypted and instant.
          </p>
        </div>

        {/* Step Progress Indicator - Dynamic based on direction */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[
            { step: 1, label: isFromTeams ? 'Send from Teams' : 'Send from Slack' },
            { step: 2, label: 'Encrypt & Route' },
            { step: 3, label: isFromTeams ? 'Deliver to Slack' : 'Deliver to Teams' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                  getStepProgress() >= item.step 
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' 
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }`}>
                  {getStepProgress() > item.step ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-semibold">{item.step}</span>
                  )}
                </div>
                <span className={`text-xs mt-2 font-medium transition-colors duration-300 ${
                  getStepProgress() >= item.step ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {item.label}
                </span>
              </div>
              {i < 2 && (
                <div className={`w-16 sm:w-24 h-0.5 rounded-full transition-all duration-500 mb-6 ${
                  getStepProgress() > item.step ? 'bg-slate-900 dark:bg-white' : 'bg-slate-200 dark:bg-slate-700'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Demo Container */}
        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-stretch justify-between gap-6 lg:gap-10">
            {/* Teams Panel */}
            <TeamsPanel 
              phase={phase} 
              message={message}
              isSource={isFromTeams}
              allMessages={conversations}
              currentIndex={currentMessage}
            />
            
            {/* Connection Line Left + SyncRivo Hub + Connection Line Right */}
            <div className="flex-1 flex items-center justify-center relative min-w-[200px] lg:min-w-[280px]">
              {/* Left connection (Teams side) */}
              <div className="flex-1 relative h-0.5 bg-gradient-to-r from-[#5558AF]/20 to-primary/30 rounded-full">
                {/* Forward flow: Teams → Hub */}
                <div 
                  className={`absolute top-1/2 -translate-y-1/2 transition-all ease-out ${
                    isFromTeams && (phase === 3 || phase === 4) ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    left: isFromTeams && phase === 4 ? '100%' : '0%',
                    transition: 'left 0.6s ease-out, opacity 0.3s'
                  }}
                >
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#5558AF] to-primary shadow-lg shadow-primary/40">
                    <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />
                  </div>
                </div>
                {/* Reverse flow: Hub → Teams */}
                <div 
                  className={`absolute top-1/2 -translate-y-1/2 transition-all ease-out ${
                    !isFromTeams && (phase === 5 || phase === 6) ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    right: !isFromTeams && phase >= 6 ? '100%' : '0%',
                    transition: 'right 0.6s ease-out, opacity 0.3s'
                  }}
                >
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-[#5558AF] shadow-lg shadow-primary/40">
                    <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />
                  </div>
                </div>
              </div>

              {/* SyncRivo Hub */}
              <SyncRivoHub phase={phase} />

              {/* Right connection (Slack side) */}
              <div className="flex-1 relative h-0.5 bg-gradient-to-r from-primary/30 to-[#4A154B]/20 rounded-full">
                {/* Forward flow: Hub → Slack */}
                <div 
                  className={`absolute top-1/2 -translate-y-1/2 transition-all ease-out ${
                    isFromTeams && (phase === 5 || phase === 6) ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    left: isFromTeams && phase >= 6 ? '100%' : '0%',
                    transition: 'left 0.6s ease-out, opacity 0.3s'
                  }}
                >
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-[#4A154B] shadow-lg shadow-primary/40">
                    <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />
                  </div>
                </div>
                {/* Reverse flow: Slack → Hub */}
                <div 
                  className={`absolute top-1/2 -translate-y-1/2 transition-all ease-out ${
                    !isFromTeams && (phase === 3 || phase === 4) ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    right: !isFromTeams && phase >= 4 ? '100%' : '0%',
                    transition: 'right 0.6s ease-out, opacity 0.3s'
                  }}
                >
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#4A154B] to-primary shadow-lg shadow-primary/40">
                    <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />
                  </div>
                </div>
              </div>
            </div>

            {/* Slack Panel */}
            <SlackPanel 
              phase={phase} 
              message={message}
              isSource={!isFromTeams}
              allMessages={conversations}
              currentIndex={currentMessage}
            />
          </div>

          {/* Mobile Layout */}
          <div className="flex md:hidden flex-col items-center gap-4">
            <TeamsPanel 
              phase={phase} 
              message={message}
              isSource={isFromTeams}
              allMessages={conversations}
              currentIndex={currentMessage}
            />
            
            {/* Top connection - Teams side */}
            <div className="relative w-0.5 h-12 bg-gradient-to-b from-[#5558AF]/30 to-primary/30 rounded-full">
              {/* Forward flow down */}
              <div 
                className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-lg transition-all duration-500 ${
                  isFromTeams && phase >= 3 && phase <= 4 ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  top: isFromTeams && phase === 4 ? '100%' : '0%',
                  transition: 'top 0.5s ease-out, opacity 0.3s'
                }}
              />
              {/* Reverse flow up */}
              <div 
                className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-lg transition-all duration-500 ${
                  !isFromTeams && phase >= 5 ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  bottom: !isFromTeams && phase >= 6 ? '100%' : '0%',
                  transition: 'bottom 0.5s ease-out, opacity 0.3s'
                }}
              />
            </div>

            <SyncRivoHub phase={phase} />

            {/* Bottom connection - Slack side */}
            <div className="relative w-0.5 h-12 bg-gradient-to-b from-primary/30 to-[#4A154B]/30 rounded-full">
              {/* Forward flow down */}
              <div 
                className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-lg transition-all duration-500 ${
                  isFromTeams && phase >= 5 ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  top: isFromTeams && phase >= 6 ? '100%' : '0%',
                  transition: 'top 0.5s ease-out, opacity 0.3s'
                }}
              />
              {/* Reverse flow up */}
              <div 
                className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-lg transition-all duration-500 ${
                  !isFromTeams && phase >= 3 && phase <= 4 ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  bottom: !isFromTeams && phase >= 4 ? '100%' : '0%',
                  transition: 'bottom 0.5s ease-out, opacity 0.3s'
                }}
              />
            </div>

            <SlackPanel 
              phase={phase} 
              message={message}
              isSource={!isFromTeams}
              allMessages={conversations}
              currentIndex={currentMessage}
            />
          </div>
        </div>

        {/* Message Counter */}
        <div className="flex justify-center gap-3 mt-14">
          {conversations.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => {
                setCurrentMessage(idx);
                setPhase(0);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentMessage ? 'bg-slate-900 dark:bg-white w-10' : 'bg-slate-300 dark:bg-slate-600 w-2.5 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        {/* Play/Pause + CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-14">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsPlaying(!isPlaying)}
            className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {isPlaying ? (
              <>
                <div className="w-4 h-4 mr-2 flex gap-1">
                  <div className="w-1.5 h-4 bg-current rounded-sm" />
                  <div className="w-1.5 h-4 bg-current rounded-sm" />
                </div>
                Pause Demo
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Play Demo
              </>
            )}
          </Button>
          
          <Button asChild size="lg" className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white shadow-xl group">
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
  
  const previousMessages = allMessages.slice(0, currentIndex);

  return (
    <div className="w-full md:w-[300px] lg:w-[340px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-[#5558AF] to-[#6264A7] text-white">
        <img src={teamsIcon} alt="Teams" className="w-5 h-5" />
        <span className="font-semibold text-sm">Microsoft Teams</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs opacity-80">Connected</span>
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="p-4 min-h-[200px] bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
        {previousMessages.map((msg) => (
          <MessageBubble 
            key={msg.id} 
            message={msg} 
            showVia={msg.from === 'slack'}
            viaText="via Slack"
            platform="teams"
          />
        ))}
        
        {(showTyping || showCurrentMessage) && (
          <div className="flex items-start gap-3 animate-fade-in">
            <img 
              src={message.photo} 
              alt={message.sender}
              className="w-9 h-9 rounded-full object-cover flex-shrink-0 ring-2 ring-slate-200 dark:ring-slate-700 shadow-md"
            />
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-sm font-semibold text-foreground">{message.sender}</span>
                <span className="text-xs text-muted-foreground">now</span>
              </div>
              
              {showTyping && !showCurrentMessage && (
                <div className="flex items-center gap-1.5 py-2">
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
              
              {showCurrentMessage && (
                <>
                  <div className="bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 inline-block shadow-sm border border-slate-100 dark:border-slate-700 animate-fade-in">
                    <p className="text-sm text-foreground">{message.text}</p>
                  </div>
                  {message.from === 'slack' && (
                    <div className="flex items-center gap-1.5 mt-2">
                      <Shield className="w-3 h-3 text-emerald-500" />
                      <span className="text-[10px] text-muted-foreground font-medium">via Slack • Encrypted</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Input */}
      <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <div className="flex items-center px-4 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
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
    <div className="relative mx-4">
      {/* Glow */}
      <div className={`absolute inset-0 bg-primary/20 rounded-2xl blur-xl transition-all duration-500 ${isProcessing ? 'scale-150 opacity-100' : 'scale-100 opacity-40'}`} />
      
      {/* Hub Card */}
      <div className={`relative w-28 h-28 lg:w-32 lg:h-32 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl flex flex-col items-center justify-center transition-all duration-300 ${isProcessing ? 'scale-110' : 'scale-100'}`}>
        {/* Icon */}
        <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 flex items-center justify-center shadow-lg transition-all duration-300 ${isProcessing ? 'animate-pulse' : ''}`}>
          <Zap className="w-6 h-6 lg:w-7 lg:h-7 text-white dark:text-slate-900" />
        </div>
        <span className="text-xs font-bold text-foreground mt-2">SyncRivo</span>
        
        {/* Processing Indicator */}
        {isProcessing && (
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-[10px] font-semibold rounded-full animate-fade-in flex items-center gap-1">
            <Lock className="w-3 h-3" />
            Encrypting...
          </div>
        )}
      </div>
    </div>
  );
};

// Slack Mock Panel
const SlackPanel = ({ 
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

  const previousMessages = allMessages.slice(0, currentIndex);

  return (
    <div className="w-full md:w-[300px] lg:w-[340px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-[#4A154B] to-[#611f69] text-white">
        <img src={slackIcon} alt="Slack" className="w-5 h-5" />
        <span className="font-semibold text-sm">Slack</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs opacity-80">Connected</span>
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="p-4 min-h-[200px] bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
        {previousMessages.map((msg) => (
          <MessageBubble 
            key={msg.id} 
            message={msg} 
            showVia={msg.from === 'teams'}
            viaText="via Teams"
            platform="slack"
          />
        ))}
        
        {!showTyping && !showCurrentMessage && currentIndex === 0 && (
          <div className="flex items-center justify-center h-[140px] text-muted-foreground text-sm">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Shield className="w-5 h-5 text-slate-400" />
              </div>
              <span>Waiting for messages...</span>
            </div>
          </div>
        )}
        
        {(showTyping || showCurrentMessage) && (
          <div className="flex items-start gap-3 animate-fade-in">
            <img 
              src={message.photo} 
              alt={message.sender}
              className="w-9 h-9 rounded-full object-cover flex-shrink-0 ring-2 ring-slate-200 dark:ring-slate-700 shadow-md"
            />
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-sm font-semibold text-foreground">{message.sender}</span>
                <span className="text-xs text-muted-foreground">{message.from === 'teams' ? 'via Teams' : 'now'}</span>
              </div>
              
              {showTyping && !showCurrentMessage && (
                <div className="flex items-center gap-1.5 py-2">
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
              
              {showCurrentMessage && (
                <>
                  <div className="bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 inline-block shadow-sm border border-slate-100 dark:border-slate-700 animate-fade-in">
                    <p className="text-sm text-foreground">{message.text}</p>
                  </div>
                  {message.from === 'teams' && (
                    <div className="flex items-center gap-1.5 mt-2">
                      <Shield className="w-3 h-3 text-emerald-500" />
                      <span className="text-[10px] text-muted-foreground font-medium">Delivered via SyncRivo</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Input */}
      <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <div className="flex items-center px-4 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
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
  viaText,
  platform
}: { 
  message: Message; 
  showVia: boolean;
  viaText: string;
  platform: 'teams' | 'slack';
}) => (
  <div className="flex items-start gap-3">
    <img 
      src={message.photo} 
      alt={message.sender}
      className="w-9 h-9 rounded-full object-cover flex-shrink-0 ring-2 ring-slate-200 dark:ring-slate-700 shadow-md"
    />
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm font-semibold text-foreground">{message.sender}</span>
        {showVia && <span className="text-xs text-muted-foreground">{viaText}</span>}
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 inline-block shadow-sm border border-slate-100 dark:border-slate-700">
        <p className="text-sm text-foreground">{message.text}</p>
      </div>
      {showVia && (
        <div className="flex items-center gap-1.5 mt-1.5">
          <Shield className="w-3 h-3 text-emerald-500" />
          <span className="text-[10px] text-muted-foreground font-medium">via SyncRivo • Encrypted</span>
        </div>
      )}
    </div>
  </div>
);

export default LiveMessageFlowDemo;
