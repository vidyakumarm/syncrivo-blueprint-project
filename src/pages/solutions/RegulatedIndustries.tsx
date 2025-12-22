import { SolutionPageLayout } from '@/components/solutions/SolutionPageLayout';
import { SolutionHero } from '@/components/solutions/SolutionHero';
import { ProblemSolutionSection } from '@/components/solutions/ProblemSolutionSection';
import { AdvantageStrip } from '@/components/solutions/AdvantageStrip';
import { ArchitectureDiagram } from '@/components/solutions/ArchitectureDiagram';
import { UseCasesSection } from '@/components/solutions/UseCasesSection';
import { SolutionCTA } from '@/components/solutions/SolutionCTA';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, FileSearch, Building } from 'lucide-react';
import heroImage from '@/assets/sol-ma-v2.png';

export default function RegulatedIndustries() {
  const { t } = useTranslation();

  const problemBlocks = [
    {
      header: t('solutions.regulated.problem1.header', 'Regulatory Compliance Requirements'),
      problem: t('solutions.regulated.problem1.problem', 'Financial services, healthcare, and government face strict communication archiving, retention, and audit requirements. Multi-platform environments create compliance gaps.'),
      solution: t('solutions.regulated.problem1.solution', 'Syncrivo provides unified compliance layer across all platforms. Complete message capture, configurable retention, and audit-ready exports for all regulators.'),
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    },
    {
      header: t('solutions.regulated.problem2.header', 'eDiscovery & Legal Hold'),
      problem: t('solutions.regulated.problem2.problem', 'Legal proceedings require complete communication records. Messages scattered across platforms create discovery challenges and legal risk.'),
      solution: t('solutions.regulated.problem2.solution', 'Single eDiscovery interface across all messaging platforms. Legal hold, search, and export capabilities meet the most demanding litigation requirements.'),
      icon: <FileSearch className="h-6 w-6 text-primary" />,
    },
    {
      header: t('solutions.regulated.problem3.header', 'Industry-Specific Requirements'),
      problem: t('solutions.regulated.problem3.problem', 'HIPAA for healthcare, FINRA for financial services, FedRAMP for government—each has specific requirements that generic solutions don\'t address.'),
      solution: t('solutions.regulated.problem3.solution', 'Pre-built compliance configurations for banking, insurance, pharma, and government. Deploy with confidence that regulatory requirements are met.'),
      icon: <Building className="h-6 w-6 text-primary" />,
    },
  ];

  const useCases = [
    {
      title: t('solutions.regulated.usecase1.title', 'Banking & Financial Services'),
      description: t('solutions.regulated.usecase1.description', 'FINRA-compliant communication archiving across trading desks, advisors, and back office—regardless of platform.'),
      metric: '100%',
      metricLabel: t('solutions.regulated.usecase1.metric', 'FINRA compliance'),
    },
    {
      title: t('solutions.regulated.usecase2.title', 'Healthcare & Life Sciences'),
      description: t('solutions.regulated.usecase2.description', 'HIPAA-compliant messaging between clinical staff, administrators, and external partners with complete PHI protection.'),
      metric: 'HIPAA',
      metricLabel: t('solutions.regulated.usecase2.metric', 'certified'),
    },
    {
      title: t('solutions.regulated.usecase3.title', 'Insurance & Claims'),
      description: t('solutions.regulated.usecase3.description', 'Compliant communication channels for adjusters, underwriters, and policyholders across platform boundaries.'),
      metric: '7 years',
      metricLabel: t('solutions.regulated.usecase3.metric', 'retention'),
    },
    {
      title: t('solutions.regulated.usecase4.title', 'Government & Public Sector'),
      description: t('solutions.regulated.usecase4.description', 'FedRAMP-ready deployment for federal agencies. FOIA-compliant archiving and inter-agency collaboration.'),
      metric: 'FedRAMP',
      metricLabel: t('solutions.regulated.usecase4.metric', 'ready'),
    },
    {
      title: t('solutions.regulated.usecase5.title', 'Pharmaceutical & Clinical Trials'),
      description: t('solutions.regulated.usecase5.description', 'FDA 21 CFR Part 11 compliant communication for clinical trial coordination and regulatory submissions.'),
      metric: 'FDA',
      metricLabel: t('solutions.regulated.usecase5.metric', 'compliant'),
    },
  ];

  return (
    <SolutionPageLayout>
      <SolutionHero
        badge={t('solutions.regulated.badge', 'Regulated Industries')}
        headline={t('solutions.regulated.headline', 'Enterprise Messaging for Regulated Industries')}
        subheadline={t('solutions.regulated.subheadline', 'Banking, Insurance, Pharma, Government—meet the most stringent compliance requirements while enabling modern multi-platform collaboration.')}
        heroImage={heroImage}
      />

      <ProblemSolutionSection
        title={t('solutions.regulated.problems.title', 'Compliance Challenges')}
        subtitle={t('solutions.regulated.problems.subtitle', 'Regulated industries face unique communication requirements')}
        blocks={problemBlocks}
      />

      <AdvantageStrip />

      <ArchitectureDiagram />

      <UseCasesSection
        title={t('solutions.regulated.usecases.title', 'Industry Compliance')}
        subtitle={t('solutions.regulated.usecases.subtitle', 'How regulated organizations maintain compliance across platforms')}
        useCases={useCases}
      />

      <SolutionCTA />
    </SolutionPageLayout>
  );
}
