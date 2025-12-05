import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

// Platform icons
import teamsIcon from '@/assets/teams-icon.svg';
import slackIcon from '@/assets/slack-icon.svg'; 
import googleChatIcon from '@/assets/google-chat-icon.png';
import { SecureHubAnimation } from './SecureHubAnimation';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Clean gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-primary/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Platform logos indicator */}
          <div className="flex justify-center items-center gap-3 mb-6 animate-fade-in">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-card border-2 border-background flex items-center justify-center shadow-md">
                <img src={teamsIcon} alt="Teams" className="w-6 h-6" />
              </div>
              <div className="w-10 h-10 rounded-full bg-card border-2 border-background flex items-center justify-center shadow-md">
                <img src={slackIcon} alt="Slack" className="w-6 h-6" />
              </div>
              <div className="w-10 h-10 rounded-full bg-card border-2 border-background flex items-center justify-center shadow-md">
                <img src={googleChatIcon} alt="Google Chat" className="w-6 h-6" />
              </div>
            </div>
            <span className="text-sm font-medium text-muted-foreground">+26 platforms</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
              <span className="text-foreground">Your Unified Messaging Hub for</span>
              <br />
              <span className="bg-gradient-to-r from-[hsl(239,84%,67%)] via-[hsl(270,84%,60%)] to-[hsl(239,84%,67%)] bg-clip-text text-transparent">
                Teams, Slack & Google Chat
              </span>
            </h1>
          </div>

          {/* Subheadline */}
          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Sync conversations instantly across platforms — reliable, secure and effortless.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Button 
              asChild 
              size="lg" 
              className="group bg-gradient-to-r from-[hsl(239,84%,67%)] to-[hsl(270,84%,60%)] hover:from-[hsl(239,84%,60%)] hover:to-[hsl(270,84%,53%)] text-primary-foreground font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 rounded-full"
            >
              <Link to="/signup">
                Try SyncRivo Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="group border-2 border-border hover:border-primary/50 hover:bg-primary/5 font-semibold px-8 py-6 text-lg transition-all duration-300 rounded-full"
            >
              <Play className="mr-2 h-4 w-4" />
              Request a Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="pt-12 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <p className="text-sm text-muted-foreground mb-4">Trusted by 10,000+ teams worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {['Acme Corp', 'TechStart', 'GlobalFlow', 'DataSync', 'CloudFirst'].map((company) => (
                <span 
                  key={company} 
                  className="text-muted-foreground/50 font-semibold text-sm tracking-wide"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>

          {/* Secure Hub Animation */}
          <div className="pt-8 animate-fade-in" style={{ animationDelay: '500ms' }}>
            <SecureHubAnimation />
          </div>
        </div>
      </div>
    </section>
  );
}
