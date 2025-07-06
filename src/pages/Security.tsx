import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Shield, Lock, Eye, Server } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Security = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-8">{t('security.security_title')}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('security.security_subtitle')}
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
            <div className="bg-card rounded-lg p-6 shadow-sm text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t('security.data_encryption')}</h3>
              <p className="text-muted-foreground">{t('security.data_encryption_desc')}</p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm text-center">
              <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t('security.access_control')}</h3>
              <p className="text-muted-foreground">{t('security.access_control_desc')}</p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm text-center">
              <Eye className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t('security.privacy_first')}</h3>
              <p className="text-muted-foreground">{t('security.privacy_first_desc')}</p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm text-center">
              <Server className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t('security.secure_infrastructure')}</h3>
              <p className="text-muted-foreground">{t('security.secure_infrastructure_desc')}</p>
            </div>
          </div>
          
          <div className="bg-card rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">{t('security.security_policies')}</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">{t('security.responsible_disclosure')}</h3>
                <p className="text-muted-foreground">
                  {t('security.responsible_disclosure_desc')}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">{t('security.compliance')}</h3>
                <p className="text-muted-foreground">
                  {t('security.compliance_desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Security;