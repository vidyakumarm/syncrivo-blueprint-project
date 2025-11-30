import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { CTASection } from '@/components/sections/CTASection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { SupportedPlatformsSection } from '@/components/sections/SupportedPlatformsSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslationWithFallback } from '@/hooks/useTranslationWithFallback';
import { 
  MessageSquare, 
  Users, 
  Video, 
  MessageCircle, 
  Phone,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Globe,
  Workflow,
  BarChart3
} from 'lucide-react';

const Index = () => {
  const { t } = useTranslationWithFallback();
  
  console.log('🏠 [HomePage] Component mounted', {
    timestamp: new Date().toISOString(),
    path: window.location.pathname,
    userAgent: navigator.userAgent
  });

  const features = [
    {
      icon: MessageSquare,
      title: t('home.universal_sync'),
      description: t('home.universal_sync_desc'),
      benefits: [t('home.real_time_sync'), t('home.channel_mapping'), t('home.file_support')]
    },
    {
      icon: Users,
      title: t('home.team_management'),
      description: t('home.team_management_desc'),
      benefits: [t('home.unified_directory'), t('home.role_access'), t('home.team_analytics')]
    },
    {
      icon: Workflow,
      title: t('home.smart_workflows'),
      description: t('home.smart_workflows_desc'),
      benefits: [t('home.custom_routing'), t('home.automated_responses'), t('home.workflow_triggers')]
    },
    {
      icon: BarChart3,
      title: t('home.analytics_insights'),
      description: t('home.analytics_insights_desc'),
      benefits: [t('home.message_analytics'), t('home.platform_metrics'), t('home.usage_reports')]
    }
  ];

  const useCases = [
    {
      title: t('home.enterprise_communication'),
      description: t('home.enterprise_communication_desc'),
      icon: '🏢',
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      title: t('home.remote_collaboration'),
      description: t('home.remote_collaboration_desc'),
      icon: '🌍',
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      title: t('home.customer_support'),
      description: t('home.customer_support_desc'),
      icon: '🎧',
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      title: t('home.project_management'),
      description: t('home.project_management_desc'),
      icon: '📋',
      color: 'bg-orange-50 text-orange-600 border-orange-200'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        
        {/* Minimalist Features Section - Asymmetric Grid */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-minimal" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-20">
              <Badge 
                variant="outline" 
                className="mb-6 px-4 py-2 text-sm border-primary/20 bg-primary/5"
              >
                {t('home.features_badge')}
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 max-w-2xl">
                {t('home.main_heading')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl">
                {t('home.features_subtitle')}
              </p>
            </div>

            {/* Asymmetric Feature Grid */}
            <div className="grid lg:grid-cols-12 gap-8">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className={`group glass-card card-interactive p-8 border border-border/20 hover:border-primary/20 ${
                    index % 3 === 0 ? 'lg:col-span-7' : 'lg:col-span-5'
                  } animate-fade-in`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardHeader className="p-0 mb-6">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold mb-3">
                      {feature.title}
                    </CardTitle>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ul className="space-y-3">
                      {feature.benefits.map((benefit, i) => (
                        <li 
                          key={i} 
                          className="flex items-start text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="h-4 w-4 text-success mr-2 flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Minimalist Use Cases - Asymmetric Cards */}
        <section className="py-32 bg-muted/30 diagonal-section">
          <div className="diagonal-content">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-16">
                <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 max-w-2xl">
                  {t('home.use_cases_title')}
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  {t('home.use_cases_subtitle')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {useCases.map((useCase, index) => (
                  <Card 
                    key={index} 
                    className={`group glass-card card-interactive border border-border/20 hover:border-primary/20 p-8 ${
                      index % 2 === 0 ? 'md:translate-y-8' : 'md:-translate-y-8'
                    } animate-fade-in`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader className="p-0">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-500">
                          {useCase.icon}
                        </div>
                        <ArrowRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      <CardTitle className="text-xl font-bold mb-3">
                        {useCase.title}
                      </CardTitle>
                      <p className="text-muted-foreground leading-relaxed">
                        {useCase.description}
                      </p>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Minimalist Process Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-minimal" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 max-w-2xl">
                {t('home.how_it_works')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl">
                {t('home.how_it_works_subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { number: 1, title: t('home.connect_platforms'), desc: t('home.connect_platforms_desc') },
                { number: 2, title: t('home.configure_sync'), desc: t('home.configure_sync_desc') },
                { number: 3, title: t('home.start_syncing'), desc: t('home.start_syncing_desc') }
              ].map((step, index) => (
                <div 
                  key={step.number} 
                  className="group relative animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="absolute -top-4 -left-4 text-8xl font-bold text-primary/5 -z-10">
                    {step.number}
                  </div>
                  
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl mb-6 flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-500">
                      {step.number}
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Minimal connector line */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-6 left-full w-8 h-px bg-border/30" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Supported Platforms Section */}
        <SupportedPlatformsSection />

        {/* Add testimonials section */}
        <TestimonialsSection />

        {/* Enhanced CTA Section */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
