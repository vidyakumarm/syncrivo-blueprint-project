import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

interface DesktopNavMenuProps {
  navItems: NavItem[];
}

export function DesktopNavMenu({ navItems }: DesktopNavMenuProps) {
  const location = useLocation();
  const { t } = useTranslation();
  
  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/');

  // Use translated nav items instead of props
  const translatedNavItems = [
    { label: t('dashboard.title'), href: '/dashboard' },
    { label: t('common.features'), href: '/features' },
    { label: t('common.integrations'), href: '/integrations' },
    { label: t('common.pricing'), href: '/pricing' },
    { 
      label: t('nav.resources'), 
      href: '/docs',
      children: [
        { label: t('common.documentation'), href: '/docs' },
        { label: t('common.support'), href: '/support' },
        { label: t('common.about'), href: '/about' },
      ]
    },
  ];

  return (
    <div className="flex items-center space-x-2">
      {translatedNavItems.map((item) => (
        item.children ? (
          <DropdownMenu key={item.label}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex items-center space-x-1 text-muted-foreground hover:text-foreground px-4 py-2 h-11 font-medium transition-all duration-200 hover:bg-accent/10"
              >
                <span>{item.label}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 bg-background border border-border shadow-xl rounded-lg z-50 p-1">
              {item.children.map((child) => (
                <DropdownMenuItem key={child.href} asChild className="rounded-md">
                  <Link 
                    to={child.href}
                    className={`w-full px-3 py-2.5 transition-colors duration-200 ${
                      isActive(child.href) 
                        ? 'text-primary bg-primary/10 font-medium' 
                        : 'hover:text-foreground hover:bg-accent/50'
                    }`}
                  >
                    {child.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            key={item.href}
            to={item.href}
            className={`text-sm font-medium transition-all duration-200 px-4 py-2 h-11 rounded-lg flex items-center ${
              isActive(item.href)
                ? 'text-primary bg-primary/10 font-semibold'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/10'
            }`}
          >
            {item.label}
          </Link>
        )
      ))}
    </div>
  );
}