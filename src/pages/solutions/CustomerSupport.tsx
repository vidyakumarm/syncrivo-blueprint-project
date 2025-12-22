import { SolutionPageLayout } from '@/components/solutions/SolutionPageLayout';
import { SolutionHero } from '@/components/solutions/SolutionHero';
import { ProblemSolutionSection } from '@/components/solutions/ProblemSolutionSection';
import { AdvantageStrip } from '@/components/solutions/AdvantageStrip';
import { ArchitectureDiagram } from '@/components/solutions/ArchitectureDiagram';
import { UseCasesSection } from '@/components/solutions/UseCasesSection';
import { SolutionCTA } from '@/components/solutions/SolutionCTA';
import { useTranslation } from 'react-i18next';
import { Headphones, Ticket, BarChart3 } from 'lucide-react';
import heroImage from '@/assets/sol-frontline-v2.png';

export default function CustomerSupport() {
  const { t } = useTranslation();

  const problemBlocks = [
    {
      header: t('solutions.support.problem1.header', 'Fragmented Support Channels'),
      problem: t('solutions.support.problem1.problem', 'Customers reach out via Teams, Slack Connect, or Google Chat. Support agents juggle multiple apps, losing context and creating inconsistent experiences.'),
      solution: t('solutions.support.problem1.solution', 'Unified inbox aggregates customer messages from all platforms. Agents respond from one interface while customers stay on their preferred app.'),
      icon: <Headphones className="h-6 w-6 text-primary" />,
    },
    {
      header: t('solutions.support.problem2.header', 'Ticket System Disconnect'),
      problem: t('solutions.support.problem2.problem', 'Messaging conversations don\'t sync with ticketing systems. Manual copy-paste, lost context, and duplicate tickets waste time and frustrate customers.'),
      solution: t('solutions.support.problem2.solution', 'Syncrivo integrates with Zendesk, ServiceNow, and Jira. Conversations become tickets, updates sync bi-directionally, and context is preserved.'),
      icon: <Ticket className="h-6 w-6 text-primary" />,
    },
    {
      header: t('solutions.support.problem3.header', 'Support Metrics Blind Spots'),
      problem: t('solutions.support.problem3.problem', 'No unified view of response times, resolution rates, or customer satisfaction across platform-specific channels. Reporting is incomplete.'),
      solution: t('solutions.support.problem3.solution', 'Centralized analytics across all messaging channels. Track SLAs, CSAT, and agent performance regardless of customer\'s platform choice.'),
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
    },
  ];

  const useCases = [
    {
      title: t('solutions.support.usecase1.title', 'B2B Customer Success'),
      description: t('solutions.support.usecase1.description', 'Enterprise customers message via their corporate platform. CSMs respond from unified queue without switching apps.'),
      metric: '45%',
      metricLabel: t('solutions.support.usecase1.metric', 'faster response'),
    },
    {
      title: t('solutions.support.usecase2.title', 'Technical Support Escalation'),
      description: t('solutions.support.usecase2.description', 'Support tickets escalate to engineering channels on any platform. Full conversation history travels with the ticket.'),
      metric: '60%',
      metricLabel: t('solutions.support.usecase2.metric', 'faster resolution'),
    },
    {
      title: t('solutions.support.usecase3.title', 'Partner Support Network'),
      description: t('solutions.support.usecase3.description', 'Channel partners and resellers get support through their preferred platforms while maintaining premium SLAs.'),
      metric: '95%',
      metricLabel: t('solutions.support.usecase3.metric', 'SLA compliance'),
    },
    {
      title: t('solutions.support.usecase4.title', 'Internal IT Help Desk'),
      description: t('solutions.support.usecase4.description', 'Employees submit IT requests from Teams, Slack, or Google Chat. Tickets created automatically in ServiceNow.'),
      metric: '70%',
      metricLabel: t('solutions.support.usecase4.metric', 'automation rate'),
    },
  ];

  return (
    <SolutionPageLayout>
      <SolutionHero
        badge={t('solutions.support.badge', 'Unified Support')}
        headline={t('solutions.support.headline', 'Unified Customer Support & Ticketing Integration')}
        subheadline={t('solutions.support.subheadline', 'Meet customers where they are. Aggregate support conversations from Teams, Slack, and Google Chat into unified workflows with full ticketing system integration.')}
        heroImage={heroImage}
      />

      <ProblemSolutionSection
        title={t('solutions.support.problems.title', 'Support Channel Challenges')}
        subtitle={t('solutions.support.problems.subtitle', 'Modern support requires multi-platform presence with unified operations')}
        blocks={problemBlocks}
      />

      <AdvantageStrip />

      <ArchitectureDiagram />

      <UseCasesSection
        title={t('solutions.support.usecases.title', 'Support Excellence')}
        subtitle={t('solutions.support.usecases.subtitle', 'How support teams deliver consistent experiences across platforms')}
        useCases={useCases}
      />

      <SolutionCTA />
    </SolutionPageLayout>
  );
}
