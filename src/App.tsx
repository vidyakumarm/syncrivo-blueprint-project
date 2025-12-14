import { useEffect, Suspense, lazy } from 'react';
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

// Critical Route (Eager Load)
import Index from '@/pages/Index';

// Lazy Loaded Routes
const About = lazy(() => import('@/pages/About'));
const Features = lazy(() => import('@/pages/Features'));
const MessagingAutomation = lazy(() => import('@/pages/features/MessagingAutomation'));
const Integrations = lazy(() => import('@/pages/Integrations'));
const Pricing = lazy(() => import('@/pages/Pricing'));
const Docs = lazy(() => import('@/pages/Docs'));
const Support = lazy(() => import('@/pages/Support'));
const Community = lazy(() => import('@/pages/Community'));
const Blog = lazy(() => import('@/pages/Blog'));
const Careers = lazy(() => import('@/pages/Careers'));
const Status = lazy(() => import('@/pages/Status'));
const Security = lazy(() => import('@/pages/Security'));
const Login = lazy(() => import('@/pages/Login'));
const Signup = lazy(() => import('@/pages/Signup'));
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'));
const ResetPassword = lazy(() => import('@/pages/ResetPassword'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Terms = lazy(() => import('@/pages/Terms'));
const IntegrationDetail = lazy(() => import('@/pages/IntegrationDetail'));
const DocsApi = lazy(() => import('@/pages/DocsApi'));
const DashboardConnections = lazy(() => import('@/pages/DashboardConnections'));
const DashboardActivity = lazy(() => import('@/pages/DashboardActivity'));
const DashboardProfile = lazy(() => import('@/pages/DashboardProfile'));
const DashboardTeam = lazy(() => import('@/pages/DashboardTeam'));
const DashboardSecurity = lazy(() => import('@/pages/DashboardSecurity'));
const DashboardSettings = lazy(() => import('@/pages/DashboardSettings'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const CookiePolicy = lazy(() => import('@/pages/CookiePolicy'));
const DPA = lazy(() => import('@/pages/DPA'));
const SubProcessors = lazy(() => import('@/pages/SubProcessors'));
const ContactSales = lazy(() => import('@/pages/ContactSales'));
const DebugAnimations = lazy(() => import('@/pages/DebugAnimations'));

// Solution Pages
const Solutions = lazy(() => import('@/pages/Solutions'));
const FrontlineWorkforce = lazy(() => import('@/pages/solutions/FrontlineWorkforce'));
const MergersAcquisitions = lazy(() => import('@/pages/solutions/MergersAcquisitions'));
const MultiPlatformCoexistence = lazy(() => import('@/pages/solutions/MultiPlatformCoexistence'));
const VendorFlexibility = lazy(() => import('@/pages/solutions/VendorFlexibility'));
const ExternalPartnerHub = lazy(() => import('@/pages/solutions/ExternalPartnerHub'));
const CustomerSupport = lazy(() => import('@/pages/solutions/CustomerSupport'));
const RegulatedIndustries = lazy(() => import('@/pages/solutions/RegulatedIndustries'));
const IncidentResponse = lazy(() => import('@/pages/solutions/IncidentResponse'));
const InterDepartment = lazy(() => import('@/pages/solutions/InterDepartment'));
const GlobalSubsidiaries = lazy(() => import('@/pages/solutions/GlobalSubsidiaries'));
const DigitalTransformation = lazy(() => import('@/pages/solutions/DigitalTransformation'));
const DeveloperPlatform = lazy(() => import('@/pages/solutions/DeveloperPlatform'));

// Region Pages
const USA = lazy(() => import('@/pages/regions/USA'));
const UK = lazy(() => import('@/pages/regions/UK'));
const Europe = lazy(() => import('@/pages/regions/Europe'));
const MiddleEast = lazy(() => import('@/pages/regions/MiddleEast'));
const APAC = lazy(() => import('@/pages/regions/APAC'));

// Comparison Pages
const ZapierAlternative = lazy(() => import('@/pages/alternatives/Zapier'));
const MioAlternative = lazy(() => import('@/pages/alternatives/Mio'));
const ThenaAlternative = lazy(() => import('@/pages/alternatives/Thena'));

const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'));

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

// Simple fallback loader without blocking external CSS
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

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
                      <Suspense fallback={<PageLoader />}>
                        <Routes>
                          {/* Public routes */}
                          <Route path="/" element={<Index />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/features" element={<Features />} />
                          <Route path="/features/messaging-automation" element={<MessagingAutomation />} />
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

                          {/* Region Routes */}
                          <Route path="/usa" element={<USA />} />
                          <Route path="/uk" element={<UK />} />
                          <Route path="/europe" element={<Europe />} />
                          <Route path="/middle-east" element={<MiddleEast />} />
                          <Route path="/apac" element={<APAC />} />

                          {/* Comparison Pages */}
                          <Route path="/alternatives/zapier" element={<ZapierAlternative />} />
                          <Route path="/alternatives/mio" element={<MioAlternative />} />
                          <Route path="/alternatives/thena" element={<ThenaAlternative />} />

                          {/* Blog Routes */}
                          <Route path="/blog/:slug" element={<BlogPostPage />} />

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
                      </Suspense>
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
