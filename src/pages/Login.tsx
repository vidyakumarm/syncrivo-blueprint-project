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
import { Loader2, Mail, Lock } from 'lucide-react';
import { AuthIllustration } from '@/components/auth/AuthIllustration';

export default function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error(t('login.error_fill_fields', 'Please fill in all required fields'));
      return;
    }

    setLoading(true);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error(t('login.error_invalid_credentials', 'Incorrect email or password. Please try again.'));
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success(t('login.success_welcome', 'Welcome back!'));
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(t('login.error_unexpected', 'An unexpected error occurred'));
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
                  <CardHeader className="space-y-2 pb-6">
                    <CardTitle className="text-2xl lg:text-3xl text-center font-bold">
                      {t('login.title', 'Welcome Back')}
                    </CardTitle>
                    <p className="text-center text-muted-foreground text-sm">
                      {t('login.subtitle', 'Sign in to continue to SyncRivo')}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          {t('login.email', 'Email')}
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder={t('login.email_placeholder', 'your@email.com')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password" className="text-sm font-medium">
                            {t('login.password', 'Password')}
                          </Label>
                          <Link
                            to="/forgot-password"
                            className="text-xs text-primary hover:underline"
                          >
                            {t('login.forgot_password', 'Forgot password?')}
                          </Link>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type="password"
                            placeholder={t('login.password_placeholder', 'Enter your password')}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-medium h-11"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t('login.signing_in', 'Signing in...')}
                          </>
                        ) : (
                          t('login.sign_in', 'Sign In')
                        )}
                      </Button>
                    </form>

                    <SocialLoginButtons />

                    <p className="text-center text-sm text-muted-foreground">
                      {t('login.no_account', "Don't have an account?")}{' '}
                      <Link to="/signup" className="text-primary font-medium hover:underline">
                        {t('login.sign_up_link', 'Sign up')}
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

