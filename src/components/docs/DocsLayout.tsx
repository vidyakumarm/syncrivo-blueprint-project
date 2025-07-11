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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const docSections: DocSection[] = [
    {
      title: t('docs.sidebar.getting_started'),
      items: [
        { title: t('docs.quick_start'), href: '/docs/quickstart' },
        { title: t('docs.sidebar.installation'), href: '/docs/installation' },
        { title: t('docs.sidebar.authentication'), href: '/docs/authentication' },
        { title: t('docs.sidebar.first_integration'), href: '/docs/first-integration' },
      ]
    },
    {
      title: t('docs.sidebar.integrations'),
      items: [
        { title: t('docs.sidebar.slack'), href: '/docs/integrations/slack', badge: t('docs.badge_popular') },
        { title: t('docs.sidebar.google_drive'), href: '/docs/integrations/google-drive' },
        { title: t('docs.sidebar.notion'), href: '/docs/integrations/notion', badge: t('docs.badge_new') },
        { title: t('docs.sidebar.airtable'), href: '/docs/integrations/airtable' },
        { title: t('docs.sidebar.trello'), href: '/docs/integrations/trello' },
        { title: t('docs.sidebar.custom_api'), href: '/docs/integrations/custom-api' },
      ]
    },
    {
      title: t('docs.sidebar.api_reference'),
      items: [
        { title: t('docs.sidebar.rest_api'), href: '/docs/api/rest' },
        { title: t('docs.sidebar.webhooks'), href: '/docs/api/webhooks' },
        { title: t('docs.sidebar.graphql'), href: '/docs/api/graphql', badge: t('docs.badge_beta') },
        { title: t('docs.sidebar.sdk_reference'), href: '/docs/api/sdk' },
      ]
    },
    {
      title: t('docs.sidebar.advanced'),
      items: [
        { title: t('docs.sidebar.data_mapping'), href: '/docs/advanced/data-mapping' },
        { title: t('docs.sidebar.error_handling'), href: '/docs/advanced/error-handling' },
        { title: t('docs.sidebar.rate_limiting'), href: '/docs/advanced/rate-limiting' },
        { title: t('docs.sidebar.security'), href: '/docs/advanced/security' },
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
                    placeholder={t('docs.sidebar.search_placeholder')}
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
                    {t('docs.sidebar.need_help')}
                  </h4>
                  <div className="space-y-2">
                    <Link 
                      to="/support" 
                      className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t('docs.sidebar.contact_support')}
                    </Link>
                    <Link 
                      to="/support#community" 
                      className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t('docs.sidebar.community_forum')}
                    </Link>
                    <Link 
                      to="/support#examples" 
                      className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t('docs.sidebar.code_examples')}
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