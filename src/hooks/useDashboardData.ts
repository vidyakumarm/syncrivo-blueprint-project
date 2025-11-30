import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Connection {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'paused' | 'error';
  last_sync: string | null;
  sync_count: number;
  icon: string;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  connection_id: string | null;
  action: string;
  status: 'success' | 'error' | 'pending';
  duration: number | null;
  records_processed: number;
  details: string | null;
  error_message: string | null;
  created_at: string;
  connections?: { name: string; type: string };
}

export interface DashboardMetric {
  id: string;
  metric_type: string;
  value: number;
  timestamp: string;
  metadata: any;
}

export interface UserPreferences {
  id: string;
  email_notifications: boolean;
  push_notifications: boolean;
  sync_frequency: string;
  timezone: string;
  theme: string;
}

// Demo data for showcasing the platform
const DEMO_CONNECTIONS: Connection[] = [
  {
    id: 'demo-1',
    name: 'Company Slack',
    type: 'Slack',
    status: 'active',
    last_sync: new Date(Date.now() - 300000).toISOString(), // 5 min ago
    sync_count: 1247,
    icon: '💬',
    created_at: new Date(Date.now() - 86400000 * 30).toISOString() // 30 days ago
  },
  {
    id: 'demo-2',
    name: 'Sales Team',
    type: 'Microsoft Teams',
    status: 'active',
    last_sync: new Date(Date.now() - 180000).toISOString(), // 3 min ago
    sync_count: 892,
    icon: '👥',
    created_at: new Date(Date.now() - 86400000 * 25).toISOString()
  },
  {
    id: 'demo-3',
    name: 'Dev Community',
    type: 'Discord',
    status: 'active',
    last_sync: new Date(Date.now() - 420000).toISOString(), // 7 min ago
    sync_count: 2156,
    icon: '🎮',
    created_at: new Date(Date.now() - 86400000 * 45).toISOString()
  },
  {
    id: 'demo-4',
    name: 'Support Desk',
    type: 'Intercom',
    status: 'active',
    last_sync: new Date(Date.now() - 600000).toISOString(), // 10 min ago
    sync_count: 534,
    icon: '💼',
    created_at: new Date(Date.now() - 86400000 * 20).toISOString()
  },
  {
    id: 'demo-5',
    name: 'Marketing Hub',
    type: 'Google Chat',
    status: 'active',
    last_sync: new Date(Date.now() - 240000).toISOString(), // 4 min ago
    sync_count: 678,
    icon: '📢',
    created_at: new Date(Date.now() - 86400000 * 35).toISOString()
  }
];

// Hook for connections data
export function useConnections() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  console.log('🔗 [useConnections] Hook initialized', {
    timestamp: new Date().toISOString(),
    hasUser: !!user,
    userId: user?.id || null
  });

  useEffect(() => {
    if (!user) return;

    const fetchConnections = async () => {
      console.log('🔗 [useConnections] Fetching connections', {
        timestamp: new Date().toISOString(),
        userId: user?.id
      });
      
      const { data, error } = await supabase
        .from('connections')
        .select('*')
        .order('created_at', { ascending: false });
      
      console.log('🔗 [useConnections] Fetch result', {
        timestamp: new Date().toISOString(),
        success: !error,
        connectionCount: data?.length || 0,
        error: error?.message || null
      });
      
      if (!error && data) {
        // Use demo data if no real connections exist
        setConnections(data.length > 0 ? data as Connection[] : DEMO_CONNECTIONS);
      } else {
        setConnections(DEMO_CONNECTIONS);
      }
      setLoading(false);
    };

    fetchConnections();

    // Real-time subscription
    const channel = supabase
      .channel('connections-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'connections',
          filter: `user_id=eq.${user.id}`
        },
        () => fetchConnections()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const addConnection = async (connection: Omit<Connection, 'id' | 'created_at' | 'user_id'>) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('connections')
      .insert([{ ...connection, user_id: user.id }]);
    
    return !error;
  };

  const updateConnection = async (id: string, updates: Partial<Connection>) => {
    const { error } = await supabase
      .from('connections')
      .update(updates)
      .eq('id', id);
    
    return !error;
  };

  const deleteConnection = async (id: string) => {
    const { error } = await supabase
      .from('connections')
      .delete()
      .eq('id', id);
    
    return !error;
  };

  return { connections, loading, addConnection, updateConnection, deleteConnection };
}

