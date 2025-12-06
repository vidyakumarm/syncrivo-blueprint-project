import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        console.error('Password reset error:', error);
        toast.error(error.message);
      } else {
        setSent(true);
        toast.success('Password reset email sent! Check your inbox.');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
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
            <div className="max-w-md mx-auto">
              <Card className="border-0 shadow-xl bg-card/95 backdrop-blur-md">
                <CardHeader className="space-y-2 pb-6">
                  <CardTitle className="text-2xl lg:text-3xl text-center font-bold">
                    {sent ? 'Check Your Email' : 'Forgot Password?'}
                  </CardTitle>
                  <p className="text-center text-muted-foreground text-sm">
                    {sent 
                      ? "We've sent you a password reset link" 
                      : "Enter your email and we'll send you a reset link"
                    }
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {sent ? (
                    <div className="space-y-6">
                      <div className="flex justify-center">
                        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                      <div className="text-center space-y-2">
                        <p className="text-sm text-muted-foreground">
                          We sent a password reset link to:
                        </p>
                        <p className="font-medium text-foreground">{email}</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm text-muted-foreground text-center">
                          Didn't receive the email? Check your spam folder or{' '}
                          <button 
                            onClick={() => setSent(false)} 
                            className="text-primary hover:underline font-medium"
                          >
                            try again
                          </button>
                        </p>
                      </div>
                      <Link to="/login">
                        <Button variant="outline" className="w-full">
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Back to Login
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium">
                            Email Address
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
                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-medium h-11" 
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            'Send Reset Link'
                          )}
                        </Button>
                      </form>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-card px-2 text-muted-foreground">
                            Or
                          </span>
                        </div>
                      </div>

                      <Link to="/login">
                        <Button variant="outline" className="w-full">
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Back to Login
                        </Button>
                      </Link>
                    </>
                  )}

                  <p className="text-center text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-primary font-medium hover:underline">
                      Sign up
                    </Link>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
