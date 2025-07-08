import { useParams } from 'react-router-dom';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowRight, 
  Star, 
  Users, 
  Shield, 
  Zap, 
  CheckCircle, 
  ExternalLink,
  Play,
  FileText,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function IntegrationDetail() {
  const { id } = useParams();
  const { t } = useTranslation();

  // Mock data - in a real app, this would come from an API
  const integrationData: { [key: string]: any } = {
    slack: {
      name: 'Slack',
      description: 'Team communication and collaboration platform',
      longDescription: 'Slack is a cloud-based instant messaging platform designed for team collaboration. With SyncRivo\'s Slack integration, you can automate notifications, sync user data, and create powerful workflows that keep your team connected and informed.',
      icon: '💬',
      rating: 4.9,
      users: '50k+',
      category: 'Communication',
      color: 'bg-purple-50 border-purple-200 text-purple-600',
      features: [
        'Real-time message notifications',
        'User and channel synchronization',
        'Custom workflow automation',
        'File sharing integration',
        'Status and presence updates',
        'Bot and app management'
      ],
      useCases: [
        {
          title: 'Customer Support Alerts',
          description: 'Automatically notify support teams in Slack when new tickets are created in your helpdesk system.'
        },
        {
          title: 'Sales Notifications',
          description: 'Get instant Slack messages when new leads are added to your CRM or deals reach specific stages.'
        },
        {
          title: 'System Monitoring',
          description: 'Receive alerts about system status, deployments, and performance metrics directly in your team channels.'
        }
      ],
      pricing: 'Free',
      setupTime: '5 minutes',
      apiVersion: 'v2.0',
      lastUpdated: '2024-01-15'
    },
    salesforce: {
      name: 'Salesforce',
      description: 'World\'s #1 CRM platform',
      longDescription: 'Salesforce is the world\'s leading customer relationship management (CRM) platform. Our integration enables seamless data synchronization, automated workflows, and real-time updates between Salesforce and your other business applications.',
      icon: '☁️',
      rating: 4.8,
      users: '25k+',
      category: 'CRM & Sales',
      color: 'bg-blue-50 border-blue-200 text-blue-600',
      features: [
        'Bi-directional data sync',
        'Lead and contact management',
        'Opportunity tracking',
        'Custom field mapping',
        'Real-time updates',
        'Bulk data operations'
      ],
      useCases: [
        {
          title: 'Marketing Qualified Leads',
          description: 'Automatically create Salesforce leads from marketing automation platforms when prospects reach qualification thresholds.'
        },
        {
          title: 'Customer Success Workflows',
          description: 'Sync customer health scores and usage data to trigger proactive outreach and retention activities.'
        },
        {
          title: 'Revenue Operations',
          description: 'Integrate billing and subscription data to provide complete customer lifecycle visibility in Salesforce.'
        }
      ],
      pricing: 'Free',
      setupTime: '10 minutes',
      apiVersion: 'v54.0',
      lastUpdated: '2024-01-12'
    }
  };

  const integration = integrationData[id || ''] || {
    name: 'Integration Not Found',
    description: 'The requested integration could not be found.',
    longDescription: 'This integration may have been moved or is no longer available.',
    icon: '❓',
    rating: 0,
    users: '0',
    category: 'Unknown',
    color: 'bg-gray-50 border-gray-200 text-gray-600',
    features: [],
    useCases: [],
    pricing: 'N/A',
    setupTime: 'N/A',
    apiVersion: 'N/A',
    lastUpdated: 'N/A'
  };

  if (!integrationData[id || '']) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">{t('integration_detail.not_found_title')}</h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t('integration_detail.not_found_desc')}
            </p>
            <Button asChild>
              <Link to="/integrations">{t('integration_detail.browse_all')}</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-primary-light/30 to-accent-light/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-16 h-16 rounded-2xl border-2 ${integration.color} flex items-center justify-center text-2xl`}>
                    {integration.icon}
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-foreground mb-2">{integration.name}</h1>
                    <p className="text-lg text-muted-foreground">{integration.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 mb-6">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold mr-1">{integration.rating}</span>
                    <span className="text-muted-foreground text-sm">{t('integration_detail.rating')}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-muted-foreground mr-1" />
                    <span className="font-semibold mr-1">{integration.users}</span>
                    <span className="text-muted-foreground text-sm">{t('integration_detail.users')}</span>
                  </div>
                  <Badge variant="secondary" className="px-3 py-1">
                    {integration.category}
                  </Badge>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  {integration.longDescription}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-gradient-primary hover:bg-primary-hover">
                    <Zap className="mr-2 h-5 w-5" />
                    {t('integration_detail.connect_now')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    <Play className="mr-2 h-5 w-5" />
                    {t('integration_detail.view_demo')}
                  </Button>
                </div>
              </div>

              {/* Quick Info Card */}
              <Card className="lg:sticky lg:top-24">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="mr-2 h-5 w-5" />
                    {t('integration_detail.integration_details')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('integration_detail.pricing')}</span>
                    <span className="font-medium text-success">{integration.pricing}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('integration_detail.setup_time')}</span>
                    <span className="font-medium">{integration.setupTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('integration_detail.api_version')}</span>
                    <span className="font-medium">{integration.apiVersion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('integration_detail.last_updated')}</span>
                    <span className="font-medium">{integration.lastUpdated}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Shield className="mr-2 h-4 w-4 text-success" />
                      {t('integration_detail.enterprise_security')}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Zap className="mr-2 h-4 w-4 text-primary" />
                      {t('integration_detail.real_time_sync')}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <FileText className="mr-2 h-4 w-4 text-accent" />
                      {t('integration_detail.full_documentation')}
                    </div>
                  </div>

                  <Button className="w-full" asChild>
                    <Link to="/docs" className="flex items-center justify-center">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t('integration_detail.view_documentation')}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-8">{t('integration_detail.key_features')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integration.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-center p-4 rounded-lg border border-border bg-card hover:shadow-brand-sm transition-shadow">
                  <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-8">{t('integration_detail.popular_use_cases')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integration.useCases.map((useCase: any, index: number) => (
                <Card key={index} className="hover:shadow-brand-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {useCase.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              {t('integration_detail.ready_to_connect')} {integration.name}?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('integration_detail.setup_integration_desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-primary hover:bg-primary-hover">
                <Zap className="mr-2 h-5 w-5" />
                {t('integration_detail.start_integration')}
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/support">{t('common.support')}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}