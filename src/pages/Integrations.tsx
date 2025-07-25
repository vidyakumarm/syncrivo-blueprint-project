import { useState } from 'react';
import { useTranslationWithFallback } from '@/hooks/useTranslationWithFallback';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Star, ExternalLink, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Integrations() {
  const { t } = useTranslationWithFallback();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: t('integrations.categories.all') },
    { value: 'crm', label: t('integrations.categories.crm') },
    { value: 'marketing', label: t('integrations.categories.marketing') },
    { value: 'ecommerce', label: t('integrations.categories.ecommerce') },
    { value: 'support', label: t('integrations.categories.support') },
    { value: 'finance', label: t('integrations.categories.finance') },
    { value: 'productivity', label: t('integrations.categories.productivity') },
    { value: 'communication', label: t('integrations.categories.communication') },
  ];

  const integrations = [
    // Communication Platforms
    {
      id: 'slack',
      name: 'Slack',
      description: t('integrations.descriptions.slack'),
      category: 'communication',
      rating: 4.9,
      users: '50k+',
      popular: true,
      logoUrl: '/src/assets/brands/slack-official.svg',
      color: 'bg-purple-50 border-purple-200 text-purple-600 dark:bg-purple-950/30 dark:border-purple-800'
    },
    {
      id: 'microsoft-teams',
      name: 'Microsoft Teams',
      description: 'Enterprise team collaboration and communication platform',
      category: 'communication',
      rating: 4.8,
      users: '45k+',
      popular: true,
      logoUrl: '/src/assets/brands/teams-official.svg',
      color: 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-950/30 dark:border-blue-800'
    },
    {
      id: 'discord',
      name: 'Discord',
      description: 'Community and team communication platform',
      category: 'communication',
      rating: 4.7,
      users: '30k+',
      popular: true,
      logoUrl: '/src/assets/brands/discord-official.png',
      color: 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950/30 dark:border-indigo-800'
    },
    {
      id: 'google-meet',
      name: 'Google Meet',
      description: 'Video conferencing and team communication',
      category: 'communication',
      rating: 4.6,
      users: '40k+',
      popular: true,
      logoUrl: '/src/assets/brands/google-meet.svg',
      color: 'bg-green-50 border-green-200 text-green-600 dark:bg-green-950/30 dark:border-green-800'
    },
    {
      id: 'zoom',
      name: 'Zoom',
      description: 'Video meetings and team chat platform',
      category: 'communication',
      rating: 4.8,
      users: '42k+',
      popular: true,
      logoUrl: '/src/assets/zoom-icon.png',
      color: 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-950/30 dark:border-blue-800'
    },
    {
      id: 'webex',
      name: 'Cisco Webex',
      description: 'Enterprise video conferencing and messaging',
      category: 'communication',
      rating: 4.5,
      users: '25k+',
      popular: false,
      logoUrl: '/src/assets/webex-icon.png',
      color: 'bg-green-50 border-green-200 text-green-600 dark:bg-green-950/30 dark:border-green-800'
    },
    // Customer Support Platforms
    {
      id: 'intercom',
      name: 'Intercom',
      description: 'Customer messaging and support platform',
      category: 'support',
      rating: 4.7,
      users: '28k+',
      popular: true,
      logoUrl: '/src/assets/discord-icon.png', // Placeholder - would use actual Intercom logo
      color: 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-950/30 dark:border-blue-800'
    },
    {
      id: 'zendesk',
      name: 'Zendesk',
      description: t('integrations.descriptions.zendesk'),
      category: 'support',
      rating: 4.4,
      users: '12k+',
      popular: false,
      logoUrl: '/src/assets/discord-icon.png', // Placeholder - would use actual Zendesk logo
      color: 'bg-teal-50 border-teal-200 text-teal-600 dark:bg-teal-950/30 dark:border-teal-800'
    },
    {
      id: 'freshchat',
      name: 'Freshchat',
      description: 'Modern messaging software for sales and customer engagement',
      category: 'support',
      rating: 4.5,
      users: '18k+',
      popular: false,
      logoUrl: '/src/assets/discord-icon.png', // Placeholder - would use actual Freshchat logo
      color: 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-950/30 dark:border-blue-800'
    },
    // CRM & Sales Platforms
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: t('integrations.descriptions.salesforce'),
      category: 'crm',
      rating: 4.8,
      users: '25k+',
      popular: true,
      logoUrl: '/src/assets/discord-icon.png', // Placeholder - would use actual Salesforce logo
      color: 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-950/30 dark:border-blue-800'
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      description: t('integrations.descriptions.hubspot'),
      category: 'marketing',
      rating: 4.6,
      users: '20k+',
      popular: false,
      logoUrl: '/src/assets/discord-icon.png', // Placeholder - would use actual HubSpot logo
      color: 'bg-orange-50 border-orange-200 text-orange-600 dark:bg-orange-950/30 dark:border-orange-800'
    },
    // Regional Platforms
    {
      id: 'whatsapp-business',
      name: 'WhatsApp Business',
      description: 'Business messaging for customer communication',
      category: 'communication',
      rating: 4.6,
      users: '35k+',
      popular: true,
      logoUrl: '/src/assets/discord-icon.png', // Placeholder - would use actual WhatsApp logo
      color: 'bg-green-50 border-green-200 text-green-600 dark:bg-green-950/30 dark:border-green-800'
    },
    {
      id: 'telegram',
      name: 'Telegram Business',
      description: 'Secure business messaging and automation',
      category: 'communication',
      rating: 4.5,
      users: '22k+',
      popular: false,
      logoUrl: '/src/assets/discord-icon.png', // Placeholder - would use actual Telegram logo
      color: 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-950/30 dark:border-blue-800'
    },
    // Productivity Platforms
    {
      id: 'notion',
      name: 'Notion',
      description: t('integrations.descriptions.notion'),
      category: 'productivity',
      rating: 4.7,
      users: '18k+',
      popular: false,
      logoUrl: '/src/assets/discord-icon.png', // Placeholder - would use actual Notion logo
      color: 'bg-gray-50 border-gray-200 text-gray-600 dark:bg-gray-950/30 dark:border-gray-800'
    },
    {
      id: 'google-workspace',
      name: 'Google Workspace',
      description: t('integrations.descriptions.google_workspace'),
      category: 'productivity',
      rating: 4.6,
      users: '35k+',
      popular: true,
      logoUrl: '/src/assets/brands/google-meet.svg',
      color: 'bg-red-50 border-red-200 text-red-600 dark:bg-red-950/30 dark:border-red-800'
    },
    // Finance & E-commerce
    {
      id: 'stripe',
      name: 'Stripe',
      description: t('integrations.descriptions.stripe'),
      category: 'finance',
      rating: 4.9,
      users: '40k+',
      popular: true,
      logoUrl: '/src/assets/discord-icon.png', // Placeholder - would use actual Stripe logo
      color: 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950/30 dark:border-indigo-800'
    },
    {
      id: 'shopify',
      name: 'Shopify',
      description: t('integrations.descriptions.shopify'),
      category: 'ecommerce',
      rating: 4.7,
      users: '30k+',
      popular: true,
      logoUrl: '/src/assets/discord-icon.png', // Placeholder - would use actual Shopify logo
      color: 'bg-green-50 border-green-200 text-green-600 dark:bg-green-950/30 dark:border-green-800'
    }
  ];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularIntegrations = integrations.filter(i => i.popular).slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-light/50 to-accent-light/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium bg-primary-light text-primary border-primary/20">
                <Zap className="w-4 h-4 mr-2" />
                {t('integrations.hero_badge')}
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                {t('integrations.hero_title')}
                <span className="block bg-gradient-hero bg-clip-text text-transparent">
                  {t('integrations.hero_title_highlight')}
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                {t('integrations.hero_subtitle')}
              </p>
            </div>

            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('integrations.search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48 h-12">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder={t('integrations.category_placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Popular Integrations */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  {t('integrations.popular_title')}
                </h2>
                <p className="text-muted-foreground">
                  {t('integrations.popular_subtitle')}
                </p>
              </div>
              <Badge variant="secondary" className="px-3 py-1">
                <Star className="w-4 h-4 mr-1" />
                {t('integrations.featured_badge')}
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {popularIntegrations.map((integration) => (
                <Card key={integration.id} className={`border-2 ${integration.color} hover:shadow-brand-lg transition-all duration-300 cursor-pointer group`}>
                  <Link to={`/integrations/${integration.id}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center space-x-3">
                           <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/50 flex items-center justify-center border border-border/20">
                             <img 
                               src={integration.logoUrl} 
                               alt={`${integration.name} logo`}
                               className="w-8 h-8 object-contain"
                                onError={(e) => {
                                  const img = e.currentTarget as HTMLImageElement;
                                  const fallback = img.nextElementSibling as HTMLElement;
                                  img.style.display = 'none';
                                  if (fallback) fallback.style.display = 'flex';
                                }}
                             />
                             <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-sm font-semibold text-muted-foreground hidden">
                               {integration.name.slice(0, 2).toUpperCase()}
                             </div>
                           </div>
                          <div>
                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                              {integration.name}
                            </CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex items-center">
                                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-muted-foreground ml-1">
                                  {integration.rating}
                                </span>
                              </div>
                               <span className="text-xs text-muted-foreground">
                                 {integration.users} {t('integrations.users_suffix')}
                               </span>
                            </div>
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        {integration.description}
                      </CardDescription>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* All Integrations */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                {t('integrations.all_integrations')} ({filteredIntegrations.length})
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIntegrations.map((integration) => (
                <Card key={integration.id} className="hover:shadow-brand-md transition-all duration-300 cursor-pointer group border-border/50 hover:border-primary/20">
                  <Link to={`/integrations/${integration.id}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center space-x-3">
                           <div className="w-8 h-8 rounded overflow-hidden bg-white/50 flex items-center justify-center border border-border/20">
                             <img 
                               src={integration.logoUrl} 
                               alt={`${integration.name} logo`}
                               className="w-6 h-6 object-contain"
                                onError={(e) => {
                                  const img = e.currentTarget as HTMLImageElement;
                                  const fallback = img.nextElementSibling as HTMLElement;
                                  img.style.display = 'none';
                                  if (fallback) fallback.style.display = 'flex';
                                }}
                             />
                             <div className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground hidden">
                               {integration.name.slice(0, 2).toUpperCase()}
                             </div>
                           </div>
                          <div>
                            <CardTitle className="text-base group-hover:text-primary transition-colors">
                              {integration.name}
                            </CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex items-center">
                                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-muted-foreground ml-1">
                                  {integration.rating}
                                </span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {integration.users}
                              </span>
                               {integration.popular && (
                                 <Badge variant="secondary" className="text-xs px-2 py-0.5">
                                   {t('integrations.popular_badge')}
                                 </Badge>
                               )}
                            </div>
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        {integration.description}
                      </CardDescription>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>

            {filteredIntegrations.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">{t('integrations.no_results')}</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                >
                  {t('integrations.clear_filters')}
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              {t('integrations.cta_title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('integrations.cta_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-primary hover:bg-primary-hover">
                <Link to="/docs">{t('integrations.view_api_docs')}</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/support">{t('integrations.request_integration')}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}