// Demo activity logs for showcasing
const DEMO_ACTIVITIES: ActivityLog[] = [
  {
    id: 'demo-act-1',
    connection_id: 'demo-1',
    action: 'Message sync',
    status: 'success',
    duration: 2.3,
    records_processed: 1547,
    details: 'Synchronized 1,547 messages from #general, #engineering, and 12 other channels',
    error_message: null,
    created_at: new Date(Date.now() - 300000).toISOString(),
    connections: { name: 'Company Slack', type: 'Slack' }
  },
  {
    id: 'demo-act-2',
    connection_id: 'demo-2',
    action: 'User sync',
    status: 'success',
    duration: 1.8,
    records_processed: 342,
    details: 'Updated 342 user profiles and presence status',
    error_message: null,
    created_at: new Date(Date.now() - 420000).toISOString(),
    connections: { name: 'Sales Team', type: 'Microsoft Teams' }
  },
  {
    id: 'demo-act-3',
    connection_id: 'demo-3',
    action: 'Channel sync',
    status: 'success',
    duration: 3.1,
    records_processed: 2834,
    details: 'Synchronized 2,834 messages across 15 Discord channels',
    error_message: null,
    created_at: new Date(Date.now() - 540000).toISOString(),
    connections: { name: 'Dev Community', type: 'Discord' }
  },
  {
    id: 'demo-act-4',
    connection_id: 'demo-4',
    action: 'Ticket sync',
    status: 'success',
    duration: 1.5,
    records_processed: 156,
    details: 'Processed 156 support tickets and customer conversations',
    error_message: null,
    created_at: new Date(Date.now() - 660000).toISOString(),
    connections: { name: 'Support Desk', type: 'Intercom' }
  },
  {
    id: 'demo-act-5',
    connection_id: 'demo-5',
    action: 'Message sync',
    status: 'success',
    duration: 2.7,
    records_processed: 891,
    details: 'Synchronized 891 messages from marketing team spaces',
    error_message: null,
    created_at: new Date(Date.now() - 780000).toISOString(),
    connections: { name: 'Marketing Hub', type: 'Google Chat' }
  },
  {
    id: 'demo-act-6',
    connection_id: 'demo-1',
    action: 'File sync',
    status: 'success',
    duration: 4.2,
    records_processed: 234,
    details: 'Synchronized 234 files and attachments',
    error_message: null,
    created_at: new Date(Date.now() - 900000).toISOString(),
    connections: { name: 'Company Slack', type: 'Slack' }
  },
  {
    id: 'demo-act-7',
    connection_id: 'demo-2',
    action: 'Calendar sync',
    status: 'success',
    duration: 1.2,
    records_processed: 89,
    details: 'Updated 89 calendar events and meetings',
    error_message: null,
    created_at: new Date(Date.now() - 1020000).toISOString(),
    connections: { name: 'Sales Team', type: 'Microsoft Teams' }
  },
  {
    id: 'demo-act-8',
    connection_id: 'demo-3',
    action: 'Voice channel sync',
    status: 'success',
    duration: 0.9,
    records_processed: 45,
    details: 'Synchronized 45 voice channel sessions',
    error_message: null,
    created_at: new Date(Date.now() - 1140000).toISOString(),
    connections: { name: 'Dev Community', type: 'Discord' }
  }
];

