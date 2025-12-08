
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
import { Loader2, Mail, Lock, User } from 'lucide-react';
import { AuthIllustration } from '@/components/auth/AuthIllustration';

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
      toast.error(t('signup.error_fill_fields', 'Please fill in all required fields'));
      return;
    }

    if (password.length < 6) {
      toast.error(t('signup.error_password_length', 'Password must be at least 6 characters long'));
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
          toast.error(t('signup.error_already_registered', 'This email is already registered. Please sign in instead.'));
        } else {
          toast.error(error.message);
        }
      } else {
        console.log('🔑 [Signup] Sign up successful', {
          timestamp: new Date().toISOString(),
          email
        });
        toast.success(t('signup.success_created', 'Account created successfully! Please check your email to verify your account.'));
        navigate('/login');
      }
    } catch (error) {
      console.error('🔑 [Signup] Unexpected error', {
        timestamp: new Date().toISOString(),
        error
      });
      toast.error(t('signup.error_unexpected', 'An unexpected error occurred'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Ambient background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid" />
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full w-96 h-96 blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full w-72 h-72 blur-3xl" />

      <Navigation />
      <main className="relative z-10 pt-16">
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">

              {/* Left Column - Illustration */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="relative w-full max-w-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl transform scale-125 animate-pulse" style={{ animationDuration: '4s' }} />
                  <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-accent/30 to-primary/30 rounded-full blur-2xl" />
                  <div className="absolute bottom-8 left-8 w-20 h-20 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-full blur-2xl" />
                  <div className="relative z-10 bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-sm rounded-3xl p-8 border border-border/30 shadow-xl">
                    <AuthIllustration />
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="w-full max-w-md mx-auto lg:mx-0">
                <Card className="border-0 shadow-xl bg-card/95 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-2xl text-center">{t('signup.title', 'Create Account')}</CardTitle>
                    <p className="text-center text-muted-foreground text-sm">
                      {t('signup.subtitle', 'Get started with your free account')}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="displayName">{t('signup.display_name', 'Display Name')} ({t('common.optional', 'Optional')})</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="displayName"
                            type="text"
                            placeholder={t('signup.display_name_placeholder', 'Your display name')}
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t('signup.email', 'Email')} *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder={t('signup.email_placeholder', 'your@email.com')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">{t('signup.password', 'Password')} *</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type="password"
                            placeholder={t('signup.password_placeholder', 'At least 6 characters')}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-primary"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t('common.loading', 'Loading...')}
                          </>
                        ) : (
                          t('signup.create_account', 'Create Account')
                        )}
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
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
