import { motion } from 'framer-motion';
import { Shield, Lock, Zap, CheckCircle } from 'lucide-react';

interface MessageFlowAnimationProps {
  primaryPlatform?: 'teams' | 'slack' | 'google';
}

export function MessageFlowAnimation({ primaryPlatform = 'teams' }: MessageFlowAnimationProps) {
  const platforms = [
    { name: 'Microsoft Teams', color: 'hsl(239, 84%, 67%)', position: 'top' },
    { name: 'Slack', color: 'hsl(330, 80%, 55%)', position: 'bottom-left' },
    { name: 'Google Chat', color: 'hsl(142, 76%, 36%)', position: 'bottom-right' },
  ];

  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl" />
      
      {/* Central Syncrivo Hub */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow-lg animate-pulse-subtle">
            <div className="text-center">
              <div className="text-primary-foreground font-bold text-lg">Syncrivo</div>
              <div className="text-primary-foreground/80 text-xs">Routing Layer</div>
            </div>
          </div>
          
          {/* Security indicators */}
          <motion.div 
            className="absolute -top-2 -right-2 bg-accent text-accent-foreground p-2 rounded-full shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 }}
          >
            <Shield className="h-4 w-4" />
          </motion.div>
          <motion.div 
            className="absolute -bottom-2 -left-2 bg-primary-700 text-primary-foreground p-2 rounded-full shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2 }}
          >
            <Lock className="h-4 w-4" />
          </motion.div>
        </div>
      </motion.div>
      
      {/* Platform nodes */}
      {platforms.map((platform, index) => {
        const positions = {
          top: { top: '5%', left: '50%', transform: 'translateX(-50%)' },
          'bottom-left': { bottom: '10%', left: '10%' },
          'bottom-right': { bottom: '10%', right: '10%' },
        };
        const pos = positions[platform.position as keyof typeof positions];
        
        return (
          <motion.div
            key={platform.name}
            className="absolute"
            style={pos}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
          >
            <div 
              className="w-24 h-24 rounded-2xl flex flex-col items-center justify-center text-primary-foreground shadow-brand-lg"
              style={{ backgroundColor: platform.color }}
            >
              <span className="text-xs font-medium text-center px-2">{platform.name}</span>
            </div>
          </motion.div>
        );
      })}
      
      {/* Animated connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
        {/* Teams to Center */}
        <motion.path
          d="M200 60 L200 150"
          stroke="url(#gradient-teams)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="8 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
        
        {/* Slack to Center */}
        <motion.path
          d="M70 320 L160 240"
          stroke="url(#gradient-slack)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="8 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        />
        
        {/* Google to Center */}
        <motion.path
          d="M330 320 L240 240"
          stroke="url(#gradient-google)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="8 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
        
        <defs>
          <linearGradient id="gradient-teams" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(239, 84%, 67%)" />
            <stop offset="100%" stopColor="hsl(239, 84%, 50%)" />
          </linearGradient>
          <linearGradient id="gradient-slack" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(330, 80%, 55%)" />
            <stop offset="100%" stopColor="hsl(239, 84%, 67%)" />
          </linearGradient>
          <linearGradient id="gradient-google" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="hsl(142, 76%, 36%)" />
            <stop offset="100%" stopColor="hsl(239, 84%, 67%)" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Animated message particles */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-primary shadow-glow"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: [0, 50, 100, 150],
            y: [0, 30, 60, 90],
          }}
          transition={{
            duration: 2,
            delay: i * 0.5 + 1.5,
            repeat: Infinity,
            repeatDelay: 3,
          }}
          style={{ left: '20%', top: '70%' }}
        />
      ))}
      
      {/* Status indicators */}
      <motion.div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-muted-foreground bg-card/90 backdrop-blur px-4 py-2 rounded-full border border-border/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <Zap className="h-3 w-3 text-accent" />
        <span>Real-time Sync</span>
        <span className="w-1 h-1 rounded-full bg-muted-foreground" />
        <CheckCircle className="h-3 w-3 text-accent" />
        <span>E2E Encrypted</span>
      </motion.div>
    </div>
  );
}
