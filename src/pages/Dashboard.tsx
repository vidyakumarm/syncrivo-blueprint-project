import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { RealTimeChart } from '@/components/dashboard/RealTimeChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Zap, 
  AlertCircle, 
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function Dashboard() {
  const recentActivity = [
    { id: 1, action: 'Slack sync completed', time: '2 min ago', status: 'success' },
    { id: 2, action: 'Google Drive sync failed', time: '5 min ago', status: 'error' },
    { id: 3, action: 'Notion sync completed', time: '8 min ago', status: 'success' },
    { id: 4, action: 'Airtable sync completed', time: '12 min ago', status: 'success' },
    { id: 5, action: 'Trello sync completed', time: '15 min ago', status: 'success' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground">Monitor your integrations and sync activity in real-time</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Active Integrations"
            value="12"
            change="+2"
            isPositive={true}
            icon={<Zap className="h-5 w-5" />}
          />
          <MetricCard
            title="Syncs Today"
            value="1,247"
            change="+18%"
            isPositive={true}
            icon={<Activity className="h-5 w-5" />}
          />
          <MetricCard
            title="Success Rate"
            value="98.2%"
            change="+0.8%"
            isPositive={true}
            icon={<CheckCircle2 className="h-5 w-5" />}
          />
          <MetricCard
            title="Avg Sync Time"
            value="1.2s"
            change="-0.3s"
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