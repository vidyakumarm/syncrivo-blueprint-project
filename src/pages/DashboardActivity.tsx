import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  RefreshCw,
  Download
} from 'lucide-react';

interface ActivityLog {
  id: string;
  timestamp: string;
  integration: string;
  action: string;
  status: 'success' | 'error' | 'pending';
  duration: string;
  recordsProcessed: number;
  details: string;
}

export default function DashboardActivity() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activities] = useState<ActivityLog[]>([
    {
      id: '1',
      timestamp: '2024-01-15 14:32:15',
      integration: 'Slack Workspace',
      action: 'Data Sync',
      status: 'success',
      duration: '2.1s',
      recordsProcessed: 247,
      details: 'Successfully synced messages and channel data'
    },
    {
      id: '2',
      timestamp: '2024-01-15 14:30:45',
      integration: 'Google Drive',
      action: 'File Sync',
      status: 'error',
      duration: '5.8s',
      recordsProcessed: 0,
      details: 'Authentication failed - token expired'
    },
    {
      id: '3',
      timestamp: '2024-01-15 14:28:20',
      integration: 'Notion Database',
      action: 'Schema Update',
      status: 'success',
      duration: '1.4s',
      recordsProcessed: 156,
      details: 'Updated database schema and synced records'
    },
    {
      id: '4',
      timestamp: '2024-01-15 14:25:10',
      integration: 'Airtable Base',
      action: 'Data Sync',
      status: 'pending',
      duration: '0.0s',
      recordsProcessed: 0,
      details: 'Sync queued and waiting to process'
    },
    {
      id: '5',
      timestamp: '2024-01-15 14:22:35',
      integration: 'Trello Board',
      action: 'Card Sync',
      status: 'success',
      duration: '3.2s',
      recordsProcessed: 89,
      details: 'Synced cards, lists, and board metadata'
    },
    {
      id: '6',
      timestamp: '2024-01-15 14:20:12',
      integration: 'Slack Workspace',
      action: 'User Sync',
      status: 'success',
      duration: '1.8s',
      recordsProcessed: 45,
      details: 'Updated user profiles and status information'
    },
  ]);

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.integration.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.details.toLowerCase().includes(searchTerm.toLowerCase());
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
      case 'success': return <Badge className="bg-success text-success-foreground">Success</Badge>;
      case 'error': return <Badge className="bg-destructive text-destructive-foreground">Error</Badge>;
      case 'pending': return <Badge className="bg-accent text-accent-foreground">Pending</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Activity Log</h1>
            <p className="text-muted-foreground">Monitor all sync activities and integration events</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Activity List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Recent Activities</CardTitle>
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
                          {activity.integration} - {activity.action}
                        </h4>
                        {getStatusBadge(activity.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {activity.details}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{activity.timestamp}</span>
                        <span>Duration: {activity.duration}</span>
                        <span>Records: {activity.recordsProcessed.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredActivities.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No activities found matching your filters.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}