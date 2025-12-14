import { Link } from 'react-router-dom';
import { useTranslationWithFallback } from '@/hooks/useTranslationWithFallback';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Globe2, GitPullRequest, HeadphonesIcon, ArrowRight } from 'lucide-react';

export function UseCasesSection() {
    const { t } = useTranslationWithFallback();

    const cases = [
        {
            icon: AlertTriangle,
            title: t('use_cases.incident_title', 'Incident & Alerts'),
            link: '/solutions/incident-response',
            bullets: [
                t('use_cases.incident_b1', 'Route P1/P2 alerts into the right channel automatically'),
                t('use_cases.incident_b2', 'Reduce MTTA by keeping responders in their primary tool')
            ]
        },
        {
            icon: Globe2,
            title: t('use_cases.collab_title', 'Cross-Company Collaboration'),
            link: '/solutions/external-partners',
            bullets: [
                t('use_cases.collab_b1', 'Bridge communication when partners use different platforms'),
                t('use_cases.collab_b2', 'Keep context without forwarding chaos')
            ]
        },
        {
            icon: GitPullRequest,
            title: t('use_cases.ops_title', 'IT & Operations Automation'),
            link: '/solutions/digital-transformation',
            bullets: [
                t('use_cases.ops_b1', 'Automate approval notifications, outages, changes'),
                t('use_cases.ops_b2', 'Keep updates consistent across tools')
            ]
        },
        {
            icon: HeadphonesIcon,
            title: t('use_cases.support_title', 'Customer Support Escalations'),
            link: '/solutions/customer-support',
            bullets: [
                t('use_cases.support_b1', 'Escalate critical messages to the right team instantly'),
                t('use_cases.support_b2', 'Reduce missed handoffs')
            ]
        }
    ];

    return (
        <section className="py-20 bg-background text-foreground">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
                        {t('use_cases.title', 'Enterprise Communication Use Cases')}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t('use_cases.subtitle', 'Solve complex messaging workflows without changing your tech stack.')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cases.map((item, index) => (
                        <Link key={index} to={item.link} className="block group">
                            <Card className="h-full border border-border/60 group-hover:border-primary/50 transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:-translate-y-1">
                                <CardContent className="p-6">
                                    <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
                                        <item.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-4 flex items-center justify-between">
                                        {item.title}
                                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                                    </h3>
                                    <ul className="space-y-3">
                                        {item.bullets.map((bullet, i) => (
                                            <li key={i} className="flex items-start text-sm text-muted-foreground leading-relaxed">
                                                <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" aria-hidden="true" />
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
