import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Settings, 
  Play, 
  Pause,
  Activity,
  AlertCircle
} from 'lucide-react';

interface Connection {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'paused' | 'error';
  lastSync: string;
  syncCount: number;
  icon: string;
}

export default function DashboardConnections() {
  const [searchTerm, setSearchTerm] = useState('');
  const [connections, setConnections] = useState<Connection[]>([
    {
      id: '1',
      name: 'Slack Workspace',
      type: 'Communication',
      status: 'active',
      lastSync: '2 minutes ago',
      syncCount: 245,
      icon: '💬'
    },
    {
      id: '2',
      name: 'Google Drive',
      type: 'Storage',
      status: 'error',
      lastSync: '5 minutes ago',
      syncCount: 189,
      icon: '📁'
    },
    {
      id: '3',
      name: 'Notion Database',
      type: 'Productivity',
      status: 'active',
      lastSync: '1 minute ago',
      syncCount: 412,
      icon: '📝'
    },
    {
      id: '4',
      name: 'Airtable Base',
      type: 'Database',
      status: 'paused',
      lastSync: '1 hour ago',
      syncCount: 67,
      icon: '🗃️'
    },
    {
      id: '5',
      name: 'Trello Board',
      type: 'Project Management',
      status: 'active',
      lastSync: '30 seconds ago',
      syncCount: 156,
      icon: '📋'
    },
  ]);

  const filteredConnections = connections.filter(connection =>
    connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    connection.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleConnectionStatus = (connectionId: string) => {
    setConnections(prev => prev.map(conn => 
      conn.id === connectionId 
        ? { ...conn, status: conn.status === 'active' ? 'paused' : 'active' as 'active' | 'paused' | 'error' }
        : conn
    ));
  };

  const handleSettingsClick = (connectionId: string) => {
    console.log('Opening settings for connection:', connectionId);
    // Navigation to settings page would go here
  };

  const handleNewConnection = () => {
    console.log('Opening new connection dialog');
    // Navigation to new connection flow would go here
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'paused': return 'bg-accent text-accent-foreground';
      case 'error': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Activity className="h-3 w-3" />;
      case 'paused': return <Pause className="h-3 w-3" />;
      case 'error': return <AlertCircle className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Connections</h1>
            <p className="text-muted-foreground">Manage your integrations and sync settings</p>
          </div>
          <Button className="bg-gradient-primary" onClick={handleNewConnection}>
            <Plus className="h-4 w-4 mr-2" />
            New Connection
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search connections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Connections Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredConnections.map((connection) => (
            <Card key={connection.id} className="bg-gradient-card shadow-brand-sm hover:shadow-brand-md transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{connection.icon}</span>
                    <div>
                      <CardTitle className="text-lg">{connection.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{connection.type}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(connection.status)} flex items-center space-x-1`}>
                    {getStatusIcon(connection.status)}
                    <span className="capitalize">{connection.status}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last sync:</span>
                    <span className="text-foreground">{connection.lastSync}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total syncs:</span>
                    <span className="text-foreground">{connection.syncCount.toLocaleString()}</span>
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => toggleConnectionStatus(connection.id)}
                    >
                      {connection.status === 'active' ? (
                        <>
                          <Pause className="h-3 w-3 mr-1" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-3 w-3 mr-1" />
                          Resume
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSettingsClick(connection.id)}
                    >
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredConnections.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No connections found matching your search.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}