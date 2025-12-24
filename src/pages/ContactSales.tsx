import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Footer } from '@/components/layout/Footer';
import { Navigation } from '@/components/layout/Navigation';
import { EnterpriseDemoModal } from '@/components/sections/EnterpriseDemoModal';
import { Calendar, UserCheck, ShieldCheck } from 'lucide-react';

export default function ContactSales() {
    const { t } = useTranslation();
    const [demoModalOpen, setDemoModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navigation />

            <main className="flex-grow pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Left Column: Hero/Info */}
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                                {t('contact_sales.title')}
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                {t('contact_sales.description')}
                            </p>

                            <div className="space-y-4 pt-4">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-primary/10 rounded-full">
                                        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-lg">{t('contact_sales.custom_enterprise_pricing')}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-primary/10 rounded-full">
                                        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-lg">{t('contact_sales.dedicated_success_manager')}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-primary/10 rounded-full">
                                        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-lg">{t('contact_sales.priority_support_patterns')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: CTA Card */}
                        <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/50">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-2xl">{t('contact_sales.schedule_live_demo')}</CardTitle>
                                <CardDescription className="text-base">
                                    {t('contact_sales.schedule_live_demo_desc')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Value Props in Card */}
                                <div className="grid gap-4">
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                                        <Calendar className="w-5 h-5 text-primary mt-0.5" />
                                        <div>
                                            <p className="font-medium text-sm">{t('contact_sales.flexible_scheduling')}</p>
                                            <p className="text-xs text-muted-foreground">{t('contact_sales.flexible_scheduling_desc')}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                                        <UserCheck className="w-5 h-5 text-primary mt-0.5" />
                                        <div>
                                            <p className="font-medium text-sm">{t('contact_sales.tailored_walkthrough')}</p>
                                            <p className="text-xs text-muted-foreground">{t('contact_sales.tailored_walkthrough_desc')}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                                        <ShieldCheck className="w-5 h-5 text-primary mt-0.5" />
                                        <div>
                                            <p className="font-medium text-sm">{t('contact_sales.security_deep_dive')}</p>
                                            <p className="text-xs text-muted-foreground">{t('contact_sales.security_deep_dive_desc')}</p>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    size="lg"
                                    className="w-full text-lg py-6 btn-shine shadow-lg hover:shadow-primary/20 transition-all"
                                    onClick={() => setDemoModalOpen(true)}
                                >
                                    {t('footer.book_demo')}
                                </Button>

                                <p className="text-xs text-center text-muted-foreground">
                                    No credit card required • SOC2 Type II Certified
                                </p>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </main>

            <EnterpriseDemoModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
            <Footer />
        </div>
    );
}
