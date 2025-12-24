import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Clock, Shield, AlertTriangle, Scale, UserCheck, Globe, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Footer } from '@/components/layout/Footer';

export default function Terms() {
  const { t } = useTranslation();
  const lastUpdated = "December 24, 2024";

  const sections = [
    {
      id: "eligibility",
      title: "1. Eligibility",
      icon: <UserCheck className="h-5 w-5" />,
      content: [
        "You may use the Services only if:",
        "• You are at least the age of majority in your jurisdiction, and",
        "• You have the authority to bind the organization or workspace on whose behalf you are installing or configuring the Services.",
        "By installing or enabling our bots in a workspace (for example, Slack or Google Chat), you represent and warrant that you are authorized to do so."
      ]
    },
    {
      id: "description",
      title: "2. Description of the Services",
      icon: <Zap className="h-5 w-5" />,
      content: [
        "SyncRivo provides integrations and bots that help route and sync messages and attachments between channels, spaces, and other destinations you configure.",
        "In particular, the bots may:",
        "• Receive messages and attachments from one or more channels/spaces",
        "• Process those messages as necessary to provide the functionality",
        "• Forward the messages and attachments to other configured channels/spaces",
        "SyncRivo may update, modify, or improve the Services from time to time, including adding or removing features."
      ]
    },
    {
      id: "responsibilities",
      title: "3. Your responsibilities",
      icon: <AlertTriangle className="h-5 w-5" />,
      content: [
        "You are responsible for:",
        "1. Configuration and access – Configuring which channels/spaces our bots can access; Managing who in your workspace is allowed to install or configure integrations; Ensuring that your configuration does not expose sensitive data to unintended recipients",
        "2. Compliance with platform rules – Complying with all applicable terms and policies of third-party platforms (e.g., Slack, Google Chat) on which you use our Services.",
        "3. Content and usage – You are solely responsible for: The content of all messages, files, and other data that pass through our Services; Ensuring your use of the Services complies with all applicable laws and regulations",
        "If you are a workspace owner or administrator, you are responsible for informing your users about your use of our Services as appropriate."
      ]
    },
    {
      id: "prohibited",
      title: "4. Prohibited uses",
      icon: <Shield className="h-5 w-5" />,
      content: [
        "You agree not to:",
        "• Use the Services for any unlawful, harmful, fraudulent, or malicious activity",
        "• Attempt to gain unauthorized access to the Services or any related systems or networks",
        "• Reverse engineer, decompile, or otherwise attempt to derive source code from the Services (except to the extent such restriction is prohibited by law)",
        "• Use the Services to send spam, abusive content, or other content that violates applicable platform policies (e.g., Slack's or Google's policies)",
        "• Circumvent usage or rate limits, or interfere with the proper functioning of the Services",
        "We reserve the right to investigate violations of these Terms and to suspend or terminate access to the Services where appropriate."
      ]
    },
    {
      id: "data-privacy",
      title: "5. Data and privacy",
      icon: <FileText className="h-5 w-5" />,
      content: [
        "Your use of the Services is also governed by our Privacy Policy, available at: https://syncrivo.ai/privacy",
        "By using the Services, you acknowledge that we will handle information as described in the Privacy Policy.",
        "In summary, and without limiting the Privacy Policy:",
        "• Our bots temporarily process messages and attachments in order to forward them between configured channels/spaces.",
        "• We do not store message content or attachments in our primary databases, other than transiently as needed to provide the Service or in short-lived logs.",
        "• We do store tokens and configuration data necessary to operate the integration (e.g., access tokens, workspace IDs, and routing rules)."
      ]
    },
    {
      id: "third-party",
      title: "6. Third-party services and platforms",
      icon: <Globe className="h-5 w-5" />,
      content: [
        "The Services rely on third-party platforms such as Slack and Google Chat. Your use of those platforms is subject to their own terms and policies, which we do not control and for which we are not responsible.",
        "We are not responsible for:",
        "• The operation, security, or availability of any third-party platform",
        "• Any changes to those platforms that may affect the functionality of our Services",
        "We may modify the Services as needed to remain compatible with changes to these platforms, but we are not obligated to maintain any particular integration or feature."
      ]
    },
    {
      id: "intellectual-property",
      title: "7. Intellectual property",
      icon: <FileText className="h-5 w-5" />,
      content: [
        "All rights, title, and interest in and to the Services, including the Site, underlying software, logos, and brand elements, are and will remain the exclusive property of SyncRivo and its licensors.",
        "Subject to your continued compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Services for your internal business purposes.",
        "You may not use any SyncRivo trademarks, trade names, or branding without our prior written consent."
      ]
    },
    {
      id: "feedback",
      title: "8. Feedback",
      icon: <AlertTriangle className="h-5 w-5" />,
      content: [
        "If you choose to share suggestions, ideas, or feedback with us (\"Feedback\"), you agree that we may use it without restriction or obligation to you, and you hereby grant us a perpetual, irrevocable, worldwide, royalty-free license to use and incorporate the Feedback into our products and services."
      ]
    },
    {
      id: "disclaimer",
      title: "9. Disclaimer of warranties",
      icon: <AlertTriangle className="h-5 w-5" />,
      content: [
        "To the fullest extent permitted by law, the Services are provided \"AS IS\" and \"AS AVAILABLE,\" without warranties of any kind, whether express, implied, or statutory, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.",
        "Without limiting the foregoing, we do not warrant that:",
        "• The Services will be uninterrupted, secure, or error-free",
        "• The Services will meet your requirements or expectations",
        "• Any defects will be corrected",
        "You use the Services at your own risk."
      ]
    },
    {
      id: "liability",
      title: "10. Limitation of liability",
      icon: <Scale className="h-5 w-5" />,
      content: [
        "To the fullest extent permitted by law, in no event will SyncRivo, its affiliates, or their respective directors, officers, employees, or agents be liable for:",
        "• Any indirect, incidental, consequential, special, exemplary, or punitive damages, or",
        "• Any loss of profits, revenues, data, or goodwill,",
        "arising out of or in connection with your use of the Services, whether based on contract, tort, negligence, strict liability, or any other legal theory, even if we have been advised of the possibility of such damages.",
        "To the fullest extent permitted by law, our total aggregate liability for any claim arising out of or relating to the Services or these Terms will not exceed the greater of: The amounts you paid (if any) for the Services in the six (6) months prior to the event giving rise to the claim, or One hundred (100) US dollars (or equivalent in local currency).",
        "Some jurisdictions do not allow the exclusion or limitation of certain damages; in those jurisdictions, our liability will be limited to the maximum extent permitted by law."
      ]
    },
    {
      id: "indemnification",
      title: "11. Indemnification",
      icon: <Shield className="h-5 w-5" />,
      content: [
        "You agree to indemnify and hold harmless SyncRivo, its affiliates, and their respective directors, officers, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable attorney fees) arising out of or in any way connected with:",
        "• Your access to or use of the Services",
        "• Your violation of these Terms",
        "• Your violation of any applicable law or rights of another person or entity",
        "• Any content or data routed through the Services from your workspace or configuration"
      ]
    },
    {
      id: "termination",
      title: "12. Suspension and termination",
      icon: <AlertTriangle className="h-5 w-5" />,
      content: [
        "We may suspend or terminate your access to the Services, in whole or in part, at any time and for any reason, including if:",
        "• You breach these Terms",
        "• We are required to do so by law or by a platform provider (e.g., Slack, Google)",
        "• We discontinue or materially modify the Services",
        "You may stop using the Services at any time by uninstalling or disabling the bots from your workspace and/or contacting us.",
        "Upon termination, the rights granted to you under these Terms will immediately cease. Certain provisions will survive termination, including but not limited to ownership, warranty disclaimers, limitations of liability, and indemnification."
      ]
    },
    {
      id: "changes",
      title: "13. Changes to the Services and Terms",
      icon: <Clock className="h-5 w-5" />,
      content: [
        "We may modify the Services from time to time, for example to add or remove features or to respond to changes in third-party platforms.",
        "We may also update these Terms from time to time. If we make material changes, we will update the \"Last updated\" date at the top of these Terms and may provide additional notice. Your continued use of the Services after the updated Terms become effective constitutes your acceptance of the changes."
      ]
    },
    {
      id: "governing-law",
      title: "14. Governing law and dispute resolution",
      icon: <Scale className="h-5 w-5" />,
      content: [
        "These Terms and any disputes arising out of or relating to them or the Services will be governed by and construed in accordance with the laws of [JURISDICTION], without regard to its conflict of law principles.",
        "You agree to submit to the exclusive jurisdiction of the courts located in [JURISDICTION] to resolve any legal matter arising from these Terms or the Services, except where applicable law provides otherwise."
      ]
    },
    {
      id: "miscellaneous",
      title: "15. Miscellaneous",
      icon: <FileText className="h-5 w-5" />,
      content: [
        "• Entire agreement – These Terms, together with our Privacy Policy, constitute the entire agreement between you and SyncRivo regarding the Services.",
        "• Severability – If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will remain in full force and effect.",
        "• No waiver – Our failure to enforce any provision of these Terms will not be considered a waiver of our rights.",
        "• Assignment – You may not assign or transfer these Terms or your rights under them without our prior written consent. We may assign these Terms in connection with a merger, acquisition, or sale of assets, or by operation of law."
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
            <FileText className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-foreground">Terms of Service – SyncRivo Bot</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Terms and conditions for using SyncRivo messaging integration services
          </p>
        </div>

        {/* Service Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <UserCheck className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Clear Responsibilities</h3>
              <p className="text-sm text-muted-foreground">
                Understand your role in configuring and managing integrations
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Safe & Secure</h3>
              <p className="text-sm text-muted-foreground">
                Enterprise-grade security and compliance standards
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Globe className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Platform Compatible</h3>
              <p className="text-sm text-muted-foreground">
                Works with Slack, Google Chat, and more
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

        {/* Terms Sections */}
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
                <div className="space-y-4">
                  {section.content.map((paragraph, idx) => (
                    <p key={idx} className="text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
              {index < sections.length - 1 && <Separator className="mt-6" />}
            </Card>
          ))}
        </div>

        {/* Contact Information */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>16. Contact us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have any questions about these Terms or the Services, please contact us at:
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> admin@syncrivo.ai</p>
              <p><strong>Subject:</strong> "Terms – SyncRivo"</p>
            </div>
            <div className="flex items-center space-x-4 mt-6">
              <Button asChild>
                <Link to="/support">Contact Support</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/privacy">Privacy Policy</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}