
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  console.log('🔑 [Login] Component mounted', {
    timestamp: new Date().toISOString(),
    hasUser: !!user,
    path: window.location.pathname
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🔑 [Login] Form submission attempt', {
      timestamp: new Date().toISOString(),
      email,
      hasPassword: !!password
    });
    
    if (!email || !password) {
      console.log('🔑 [Login] Validation failed - missing fields');
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        console.log('🔑 [Login] Sign in failed', {
          timestamp: new Date().toISOString(),
          error: error.message
        });
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Invalid email or password');
        } else {
          toast.error(error.message);
        }
      } else {
        console.log('🔑 [Login] Sign in successful', {
          timestamp: new Date().toISOString(),
          email
        });
        toast.success('Welcome back!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('🔑 [Login] Unexpected error', {
        timestamp: new Date().toISOString(),
        error
      });
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <section className="py-20">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">{t('login.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="email">{t('login.email')}</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">{t('login.password')}</Label>
                    <Input 
                      id="password" 
                      type="password"
                      placeholder="Your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary" 
                    disabled={loading}
                  >
                    {loading ? t('common.loading') : t('login.sign_in')}
                  </Button>
                </form>

                <SocialLoginButtons />

                <p className="text-center text-sm text-muted-foreground">
                  {t('login.dont_have_account')}{' '}
                  <Link to="/signup" className="text-primary hover:underline">
                    {t('login.sign_up')}
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
