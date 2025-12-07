import { SolutionPageLayout } from '@/components/solutions/SolutionPageLayout';
import { SolutionHero } from '@/components/solutions/SolutionHero';
import { ProblemSolutionSection } from '@/components/solutions/ProblemSolutionSection';
import { AdvantageStrip } from '@/components/solutions/AdvantageStrip';
import { ArchitectureDiagram } from '@/components/solutions/ArchitectureDiagram';
import { UseCasesSection } from '@/components/solutions/UseCasesSection';
import { SolutionCTA } from '@/components/solutions/SolutionCTA';
import { useTranslation } from 'react-i18next';
import { Layers, RefreshCw, GitBranch } from 'lucide-react';

export default function MultiPlatformCoexistence() {
  const { t } = useTranslation();
  
  const problemBlocks = [
    {
      header: t('solutions.multiplatform.problem1.header', 'Organic Multi-Platform Growth'),
      problem: t('solutions.multiplatform.problem1.problem', 'Different departments, regions, or acquired companies use different platforms. Forcing standardization is politically impossible and operationally disruptive.'),
      solution: t('solutions.multiplatform.problem1.solution', 'Syncrivo enables peaceful coexistence. Teams, Slack, and Google Chat work together seamlessly—each team keeps their preferred tool.'),
      icon: <Layers className="h-6 w-6 text-primary" />,
    },
    {
      header: t('solutions.multiplatform.problem2.header', 'Cross-Platform Collaboration'),
      problem: t('solutions.multiplatform.problem2.problem', 'Projects requiring collaboration across platform boundaries fail. Manual forwarding, missed messages, and broken threads kill productivity.'),
      solution: t('solutions.multiplatform.problem2.solution', 'Bi-directional message sync creates virtual unified channels. Thread context, reactions, and file shares flow naturally across platforms.'),
      icon: <RefreshCw className="h-6 w-6 text-primary" />,
    },
    {
      header: t('solutions.multiplatform.problem3.header', 'Gradual Migration Strategy'),
      problem: t('solutions.multiplatform.problem3.problem', 'Big-bang platform migrations fail. Users resist, productivity drops, and shadow IT emerges. You need a gradual, low-risk approach.'),
      solution: t('solutions.multiplatform.problem3.solution', 'Use Syncrivo as a migration bridge. Teams can switch platforms at their own pace while maintaining full collaboration with teams that haven\'t migrated.'),
      icon: <GitBranch className="h-6 w-6 text-primary" />,
    },
  ];

  const useCases = [
    {
      title: t('solutions.multiplatform.usecase1.title', 'Engineering Uses Slack, Everyone Else Uses Teams'),
      description: t('solutions.multiplatform.usecase1.description', 'Let engineering keep Slack productivity while syncing with sales, marketing, and leadership on Teams.'),
      metric: '100%',
      metricLabel: t('solutions.multiplatform.usecase1.metric', 'cross-team visibility'),
    },
    {
      title: t('solutions.multiplatform.usecase2.title', 'Regional Platform Differences'),
      description: t('solutions.multiplatform.usecase2.description', 'APAC on Google Chat, EMEA on Teams, Americas on Slack—all collaborating as one global organization.'),
      metric: '24/7',
      metricLabel: t('solutions.multiplatform.usecase2.metric', 'global sync'),
    },
    {
      title: t('solutions.multiplatform.usecase3.title', 'Phased Platform Consolidation'),
      description: t('solutions.multiplatform.usecase3.description', 'Migrate department by department over 2 years while maintaining collaboration throughout the transition.'),
      metric: '0',
      metricLabel: t('solutions.multiplatform.usecase3.metric', 'productivity disruption'),
    },
    {
      title: t('solutions.multiplatform.usecase4.title', 'Best-of-Breed Tool Selection'),
      description: t('solutions.multiplatform.usecase4.description', 'Choose the right platform for each use case without sacrificing unified communication.'),
      metric: '3x',
      metricLabel: t('solutions.multiplatform.usecase4.metric', 'platform flexibility'),
    },
  ];

  return (
    <SolutionPageLayout>
      <SolutionHero
        badge={t('solutions.multiplatform.badge', 'Hybrid Messaging')}
        headline={t('solutions.multiplatform.headline', 'Multi-Platform Coexistence Without Compromise')}
        subheadline={t('solutions.multiplatform.subheadline', 'Stop forcing platform standardization. Enable seamless collaboration across Teams, Slack, and Google Chat while respecting team preferences and existing workflows.')}
      />
      
      <ProblemSolutionSection
        title={t('solutions.multiplatform.problems.title', 'Platform Diversity Challenges')}
        subtitle={t('solutions.multiplatform.problems.subtitle', 'Real enterprises run multiple platforms—make them work together')}
        blocks={problemBlocks}
      />
      
      <AdvantageStrip />
      
      <ArchitectureDiagram />
      
      <UseCasesSection
        title={t('solutions.multiplatform.usecases.title', 'Hybrid Success Stories')}
        subtitle={t('solutions.multiplatform.usecases.subtitle', 'How organizations embrace multi-platform reality')}
        useCases={useCases}
      />
      
      <SolutionCTA />
    </SolutionPageLayout>
  );
}
