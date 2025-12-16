
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { RotatingWorldIcon } from '@/components/ui/rotating-world-icon';
import { Linkedin, Twitter, Github } from 'lucide-react';
import { EnterpriseDemoModal } from '@/components/sections/EnterpriseDemoModal';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <footer className="bg-card/50 backdrop-blur-lg border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-7 gap-8 lg:gap-8">

          {/* Brand Section - Takes 2 columns on LG */}
          <div className="col-span-1 lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center space-x-3 group w-fit">
              <RotatingWorldIcon
                size="lg"
                speed="slow"
                className="transition-transform duration-300 group-hover:scale-110 text-primary"
                aria-hidden="true"
              />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-indigo-600">
                SyncRivo<sup className="text-xs text-foreground">®</sup>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm text-base leading-relaxed">
              {t('footer.tagline')}
            </p>

          </div>

          {/* Product Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground tracking-tight">{t('footer.product')}</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('footer.home')}</Link></li>
              <li><Link to="/features" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('footer.features')}</Link></li>
              <li><Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('footer.pricing')}</Link></li>
              <li>
                <button
                  onClick={() => setDemoModalOpen(true)}
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors text-left"
                >
                  {t('footer.book_demo')}
                </button>
              </li>
            </ul>
          </div>

          {/* Regions Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground tracking-tight">Regions</h3>
            <ul className="space-y-3">
              <li><Link to="/usa" className="text-sm text-muted-foreground hover:text-primary transition-colors">USA</Link></li>
              <li><Link to="/uk" className="text-sm text-muted-foreground hover:text-primary transition-colors">United Kingdom</Link></li>
              <li><Link to="/europe" className="text-sm text-muted-foreground hover:text-primary transition-colors">Europe</Link></li>
              <li><Link to="/middle-east" className="text-sm text-muted-foreground hover:text-primary transition-colors">Middle East</Link></li>
              <li><Link to="/apac" className="text-sm text-muted-foreground hover:text-primary transition-colors">APAC</Link></li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground tracking-tight">{t('footer.solutions')}</h3>
            <ul className="space-y-3">
              <li><Link to="/solutions/frontline-workforce" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('footer.frontline')}</Link></li>
              <li><Link to="/solutions/mergers-acquisitions" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('footer.mergers')}</Link></li>
              <li><Link to="/solutions/multi-platform" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('footer.coexistence')}</Link></li>
              <li><Link to="/solutions/vendor-flexibility" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('footer.vendor_lockin')}</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground tracking-tight">{t('footer.company')}</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('footer.about')}</Link></li>
              <li><Link to="/contact-sales" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('footer.contact_sales')}</Link></li>
              <li><Link to="/careers" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('footer.careers')}</Link></li>
              <li><Link to="/solutions/external-partners" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('footer.partners')}</Link></li>
            </ul>
          </div>

          {/* Resources & Legal Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground tracking-tight">{t('footer.resources')}</h3>
            <ul className="space-y-3">
              <li><Link to="/docs" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('footer.documentation')}</Link></li>
              <li><Link to="/status" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('footer.status')}</Link></li>
              <li><Link to="/security" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('footer.security')}</Link></li>
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('footer.privacy_policy')}</Link></li>
              <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('footer.terms_of_service')}</Link></li>
              <li><Link to="/cookie-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('footer.cookie_policy')}</Link></li>
            </ul>
          </div>
        </div>

        <Separator className="my-12 opacity-50" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm text-muted-foreground">
            <p>
              © {currentYear} SyncRivo<sup className="text-[10px]">®</sup>. {t('footer.all_rights_reserved')}
            </p>
            <div className="flex gap-6">
              <Link to="/dpa" className="hover:text-primary transition-colors">{t('footer.dpa')}</Link>
              <Link to="/sub-processors" className="hover:text-primary transition-colors">{t('footer.sub_processors')}</Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://linkedin.com/company/syncrivo" // Placeholder
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 rounded-full transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com/syncrivo" // Placeholder
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 rounded-full transition-all"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/syncrivo" // Placeholder
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-foreground/10 rounded-full transition-all"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      <EnterpriseDemoModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
    </footer >
  );
}
