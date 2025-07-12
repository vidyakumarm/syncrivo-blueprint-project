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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Ambient background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid" />
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full w-96 h-96 blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full w-72 h-72 blur-3xl" />
      
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-6 lg:py-8">
          <div className="grid lg:grid-cols-[1.2fr,1fr] gap-8 lg:gap-12 min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-4rem)] items-center">
            {/* Left Column - Animation */}
            <div className="flex items-center justify-center order-1 lg:order-1 py-8 lg:py-0">
              {/* Mobile version */}
              <div className="lg:hidden w-full max-w-sm mx-auto">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-xl transform scale-110" />
                  <div className="relative z-10 bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
                    <CollaborationHeroSVG />
                  </div>
                </div>
              </div>
              
              {/* Desktop version */}
              <div className="hidden lg:flex items-center justify-center w-full h-full">
                <div className="relative w-full max-w-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl transform scale-125 animate-pulse-slow" />
                  <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-accent/30 to-primary/30 rounded-full blur-2xl animate-float" />
                  <div className="absolute bottom-8 left-8 w-24 h-24 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-full blur-2xl animate-float-delayed" />
                  <div className="relative z-10 bg-gradient-to-br from-card/30 to-card/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-border/30 shadow-elegant">
                    <div className="transform scale-110 lg:scale-125">
                      <CollaborationHeroSVG />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="flex flex-col justify-center order-2 lg:order-2">
              <div className="mx-auto w-full max-w-md space-y-6 lg:space-y-8">
                {/* Logo */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-md scale-110" />
                    <div className="relative z-10">
                      <RotatingLogo />
                    </div>
                  </div>
                </div>
                
                {/* Header */}
                <div className="text-center space-y-3">
                  <h1 className="text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    {title}
                  </h1>
                  {subtitle && (
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-sm mx-auto">
                      {subtitle}
                    </p>
                  )}
                </div>

                {/* Auth Card */}
                <Card className="p-6 lg:p-8 shadow-elegant border-0 bg-card/90 backdrop-blur-md relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                  <div className="relative z-10">
                    {children}
                  </div>
                </Card>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}