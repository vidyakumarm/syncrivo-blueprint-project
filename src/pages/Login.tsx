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
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Incorrect email or password. Please try again.');
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success('Welcome back!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
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
                    <LoginIllustration />
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
                      Sign in to continue to SyncRivo
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
                            placeholder="your@email.com"
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
                            Forgot password?
                          </Link>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="password" 
                            type="password"
                            placeholder="Enter your password"
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
                            Signing in...
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
                        {t('login.sign_up', 'Sign up')}
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

// Compact illustration showing multi-platform connectivity
function LoginIllustration() {
  return (
    <div className="relative w-full aspect-square max-w-xs mx-auto">
      {/* Central SyncRivo hub */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-primary-foreground/20 animate-[spin_10s_linear_infinite]" />
          <span className="text-primary-foreground font-bold text-base">Sync</span>
        </div>
      </div>
      
      {/* Orbiting platforms */}
      <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
        {/* Teams - Top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
          <div className="w-12 h-12 rounded-xl bg-card border border-border shadow-md flex items-center justify-center animate-[spin_20s_linear_infinite_reverse]">
            <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
              <path d="M20.5 .5v5h-5v-5h5zm-11 0v5h-5v-5h5zm11 11v5h-5v-5h5zm-11 0v5h-5v-5h5z" fill="#5059C9"/>
              <path d="M9.5 11.5v11h-9v-11h9zm11-11v11h-9v-11h9z" fill="#7B83EB"/>
            </svg>
          </div>
        </div>
        
        {/* Slack - Right */}
        <div className="absolute top-1/2 right-0 translate-x-2 -translate-y-1/2">
          <div className="w-12 h-12 rounded-xl bg-card border border-border shadow-md flex items-center justify-center animate-[spin_20s_linear_infinite_reverse]">
            <svg viewBox="0 0 24 24" className="w-7 h-7">
              <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#E01E5A"/>
            </svg>
          </div>
        </div>
        
        {/* Google Chat - Bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2">
          <div className="w-12 h-12 rounded-xl bg-card border border-border shadow-md flex items-center justify-center animate-[spin_20s_linear_infinite_reverse]">
            <svg viewBox="0 0 24 24" className="w-7 h-7">
              <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" fill="#00AC47"/>
              <path d="M12 7v5l4.28 2.54.72-1.21-3.5-2.08V7h-1.5z" fill="#fff"/>
            </svg>
          </div>
        </div>
        
        {/* Discord - Left */}
        <div className="absolute top-1/2 left-0 -translate-x-2 -translate-y-1/2">
          <div className="w-12 h-12 rounded-xl bg-card border border-border shadow-md flex items-center justify-center animate-[spin_20s_linear_infinite_reverse]">
            <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#5865F2">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="70" fill="none" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="4 4" className="animate-[spin_30s_linear_infinite]" />
        <circle cx="100" cy="100" r="50" fill="none" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="2 6" className="animate-[spin_20s_linear_infinite_reverse]" />
      </svg>
      
      {/* Floating particles */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-primary/60 animate-pulse" />
      <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-accent/60 animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-1/3 left-1/3 w-1 h-1 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
}
