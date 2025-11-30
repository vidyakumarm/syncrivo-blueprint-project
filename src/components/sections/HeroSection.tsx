import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Workflow,
  MessageSquare,
  Play
} from 'lucide-react';

import teamsIcon from '@/assets/teams-icon.svg';
import slackIcon from '@/assets/slack-icon.svg'; 
import zoomIcon from '@/assets/zoom-icon.png';
import googleChatIcon from '@/assets/google-chat-icon.png';
import webexIcon from '@/assets/webex-icon.png';
import discordIcon from '@/assets/discord-icon.png';
import { useTranslationWithFallback } from '@/hooks/useTranslationWithFallback';
import i18next from 'i18next';

export function HeroSection() {
  const { t } = useTranslationWithFallback();

  console.log('🎭 [HeroSection] Component rendered', {
    timestamp: new Date().toISOString(),
    currentLanguage: i18next.language,
    path: window.location.pathname
  });

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Minimal Background */}
      <div className="absolute inset-0 bg-gradient-minimal">
        <div className="absolute inset-0 bg-gradient-mesh" />
      </div>

      {/* Split Screen Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Minimal Badge */}
            <Badge 
              variant="outline" 
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors duration-500"
            >
              <MessageSquare className="w-4 h-4" />
              {t('hero.badge')}
            </Badge>

            {/* Clean Typography */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                <span className="block text-foreground mb-2">
                  {t('hero.title')}
                </span>
                <span className="block text-primary">
                  {t('hero.title_highlight')}
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                {t('hero.subtitle')}
              </p>
            </div>

            {/* Minimal CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                asChild 
                size="lg" 
                className="group bg-primary hover:bg-primary-hover text-primary-foreground font-medium px-8 py-6 text-lg transition-all duration-500 hover:shadow-lg"
              >
                <Link to="/signup">
                  {t('hero.cta_primary')}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button 
                variant="ghost" 
                size="lg" 
                className="group font-medium px-8 py-6 text-lg hover:bg-muted/50 transition-all duration-500"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Minimal Stats */}
            <div className="flex gap-8 pt-8 border-t border-border/30">
              <div>
                <div className="text-3xl font-bold text-foreground">26+</div>
                <div className="text-sm text-muted-foreground">Platforms</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">10K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right Side - Visual Demo (Asymmetric) */}
          <div className="relative animate-fade-in" style={{ animationDelay: '300ms' }}>
            {/* Main Demo Card - Asymmetric positioning */}
            <div className="relative">
              {/* Floating Platform Icons */}
              <div className="absolute -top-8 -left-8 z-20 animate-float">
                <div className="bg-card rounded-2xl p-4 shadow-brand-lg border border-border/30">
                  <img src={slackIcon} alt="Slack" className="h-12 w-12" />
                </div>
              </div>
              
              <div className="absolute -top-4 right-16 z-20 animate-float" style={{ animationDelay: '1s' }}>
                <div className="bg-card rounded-2xl p-4 shadow-brand-lg border border-border/30">
                  <img src={teamsIcon} alt="Teams" className="h-12 w-12" />
                </div>
              </div>

              {/* Main Dashboard Preview - Asymmetric */}
              <div className="relative transform rotate-2 hover:rotate-0 transition-transform duration-700">
                <div className="bg-card rounded-3xl p-8 shadow-brand-2xl border border-border/30">
                  {/* Mock Dashboard */}
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-border/30">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-primary" />
                        <div>
                          <div className="font-semibold text-foreground">Active Connections</div>
                          <div className="text-sm text-muted-foreground">Real-time sync</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-success/10 border-success/20 text-success">
                        <div className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse" />
                        Live
                      </Badge>
                    </div>

                    {/* Connection Cards */}
                    <div className="space-y-3">
                      {[
                        { icon: teamsIcon, name: 'Microsoft Teams', messages: '1,234', status: 'active' },
                        { icon: slackIcon, name: 'Slack Workspace', messages: '856', status: 'active' },
                        { icon: discordIcon, name: 'Discord Server', messages: '432', status: 'syncing' },
                      ].map((conn, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/20 hover:bg-muted/50 transition-colors duration-300"
                          style={{ animationDelay: `${(idx + 1) * 200}ms` }}
                        >
                          <div className="flex items-center gap-3">
                            <img src={conn.icon} alt={conn.name} className="h-8 w-8" />
                            <div>
                              <div className="font-medium text-sm text-foreground">{conn.name}</div>
                              <div className="text-xs text-muted-foreground">{conn.messages} messages synced</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${conn.status === 'active' ? 'bg-success' : 'bg-primary'} animate-pulse`} />
                            <span className="text-xs text-muted-foreground capitalize">{conn.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Activity Graph */}
                    <div className="pt-4">
                      <div className="flex items-end gap-2 h-24">
                        {[40, 65, 45, 80, 55, 90, 70].map((height, idx) => (
                          <div 
                            key={idx}
                            className="flex-1 bg-gradient-primary rounded-t-lg transition-all duration-500 hover:opacity-80"
                            style={{ 
                              height: `${height}%`,
                              animationDelay: `${idx * 100}ms`
                            }}
                          />
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground text-center mt-2">Messages synced this week</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Feature Cards - Asymmetric */}
              <div className="absolute -bottom-8 -right-8 z-20 animate-float" style={{ animationDelay: '2s' }}>
                <div className="bg-card rounded-2xl p-4 shadow-brand-lg border border-border/30 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-success flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Real-time</div>
                    <div className="text-xs text-muted-foreground">Instant sync</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-16 -left-12 z-20 animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="bg-card rounded-2xl p-4 shadow-brand-lg border border-border/30 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Secure</div>
                    <div className="text-xs text-muted-foreground">Enterprise-grade</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Logos - Minimal */}
        <div className="mt-24 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <p className="text-center text-sm text-muted-foreground mb-8 font-medium">
            Trusted by teams using
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 hover:opacity-100 transition-opacity duration-500">
            {[slackIcon, teamsIcon, discordIcon, zoomIcon, googleChatIcon, webexIcon].map((icon, idx) => (
              <img 
                key={idx}
                src={icon} 
                alt="Platform" 
                className="h-8 w-8 object-contain grayscale hover:grayscale-0 transition-all duration-500" 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
