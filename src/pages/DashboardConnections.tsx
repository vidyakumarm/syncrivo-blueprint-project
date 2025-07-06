import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useConnections } from '@/hooks/useDashboardData';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Search, 
  Settings, 
  Play, 
  Pause,
  Activity,
  AlertCircle
} from 'lucide-react';

export default function DashboardConnections() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<any>(null);
  const [newConnection, setNewConnection] = useState({
    name: '',
    type: '',
    icon: '🔗'
  });
  const { connections, loading, addConnection, updateConnection, deleteConnection } = useConnections();
  const { toast } = useToast();

  const filteredConnections = connections.filter(connection =>
    connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    connection.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleConnectionStatus = async (connectionId: string) => {
    const connection = connections.find(conn => conn.id === connectionId);
    if (!connection) return;
    
    const newStatus = connection.status === 'active' ? 'paused' : 'active';
    const success = await updateConnection(connectionId, { status: newStatus });
    
    if (success) {
      toast({
        title: "Connection updated",
        description: `Connection ${newStatus === 'active' ? 'resumed' : 'paused'} successfully.`,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to update connection status.",
        variant: "destructive",
      });
    }
  };

  const handleSettingsClick = (connectionId: string) => {
    const connection = connections.find(conn => conn.id === connectionId);
    if (connection) {
      setSelectedConnection(connection);
      setSettingsDialogOpen(true);
    }
  };

  const handleUpdateConnection = async () => {
    if (!selectedConnection) return;
    
    const success = await updateConnection(selectedConnection.id, {
      name: selectedConnection.name,
      type: selectedConnection.type,
      icon: selectedConnection.icon,
      status: selectedConnection.status
    });
    
    if (success) {
      toast({
        title: "Connection updated",
        description: "Connection settings updated successfully.",
      });
      setSettingsDialogOpen(false);
      setSelectedConnection(null);
    } else {
      toast({
        title: "Error",
        description: "Failed to update connection.",
        variant: "destructive",
      });
    }
  };

  const handleNewConnection = async () => {
    if (!newConnection.name || !newConnection.type) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    const success = await addConnection({
      name: newConnection.name,
      type: newConnection.type,
      status: 'active',
      last_sync: null,
      sync_count: 0,
      icon: newConnection.icon
    });
    
    if (success) {
      toast({
        title: "Connection created",
        description: "New connection added successfully.",
      });
      setNewConnection({ name: '', type: '', icon: '🔗' });
      setIsDialogOpen(false);
    } else {
      toast({
        title: "Error",
        description: "Failed to create connection.",
        variant: "destructive",
      });
    }
  };

  const connectionTypes = [
    'Microsoft Teams',
    'Webex Teams', 
    'Google Chat',
    'Zoom Chat',
    'Slack',
    'Discord',
    'Mattermost',
    'Telegram'
  ];

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
            <h1 className="text-3xl font-bold text-foreground">{t('dashboard.connections.title')}</h1>
            <p className="text-muted-foreground">{t('dashboard.connections.subtitle')}</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                Connect Platform
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Connect New Messaging Platform</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Platform Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Marketing Team Slack, Sales Webex"
                    value={newConnection.name}
                    onChange={(e) => setNewConnection(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Platform Type</Label>
                  <Select value={newConnection.type} onValueChange={(value) => setNewConnection(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select messaging platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {connectionTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="icon">Icon (Emoji)</Label>
                  <Input
                    id="icon"
                    placeholder="🔗"
                    value={newConnection.icon}
                    onChange={(e) => setNewConnection(prev => ({ ...prev, icon: e.target.value }))}
                    maxLength={2}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleNewConnection}
                  disabled={!newConnection.name || !newConnection.type}
                  className="bg-gradient-primary"
                >
                  Connect Platform
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messaging platforms..."
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
                    <span className="text-foreground">{connection.last_sync || 'Never'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total syncs:</span>
                    <span className="text-foreground">{connection.sync_count.toLocaleString()}</span>
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
            <p className="text-muted-foreground">No messaging platforms found matching your search.</p>
          </div>
        )}

        {/* Settings Dialog */}
        <Dialog open={settingsDialogOpen} onOpenChange={setSettingsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Platform Settings</DialogTitle>
            </DialogHeader>
            {selectedConnection && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="settings-name">Platform Name</Label>
                  <Input
                    id="settings-name"
                    value={selectedConnection.name}
                    onChange={(e) => setSelectedConnection(prev => prev ? { ...prev, name: e.target.value } : null)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="settings-type">Platform Type</Label>
                  <Select value={selectedConnection.type} onValueChange={(value) => setSelectedConnection(prev => prev ? { ...prev, type: value } : null)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {connectionTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="settings-icon">Icon (Emoji)</Label>
                  <Input
                    id="settings-icon"
                    value={selectedConnection.icon}
                    onChange={(e) => setSelectedConnection(prev => prev ? { ...prev, icon: e.target.value } : null)}
                    maxLength={2}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="settings-status">Status</Label>
                  <Select 
                    value={selectedConnection.status} 
                    onValueChange={(value: 'active' | 'paused' | 'error') => 
                      setSelectedConnection(prev => prev ? { ...prev, status: value } : null)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setSettingsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateConnection} className="bg-gradient-primary">
                Update Platform
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}