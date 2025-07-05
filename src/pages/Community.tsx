import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

const Community = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-8">Community</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with other users, share experiences, and get help from our community.
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-card rounded-lg p-6 shadow-sm text-center">
              <h2 className="text-xl font-semibold mb-3">Discord</h2>
              <p className="text-muted-foreground mb-4">
                Join our Discord server for real-time discussions and community support.
              </p>
              <Button 
                variant="outline" 
                onClick={() => window.open('https://discord.gg/syncrivo', '_blank')}
              >
                Join Discord
              </Button>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm text-center">
              <h2 className="text-xl font-semibold mb-3">Forums</h2>
              <p className="text-muted-foreground mb-4">
                Browse our community forums for questions, tips, and best practices.
              </p>
              <Button 
                variant="outline"
                onClick={() => window.open('https://community.syncrivo.com', '_blank')}
              >
                Visit Forums
              </Button>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm text-center">
              <h2 className="text-xl font-semibold mb-3">GitHub</h2>
              <p className="text-muted-foreground mb-4">
                Contribute to our open source projects and report issues.
              </p>
              <Button 
                variant="outline"
                onClick={() => window.open('https://github.com/syncrivo', '_blank')}
              >
                View GitHub
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;