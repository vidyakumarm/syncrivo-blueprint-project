import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useTranslationWithFallback } from '@/hooks/useTranslationWithFallback';

export function CTASection() {
  const { t } = useTranslationWithFallback();

  return (
    <section className="py-28 lg:py-36 relative overflow-hidden">
      {/* Enhanced background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      
      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <div className="glass-card p-12 lg:p-16 rounded-3xl border-2 border-primary/20 animate-fade-in">
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
          
          <p className="text-lg lg:text-xl text-muted-foreground mb-14 max-w-2xl mx-auto leading-relaxed">
            {t('home.cta_subtitle')}
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-14 opacity-80">
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
          <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 justify-center items-center">
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
            
            <Button 
              variant="outline" 
              size="lg" 
              asChild
              className="group border-2 border-primary/40 hover:bg-primary/5 backdrop-blur-sm font-semibold px-12 py-4 text-lg hover:shadow-brand-lg hover:border-primary/60 transition-all duration-300 rounded-full"
            >
              <Link to="/dashboard">
                <span className="group-hover:text-primary transition-colors duration-300">
                  {t('home.view_demo')}
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}