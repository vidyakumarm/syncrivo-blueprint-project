
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardSecurity() {
  const { t } = useTranslation();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('dashboard.security.title', 'Security Settings')}</h1>
          <p className="text-muted-foreground">{t('dashboard.security.subtitle', 'Manage your account security')}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.security.password', 'Password & Authentication')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t('dashboard.security.coming_soon', 'Security settings coming soon')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
