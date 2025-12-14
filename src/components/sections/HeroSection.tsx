import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Lock, CheckCircle, Zap, Building2, Calendar, LayoutDashboard, Layers } from "lucide-react";
import { useTranslationWithFallback } from "@/hooks/useTranslationWithFallback";
import { useAuth } from "@/contexts/AuthContext";
import { EnterpriseDemoModal } from "./EnterpriseDemoModal";

import { HeroLoopAnimation } from "./HeroLoopAnimation";




// Compliance badges
const complianceBadges = [
  { label: "SOC2", tooltip: "SOC 2 Type II Certified" },
  { label: "ISO 27001", tooltip: "ISO 27001 Certified" },
  { label: "GDPR", tooltip: "GDPR Compliant" },
  { label: "HIPAA", tooltip: "HIPAA Ready" },
];

// Placeholder customer logos
const customerLogos = [
  "Acme Corp",
  "TechFlow",
  "DataSync",
  "CloudFirst",
  "SecureNet",
];

export function HeroSection() {
  const { t } = useTranslationWithFallback();
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);



  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center overflow-hidden py-12 md:py-16 lg:py-20">
      {/* Premium gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-background to-slate-100/50 dark:from-slate-950 dark:via-background dark:to-slate-900/50" />
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-gradient-radial from-primary/[0.08] via-primary/[0.03] to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-accent/[0.06] via-accent/[0.02] to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 w-full">
        {/* Main Two-Column Layout */}
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
          {/* Left Side - Content */}
          <div
            className={`space-y-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Enterprise Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">{t('hero.enterprise_badge', 'Enterprise Communication Platform')}</span>
            </div>

            {/* Headline */}
            <div className="space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold leading-[1.08] tracking-tight text-foreground">
                <span className="block">{t('hero.headline_prefix', 'Automate')}</span>
                <span className="bg-gradient-to-r from-primary via-primary-600 to-accent bg-clip-text text-transparent">
                  {t('hero.headline_highlight', 'Cross-Platform Messaging')}
                </span>
                <span className="block">{t('hero.headline_suffix', 'for Global Teams')}</span>
              </h1>

              <p className="text-lg sm:text-xl lg:text-[1.4rem] text-muted-foreground max-w-xl leading-[1.65]">
                {t('hero.description', 'SyncRivo connects Slack, Microsoft Teams, and Google Workspace to route messages, alerts, and updates automatically—so teams respond faster without manual copy-paste.')}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 pt-2">
              {user ? (
                <>
                  <Button
                    asChild
                    size="lg"
                    className="group bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white font-semibold px-8 py-6 text-base shadow-xl shadow-slate-900/20 dark:shadow-white/10 hover:shadow-2xl transition-all duration-300 rounded-xl hover:scale-[1.02]"
                  >
                    <Link to="/dashboard">
                      <LayoutDashboard className="mr-2 h-5 w-5" />
                      {t('hero.cta_dashboard', 'Go to Dashboard')}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="group border-2 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 font-semibold px-8 py-6 text-base transition-all duration-300 rounded-xl"
                  >
                    <Link to="/integrations">
                      {t('hero.cta_integrations', 'View Integrations')}
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    size="lg"
                    className="group bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white font-semibold px-8 py-6 text-base shadow-xl shadow-slate-900/20 dark:shadow-white/10 hover:shadow-2xl transition-all duration-300 rounded-xl hover:scale-[1.02]"
                  >
                    <Link to="/signup">
                      {t('hero.cta_try_free', 'Try SyncRivo Free')}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setDemoModalOpen(true)}
                    className="group border-2 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 font-semibold px-8 py-6 text-base transition-all duration-300 rounded-xl"
                  >
                    <Calendar className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                    {t('hero.cta_book_demo', 'Book a Demo')}
                  </Button>
                </>
              )}
            </div>

            {/* Micro-trust line */}
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span>{t('hero.trust_line', 'Built for security-conscious teams. Designed for global scale.')}</span>
            </div>

            {/* Enterprise Trust Row */}
            <div
              className={`pt-8 border-t border-border/50 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
              style={{ transitionDelay: "400ms" }}
            >
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-5">
                {t('hero.trusted_by', 'Trusted by enterprise teams worldwide')}
              </p>

              {/* Customer Logos */}
              <div className="flex flex-wrap items-center gap-5 mb-6">
                {customerLogos.map((logo, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 rounded-lg bg-slate-100/80 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50"
                  >
                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{logo}</span>
                  </div>
                ))}
              </div>

              {/* Compliance Badges */}
              <div className="flex flex-wrap items-center gap-4">
                {complianceBadges.map((badge, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 dark:bg-accent/20 border border-accent/20 dark:border-accent/30"
                    title={badge.tooltip}
                  >
                    <Shield className="w-3 h-3 text-accent" />
                    <span className="text-xs font-semibold text-accent">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Hub Animation */}
          <div
            className={`flex flex-col items-center justify-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "200ms" }}
          >
            {/* Floating Hub Wrapper */}
            <div className="relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] lg:w-[440px] lg:h-[440px] flex items-center justify-center">
              {/* Defer animation to avoid blocking LCP */}
              <HeroLoopAnimation isVisible={isVisible} />
            </div>
            {/* End Floating Wrapper */}

            {/* +18 more platforms badge */}
            <div
              className={`mt-6 flex items-center gap-3 px-5 py-3 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              style={{ transitionDelay: "700ms" }}
            >
              {/* Mini icon cluster */}
              <div className="flex -space-x-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 border-2 border-white dark:border-slate-800 flex items-center justify-center"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-400 dark:bg-slate-500" />
                  </div>
                ))}
              </div>
              <span className="text-sm text-slate-700 dark:text-slate-300 font-semibold">{t('hero.more_platforms', '+18 more platforms')}</span>
            </div>
          </div>
        </div>

        {/* Security Trust Bar - Bottom */}
        <div
          className={`mt-16 lg:mt-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "800ms" }}
        >
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 px-8 py-6 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-sm">
            {[
              { icon: Lock, text: t('hero.proof_security', 'Enterprise-ready security') },
              { icon: Zap, text: t('hero.proof_latency', 'Low-latency routing') },
              { icon: CheckCircle, text: t('hero.proof_audit', 'Audit-friendly workflows') },
              { icon: Layers, text: t('hero.proof_platforms', 'Slack • Teams • Workspace') },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center shadow-sm">
                  <item.icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </div>
                <span className="text-slate-700 dark:text-slate-300 font-medium">{item.text}</span>
                {i < 3 && <div className="hidden sm:block w-px h-6 bg-slate-200 dark:bg-slate-700 ml-6" />}
              </div>
            ))}
          </div>
        </div>
      </div >

      {/* Enterprise Demo Modal */}
      < EnterpriseDemoModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
    </section >
  );
}
