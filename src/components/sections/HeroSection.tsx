import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  ArrowRight, 
  Zap, 
  Shield, 
  Users, 
  Globe,
  CheckCircle2,
  Workflow,
  MonitorSpeaker,
  MessageCircle,
  Video,
  Phone
} from 'lucide-react';

// Platform icons
import teamsIcon from '@/assets/teams-icon.svg';
import slackIcon from '@/assets/slack-icon.svg'; 
import zoomIcon from '@/assets/zoom-icon.png';
import googleChatIcon from '@/assets/google-chat-icon.png';
import webexIcon from '@/assets/webex-icon.png';
import discordIcon from '@/assets/discord-icon.png';
import { useTranslationWithFallback } from '@/hooks/useTranslationWithFallback';
import heroBg from '@/assets/hero-bg.jpg';
import i18next from 'i18next';

export function HeroSection() {
  const { t } = useTranslationWithFallback();

  console.log('🎭 [HeroSection] Component rendered', {
    timestamp: new Date().toISOString(),
    currentLanguage: i18next.language,
    path: window.location.pathname
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 pt-20">
      {/* Enhanced Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="" 
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-background/10 to-accent/25" />
        <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px]" />
        
        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.1)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[size:60px_60px] animate-pulse" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in space-y-8">
          {/* Enhanced Badge */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <Badge variant="secondary" className="px-6 py-3 text-base font-semibold bg-card/80 backdrop-blur-sm text-primary border-2 border-primary/30 shadow-brand-lg hover:shadow-brand-xl hover:scale-105 transition-all duration-300 animate-pulse-glow">
              <MessageSquare className="w-5 h-5 mr-3 animate-float" />
              {t('hero.badge')}
            </Badge>
          </div>

          {/* Enhanced Headline */}
          <div className="space-y-6 mb-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight">
              <span className="block text-foreground mb-3 animate-slide-in-left">{t('hero.title')}</span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent animate-slide-in-right">
                {t('hero.title_highlight')}
              </span>
            </h1>
          </div>

          {/* Enhanced Subheadline */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <Button 
              asChild 
              size="lg" 
              className="group relative overflow-hidden bg-gradient-primary hover:bg-gradient-primary-hover text-white font-bold px-10 py-4 text-lg shadow-brand-xl hover:shadow-brand-2xl transform hover:scale-105 focus:scale-105 active:scale-95 transition-all duration-300 rounded-full"
            >
              <Link to="/signup" aria-label="Start connecting your messaging platforms with SyncRivo">
                <span className="relative z-10 flex items-center">
                  {t('hero.cta_primary')}
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="group border-2 border-primary/40 hover:bg-card/80 backdrop-blur-sm font-semibold px-10 py-4 text-lg hover:shadow-brand-lg hover:border-primary/60 transition-all duration-300 rounded-full"
            >
              <MessageSquare className="mr-3 h-5 w-5 group-hover:animate-pulse" />
              {t('hero.cta_secondary')}
            </Button>
          </div>

          {/* Enhanced Social Proof */}
          <div className="flex flex-col items-center space-y-6 animate-slide-up mb-20" style={{ animationDelay: '600ms' }}>
            <p className="text-base font-medium text-muted-foreground">
              {t('hero.trusted_by')}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 opacity-70 hover:opacity-90 transition-opacity duration-300">
              {[
                { icon: Users, color: 'text-blue-500', name: t('home.platform_names.microsoft_teams') },
                { icon: Video, color: 'text-green-500', name: t('home.platform_names.cisco_webex') },
                { icon: MessageSquare, color: 'text-red-500', name: t('home.platform_names.google_chat') },
                { icon: Video, color: 'text-blue-400', name: t('home.platform_names.zoom') },
                { icon: MessageCircle, color: 'text-purple-500', name: t('home.platform_names.slack') }
              ].map((platform, index) => (
                <div 
                  key={platform.name}
                  className="flex items-center space-x-2 bg-card/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-border/30 hover:bg-card/50 hover:border-border/50 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${700 + index * 100}ms` }}
                >
                  <platform.icon className={`h-4 w-4 ${platform.color} animate-pulse`} />
                  <span className="text-xs font-medium text-muted-foreground">{platform.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Messaging Platform Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          {[
            { icon: Zap, title: t('hero.real_time_sync'), desc: t('hero.real_time_sync_desc'), gradient: 'bg-gradient-primary' },
            { icon: Shield, title: t('hero.enterprise_security'), desc: t('hero.enterprise_security_desc'), gradient: 'bg-gradient-success' },
            { icon: Globe, title: t('hero.cross_platform'), desc: t('hero.cross_platform_desc'), gradient: 'bg-gradient-primary' }
          ].map((feature, index) => (
            <div 
              key={feature.title}
              className="group text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-brand-lg hover:bg-card/70 hover:border-border/70 transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${800 + index * 150}ms` }}
            >
              <div className={`w-12 h-12 ${feature.gradient} rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-brand-md group-hover:shadow-brand-lg`}>
                <feature.icon className="h-6 w-6 text-white animate-float" style={{ animationDelay: `${index * 500}ms` }} />
              </div>
              <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Enhanced Supported Platforms Grid */}
        <div className="mt-20 max-w-6xl mx-auto animate-fade-in" style={{ animationDelay: '1200ms' }}>
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">
            {t('hero.supported_platforms')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: t('home.platform_names.microsoft_teams'), icon: teamsIcon, alt: 'Microsoft Teams logo', color: 'bg-blue-50 hover:bg-blue-100 border-blue-200 hover:border-blue-300 dark:bg-blue-950/50 dark:hover:bg-blue-900/50 dark:border-blue-800 dark:hover:border-blue-700' },
              { name: t('home.platform_names.slack'), icon: slackIcon, alt: 'Slack logo', color: 'bg-purple-50 hover:bg-purple-100 border-purple-200 hover:border-purple-300 dark:bg-purple-950/50 dark:hover:bg-purple-900/50 dark:border-purple-800 dark:hover:border-purple-700' },
              { name: t('home.platform_names.zoom'), icon: zoomIcon, alt: 'Zoom logo', color: 'bg-blue-50 hover:bg-blue-100 border-blue-200 hover:border-blue-300 dark:bg-blue-950/50 dark:hover:bg-blue-900/50 dark:border-blue-800 dark:hover:border-blue-700' },
              { name: t('home.platform_names.google_chat'), icon: googleChatIcon, alt: 'Google Chat logo', color: 'bg-red-50 hover:bg-red-100 border-red-200 hover:border-red-300 dark:bg-red-950/50 dark:hover:bg-red-900/50 dark:border-red-800 dark:hover:border-red-700' },
              { name: t('home.platform_names.cisco_webex'), icon: webexIcon, alt: 'Cisco Webex logo', color: 'bg-green-50 hover:bg-green-100 border-green-200 hover:border-green-300 dark:bg-green-950/50 dark:hover:bg-green-900/50 dark:border-green-800 dark:hover:border-green-700' },
              { name: t('home.platform_names.discord'), icon: discordIcon, alt: 'Discord logo', color: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 hover:border-indigo-300 dark:bg-indigo-950/50 dark:hover:bg-indigo-900/50 dark:border-indigo-800 dark:hover:border-indigo-700' }
            ].map((platform, index) => (
              <Card 
                key={index} 
                className={`p-6 text-center border-2 ${platform.color} hover:shadow-brand-lg transition-all duration-300 group cursor-pointer transform hover:-translate-y-1 animate-fade-in`}
                style={{ animationDelay: `${1300 + index * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <img 
                    src={platform.icon} 
                    alt={platform.alt}
                    className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300 filter group-hover:brightness-110"
                    loading="lazy"
                  />
                </div>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{platform.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Floating elements */}
      <div className="absolute top-1/4 left-8 w-2 h-2 bg-primary rounded-full animate-float opacity-50" style={{ animationDelay: '0s' }} />
      <div className="absolute top-1/3 right-12 w-3 h-3 bg-accent rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-primary rounded-full animate-float opacity-30" style={{ animationDelay: '2s' }} />
      <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-accent rounded-full animate-pulse opacity-25" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-1/3 right-8 w-1 h-1 bg-primary rounded-full animate-float opacity-40" style={{ animationDelay: '0.5s' }} />
    </section>
  );
}