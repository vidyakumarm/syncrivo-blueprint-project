import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SolutionPageLayout, fadeInUp, staggerContainer } from '@/components/solutions/SolutionPageLayout';
import { Users, Building2, Layers, Unlock, Globe, Headphones, ShieldCheck, AlertTriangle, Network, Rocket, Code2, ArrowRight } from 'lucide-react';

const solutions = [
  {
    path: '/solutions/frontline-workforce',
    icon: Users,
    key: 'frontline',
    color: 'primary',
    title: 'Frontline Workforce',
    description: 'Unite Your Entire Workforce on Any Platform. Bridge the communication gap between HQ and frontline workers.'
  },
  {
    path: '/solutions/mergers-acquisitions',
    icon: Building2,
    key: 'ma',
    color: 'accent',
    title: 'M&A Day-1 Bridge',
    description: 'Day-1 Ready Messaging for Mergers & Acquisitions. Enable instant cross-platform collaboration the moment the deal closes.'
  },
  {
    path: '/solutions/multi-platform',
    icon: Layers,
    key: 'multiplatform',
    color: 'primary',
    title: 'Hybrid Messaging',
    description: 'Multi-Platform Coexistence Without Compromise. Enable seamless collaboration across Teams, Slack, and Google Chat.'
  },
  {
    path: '/solutions/vendor-flexibility',
    icon: Unlock,
    key: 'vendor',
    color: 'accent',
    title: 'Vendor Flexibility',
    description: 'Escape Vendor Lock-In. Optimize License Costs. Reduce dependency on any single platform vendor.'
  },
  {
    path: '/solutions/external-partners',
    icon: Globe,
    key: 'partner',
    color: 'primary',
    title: 'Partner Messaging Hub',
    description: 'Secure External Partner Communication Hub. Connect with partners, vendors, and clients without exposing internal systems.'
  },
  {
    path: '/solutions/customer-support',
    icon: Headphones,
    key: 'support',
    color: 'accent',
    title: 'Unified Support',
    description: 'Unified Customer Support & Ticketing Integration. Aggregate support conversations from all platforms into unified workflows.'
  },
  {
    path: '/solutions/regulated-industries',
    icon: ShieldCheck,
    key: 'regulated',
    color: 'primary',
    title: 'Regulated Industries',
    description: 'Enterprise Messaging for Regulated Industries. Meet stringent compliance requirements while enabling modern collaboration.'
  },
  {
    path: '/solutions/incident-response',
    icon: AlertTriangle,
    key: 'incident',
    color: 'accent',
    title: 'Incident Response',
    description: 'Incident Response & War Room Synchronization. Unite SRE, DevOps, Security, and Leadership in real-time incident channels.'
  },
  {
    path: '/solutions/inter-department',
    icon: Network,
    key: 'interdept',
    color: 'primary',
    title: 'Inter-Department',
    description: 'Break Down Department Silos. Enable seamless cross-functional collaboration on projects that matter.'
  },
  {
    path: '/solutions/global-subsidiaries',
    icon: Globe,
    key: 'global',
    color: 'accent',
    title: 'Global Organizations',
    description: 'Global Subsidiary & Multi-Brand Messaging. Respect local platform autonomy while enabling seamless corporate coordination.'
  },
  {
    path: '/solutions/digital-transformation',
    icon: Rocket,
    key: 'digital',
    color: 'primary',
    title: 'Digital Transformation',
    description: 'Enterprise Digital Transformation Messaging Layer. Deploy automations, AI assistants, and modern workflows across all platforms.'
  },
  {
    path: '/solutions/developer-platform',
    icon: Code2,
    key: 'developer',
    color: 'accent',
    title: 'Developer Platform',
    description: 'Unified API for Bots, Workflows & Automation. Build once, deploy everywhere with a single API.'
  },
];

export default function Solutions() {
  const { t } = useTranslation();

  return (
    <SolutionPageLayout>
      <section className="py-20 md:py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="text-center mb-16">
            <motion.span variants={fadeInUp} className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
              {t('solutions.index.badge', 'Enterprise Solutions')}
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t('solutions.index.title', 'Solutions for Every Enterprise Challenge')}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('solutions.index.subtitle', 'Discover how Syncrivo solves your specific cross-platform messaging challenges with enterprise-grade security and compliance.')}
            </motion.p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <motion.div key={solution.path} variants={fadeInUp}>
                <Link to={solution.path} className="group block bg-card rounded-2xl p-6 border border-border/50 shadow-brand-sm hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${solution.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}`}>
                    <solution.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {t(`solutions.${solution.key}.badge`, solution.title)}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t(`solutions.${solution.key}.subheadline`, solution.description).slice(0, 120)}...
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-primary">
                    {t('solutions.index.learn_more', 'Learn more')}
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </SolutionPageLayout>
  );
}
