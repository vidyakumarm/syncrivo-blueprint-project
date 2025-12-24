import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Database, Clock, AlertCircle, FileText, Users, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Footer } from '@/components/layout/Footer';

export default function Privacy() {
  const { t } = useTranslation();
  const lastUpdated = "December 24, 2024";

  const sections = [
    {
      id: "what-we-do",
      title: "1. What we do",
      icon: <Eye className="h-5 w-5" />,
      content: [
        "SyncRivo provides integrations/bots that help teams route and sync messages and attachments between configured channels or spaces.",
        "Our bots primarily:",
        "• Receive messages and attachments from supported platforms (e.g., Slack, Google Chat), and",
        "• Forward those messages and attachments to other configured channels/spaces, according to your settings.",
        "We do not use your bot messages for advertising or profiling, and we do not store message content or attachments beyond what is necessary to deliver the Service."
      ]
    },
    {
      id: "information-collection",
      title: "2. Information we collect",
      icon: <Database className="h-5 w-5" />,
      subsections: [
        {
          subtitle: "2.1 Information you provide to us",
          points: [
            "Account / contact information: If you contact us (e.g., by email or contact form), we may collect your name, email address, and any other information you choose to provide.",
            "Configuration information: When you configure our bots, we may store settings such as: Workspace or tenant identifiers, IDs of channels/spaces to which messages should be forwarded, Integration preferences and routing rules."
          ]
        },
        {
          subtitle: "2.2 Information from integrated platforms (Slack, Google Chat, etc.)",
          points: [
            "Through platform APIs (such as Slack or Google APIs), we may receive: Workspace / organization IDs, Channel / space IDs, Bot or app IDs, Access tokens / refresh tokens required to operate the integration, Basic metadata associated with events (e.g., message timestamps, IDs, sender IDs).",
            "Message content & attachments: To provide the Service, our systems may temporarily process message content and attachments in memory so that we can forward them to the configured destination channels/spaces. We do not store message content or attachments in our database for long-term use. We do not build user profiles based on message content."
          ]
        },
        {
          subtitle: "2.3 Automatically collected data",
          points: [
            "When you visit the Site or use our Services, we may automatically collect: Log information (such as IP address, browser type, operating system, date/time of access, pages viewed, and referrer URL), Basic usage information about how the integrations are used (e.g., number of messages processed, success/error rates).",
            "This information is generally used for security, debugging, and improving our Services."
          ]
        }
      ]
    },
    {
      id: "data-usage",
      title: "3. How we use information",
      icon: <Lock className="h-5 w-5" />,
      content: [
        "We use the information we collect for the following purposes:",
        "1. Providing and operating the Services – Routing and forwarding messages and attachments between configured channels/spaces; Authenticating with Slack, Google Chat, and other platforms using stored tokens",
        "2. Security and reliability – Detecting, investigating, and preventing fraudulent or malicious activity; Monitoring uptime, performance, and error logs",
        "3. Support and communication – Responding to your inquiries and support requests; Sending important service-related notifications (e.g., security, critical changes)",
        "4. Improvement – Aggregated, anonymized analytics to understand how the Services are used, so we can improve them.",
        "We do not sell your personal information."
      ]
    },
    {
      id: "legal-bases",
      title: "4. Legal bases (for users in the EEA/UK)",
      icon: <FileText className="h-5 w-5" />,
      content: [
        "If you are in the European Economic Area (EEA) or United Kingdom (UK), we process your personal data on the following legal bases:",
        "• Performance of a contract – to provide and operate the Services you have installed or configured.",
        "• Legitimate interests – to maintain and improve our Services, secure our systems, and prevent abuse.",
        "• Consent – where required, such as for certain types of cookies or marketing communications."
      ]
    },
    {
      id: "data-retention",
      title: "5. Data retention",
      icon: <Clock className="h-5 w-5" />,
      content: [
        "We retain information only as long as necessary for the purposes described in this Privacy Policy:",
        "• Access tokens and configuration data are retained while the integration/bot is installed and active, and for a reasonable period afterward to handle reactivation, audit, and security purposes, unless you request deletion earlier.",
        "• Logs and technical data are retained for a limited time (for example, days or months) and then deleted or anonymized, unless a longer retention is required for security, legal, or compliance reasons.",
        "• Message content and attachments are processed transiently and not stored in our primary databases. Any short-lived logs that incidentally contain message snippets are rotated and deleted on a regular schedule.",
        "You may request deletion of certain data at any time (see Section 8 below)."
      ]
    },
    {
      id: "data-sharing",
      title: "6. How we share information",
      icon: <Users className="h-5 w-5" />,
      content: [
        "We may share information in the following limited circumstances:",
        "1. Service providers – With trusted third-party providers that help us operate the Services (e.g., cloud hosting, logging, monitoring). These providers are only permitted to use the data to provide services to us and must protect it appropriately.",
        "2. Platform providers – Since our Services run within or alongside platforms like Slack and Google Chat, your use of our bots is also subject to those providers' terms and privacy policies. We comply with their platform policies when accessing and handling data.",
        "3. Legal requirements and protection – We may disclose information if required by law or in good faith belief that such action is necessary to: Comply with legal obligations or respond to lawful requests; Protect our rights, property, or safety, or that of our users or the public.",
        "4. Business transfers – In connection with a merger, acquisition, financing, or sale of assets, information may be transferred as part of that transaction, subject to appropriate confidentiality protections.",
        "We do not sell your personal data."
      ]
    },
    {
      id: "security",
      title: "7. Security",
      icon: <Shield className="h-5 w-5" />,
      content: [
        "We use reasonable technical and organizational measures to protect information, including:",
        "• Encryption in transit (e.g., HTTPS)",
        "• Restricted access to databases and tokens",
        "• Access controls and audit logs for sensitive operations",
        "However, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security, but we aim to protect data in line with industry practices."
      ]
    },
    {
      id: "your-rights",
      title: "8. Your rights and choices",
      icon: <AlertCircle className="h-5 w-5" />,
      content: [
        "Depending on your jurisdiction, you may have certain rights regarding your personal data, such as:",
        "• Accessing the information we hold about you",
        "• Requesting correction or deletion of your information",
        "• Objecting to or restricting certain processing",
        "• Porting your data, where applicable",
        "Because much of the data we handle is workspace-level or pseudonymous (IDs, tokens) and not traditional \"profile\" data, we may need to coordinate with your workspace administrator to process some requests.",
        "To exercise any rights or ask questions about your data, please contact us at privacy@syncrivo.ai."
      ]
    },
    {
      id: "third-party",
      title: "9. Third-party services and links",
      icon: <Globe className="h-5 w-5" />,
      content: [
        "Our Services interact with third-party platforms such as Slack and Google Chat. Your use of those platforms is governed by their own terms and privacy policies, not this Privacy Policy.",
        "Our Site may also contain links to other websites. We are not responsible for the privacy practices of those sites."
      ]
    },
    {
      id: "children",
      title: "10. Children's privacy",
      icon: <Shield className="h-5 w-5" />,
      content: [
        "Our Services are not directed to children under the age of 16, and we do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will take appropriate steps to delete it."
      ]
    },
    {
      id: "changes",
      title: "11. Changes to this Privacy Policy",
      icon: <Clock className="h-5 w-5" />,
      content: [
        "We may update this Privacy Policy from time to time. If we make material changes, we will update the \"Last updated\" date at the top of this page and, where appropriate, provide additional notice.",
        "Your continued use of the Services after the revised Privacy Policy becomes effective indicates that you have read and understood the changes."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" asChild className="flex items-center">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                Last updated {lastUpdated}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-foreground">Privacy Policy – SyncRivo Bot</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn how we protect your privacy when you use our messaging integrations
          </p>
        </div>

        {/* Privacy Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Lock className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Transient Processing</h3>
              <p className="text-sm text-muted-foreground">
                Messages processed in memory only, not stored long-term
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Eye className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">No Profiling</h3>
              <p className="text-sm text-muted-foreground">
                We don't use your bot messages for advertising or user tracking
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Your Rights Protected</h3>
              <p className="text-sm text-muted-foreground">
                Full control over your data with deletion rights
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Table of Contents */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Table of Contents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center text-sm text-primary hover:text-primary-hover transition-colors p-2 rounded-md hover:bg-primary-light"
                >
                  <span className="mr-2">{section.icon}</span>
                  {section.title}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Privacy Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card key={section.id} id={section.id}>
              <CardHeader>
                <CardTitle className="text-xl text-foreground flex items-center">
                  <span className="mr-3 text-primary">{section.icon}</span>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {section.content && (
                  <div className="space-y-4">
                    {section.content.map((paragraph, idx) => (
                      <p key={idx} className="text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
                {section.subsections && (
                  <div className="space-y-6">
                    {section.subsections.map((subsection, subIdx) => (
                      <div key={subIdx}>
                        <h4 className="font-semibold text-foreground mb-3">{subsection.subtitle}</h4>
                        <div className="space-y-2 pl-4">
                          {subsection.points.map((point, pointIdx) => (
                            <p key={pointIdx} className="text-muted-foreground leading-relaxed text-sm">
                              {point}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              {index < sections.length - 1 && <Separator className="mt-6" />}
            </Card>
          ))}
        </div>

        {/* Contact Information */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>12. Contact us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> privacy@syncrivo.ai</p>
              <p><strong>Subject:</strong> "Privacy – SyncRivo"</p>
            </div>
            <div className="flex items-center space-x-4 mt-6">
              <Button asChild>
                <Link to="/support">Contact Support</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/terms">Terms of Service</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}