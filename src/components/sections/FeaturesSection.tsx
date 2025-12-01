import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Shield, Network, Bot, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Zap,
    title: 'Real-Time Sync',
    description: 'Messages synchronize instantly across all connected platforms with zero latency.',
    benefits: [
      'Sub-second message delivery',
      'Bidirectional sync',
      'Conflict resolution',
    ],
    gradient: 'from-primary to-accent',
  },
  {
    icon: Shield,
    title: 'Multi-Tenant Support',
    description: 'Enterprise-grade isolation with complete data separation and security.',
    benefits: [
      'Role-based access control',
      'Encrypted at rest & transit',
      'Compliance ready',
    ],
    gradient: 'from-accent to-primary',
  },
  {
    icon: Network,
    title: 'Message Routing Engine',
    description: 'Intelligent routing rules to send messages exactly where they need to go.',
    benefits: [
      'Custom routing logic',
      'Priority channels',
      'Auto-categorization',
    ],
    gradient: 'from-primary via-accent to-primary',
  },
  {
    icon: Bot,
    title: 'AI Summarizer',
    description: 'Automatically summarize long conversations and extract key action items.',
    benefits: [
      'Smart conversation insights',
      'Action item extraction',
      'Context preservation',
    ],
    gradient: 'from-accent via-primary to-accent',
  },
];

export function FeaturesSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div className="absolute inset-0 gradient-mesh opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <Badge className="mb-6 px-6 py-3 text-base font-semibold glass-card border-primary/30 text-foreground">
            <Zap className="w-5 h-5 mr-2 text-primary" />
            Powerful Features
          </Badge>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Everything You Need to</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Connect Your Team
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Built for scale, designed for simplicity. SyncRivo brings enterprise-grade features to teams of all sizes.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group h-full glass-card border-2 border-border/30 hover:border-primary/50 transition-all duration-500 hover:scale-[1.02]">
                <CardHeader className="pb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                      <feature.icon className="h-8 w-8 text-primary group-hover:text-accent transition-colors duration-500" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-display group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                  <p className="text-lg text-muted-foreground leading-relaxed pt-2">
                    {feature.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 + i * 0.1 }}
                        className="flex items-center text-base text-muted-foreground"
                      >
                        <CheckCircle2 className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
