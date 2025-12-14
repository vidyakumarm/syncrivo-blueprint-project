import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslationWithFallback } from '@/hooks/useTranslationWithFallback';
import { EnterpriseDemoModal } from './EnterpriseDemoModal';

export function FinalCTASection() {
    const { t } = useTranslationWithFallback();
    const [demoModalOpen, setDemoModalOpen] = useState(false);

    return (
        <section className="py-24 bg-background text-center">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-4xl sm:text-5xl font-bold mb-10 tracking-tight text-foreground">
                    {t('final_cta.title', 'Ready to unify your communication stack?')}
                </h2>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setDemoModalOpen(true)}
                        className="w-full sm:w-auto px-8 py-6 text-base font-semibold border-2"
                    >
                        {t('final_cta.book_demo', 'Book a Demo')}
                    </Button>

                    <Button
                        asChild
                        size="lg"
                        className="w-full sm:w-auto px-8 py-6 text-base font-semibold"
                    >
                        <Link to="/contact-sales">
                            {t('final_cta.talk_sales', 'Talk to Sales')}
                        </Link>
                    </Button>
                </div>
            </div>

            <EnterpriseDemoModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
        </section>
    );
}
