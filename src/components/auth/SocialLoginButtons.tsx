
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

// Import correct icons from lucide-react
import { Apple, Slack } from 'lucide-react';

export function SocialLoginButtons() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSocialLogin = async (provider: 'google' | 'apple' | 'slack') => {
    console.log(`🔑 [SocialLogin] ${provider} sign in attempt`, {
      timestamp: new Date().toISOString(),
      provider
    });
    
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
        console.log(`🔑 [SocialLogin] ${provider} sign in failed`, {
          timestamp: new Date().toISOString(),
          error: error.message
        });
        toast.error(`Failed to sign in with ${provider}`);
      } else {
        console.log(`🔑 [SocialLogin] ${provider} sign in initiated`, {
          timestamp: new Date().toISOString(),
          provider
        });
        // The user will be redirected to the OAuth provider
        // No need to manually navigate here
      }
    } catch (error) {
      console.error(`🔑 [SocialLogin] ${provider} unexpected error`, {
        timestamp: new Date().toISOString(),
        error
      });
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(null);
    }
  };

  const socialProviders = [
    {
      name: 'google',
      label: 'Google',
      icon: '🟢', // Using emoji since Google icon doesn't exist in lucide-react
      bgColor: 'bg-white hover:bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    {
      name: 'apple',
      label: 'Apple',
      icon: Apple,
      bgColor: 'bg-black hover:bg-gray-800',
      textColor: 'text-white',
      borderColor: 'border-black'
    },
    {
      name: 'slack',
      label: 'Slack',
      icon: Slack,
      bgColor: 'bg-[#4A154B] hover:bg-[#611f69]',
      textColor: 'text-white',
      borderColor: 'border-[#4A154B]'
    }
  ] as const;

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {t('login.or_continue_with', 'Or continue with')}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {socialProviders.map((provider) => {
          const isLoading = loading === provider.name;
          
          return (
            <Button
              key={provider.name}
              variant="outline"
              onClick={() => handleSocialLogin(provider.name)}
              disabled={!!loading}
              className={`${provider.bgColor} ${provider.textColor} ${provider.borderColor} border transition-colors flex items-center justify-center`}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent animate-spin rounded-full" />
              ) : (
                <>
                  {typeof provider.icon === 'string' ? (
                    <span className="w-4 h-4 flex items-center justify-center text-sm">{provider.icon}</span>
                  ) : (
                    <provider.icon className="w-4 h-4" />
                  )}
                </>
              )}
              <span className="ml-2">{provider.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
