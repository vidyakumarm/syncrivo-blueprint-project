import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  
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
        
        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium bg-primary-light text-primary border-primary/20">
                <Workflow className="w-4 h-4 mr-2" />
                {t('home.features_badge')}
              </Badge>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t('home.features_title')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t('home.features_subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="group border-border/50 hover:shadow-brand-xl transition-all duration-500 hover:border-primary/20 transform hover:-translate-y-3 animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 group-hover:shadow-brand-lg transition-all duration-300">
                      <feature.icon className="h-6 w-6 text-white group-hover:animate-pulse" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{feature.title}</CardTitle>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {feature.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, i) => (
                        <li 
                          key={i} 
                          className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-all duration-300 animate-fade-in"
                          style={{ animationDelay: `${(index * 200) + (i * 100)}ms` }}
                        >
                          <CheckCircle2 className="h-4 w-4 text-success mr-2 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t('home.use_cases_title')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('home.use_cases_subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {useCases.map((useCase, index) => (
                <Card 
                  key={index} 
                  className={`group border-2 ${useCase.color} hover:shadow-brand-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 animate-fade-in`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300 animate-float" style={{ animationDelay: `${index * 500}ms` }}>{useCase.icon}</span>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{useCase.title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground mt-2 group-hover:text-foreground transition-colors duration-300">
                      {useCase.description}
                    </p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-gradient-to-br from-primary-light/50 to-accent-light/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t('home.how_it_works')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-6 flex items-center justify-center text-white font-bold text-xl shadow-brand-lg hover:shadow-brand-xl hover:scale-110 transition-all duration-300 animate-pulse-glow">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{step.title}</h3>
                  <p className="text-muted-foreground">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              {t('home.cta_title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('home.cta_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '400ms' }}>
              <Button asChild size="lg" className="group relative overflow-hidden bg-gradient-primary hover:bg-gradient-primary-hover shadow-brand-xl hover:shadow-brand-2xl transform hover:scale-105 transition-all duration-300">
                <Link to="/signup" aria-label="Start your free trial with SyncRivo">
                  <span className="relative z-10 flex items-center">
                    {t('home.start_free_trial')}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="group hover:shadow-brand-lg hover:border-primary/60 transition-all duration-300">
                <Link to="/dashboard">
                  <span className="group-hover:text-primary transition-colors duration-300">{t('home.view_demo')}</span>
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
