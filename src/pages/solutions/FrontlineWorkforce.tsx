import { SolutionPageLayout } from '@/components/solutions/SolutionPageLayout';
import { SolutionHero } from '@/components/solutions/SolutionHero';
import { ProblemSolutionSection } from '@/components/solutions/ProblemSolutionSection';
import { AdvantageStrip } from '@/components/solutions/AdvantageStrip';
import { ArchitectureDiagram } from '@/components/solutions/ArchitectureDiagram';
import { UseCasesSection } from '@/components/solutions/UseCasesSection';
import { SolutionCTA } from '@/components/solutions/SolutionCTA';
import { useTranslation } from 'react-i18next';
import { Users, MessageSquare, Shield } from 'lucide-react';
import heroImage from '@/assets/sol-frontline-v2.png';

export default function FrontlineWorkforce() {
  const { t } = useTranslation();

  const problemBlocks = [
    {
      header: t('solutions.frontline.problem1.header', 'Disconnected Deskless Workers'),
      problem: t('solutions.frontline.problem1.problem', 'Frontline employees using different apps than HQ creates silos. Critical updates get lost, shift changes miscommunicated, and safety alerts delayed.'),
      solution: t('solutions.frontline.problem1.solution', 'Syncrivo bridges HQ platforms (Teams/Slack) with frontline tools, ensuring real-time bi-directional sync across all worker segments.'),
      icon: <Users className="h-6 w-6 text-primary" />,
    },
    {
      header: t('solutions.frontline.problem2.header', 'Compliance & Audit Gaps'),
      problem: t('solutions.frontline.problem2.problem', 'Shadow IT messaging apps used by field workers create compliance blind spots. No audit trail, no DLP, no retention policies.'),
      solution: t('solutions.frontline.problem2.solution', 'All messages flow through Syncrivo\'s policy engine with full audit logging, DLP enforcement, and configurable retention—regardless of endpoint app.'),
      icon: <Shield className="h-6 w-6 text-primary" />,
    },
    {
      header: t('solutions.frontline.problem3.header', 'Inconsistent Communication'),
      problem: t('solutions.frontline.problem3.problem', 'Different regions use different platforms. Managers can\'t reach all teams efficiently. Critical announcements require multiple tools and manual forwarding.'),
      solution: t('solutions.frontline.problem3.solution', 'Single broadcast capability reaches all workers across Teams, Slack, and Google Chat simultaneously with delivery confirmation and read receipts.'),
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
    },
  ];

  const useCases = [
    {
      title: t('solutions.frontline.usecase1.title', 'Retail Store Communications'),
      description: t('solutions.frontline.usecase1.description', 'Connect store associates on consumer apps with corporate Teams for inventory alerts, promotional updates, and scheduling.'),
      metric: '94%',
      metricLabel: t('solutions.frontline.usecase1.metric', 'message delivery rate'),
    },
    {
      title: t('solutions.frontline.usecase2.title', 'Manufacturing Floor Updates'),
      description: t('solutions.frontline.usecase2.description', 'Real-time production updates, safety alerts, and shift handoffs synced between shop floor tablets and management dashboards.'),
      metric: '67%',
      metricLabel: t('solutions.frontline.usecase2.metric', 'faster incident response'),
    },
    {
      title: t('solutions.frontline.usecase3.title', 'Healthcare Shift Coordination'),
      description: t('solutions.frontline.usecase3.description', 'HIPAA-compliant messaging between clinical staff devices and administrative platforms with complete audit trails.'),
      metric: '100%',
      metricLabel: t('solutions.frontline.usecase3.metric', 'audit compliance'),
    },
    {
      title: t('solutions.frontline.usecase4.title', 'Logistics & Delivery'),
      description: t('solutions.frontline.usecase4.description', 'Connect drivers and warehouse staff across different apps with dispatch operations using any enterprise platform.'),
      metric: '3x',
      metricLabel: t('solutions.frontline.usecase4.metric', 'communication speed'),
    },
    {
      title: t('solutions.frontline.usecase5.title', 'Hospitality Guest Services'),
      description: t('solutions.frontline.usecase5.description', 'Bridge front desk, housekeeping, and management communications across properties and platforms.'),
      metric: '89%',
      metricLabel: t('solutions.frontline.usecase5.metric', 'guest satisfaction'),
    },
  ];

  return (
    <SolutionPageLayout>
      <SolutionHero
        badge={t('solutions.frontline.badge', 'Frontline Workforce')}
        headline={t('solutions.frontline.headline', 'Unite Your Entire Workforce on Any Platform')}
        subheadline={t('solutions.frontline.subheadline', 'Bridge the communication gap between HQ and frontline workers. Deliver critical updates, enable real-time collaboration, and maintain compliance—regardless of which app your teams use.')}
        heroImage={heroImage}
      />

      <ProblemSolutionSection
        title={t('solutions.frontline.problems.title', 'Frontline Communication Challenges')}
        subtitle={t('solutions.frontline.problems.subtitle', 'Modern enterprises face unique challenges connecting desk and deskless workers')}
        blocks={problemBlocks}
      />

      <AdvantageStrip />

      <ArchitectureDiagram />

      <UseCasesSection
        title={t('solutions.frontline.usecases.title', 'Real-World Impact')}
        subtitle={t('solutions.frontline.usecases.subtitle', 'See how enterprises connect their entire workforce with Syncrivo')}
        useCases={useCases}
      />

      <SolutionCTA />
    </SolutionPageLayout>
  );
}
