import { Link } from 'react-router-dom';
import { Check, ShieldCheck, Zap, Globe } from 'lucide-react';
import { useTranslationWithFallback } from '@/hooks/useTranslationWithFallback';

export function ValuePropSection() {
    const { t } = useTranslationWithFallback();

    return (
        <section className="py-20 bg-background border-b border-border/40">
            <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 tracking-tight">
                        {t('value_prop.title', 'The Universal Messaging Layer for Enterprise')}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {t('value_prop.subtitle', 'Fragmented communication slows down global teams. SyncRivo unifies your stack without forcing migration.')}
                    </p>
                </div>

                <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
                    <p>
                        In today's distributed enterprise environment, teams often work in silos defined by their choice of communication tools.
                        Engineering uses <strong>Slack</strong> for rapid alerting, Sales relies on <strong>Microsoft Teams</strong> for corporate alignment,
                        and external partners communicate via <strong>Google Chat</strong>. This fragmentation creates data islands, missed notifications,
                        and security vulnerabilities during manual copy-pasting.
                    </p>

                    <p>
                        SyncRivo acts as the <strong className="text-foreground">secure message routing middleware</strong> that sits between these platforms.
                        By automating cross-platform collaboration, we ensure that a critical incident flagged in Slack instantly alerts the relevant stakeholders in Teams,
                        preserving context, attachments, and thread history.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 pt-8">
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                            <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-primary" />
                                Secure & Compliant
                            </h3>
                            <p className="text-base">
                                Enterprise-grade encryption (TLS 1.3) and SOC 2 Type II compliance ensure that your sensitive data remains protected during transit.
                            </p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                            <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                                <Globe className="w-5 h-5 text-primary" />
                                Global Reliability
                            </h3>
                            <p className="text-base">
                                Built on a distributed edge network with 99.99% SLA, ensuring low-latency message delivery for <Link to="/solutions/global-subsidiaries" className="text-primary hover:underline">global teams</Link> across regions.
                            </p>
                        </div>
                    </div>

                    <div className="pt-8 text-center">
                        <p className="text-sm font-medium mb-4 uppercase tracking-wide text-muted-foreground">Why Global Leaders Choose SyncRivo</p>
                        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                            {['No Data Retention', 'Granular Access Control', 'Bi-directional Sync', 'Native Experience'].map((feature, i) => (
                                <div key={i} className="flex items-center gap-2 text-foreground font-medium">
                                    <Check className="w-4 h-4 text-emerald-500" />
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
