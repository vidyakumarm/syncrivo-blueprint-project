import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  MessageSquare, 
  Video, 
  Phone, 
  Globe,
  Building,
  Code,
  Headphones,
  Earth,
  Workflow,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useTranslationWithFallback } from '@/hooks/useTranslationWithFallback';

interface Platform {
  name: string;
  logoUrl: string;
  color: string;
  borderColor: string;
  integration: string;
  capabilities: string[];
  category: string;
  popular?: boolean;
}

interface PlatformCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  platforms: Platform[];
}

export function SupportedPlatformsSection() {
  const { t } = useTranslationWithFallback();
  const [selectedCategory, setSelectedCategory] = useState('collaboration');

  const platformCategories: PlatformCategory[] = [
    {
      id: 'collaboration',
      title: 'Team Collaboration & Internal Messaging',
      description: 'Enterprise communication platforms for internal team coordination and collaboration workflows',
      icon: Building,
      color: 'blue',
      platforms: [
        { name: 'Slack', logoUrl: '/src/assets/brands/slack-official.svg', color: 'bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/50 dark:hover:bg-purple-900/50', borderColor: 'border-purple-200 hover:border-purple-300 dark:border-purple-800 dark:hover:border-purple-700', integration: 'Real-time sync', capabilities: ['Channel mapping', 'File transfer', 'Thread sync'], category: 'collaboration', popular: true },
        { name: 'Microsoft Teams', logoUrl: '/src/assets/brands/teams-official.svg', color: 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50', borderColor: 'border-blue-200 hover:border-blue-300 dark:border-blue-800 dark:hover:border-blue-700', integration: 'Deep integration', capabilities: ['Meeting sync', 'File sharing', 'Presence status'], category: 'collaboration', popular: true },
        { name: 'Google Chat', logoUrl: '/src/assets/brands/google-meet.svg', color: 'bg-green-50 hover:bg-green-100 dark:bg-green-950/50 dark:hover:bg-green-900/50', borderColor: 'border-green-200 hover:border-green-300 dark:border-green-800 dark:hover:border-green-700', integration: 'Workspace sync', capabilities: ['Space mapping', 'Bot integration', 'Calendar sync'], category: 'collaboration', popular: true },
        { name: 'Zoom Team Chat', logoUrl: '/src/assets/zoom-icon.png', color: 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50', borderColor: 'border-blue-200 hover:border-blue-300 dark:border-blue-800 dark:hover:border-blue-700', integration: 'Meeting bridge', capabilities: ['Video integration', 'Recording sync', 'Transcript sharing'], category: 'collaboration', popular: true },
        { name: 'Webex by Cisco', logoUrl: '/src/assets/webex-icon.png', color: 'bg-green-50 hover:bg-green-100 dark:bg-green-950/50 dark:hover:bg-green-900/50', borderColor: 'border-green-200 hover:border-green-300 dark:border-green-800 dark:hover:border-green-700', integration: 'Enterprise ready', capabilities: ['Security compliant', 'Admin controls', 'Analytics'], category: 'collaboration' },
        { name: 'Mattermost', logoUrl: '/src/assets/discord-icon.png', color: 'bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:hover:bg-indigo-900/50', borderColor: 'border-indigo-200 hover:border-indigo-300 dark:border-indigo-800 dark:hover:border-indigo-700', integration: 'Self-hosted sync', capabilities: ['Open source', 'Custom plugins', 'On-premise'], category: 'collaboration' },
        { name: 'Rocket.Chat', logoUrl: '/src/assets/discord-icon.png', color: 'bg-red-50 hover:bg-red-100 dark:bg-red-950/50 dark:hover:bg-red-900/50', borderColor: 'border-red-200 hover:border-red-300 dark:border-red-800 dark:hover:border-red-700', integration: 'API integration', capabilities: ['Omnichannel', 'Live chat', 'Video calls'], category: 'collaboration' },
        { name: 'Flock', logoUrl: '/src/assets/discord-icon.png', color: 'bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-950/50 dark:hover:bg-yellow-900/50', borderColor: 'border-yellow-200 hover:border-yellow-300 dark:border-yellow-800 dark:hover:border-yellow-700', integration: 'Team sync', capabilities: ['Project management', 'To-do integration', 'Polls & notes'], category: 'collaboration' }
      ]
    },
    {
      id: 'developer',
      title: 'Developer-Focused Messaging',
      description: 'Communication platforms designed for development teams and tech communities',
      icon: Code,
      color: 'purple',
      platforms: [
        { name: 'Discord', logoUrl: '/src/assets/brands/discord-official.png', color: 'bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:hover:bg-indigo-900/50', borderColor: 'border-indigo-200 hover:border-indigo-300 dark:border-indigo-800 dark:hover:border-indigo-700', integration: 'Community sync', capabilities: ['Voice channels', 'Bot integration', 'Server management'], category: 'developer', popular: true },
        { name: 'Gitter', logoUrl: '/src/assets/discord-icon.png', color: 'bg-green-50 hover:bg-green-100 dark:bg-green-950/50 dark:hover:bg-green-900/50', borderColor: 'border-green-200 hover:border-green-300 dark:border-green-800 dark:hover:border-green-700', integration: 'GitHub integration', capabilities: ['Repository chat', 'Code snippets', 'Markdown support'], category: 'developer' }
      ]
    },
    {
      id: 'customer',
      title: 'Customer Communication & Support',
      description: 'Customer-facing messaging platforms for support, sales, and client engagement',
      icon: Headphones,
      color: 'green',
      platforms: [
        { name: 'Intercom', logoUrl: '/src/assets/discord-icon.png', color: 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50', borderColor: 'border-blue-200 hover:border-blue-300 dark:border-blue-800 dark:hover:border-blue-700', integration: 'Customer sync', capabilities: ['Live chat', 'Help desk', 'Customer data'], category: 'customer', popular: true },
        { name: 'Zendesk Messaging', logoUrl: '/src/assets/discord-icon.png', color: 'bg-green-50 hover:bg-green-100 dark:bg-green-950/50 dark:hover:bg-green-900/50', borderColor: 'border-green-200 hover:border-green-300 dark:border-green-800 dark:hover:border-green-700', integration: 'Ticket sync', capabilities: ['Support tickets', 'Knowledge base', 'Agent tools'], category: 'customer', popular: true },
        { name: 'Freshchat', logoUrl: '/src/assets/discord-icon.png', color: 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50', borderColor: 'border-blue-200 hover:border-blue-300 dark:border-blue-800 dark:hover:border-blue-700', integration: 'CRM integration', capabilities: ['Lead scoring', 'Campaign tracking', 'Multi-channel'], category: 'customer' },
        { name: 'Tawk.to', logoUrl: '/src/assets/discord-icon.png', color: 'bg-green-50 hover:bg-green-100 dark:bg-green-950/50 dark:hover:bg-green-900/50', borderColor: 'border-green-200 hover:border-green-300 dark:border-green-800 dark:hover:border-green-700', integration: 'Website chat', capabilities: ['Free live chat', 'Visitor monitoring', 'File sharing'], category: 'customer' },
        { name: 'Drift', logoUrl: '/src/assets/discord-icon.png', color: 'bg-orange-50 hover:bg-orange-100 dark:bg-orange-950/50 dark:hover:bg-orange-900/50', borderColor: 'border-orange-200 hover:border-orange-300 dark:border-orange-800 dark:hover:border-orange-700', integration: 'Sales sync', capabilities: ['Conversational marketing', 'Lead qualification', 'Meeting booking'], category: 'customer' },
        { name: 'LiveChat', logoUrl: '/src/assets/discord-icon.png', color: 'bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-950/50 dark:hover:bg-yellow-900/50', borderColor: 'border-yellow-200 hover:border-yellow-300 dark:border-yellow-800 dark:hover:border-yellow-700', integration: 'Support integration', capabilities: ['Chat widget', 'Ticketing', 'Analytics'], category: 'customer' }
      ]
    },
    {
      id: 'regional',
      title: 'Region-Specific Business Messaging',
      description: 'Regional messaging platforms popular in specific markets and business environments',
      icon: Earth,
      color: 'orange',
      platforms: [
        { name: 'WeCom (WeChat Work)', logoUrl: '/src/assets/discord-icon.png', color: 'bg-green-50 hover:bg-green-100 dark:bg-green-950/50 dark:hover:bg-green-900/50', borderColor: 'border-green-200 hover:border-green-300 dark:border-green-800 dark:hover:border-green-700', integration: 'China business', capabilities: ['Enterprise features', 'Mini programs', 'API integration'], category: 'regional', popular: true },
        { name: 'LINE Works', logoUrl: '/src/assets/discord-icon.png', color: 'bg-green-50 hover:bg-green-100 dark:bg-green-950/50 dark:hover:bg-green-900/50', borderColor: 'border-green-200 hover:border-green-300 dark:border-green-800 dark:hover:border-green-700', integration: 'Japan business', capabilities: ['Stickers', 'Video calls', 'File sharing'], category: 'regional' },
        { name: 'Kakao Work', logoUrl: '/src/assets/discord-icon.png', color: 'bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-950/50 dark:hover:bg-yellow-900/50', borderColor: 'border-yellow-200 hover:border-yellow-300 dark:border-yellow-800 dark:hover:border-yellow-700', integration: 'Korea business', capabilities: ['Enterprise chat', 'Calendar sync', 'Drive integration'], category: 'regional' },
        { name: 'Telegram for Business', logoUrl: '/src/assets/discord-icon.png', color: 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50', borderColor: 'border-blue-200 hover:border-blue-300 dark:border-blue-800 dark:hover:border-blue-700', integration: 'Secure messaging', capabilities: ['Bot API', 'Channels', 'File sharing'], category: 'regional', popular: true },
        { name: 'WhatsApp Business', logoUrl: '/src/assets/google-chat-icon.png', color: 'bg-green-50 hover:bg-green-100 dark:bg-green-950/50 dark:hover:bg-green-900/50', borderColor: 'border-green-200 hover:border-green-300 dark:border-green-800 dark:hover:border-green-700', integration: 'Customer support', capabilities: ['Business profiles', 'Catalogs', 'Quick replies'], category: 'regional', popular: true },
        { name: 'Signal for Work', logoUrl: '/src/assets/discord-icon.png', color: 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50', borderColor: 'border-blue-200 hover:border-blue-300 dark:border-blue-800 dark:hover:border-blue-700', integration: 'Secure enterprise', capabilities: ['End-to-end encryption', 'Group management', 'File sharing'], category: 'regional' }
      ]
    }
  ];

  const currentCategory = platformCategories.find(cat => cat.id === selectedCategory) || platformCategories[0];
  const totalPlatforms = platformCategories.reduce((total, cat) => total + cat.platforms.length, 0);

  return (
    <section className="py-24 bg-gradient-to-br from-muted/30 to-accent/10 relative overflow-hidden">
      {/* Background enhancement */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-8 px-6 py-3 text-base font-semibold bg-gradient-primary text-white border-0 shadow-brand-md hover:shadow-brand-lg hover:scale-105 transition-all duration-300">
            <Globe className="w-5 h-5 mr-2" />
            {totalPlatforms}+ Supported Platforms
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            <span className="block text-foreground mb-2">Connect Your Entire</span>
            <span className="text-gradient-primary">Communication Ecosystem</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            SyncRivo® integrates with all major messaging platforms and business applications. 
            Choose your platforms, connect your workflows, and watch your productivity soar.
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-1 bg-card/50 backdrop-blur-sm p-2 rounded-xl shadow-brand-md">
              {platformCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground shadow-brand-md'
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.title.split(' ')[0]}</span>
                  <span className="sm:hidden">{category.title.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Category Content */}
          {platformCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-8">
              {/* Category Description */}
              <div className="text-center mb-12 animate-fade-in">
                <div className={`w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-brand-lg`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{category.title}</h3>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{category.description}</p>
              </div>

              {/* Platforms Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.platforms.map((platform, index) => (
                  <Card
                    key={platform.name}
                    className={`group p-6 border-2 ${platform.color} ${platform.borderColor} hover:shadow-brand-lg transition-all duration-300 transform hover:-translate-y-2 animate-fade-in`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-0 space-y-4">
                      {/* Platform Icon and Name */}
                       <div className="flex items-center space-x-3 mb-4">
                         <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md group-hover:shadow-lg border border-border/20">
                           <img 
                             src={platform.logoUrl} 
                             alt={`${platform.name} logo`}
                             className="w-8 h-8 object-contain"
                             onError={(e) => {
                               const img = e.currentTarget as HTMLImageElement;
                               const fallback = img.nextElementSibling as HTMLElement;
                               img.style.display = 'none';
                               if (fallback) fallback.style.display = 'flex';
                             }}
                           />
                           <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center text-sm font-bold text-white hidden">
                             {platform.name.slice(0, 2).toUpperCase()}
                           </div>
                         </div>
                        <div>
                          <h4 className="font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                            {platform.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">{platform.integration}</p>
                        </div>
                      </div>

                      {/* Capabilities */}
                      <div className="space-y-2">
                        {platform.capabilities.map((capability, i) => (
                          <div key={i} className="flex items-center text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-success mr-2 flex-shrink-0" />
                            <span>{capability}</span>
                          </div>
                        ))}
                      </div>

                      {/* Integration Status */}
                      <div className="pt-4 border-t border-border/30">
                        <Badge variant="secondary" className="text-xs bg-success/10 text-success border-success/20">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Ready for Integration
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Category Summary */}
              <div className="text-center mt-12 p-8 bg-card/50 backdrop-blur-sm rounded-xl border border-border/30">
                <p className="text-lg font-semibold text-foreground mb-2">
                  {category.platforms.length} platforms in this category
                </p>
                <p className="text-muted-foreground mb-6">
                  Connect all your {category.title.toLowerCase()} tools for seamless workflow automation
                </p>
                <Button 
                  className="group bg-gradient-primary hover:bg-gradient-primary-hover text-white font-semibold px-8 py-3 rounded-full shadow-brand-lg hover:shadow-brand-xl transform hover:scale-105 transition-all duration-300"
                >
                  Start Integration
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Overall CTA */}
        <div className="text-center mt-20 p-12 bg-gradient-primary rounded-2xl text-white shadow-brand-2xl">
          <h3 className="text-3xl font-bold mb-4">Ready to Connect Your Platforms?</h3>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Join thousands of teams already using SyncRivo® to streamline their communication workflows
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white text-primary hover:bg-gray-50 font-bold px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              View All Integrations
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-primary font-bold px-8 py-4 text-lg transition-all duration-300"
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}