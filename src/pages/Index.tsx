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
                <Card key={index} className="border-border/50 hover:shadow-brand-lg transition-all duration-300 hover:border-primary/20">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg mb-4 flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-success mr-2 flex-shrink-0" />
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
                <Card key={index} className={`border-2 ${useCase.color} hover:shadow-brand-md transition-all duration-300`}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{useCase.icon}</span>
                      <CardTitle className="text-xl">{useCase.title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground mt-2">
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
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-6 flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{t('home.connect_platforms')}</h3>
                <p className="text-muted-foreground">
                  {t('home.connect_platforms_desc')}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-6 flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{t('home.configure_sync')}</h3>
                <p className="text-muted-foreground">
                  {t('home.configure_sync_desc')}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-6 flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{t('home.start_syncing')}</h3>
                <p className="text-muted-foreground">
                  {t('home.start_syncing_desc')}
                </p>
              </div>
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-primary hover:bg-primary-hover">
                <Link to="/signup">
                  {t('home.start_free_trial')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/dashboard">{t('home.view_demo')}</Link>
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
