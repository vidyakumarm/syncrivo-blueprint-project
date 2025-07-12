import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ExternalLink, 
  Filter,
  MoreVertical 
} from 'lucide-react';
import { useTranslationWithFallback } from '@/hooks/useTranslationWithFallback';
import { cn } from '@/lib/utils';

interface Activity {
  id: string;
  action: string;
  time: string;
  status: 'success' | 'error' | 'pending';
  platform?: string;
  details?: string;
}

interface ActivityFeedProps {
  activities: Activity[];
  className?: string;
}

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  const { t } = useTranslationWithFallback();
  const [filter, setFilter] = useState<'all' | 'success' | 'error' | 'pending'>('all');

  const filteredActivities = activities.filter(activity => 
    filter === 'all' || activity.status === filter
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-muted-foreground animate-pulse" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-success/10 text-success border-success/20';
      case 'error':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'pending':
        return 'bg-muted text-muted-foreground border-muted';
      default:
        return 'bg-muted text-muted-foreground border-muted';
    }
  };

  return (
    <Card className={cn("bg-gradient-card", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-foreground">
            {t('dashboard.recent_activity')}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs value={filter} onValueChange={(value) => setFilter(value as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="success" className="text-xs">Success</TabsTrigger>
            <TabsTrigger value="error" className="text-xs">Errors</TabsTrigger>
            <TabsTrigger value="pending" className="text-xs">Pending</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent className="pt-0">
        <ScrollArea className="h-80">
          <div className="space-y-3">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity, index) => (
                <div
                  key={activity.id}
                  className={cn(
                    "group flex items-start space-x-3 p-3 rounded-lg transition-all duration-200",
                    "hover:bg-muted/50 hover:shadow-sm",
                    "border border-transparent hover:border-border/50"
                  )}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {getStatusIcon(activity.status)}
                  </div>
                  
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-medium text-foreground leading-snug line-clamp-2">
                        {activity.action}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                      {activity.platform && (
                        <Badge variant="outline" className="text-xs px-1.5 py-0">
                          {activity.platform}
                        </Badge>
                      )}
                    </div>
                    
                    {activity.details && (
                      <p className="text-xs text-muted-foreground/80 line-clamp-1">
                        {activity.details}
                      </p>
                    )}
                  </div>
                  
                  <Badge 
                    className={cn(
                      "text-xs font-medium capitalize flex-shrink-0",
                      getStatusColor(activity.status)
                    )}
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-12 space-y-3">
                <div className="text-muted-foreground">
                  <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">{t('dashboard.no_activity')}</p>
                  <p className="text-xs mt-1">{t('dashboard.start_connecting')}</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}