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
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning-Fast Setup',
      description: 'Get your integrations running in minutes with our intuitive drag-and-drop interface.',
      benefits: ['Visual workflow builder', 'Pre-built templates', 'One-click deployment']
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security with SOC 2 compliance and end-to-end encryption.',
      benefits: ['SOC 2 Type II certified', 'End-to-end encryption', 'Role-based access control']
    },
    {
      icon: BarChart,
      title: 'Real-Time Analytics',
      description: 'Monitor performance, track usage, and get insights with comprehensive dashboards.',
      benefits: ['Live performance metrics', 'Custom reporting', 'Alerting & notifications']
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Work together seamlessly with team workspaces and permission management.',
      benefits: ['Team workspaces', 'Permission management', 'Activity audit logs']
    },
    {
      icon: Clock,
      title: 'Automated Workflows',
      description: 'Set up complex workflows that run automatically based on triggers and conditions.',
      benefits: ['Smart triggers', 'Conditional logic', 'Error handling & retries']
    },
    {
      icon: Settings,
      title: 'Advanced Configuration',
      description: 'Fine-tune every aspect of your integrations with powerful configuration options.',
      benefits: ['Custom field mapping', 'Data transformation', 'Webhook configuration']
    }
  ];

  const useCases = [
    {
      title: 'E-commerce Automation',
      description: 'Sync orders, inventory, and customer data across all your sales channels.',
      icon: '🛒',
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      title: 'Marketing Operations',
      description: 'Connect your CRM, email marketing, and analytics tools for unified campaigns.',
      icon: '📈',
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      title: 'Customer Support',
      description: 'Integrate support tickets with CRM and knowledge base for better service.',
      icon: '🎧',
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      title: 'Financial Management',
      description: 'Automate invoicing, payments, and financial reporting across platforms.',
      icon: '💰',
      color: 'bg-orange-50 text-orange-600 border-orange-200'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-light/50 to-accent-light/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium bg-primary-light text-primary border-primary/20">
              <GitBranch className="w-4 h-4 mr-2" />
              Powerful Features
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Everything you need to
              <span className="block bg-gradient-hero bg-clip-text text-transparent">
                connect your stack
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              From simple data syncing to complex workflow automation, SyncRivo provides all the tools 
              you need to integrate and orchestrate your business applications.
            </p>
            
            <Button asChild size="lg" className="bg-gradient-primary hover:bg-primary-hover">
              <Link to="/signup">
                Start Building Today
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
                Built for modern teams
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every feature is designed to make integration management simple, secure, and scalable.
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
                Perfect for every use case
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Whether you're a startup or enterprise, SyncRivo adapts to your specific integration needs.
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
                  Monitoring & Insights
                </Badge>
                
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Stay in control with powerful monitoring
                </h2>
                
                <p className="text-lg text-muted-foreground mb-8">
                  Get complete visibility into your integrations with real-time monitoring, 
                  detailed analytics, and proactive alerting.
                </p>
                
                <div className="space-y-4">
                  {[
                    'Real-time performance metrics',
                    'Error tracking and debugging',
                    'Usage analytics and trends',
                    'Custom alerts and notifications',
                    'Integration health scoring'
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
                    <span className="text-sm font-medium text-muted-foreground">Integration Health</span>
                    <Badge variant="secondary" className="bg-success-light text-success">Healthy</Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Slack Integration</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span className="text-xs text-muted-foreground">99.9% uptime</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Salesforce Sync</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span className="text-xs text-muted-foreground">2.3k records/hour</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Shopify Orders</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <span className="text-xs text-muted-foreground">Processing</span>
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
              Ready to streamline your integrations?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of companies that trust SyncRivo to power their business integrations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-primary hover:bg-primary-hover">
                <Link to="/signup">Start Free Trial</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/integrations">Browse Integrations</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}