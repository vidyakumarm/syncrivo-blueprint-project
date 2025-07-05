import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, Zap, Shield, Users } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium bg-primary-light text-primary border-primary/20">
            <Zap className="w-4 h-4 mr-2" />
            New: Advanced API Monitoring Dashboard
          </Badge>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Connect Everything.
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              Sync Everywhere.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Streamline your business operations with our unified integration platform. 
            Connect 500+ apps, automate workflows, and monitor everything from a single dashboard.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-primary hover:bg-primary-hover text-white font-semibold px-8 py-3 text-lg shadow-glow animate-glow"
            >
              <Link to="/signup">
                Start For Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-primary/30 hover:bg-primary-light font-semibold px-8 py-3 text-lg"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col items-center space-y-4 animate-slide-up">
            <p className="text-sm text-muted-foreground">
              Trusted by 10,000+ companies worldwide
            </p>
            <div className="flex items-center space-x-8 opacity-60">
              {/* Company logos would go here */}
              <div className="text-xs text-muted-foreground">SLACK</div>
              <div className="text-xs text-muted-foreground">SALESFORCE</div>
              <div className="text-xs text-muted-foreground">SHOPIFY</div>
              <div className="text-xs text-muted-foreground">STRIPE</div>
              <div className="text-xs text-muted-foreground">NOTION</div>
            </div>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-brand-md transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              Set up integrations in minutes, not weeks
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-brand-md transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-success rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Enterprise Security</h3>
            <p className="text-sm text-muted-foreground">
              SOC 2 compliant with end-to-end encryption
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-brand-md transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Team Collaboration</h3>
            <p className="text-sm text-muted-foreground">
              Manage integrations across your entire team
            </p>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-8 w-2 h-2 bg-primary rounded-full animate-pulse opacity-50" />
      <div className="absolute top-1/3 right-12 w-3 h-3 bg-accent rounded-full animate-pulse opacity-40 animation-delay-1000" />
      <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-primary rounded-full animate-pulse opacity-30 animation-delay-2000" />
    </section>
  );
}