import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Check, X } from 'lucide-react';

interface PasswordStrengthMeterProps {
  password: string;
}

interface PasswordRequirement {
  test: (password: string) => boolean;
  text: string;
}

const requirements: PasswordRequirement[] = [
  { test: (p) => p.length >= 8, text: 'At least 8 characters' },
  { test: (p) => /[A-Z]/.test(p), text: 'One uppercase letter' },
  { test: (p) => /[a-z]/.test(p), text: 'One lowercase letter' },
  { test: (p) => /[0-9]/.test(p), text: 'One number' },
  { test: (p) => /[^A-Za-z0-9]/.test(p), text: 'One special character' }
];

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const passedRequirements = requirements.filter(req => req.test(password)).length;
  const strength = Math.min((passedRequirements / requirements.length) * 100, 100);
  
  const getStrengthColor = () => {
    if (strength < 40) return 'bg-destructive';
    if (strength < 80) return 'bg-warning';
    return 'bg-success';
  };

  const getStrengthText = () => {
    if (strength < 40) return 'Weak';
    if (strength < 80) return 'Medium';
    return 'Strong';
  };

  if (!password) return null;

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Password strength</span>
          <span className={`font-medium ${
            strength < 40 ? 'text-destructive' : 
            strength < 80 ? 'text-warning' : 
            'text-success'
          }`}>
            {getStrengthText()}
          </span>
        </div>
        <Progress 
          value={strength} 
          className="h-2"
        />
      </div>
      
      <div className="grid grid-cols-1 gap-1">
        {requirements.map((req, index) => {
          const passed = req.test(password);
          return (
            <div key={index} className="flex items-center gap-2 text-xs">
              {passed ? (
                <Check className="h-3 w-3 text-success" />
              ) : (
                <X className="h-3 w-3 text-muted-foreground" />
              )}
              <span className={passed ? 'text-success' : 'text-muted-foreground'}>
                {req.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}