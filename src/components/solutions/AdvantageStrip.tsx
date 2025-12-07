import { motion } from 'framer-motion';
import { Shield, Users, FileCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fadeInUp, staggerContainer } from './SolutionPageLayout';

export function AdvantageStrip() {
  const { t } = useTranslation();
  
  const advantages = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: t('solutions.advantage.zero_trust.title', 'Zero-Trust Routing Layer'),
      description: t('solutions.advantage.zero_trust.description', 'Messages routed securely through isolated channels with minimal data retention. No persistent storage of message content.'),
      color: 'primary',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t('solutions.advantage.identity.title', 'Enterprise Identity & Directory Sync'),
      description: t('solutions.advantage.identity.description', 'Seamless SCIM, Microsoft Graph, and Workday integration. Auto-provision users and maintain consistent identity across all platforms.'),
      color: 'accent',
    },
    {
      icon: <FileCheck className="h-6 w-6" />,
      title: t('solutions.advantage.compliance.title', 'Compliance & Audit Ready'),
      description: t('solutions.advantage.compliance.description', 'SIEM export, comprehensive logging, DLP hooks, and complete audit trails. Meet SOC 2, HIPAA, and GDPR requirements out of the box.'),
      color: 'primary',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20 mb-4">
              {t('solutions.advantage.badge', 'Enterprise Security & Architecture')}
            </span>
          </motion.div>
          <motion.h2 
            variants={fadeInUp}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4"
          >
            {t('solutions.advantage.title', 'The Syncrivo Advantage')}
          </motion.h2>
        </motion.div>
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-border/50 h-full">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${
                  advantage.color === 'primary' 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-accent/10 text-accent'
                }`}>
                  {advantage.icon}
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {advantage.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
