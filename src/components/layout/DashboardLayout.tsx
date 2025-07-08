import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link, useLocation } from 'react-router-dom';
import { useTranslationWithFallback } from '@/hooks/useTranslationWithFallback';
import { 
  BarChart3, 
  Settings, 
  Activity, 
  Zap, 
  User,
  Shield,
  Users
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const { t } = useTranslationWithFallback();

  const sidebarItems = [
    { name: t('dashboard.sidebar.overview'), href: '/dashboard', icon: BarChart3 },
    { name: t('dashboard.sidebar.connections'), href: '/dashboard/connections', icon: Zap },
    { name: t('dashboard.sidebar.activity'), href: '/dashboard/activity', icon: Activity },
    { name: t('dashboard.sidebar.profile'), href: '/dashboard/settings/profile', icon: User },
    { name: t('dashboard.sidebar.team'), href: '/dashboard/settings/team', icon: Users },
    { name: t('dashboard.sidebar.security'), href: '/dashboard/settings/security', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex pt-16 md:pt-20">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 bg-card border-r border-border min-h-screen">
          <div className="p-4 lg:p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">{t('common.dashboard')}</h2>
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href || 
                  (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 py-2.5 rounded-md text-sm transition-colors min-h-[44px] ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Mobile Navigation Tabs */}
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-background border-t border-border">
          <div className="grid grid-cols-3 gap-1 p-2">
            {sidebarItems.slice(0, 6).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href || 
                (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-md text-xs transition-colors min-h-[56px] ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <Icon className="h-4 w-4 mb-1 flex-shrink-0" />
                  <span className="truncate leading-tight">{item.name.split(' ')[0]}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}