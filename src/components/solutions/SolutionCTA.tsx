import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, FileText, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fadeInUp, staggerContainer } from './SolutionPageLayout';

interface SolutionCTAProps {
  title?: string;
  subtitle?: string;
}

export function SolutionCTA({ title, subtitle }: SolutionCTAProps) {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-700 to-primary-900" />
          <div className="absolute inset-0 bg-grid opacity-10" />
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-300/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative px-6 py-12 lg:px-16 lg:py-20">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 
                variants={fadeInUp}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4"
              >
                {title || t('solutions.cta.title', 'Ready to Transform Your Enterprise Communication?')}
              </motion.h2>
              
              <motion.p 
                variants={fadeInUp}
                className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto"
              >
                {subtitle || t('solutions.cta.subtitle', 'Connect with our enterprise team to discuss your specific requirements and see Syncrivo in action.')}
              </motion.p>
              
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="group bg-primary-foreground text-primary hover:bg-primary-foreground/90"
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
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link to="/security">
                    <Shield className="mr-2 h-5 w-5" />
                    {t('solutions.cta.security_docs', 'Security Documentation')}
                  </Link>
                </Button>
              </motion.div>
              
              {/* Trust indicators */}
              <motion.div 
                variants={fadeInUp}
                className="mt-10 pt-8 border-t border-primary-foreground/20"
              >
                <div className="flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/70">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>{t('solutions.cta.soc2', 'SOC 2 Type II Certified')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>{t('solutions.cta.gdpr', 'GDPR Compliant')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>{t('solutions.cta.hipaa', 'HIPAA Ready')}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
