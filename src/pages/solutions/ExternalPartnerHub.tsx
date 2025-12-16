import { SolutionPageLayout } from '@/components/solutions/SolutionPageLayout';
import { SolutionHero } from '@/components/solutions/SolutionHero';
import { ProblemSolutionSection } from '@/components/solutions/ProblemSolutionSection';
import { AdvantageStrip } from '@/components/solutions/AdvantageStrip';
import { ArchitectureDiagram } from '@/components/solutions/ArchitectureDiagram';
import { UseCasesSection } from '@/components/solutions/UseCasesSection';
import { SolutionCTA } from '@/components/solutions/SolutionCTA';
import { useTranslation } from 'react-i18next';
import { Users, Lock, Globe } from 'lucide-react';
import heroImage from '@/assets/sol-partner-v2.png';

export default function ExternalPartnerHub() {
  const { t } = useTranslation();

  const problemBlocks = [
    {
      header: t('solutions.partner.problem1.header', 'Guest Account Sprawl'),
      problem: t('solutions.partner.problem1.problem', 'External partners need access but guest accounts in your corporate platform create security risks, licensing costs, and administrative overhead.'),
      solution: t('solutions.partner.problem1.solution', 'Partners stay on their own platforms. Syncrivo creates secure communication channels without granting internal system access.'),
      icon: <Users className="h-6 w-6 text-primary" />,
    },
    {
      header: t('solutions.partner.problem2.header', 'Data Leakage Risk'),
      problem: t('solutions.partner.problem2.problem', 'Guest users with access to corporate Teams/Slack can see more than intended. Accidental data exposure and access creep are constant risks.'),
      solution: t('solutions.partner.problem2.solution', 'Zero internal platform access. Messages route through Syncrivo\'s policy engine with DLP, content filtering, and strict access controls.'),
      icon: <Lock className="h-6 w-6 text-primary" />,
    },
    {
      header: t('solutions.partner.problem3.header', 'Multi-Partner Complexity'),
      problem: t('solutions.partner.problem3.problem', 'Different partners use different platforms. Managing dozens of external connections across Teams, Slack, and Google Chat becomes unmanageable.'),
      solution: t('solutions.partner.problem3.solution', 'Single partner hub connects to any external platform. Unified management, consistent policies, complete audit trail across all partner relationships.'),
      icon: <Globe className="h-6 w-6 text-primary" />,
    },
  ];

  const useCases = [
    {
      title: t('solutions.partner.usecase1.title', 'Agency & Contractor Communication'),
      description: t('solutions.partner.usecase1.description', 'Connect with external agencies and contractors without granting internal platform access. Project channels sync across organizational boundaries.'),
      metric: '100%',
      metricLabel: t('solutions.partner.usecase1.metric', 'access isolation'),
    },
    {
      title: t('solutions.partner.usecase2.title', 'Supplier Collaboration'),
      description: t('solutions.partner.usecase2.description', 'Real-time communication with supply chain partners for procurement, logistics, and quality issues—regardless of their platform.'),
      metric: '60%',
      metricLabel: t('solutions.partner.usecase2.metric', 'faster response'),
    },
    {
      title: t('solutions.partner.usecase3.title', 'Client Project Channels'),
      description: t('solutions.partner.usecase3.description', 'Professional services firms connect client teams directly to project channels without exposing internal communications.'),
      metric: '5x',
      metricLabel: t('solutions.partner.usecase3.metric', 'client engagement'),
    },
    {
      title: t('solutions.partner.usecase4.title', 'Channel Partner Network'),
      description: t('solutions.partner.usecase4.description', 'Connect with resellers, distributors, and channel partners for deal collaboration and support escalation.'),
      metric: '90%',
      metricLabel: t('solutions.partner.usecase4.metric', 'partner satisfaction'),
    },
  ];

  return (
    <SolutionPageLayout>
      <SolutionHero
        badge={t('solutions.partner.badge', 'Partner Messaging Hub')}
        headline={t('solutions.partner.headline', 'Secure External Partner Communication Hub')}
        subheadline={t('solutions.partner.subheadline', 'Connect with partners, vendors, and clients across platform boundaries. Enable seamless collaboration without exposing internal systems or creating guest account sprawl.')}
        heroImage={heroImage}
      />

      <ProblemSolutionSection
        title={t('solutions.partner.problems.title', 'External Collaboration Challenges')}
        subtitle={t('solutions.partner.problems.subtitle', 'Secure partner communication without compromising internal systems')}
        blocks={problemBlocks}
      />

      <AdvantageStrip />

      <ArchitectureDiagram />

      <UseCasesSection
        title={t('solutions.partner.usecases.title', 'Partner Ecosystem Success')}
        subtitle={t('solutions.partner.usecases.subtitle', 'How enterprises manage external communication securely')}
        useCases={useCases}
      />

      <SolutionCTA />
    </SolutionPageLayout>
  );
}
