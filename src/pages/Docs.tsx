import { DocsLayout } from '@/components/docs/DocsLayout';
import { CodeBlock } from '@/components/docs/CodeBlock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import {
  Zap,
  Book,
  Code,
  ArrowRight,
  CheckCircle2,
  Clock,
  Users,
  Star
} from 'lucide-react';
import { SEO } from '@/components/seo/SEO';

export default function Docs() {
  const { t } = useTranslation();
  const quickStartCode = `// Install SyncRivo SDK
npm install @syncrivo/sdk

// Initialize client
import { SyncRivo } from '@syncrivo/sdk';

const client = new SyncRivo({
  apiKey: 'your-api-key',
  environment: 'production' // or 'sandbox'
});

// Create your first integration
const integration = await client.integrations.create({
  name: 'My Slack Integration',
  source: 'slack',
  destination: 'webhook',
  config: {
    slackToken: 'xoxb-your-token',
    webhookUrl: 'https://your-api.com/webhook'
  }
});

console.log('Integration created:', integration.id);`;

  const examples = [
    {
      title: t('docs.slack_webhook'),
      description: t('docs.slack_webhook_desc'),
      language: 'JavaScript',
      badge: t('docs.badge_popular'),
      icon: <Zap className="h-5 w-5" />
    },
    {
      title: t('docs.google_drive'),
      description: t('docs.google_drive_desc'),
      language: 'Python',
      badge: t('docs.badge_new'),
      icon: <Code className="h-5 w-5" />
    },
    {
      title: t('docs.notion_database'),
      description: t('docs.notion_database_desc'),
      language: 'TypeScript',
      badge: t('docs.badge_beta'),
      icon: <Book className="h-5 w-5" />
    }
  ];

  const stats = [
    { label: t('docs.integrations_stat'), value: '50+', icon: <Zap className="h-4 w-4" /> },
    { label: t('docs.api_calls_stat'), value: '10M+', icon: <CheckCircle2 className="h-4 w-4" /> },
    { label: t('docs.response_time_stat'), value: '< 100ms', icon: <Clock className="h-4 w-4" /> },
    { label: t('docs.active_users_stat'), value: '5K+', icon: <Users className="h-4 w-4" /> },
  ];

  return (
    <DocsLayout>
      <SEO
        title="Developer Documentation & API Reference | SyncRivo"
        description="Integrate SyncRivo with your apps. Complete SDK documentation, API reference, and quickstart guides for Slack, Teams, and Google Workspace integrations."
      />
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-light text-primary text-sm font-medium">
            <Star className="h-3 w-3 mr-1" />
            {t('docs.version')}
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            {t('docs.docs_title')}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('docs.docs_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-gradient-primary w-full sm:w-auto">
              <Book className="h-4 w-4 mr-2" />
              {t('docs.quick_start_guide')}
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              <Code className="h-4 w-4 mr-2" />
              {t('docs.api_reference')}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center bg-gradient-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-2 text-primary">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Start */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              {t('docs.quick_start')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              {t('docs.quick_start_desc')}
            </p>
            <CodeBlock
              code={quickStartCode}
              language="javascript"
              title={t('docs.create_integration')}
            />
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">
                {t('docs.need_help')}
              </p>
              <Button variant="outline" size="sm">
                {t('docs.full_tutorial')}
                <ArrowRight className="h-3 w-3 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Popular Examples */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">{t('docs.popular_examples')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examples.map((example, index) => (
              <Card key={index} className="bg-gradient-card hover:shadow-brand-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-primary">
                      {example.icon}
                    </div>
                    <Badge variant="secondary">{example.badge}</Badge>
                  </div>
                  <CardTitle className="text-lg">{example.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{example.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{example.language}</Badge>
                    <Button variant="ghost" size="sm">
                      {t('docs.view_code')}
                      <ArrowRight className="h-3 w-3 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Getting Started Steps */}
        <Card>
          <CardHeader>
            <CardTitle>{t('docs.getting_started')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t('docs.create_account')}</h3>
                  <p className="text-muted-foreground">
                    {t('docs.create_account_desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t('docs.install_sdk')}</h3>
                  <p className="text-muted-foreground">
                    {t('docs.install_sdk_desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t('docs.build_integration')}</h3>
                  <p className="text-muted-foreground">
                    {t('docs.build_integration_desc')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DocsLayout>
  );
}