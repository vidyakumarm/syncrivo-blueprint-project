import { SolutionPageLayout } from '@/components/solutions/SolutionPageLayout';
import { SolutionHero } from '@/components/solutions/SolutionHero';
import { ProblemSolutionSection } from '@/components/solutions/ProblemSolutionSection';
import { AdvantageStrip } from '@/components/solutions/AdvantageStrip';
import { ArchitectureDiagram } from '@/components/solutions/ArchitectureDiagram';
import { UseCasesSection } from '@/components/solutions/UseCasesSection';
import { SolutionCTA } from '@/components/solutions/SolutionCTA';
import { useTranslation } from 'react-i18next';
import { Building2, Network, Users } from 'lucide-react';
import heroImage from '@/assets/sol-multi-v2.png';

export default function InterDepartment() {
  const { t } = useTranslation();

  const problemBlocks = [
    {
      header: t('solutions.interdept.problem1.header', 'Department Platform Silos'),
      problem: t('solutions.interdept.problem1.problem', 'Engineering uses Slack, Sales uses Teams, HR uses Google Chat. Cross-functional projects require constant tool switching and manual message forwarding.'),
      solution: t('solutions.interdept.problem1.solution', 'Syncrivo creates cross-departmental channels where each team stays on their preferred platform while messages sync seamlessly.'),
      icon: <Building2 className="h-6 w-6 text-primary" />,
    },
    {
      header: t('solutions.interdept.problem2.header', 'Process Handoff Friction'),
      problem: t('solutions.interdept.problem2.problem', 'Business processes that span departments—sales to implementation, HR onboarding, finance approvals—break down at platform boundaries.'),
      solution: t('solutions.interdept.problem2.solution', 'Workflow channels follow the process across departments, preserving context and enabling smooth handoffs regardless of platform differences.'),
      icon: <Network className="h-6 w-6 text-primary" />,
    },
    {
      header: t('solutions.interdept.problem3.header', 'Executive Visibility'),
      problem: t('solutions.interdept.problem3.problem', 'Leadership needs visibility across all departments but can\'t monitor multiple platforms. Critical information gets lost in platform-specific channels.'),
      solution: t('solutions.interdept.problem3.solution', 'Aggregated views and cross-platform search give executives unified visibility without requiring every department to change tools.'),
      icon: <Users className="h-6 w-6 text-primary" />,
    },
  ];

  const useCases = [
    {
      title: t('solutions.interdept.usecase1.title', 'Sales to Customer Success Handoff'),
      description: t('solutions.interdept.usecase1.description', 'Deal closes in Sales Teams channel, seamlessly transitions to CS Slack channel with full context preserved.'),
      metric: '100%',
      metricLabel: t('solutions.interdept.usecase1.metric', 'context retained'),
    },
    {
      title: t('solutions.interdept.usecase2.title', 'HR Onboarding Workflows'),
      description: t('solutions.interdept.usecase2.description', 'New hire onboarding coordinates across HR, IT, Finance, and hiring manager—each on their preferred platform.'),
      metric: '50%',
      metricLabel: t('solutions.interdept.usecase2.metric', 'faster onboarding'),
    },
    {
      title: t('solutions.interdept.usecase3.title', 'Finance Approval Chains'),
      description: t('solutions.interdept.usecase3.description', 'Purchase requests, expense approvals, and budget discussions flow across department platforms without friction.'),
      metric: '3x',
      metricLabel: t('solutions.interdept.usecase3.metric', 'faster approvals'),
    },
    {
      title: t('solutions.interdept.usecase4.title', 'Product Launch Coordination'),
      description: t('solutions.interdept.usecase4.description', 'Engineering, Marketing, Sales, and Support coordinate product launches from their respective platforms.'),
      metric: '40%',
      metricLabel: t('solutions.interdept.usecase4.metric', 'coordination time saved'),
    },
    {
      title: t('solutions.interdept.usecase5.title', 'Legal & Compliance Reviews'),
      description: t('solutions.interdept.usecase5.description', 'Cross-functional compliance reviews with Legal, IT Security, and business stakeholders across platforms.'),
      metric: '60%',
      metricLabel: t('solutions.interdept.usecase5.metric', 'review cycle reduction'),
    },
  ];

  return (
    <SolutionPageLayout>
      <SolutionHero
        badge={t('solutions.interdept.badge', 'Inter-Department')}
        headline={t('solutions.interdept.headline', 'Break Down Department Silos')}
        subheadline={t('solutions.interdept.subheadline', 'HR, Finance, IT, Sales—each department can use their preferred platform while maintaining seamless cross-functional collaboration on projects that matter.')}
        heroImage={heroImage}
      />

      <ProblemSolutionSection
        title={t('solutions.interdept.problems.title', 'Cross-Department Challenges')}
        subtitle={t('solutions.interdept.problems.subtitle', 'Platform differences shouldn\'t create organizational silos')}
        blocks={problemBlocks}
      />

      <AdvantageStrip />

      <ArchitectureDiagram />

      <UseCasesSection
        title={t('solutions.interdept.usecases.title', 'Cross-Functional Success')}
        subtitle={t('solutions.interdept.usecases.subtitle', 'How departments collaborate without platform barriers')}
        useCases={useCases}
      />

      <SolutionCTA />
    </SolutionPageLayout>
  );
}
