import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Eye, EyeOff, Loader2, Lock, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PasswordStrengthMeter } from './PasswordStrengthMeter';

interface PasswordStepProps {
  email: string;
  onSubmit: (password: string) => Promise<boolean>;
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
  attempts: number;
}

export function PasswordStep({ 
  email, 
  onSubmit, 
  onBack, 
  isLoading, 
  error, 
  attempts 
}: PasswordStepProps) {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(password);
  };

  const isLocked = attempts >= 5;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Lock className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Enter your password</h2>
        <p className="text-muted-foreground text-sm">
          Welcome back, <span className="font-medium text-foreground">{email}</span>
        </p>
      </div>

      {isLocked && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-destructive">Account temporarily locked</p>
            <p className="text-xs text-destructive/80 mt-1">
              Too many failed attempts. Please try again later or reset your password.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-4 pr-12 h-12"
              disabled={isLoading || isLocked}
              autoFocus
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading || isLocked}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </Button>
          </div>
          {error && (
            <div className="flex items-start gap-2 text-xs text-destructive">
              <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          {attempts > 0 && attempts < 5 && (
            <p className="text-xs text-warning">
              {5 - attempts} attempts remaining
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isLoading}
            className="flex-1 h-12"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            type="submit"
            className="flex-1 h-12 font-medium transition-all duration-200 hover:scale-[1.02]"
            disabled={!password || isLoading || isLocked}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </Button>
        </div>
      </form>

      <div className="text-center">
        <button 
          type="button"
          className="text-xs text-primary hover:underline font-medium"
          onClick={() => {
            // TODO: Implement forgot password modal
            console.log('Forgot password clicked');
          }}
        >
          Forgot your password?
        </button>
      </div>
    </div>
  );
}