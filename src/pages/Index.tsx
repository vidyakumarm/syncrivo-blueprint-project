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
        
        {/* Enhanced Features Section */}
        <section className="py-24 bg-muted/20 relative overflow-hidden">
          {/* Background enhancements */}
          <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <Badge variant="secondary" className="mb-8 px-6 py-3 text-base font-semibold bg-gradient-primary text-white border-0 shadow-brand-md hover:shadow-brand-lg hover:scale-105 transition-all duration-300">
                <Workflow className="w-5 h-5 mr-2" />
                {t('home.features_badge')}
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                <span className="block text-foreground mb-2">{t('home.main_heading')}</span>
                <span className="text-gradient-primary">Advanced Integration Capabilities</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t('home.features_subtitle')}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-20">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="group glass-card card-interactive animate-fade-in p-8 border-2 border-border/30 hover:border-primary/30"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardHeader className="pb-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 group-hover:shadow-brand-lg transition-all duration-300">
                      <feature.icon className="h-8 w-8 text-white group-hover:animate-pulse" />
                    </div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300 mb-4">
                      {feature.title}
                    </CardTitle>
                    <p className="text-lg text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {feature.benefits.map((benefit, i) => (
                        <li 
                          key={i} 
                          className="flex items-start text-base text-muted-foreground group-hover:text-foreground transition-all duration-300 animate-fade-in"
                          style={{ animationDelay: `${(index * 200) + (i * 100)}ms` }}
                        >
                          <CheckCircle2 className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                          <span className="leading-relaxed">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Use Cases Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                {t('home.use_cases_title')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t('home.use_cases_subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {useCases.map((useCase, index) => (
                <Card 
                  key={index} 
                  className={`group glass-card card-interactive border-2 ${useCase.color} p-8 animate-fade-in`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardHeader className="pb-0">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-2xl animate-float" style={{ animationDelay: `${index * 500}ms` }}>
                          {useCase.icon}
                        </span>
                      </div>
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                        {useCase.title}
                      </CardTitle>
                    </div>
                    <p className="text-lg text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-relaxed">
                      {useCase.description}
                    </p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced How It Works Section */}
        <section className="py-24 bg-gradient-to-br from-primary-light/30 to-accent-light/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-mesh opacity-25" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                {t('home.how_it_works')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t('home.how_it_works_subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                { number: 1, title: t('home.connect_platforms'), desc: t('home.connect_platforms_desc') },
                { number: 2, title: t('home.configure_sync'), desc: t('home.configure_sync_desc') },
                { number: 3, title: t('home.start_syncing'), desc: t('home.start_syncing_desc') }
              ].map((step, index) => (
                <div 
                  key={step.number} 
                  className="text-center group animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Enhanced step number */}
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto flex items-center justify-center text-white font-bold text-2xl shadow-brand-lg group-hover:shadow-brand-xl group-hover:scale-110 transition-all duration-300">
                      {step.number}
                    </div>
                    {/* Connection line (except for last step) */}
                    {index < 2 && (
                      <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary to-accent opacity-30 transform translate-x-10 -translate-y-0.5" />
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-foreground mb-6 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    {step.desc}
                  </p>
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
