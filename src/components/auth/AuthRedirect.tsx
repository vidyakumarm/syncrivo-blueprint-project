import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AuthRedirectProps {
  children: React.ReactNode;
}

/**
 * Redirects authenticated users away from public pages (like login/signup)
 * to the dashboard or their intended destination
 */
export function AuthRedirect({ children }: AuthRedirectProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && user) {
      // Get the redirect destination from state or default to dashboard
      const from = (location.state as { from?: string })?.from || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, location.state]);

  // Show nothing while checking auth to prevent flash
  if (loading) {
    return null;
  }

  // If user is authenticated, don't render children (redirect will happen)
  if (user) {
    return null;
  }

  return <>{children}</>;
}
