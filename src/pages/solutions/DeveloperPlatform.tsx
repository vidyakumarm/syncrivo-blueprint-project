import { SolutionPageLayout } from '@/components/solutions/SolutionPageLayout';
import { SolutionHero } from '@/components/solutions/SolutionHero';
import { ProblemSolutionSection } from '@/components/solutions/ProblemSolutionSection';
import { AdvantageStrip } from '@/components/solutions/AdvantageStrip';
import { ArchitectureDiagram } from '@/components/solutions/ArchitectureDiagram';
import { UseCasesSection } from '@/components/solutions/UseCasesSection';
import { SolutionCTA } from '@/components/solutions/SolutionCTA';
import { useTranslation } from 'react-i18next';
import { Code2, Bot, Webhook } from 'lucide-react';

export default function DeveloperPlatform() {
  const { t } = useTranslation();
  
  const problemBlocks = [
    {
      header: t('solutions.developer.problem1.header', 'Multi-Platform Bot Development'),
      problem: t('solutions.developer.problem1.problem', 'Building bots for Teams, Slack, and Google Chat means learning three different APIs, maintaining three codebases, and managing three deployment pipelines.'),
      solution: t('solutions.developer.problem1.solution', 'Syncrivo\'s unified API lets you build once and deploy everywhere. Single codebase, single deployment, automatic multi-platform presence.'),
      icon: <Bot className="h-6 w-6 text-primary" />,
    },
    {
      header: t('solutions.developer.problem2.header', 'Workflow Automation Complexity'),
      problem: t('solutions.developer.problem2.problem', 'Automation workflows that span messaging platforms require complex integrations, webhooks, and custom middleware for each platform.'),
      solution: t('solutions.developer.problem2.solution', 'Unified webhook ingress and event subscription. Build workflows that react to and respond on any platform through a single integration point.'),
      icon: <Webhook className="h-6 w-6 text-primary" />,
    },
    {
      header: t('solutions.developer.problem3.header', 'Enterprise Integration Overhead'),
      problem: t('solutions.developer.problem3.problem', 'Enterprise messaging integrations require OAuth flows, admin consent, security reviews, and ongoing maintenance for each platform separately.'),
      solution: t('solutions.developer.problem3.solution', 'Single enterprise integration covers all platforms. One security review, one admin consent, one maintenance burden—three platform reach.'),
      icon: <Code2 className="h-6 w-6 text-primary" />,
    },
  ];

  const useCases = [
    {
      title: t('solutions.developer.usecase1.title', 'Universal Bot Framework'),
      description: t('solutions.developer.usecase1.description', 'Build conversational bots once using Syncrivo SDK. Deploy to Teams, Slack, and Google Chat with zero platform-specific code.'),
      metric: '3x',
      metricLabel: t('solutions.developer.usecase1.metric', 'platform reach'),
    },
    {
      title: t('solutions.developer.usecase2.title', 'Cross-Platform Workflows'),
      description: t('solutions.developer.usecase2.description', 'Automation workflows trigger from any platform, execute business logic, and respond on any platform.'),
      metric: '70%',
      metricLabel: t('solutions.developer.usecase2.metric', 'less code'),
    },
    {
      title: t('solutions.developer.usecase3.title', 'Unified Notifications API'),
      description: t('solutions.developer.usecase3.description', 'Send notifications to users on their preferred platform from any system. Single API, universal delivery.'),
      metric: '100%',
      metricLabel: t('solutions.developer.usecase3.metric', 'delivery rate'),
    },
    {
      title: t('solutions.developer.usecase4.title', 'Event-Driven Architecture'),
      description: t('solutions.developer.usecase4.description', 'Subscribe to messaging events across all platforms through unified event stream. React to any platform\'s events.'),
      metric: 'Real-time',
      metricLabel: t('solutions.developer.usecase4.metric', 'event delivery'),
    },
    {
      title: t('solutions.developer.usecase5.title', 'Enterprise App Distribution'),
      description: t('solutions.developer.usecase5.description', 'Deploy enterprise apps to all messaging platforms through single App Directory integration.'),
      metric: '1',
      metricLabel: t('solutions.developer.usecase5.metric', 'integration to maintain'),
    },
  ];

  return (
    <SolutionPageLayout>
      <SolutionHero
        badge={t('solutions.developer.badge', 'Developer Platform')}
        headline={t('solutions.developer.headline', 'Unified API for Bots, Workflows & Automation')}
        subheadline={t('solutions.developer.subheadline', 'Build once, deploy everywhere. Create messaging bots, workflow automations, and enterprise integrations with a single API that works across Teams, Slack, and Google Chat.')}
      />
      
      <ProblemSolutionSection
        title={t('solutions.developer.problems.title', 'Developer Challenges')}
        subtitle={t('solutions.developer.problems.subtitle', 'Multi-platform messaging development is complex and expensive')}
        blocks={problemBlocks}
      />
      
      <AdvantageStrip />
      
      <ArchitectureDiagram 
        title={t('solutions.developer.architecture.title', 'Developer-First Architecture')}
        subtitle={t('solutions.developer.architecture.subtitle', 'APIs and SDKs designed for developer productivity')}
      />
      
      <UseCasesSection
        title={t('solutions.developer.usecases.title', 'Developer Success')}
        subtitle={t('solutions.developer.usecases.subtitle', 'How developers build cross-platform messaging applications')}
        useCases={useCases}
      />
      
      <SolutionCTA 
        title={t('solutions.developer.cta.title', 'Ready to Build?')}
        subtitle={t('solutions.developer.cta.subtitle', 'Get API access and start building cross-platform messaging applications today.')}
      />
    </SolutionPageLayout>
  );
}
