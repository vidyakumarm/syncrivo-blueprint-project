import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { CookieProvider } from "@/contexts/CookieContext";
import { CookieConsent } from "@/components/cookies/CookieConsent";
import Index from "./pages/Index";
import Features from "./pages/Features";
import Integrations from "./pages/Integrations";
import IntegrationDetail from "./pages/IntegrationDetail";
import Pricing from "./pages/Pricing";
import Docs from "./pages/Docs";
import Support from "./pages/Support";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardConnections from "./pages/DashboardConnections";
import DashboardActivity from "./pages/DashboardActivity";
import DashboardSettings from "./pages/DashboardSettings";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Status from "./pages/Status";
import Community from "./pages/Community";
import Security from "./pages/Security";
import DocsApi from "./pages/DocsApi";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <CookieProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <CookieConsent />
            <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/features" element={<Features />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/integrations/:id" element={<IntegrationDetail />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/connections" element={<DashboardConnections />} />
          <Route path="/dashboard/activity" element={<DashboardActivity />} />
          <Route path="/dashboard/settings/*" element={<DashboardSettings />} />
          <Route path="/legal/terms" element={<Terms />} />
          <Route path="/legal/privacy" element={<Privacy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/status" element={<Status />} />
          <Route path="/community" element={<Community />} />
          <Route path="/security" element={<Security />} />
          <Route path="/docs/api" element={<DocsApi />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </CookieProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
