import { SolutionPageLayout } from '@/components/solutions/SolutionPageLayout';
import { SolutionHero } from '@/components/solutions/SolutionHero';
import { ProblemSolutionSection } from '@/components/solutions/ProblemSolutionSection';
import { AdvantageStrip } from '@/components/solutions/AdvantageStrip';
import { ArchitectureDiagram } from '@/components/solutions/ArchitectureDiagram';
import { UseCasesSection } from '@/components/solutions/UseCasesSection';
import { SolutionCTA } from '@/components/solutions/SolutionCTA';
import { useTranslation } from 'react-i18next';
import { Unlock, DollarSign, Scale } from 'lucide-react';

export default function VendorFlexibility() {
  const { t } = useTranslation();
  
  const problemBlocks = [
    {
      header: t('solutions.vendor.problem1.header', 'Single-Vendor Lock-In Risk'),
      problem: t('solutions.vendor.problem1.problem', 'Committing 100% to Microsoft, Google, or Salesforce creates dangerous vendor dependency. Price increases, policy changes, and outages affect your entire organization.'),
      solution: t('solutions.vendor.problem1.solution', 'Syncrivo decouples your organization from any single vendor. Switch platforms gradually or maintain multi-vendor strategy indefinitely.'),
      icon: <Unlock className="h-6 w-6 text-primary" />,
    },
    {
      header: t('solutions.vendor.problem2.header', 'License Cost Optimization'),
      problem: t('solutions.vendor.problem2.problem', 'Not every user needs premium licenses. But siloed platforms force expensive enterprise seats for everyone just to maintain communication.'),
      solution: t('solutions.vendor.problem2.solution', 'Mix and match platforms based on actual needs. Power users on premium plans, casual users on free tiers—all connected through Syncrivo.'),
      icon: <DollarSign className="h-6 w-6 text-primary" />,
    },
    {
      header: t('solutions.vendor.problem3.header', 'Negotiation Leverage'),
      problem: t('solutions.vendor.problem3.problem', 'Without alternatives, you have no leverage in vendor negotiations. Annual increases, unfavorable terms, and rigid contracts become unavoidable.'),
      solution: t('solutions.vendor.problem3.solution', 'Credible multi-platform capability gives you real negotiating power. Vendors know you can shift workloads if terms aren\'t favorable.'),
      icon: <Scale className="h-6 w-6 text-primary" />,
    },
  ];

  const useCases = [
    {
      title: t('solutions.vendor.usecase1.title', 'Multi-Vendor Resilience'),
      description: t('solutions.vendor.usecase1.description', 'Maintain production workloads on multiple platforms. When one vendor has an outage, communication continues on others.'),
      metric: '99.99%',
      metricLabel: t('solutions.vendor.usecase1.metric', 'uptime'),
    },
    {
      title: t('solutions.vendor.usecase2.title', 'License Tier Optimization'),
      description: t('solutions.vendor.usecase2.description', 'Move casual users to free/basic tiers while keeping power users on premium—without breaking collaboration.'),
      metric: '40%',
      metricLabel: t('solutions.vendor.usecase2.metric', 'license savings'),
    },
    {
      title: t('solutions.vendor.usecase3.title', 'Strategic Platform Evaluation'),
      description: t('solutions.vendor.usecase3.description', 'Pilot new platforms with select teams while maintaining integration with existing infrastructure.'),
      metric: '90 days',
      metricLabel: t('solutions.vendor.usecase3.metric', 'risk-free trials'),
    },
    {
      title: t('solutions.vendor.usecase4.title', 'Contract Negotiation Leverage'),
      description: t('solutions.vendor.usecase4.description', 'Demonstrate real multi-vendor capability before renewal negotiations. Secure better terms and pricing.'),
      metric: '25%',
      metricLabel: t('solutions.vendor.usecase4.metric', 'better terms'),
    },
  ];

  return (
    <SolutionPageLayout>
      <SolutionHero
        badge={t('solutions.vendor.badge', 'Vendor Flexibility')}
        headline={t('solutions.vendor.headline', 'Escape Vendor Lock-In. Optimize License Costs.')}
        subheadline={t('solutions.vendor.subheadline', 'Reduce dependency on any single platform vendor. Mix and match Teams, Slack, and Google Chat to optimize costs, increase resilience, and maintain negotiating leverage.')}
      />
      
      <ProblemSolutionSection
        title={t('solutions.vendor.problems.title', 'Vendor Dependency Risks')}
        subtitle={t('solutions.vendor.problems.subtitle', 'Single-vendor strategies create business risks and cost inefficiencies')}
        blocks={problemBlocks}
      />
      
      <AdvantageStrip />
      
      <ArchitectureDiagram />
      
      <UseCasesSection
        title={t('solutions.vendor.usecases.title', 'Strategic Flexibility')}
        subtitle={t('solutions.vendor.usecases.subtitle', 'How enterprises maintain vendor optionality')}
        useCases={useCases}
      />
      
      <SolutionCTA />
    </SolutionPageLayout>
  );
}
