import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import teamsIcon from '@/assets/teams-icon.svg';
import slackIcon from '@/assets/slack-icon.svg';
import { ArrowRight, Check } from 'lucide-react';

const messages = [
  { id: 1, platform: 'teams', text: 'Hey team, can we sync up on the Q4 roadmap?', time: '2:34 PM' },
  { id: 2, platform: 'slack', text: 'Absolutely! I have the latest deck ready to share.', time: '2:35 PM' },
  { id: 3, platform: 'teams', text: 'Perfect! Let\'s schedule for tomorrow at 10am.', time: '2:36 PM' },
  { id: 4, platform: 'slack', text: 'Sounds good, I\'ll send out the calendar invite.', time: '2:37 PM' },
];

export function DemoSection() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (visibleMessages.length < messages.length) {
        setSyncing(true);
        setTimeout(() => {
          setVisibleMessages(prev => [...prev, messages[prev.length].id]);
          setSyncing(false);
        }, 500);
      } else {
        // Reset after all messages shown
        setTimeout(() => {
          setVisibleMessages([]);
        }, 3000);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [visibleMessages]);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute inset-0 gradient-mesh opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <Badge className="mb-6 px-6 py-3 text-base font-semibold glass-card border-accent/30 text-foreground">
            <Check className="w-5 h-5 mr-2 text-accent" />
            See It In Action
          </Badge>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Real-Time</span>
            <br />
            <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
              Message Synchronization
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Watch messages flow seamlessly between Microsoft Teams and Slack in real-time.
          </p>
        </motion.div>

        {/* Demo Visualization */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 relative">
            {/* Sync indicator */}
            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <motion.div
                animate={syncing ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5 }}
                className="glass-card px-6 py-3 rounded-full border-2 border-primary/50 shadow-2xl"
              >
                <motion.div
                  animate={{ x: [-20, 20, -20] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center gap-2"
                >
                  <ArrowRight className={`h-5 w-5 ${syncing ? 'text-accent' : 'text-primary'}`} />
                  <span className="font-semibold text-sm">SYNC</span>
                </motion.div>
              </motion.div>
            </div>

            {/* Teams Chat */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass-card border-2 border-border/30 p-6 h-[500px] flex flex-col">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
                  <img src={teamsIcon} alt="Teams" className="h-10 w-10" />
                  <div>
                    <h3 className="font-display font-bold text-lg">Microsoft Teams</h3>
                    <p className="text-sm text-muted-foreground">Product Team</p>
                  </div>
                </div>
                <div className="flex-1 space-y-4 overflow-hidden">
                  <AnimatePresence>
                    {messages
                      .filter(m => m.platform === 'teams' && visibleMessages.includes(m.id))
                      .map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                          className="bg-primary/10 border border-primary/20 rounded-2xl p-4 rounded-tl-sm"
                        >
                          <p className="text-foreground mb-2">{message.text}</p>
                          <span className="text-xs text-muted-foreground">{message.time}</span>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>

            {/* Slack Chat */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass-card border-2 border-border/30 p-6 h-[500px] flex flex-col">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
                  <img src={slackIcon} alt="Slack" className="h-10 w-10" />
                  <div>
                    <h3 className="font-display font-bold text-lg">Slack</h3>
                    <p className="text-sm text-muted-foreground">#product-team</p>
                  </div>
                </div>
                <div className="flex-1 space-y-4 overflow-hidden">
                  <AnimatePresence>
                    {messages
                      .filter(m => m.platform === 'slack' && visibleMessages.includes(m.id))
                      .map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                          className="bg-accent/10 border border-accent/20 rounded-2xl p-4 rounded-tr-sm ml-auto max-w-[85%]"
                        >
                          <p className="text-foreground mb-2">{message.text}</p>
                          <span className="text-xs text-muted-foreground">{message.time}</span>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
