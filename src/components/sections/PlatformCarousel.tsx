import { useEffect, useState, useRef } from 'react';
import { MessageSquare, Users, Headphones, Globe, ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Import official brand assets
import slackOfficial from '@/assets/brands/slack-official.svg';
import teamsOfficial from '@/assets/brands/teams-official.svg';
import discordOfficial from '@/assets/brands/discord-official.png';
import googleMeet from '@/assets/brands/google-meet.svg';
import zoomIcon from '@/assets/zoom-icon.png';
import googleChatIcon from '@/assets/google-chat-icon.png';
import webexIcon from '@/assets/webex-icon.png';
import mattermostOfficial from '@/assets/brands/mattermost-official.svg';
import rocketchatOfficial from '@/assets/brands/rocketchat-official.svg';
import intercomOfficial from '@/assets/brands/intercom-official.svg';
import zendeskOfficial from '@/assets/brands/zendesk-official.svg';
import freshchatOfficial from '@/assets/brands/freshchat-official.svg';
import livechatOfficial from '@/assets/brands/livechat-official.svg';
import driftOfficial from '@/assets/brands/drift-official.svg';
import hubspotOfficial from '@/assets/brands/hubspot-official.svg';
import whatsappOfficial from '@/assets/brands/whatsapp-official.svg';
import telegramOfficial from '@/assets/brands/telegram-official.svg';
import lineOfficial from '@/assets/brands/line-official.svg';
import wechatOfficial from '@/assets/brands/wechat-official.svg';
import gitterOfficial from '@/assets/brands/gitter-official.svg';
import frontOfficial from '@/assets/brands/front-official.svg';

interface Platform {
  name: string;
  icon: string;
  category: 'team' | 'developer' | 'customer' | 'regional';
  description: string;
  isPopular?: boolean;
  isOfficial?: boolean;
  useCase: string;
  integration: 'Real-time' | 'Bidirectional' | 'API-based' | 'Webhook';
}

const platforms: Platform[] = [
  // Team Collaboration & Internal Messaging
  { 
    name: 'Slack', 
    icon: slackOfficial, 
    category: 'team', 
    description: 'Team collaboration & workflows', 
    useCase: 'Channel sync, file sharing, workflow automation',
    integration: 'Real-time',
    isPopular: true,
    isOfficial: true
  },
  { 
    name: 'Microsoft Teams', 
    icon: teamsOfficial, 
    category: 'team', 
    description: 'Enterprise communication hub', 
    useCase: 'Meeting integration, document collaboration',
    integration: 'Real-time',
    isPopular: true,
    isOfficial: true
  },
  { 
    name: 'Google Chat', 
    icon: googleMeet, 
    category: 'team', 
    description: 'Google Workspace messaging', 
    useCase: 'Gmail integration, Drive file sharing',
    integration: 'API-based',
    isPopular: true,
    isOfficial: true
  },
  { 
    name: 'Zoom Team Chat', 
    icon: zoomIcon, 
    category: 'team', 
    description: 'Video meetings & chat', 
    useCase: 'Meeting recordings, participant management',
    integration: 'Webhook',
    isPopular: true
  },
  { 
    name: 'Webex by Cisco', 
    icon: webexIcon, 
    category: 'team', 
    description: 'Enterprise video collaboration', 
    useCase: 'Secure meetings, compliance reporting',
    integration: 'API-based',
    isPopular: true
  },
  { 
    name: 'Discord', 
    icon: discordOfficial, 
    category: 'developer', 
    description: 'Gaming & developer communities', 
    useCase: 'Community management, bot integration',
    integration: 'Real-time',
    isPopular: true,
    isOfficial: true
  },

  // Additional platforms
  { name: 'Mattermost', icon: mattermostOfficial, category: 'team', description: 'Open-source team messaging', useCase: 'Self-hosted, custom integrations', integration: 'API-based' },
  { name: 'Rocket.Chat', icon: rocketchatOfficial, category: 'team', description: 'Customizable team chat', useCase: 'White-label solutions', integration: 'API-based' },
  { name: 'Intercom', icon: intercomOfficial, category: 'customer', description: 'Customer messaging platform', useCase: 'Support ticket routing', integration: 'Bidirectional', isPopular: true },
  { name: 'Zendesk Messaging', icon: zendeskOfficial, category: 'customer', description: 'Customer support chat', useCase: 'Ticket creation, agent routing', integration: 'API-based' },
  { name: 'Freshchat', icon: freshchatOfficial, category: 'customer', description: 'Modern messaging software', useCase: 'Lead qualification, support', integration: 'Webhook' },
  { name: 'LiveChat', icon: livechatOfficial, category: 'customer', description: 'Customer service platform', useCase: 'Website chat, visitor tracking', integration: 'Real-time' },
  { name: 'Drift', icon: driftOfficial, category: 'customer', description: 'Conversational marketing', useCase: 'Sales automation, lead capture', integration: 'Bidirectional' },
  { name: 'HubSpot Conversations', icon: hubspotOfficial, category: 'customer', description: 'CRM-integrated messaging', useCase: 'Contact management, sales pipeline', integration: 'API-based' },
  { name: 'WhatsApp Business', icon: whatsappOfficial, category: 'regional', description: 'Customer communication', useCase: 'Order updates, customer service', integration: 'API-based', isPopular: true },
  { name: 'WeCom', icon: wechatOfficial, category: 'regional', description: 'Chinese enterprise messaging', useCase: 'Enterprise communication in China', integration: 'API-based' },
  { name: 'LINE Works', icon: lineOfficial, category: 'regional', description: 'Japanese business messaging', useCase: 'Business communication in Japan', integration: 'Webhook' },
  { name: 'Telegram Business', icon: telegramOfficial, category: 'regional', description: 'Secure business messaging', useCase: 'Encrypted business communication', integration: 'API-based' },
  { name: 'Gitter', icon: gitterOfficial, category: 'developer', description: 'Developer chat rooms', useCase: 'Code repository integration', integration: 'API-based' },
  { name: 'Front', icon: frontOfficial, category: 'customer', description: 'Shared inbox for teams', useCase: 'Email management, team collaboration', integration: 'Bidirectional' },
];

const categoryConfig = {
  team: { 
    label: 'Team Collaboration', 
    color: 'bg-blue-500', 
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    textColor: 'text-blue-600 dark:text-blue-400',
    borderColor: 'border-blue-200 dark:border-blue-800'
  },
  developer: { 
    label: 'Developer Tools', 
    color: 'bg-purple-500', 
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    textColor: 'text-purple-600 dark:text-purple-400',
    borderColor: 'border-purple-200 dark:border-purple-800'
  },
  customer: { 
    label: 'Customer Support', 
    color: 'bg-green-500', 
    bgColor: 'bg-green-50 dark:bg-green-950/20',
    textColor: 'text-green-600 dark:text-green-400',
    borderColor: 'border-green-200 dark:border-green-800'
  },
  regional: { 
    label: 'Regional Platforms', 
    color: 'bg-orange-500', 
    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    textColor: 'text-orange-600 dark:text-orange-400',
    borderColor: 'border-orange-200 dark:border-orange-800'
  },
};

const integrationConfig = {
  'Real-time': { color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300', label: 'Real-time Sync' },
  'Bidirectional': { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300', label: 'Bidirectional' },
  'API-based': { color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300', label: 'API Integration' },
  'Webhook': { color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300', label: 'Webhook Events' },
};

export function PlatformCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredPlatforms = selectedCategory 
    ? platforms.filter(p => p.category === selectedCategory)
    : platforms;

  const displayedPlatforms = showAll ? filteredPlatforms : filteredPlatforms.slice(0, 12);

  // Auto-scroll functionality
  useEffect(() => {
    if (isHovered || showAll || selectedCategory) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % Math.max(1, platforms.length - 7));
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, showAll, selectedCategory]);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, Math.max(0, displayedPlatforms.length - 8)));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <section className="py-24 bg-muted/20 relative overflow-hidden">
      {/* Background enhancement */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-10" />
      
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 px-4 py-2 bg-gradient-primary text-white border-0 shadow-brand-md">
            <Globe className="w-4 h-4 mr-2" />
            Enterprise Integration Platform
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Connect 26+ Messaging Platforms
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Seamlessly integrate with all major communication platforms. Real-time sync, unified workflows, enterprise-grade security with official brand partnerships.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="transition-all duration-300 hover:scale-105"
          >
            All Platforms ({platforms.length})
          </Button>
          {Object.entries(categoryConfig).map(([key, config]) => {
            const count = platforms.filter(p => p.category === key).length;
            return (
              <Button
                key={key}
                variant={selectedCategory === key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(key)}
                className="transition-all duration-300 hover:scale-105"
              >
                <div className={`w-2 h-2 ${config.color} rounded-full mr-2`} />
                {config.label} ({count})
              </Button>
            );
          })}
        </div>

        {/* Main Platform Display */}
        <div className="relative">
          {/* Navigation Arrows */}
          {!showAll && displayedPlatforms.length > 8 && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-card/90 backdrop-blur-md shadow-brand-lg hover:shadow-brand-xl transition-all duration-300 disabled:opacity-50 border-border/50"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextSlide}
                disabled={currentIndex >= Math.max(0, displayedPlatforms.length - 8)}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-card/90 backdrop-blur-md shadow-brand-lg hover:shadow-brand-xl transition-all duration-300 disabled:opacity-50 border-border/50"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}

          {/* Platform Grid/Carousel */}
          <div 
            className="overflow-hidden mx-14"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={carouselRef}
          >
            <div 
              className={`grid transition-all duration-700 ease-in-out gap-6 ${
                showAll 
                  ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6' 
                  : 'grid-cols-6 md:grid-cols-6'
              }`}
              style={!showAll ? { 
                transform: `translateX(-${currentIndex * (100 / 6)}%)`,
                width: `${Math.max(100, (displayedPlatforms.length * 100) / 6)}%`
              } : {}}
            >
              {displayedPlatforms.map((platform, index) => (
                <div
                  key={`${platform.name}-${index}`}
                  className={`group relative cursor-pointer p-6 rounded-3xl border-2 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-brand-xl ${
                    categoryConfig[platform.category].bgColor
                  } ${categoryConfig[platform.category].borderColor} hover:border-primary/50 bg-card/70 backdrop-blur-sm hover:bg-card/90 ${
                    platform.isPopular ? 'ring-2 ring-primary/30 shadow-brand-md' : ''
                  }`}
                  onMouseEnter={() => setHoveredPlatform(platform.name)}
                  onMouseLeave={() => setHoveredPlatform(null)}
                >
                  {/* Popular Badge */}
                  {platform.isPopular && (
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center shadow-brand-lg animate-pulse">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  )}

                  {/* Official Badge */}
                  {platform.isOfficial && (
                    <div className="absolute -top-2 -left-2">
                      <Badge variant="secondary" className="text-xs px-2 py-1 bg-green-100 text-green-800 border-green-200">
                        Official
                      </Badge>
                    </div>
                  )}

                  <div className="flex flex-col items-center space-y-4">
                    {/* Platform Icon */}
                    <div className="relative w-20 h-20 rounded-2xl bg-white shadow-sm group-hover:shadow-md transition-all duration-300 flex items-center justify-center overflow-hidden">
                      <img 
                        src={platform.icon} 
                        alt={`${platform.name} official logo`}
                        className="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = '/api/placeholder/56/56';
                        }}
                      />
                    </div>

                    {/* Platform Info */}
                    <div className="text-center space-y-2">
                      <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {platform.name}
                      </h4>
                      <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300 line-clamp-2">
                        {platform.description}
                      </p>
                      
                      {/* Integration Type Badge */}
                      <Badge 
                        variant="secondary" 
                        className={`text-xs px-2 py-1 ${integrationConfig[platform.integration].color} border-0`}
                      >
                        {integrationConfig[platform.integration].label}
                      </Badge>
                    </div>
                  </div>

                  {/* Enhanced Hover Card */}
                  {hoveredPlatform === platform.name && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-80 p-4 bg-card border border-border rounded-xl shadow-brand-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30 backdrop-blur-md">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <img src={platform.icon} alt="" className="w-8 h-8 object-contain" />
                          <h5 className="font-semibold text-foreground">{platform.name}</h5>
                        </div>
                        <p className="text-sm text-muted-foreground">{platform.useCase}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {integrationConfig[platform.integration].label}
                          </Badge>
                          <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-card"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Show More/Less Toggle */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="group text-primary hover:text-primary-foreground hover:bg-primary/10 border-primary/30 hover:border-primary transition-all duration-300 px-8 py-3 rounded-full hover:scale-105"
          >
            {showAll ? 'Show Less' : `View All ${platforms.length} Integrations`}
            <ArrowRight className={`ml-2 w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
          </Button>
        </div>

        {/* Enterprise Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 p-8 bg-card/60 backdrop-blur-sm rounded-3xl border border-border/50 shadow-brand-lg">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">26+</div>
            <div className="text-sm text-muted-foreground font-medium">Official Integrations</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold bg-gradient-success bg-clip-text text-transparent">99.9%</div>
            <div className="text-sm text-muted-foreground font-medium">Enterprise Uptime</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">&lt;100ms</div>
            <div className="text-sm text-muted-foreground font-medium">Real-time Latency</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold bg-gradient-accent bg-clip-text text-transparent">SOC 2</div>
            <div className="text-sm text-muted-foreground font-medium">Compliance Ready</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Ready to connect your messaging platforms? Start your enterprise integration today.
          </p>
          <Button className="bg-gradient-primary hover:bg-gradient-primary-hover text-white px-8 py-3 rounded-full shadow-brand-lg hover:shadow-brand-xl transition-all duration-300 hover:scale-105">
            Explore All Integrations
            <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}