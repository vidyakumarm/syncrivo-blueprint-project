import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link, useLocation } from 'react-router-dom';
import { 
  Book, 
  Zap, 
  Code, 
  Settings, 
  HelpCircle,
  Search,
  ChevronRight,
  FileText,
  Database,
  Shield,
  Webhook
} from 'lucide-react';
import { useState } from 'react';

interface DocsLayoutProps {
  children: React.ReactNode;
}

interface DocSection {
  title: string;
  items: {
    title: string;
    href: string;
    badge?: string;
  }[];
}

export function DocsLayout({ children }: DocsLayoutProps) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const docSections: DocSection[] = [
    {
      title: 'Getting Started',
      items: [
        { title: 'Quick Start', href: '/docs/quickstart' },
        { title: 'Installation', href: '/docs/installation' },
        { title: 'Authentication', href: '/docs/authentication' },
        { title: 'Your First Integration', href: '/docs/first-integration' },
      ]
    },
    {
      title: 'Integrations',
      items: [
        { title: 'Slack', href: '/docs/integrations/slack', badge: 'Popular' },
        { title: 'Google Drive', href: '/docs/integrations/google-drive' },
        { title: 'Notion', href: '/docs/integrations/notion', badge: 'New' },
        { title: 'Airtable', href: '/docs/integrations/airtable' },
        { title: 'Trello', href: '/docs/integrations/trello' },
        { title: 'Custom API', href: '/docs/integrations/custom-api' },
      ]
    },
    {
      title: 'API Reference',
      items: [
        { title: 'REST API', href: '/docs/api/rest' },
        { title: 'Webhooks', href: '/docs/api/webhooks' },
        { title: 'GraphQL', href: '/docs/api/graphql', badge: 'Beta' },
        { title: 'SDK Reference', href: '/docs/api/sdk' },
      ]
    },
    {
      title: 'Advanced',
      items: [
        { title: 'Data Mapping', href: '/docs/advanced/data-mapping' },
        { title: 'Error Handling', href: '/docs/advanced/error-handling' },
        { title: 'Rate Limiting', href: '/docs/advanced/rate-limiting' },
        { title: 'Security', href: '/docs/advanced/security' },
      ]
    }
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 py-8">
            {/* Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search docs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Navigation */}
                <nav className="space-y-6">
                  {docSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
                        {section.title}
                      </h3>
                      <ul className="space-y-2">
                        {section.items
                          .filter(item => 
                            searchQuery === '' || 
                            item.title.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((item) => (
                          <li key={item.href}>
                            <Link
                              to={item.href}
                              className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                                isActive(item.href)
                                  ? 'bg-primary text-primary-foreground'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                              }`}
                            >
                              <span>{item.title}</span>
                              {item.badge && (
                                <Badge variant="secondary" className="text-xs">
                                  {item.badge}
                                </Badge>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </nav>

                {/* Quick Links */}
                <Card className="p-4 bg-gradient-card">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Need Help?
                  </h4>
                  <div className="space-y-2">
                    <Link 
                      to="/support" 
                      className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Contact Support
                    </Link>
                    <Link 
                      to="/support#community" 
                      className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Community Forum
                    </Link>
                    <Link 
                      to="/support#examples" 
                      className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Code Examples
                    </Link>
                  </div>
                </Card>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 w-full lg:w-auto">
              <div className="max-w-4xl">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}