// Hook for activity logs
export function useActivityLogs() {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  console.log('📋 [useActivityLogs] Hook initialized', {
    timestamp: new Date().toISOString(),
    hasUser: !!user,
    userId: user?.id || null
  });

  useEffect(() => {
    if (!user) return;

    const fetchActivities = async () => {
      console.log('📋 [useActivityLogs] Fetching activities', {
        timestamp: new Date().toISOString(),
        userId: user?.id
      });
      
      const { data, error } = await supabase
        .from('activity_logs')
        .select(`
          *,
          connections:connection_id (name, type)
        `)
        .order('created_at', { ascending: false })
        .limit(50);
      
      console.log('📋 [useActivityLogs] Fetch result', {
        timestamp: new Date().toISOString(),
        success: !error,
        activityCount: data?.length || 0,
        error: error?.message || null
      });
      
      if (!error && data) {
        // Use demo data if no real activities exist
        setActivities(data.length > 0 ? data as ActivityLog[] : DEMO_ACTIVITIES);
      } else {
        setActivities(DEMO_ACTIVITIES);
      }
      setLoading(false);
    };

    fetchActivities();

    // Real-time subscription
    const channel = supabase
      .channel('activity-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'activity_logs',
          filter: `user_id=eq.${user.id}`
        },
        () => fetchActivities()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const addActivity = async (activity: Omit<ActivityLog, 'id' | 'created_at' | 'user_id'>) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('activity_logs')
      .insert([{ ...activity, user_id: user.id }]);
    
    return !error;
  };

  return { activities, loading, addActivity };
}

// Demo metrics for showcasing
const DEMO_METRICS: DashboardMetric[] = Array.from({ length: 24 }, (_, i) => {
  const now = Date.now();
  const hourAgo = now - (i * 3600000); // Each hour back
  return {
    id: `demo-metric-${i}`,
    metric_type: 'messages_synced',
    value: Math.floor(Math.random() * 500) + 300, // Random between 300-800
    timestamp: new Date(hourAgo).toISOString(),
    metadata: { demo: true }
  };
});

// Hook for dashboard metrics
export function useDashboardMetrics() {
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchMetrics = async () => {
      const { data, error } = await supabase
        .from('dashboard_metrics')
        .select('*')
        .order('timestamp', { ascending: false });
      
      if (!error && data) {
        // Use demo data if no real metrics exist
        setMetrics(data.length > 0 ? data : DEMO_METRICS);
      } else {
        setMetrics(DEMO_METRICS);
      }
      setLoading(false);
    };

    fetchMetrics();

    // Real-time subscription
    const channel = supabase
      .channel('metrics-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'dashboard_metrics',
          filter: `user_id=eq.${user.id}`
        },
        () => fetchMetrics()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const addMetric = async (metric: Omit<DashboardMetric, 'id' | 'timestamp' | 'user_id'>) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('dashboard_metrics')
      .insert([{ ...metric, user_id: user.id }]);
    
    return !error;
  };

  return { metrics, loading, addMetric };
}

// Hook for user preferences
export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchPreferences = async () => {
      let { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code === 'PGRST116') {
        // No preferences found, create default ones
        const defaultPrefs = {
          user_id: user.id,
          email_notifications: true,
          push_notifications: true,
          sync_frequency: 'hourly',
          timezone: 'UTC',
          theme: 'system'
        };
        
        const { data: newData, error: insertError } = await supabase
          .from('user_preferences')
          .insert([defaultPrefs])
          .select()
          .single();
        
        if (!insertError && newData) {
          setPreferences(newData);
        }
      } else if (!error && data) {
        setPreferences(data);
      }
      setLoading(false);
    };

    fetchPreferences();

    // Real-time subscription
    const channel = supabase
      .channel('preferences-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_preferences',
          filter: `user_id=eq.${user.id}`
        },
        () => fetchPreferences()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    if (!user || !preferences) return false;
    
    const { error } = await supabase
      .from('user_preferences')
      .update(updates)
      .eq('user_id', user.id);
    
    return !error;
  };

  return { preferences, loading, updatePreferences };
}