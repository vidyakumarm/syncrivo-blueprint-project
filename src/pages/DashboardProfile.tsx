
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardProfile() {
  const { t } = useTranslation();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('dashboard.profile.title', 'Profile Settings')}</h1>
          <p className="text-muted-foreground">{t('dashboard.profile.subtitle', 'Manage your account settings')}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.profile.personal_info', 'Personal Information')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t('dashboard.profile.coming_soon', 'Profile settings coming soon')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
