import { SolutionPageLayout } from '@/components/solutions/SolutionPageLayout';
import { SolutionHero } from '@/components/solutions/SolutionHero';
import { ProblemSolutionSection } from '@/components/solutions/ProblemSolutionSection';
import { AdvantageStrip } from '@/components/solutions/AdvantageStrip';
import { ArchitectureDiagram } from '@/components/solutions/ArchitectureDiagram';
import { UseCasesSection } from '@/components/solutions/UseCasesSection';
import { SolutionCTA } from '@/components/solutions/SolutionCTA';
import { useTranslation } from 'react-i18next';
import { Rocket, Layers, Zap } from 'lucide-react';
import heroImage from '@/assets/sol-ma-v2.png';

export default function DigitalTransformation() {
  const { t } = useTranslation();

  const problemBlocks = [
    {
      header: t('solutions.digital.problem1.header', 'Digital Transformation Bottleneck'),
      problem: t('solutions.digital.problem1.problem', 'Digital transformation initiatives stall at communication layer. Legacy messaging silos prevent modern workflows, AI integration, and automation adoption.'),
      solution: t('solutions.digital.problem1.solution', 'Syncrivo provides the modern messaging layer that enables digital transformation. AI-ready, automation-friendly, and future-proof by design.'),
      icon: <Rocket className="h-6 w-6 text-primary" />,
    },
    {
      header: t('solutions.digital.problem2.header', 'Modern Stack Integration'),
      problem: t('solutions.digital.problem2.problem', 'Best-of-breed SaaS tools require modern messaging APIs. Legacy platform limitations block integration with new productivity and automation tools.'),
      solution: t('solutions.digital.problem2.solution', 'Unified API layer connects modern tools to any messaging platform. Integrate once, deploy everywhere—Teams, Slack, Google Chat.'),
      icon: <Layers className="h-6 w-6 text-primary" />,
    },
    {
      header: t('solutions.digital.problem3.header', 'AI & Automation Readiness'),
      problem: t('solutions.digital.problem3.problem', 'AI assistants and automation workflows need cross-platform presence. Building for each platform separately is expensive and unmaintainable.'),
      solution: t('solutions.digital.problem3.solution', 'Deploy AI assistants and automations once, reach users on any platform. Future-proof your AI investments against platform changes.'),
      icon: <Zap className="h-6 w-6 text-primary" />,
    },
  ];

  const useCases = [
    {
      title: t('solutions.digital.usecase1.title', 'AI Assistant Deployment'),
      description: t('solutions.digital.usecase1.description', 'Deploy corporate AI assistants once, available to all employees regardless of their messaging platform.'),
      metric: '100%',
      metricLabel: t('solutions.digital.usecase1.metric', 'employee reach'),
    },
    {
      title: t('solutions.digital.usecase2.title', 'Process Automation'),
      description: t('solutions.digital.usecase2.description', 'Automated workflows trigger from and respond to any messaging platform. No platform-specific development required.'),
      metric: '70%',
      metricLabel: t('solutions.digital.usecase2.metric', 'development time saved'),
    },
    {
      title: t('solutions.digital.usecase3.title', 'Modern Intranet'),
      description: t('solutions.digital.usecase3.description', 'Replace legacy intranet with messaging-first employee experience that works across all platforms.'),
      metric: '5x',
      metricLabel: t('solutions.digital.usecase3.metric', 'employee engagement'),
    },
    {
      title: t('solutions.digital.usecase4.title', 'Unified Notifications'),
      description: t('solutions.digital.usecase4.description', 'Enterprise notifications from HR, IT, and leadership reach everyone on their preferred platform.'),
      metric: '95%',
      metricLabel: t('solutions.digital.usecase4.metric', 'read rate'),
    },
    {
      title: t('solutions.digital.usecase5.title', 'Knowledge Management'),
      description: t('solutions.digital.usecase5.description', 'AI-powered knowledge retrieval accessible from any messaging platform. Find information without switching tools.'),
      metric: '60%',
      metricLabel: t('solutions.digital.usecase5.metric', 'search time reduced'),
    },
  ];

  return (
    <SolutionPageLayout>
      <SolutionHero
        badge={t('solutions.digital.badge', 'Digital Transformation')}
        headline={t('solutions.digital.headline', 'Enterprise Digital Transformation Messaging Layer')}
        subheadline={t('solutions.digital.subheadline', 'Enable your digital transformation with a modern, AI-ready messaging infrastructure. Deploy automations, AI assistants, and modern workflows across all platforms.')}
        heroImage={heroImage}
      />

      <ProblemSolutionSection
        title={t('solutions.digital.problems.title', 'Transformation Challenges')}
        subtitle={t('solutions.digital.problems.subtitle', 'Legacy messaging infrastructure blocks modern enterprise evolution')}
        blocks={problemBlocks}
      />

      <AdvantageStrip />

      <ArchitectureDiagram />

      <UseCasesSection
        title={t('solutions.digital.usecases.title', 'Transformation Success')}
        subtitle={t('solutions.digital.usecases.subtitle', 'How enterprises modernize their communication layer')}
        useCases={useCases}
      />

      <SolutionCTA />
    </SolutionPageLayout>
  );
}
