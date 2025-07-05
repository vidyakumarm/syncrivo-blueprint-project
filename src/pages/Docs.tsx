import { DocsLayout } from '@/components/docs/DocsLayout';
import { CodeBlock } from '@/components/docs/CodeBlock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

export default function Docs() {
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
      title: 'Slack to Webhook',
      description: 'Forward Slack messages to your API',
      language: 'JavaScript',
      badge: 'Popular',
      icon: <Zap className="h-5 w-5" />
    },
    {
      title: 'Google Drive Sync',
      description: 'Monitor file changes in Google Drive',
      language: 'Python',
      badge: 'New',
      icon: <Code className="h-5 w-5" />
    },
    {
      title: 'Notion Database',
      description: 'Sync Notion pages to your database',
      language: 'TypeScript',
      badge: 'Beta',
      icon: <Book className="h-5 w-5" />
    }
  ];

  const stats = [
    { label: 'Integrations', value: '50+', icon: <Zap className="h-4 w-4" /> },
    { label: 'API Calls/month', value: '10M+', icon: <CheckCircle2 className="h-4 w-4" /> },
    { label: 'Avg Response Time', value: '< 100ms', icon: <Clock className="h-4 w-4" /> },
    { label: 'Active Users', value: '5K+', icon: <Users className="h-4 w-4" /> },
  ];

  return (
    <DocsLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-light text-primary text-sm font-medium">
            <Star className="h-3 w-3 mr-1" />
            Documentation v2.0
          </div>
          <h1 className="text-4xl font-bold text-foreground">
            SyncRivo Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build powerful integrations and connect your favorite tools. 
            Get started in minutes with our comprehensive guides and API reference.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button className="bg-gradient-primary">
              <Book className="h-4 w-4 mr-2" />
              Quick Start Guide
            </Button>
            <Button variant="outline">
              <Code className="h-4 w-4 mr-2" />
              API Reference
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
              Quick Start
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Get up and running with SyncRivo in less than 5 minutes. Create your first integration 
              and start syncing data between your favorite tools.
            </p>
            <CodeBlock 
              code={quickStartCode}
              language="javascript"
              title="Create Your First Integration"
            />
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">
                Need help? Check out our step-by-step guide →
              </p>
              <Button variant="outline" size="sm">
                Full Tutorial
                <ArrowRight className="h-3 w-3 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Popular Examples */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Popular Examples</h2>
          <div className="grid md:grid-cols-3 gap-6">
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
                      View Code
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
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Create an Account</h3>
                  <p className="text-muted-foreground">
                    Sign up for a free SyncRivo account and get your API key from the dashboard.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Install the SDK</h3>
                  <p className="text-muted-foreground">
                    Use npm, pip, or our REST API directly to start building integrations.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Build Your First Integration</h3>
                  <p className="text-muted-foreground">
                    Follow our quick start guide to create your first data sync in minutes.
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