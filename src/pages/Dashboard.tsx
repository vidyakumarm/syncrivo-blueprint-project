import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { RealTimeChart } from '@/components/dashboard/RealTimeChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useConnections, useActivityLogs, useDashboardMetrics } from '@/hooks/useDashboardData';
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
  const { connections } = useConnections();
  const { activities } = useActivityLogs();
  const { metrics } = useDashboardMetrics();

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

  // Calculate metrics from real data
  const totalConnections = connections.length;
  const activeConnections = connections.filter(c => c.status === 'active').length;
  const totalRecordsProcessed = activities.reduce((sum, activity) => sum + activity.records_processed, 0);
  const successfulSyncs = activities.filter(a => a.status === 'success').length;
  const totalSyncCount = connections.reduce((sum, conn) => sum + conn.sync_count, 0);

  // Format numbers for display
  const formatNumber = (num: number) => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  // Get recent activities (last 5)
  const recentActivities = activities.slice(0, 5).map(activity => ({
    id: activity.id,
    action: activity.connections 
      ? `${activity.connections.name} - ${activity.action} (${formatNumber(activity.records_processed)} records)`
      : `${activity.action} (${formatNumber(activity.records_processed)} records)`,
    time: new Date(activity.created_at).toLocaleString(),
    status: activity.status
  }));

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
            title="Records Processed"
            value={formatNumber(totalRecordsProcessed)}
            change={`+${formatNumber(Math.floor(totalRecordsProcessed * 0.15))}`}
            isPositive={true}
            icon={<Activity className="h-5 w-5" />}
          />
          <MetricCard
            title="Active Connections"
            value={activeConnections.toString()}
            change={`+${Math.floor(activeConnections * 0.2)}`}
            isPositive={true}
            icon={<Zap className="h-5 w-5" />}
          />
          <MetricCard
            title="Successful Syncs"
            value={formatNumber(successfulSyncs)}
            change={`+${Math.floor(successfulSyncs * 0.1)}`}
            isPositive={true}
            icon={<CheckCircle2 className="h-5 w-5" />}
          />
          <MetricCard
            title="Total Connections"
            value={totalConnections.toString()}
            change={`+${Math.floor(totalConnections * 0.05)}`}
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
              {recentActivities.length > 0 ? recentActivities.map((activity) => (
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
              )) : (
                <div className="text-center text-muted-foreground py-4">
                  <p>No recent activity yet.</p>
                  <p className="text-sm">Start by adding some connections!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}