import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Shield, 
  BarChart, 
  Users, 
  Clock, 
  Settings, 
  GitBranch, 
  Monitor,
  CheckCircle,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Platform icons
import teamsIcon from '@/assets/teams-icon.svg';
import slackIcon from '@/assets/slack-icon.svg'; 
import zoomIcon from '@/assets/zoom-icon.png';
import googleChatIcon from '@/assets/google-chat-icon.png';
import webexIcon from '@/assets/webex-icon.png';
import discordIcon from '@/assets/discord-icon.png';

export default function Features() {
  const { t } = useTranslation();
  
  console.log('🎯 [Features] Component mounted', {
    timestamp: new Date().toISOString(),
    path: window.location.pathname,
    userAgent: navigator.userAgent,
    currentLanguage: localStorage.getItem('i18nextLng') || 'en'
  });

  const features = [
    {
      icon: MessageSquare,
      title: t('features.universal_sync'),
      description: t('features.universal_sync_desc'),
      benefits: [t('features.real_time_sync'), t('features.file_support'), t('features.bi_sync')]
    },
    {
      icon: Users,
      title: t('features.cross_platform_teams'),
      description: t('features.cross_platform_teams_desc'),
      benefits: [t('features.unified_directory'), t('features.role_access'), t('features.team_presence')]
    },
    {
      icon: Shield,
      title: t('features.enterprise_security'),
      description: t('features.enterprise_security_desc'),
      benefits: [t('features.soc2_certified'), t('features.end_to_end'), t('features.audit_logs')]
    },
    {
      icon: Zap,
      title: t('features.real_time_processing'),
      description: t('features.real_time_processing_desc'),
      benefits: [t('features.sub_second'), t('features.guaranteed_delivery'), t('features.offline_queuing')]
    },
    {
      icon: Settings,
      title: t('features.smart_channel_mapping'),
      description: t('features.smart_channel_mapping_desc'),
      benefits: [t('features.auto_detection'), t('features.custom_mapping'), t('features.bi_directional')]
    },
    {
      icon: BarChart,
      title: t('features.communication_analytics'),
      description: t('features.communication_analytics_desc'),
      benefits: [t('features.platform_metrics'), t('features.patterns'), t('features.custom_reporting')]
    }
  ];

  const useCases = [
    {
      title: t('use_cases.enterprise_communication'),
      description: t('use_cases.enterprise_communication_desc'),
      icon: '🏢',
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      title: t('use_cases.remote_team_sync'),
      description: t('use_cases.remote_team_sync_desc'),
      icon: '🌍',
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      title: t('use_cases.customer_support_hub'),
      description: t('use_cases.customer_support_hub_desc'),
      icon: '🎧',
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      title: t('use_cases.project_coordination'),
      description: t('use_cases.project_coordination_desc'),
      icon: '📋',
      color: 'bg-orange-50 text-orange-600 border-orange-200'
    }
  ];

  const platforms = [
    { name: 'Microsoft Teams', icon: teamsIcon, alt: 'Microsoft Teams logo' },
    { name: 'Slack', icon: slackIcon, alt: 'Slack logo' },
    { name: 'Zoom', icon: zoomIcon, alt: 'Zoom logo' },
    { name: 'Google Chat', icon: googleChatIcon, alt: 'Google Chat logo' },
    { name: 'Cisco Webex', icon: webexIcon, alt: 'Cisco Webex logo' },
    { name: 'Discord', icon: discordIcon, alt: 'Discord logo' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-light/50 to-accent-light/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium bg-primary-light text-primary border-primary/20">
              <MessageSquare className="w-4 h-4 mr-2" />
              {t('features.hero_badge')}
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {t('features.hero_title')}
              <span className="block bg-gradient-hero bg-clip-text text-transparent">
                {t('features.hero_title_highlight')}
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              {t('features.hero_subtitle')}
            </p>
            
            <Button asChild size="lg" className="bg-gradient-primary hover:bg-primary-hover">
              <Link to="/signup">
                {t('features.hero_cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t('features.section_title')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('features.section_subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-border/50 hover:shadow-brand-lg transition-all duration-300 hover:border-primary/20">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg mb-4 flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
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

        {/* Use Cases */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t('features.use_cases_title')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('features.use_cases_subtitle')}
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
                    <CardDescription className="text-base mt-2">
                      {useCase.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Monitoring Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className="mb-4 px-3 py-1 text-sm font-medium bg-accent-light text-accent border-accent/20">
                  <Monitor className="w-4 h-4 mr-2" />
                  {t('features.monitoring_badge')}
                </Badge>
                
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  {t('features.monitoring_title')}
                </h2>
                
                <p className="text-lg text-muted-foreground mb-8">
                  {t('features.monitoring_subtitle')}
                </p>
                
                <div className="space-y-4">
                  {[
                    t('features.monitoring_features.sync_metrics'),
                    t('features.monitoring_features.connectivity'),
                    t('features.monitoring_features.delivery_analytics'),
                    t('features.monitoring_features.usage_insights'),
                    t('features.monitoring_features.health_scoring')
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-success mr-3" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-card p-8 rounded-2xl border border-border shadow-brand-lg">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">{t('features.health_panel.title')}</span>
                    <Badge variant="secondary" className="bg-success-light text-success">{t('features.health_panel.status_healthy')}</Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Microsoft Teams</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span className="text-xs text-muted-foreground">{t('features.health_panel.teams_uptime')}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Google Chat Sync</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span className="text-xs text-muted-foreground">{t('features.health_panel.chat_messages')}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Slack Integration</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <span className="text-xs text-muted-foreground">{t('features.health_panel.slack_syncing')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              {t('features.cta_title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('features.cta_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-primary hover:bg-primary-hover">
                <Link to="/signup">{t('features.start_trial')}</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/dashboard">{t('features.view_demo')}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}