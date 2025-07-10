import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, Loader2, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface IdentifierStepProps {
  onNext: (email: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

export function IdentifierStep({ onNext, isLoading, error }: IdentifierStepProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    await onNext(email);
  };

  const isValidEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Mail className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Welcome back</h2>
        <p className="text-muted-foreground text-sm">
          Enter your email to continue to your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email address
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(true)}
              className={`pl-4 pr-12 h-12 transition-all duration-200 ${
                touched && !isValidEmail && email 
                  ? 'border-destructive focus:ring-destructive' 
                  : 'focus:ring-primary'
              }`}
              disabled={isLoading}
              autoFocus
              required
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {isValidEmail && (
                <div className="w-2 h-2 bg-success rounded-full"></div>
              )}
            </div>
          </div>
          {touched && !isValidEmail && email && (
            <p className="text-xs text-destructive">
              Please enter a valid email address
            </p>
          )}
          {error && (
            <p className="text-xs text-destructive">
              {error}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-12 font-medium transition-all duration-200 hover:scale-[1.02]"
          disabled={!email || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Verifying...
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Don't have an account?{' '}
          <a href="/signup" className="text-primary hover:underline font-medium">
            Sign up for free
          </a>
        </p>
      </div>
    </div>
  );
}