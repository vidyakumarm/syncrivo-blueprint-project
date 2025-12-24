import { ArrowRight, Workflow, Settings, Activity, Zap, Shield } from 'lucide-react';
import { useTranslationWithFallback } from '@/hooks/useTranslationWithFallback';

export function HowItWorksSection() {
    const { t } = useTranslationWithFallback();

    const steps = [
        {
            icon: Workflow,
            title: t('how_it_works.step1_title', 'Connect your tools'),
            description: t('how_it_works.step1_desc', 'Slack, Teams, Google Workspace, Zoom, Webex'),
            color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
        },
        {
            icon: Settings,
            title: t('how_it_works.step2_title', 'Define routing rules'),
            description: t('how_it_works.step2_desc', 'Channel mapping, keywords, priorities, teams, time windows'),
            color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
        },
        {
            icon: Activity,
            title: t('how_it_works.step3_title', 'Monitor and improve'),
            description: t('how_it_works.step3_desc', 'Visibility, logs, retries, and workflow outcomes'),
            color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
        }
    ];

    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
                        {t('how_it_works.title', 'Intelligent Automation Workflow')}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t('how_it_works.subtitle', 'Configure advanced message routing logic using our visual or reliable JSON configuration. Support for boolean logic, time windows, and team-based escalation.')}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-[2.25rem] left-[16%] right-[16%] h-0.5 bg-slate-200 dark:bg-slate-800 -z-10" aria-hidden="true" />

                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">
                            <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 ring-4 ring-white dark:ring-slate-950`}>
                                <step.icon className="w-8 h-8" aria-hidden="true" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                            <p className="text-muted-foreground leading-relaxed max-w-xs">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
