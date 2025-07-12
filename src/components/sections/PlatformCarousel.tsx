import { useEffect, useState, useRef } from 'react';
import { MessageSquare, Users, Headphones, Globe, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import existing platform icons
import teamsIcon from '@/assets/teams-icon.svg';
import slackIcon from '@/assets/slack-icon.svg'; 
import zoomIcon from '@/assets/zoom-icon.png';
import googleChatIcon from '@/assets/google-chat-icon.png';
import webexIcon from '@/assets/webex-icon.png';
import discordIcon from '@/assets/discord-icon.png';

interface Platform {
  name: string;
  icon: string | React.ComponentType<any>;
  category: 'team' | 'developer' | 'customer' | 'regional';
  description: string;
  isPopular?: boolean;
}

const platforms: Platform[] = [
  // Team Collaboration & Internal Messaging
  { name: 'Slack', icon: slackIcon, category: 'team', description: 'Team collaboration & workflows', isPopular: true },
  { name: 'Microsoft Teams', icon: teamsIcon, category: 'team', description: 'Enterprise communication hub', isPopular: true },
  { name: 'Google Chat', icon: googleChatIcon, category: 'team', description: 'Google Workspace messaging', isPopular: true },
  { name: 'Zoom Team Chat', icon: zoomIcon, category: 'team', description: 'Video meetings & chat', isPopular: true },
  { name: 'Webex by Cisco', icon: webexIcon, category: 'team', description: 'Enterprise video collaboration', isPopular: true },
  { name: 'Mattermost', icon: MessageSquare, category: 'team', description: 'Open-source team messaging' },
  { name: 'Rocket.Chat', icon: MessageSquare, category: 'team', description: 'Customizable team chat' },
  { name: 'Flock', icon: MessageSquare, category: 'team', description: 'Team communication platform' },
  { name: 'Twist', icon: MessageSquare, category: 'team', description: 'Organized team messaging' },
  { name: 'Ryver', icon: MessageSquare, category: 'team', description: 'Team collaboration suite' },

  // Developer-Focused Messaging
  { name: 'Discord', icon: discordIcon, category: 'developer', description: 'Gaming & developer communities', isPopular: true },
  { name: 'Gitter', icon: MessageSquare, category: 'developer', description: 'Developer chat rooms' },

  // Customer Communication & Support
  { name: 'Intercom', icon: Headphones, category: 'customer', description: 'Customer messaging platform', isPopular: true },
  { name: 'Zendesk Messaging', icon: Headphones, category: 'customer', description: 'Customer support chat' },
  { name: 'Freshchat', icon: Headphones, category: 'customer', description: 'Modern messaging software' },
  { name: 'Tawk.to', icon: Headphones, category: 'customer', description: 'Free live chat software' },
  { name: 'Drift', icon: Headphones, category: 'customer', description: 'Conversational marketing' },
  { name: 'LiveChat', icon: Headphones, category: 'customer', description: 'Customer service platform' },
  { name: 'Front', icon: Headphones, category: 'customer', description: 'Shared inbox for teams' },
  { name: 'HubSpot Conversations', icon: Headphones, category: 'customer', description: 'CRM-integrated messaging' },

  // Region-Specific Messaging
  { name: 'WeCom', icon: Globe, category: 'regional', description: 'Chinese enterprise messaging' },
  { name: 'LINE Works', icon: Globe, category: 'regional', description: 'Japanese business messaging' },
  { name: 'Kakao Work', icon: Globe, category: 'regional', description: 'Korean workplace chat' },
  { name: 'Telegram Business', icon: Globe, category: 'regional', description: 'Secure business messaging' },
  { name: 'WhatsApp Business', icon: Globe, category: 'regional', description: 'Customer communication', isPopular: true },
  { name: 'Signal for Work', icon: Globe, category: 'regional', description: 'Privacy-focused messaging' },
];

const categoryConfig = {
  team: { label: 'Team Collaboration', color: 'bg-blue-500', bgColor: 'bg-blue-50' },
  developer: { label: 'Developer Tools', color: 'bg-purple-500', bgColor: 'bg-purple-50' },
  customer: { label: 'Customer Support', color: 'bg-green-500', bgColor: 'bg-green-50' },
  regional: { label: 'Regional Platforms', color: 'bg-orange-500', bgColor: 'bg-orange-50' },
};

export function PlatformCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredPlatforms = selectedCategory 
    ? platforms.filter(p => p.category === selectedCategory)
    : platforms;

  const displayedPlatforms = showAll ? filteredPlatforms : filteredPlatforms.slice(0, 12);

  // Auto-scroll functionality (only when not showing all)
  useEffect(() => {
    if (isHovered || showAll || selectedCategory) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % Math.max(1, platforms.length - 7));
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, showAll, selectedCategory]);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, Math.max(0, displayedPlatforms.length - 8)));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const renderIcon = (platform: Platform) => {
    if (typeof platform.icon === 'string') {
      return (
        <img 
          src={platform.icon} 
          alt={`${platform.name} integration`}
          className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
        />
      );
    } else {
      const IconComponent = platform.icon;
      return (
        <IconComponent 
          className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-300" 
        />
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          Connect 26+ Messaging Platforms
        </h3>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Seamlessly integrate with all major communication platforms. Real-time sync, unified workflows, enterprise-grade security.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
          className="transition-all duration-300"
        >
          All Platforms
        </Button>
        {Object.entries(categoryConfig).map(([key, config]) => (
          <Button
            key={key}
            variant={selectedCategory === key ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(key)}
            className="transition-all duration-300"
          >
            <div className={`w-2 h-2 ${config.color} rounded-full mr-2`} />
            {config.label}
          </Button>
        ))}
      </div>

      {/* Main Platform Display */}
      <div className="relative">
        {/* Navigation Arrows - Desktop */}
        {!showAll && displayedPlatforms.length > 8 && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              disabled={currentIndex >= Math.max(0, displayedPlatforms.length - 8)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}

        {/* Platform Grid/Carousel */}
        <div 
          className="overflow-hidden mx-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          ref={carouselRef}
        >
          <div 
            className={`grid transition-all duration-500 ease-in-out gap-4 ${
              showAll 
                ? 'grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8' 
                : 'grid-cols-8 md:grid-cols-8'
            }`}
            style={!showAll ? { 
              transform: `translateX(-${currentIndex * (100 / 8)}%)`,
              width: `${Math.max(100, (displayedPlatforms.length * 100) / 8)}%`
            } : {}}
          >
            {displayedPlatforms.map((platform, index) => (
              <div
                key={`${platform.name}-${index}`}
                className={`group relative cursor-pointer p-4 rounded-2xl border-2 border-border/20 hover:border-primary/40 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:shadow-brand-lg transition-all duration-300 transform hover:-translate-y-1 ${
                  platform.isPopular ? 'ring-2 ring-primary/20' : ''
                }`}
              >
                {/* Popular Badge */}
                {platform.isPopular && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}

                <div className="flex flex-col items-center space-y-3">
                  <div className={`flex items-center justify-center w-16 h-16 rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-300 ${categoryConfig[platform.category].bgColor}`}>
                    {renderIcon(platform)}
                  </div>
                  <div className="text-center">
                    <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1">
                      {platform.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 group-hover:text-foreground transition-colors duration-300">
                      {platform.description}
                    </p>
                  </div>
                </div>

                {/* Hover Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-foreground text-background text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-20">
                  {platform.description}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent border-t-foreground"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Show More/Less Toggle */}
      <div className="text-center mt-8">
        <Button
          variant="outline"
          onClick={() => setShowAll(!showAll)}
          className="group text-primary hover:text-primary-foreground hover:bg-primary/10 border-primary/30 hover:border-primary transition-all duration-300"
        >
          {showAll ? 'Show Less' : `View All ${platforms.length} Integrations`}
          <ArrowRight className={`ml-2 w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
        </Button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 p-6 bg-muted/30 rounded-2xl">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">26+</div>
          <div className="text-sm text-muted-foreground">Platforms</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">99.9%</div>
          <div className="text-sm text-muted-foreground">Uptime</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">Real-time</div>
          <div className="text-sm text-muted-foreground">Sync</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">Enterprise</div>
          <div className="text-sm text-muted-foreground">Security</div>
        </div>
      </div>
    </div>
  );
}