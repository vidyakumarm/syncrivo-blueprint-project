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
import { useTranslation } from 'react-i18next';
import heroBg from '@/assets/hero-bg.jpg';

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium bg-primary-light text-primary border-primary/20">
            <MessageSquare className="w-4 h-4 mr-2" />
            {t('hero.badge')}
          </Badge>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            {t('hero.title')}
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              {t('hero.title_highlight')}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-primary hover:bg-primary-hover text-white font-semibold px-8 py-3 text-lg shadow-glow animate-glow"
            >
              <Link to="/signup">
                {t('hero.cta_primary')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-primary/30 hover:bg-primary-light font-semibold px-8 py-3 text-lg"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              {t('hero.cta_secondary')}
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col items-center space-y-4 animate-slide-up">
            <p className="text-sm text-muted-foreground">
              {t('hero.trusted_by')}
            </p>
            <div className="flex items-center space-x-8 opacity-60">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span className="text-xs text-muted-foreground">MICROSOFT TEAMS</span>
              </div>
              <div className="flex items-center space-x-2">
                <Video className="h-4 w-4" />
                <span className="text-xs text-muted-foreground">WEBEX</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span className="text-xs text-muted-foreground">GOOGLE CHAT</span>
              </div>
              <div className="flex items-center space-x-2">
                <Video className="h-4 w-4" />
                <span className="text-xs text-muted-foreground">ZOOM</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs text-muted-foreground">SLACK</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messaging Platform Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-brand-md transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Real-Time Sync</h3>
            <p className="text-sm text-muted-foreground">
              Messages sync instantly across all connected platforms
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-brand-md transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-success rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Enterprise Security</h3>
            <p className="text-sm text-muted-foreground">
              SOC 2 compliant with enterprise-grade encryption
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-brand-md transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Cross-Platform</h3>
            <p className="text-sm text-muted-foreground">
              Connect any messaging platform with unified APIs
            </p>
          </div>
        </div>

        {/* Supported Platforms Grid */}
        <div className="mt-20 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">
            {t('hero.supported_platforms')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { name: 'Microsoft Teams', icon: Users, color: 'bg-blue-50 text-blue-600 border-blue-200' },
              { name: 'Webex Teams', icon: Video, color: 'bg-green-50 text-green-600 border-green-200' },
              { name: 'Google Chat', icon: MessageSquare, color: 'bg-red-50 text-red-600 border-red-200' },
              { name: 'Zoom Chat', icon: Video, color: 'bg-blue-50 text-blue-600 border-blue-200' },
              { name: 'Slack', icon: MessageCircle, color: 'bg-purple-50 text-purple-600 border-purple-200' },
              { name: 'Discord', icon: MessageSquare, color: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
              { name: 'Mattermost', icon: MessageCircle, color: 'bg-gray-50 text-gray-600 border-gray-200' },
              { name: 'Telegram', icon: Phone, color: 'bg-cyan-50 text-cyan-600 border-cyan-200' },
            ].map((platform, index) => (
              <Card key={index} className={`p-4 text-center border-2 ${platform.color} hover:shadow-brand-md transition-all duration-300`}>
                <platform.icon className="h-8 w-8 mx-auto mb-2" />
                <p className="text-xs font-medium">{platform.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-8 w-2 h-2 bg-primary rounded-full animate-pulse opacity-50" />
      <div className="absolute top-1/3 right-12 w-3 h-3 bg-accent rounded-full animate-pulse opacity-40 animation-delay-1000" />
      <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-primary rounded-full animate-pulse opacity-30 animation-delay-2000" />
    </section>
  );
}