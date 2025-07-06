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

// Hook for connections data
export function useConnections() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchConnections = async () => {
      const { data, error } = await supabase
        .from('connections')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setConnections(data as Connection[]);
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

// Hook for activity logs
export function useActivityLogs() {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchActivities = async () => {
      const { data, error } = await supabase
        .from('activity_logs')
        .select(`
          *,
          connections:connection_id (name, type)
        `)
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (!error && data) {
        setActivities(data as ActivityLog[]);
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
        setMetrics(data);
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