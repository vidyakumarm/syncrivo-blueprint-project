import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useActivityLogs } from '@/hooks/useDashboardData';
import { useTranslationWithFallback } from '@/hooks/useTranslationWithFallback';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
  time: string;
  syncs: number;
  errors: number;
}

export function RealTimeChart() {
  const { t } = useTranslationWithFallback();
  const { activities } = useActivityLogs();
  const [data, setData] = useState<ChartData[]>([]);
  const [currentTime, setCurrentTime] = useState('');

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

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg text-foreground">{t('dashboard.realtime_chart_title')}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Chart Container with responsive height */}
        <div className="h-64 sm:h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickMargin={8}
                tick={{ fontSize: 11 }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickMargin={8}
                tick={{ fontSize: 11 }}
                width={40}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Line
                type="monotone"
                dataKey="syncs"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 0, r: 3 }}
                name={t('dashboard.messages_synced_5min')}
              />
              <Line
                type="monotone"
                dataKey="errors"
                stroke="hsl(var(--destructive))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 0, r: 3 }}
                name={t('dashboard.platform_errors_5min')}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Status */}
        <div className="mt-4 text-xs text-muted-foreground text-center">
          {t('dashboard.last_updated').replace('{{time}}', currentTime)}
        </div>
      </CardContent>
    </Card>
  );
}