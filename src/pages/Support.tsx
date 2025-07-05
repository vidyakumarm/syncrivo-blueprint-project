import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

export default function Support() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-foreground mb-8">Support</h1>
            <p className="text-lg text-muted-foreground">
              Get help with your SyncRivo integrations and find answers to common questions.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}