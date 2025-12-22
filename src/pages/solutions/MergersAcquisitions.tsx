import { SolutionPageLayout } from '@/components/solutions/SolutionPageLayout';
import { SolutionHero } from '@/components/solutions/SolutionHero';
import { ProblemSolutionSection } from '@/components/solutions/ProblemSolutionSection';
import { AdvantageStrip } from '@/components/solutions/AdvantageStrip';
import { ArchitectureDiagram } from '@/components/solutions/ArchitectureDiagram';
import { UseCasesSection } from '@/components/solutions/UseCasesSection';
import { SolutionCTA } from '@/components/solutions/SolutionCTA';
import { useTranslation } from 'react-i18next';
import { Building2, Clock, Zap } from 'lucide-react';
import heroImage from '@/assets/sol-ma-v2.png';

export default function MergersAcquisitions() {
  const { t } = useTranslation();

  const problemBlocks = [
    {
      header: t('solutions.ma.problem1.header', 'Day-1 Communication Chaos'),
      problem: t('solutions.ma.problem1.problem', 'M&A announcements require immediate cross-platform communication. Legacy integration takes months while employees from both organizations struggle to collaborate.'),
      solution: t('solutions.ma.problem1.solution', 'Syncrivo enables Day-1 messaging bridge between acquiring and acquired company platforms—Teams to Slack, Slack to Google Chat—in hours, not months.'),
      icon: <Clock className="h-6 w-6 text-primary" />,
    },
    {
      header: t('solutions.ma.problem2.header', 'Cultural & Platform Friction'),
      problem: t('solutions.ma.problem2.problem', 'Forcing employees onto new platforms during already stressful transitions creates resistance, productivity loss, and talent attrition.'),
      solution: t('solutions.ma.problem2.solution', 'Let both workforces continue using their preferred tools while messaging flows seamlessly between platforms. Migrate at your own pace.'),
      icon: <Building2 className="h-6 w-6 text-primary" />,
    },
    {
      header: t('solutions.ma.problem3.header', 'Integration Project Delays'),
      problem: t('solutions.ma.problem3.problem', 'IT teams are overwhelmed with integration projects. Unified communications is always deprioritized, leaving collaboration broken for 12-18 months.'),
      solution: t('solutions.ma.problem3.solution', 'Deploy Syncrivo in days with zero IT project overhead. No migration required, no end-user training needed, no disruption to existing workflows.'),
      icon: <Zap className="h-6 w-6 text-primary" />,
    },
  ];

  const useCases = [
    {
      title: t('solutions.ma.usecase1.title', 'Private Equity Portfolio Companies'),
      description: t('solutions.ma.usecase1.description', 'Connect multiple portfolio companies on different platforms for cross-company initiatives and shared services communication.'),
      metric: '0 days',
      metricLabel: t('solutions.ma.usecase1.metric', 'to collaboration'),
    },
    {
      title: t('solutions.ma.usecase2.title', 'Strategic Acquisitions'),
      description: t('solutions.ma.usecase2.description', 'Enable immediate collaboration between acquiring company and target while respecting existing tools and culture.'),
      metric: '85%',
      metricLabel: t('solutions.ma.usecase2.metric', 'faster integration'),
    },
    {
      title: t('solutions.ma.usecase3.title', 'Divestitures & Spin-offs'),
      description: t('solutions.ma.usecase3.description', 'Maintain communication during separation while cleanly segmenting access and data between entities.'),
      metric: '100%',
      metricLabel: t('solutions.ma.usecase3.metric', 'data isolation'),
    },
    {
      title: t('solutions.ma.usecase4.title', 'Joint Ventures'),
      description: t('solutions.ma.usecase4.description', 'Create secure communication channels between JV partners without exposing internal corporate platforms.'),
      metric: 'Zero',
      metricLabel: t('solutions.ma.usecase4.metric', 'platform migrations'),
    },
  ];

  return (
    <SolutionPageLayout>
      <SolutionHero
        badge={t('solutions.ma.badge', 'M&A Day-1 Bridge')}
        headline={t('solutions.ma.headline', 'Day-1 Ready Messaging for Mergers & Acquisitions')}
        subheadline={t('solutions.ma.subheadline', 'Enable instant cross-platform collaboration the moment the deal closes. No migration projects, no disruption, no waiting 18 months for unified communications.')}
        heroImage={heroImage}
      />

      <ProblemSolutionSection
        title={t('solutions.ma.problems.title', 'M&A Communication Challenges')}
        subtitle={t('solutions.ma.problems.subtitle', 'Traditional integration approaches fail the modern enterprise')}
        blocks={problemBlocks}
      />

      <AdvantageStrip />

      <ArchitectureDiagram />

      <UseCasesSection
        title={t('solutions.ma.usecases.title', 'Accelerate Integration')}
        subtitle={t('solutions.ma.usecases.subtitle', 'How leading organizations bridge communication during transactions')}
        useCases={useCases}
      />

      <SolutionCTA />
    </SolutionPageLayout>
  );
}
