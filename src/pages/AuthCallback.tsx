import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleCallback = async () => {
            try {
                // Get the current session after OAuth redirect
                const { data: { session }, error } = await supabase.auth.getSession();

                if (error) {
                    console.error('Auth callback error:', error);
                    toast.error('Authentication failed. Please try again.');
                    navigate('/login?error=oauth_failed');
                    return;
                }

                if (session) {
                    // Successfully authenticated
                    toast.success('Successfully signed in!');

                    // Check if there's a redirect URL in session storage
                    const redirectTo = sessionStorage.getItem('auth_redirect');
                    sessionStorage.removeItem('auth_redirect');

                    // Navigate to intended destination or dashboard
                    navigate(redirectTo || '/dashboard');
                } else {
                    // No session found
                    toast.error('No session found. Please try signing in again.');
                    navigate('/login?error=no_session');
                }
            } catch (error) {
                console.error('Unexpected auth callback error:', error);
                toast.error('An unexpected error occurred. Please try again.');
                navigate('/login?error=callback_failed');
            }
        };

        handleCallback();
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-lg font-medium text-foreground mb-2">Completing sign in...</p>
                <p className="text-sm text-muted-foreground">Please wait while we finish your authentication.</p>
            </div>
        </div>
    );
}
