import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Lock, CheckCircle, Zap, Building2, Calendar, LayoutDashboard, Layers } from "lucide-react";
import { useTranslationWithFallback } from "@/hooks/useTranslationWithFallback";
import { useAuth } from "@/contexts/AuthContext";
import { EnterpriseDemoModal } from "./EnterpriseDemoModal";

import { HeroLoopAnimation } from "./HeroLoopAnimation";




// Compliance badges


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
    <section className="relative flex flex-col justify-start overflow-hidden pt-8 pb-16 md:pt-12 md:pb-20 lg:pt-16 lg:pb-24">
      {/* Premium gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-background to-slate-100/50 dark:from-slate-950 dark:via-background dark:to-slate-900/50" />
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-gradient-radial from-primary/[0.08] via-primary/[0.03] to-transparent rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-accent/[0.06] via-accent/[0.02] to-transparent rounded-full blur-3xl opacity-60" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 w-full">
        {/* Main Two-Column Layout */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div
            className={`flex flex-col justify-center space-y-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Enterprise Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 w-fit">
              <Building2 className="w-4 h-4 text-primary" aria-hidden="true" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wide">{t('hero.enterprise_badge', 'Enterprise Communication Platform')}</span>
            </div>

            {/* Headline */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold leading-[1.1] tracking-tight text-foreground -ml-[2px]">
                <span className="block">{t('hero.headline_prefix', 'Enterprise')}</span>
                <span className="bg-gradient-to-r from-primary via-primary-600 to-accent bg-clip-text text-transparent pb-2 block">
                  {t('hero.headline_highlight', 'Messaging Integration')}
                </span>
                <span className="block">{t('hero.headline_suffix', '& Automation Platform')}</span>
              </h1>

              <div className="space-y-4">
                <p className="text-lg sm:text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed">
                  {t('hero.description', 'SyncRivo connects Slack, Microsoft Teams, and Google Workspace to route messages, alerts, and updates automatically—so teams respond faster without manual copy-paste.')}
                </p>
                <p className="text-base text-muted-foreground/80 max-w-xl leading-relaxed hidden sm:block">
                  Designed for scalable enterprise environments, providing <Link to="/security" className="text-primary hover:underline underline-offset-4">audit-ready security</Link> and robust <Link to="/features" className="text-primary hover:underline underline-offset-4">automation workflows</Link> for cross-functional teams.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-1">
              {user ? (
                <>
                  <Button
                    asChild
                    size="lg"
                    className="group bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white font-semibold px-8 py-6 text-base shadow-lg shadow-slate-900/10 hover:shadow-xl transition-all duration-300 rounded-xl hover:scale-[1.01]"
                  >
                    <Link to="/dashboard">
                      <LayoutDashboard className="mr-2 h-5 w-5" aria-hidden="true" />
                      {t('hero.cta_dashboard', 'Go to Dashboard')}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
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
                    className="group bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white font-semibold px-8 py-6 text-base shadow-lg shadow-slate-900/10 hover:shadow-xl transition-all duration-300 rounded-xl hover:scale-[1.01]"
                  >
                    <Link to="/signup">
                      {t('hero.cta_try_free', 'Try SyncRivo Free')}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setDemoModalOpen(true)}
                    className="group border-2 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 font-semibold px-8 py-6 text-base transition-all duration-300 rounded-xl"
                  >
                    <Calendar className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
                    {t('hero.cta_book_demo', 'Book a Demo')}
                  </Button>
                </>
              )}
            </div>

            {/* Micro-trust line */}
            <div className="flex items-center gap-3 text-sm text-muted-foreground pt-1">
              <CheckCircle className="w-4 h-4 text-accent" aria-hidden="true" />
              <span>{t('hero.trust_line', 'Built for security-conscious teams. Designed for global scale.')}</span>
            </div>

            {/* Enterprise Trust Row */}
            <div
              className={`pt-10 border-t border-border/40 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
              style={{ transitionDelay: "400ms" }}
            >
              <p className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-widest mb-4">
                {t('hero.trusted_by', 'Trusted by enterprise teams worldwide')}
              </p>

              {/* Customer Logos */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-5 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                {customerLogos.map((logo, i) => (
                  <span
                    key={i}
                    className="text-sm font-bold text-slate-500 dark:text-slate-400"
                  >
                    {logo}
                  </span>
                ))}
              </div>

              {/* Compliance Badges */}
              <div className="flex flex-wrap items-center gap-3">
                {[
                  { label: "SOC2", tooltip: t('hero.compliance_badges.soc2', "SOC 2 Type II Certified") },
                  { label: "ISO 27001", tooltip: t('hero.compliance_badges.iso27001', "ISO 27001 Certified") },
                  { label: "GDPR", tooltip: t('hero.compliance_badges.gdpr', "GDPR Compliant") },
                  { label: "HIPAA", tooltip: t('hero.compliance_badges.hipaa', "HIPAA Ready") },
                ].map((badge, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-accent/5 dark:bg-accent/10 border border-accent/10 dark:border-accent/20"
                    title={badge.tooltip}
                  >
                    <Shield className="w-3 h-3 text-accent" aria-hidden="true" />
                    <span className="text-[10px] sm:text-xs font-semibold text-accent">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Hub Animation */}
          <div
            className="flex flex-col items-center justify-center lg:items-end lg:pr-8 lg:-mt-16 xl:-mt-20 opacity-100 translate-y-0"
            style={{ transitionDelay: "200ms" }}
          >
            {/* Floating Hub Wrapper */}
            <div className="relative w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] lg:w-[580px] lg:h-[580px] flex items-center justify-center">
              {/* Defer animation to avoid blocking LCP */}
              <HeroLoopAnimation isVisible={isVisible} />
            </div>
            {/* End Floating Wrapper */}

            {/* +18 more platforms badge */}
            <div
              className={`mt-4 lg:mt-0 lg:-mr-4 flex items-center gap-3 px-4 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              style={{ transitionDelay: "700ms" }}
            >
              <div className="flex -space-x-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 border-2 border-white dark:border-slate-800 flex items-center justify-center"
                  >
                    <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500" />
                  </div>
                ))}
              </div>
              <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-semibold">{t('hero.more_platforms', '+18 more platforms')}</span>
            </div>
          </div>
        </div>

        {/* Security Trust Bar - Bottom */}
        <div
          className={`mt-16 lg:mt-24 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "800ms" }}
        >
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 px-8 py-5 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm max-w-5xl mx-auto">
            {[
              { icon: Lock, text: t('hero.proof_security', 'Enterprise-ready security') },
              { icon: Zap, text: t('hero.proof_latency', 'Low-latency routing') },
              { icon: CheckCircle, text: t('hero.proof_audit', 'Audit-friendly workflows') },
              { icon: Layers, text: t('hero.proof_platforms', 'Slack • Teams • Workspace') },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center shadow-sm">
                  <item.icon className="w-4 h-4 text-slate-600 dark:text-slate-400" aria-hidden="true" />
                </div>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{item.text}</span>
                {i < 3 && <div className="hidden sm:block w-px h-5 bg-slate-200 dark:bg-slate-700 ml-5" />}
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
