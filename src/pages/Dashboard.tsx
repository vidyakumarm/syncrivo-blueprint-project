import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { RealTimeChart } from '@/components/dashboard/RealTimeChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Activity, 
  Zap, 
  AlertCircle, 
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function Dashboard() {
  const { t } = useTranslation();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Temporarily allow access without authentication for development
  // TODO: Re-enable authentication in production
  // useEffect(() => {
  //   if (!loading && !user) {
  //     navigate('/login');
  //   }
  // }, [user, loading, navigate]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  const recentActivity = [
    { id: 1, action: 'Enterprise Slack sync - 2.4M messages processed', time: '2 min ago', status: 'success' },
    { id: 2, action: 'Global Drive sync - 847GB data transferred', time: '5 min ago', status: 'success' },
    { id: 3, action: 'Multi-tenant Notion sync - 1.2M pages indexed', time: '8 min ago', status: 'success' },
    { id: 4, action: 'Enterprise Airtable sync - 450K records synced', time: '12 min ago', status: 'success' },
    { id: 5, action: 'Corporate Trello sync - 89K boards processed', time: '15 min ago', status: 'success' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('dashboard.title')} Overview</h1>
          <p className="text-muted-foreground">Monitor your integrations and sync activity in real-time</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Data Points Processed"
            value="2.4T"
            change="+125B"
            isPositive={true}
            icon={<Activity className="h-5 w-5" />}
          />
          <MetricCard
            title="Market Value Unlocked"
            value="$847B"
            change="+$92B"
            isPositive={true}
            icon={<Zap className="h-5 w-5" />}
          />
          <MetricCard
            title="Global Users Reached"
            value="1.8B"
            change="+234M"
            isPositive={true}
            icon={<CheckCircle2 className="h-5 w-5" />}
          />
          <MetricCard
            title="Enterprise Connections"
            value="450K"
            change="+18%"
            isPositive={true}
            icon={<Clock className="h-5 w-5" />}
          />
        </div>

        {/* Charts and Activity */}
        <div className="grid gap-6 lg:grid-cols-3">
          <RealTimeChart />
          
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {activity.status === 'success' ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={activity.status === 'success' ? 'default' : 'destructive'}
                    className="capitalize"
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}