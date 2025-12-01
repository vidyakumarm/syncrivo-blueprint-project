import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Crown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out SyncRivo',
    icon: Zap,
    features: [
      '2 platform connections',
      '1,000 messages/month',
      'Basic sync rules',
      'Community support',
      '7-day message history',
    ],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'per month',
    description: 'For teams that need more power',
    icon: Crown,
    features: [
      'Unlimited platform connections',
      'Unlimited messages',
      'Advanced routing engine',
      'Priority support',
      'Unlimited message history',
      'AI summarization',
      'Custom integrations',
      'SSO & SAML',
    ],
    cta: 'Start Pro Trial',
    highlighted: true,
  },
];

export function PricingSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
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
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Simple,</span>{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Transparent Pricing
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card
                className={`relative h-full glass-card border-2 ${
                  plan.highlighted
                    ? 'border-primary/50 shadow-2xl shadow-primary/20 scale-105'
                    : 'border-border/30'
                } transition-all duration-500 hover:scale-[1.02] group`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0 px-6 py-1 font-semibold">
                      MOST POPULAR
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-8 pt-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                    plan.highlighted ? 'from-primary to-accent' : 'from-primary/20 to-accent/20'
                  } p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                      <plan.icon className={`h-8 w-8 ${
                        plan.highlighted ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                    </div>
                  </div>

                  <CardTitle className="font-display text-3xl mb-2">{plan.name}</CardTitle>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-5xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className={`w-full font-semibold text-lg py-6 rounded-xl ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white glow-primary'
                        : 'glass-card border-2 border-border/50 hover:border-primary/50'
                    }`}
                  >
                    <Link to="/signup">{plan.cta}</Link>
                  </Button>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 + i * 0.1 }}
                        className="flex items-start text-base"
                      >
                        <Check className={`h-5 w-5 mr-3 flex-shrink-0 mt-0.5 ${
                          plan.highlighted ? 'text-accent' : 'text-primary'
                        }`} />
                        <span className="text-muted-foreground">{feature}</span>
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
