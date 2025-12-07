import { motion } from 'framer-motion';
import { Shield, Cpu, Eye, Database, ArrowRight, Lock, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fadeInUp, staggerContainer } from './SolutionPageLayout';

interface ArchitectureDiagramProps {
  title?: string;
  subtitle?: string;
}

export function ArchitectureDiagram({ title, subtitle }: ArchitectureDiagramProps) {
  const { t } = useTranslation();
  
  const layers = [
    {
      name: t('solutions.architecture.layer1', 'Message Ingestion'),
      icon: <Zap className="h-5 w-5" />,
      color: 'primary',
      items: ['Teams Webhook', 'Slack Events API', 'Google Pub/Sub'],
    },
    {
      name: t('solutions.architecture.layer2', 'Policy Engine'),
      icon: <Shield className="h-5 w-5" />,
      color: 'accent',
      items: ['DLP Enforcement', 'Compliance Rules', 'User Policies'],
    },
    {
      name: t('solutions.architecture.layer3', 'Routing Core'),
      icon: <Cpu className="h-5 w-5" />,
      color: 'primary',
      items: ['Multi-Tenant Isolation', 'Zero Data Lake', 'E2E Encryption'],
    },
    {
      name: t('solutions.architecture.layer4', 'Observability'),
      icon: <Eye className="h-5 w-5" />,
      color: 'accent',
      items: ['Real-time Metrics', 'Audit Logging', 'SIEM Export'],
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4"
          >
            {title || t('solutions.architecture.title', 'Enterprise-Grade Architecture')}
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {subtitle || t('solutions.architecture.subtitle', 'Built for security, scalability, and compliance from day one')}
          </motion.p>
        </motion.div>
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative"
        >
          {/* Flow diagram */}
          <div className="grid md:grid-cols-4 gap-4 lg:gap-6">
            {layers.map((layer, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative"
              >
                <div className={`bg-card rounded-2xl p-5 lg:p-6 border border-border/50 shadow-brand-sm h-full ${
                  index % 2 === 0 ? 'hover:border-primary/30' : 'hover:border-accent/30'
                } transition-colors duration-300`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                    layer.color === 'primary' 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-accent/10 text-accent'
                  }`}>
                    {layer.icon}
                  </div>
                  
                  <h3 className="font-semibold text-foreground mb-3">
                    {layer.name}
                  </h3>
                  
                  <ul className="space-y-2">
                    {layer.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          layer.color === 'primary' ? 'bg-primary' : 'bg-accent'
                        }`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Arrow between cards */}
                {index < layers.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 lg:-right-4 -translate-y-1/2 z-10">
                    <ArrowRight className="h-5 w-5 text-muted-foreground/50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Key features bar */}
          <motion.div 
            variants={fadeInUp}
            className="mt-8 lg:mt-12 flex flex-wrap justify-center gap-4 lg:gap-8"
          >
            {[
              { icon: <Lock className="h-4 w-4" />, text: t('solutions.architecture.feature1', 'Multi-Tenant Isolation') },
              { icon: <Database className="h-4 w-4" />, text: t('solutions.architecture.feature2', 'Zero Data Lake') },
              { icon: <Shield className="h-4 w-4" />, text: t('solutions.architecture.feature3', 'Event-Driven') },
              { icon: <Eye className="h-4 w-4" />, text: t('solutions.architecture.feature4', 'Full Observability') },
            ].map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 px-4 py-2 rounded-full"
              >
                <span className="text-primary">{feature.icon}</span>
                {feature.text}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
