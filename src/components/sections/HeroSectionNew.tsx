import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import teamsIcon from '@/assets/teams-icon.svg';
import slackIcon from '@/assets/slack-icon.svg';
import zoomIcon from '@/assets/zoom-icon.png';
import googleChatIcon from '@/assets/google-chat-icon.png';

export function HeroSectionNew() {
  const platforms = [
    { icon: teamsIcon, name: 'Teams', delay: 0 },
    { icon: slackIcon, name: 'Slack', delay: 0.1 },
    { icon: zoomIcon, name: 'Zoom', delay: 0.2 },
    { icon: googleChatIcon, name: 'Google Chat', delay: 0.3 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh" />
      
      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.1)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/20 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <Badge className="px-6 py-3 text-base font-semibold glass-card border-primary/30 text-foreground hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 mr-2 text-primary" />
              Next-Generation Messaging Platform
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight">
              <span className="block text-foreground mb-2">Unify Chats Across</span>
              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_8s_linear_infinite]">
                Teams, Slack, Zoom & More
              </span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Real-time message synchronization across 26+ platforms. One unified inbox, zero context switching.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-10 py-6 text-lg shadow-2xl hover:shadow-primary/50 transition-all duration-300 rounded-xl glow-primary"
            >
              <Link to="/signup">
                <Zap className="mr-2 h-5 w-5" />
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="glass-card border-2 border-border/50 hover:border-primary/50 font-semibold px-10 py-6 text-lg transition-all duration-300 rounded-xl"
            >
              Watch Demo
            </Button>
          </motion.div>

          {/* Platform Icons with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pt-16"
          >
            <p className="text-sm text-muted-foreground mb-8 font-medium">
              TRUSTED BY TEAMS USING
            </p>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              {platforms.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 + platform.delay }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="relative group"
                >
                  <div className="glass-card p-6 rounded-2xl border-border/30 group-hover:border-primary/50 transition-all duration-300">
                    <img 
                      src={platform.icon} 
                      alt={platform.name}
                      className="h-12 w-12 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  {/* Connection lines */}
                  {index < platforms.length - 1 && (
                    <motion.div
                      className="hidden md:block absolute top-1/2 -right-8 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: 1.2 + platform.delay }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </section>
  );
}
