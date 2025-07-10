import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';

export function EnhancedSocialLoginButtons() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSocialLogin = async (provider: 'google' | 'azure') => {
    setLoading(provider);
    
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: redirectUrl
        }
      });

      if (error) {
        toast.error(`Failed to sign in with ${provider === 'azure' ? 'Microsoft' : 'Google'}`);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(null);
    }
  };

  const providers = [
    {
      id: 'google' as const,
      name: 'Google',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      )
    },
    {
      id: 'azure' as const,
      name: 'Microsoft',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#F25022" d="M0 0h11.45v11.45H0z"/>
          <path fill="#00A4EF" d="M12.55 0H24v11.45H12.55z"/>
          <path fill="#7FBA00" d="M0 12.55h11.45V24H0z"/>
          <path fill="#FFB900" d="M12.55 12.55H24V24H12.55z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {providers.map((provider) => {
          const isLoading = loading === provider.id;
          
          return (
            <Button
              key={provider.id}
              variant="outline"
              onClick={() => handleSocialLogin(provider.id)}
              disabled={!!loading}
              className="w-full h-12 border-border hover:bg-muted/50 transition-all duration-200 hover:scale-[1.02]"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {provider.icon}
                  <span className="ml-3 font-medium">Continue with {provider.name}</span>
                </>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}