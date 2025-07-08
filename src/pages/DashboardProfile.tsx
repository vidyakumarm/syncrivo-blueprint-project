
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useTranslationWithFallback } from '@/hooks/useTranslationWithFallback';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardProfile() {
  const { t } = useTranslationWithFallback();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('dashboard.profile.title')}</h1>
          <p className="text-muted-foreground">{t('dashboard.profile.subtitle')}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.profile.personal_info')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t('dashboard.profile.coming_soon')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
