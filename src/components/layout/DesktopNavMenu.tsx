import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
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
  
  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/');

  return (
    <div className="hidden md:flex items-center space-x-8">
      {navItems.map((item) => (
        item.children ? (
          <DropdownMenu key={item.label}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex items-center space-x-1 text-muted-foreground hover:text-foreground"
              >
                <span>{item.label}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {item.children.map((child) => (
                <DropdownMenuItem key={child.href} asChild>
                  <Link 
                    to={child.href}
                    className={`w-full ${isActive(child.href) ? 'text-primary bg-primary-light' : ''}`}
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
            className={`text-sm font-medium transition-colors px-3 py-2 rounded-md ${
              isActive(item.href)
                ? 'text-primary bg-primary-light'
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