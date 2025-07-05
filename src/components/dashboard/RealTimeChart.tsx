import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ChartData {
  time: string;
  syncs: number;
  errors: number;
}

export function RealTimeChart() {
  const [data, setData] = useState<ChartData[]>([
    { time: '12:00', syncs: 45, errors: 2 },
    { time: '12:05', syncs: 52, errors: 1 },
    { time: '12:10', syncs: 48, errors: 3 },
    { time: '12:15', syncs: 61, errors: 0 },
    { time: '12:20', syncs: 55, errors: 1 },
    { time: '12:25', syncs: 67, errors: 2 },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newTime = new Date().toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        const newSyncs = Math.floor(Math.random() * 30) + 40;
        const newErrors = Math.floor(Math.random() * 5);
        
        const newData = [...prevData.slice(1), { time: newTime, syncs: newSyncs, errors: newErrors }];
        return newData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-foreground">Real-Time Sync Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-success-light rounded-lg">
              <div className="text-2xl font-bold text-success">{data[data.length - 1]?.syncs || 0}</div>
              <div className="text-sm text-muted-foreground">Current Syncs/5min</div>
            </div>
            <div className="text-center p-4 bg-destructive/10 rounded-lg">
              <div className="text-2xl font-bold text-destructive">{data[data.length - 1]?.errors || 0}</div>
              <div className="text-sm text-muted-foreground">Current Errors/5min</div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground text-center">
            Last updated: {data[data.length - 1]?.time} (Updates every 5 seconds)
          </div>
        </div>
      </CardContent>
    </Card>
  );
}