import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, Shield, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Terms() {
  const { t } = useTranslation();
  const lastUpdated = "January 1, 2024";

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: `By accessing or using SyncRivo's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site and our services.`
    },
    {
      id: "description",
      title: "2. Description of Service",
      content: `SyncRivo provides a cloud-based platform that enables users to integrate, synchronize, and manage data between various third-party applications and services. Our service includes APIs, webhooks, data transformation tools, and integration management capabilities.`
    },
    {
      id: "accounts",
      title: "3. User Accounts and Registration",
      content: `To use certain features of our service, you must register for an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information during registration and keep your account information updated.`
    },
    {
      id: "acceptable-use",
      title: "4. Acceptable Use Policy",
      content: `You may not use our service to: (a) violate any applicable laws or regulations; (b) transmit harmful, threatening, or illegal content; (c) attempt to gain unauthorized access to our systems; (d) interfere with or disrupt our services; (e) use our service for competitive analysis or to build competing products; (f) exceed rate limits or usage quotas specified in your plan.`
    },
    {
      id: "data-security",
      title: "5. Data Handling and Security",
      content: `We implement industry-standard security measures to protect your data during transmission and storage. However, you acknowledge that no internet transmission is completely secure. You are responsible for ensuring you have proper authorization to connect and sync data from third-party services through our platform.`
    },
    {
      id: "payment",
      title: "6. Payment Terms",
      content: `Paid subscriptions are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law. We reserve the right to modify our pricing with 30 days' notice. Your subscription will automatically renew unless cancelled before the renewal date.`
    },
    {
      id: "intellectual-property",
      title: "7. Intellectual Property Rights",
      content: `SyncRivo and its original content, features, and functionality are owned by SyncRivo and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You retain ownership of your data and content.`
    },
    {
      id: "termination",
      title: "8. Termination",
      content: `We may terminate or suspend your account and access to our service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties. Upon termination, your right to use the service will cease immediately.`
    },
    {
      id: "limitation",
      title: "9. Limitation of Liability",
      content: `SyncRivo shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service. Our total liability shall not exceed the amount you paid for the service in the 12 months preceding the claim.`
    },
    {
      id: "changes",
      title: "10. Changes to Terms",
      content: `We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our service. Your continued use of the service after such modifications constitutes acceptance of the updated terms.`
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
                {t('terms.back_to_home')}
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {t('terms.updated')} {lastUpdated}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Scale className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-foreground">{t('terms.title')}</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('terms.subtitle')}
          </p>
          <div className="flex items-center justify-center mt-6 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 mr-2" />
            {t('terms.last_updated')}: {lastUpdated}
          </div>
        </div>

        {/* Table of Contents */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">{t('terms.table_of_contents')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-sm text-primary hover:text-primary-hover transition-colors p-2 rounded-md hover:bg-primary-light"
                >
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
                <CardTitle className="text-xl text-foreground">
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
            <CardTitle>{t('terms.questions_terms')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {t('terms.questions_terms_desc')}
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> legal@syncrivo.com</p>
              <p><strong>Address:</strong> SyncRivo Legal Team, 123 Integration Ave, Tech City, TC 12345</p>
            </div>
            <div className="flex items-center space-x-4 mt-6">
              <Button asChild>
                <Link to="/support">{t('terms.contact_support')}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/privacy">{t('terms.privacy_policy')}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}