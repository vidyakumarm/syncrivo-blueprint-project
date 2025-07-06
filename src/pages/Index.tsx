import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
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
  const features = [
    {
      icon: MessageSquare,
      title: 'Universal Messaging Sync',
      description: 'Connect Teams, Webex, Google Chat, Zoom, Slack and more with bidirectional message synchronization.',
      benefits: ['Real-time message sync', 'Channel mapping', 'File attachments support']
    },
    {
      icon: Users,
      title: 'Team Management',
      description: 'Manage users, permissions, and access across all connected messaging platforms.',
      benefits: ['Unified user directory', 'Role-based access', 'Team analytics']
    },
    {
      icon: Workflow,
      title: 'Smart Workflows',
      description: 'Automate message routing, notifications, and cross-platform conversations.',
      benefits: ['Custom message routing', 'Automated responses', 'Workflow triggers']
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Track message volumes, platform usage, and communication patterns.',
      benefits: ['Message analytics', 'Platform metrics', 'Usage reports']
    }
  ];

  const useCases = [
    {
      title: 'Enterprise Communication',
      description: 'Unify messaging across different departments using various platforms.',
      icon: '🏢',
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      title: 'Remote Team Collaboration',
      description: 'Keep distributed teams connected regardless of their preferred platform.',
      icon: '🌍',
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      title: 'Customer Support',
      description: 'Integrate customer support channels with internal communication tools.',
      icon: '🎧',
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      title: 'Project Management',
      description: 'Sync project updates and notifications across all team communication channels.',
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
                Powerful Features
              </Badge>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Everything you need for messaging platform integration
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                SyncRio provides comprehensive tools to connect, sync, and manage all your business messaging platforms from one central hub.
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
                Perfect for every business communication need
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Whether you're managing enterprise communication or remote team collaboration, SyncRio adapts to your specific messaging integration needs.
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
                How SyncRio Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get your messaging platforms connected and syncing in just three simple steps.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-6 flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Connect Platforms</h3>
                <p className="text-muted-foreground">
                  Add your messaging platforms like Teams, Webex, Google Chat, Zoom, and Slack with secure OAuth authentication.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-6 flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Configure Sync</h3>
                <p className="text-muted-foreground">
                  Set up message routing, channel mapping, and sync preferences to match your team's communication workflow.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-6 flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Start Syncing</h3>
                <p className="text-muted-foreground">
                  Messages automatically sync across all connected platforms in real-time, keeping your team connected everywhere.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Ready to unify your messaging platforms?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of teams that trust SyncRio to seamlessly connect their business communication tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-primary hover:bg-primary-hover">
                <Link to="/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
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
};

export default Index;
