import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, MoreVertical } from 'lucide-react';
import { useTranslationWithFallback } from '@/hooks/useTranslationWithFallback';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  subtitle?: string;
  trend?: 'up' | 'down' | 'stable';
  priority?: 'high' | 'medium' | 'low';
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  isPositive, 
  icon, 
  subtitle,
  trend = 'stable',
  priority = 'medium' 
}: MetricCardProps) {
  const { t } = useTranslationWithFallback();
  
  const cardClasses = cn(
    "group relative overflow-hidden transition-all duration-300 ease-out",
    "hover:scale-[1.02] hover:shadow-brand-lg",
    "bg-gradient-card border border-border/50",
    "before:absolute before:inset-0 before:bg-gradient-mesh before:opacity-0",
    "before:transition-opacity before:duration-300 hover:before:opacity-[0.02]",
    priority === 'high' && "ring-1 ring-primary/20",
    priority === 'medium' && "shadow-brand-sm",
    priority === 'low' && "opacity-95"
  );

  const iconClasses = cn(
    "transition-all duration-300 group-hover:scale-110",
    "p-2.5 rounded-lg bg-primary/10 text-primary",
    priority === 'high' && "bg-primary/20 animate-pulse-glow",
  );

  return (
    <Card className={cardClasses}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div className="space-y-1 flex-1 min-w-0">
          <CardTitle className="text-sm font-medium text-muted-foreground leading-tight line-clamp-2">
            {title}
          </CardTitle>
          {subtitle && (
            <p className="text-xs text-muted-foreground/80 line-clamp-1">
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <div className={iconClasses}>
            {icon}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              {value}
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {isPositive ? (
                  <TrendingUp className="h-3 w-3 text-success flex-shrink-0" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-destructive flex-shrink-0" />
                )}
                <span className={cn(
                  "text-sm font-medium",
                  isPositive ? 'text-success' : 'text-destructive'
                )}>
                  {change}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {t('dashboard.from_last_month')}
              </span>
            </div>
          </div>
          
          {/* Mini trend indicator */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1.5 w-2 rounded-full transition-all duration-300",
                    i < (isPositive ? 4 : 2) 
                      ? "bg-success/60" 
                      : "bg-muted",
                    "group-hover:animate-pulse"
                  )}
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
            <div className="text-xs text-muted-foreground/60 uppercase tracking-wider">
              {trend}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}