import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, Zap, Shield } from 'lucide-react';
import { useTranslationWithFallback } from '@/hooks/useTranslationWithFallback';

interface StatsOverviewProps {
  totalUsers: number;
  activeConnections: number;
  messagesSynced: number;
  uptime: number;
}

export function StatsOverview({ totalUsers, activeConnections, messagesSynced, uptime }: StatsOverviewProps) {
  const { t } = useTranslationWithFallback();

  const stats = [
    {
      label: 'Total Users',
      value: totalUsers.toLocaleString(),
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      label: 'Active Connections',
      value: activeConnections.toLocaleString(),
      icon: Zap,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Messages Synced',
      value: messagesSynced.toLocaleString(),
      icon: TrendingUp,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'System Uptime',
      value: `${uptime}%`,
      icon: Shield,
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <Card className="bg-gradient-card">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center space-y-2">
                <div className={`inline-flex p-3 rounded-full ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}