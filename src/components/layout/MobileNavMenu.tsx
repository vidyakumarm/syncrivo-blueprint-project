import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import {
  User,
  LogOut,
  X,
  ChevronDown,
  ChevronRight,
  Menu
} from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { LanguageSelector } from '@/components/ui/language-selector';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

interface MobileNavMenuProps {
  navItems: NavItem[];
  user: SupabaseUser | null;
  onSignOut: () => Promise<void>;
  onLinkClick: () => void;
}

export function MobileNavMenu({ navItems, user, onSignOut, onLinkClick }: MobileNavMenuProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/');
  const displayName = user?.user_metadata?.display_name || user?.email;

  const handleSignOut = async () => {
    await onSignOut();
    onLinkClick();
  };

  const toggleAccordion = (label: string) => {
    if (expandedItem === label) {
      setExpandedItem(null);
    } else {
      setExpandedItem(label);
    }
  };

  // Filter out dashboard link for authenticated users to be added manually or handled differently if needed
  // For this design, we'll keep the list clean. Dashboard usually goes in the user section or top level.
  // Let's ensure 'Dashboard' is a top level item if user is logged in.

  const dashboardItem = user ? { label: t('dashboard.title'), href: '/dashboard' } : null;

  // We don't want to flatten the items anymore. We want to keep hierarchy.
  // We will iterate mainly over navItems.

  return (
    <div className="relative z-[100]">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onLinkClick} // Close on backdrop click
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border shadow-xl flex flex-col h-full"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" onClick={onLinkClick} className="-m-1.5 p-1.5">
            <span className="sr-only">SyncRivo</span>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-emerald-500">
              SyncRivo
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={onLinkClick}
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </Button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 flow-root overflow-y-auto -mx-6 px-6">
          <div className="divide-gray-500/10 flex flex-col gap-y-1">

            {dashboardItem && (
              <Link
                to={dashboardItem.href}
                onClick={onLinkClick}
                className={`-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 ${isActive(dashboardItem.href)
                  ? 'text-primary bg-primary/5'
                  : 'text-foreground hover:bg-accent'
                  }`}
              >
                {dashboardItem.label}
              </Link>
            )}

            {navItems.map((item) => (
              <div key={item.label} className="space-y-1">
                {item.children ? (
                  // Accordion Item
                  <div>
                    <button
                      type="button"
                      className={`flex w-full items-center justify-between rounded-lg py-2.5 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-accent ${expandedItem === item.label ? 'text-primary' : 'text-foreground'
                        }`}
                      onClick={() => toggleAccordion(item.label)}
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-5 w-5 flex-none transition-transform duration-200 ${expandedItem === item.label ? 'rotate-180' : ''
                          }`}
                        aria-hidden="true"
                      />
                    </button>
                    <AnimatePresence>
                      {expandedItem === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="mt-1 space-y-1 pl-4 border-l-2 border-border/50 ml-2">
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                to={child.href}
                                onClick={onLinkClick}
                                className={`block rounded-md py-2 pl-3 pr-3 text-sm font-medium leading-6 ${isActive(child.href)
                                  ? 'text-primary bg-primary/5'
                                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
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
                  // Standard Link
                  <Link
                    to={item.href}
                    onClick={onLinkClick}
                    className={`-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 ${isActive(item.href)
                      ? 'text-primary bg-primary/5'
                      : 'text-foreground hover:bg-accent'
                      }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer (Sticky Bottom) */}
        <div className="pt-6 mt-6 border-t border-border/40 pb-6">
          <div className="flex items-center justify-between mb-6">
            <LanguageSelector />
          </div>

          {user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 px-2 py-2 rounded-md bg-accent/30">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
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
            <div className="grid grid-cols-1 gap-3">
              <Link
                to="/login"
                onClick={onLinkClick}
                className="w-full"
              >
                <Button variant="outline" className="w-full justify-center h-12 text-base">
                  {t('common.login')}
                </Button>
              </Link>
              <Link
                to="/signup"
                onClick={onLinkClick}
                className="w-full"
              >
                <Button className="w-full justify-center bg-gradient-brand hover:opacity-90 h-12 text-base font-semibold shadow-lg shadow-indigo-500/20">
                  {t('hero.cta_primary')}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}