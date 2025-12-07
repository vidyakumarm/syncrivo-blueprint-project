import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fadeInUp, staggerContainer } from './SolutionPageLayout';
import { MessageFlowAnimation } from './MessageFlowAnimation';

interface SolutionHeroProps {
  badge: string;
  headline: string;
  subheadline: string;
  primaryPlatform?: 'teams' | 'slack' | 'google';
}

export function SolutionHero({ badge, headline, subheadline, primaryPlatform = 'teams' }: SolutionHeroProps) {
  const { t } = useTranslation();
  
  return (
    <section className="relative min-h-[calc(100vh-120px)] flex items-center py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Premium gradient background - matches homepage */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-background to-slate-100/50 dark:from-slate-950 dark:via-background dark:to-slate-900/50" />
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-radial from-primary/[0.08] via-primary/[0.03] to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-accent/[0.06] via-accent/[0.02] to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold bg-primary/10 dark:bg-primary/20 text-primary border border-primary/20 dark:border-primary/30 mb-6">
                {badge}
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold text-foreground leading-[1.1] tracking-tight mb-6"
            >
              {headline}
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              {subheadline}
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button 
                size="lg" 
                className="group bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white font-semibold px-8 py-6 text-base shadow-xl shadow-slate-900/20 dark:shadow-white/10 hover:shadow-2xl transition-all duration-300 rounded-xl hover:scale-[1.02]" 
                asChild
              >
                <Link to="/contact?type=enterprise-demo">
                  <Calendar className="mr-2 h-5 w-5" />
                  {t('solutions.cta.book_demo', 'Book Enterprise Demo')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="group border-2 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 font-semibold px-8 py-6 text-base transition-all duration-300 rounded-xl" 
                asChild
              >
                <Link to="/contact?type=architect">
                  <Users className="mr-2 h-5 w-5" />
                  {t('solutions.cta.talk_architect', 'Talk to an Architect')}
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Right: Hub Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex items-center justify-center py-8"
          >
            <MessageFlowAnimation primaryPlatform={primaryPlatform} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
