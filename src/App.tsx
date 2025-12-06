
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/contexts/AuthContext';
import { CookieProvider } from '@/contexts/CookieContext';
import { Toaster } from '@/components/ui/toaster';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './lib/i18n';

// Pages
import Index from '@/pages/Index';
import About from '@/pages/About';
import Features from '@/pages/Features';
import Integrations from '@/pages/Integrations';
import Pricing from '@/pages/Pricing';
import Docs from '@/pages/Docs';
import Support from '@/pages/Support';
import Community from '@/pages/Community';
import Blog from '@/pages/Blog';
import Careers from '@/pages/Careers';
import Status from '@/pages/Status';
import Security from '@/pages/Security';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import Dashboard from '@/pages/Dashboard';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import IntegrationDetail from '@/pages/IntegrationDetail';
import DocsApi from '@/pages/DocsApi';
import DashboardConnections from '@/pages/DashboardConnections';
import DashboardActivity from '@/pages/DashboardActivity';
import DashboardProfile from '@/pages/DashboardProfile';
import DashboardTeam from '@/pages/DashboardTeam';
import DashboardSecurity from '@/pages/DashboardSecurity';
import DashboardSettings from '@/pages/DashboardSettings';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// RTL direction handler component
function DirectionHandler({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    const isRTL = i18n.language === 'ar';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return <>{children}</>;
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <CookieProvider>
            <AuthProvider>
              <DirectionHandler>
                <Router>
                  <ScrollToTop />
                  <div className="min-h-screen bg-background">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/integrations" element={<Integrations />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/docs" element={<Docs />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/status" element={<Status />} />
                    <Route path="/security" element={<Security />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/connections" element={<DashboardConnections />} />
                    <Route path="/dashboard/activity" element={<DashboardActivity />} />
                    <Route path="/dashboard/settings" element={<DashboardSettings />} />
                    <Route path="/dashboard/settings/profile" element={<DashboardProfile />} />
                    <Route path="/dashboard/settings/team" element={<DashboardTeam />} />
                    <Route path="/dashboard/settings/security" element={<DashboardSecurity />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/legal/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/legal/terms" element={<Terms />} />
                    <Route path="/integrations/:id" element={<IntegrationDetail />} />
                    <Route path="/docs/api" element={<DocsApi />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  </div>
                  <Toaster />
                </Router>
              </DirectionHandler>
            </AuthProvider>
          </CookieProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
}

export default App;
