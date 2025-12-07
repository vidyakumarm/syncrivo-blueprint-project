import { SolutionPageLayout } from '@/components/solutions/SolutionPageLayout';
import { SolutionHero } from '@/components/solutions/SolutionHero';
import { ProblemSolutionSection } from '@/components/solutions/ProblemSolutionSection';
import { AdvantageStrip } from '@/components/solutions/AdvantageStrip';
import { ArchitectureDiagram } from '@/components/solutions/ArchitectureDiagram';
import { UseCasesSection } from '@/components/solutions/UseCasesSection';
import { SolutionCTA } from '@/components/solutions/SolutionCTA';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, Users, Clock } from 'lucide-react';

export default function IncidentResponse() {
  const { t } = useTranslation();
  
  const problemBlocks = [
    {
      header: t('solutions.incident.problem1.header', 'Cross-Team Incident Communication'),
      problem: t('solutions.incident.problem1.problem', 'Major incidents require instant coordination between SRE, DevOps, Security, and Leadership—often on different platforms. Critical minutes are lost to platform barriers.'),
      solution: t('solutions.incident.problem1.solution', 'Syncrivo creates instant war room channels that span all platforms. One incident, one conversation, visible to everyone who needs to know.'),
      icon: <AlertTriangle className="h-6 w-6 text-primary" />,
    },
    {
      header: t('solutions.incident.problem2.header', 'Vendor & Partner Coordination'),
      problem: t('solutions.incident.problem2.problem', 'Incidents often involve external vendors, cloud providers, or security partners. Adding them to internal channels is slow and creates security risks.'),
      solution: t('solutions.incident.problem2.solution', 'Bring external parties into incident channels on their own platforms. Controlled access, full audit trail, automatic cleanup post-incident.'),
      icon: <Users className="h-6 w-6 text-primary" />,
    },
    {
      header: t('solutions.incident.problem3.header', 'Post-Incident Documentation'),
      problem: t('solutions.incident.problem3.problem', 'After resolution, reconstructing the incident timeline from multiple platforms for post-mortems is time-consuming and often incomplete.'),
      solution: t('solutions.incident.problem3.solution', 'Complete incident timeline across all platforms, automatically captured. Export to incident management systems for thorough post-mortems.'),
      icon: <Clock className="h-6 w-6 text-primary" />,
    },
  ];

  const useCases = [
    {
      title: t('solutions.incident.usecase1.title', 'Production Incident War Rooms'),
      description: t('solutions.incident.usecase1.description', 'SRE on Slack, Security on Teams, Leadership on Google Chat—all coordinating in real-time on the same incident.'),
      metric: '73%',
      metricLabel: t('solutions.incident.usecase1.metric', 'faster MTTR'),
    },
    {
      title: t('solutions.incident.usecase2.title', 'Security Incident Response'),
      description: t('solutions.incident.usecase2.description', 'Coordinate with external security vendors and law enforcement without exposing internal communication platforms.'),
      metric: '100%',
      metricLabel: t('solutions.incident.usecase2.metric', 'audit compliance'),
    },
    {
      title: t('solutions.incident.usecase3.title', 'Customer Impact Communication'),
      description: t('solutions.incident.usecase3.description', 'Keep affected enterprise customers informed during incidents on their preferred platform with real-time updates.'),
      metric: '90%',
      metricLabel: t('solutions.incident.usecase3.metric', 'customer satisfaction'),
    },
    {
      title: t('solutions.incident.usecase4.title', 'On-Call Escalation'),
      description: t('solutions.incident.usecase4.description', 'PagerDuty alerts route to the right people on the right platform. No one misses critical notifications regardless of their primary tool.'),
      metric: '99.9%',
      metricLabel: t('solutions.incident.usecase4.metric', 'alert delivery'),
    },
    {
      title: t('solutions.incident.usecase5.title', 'Change Management'),
      description: t('solutions.incident.usecase5.description', 'Coordinate maintenance windows and deployments across distributed teams using their preferred communication tools.'),
      metric: '50%',
      metricLabel: t('solutions.incident.usecase5.metric', 'fewer incidents'),
    },
  ];

  return (
    <SolutionPageLayout>
      <SolutionHero
        badge={t('solutions.incident.badge', 'Incident Response')}
        headline={t('solutions.incident.headline', 'Incident Response & War Room Synchronization')}
        subheadline={t('solutions.incident.subheadline', 'When every minute counts, platform barriers shouldn\'t slow you down. Unite SRE, DevOps, Security, and Leadership in real-time incident channels across all platforms.')}
      />
      
      <ProblemSolutionSection
        title={t('solutions.incident.problems.title', 'Incident Communication Challenges')}
        subtitle={t('solutions.incident.problems.subtitle', 'Critical incidents require instant cross-platform coordination')}
        blocks={problemBlocks}
      />
      
      <AdvantageStrip />
      
      <ArchitectureDiagram />
      
      <UseCasesSection
        title={t('solutions.incident.usecases.title', 'Incident Excellence')}
        subtitle={t('solutions.incident.usecases.subtitle', 'How elite operations teams respond faster')}
        useCases={useCases}
      />
      
      <SolutionCTA />
    </SolutionPageLayout>
  );
}
