
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardTeam() {
  const { t } = useTranslation();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('dashboard.team.title', 'Team Settings')}</h1>
          <p className="text-muted-foreground">{t('dashboard.team.subtitle', 'Manage your team members and permissions')}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.team.members', 'Team Members')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t('dashboard.team.coming_soon', 'Team management coming soon')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
