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
    <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
                {badge}
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-6"
            >
              {headline}
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8"
            >
              {subheadline}
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button size="lg" className="group" asChild>
                <Link to="/contact?type=enterprise-demo">
                  <Calendar className="mr-2 h-5 w-5" />
                  {t('solutions.cta.book_demo', 'Book Enterprise Demo')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="group" asChild>
                <Link to="/contact?type=architect">
                  <Users className="mr-2 h-5 w-5" />
                  {t('solutions.cta.talk_architect', 'Talk to an Architect')}
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Right: Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <MessageFlowAnimation primaryPlatform={primaryPlatform} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
