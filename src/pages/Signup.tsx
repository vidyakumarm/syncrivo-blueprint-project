
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

export default function Signup() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp, user } = useAuth();
  const navigate = useNavigate();

  console.log('🔑 [Signup] Component mounted', {
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
    
    console.log('🔑 [Signup] Form submission attempt', {
      timestamp: new Date().toISOString(),
      email,
      hasPassword: !!password,
      hasDisplayName: !!displayName
    });
    
    if (!email || !password) {
      console.log('🔑 [Signup] Validation failed - missing fields');
      toast.error('Please fill in all required fields');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await signUp(email, password, displayName);
      
      if (error) {
        console.log('🔑 [Signup] Sign up failed', {
          timestamp: new Date().toISOString(),
          error: error.message
        });
        if (error.message.includes('User already registered')) {
          toast.error('This email is already registered. Please sign in instead.');
        } else {
          toast.error(error.message);
        }
      } else {
        console.log('🔑 [Signup] Sign up successful', {
          timestamp: new Date().toISOString(),
          email
        });
        toast.success('Account created successfully! Please check your email to verify your account.');
        navigate('/login');
      }
    } catch (error) {
      console.error('🔑 [Signup] Unexpected error', {
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
                <CardTitle className="text-2xl text-center">{t('signup.title', 'Create Account')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="displayName">{t('signup.display_name', 'Display Name')} (Optional)</Label>
                    <Input 
                      id="displayName" 
                      type="text" 
                      placeholder="Your display name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">{t('signup.email', 'Email')} *</Label>
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
                    <Label htmlFor="password">{t('signup.password', 'Password')} *</Label>
                    <Input 
                      id="password" 
                      type="password"
                      placeholder="At least 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary" 
                    disabled={loading}
                  >
                    {loading ? t('common.loading', 'Loading...') : t('signup.create_account', 'Create Account')}
                  </Button>
                </form>

                <SocialLoginButtons />

                <p className="text-center text-sm text-muted-foreground">
                  {t('signup.already_have_account', 'Already have an account?')}{' '}
                  <Link to="/login" className="text-primary hover:underline">
                    {t('signup.sign_in', 'Sign in')}
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
