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
import { PlatformCarousel } from './PlatformCarousel';

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
                { icon: teamsIcon, name: 'Microsoft Teams Integration', desc: 'Connect with CRM' },
                { icon: webexIcon, name: 'Webex Meeting Sync', desc: 'Auto-create tickets' },
                { icon: slackIcon, name: 'Slack Workflow Hub', desc: 'Project notifications' },
                { icon: zoomIcon, name: 'Zoom Recording Pipeline', desc: 'Auto-transcription' },
                { icon: googleChatIcon, name: 'Google Chat Sync', desc: 'Team collaboration' },
                { icon: discordIcon, name: 'Discord Integration', desc: 'Community management' }
              ].map((integration, index) => (
                <div 
                  key={integration.name}
                  className="flex flex-col items-center space-y-1 bg-card/30 backdrop-blur-sm px-4 py-3 rounded-lg border border-border/30 hover:bg-card/50 hover:border-border/50 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${700 + index * 100}ms` }}
                >
                  <img src={integration.icon} alt={integration.name} className="h-8 w-8 object-contain animate-pulse" />
                  <span className="text-xs font-medium text-muted-foreground text-center">{integration.name}</span>
                  <span className="text-xs text-muted-foreground/70 text-center">{integration.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Messaging Platform Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            {[
              { icon: Workflow, title: t('hero.real_time_sync'), desc: t('hero.real_time_sync_desc'), gradient: 'bg-gradient-primary' },
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

        {/* Enhanced Platform Carousel */}
        <div className="mt-20 animate-fade-in" style={{ animationDelay: '1200ms' }}>
          <PlatformCarousel />
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