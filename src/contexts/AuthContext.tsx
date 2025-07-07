
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  console.log('🔐 [AuthProvider] Component initialized', {
    timestamp: new Date().toISOString(),
    initialState: { user: null, session: null, loading: true }
  });

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('🔐 [AuthProvider] Auth state changed', {
          timestamp: new Date().toISOString(),
          event,
          userId: session?.user?.id || null,
          userEmail: session?.user?.email || null,
          hasSession: !!session,
          provider: session?.user?.app_metadata?.provider || null
        });
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Handle successful social login redirects
        if (event === 'SIGNED_IN' && session?.user) {
          const provider = session.user.app_metadata?.provider;
          if (provider && provider !== 'email') {
            console.log('🔐 [AuthProvider] Social login successful', {
              timestamp: new Date().toISOString(),
              provider,
              userId: session.user.id
            });
            // The user will be automatically redirected to dashboard by the route protection
          }
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('🔐 [AuthProvider] Retrieved existing session', {
        timestamp: new Date().toISOString(),
        hasSession: !!session,
        userId: session?.user?.id || null,
        provider: session?.user?.app_metadata?.provider || null
      });
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, displayName?: string) => {
    console.log('🔐 [AuthProvider] Sign up attempt', {
      timestamp: new Date().toISOString(),
      email,
      hasDisplayName: !!displayName
    });
    
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          display_name: displayName
        }
      }
    });
    
    console.log('🔐 [AuthProvider] Sign up result', {
      timestamp: new Date().toISOString(),
      success: !error,
      error: error?.message || null
    });
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    console.log('🔐 [AuthProvider] Sign in attempt', {
      timestamp: new Date().toISOString(),
      email
    });
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    console.log('🔐 [AuthProvider] Sign in result', {
      timestamp: new Date().toISOString(),
      success: !error,
      error: error?.message || null
    });
    
    return { error };
  };

  const signOut = async () => {
    console.log('🔐 [AuthProvider] Sign out initiated', {
      timestamp: new Date().toISOString(),
      userId: user?.id || null
    });
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signUp,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
