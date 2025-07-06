import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';

const Status = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">{t('status.status_title')}</h1>
            <p className="text-xl text-muted-foreground">
              {t('status.status_subtitle')}
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{t('status.api_services')}</h2>
                <Badge variant="default" className="bg-green-100 text-green-800">{t('status.operational')}</Badge>
              </div>
              <p className="text-muted-foreground mt-2">{t('status.api_services_desc')}</p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{t('status.dashboard_service')}</h2>
                <Badge variant="default" className="bg-green-100 text-green-800">{t('status.operational')}</Badge>
              </div>
              <p className="text-muted-foreground mt-2">{t('status.dashboard_service_desc')}</p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{t('status.data_processing')}</h2>
                <Badge variant="default" className="bg-green-100 text-green-800">{t('status.operational')}</Badge>
              </div>
              <p className="text-muted-foreground mt-2">{t('status.data_processing_desc')}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Status;