import { useEffect, useState } from 'react';
import { MessageSquare, Users, Headphones, Globe } from 'lucide-react';

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
  bgColor: string;
}

const platforms: Platform[] = [
  // Team Collaboration & Internal Messaging
  { name: 'Slack', icon: slackIcon, category: 'team', bgColor: 'bg-purple-50' },
  { name: 'Microsoft Teams', icon: teamsIcon, category: 'team', bgColor: 'bg-blue-50' },
  { name: 'Google Chat', icon: googleChatIcon, category: 'team', bgColor: 'bg-green-50' },
  { name: 'Zoom Team Chat', icon: zoomIcon, category: 'team', bgColor: 'bg-blue-50' },
  { name: 'Webex by Cisco', icon: webexIcon, category: 'team', bgColor: 'bg-green-50' },
  { name: 'Mattermost', icon: MessageSquare, category: 'team', bgColor: 'bg-indigo-50' },
  { name: 'Rocket.Chat', icon: MessageSquare, category: 'team', bgColor: 'bg-red-50' },
  { name: 'Flock', icon: MessageSquare, category: 'team', bgColor: 'bg-yellow-50' },
  { name: 'Twist', icon: MessageSquare, category: 'team', bgColor: 'bg-purple-50' },
  { name: 'Ryver', icon: MessageSquare, category: 'team', bgColor: 'bg-teal-50' },

  // Developer-Focused Messaging
  { name: 'Discord', icon: discordIcon, category: 'developer', bgColor: 'bg-indigo-50' },
  { name: 'Gitter', icon: MessageSquare, category: 'developer', bgColor: 'bg-gray-50' },

  // Customer Communication & Support
  { name: 'Intercom', icon: Headphones, category: 'customer', bgColor: 'bg-blue-50' },
  { name: 'Zendesk Messaging', icon: Headphones, category: 'customer', bgColor: 'bg-green-50' },
  { name: 'Freshchat', icon: Headphones, category: 'customer', bgColor: 'bg-orange-50' },
  { name: 'Tawk.to', icon: Headphones, category: 'customer', bgColor: 'bg-green-50' },
  { name: 'Drift', icon: Headphones, category: 'customer', bgColor: 'bg-purple-50' },
  { name: 'LiveChat', icon: Headphones, category: 'customer', bgColor: 'bg-orange-50' },
  { name: 'Front', icon: Headphones, category: 'customer', bgColor: 'bg-blue-50' },
  { name: 'HubSpot Conversations', icon: Headphones, category: 'customer', bgColor: 'bg-orange-50' },

  // Region-Specific Messaging
  { name: 'WeCom', icon: Globe, category: 'regional', bgColor: 'bg-green-50' },
  { name: 'LINE Works', icon: Globe, category: 'regional', bgColor: 'bg-green-50' },
  { name: 'Kakao Work', icon: Globe, category: 'regional', bgColor: 'bg-yellow-50' },
  { name: 'Telegram Business', icon: Globe, category: 'regional', bgColor: 'bg-blue-50' },
  { name: 'WhatsApp Business', icon: Globe, category: 'regional', bgColor: 'bg-green-50' },
  { name: 'Signal for Work', icon: Globe, category: 'regional', bgColor: 'bg-blue-50' },
];

export function PlatformCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [visiblePlatforms, setVisiblePlatforms] = useState<Platform[]>([]);

  // Create infinite scroll effect by duplicating platforms
  useEffect(() => {
    const duplicatedPlatforms = [...platforms, ...platforms, ...platforms];
    setVisiblePlatforms(duplicatedPlatforms);
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % platforms.length);
    }, 2000); // Scroll every 2 seconds

    return () => clearInterval(interval);
  }, [isHovered]);

  const renderIcon = (platform: Platform, index: number) => {
    if (typeof platform.icon === 'string') {
      return (
        <img 
          src={platform.icon} 
          alt={platform.name}
          className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300"
        />
      );
    } else {
      const IconComponent = platform.icon;
      return (
        <IconComponent 
          className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" 
        />
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-lg text-muted-foreground mb-6">
          Connect 26+ messaging platforms with your business applications
        </p>
      </div>

      {/* Scrolling Platform Carousel */}
      <div 
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ 
            transform: `translateX(-${(currentIndex * 100) / 8}%)`,
            width: `${(visiblePlatforms.length * 100) / 8}%`
          }}
        >
          {visiblePlatforms.map((platform, index) => (
            <div
              key={`${platform.name}-${index}`}
              className={`flex-shrink-0 group cursor-pointer mx-3 p-4 rounded-xl ${platform.bgColor} border border-border/30 hover:border-primary/30 hover:shadow-brand-md transition-all duration-300 min-w-[120px]`}
              style={{ width: `${100 / 8}%` }}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  {renderIcon(platform, index)}
                </div>
                <span className="text-xs font-medium text-center text-foreground group-hover:text-primary transition-colors duration-300">
                  {platform.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>

      {/* Category Indicators */}
      <div className="flex justify-center items-center space-x-6 mt-8 text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-primary rounded-full"></div>
          <span>Team Collaboration</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-success rounded-full"></div>
          <span>Developer Tools</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-warning rounded-full"></div>
          <span>Customer Support</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-accent rounded-full"></div>
          <span>Regional Platforms</span>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-6">
        <button className="text-sm text-primary hover:text-primary-foreground bg-transparent hover:bg-primary/10 px-4 py-2 rounded-lg transition-all duration-300 font-medium">
          View Full Integration List →
        </button>
      </div>
    </div>
  );
}