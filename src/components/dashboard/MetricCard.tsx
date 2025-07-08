import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useTranslationWithFallback } from '@/hooks/useTranslationWithFallback';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

export function MetricCard({ title, value, change, isPositive, icon }: MetricCardProps) {
  const { t } = useTranslationWithFallback();
  return (
    <Card className="bg-gradient-card shadow-brand-sm hover:shadow-brand-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground leading-tight">
          {title}
        </CardTitle>
        <div className="text-primary flex-shrink-0">
          {icon}
        </div>
      </CardHeader>
      <CardContent className="pt-1">
        <div className="text-xl sm:text-2xl font-bold text-foreground mb-1">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center flex-wrap">
          {isPositive ? (
            <TrendingUp className="h-3 w-3 text-success mr-1 flex-shrink-0" />
          ) : (
            <TrendingDown className="h-3 w-3 text-destructive mr-1 flex-shrink-0" />
          )}
          <span className={`${isPositive ? 'text-success' : 'text-destructive'} mr-1`}>
            {change}
          </span>
          <span>{t('dashboard.from_last_month')}</span>
        </p>
      </CardContent>
    </Card>
  );
}