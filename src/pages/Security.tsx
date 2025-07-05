import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Shield, Lock, Eye, Server } from 'lucide-react';

const Security = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-8">Security</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your data security and privacy are our top priorities. Learn about our security measures and policies.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
            <div className="bg-card rounded-lg p-6 shadow-sm text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Data Encryption</h3>
              <p className="text-muted-foreground">All data is encrypted in transit and at rest using industry-standard encryption.</p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm text-center">
              <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Access Control</h3>
              <p className="text-muted-foreground">Strict access controls and authentication measures protect your account.</p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm text-center">
              <Eye className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Privacy First</h3>
              <p className="text-muted-foreground">We never share your data without your explicit consent.</p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm text-center">
              <Server className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Secure Infrastructure</h3>
              <p className="text-muted-foreground">Our infrastructure follows security best practices and compliance standards.</p>
            </div>
          </div>
          
          <div className="bg-card rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Security Policies</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Responsible Disclosure</h3>
                <p className="text-muted-foreground">
                  If you discover a security vulnerability, please report it to security@company.com. 
                  We appreciate your help in keeping our platform secure.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Compliance</h3>
                <p className="text-muted-foreground">
                  We maintain compliance with industry standards including SOC 2, GDPR, and other relevant regulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Security;