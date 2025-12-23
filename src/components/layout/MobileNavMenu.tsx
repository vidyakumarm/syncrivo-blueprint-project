import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import {
  Menu,
  ChevronDown,
  LogOut,
  X // Used by SheetClose internally but good to have
} from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { LanguageSelector } from '@/components/ui/language-selector';
// ThemeToggle removed for mobile enforcement
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose // Import SheetClose for explicit closing actions if needed
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { AnimatePresence, motion } from 'framer-motion';

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

interface MobileNavMenuProps {
  navItems: NavItem[];
  user: SupabaseUser | null;
  onSignOut: () => Promise<void>;
}

export function MobileNavMenu({ navItems, user, onSignOut }: MobileNavMenuProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [open, setOpen] = useState(false); // Local state to control sheet closing on nav

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/');
  const displayName = user?.user_metadata?.display_name || user?.email;

  const handleLinkClick = () => {
    setOpen(false);
  };

  const handleSignOut = async () => {
    await onSignOut();
    handleLinkClick();
  };

  const toggleAccordion = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  const dashboardItem = user ? { label: t('dashboard.title', 'Dashboard'), href: '/dashboard' } : null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden h-10 w-10 p-0 text-foreground z-50 hover:bg-accent"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:w-[350px] p-0 flex flex-col bg-background/95 backdrop-blur-xl border-l border-border/40">
        <SheetHeader className="px-6 py-4 border-b border-border/40">
          <SheetTitle className="text-left">
            <Link to="/" onClick={handleLinkClick} className="flex items-center gap-2">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-emerald-500">
                SyncRivo
              </span>
            </Link>
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6 py-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col space-y-2">
              {/* Dashboard Link */}
              {dashboardItem && (
                <Link
                  to={dashboardItem.href}
                  onClick={handleLinkClick}
                  className={`block rounded-lg px-3 py-2 text-base font-semibold transition-colors ${isActive(dashboardItem.href)
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground hover:bg-muted'
                    }`}
                >
                  {dashboardItem.label}
                </Link>
              )}

              {navItems.map((item) => (
                <div key={item.label} className="space-y-1">
                  {item.children ? (
                    <div className="rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleAccordion(item.label)}
                        className={`flex w-full items-center justify-between px-3 py-2 text-base font-semibold transition-colors rounded-lg hover:bg-muted ${expandedItem === item.label ? 'bg-muted/50 text-foreground' : 'text-foreground/80'
                          }`}
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${expandedItem === item.label ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <AnimatePresence>
                        {expandedItem === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-1 flex flex-col space-y-1 pl-4 border-l-2 border-border/40 ml-3">
                              {item.children.map((child) => (
                                <Link
                                  key={child.label}
                                  to={child.href}
                                  onClick={handleLinkClick}
                                  className={`block rounded-md py-2 pl-3 pr-3 text-sm font-medium transition-colors ${isActive(child.href)
                                      ? 'text-primary bg-primary/10'
                                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                    }`}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={handleLinkClick}
                      className={`block rounded-lg px-3 py-2 text-base font-semibold transition-colors ${isActive(item.href)
                          ? 'text-primary bg-primary/10'
                          : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                        }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>

        < div className="mt-auto px-6 py-6 border-t border-border/40 bg-muted/20">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">{t('common.language')}</span>
              <LanguageSelector />
            </div>

            {user ? (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-background border border-border/50">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                    {displayName?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{displayName}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  className="w-full justify-center text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('common.logout')}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button variant="outline" asChild className="w-full">
                  <Link to="/login" onClick={handleLinkClick}>{t('common.login')}</Link>
                </Button>
                <Button asChild className="w-full bg-gradient-brand shadow-lg shadow-indigo-500/20">
                  <Link to="/signup" onClick={handleLinkClick}>{t('hero.cta_primary')}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}