import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useTranslationWithFallback } from '@/hooks/useTranslationWithFallback';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useActivityLogs, type ActivityLog } from '@/hooks/useDashboardData';
import { 
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  RefreshCw,
  Download
} from 'lucide-react';

export default function DashboardActivity() {
  const { t } = useTranslationWithFallback();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { activities, loading } = useActivityLogs();

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = !searchTerm.trim() || 
                         activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.details?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (activity.connections?.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || activity.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'pending': return <Clock className="h-4 w-4 text-accent" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success': return <Badge className="bg-success text-success-foreground">{t('dashboard.activity.status.success')}</Badge>;
      case 'error': return <Badge className="bg-destructive text-destructive-foreground">{t('dashboard.activity.status.error')}</Badge>;
      case 'pending': return <Badge className="bg-accent text-accent-foreground">{t('dashboard.activity.status.pending')}</Badge>;
      default: return <Badge variant="secondary">{t('dashboard.activity.status.unknown')}</Badge>;
    }
  };

  const handleExport = () => {
    const csvHeaders = [
      t('dashboard.activity.csv.timestamp'),
      t('dashboard.activity.csv.integration'),
      t('dashboard.activity.csv.action'),
      t('dashboard.activity.csv.status'),
      t('dashboard.activity.csv.duration'),
      t('dashboard.activity.csv.records_processed'),
      t('dashboard.activity.csv.details')
    ];
    const csvData = filteredActivities.map(activity => [
      new Date(activity.created_at).toLocaleString(),
      activity.connections?.name || t('dashboard.activity.unknown'),
      activity.action,
      activity.status,
      activity.duration ? `${activity.duration}ms` : t('dashboard.activity.na'),
      activity.records_processed.toString(),
      (activity.details || '').replace(/,/g, ';') // Replace commas to avoid CSV issues
    ]);

    const csvContent = [
      csvHeaders.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `activity-log-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    // Simulate refresh delay - in real app this would refetch data
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsRefreshing(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('dashboard.activity.title')}</h1>
            <p className="text-muted-foreground">{t('dashboard.activity.subtitle')}</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? t('dashboard.activity.refreshing') : t('dashboard.activity.refresh')}
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              {t('dashboard.activity.export')}
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('dashboard.activity.search_placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder={t('dashboard.activity.status_filter.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('dashboard.activity.status_filter.all')}</SelectItem>
              <SelectItem value="success">{t('dashboard.activity.status_filter.success')}</SelectItem>
              <SelectItem value="error">{t('dashboard.activity.status_filter.error')}</SelectItem>
              <SelectItem value="pending">{t('dashboard.activity.status_filter.pending')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Activity List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">{t('dashboard.activity.recent_activities')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg bg-gradient-card hover:shadow-brand-sm transition-shadow"
                >
                  <div className="flex items-start space-x-4 flex-1">
                    {getStatusIcon(activity.status)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-foreground">
                          {activity.connections?.name || t('dashboard.activity.unknown')} - {activity.action}
                        </h4>
                        {getStatusBadge(activity.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {activity.details || t('dashboard.activity.no_details')}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{new Date(activity.created_at).toLocaleString()}</span>
                         <span>{t('dashboard.activity.duration')}: {activity.duration ? `${activity.duration}ms` : t('dashboard.activity.na')}</span>
                         <span>{t('dashboard.activity.records')}: {activity.records_processed.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredActivities.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t('dashboard.activity.no_activities')}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}