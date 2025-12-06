import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, Calendar, Mail } from 'lucide-react';
import { useTranslationWithFallback } from '@/hooks/useTranslationWithFallback';
import { EnterpriseDemoModal } from './EnterpriseDemoModal';

export function CTASection() {
  const { t } = useTranslationWithFallback();
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
      {/* Enhanced background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      
      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <div className="glass-card p-8 lg:p-12 rounded-3xl border-2 border-primary/20 animate-fade-in">
          {/* Premium badge */}
          <Badge variant="secondary" className="mb-6 px-5 py-2.5 text-sm font-semibold bg-gradient-primary text-white border-0 shadow-brand-md hover:shadow-brand-lg hover:scale-105 transition-all duration-300">
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            {t('home.cta_badge', 'Ready to Transform Your Communication?')}
          </Badge>

          {/* Enhanced headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-[1.1] tracking-tight">
            <span className="block text-foreground mb-3">{t('home.cta_title')}</span>
            <span className="text-gradient-primary">{t('home.cta_title_highlight', 'in Minutes, Not Hours')}</span>
          </h2>
          
          <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('home.cta_subtitle')}
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8 opacity-80">
            {[
              { icon: CheckCircle2, text: t('home.cta_feature_1', 'Free 14-day trial') },
              { icon: CheckCircle2, text: t('home.cta_feature_2', 'No credit card required') },
              { icon: CheckCircle2, text: t('home.cta_feature_3', 'Setup in 5 minutes') }
            ].map((feature, index) => (
              <div key={index} className="flex items-center text-sm font-medium text-muted-foreground">
                <feature.icon className="h-4 w-4 text-success mr-2" />
                {feature.text}
              </div>
            ))}
          </div>

          {/* Enhanced CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 justify-center items-center mb-8">
            <Button 
              asChild 
              size="lg" 
              className="group relative overflow-hidden bg-gradient-primary hover:bg-gradient-primary-hover text-white font-bold px-12 py-4 text-lg shadow-brand-xl hover:shadow-brand-2xl transform hover:scale-105 focus:scale-105 active:scale-95 transition-all duration-300 rounded-full"
            >
              <Link to="/signup" aria-label="Start your free SyncRivo trial">
                <span className="relative z-10 flex items-center">
                  {t('home.start_free_trial')}
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </Link>
            </Button>
            
            {/* Premium Enterprise Demo Button */}
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={() => setDemoModalOpen(true)}
                className="group relative px-10 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
              >
                {/* Animated gradient border */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent to-success p-[2px] transition-all duration-500 group-hover:from-success group-hover:via-primary group-hover:to-accent">
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-background transition-all duration-300 group-hover:bg-primary/5">
                    <span className="sr-only">Button background</span>
                  </span>
                </span>
                
                {/* Button content */}
                <span className="relative z-10 flex items-center gap-2.5 text-foreground group-hover:text-primary transition-colors duration-300">
                  <Calendar className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
                  <span>{t('home.cta_book_demo', 'Book a Live Enterprise Demo')}</span>
                </span>
                
                {/* Subtle glow on hover */}
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] pointer-events-none" />
              </button>
              
              {/* Micro-trust text */}
              <p className="text-xs text-muted-foreground/70 font-medium tracking-wide">
                {t('home.cta_demo_trust', 'No credit card required · 1:1 guided session · 30–45 min')}
              </p>
            </div>
          </div>

          {/* Contact sales link */}
          <div className="flex justify-center">
            <Link 
              to="/support" 
              className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>{t('home.cta_prefer_email', 'Prefer email first?')}</span>
              <span className="font-medium">{t('home.cta_contact_sales', 'Contact Sales')}</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Enterprise Demo Modal */}
      <EnterpriseDemoModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
    </section>
  );
}
