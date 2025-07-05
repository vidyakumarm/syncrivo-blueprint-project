import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';

const Status = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">System Status</h1>
            <p className="text-xl text-muted-foreground">
              Current status of our services and infrastructure
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">API Services</h2>
                <Badge variant="default" className="bg-green-100 text-green-800">Operational</Badge>
              </div>
              <p className="text-muted-foreground mt-2">All API endpoints are running normally</p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Dashboard</h2>
                <Badge variant="default" className="bg-green-100 text-green-800">Operational</Badge>
              </div>
              <p className="text-muted-foreground mt-2">User dashboard is functioning properly</p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Data Processing</h2>
                <Badge variant="default" className="bg-green-100 text-green-800">Operational</Badge>
              </div>
              <p className="text-muted-foreground mt-2">All data processing services are running smoothly</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Status;