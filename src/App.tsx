import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/contexts/AuthContext';
import { CookieProvider } from '@/contexts/CookieContext';
import { Toaster } from '@/components/ui/toaster';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AuthRedirect } from '@/components/auth/AuthRedirect';
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
import CookiePolicy from '@/pages/CookiePolicy';
import DPA from '@/pages/DPA';
import SubProcessors from '@/pages/SubProcessors';
import ContactSales from '@/pages/ContactSales';
import DebugAnimations from '@/pages/DebugAnimations';


// Solution Pages
import Solutions from '@/pages/Solutions';
import FrontlineWorkforce from '@/pages/solutions/FrontlineWorkforce';
import MergersAcquisitions from '@/pages/solutions/MergersAcquisitions';
import MultiPlatformCoexistence from '@/pages/solutions/MultiPlatformCoexistence';
import VendorFlexibility from '@/pages/solutions/VendorFlexibility';
import ExternalPartnerHub from '@/pages/solutions/ExternalPartnerHub';
import CustomerSupport from '@/pages/solutions/CustomerSupport';
import RegulatedIndustries from '@/pages/solutions/RegulatedIndustries';
import IncidentResponse from '@/pages/solutions/IncidentResponse';
import InterDepartment from '@/pages/solutions/InterDepartment';
import GlobalSubsidiaries from '@/pages/solutions/GlobalSubsidiaries';
import DigitalTransformation from '@/pages/solutions/DigitalTransformation';
import DeveloperPlatform from '@/pages/solutions/DeveloperPlatform';

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
                <ErrorBoundary>
                  <Router>
                    <ScrollToTop />
                    <div className="min-h-screen bg-background">
                      <Routes>
                        {/* Public routes */}
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
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/legal/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/legal/terms" element={<Terms />} />
                        <Route path="/integrations/:id" element={<IntegrationDetail />} />
                        <Route path="/docs/api" element={<DocsApi />} />
                        <Route path="/cookie-policy" element={<CookiePolicy />} />
                        <Route path="/dpa" element={<DPA />} />
                        <Route path="/sub-processors" element={<SubProcessors />} />
                        <Route path="/contact-sales" element={<ContactSales />} />

                        {/* Solution pages */}
                        <Route path="/solutions" element={<Solutions />} />
                        <Route path="/solutions/frontline-workforce" element={<FrontlineWorkforce />} />
                        <Route path="/solutions/mergers-acquisitions" element={<MergersAcquisitions />} />
                        <Route path="/solutions/multi-platform" element={<MultiPlatformCoexistence />} />
                        <Route path="/solutions/vendor-flexibility" element={<VendorFlexibility />} />
                        <Route path="/solutions/external-partners" element={<ExternalPartnerHub />} />
                        <Route path="/solutions/customer-support" element={<CustomerSupport />} />
                        <Route path="/solutions/regulated-industries" element={<RegulatedIndustries />} />
                        <Route path="/solutions/incident-response" element={<IncidentResponse />} />
                        <Route path="/solutions/inter-department" element={<InterDepartment />} />
                        <Route path="/solutions/global-subsidiaries" element={<GlobalSubsidiaries />} />
                        <Route path="/solutions/digital-transformation" element={<DigitalTransformation />} />
                        <Route path="/solutions/developer-platform" element={<DeveloperPlatform />} />

                        {/* Debug route */}
                        <Route path="/debug/animations" element={<DebugAnimations />} />

                        {/* Auth routes - redirect if already logged in */}
                        <Route path="/login" element={
                          <AuthRedirect>
                            <Login />
                          </AuthRedirect>
                        } />
                        <Route path="/signup" element={
                          <AuthRedirect>
                            <Signup />
                          </AuthRedirect>
                        } />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password" element={<ResetPassword />} />

                        {/* Protected dashboard routes */}
                        <Route path="/dashboard" element={
                          <ProtectedRoute>
                            <Dashboard />
                          </ProtectedRoute>
                        } />
                        <Route path="/dashboard/connections" element={
                          <ProtectedRoute>
                            <DashboardConnections />
                          </ProtectedRoute>
                        } />
                        <Route path="/dashboard/activity" element={
                          <ProtectedRoute>
                            <DashboardActivity />
                          </ProtectedRoute>
                        } />
                        <Route path="/dashboard/settings" element={
                          <ProtectedRoute>
                            <DashboardSettings />
                          </ProtectedRoute>
                        } />
                        <Route path="/dashboard/settings/profile" element={
                          <ProtectedRoute>
                            <DashboardProfile />
                          </ProtectedRoute>
                        } />
                        <Route path="/dashboard/settings/team" element={
                          <ProtectedRoute>
                            <DashboardTeam />
                          </ProtectedRoute>
                        } />
                        <Route path="/dashboard/settings/security" element={
                          <ProtectedRoute>
                            <DashboardSecurity />
                          </ProtectedRoute>
                        } />

                        {/* 404 */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </div>
                    <Toaster />
                  </Router>
                </ErrorBoundary>
              </DirectionHandler>
            </AuthProvider>
          </CookieProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
}

export default App;
