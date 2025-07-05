import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Database, Clock } from 'lucide-react';

export default function Privacy() {
  const lastUpdated = "January 1, 2024";

  const sections = [
    {
      id: "overview",
      title: "1. Overview",
      icon: <Eye className="h-5 w-5" />,
      content: `At SyncRivo, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our data integration platform. We are committed to protecting your personal information and your right to privacy.`
    },
    {
      id: "information-collection",
      title: "2. Information We Collect",
      icon: <Database className="h-5 w-5" />,
      content: `We collect information you provide directly to us, such as when you create an account, use our services, or contact us. This includes your name, email address, company information, and integration configurations. We also collect technical information like IP addresses, browser types, and usage patterns to improve our service.`
    },
    {
      id: "data-usage", 
      title: "3. How We Use Your Information",
      icon: <Lock className="h-5 w-5" />,
      content: `We use your information to provide, maintain, and improve our services; process transactions; send you technical notices and support messages; respond to your comments and questions; and detect, investigate and prevent fraudulent transactions and other illegal activities.`
    },
    {
      id: "data-sharing",
      title: "4. Information Sharing and Disclosure",
      icon: <Shield className="h-5 w-5" />,
      content: `We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with service providers who assist us in operating our platform, conducting business, or serving you, provided they agree to keep this information confidential.`
    },
    {
      id: "integration-data",
      title: "5. Third-Party Integration Data",
      icon: <Database className="h-5 w-5" />,
      content: `When you connect third-party services through our platform, we may access and process data from those services as necessary to provide our integration services. We act as a data processor for this information and handle it according to your instructions and applicable data protection laws.`
    },
    {
      id: "data-security",
      title: "6. Data Security",
      icon: <Lock className="h-5 w-5" />,
      content: `We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, access controls, secure data centers, and regular security assessments.`
    },
    {
      id: "data-retention",
      title: "7. Data Retention",
      icon: <Clock className="h-5 w-5" />,
      content: `We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. You can request deletion of your account and associated data at any time, subject to legal and operational requirements.`
    },
    {
      id: "your-rights",
      title: "8. Your Privacy Rights",
      icon: <Shield className="h-5 w-5" />,
      content: `Depending on your location, you may have certain rights regarding your personal information, including the right to access, update, or delete your information; the right to restrict or object to our processing; and the right to data portability. Contact us to exercise these rights.`
    },
    {
      id: "cookies",
      title: "9. Cookies and Tracking",
      icon: <Eye className="h-5 w-5" />,
      content: `We use cookies and similar tracking technologies to collect and use personal information about you. You can control cookies through your browser settings, but some features of our service may not function properly if you disable cookies.`
    },
    {
      id: "international",
      title: "10. International Data Transfers",
      icon: <Database className="h-5 w-5" />,
      content: `Your information may be transferred to and maintained on computers located outside of your jurisdiction where data protection laws may differ. We ensure appropriate safeguards are in place for such transfers in accordance with applicable law.`
    },
    {
      id: "changes",
      title: "11. Changes to This Policy",
      icon: <Clock className="h-5 w-5" />,
      content: `We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our service after such changes constitutes acceptance of the updated policy.`
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
                Updated {lastUpdated}
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
            <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, 
            use, and protect your information when you use SyncRivo.
          </p>
          <div className="flex items-center justify-center mt-6 text-sm text-muted-foreground">
            <Lock className="h-4 w-4 mr-2" />
            Last updated: {lastUpdated}
          </div>
        </div>

        {/* Privacy Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Lock className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Secure by Design</h3>
              <p className="text-sm text-muted-foreground">
                Enterprise-grade security with end-to-end encryption
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Eye className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Transparent Data Use</h3>
              <p className="text-sm text-muted-foreground">
                Clear information about how your data is used
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Your Rights Protected</h3>
              <p className="text-sm text-muted-foreground">
                Full control over your personal information
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
                <p className="text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </CardContent>
              {index < sections.length - 1 && <Separator className="mt-6" />}
            </Card>
          ))}
        </div>

        {/* Contact Information */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Questions About Your Privacy?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> privacy@syncrivo.com</p>
              <p><strong>Data Protection Officer:</strong> dpo@syncrivo.com</p>
              <p><strong>Address:</strong> SyncRivo Privacy Team, 123 Integration Ave, Tech City, TC 12345</p>
            </div>
            <div className="flex items-center space-x-4 mt-6">
              <Button asChild>
                <Link to="/support">Contact Support</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/legal/terms">Terms of Service</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}