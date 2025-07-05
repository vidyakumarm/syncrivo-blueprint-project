import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { ContactForm } from '@/components/support/ContactForm';
import { FAQSection } from '@/components/support/FAQSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  Clock,
  Users,
  BookOpen,
  ExternalLink,
  CheckCircle2,
  Zap,
  Heart
} from 'lucide-react';

export default function Support() {
  const { t } = useTranslation();
  
  const supportChannels = [
    {
      title: t('support.live_chat'),
      description: t('support.live_chat_desc'),
      icon: <MessageCircle className="h-6 w-6" />,
      availability: '24/7',
      responseTime: '< 2 minutes',
      badge: 'Fastest',
      action: t('support.start_chat')
    },
    {
      title: t('support.email_support'),
      description: t('support.email_support_desc'),
      icon: <Mail className="h-6 w-6" />,
      availability: 'Mon-Fri 9AM-6PM EST',
      responseTime: '< 24 hours',
      badge: 'Most Popular',
      action: t('support.send_email')
    },
    {
      title: t('support.phone_support'),
      description: t('support.phone_support_desc'),
      icon: <Phone className="h-6 w-6" />,
      availability: 'Business hours only',
      responseTime: 'Immediate',
      badge: 'Enterprise',
      action: t('support.schedule_call')
    }
  ];

  const resources = [
    {
      title: t('common.documentation'),
      description: 'Comprehensive guides and API reference',
      icon: <BookOpen className="h-5 w-5" />,
      link: '/docs'
    },
    {
      title: 'Community Forum',
      description: 'Connect with other SyncRivo users',
      icon: <Users className="h-5 w-5" />,
      link: '#community'
    },
    {
      title: 'Status Page',
      description: 'Check system status and uptime',
      icon: <Zap className="h-5 w-5" />,
      link: '#status'
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      icon: <ExternalLink className="h-5 w-5" />,
      link: '#tutorials'
    }
  ];

  const stats = [
    { label: 'Average Response Time', value: '< 1 hour', icon: <Clock className="h-4 w-4" /> },
    { label: 'Customer Satisfaction', value: '98%', icon: <Heart className="h-4 w-4" /> },
    { label: 'Issues Resolved', value: '99.2%', icon: <CheckCircle2 className="h-4 w-4" /> },
    { label: 'Support Articles', value: '200+', icon: <BookOpen className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-6">{t('support.title')}</h1>
            <p className="text-xl opacity-90 mb-8">
              {t('support.subtitle')}
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2 opacity-80">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support Channels */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your Support Channel</h2>
              <p className="text-muted-foreground">
                Multiple ways to get help, pick what works best for you
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {supportChannels.map((channel, index) => (
                <Card key={index} className="bg-gradient-card hover:shadow-brand-lg transition-shadow">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                      {channel.icon}
                    </div>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <CardTitle className="text-xl">{channel.title}</CardTitle>
                      <Badge variant="secondary">{channel.badge}</Badge>
                    </div>
                    <p className="text-muted-foreground">{channel.description}</p>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{channel.availability}</span>
                      </div>
                      <div className="font-medium text-foreground">
                        Response time: {channel.responseTime}
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-gradient-primary"
                      onClick={() => {
                        if (channel.title === t('support.live_chat')) {
                          window.open('https://tawk.to/chat/syncrivo', '_blank');
                        } else if (channel.title === t('support.email_support')) {
                          window.location.href = 'mailto:support@syncrivo.com?subject=Support Request';
                        } else if (channel.title === t('support.phone_support')) {
                          window.open('https://calendly.com/syncrivo/support-call', '_blank');
                        }
                      }}
                    >
                      {channel.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact" className="py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">{t('support.contact_form_title')}</h2>
                <p className="text-muted-foreground mb-8">
                  {t('support.contact_form_subtitle')}
                </p>
                
                {/* Self-Service Resources */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">{t('support.self_service')}</h3>
                  <div className="grid gap-3">
                    {resources.map((resource, index) => (
                      <a
                        key={index}
                        href={resource.link}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-card hover:bg-accent transition-colors group"
                      >
                        <div className="text-primary">
                          {resource.icon}
                        </div>
                        <div>
                          <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {resource.title}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {resource.description}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              
              <ContactForm />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQSection />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}