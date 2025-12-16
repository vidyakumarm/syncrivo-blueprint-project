import { SolutionPageLayout } from '@/components/solutions/SolutionPageLayout';
import { SolutionHero } from '@/components/solutions/SolutionHero';
import { ProblemSolutionSection } from '@/components/solutions/ProblemSolutionSection';
import { AdvantageStrip } from '@/components/solutions/AdvantageStrip';
import { ArchitectureDiagram } from '@/components/solutions/ArchitectureDiagram';
import { UseCasesSection } from '@/components/solutions/UseCasesSection';
import { SolutionCTA } from '@/components/solutions/SolutionCTA';
import { useTranslation } from 'react-i18next';
import { Globe, Building2, Layers } from 'lucide-react';
import heroImage from '@/assets/sol-partner-v2.png';

export default function GlobalSubsidiaries() {
  const { t } = useTranslation();

  const problemBlocks = [
    {
      header: t('solutions.global.problem1.header', 'Subsidiary Platform Autonomy'),
      problem: t('solutions.global.problem1.problem', 'Global subsidiaries and acquired brands maintain their own IT infrastructure and platform choices. Forcing consolidation is politically and operationally impractical.'),
      solution: t('solutions.global.problem1.solution', 'Syncrivo respects subsidiary autonomy. Each entity keeps their platform while messages flow seamlessly to corporate headquarters and peer subsidiaries.'),
      icon: <Building2 className="h-6 w-6 text-primary" />,
    },
    {
      header: t('solutions.global.problem2.header', 'Multi-Brand Communication'),
      problem: t('solutions.global.problem2.problem', 'Holding companies with multiple brands need coordination without brand bleed. Shared channels risk exposing competitive information between brands.'),
      solution: t('solutions.global.problem2.solution', 'Brand-isolated channels with controlled cross-brand collaboration. Corporate visibility without compromising brand independence.'),
      icon: <Layers className="h-6 w-6 text-primary" />,
    },
    {
      header: t('solutions.global.problem3.header', 'Global Time Zone Coordination'),
      problem: t('solutions.global.problem3.problem', 'Follow-the-sun operations require seamless handoffs across regional teams. Platform differences add friction to already challenging time zone coordination.'),
      solution: t('solutions.global.problem3.solution', 'Global channels that work across regions and platforms. Handoff messages, status updates, and escalations flow naturally regardless of regional tool choices.'),
      icon: <Globe className="h-6 w-6 text-primary" />,
    },
  ];

  const useCases = [
    {
      title: t('solutions.global.usecase1.title', 'Holding Company Coordination'),
      description: t('solutions.global.usecase1.description', 'Connect C-suite across portfolio companies for strategic initiatives while maintaining operational independence.'),
      metric: '100%',
      metricLabel: t('solutions.global.usecase1.metric', 'executive visibility'),
    },
    {
      title: t('solutions.global.usecase2.title', 'Regional Shared Services'),
      description: t('solutions.global.usecase2.description', 'HR, Finance, and IT shared services serve multiple subsidiaries across different platforms from a single team.'),
      metric: '35%',
      metricLabel: t('solutions.global.usecase2.metric', 'cost reduction'),
    },
    {
      title: t('solutions.global.usecase3.title', 'Global Product Development'),
      description: t('solutions.global.usecase3.description', 'R&D teams across continents and platforms collaborate on product development with full IP protection.'),
      metric: '24/7',
      metricLabel: t('solutions.global.usecase3.metric', 'development cycle'),
    },
    {
      title: t('solutions.global.usecase4.title', 'Multi-Brand Marketing'),
      description: t('solutions.global.usecase4.description', 'Coordinate campaigns across brand teams while maintaining brand isolation and competitive separation.'),
      metric: '50%',
      metricLabel: t('solutions.global.usecase4.metric', 'campaign coordination'),
    },
    {
      title: t('solutions.global.usecase5.title', 'Global Compliance & Legal'),
      description: t('solutions.global.usecase5.description', 'Coordinate compliance initiatives and legal matters across jurisdictions with appropriate data residency controls.'),
      metric: '100%',
      metricLabel: t('solutions.global.usecase5.metric', 'data residency'),
    },
  ];

  return (
    <SolutionPageLayout>
      <SolutionHero
        badge={t('solutions.global.badge', 'Global Organizations')}
        headline={t('solutions.global.headline', 'Global Subsidiary & Multi-Brand Messaging')}
        subheadline={t('solutions.global.subheadline', 'Connect headquarters with global subsidiaries and brand portfolios. Respect local platform autonomy while enabling seamless corporate coordination.')}
        heroImage={heroImage}
      />

      <ProblemSolutionSection
        title={t('solutions.global.problems.title', 'Global Coordination Challenges')}
        subtitle={t('solutions.global.problems.subtitle', 'Multi-entity organizations need flexibility with unified communication')}
        blocks={problemBlocks}
      />

      <AdvantageStrip />

      <ArchitectureDiagram />

      <UseCasesSection
        title={t('solutions.global.usecases.title', 'Global Success')}
        subtitle={t('solutions.global.usecases.subtitle', 'How global organizations maintain unity with autonomy')}
        useCases={useCases}
      />

      <SolutionCTA />
    </SolutionPageLayout>
  );
}
