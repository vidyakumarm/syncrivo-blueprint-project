import React from 'react';
import { Card } from '@/components/ui/card';
import { RotatingLogo } from '@/components/ui/rotating-logo';
import { CollaborationHeroSVG } from './CollaborationHeroSVG';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 min-h-[calc(100vh-4rem)] items-center">
          {/* Left Column - Form */}
          <div className="flex flex-col justify-center">
            <div className="mx-auto w-full max-w-md space-y-6">
              {/* Logo */}
              <div className="flex justify-center">
                <RotatingLogo />
              </div>
              
              {/* Header */}
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-muted-foreground">
                    {subtitle}
                  </p>
                )}
              </div>

              {/* Auth Card */}
              <Card className="p-8 shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                {children}
              </Card>
            </div>
          </div>

          {/* Right Column - Hero Illustration */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl transform scale-150"></div>
              <div className="relative z-10">
                <CollaborationHeroSVG />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}