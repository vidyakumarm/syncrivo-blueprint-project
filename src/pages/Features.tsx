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

export default function Features() {
  console.log('🎯 [Features] Component mounted', {
    timestamp: new Date().toISOString(),
    path: window.location.pathname,
    userAgent: navigator.userAgent
  });

  const features = [
    {
      icon: MessageSquare,
      title: 'Universal Message Sync',
      description: 'Sync messages, files, and conversations across Teams, Webex, Google Chat, Zoom, Slack and more.',
      benefits: ['Real-time bidirectional sync', 'File attachment support', 'Message threading preservation']
    },
    {
      icon: Users,
      title: 'Cross-Platform Teams',
      description: 'Manage team members and permissions across all connected messaging platforms.',
      benefits: ['Unified user directory', 'Role-based access control', 'Team presence sync']
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security with SOC 2 compliance and end-to-end encryption for all message data.',
      benefits: ['SOC 2 Type II certified', 'End-to-end encryption', 'Audit logs & compliance']
    },
    {
      icon: Zap,
      title: 'Real-Time Processing',
      description: 'Messages appear instantly across all platforms with sub-second latency and reliable delivery.',
      benefits: ['Sub-second latency', 'Guaranteed delivery', 'Offline message queuing']
    },
    {
      icon: Settings,
      title: 'Smart Channel Mapping',
      description: 'Intelligently map channels, rooms, and conversations between different messaging platforms.',
      benefits: ['Auto channel detection', 'Custom mapping rules', 'Bi-directional sync']
    },
    {
      icon: BarChart,
      title: 'Communication Analytics',
      description: 'Get insights into team communication patterns, platform usage, and message volumes.',
      benefits: ['Platform usage metrics', 'Communication patterns', 'Custom reporting']
    }
  ];

  const useCases = [
    {
      title: 'Enterprise Communication',
      description: 'Unify messaging across departments using Teams, Webex, Google Chat, and other platforms.',
      icon: '🏢',
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      title: 'Remote Team Sync',
      description: 'Keep distributed teams connected regardless of their preferred messaging platform.',
      icon: '🌍',
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      title: 'Customer Support Hub',
      description: 'Integrate customer support channels with internal messaging platforms for seamless communication.',
      icon: '🎧',
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      title: 'Project Coordination',
      description: 'Sync project updates and notifications across all team messaging channels automatically.',
      icon: '📋',
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
              <MessageSquare className="w-4 h-4 mr-2" />
              Messaging Platform Features
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Everything you need to
              <span className="block bg-gradient-hero bg-clip-text text-transparent">
                connect messaging platforms
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              From simple message syncing to complex cross-platform workflows, SyncRio provides all the tools 
              you need to integrate Teams, Webex, Google Chat, Zoom, Slack and other messaging platforms.
            </p>
            
            <Button asChild size="lg" className="bg-gradient-primary hover:bg-primary-hover">
              <Link to="/signup">
                Start Connecting Platforms
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
                Built for messaging platform integration
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every feature is designed to make messaging platform integration simple, secure, and scalable.
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
                Perfect for every communication scenario
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Whether you're managing enterprise communication or remote teams, SyncRio adapts to your messaging integration needs.
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
                  Real-Time Monitoring
                </Badge>
                
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Stay in control of your messaging platforms
                </h2>
                
                <p className="text-lg text-muted-foreground mb-8">
                  Get complete visibility into your messaging platform integrations with real-time monitoring, 
                  detailed analytics, and proactive alerting for all connected platforms.
                </p>
                
                <div className="space-y-4">
                  {[
                    'Real-time message sync metrics',
                    'Platform connectivity monitoring',
                    'Message delivery analytics',
                    'Cross-platform usage insights',
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
                      <span className="text-sm text-foreground">Microsoft Teams</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span className="text-xs text-muted-foreground">99.9% uptime</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Google Chat Sync</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span className="text-xs text-muted-foreground">2.3k messages/hour</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Slack Integration</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <span className="text-xs text-muted-foreground">Syncing</span>
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
              Ready to connect your messaging platforms?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of teams that trust SyncRio to seamlessly integrate their business communication tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-primary hover:bg-primary-hover">
                <Link to="/signup">Start Free Trial</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/dashboard">View Live Demo</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}