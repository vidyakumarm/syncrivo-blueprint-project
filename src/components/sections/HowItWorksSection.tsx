import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Plug, Settings, Rocket } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: Plug,
    title: 'Connect Platforms',
    description: 'Link your favorite messaging tools with one-click OAuth integrations.',
  },
  {
    number: 2,
    icon: Settings,
    title: 'Configure Sync',
    description: 'Set up intelligent routing rules and customize your workflow preferences.',
  },
  {
    number: 3,
    icon: Rocket,
    title: 'Start Syncing',
    description: 'Messages flow seamlessly across platforms in real-time. It just works.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Get Started in</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Three Simple Steps
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From setup to sync in under 5 minutes. No technical expertise required.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection lines */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <Card className="glass-card border-2 border-border/30 hover:border-primary/50 p-8 text-center transition-all duration-500 hover:scale-105 group">
                {/* Step number */}
                <motion.div
                  className="relative mb-8"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-accent p-0.5 glow-primary">
                    <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                      <step.icon className="h-10 w-10 text-primary group-hover:text-accent transition-colors duration-300" />
                    </div>
                  </div>
                  {/* Floating number badge */}
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {step.number}
                  </div>
                </motion.div>

                <h3 className="font-display text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
