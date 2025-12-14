import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { useTranslationWithFallback } from '@/hooks/useTranslationWithFallback';

export function SecurityTeaserSection() {
    const { t } = useTranslationWithFallback();

    return (
        <section className="py-16 bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-2">
                            {t('security.teaser_title', 'Security-first by design')}
                        </h2>
                        <p className="text-slate-300 max-w-md">
                            {t('security.teaser_desc', 'We adhere to the strictest enterprise security standards, ensuring your data is always protected.')}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
                    <Link to="/security" className="hover:text-emerald-400 transition-colors">
                        {t('security.link_security', 'Security Overview')}
                    </Link>
                    <Link to="/privacy-policy" className="hover:text-emerald-400 transition-colors">
                        {t('security.link_privacy', 'Privacy Policy')}
                    </Link>
                    <Link to="/terms" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                        {t('security.link_terms', 'Terms of Service')}
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
