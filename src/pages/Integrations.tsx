import { useState } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'crm', label: 'CRM & Sales' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'support', label: 'Customer Support' },
    { value: 'finance', label: 'Finance & Accounting' },
    { value: 'productivity', label: 'Productivity' },
    { value: 'communication', label: 'Communication' },
  ];

  const integrations = [
    {
      id: 'slack',
      name: 'Slack',
      description: 'Team communication and collaboration platform',
      category: 'communication',
      rating: 4.9,
      users: '50k+',
      popular: true,
      icon: '💬',
      color: 'bg-purple-50 border-purple-200 text-purple-600'
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'World\'s #1 CRM platform',
      category: 'crm',
      rating: 4.8,
      users: '25k+',
      popular: true,
      icon: '☁️',
      color: 'bg-blue-50 border-blue-200 text-blue-600'
    },
    {
      id: 'shopify',
      name: 'Shopify',
      description: 'Leading e-commerce platform',
      category: 'ecommerce',
      rating: 4.7,
      users: '30k+',
      popular: true,
      icon: '🛍️',
      color: 'bg-green-50 border-green-200 text-green-600'
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      description: 'Inbound marketing and sales platform',
      category: 'marketing',
      rating: 4.6,
      users: '20k+',
      popular: false,
      icon: '🎯',
      color: 'bg-orange-50 border-orange-200 text-orange-600'
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Online payment processing',
      category: 'finance',
      rating: 4.9,
      users: '40k+',
      popular: true,
      icon: '💳',
      color: 'bg-indigo-50 border-indigo-200 text-indigo-600'
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Email marketing automation',
      category: 'marketing',
      rating: 4.5,
      users: '15k+',
      popular: false,
      icon: '📧',
      color: 'bg-yellow-50 border-yellow-200 text-yellow-600'
    },
    {
      id: 'zendesk',
      name: 'Zendesk',
      description: 'Customer service software',
      category: 'support',
      rating: 4.4,
      users: '12k+',
      popular: false,
      icon: '🎧',
      color: 'bg-teal-50 border-teal-200 text-teal-600'
    },
    {
      id: 'notion',
      name: 'Notion',
      description: 'All-in-one workspace',
      category: 'productivity',
      rating: 4.7,
      users: '18k+',
      popular: false,
      icon: '📝',
      color: 'bg-gray-50 border-gray-200 text-gray-600'
    },
    {
      id: 'google-workspace',
      name: 'Google Workspace',
      description: 'Cloud-based productivity suite',
      category: 'productivity',
      rating: 4.6,
      users: '35k+',
      popular: true,
      icon: '🎨',
      color: 'bg-red-50 border-red-200 text-red-600'
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
                500+ Integrations
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Connect your entire
                <span className="block bg-gradient-hero bg-clip-text text-transparent">
                  business ecosystem
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                Browse our extensive library of pre-built integrations or build custom connections 
                to sync data between all your favorite business applications.
              </p>
            </div>

            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search integrations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48 h-12">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
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
                  Popular Integrations
                </h2>
                <p className="text-muted-foreground">
                  Most loved by our community
                </p>
              </div>
              <Badge variant="secondary" className="px-3 py-1">
                <Star className="w-4 h-4 mr-1" />
                Featured
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {popularIntegrations.map((integration) => (
                <Card key={integration.id} className={`border-2 ${integration.color} hover:shadow-brand-lg transition-all duration-300 cursor-pointer group`}>
                  <Link to={`/integrations/${integration.id}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{integration.icon}</span>
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
                                {integration.users} users
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
                All Integrations ({filteredIntegrations.length})
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIntegrations.map((integration) => (
                <Card key={integration.id} className="hover:shadow-brand-md transition-all duration-300 cursor-pointer group border-border/50 hover:border-primary/20">
                  <Link to={`/integrations/${integration.id}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{integration.icon}</span>
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
                                  Popular
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
                <p className="text-muted-foreground mb-4">No integrations found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Don't see the integration you need?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Build custom integrations with our powerful API or request new integrations from our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-primary hover:bg-primary-hover">
                <Link to="/docs">View API Docs</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/support">Request Integration</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}