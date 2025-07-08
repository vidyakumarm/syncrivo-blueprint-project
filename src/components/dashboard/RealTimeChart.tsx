import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useActivityLogs } from '@/hooks/useDashboardData';
import { useTranslationWithFallback } from '@/hooks/useTranslationWithFallback';

interface ChartData {
  time: string;
  syncs: number;
  errors: number;
}

export function RealTimeChart() {
  const { t } = useTranslationWithFallback();
  const { activities } = useActivityLogs();
  const [data, setData] = useState<ChartData[]>([]);

  // Process activities into chart data
  const processActivitiesForChart = () => {
    const now = new Date();
    const intervals = [];
    
    // Create 6 time intervals (every 5 minutes for last 30 minutes)
    for (let i = 5; i >= 0; i--) {
      const time = new Date(now.getTime() - (i * 5 * 60 * 1000));
      const timeStr = time.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      
      const intervalStart = new Date(time.getTime() - (2.5 * 60 * 1000));
      const intervalEnd = new Date(time.getTime() + (2.5 * 60 * 1000));
      
      const intervalActivities = activities.filter(activity => {
        const activityTime = new Date(activity.created_at);
        return activityTime >= intervalStart && activityTime <= intervalEnd;
      });
      
      const syncs = intervalActivities.filter(a => a.status === 'success').length;
      const errors = intervalActivities.filter(a => a.status === 'error').length;
      
      intervals.push({ time: timeStr, syncs, errors });
    }
    
    return intervals;
  };

  // Process activities into chart data and update every 5 seconds
  useEffect(() => {
    const updateData = () => {
      const chartData = processActivitiesForChart();
      setData(chartData);
    };

    // Initial data load
    updateData();

    // Update every 5 seconds
    const interval = setInterval(updateData, 5000);

    return () => clearInterval(interval);
  }, [activities]); // Re-run when activities change

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-foreground">{t('dashboard.realtime_chart_title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-success-light rounded-lg">
              <div className="text-2xl font-bold text-success">{data[data.length - 1]?.syncs || 0}</div>
              <div className="text-sm text-muted-foreground">{t('dashboard.messages_synced_5min')}</div>
            </div>
            <div className="text-center p-4 bg-destructive/10 rounded-lg">
              <div className="text-2xl font-bold text-destructive">{data[data.length - 1]?.errors || 0}</div>
              <div className="text-sm text-muted-foreground">{t('dashboard.platform_errors_5min')}</div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground text-center">
            {t('dashboard.last_updated').replace('{{time}}', data[data.length - 1]?.time || '--:--')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}