import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { useTranslationWithFallback } from '@/hooks/useTranslationWithFallback';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, Shield, Users, Zap, TrendingUp, MessageSquare, Globe, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import aboutHero from '@/assets/about-hero.jpg';
import aboutValues from '@/assets/about-values.jpg';

export default function About() {
  const { t } = useTranslationWithFallback();

  const values = [
    {
      icon: Lightbulb,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description'),
    },
    {
      icon: Shield,
      title: t('about.values.security.title'),
      description: t('about.values.security.description'),
    },
    {
      icon: Users,
      title: t('about.values.collaboration.title'),
      description: t('about.values.collaboration.description'),
    },
    {
      icon: Zap,
      title: t('about.values.simplicity.title'),
      description: t('about.values.simplicity.description'),
    },
  ];

  const timeline = [
    {
      year: t('about.timeline.founded.year'),
      title: t('about.timeline.founded.title'),
      description: t('about.timeline.founded.description'),
    },
    {
      year: t('about.timeline.mvp.year'),
      title: t('about.timeline.mvp.title'),
      description: t('about.timeline.mvp.description'),
    },
    {
      year: t('about.timeline.expansion.year'),
      title: t('about.timeline.expansion.title'),
      description: t('about.timeline.expansion.description'),
    },
    {
      year: t('about.timeline.enterprise.year'),
      title: t('about.timeline.enterprise.title'),
      description: t('about.timeline.enterprise.description'),
    },
    {
      year: t('about.timeline.growth.year'),
      title: t('about.timeline.growth.title'),
      description: t('about.timeline.growth.description'),
    },
  ];

  const stats = [
    {
      icon: Users,
      value: t('about.stats.users'),
      label: t('about.stats.users_label'),
    },
    {
      icon: Globe,
      value: t('about.stats.platforms'),
      label: t('about.stats.platforms_label'),
    },
    {
      icon: MessageSquare,
      value: t('about.stats.messages'),
      label: t('about.stats.messages_label'),
    },
    {
      icon: TrendingUp,
      value: t('about.stats.uptime'),
      label: t('about.stats.uptime_label'),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="w-fit">
                {t('about.hero.badge')}
              </Badge>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                  {t('about.hero.title')}{' '}
                  <span className="text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {t('about.hero.title_highlight')}
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t('about.hero.subtitle')}
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                <img
                  src={aboutHero}
                  alt="SyncRivo team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl animate-pulse-slow" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-xl animate-float" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center space-y-2">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t('about.story.title')}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t('about.story.subtitle')}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t('about.story.content')}
                </p>
                <div className="p-6 bg-card border border-border rounded-xl">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {t('about.story.mission')}
                  </h3>
                  <p className="text-muted-foreground">
                    {t('about.story.mission_content')}
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xl border border-border/50">
                  <img
                    src={aboutValues}
                    alt="Company values"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('about.values.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('about.values.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-border/50">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('about.timeline.title')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('about.timeline.subtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-accent to-primary opacity-20" />

              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={index} className="relative flex items-center space-x-8">
                    {/* Timeline dot */}
                    <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-4 mb-3">
                        <Badge variant="outline" className="text-primary border-primary">
                          {item.year}
                        </Badge>
                        <h3 className="text-xl font-semibold text-foreground">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('about.cta.title')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('about.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="px-8">
                <Link to="/signup">{t('about.cta.primary')}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8">
                <Link to="/support">{t('about.cta.secondary')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}