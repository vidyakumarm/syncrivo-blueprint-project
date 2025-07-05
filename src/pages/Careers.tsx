import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

const Careers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-8">Careers</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join our team and help us build the future of data integration.
            </p>
          </div>
          
          <div className="mt-12">
            <div className="bg-card rounded-lg p-8 shadow-sm text-center">
              <h2 className="text-2xl font-semibold mb-4">We're Growing!</h2>
              <p className="text-muted-foreground mb-6">
                We're always looking for talented individuals to join our team. 
                Check back soon for open positions or reach out to us directly.
              </p>
              <p className="text-sm text-muted-foreground">
                Contact us at careers@company.com
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;