import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Lock, CheckCircle, Zap, Building2, Calendar, LayoutDashboard, Layers } from "lucide-react";
import { useTranslationWithFallback } from "@/hooks/useTranslationWithFallback";
import { useAuth } from "@/contexts/AuthContext";
import { EnterpriseDemoModal } from "./EnterpriseDemoModal";

// Platform icons
// Platform icons - Using official high-quality assets
import teamsIcon from "@/assets/brands/teams-official.svg";
import slackIcon from "@/assets/brands/slack-official.svg";
import discordIcon from "@/assets/brands/discord-official.png";
import telegramIcon from "@/assets/brands/telegram-official.svg";
import zoomIcon from "@/assets/zoom-icon.png";
import webexIcon from "@/assets/webex-icon.png";
import googleChatIcon from "@/assets/google-chat-icon.png"; // Use PNG for Chat if SVG is Meet
import signalIcon from "@/assets/brands/signal-official.svg";
import mattermostIcon from "@/assets/brands/mattermost-official.svg";
import rocketchatIcon from "@/assets/brands/rocketchat-official.svg";
import whatsappIcon from "@/assets/brands/whatsapp-official.svg";
import syncrivoHubIcon from "@/assets/brands/syncrivo-hub-official.png";

interface Platform {
  id: string;
  name: string;
  icon: string;
  angle: number;
}

// 10 platforms for the orbit
const platforms: Platform[] = [
  { id: "slack", name: "Slack", icon: slackIcon, angle: 0 },
  { id: "teams", name: "Teams", icon: teamsIcon, angle: 36 },
  { id: "googlechat", name: "Google Chat", icon: googleChatIcon, angle: 72 },
  { id: "whatsapp", name: "WhatsApp Business", icon: whatsappIcon, angle: 108 },
  { id: "webex", name: "Cisco Webex", icon: webexIcon, angle: 144 },
  { id: "telegram", name: "Telegram", icon: telegramIcon, angle: 180 },
  { id: "syncrivohub", name: "Arattai", icon: syncrivoHubIcon, angle: 216 },
  { id: "zoom", name: "Zoom", icon: zoomIcon, angle: 252 },
  { id: "mattermost", name: "Mattermost", icon: mattermostIcon, angle: 288 },
  { id: "rocketchat", name: "Rocket.Chat", icon: rocketchatIcon, angle: 324 },
];

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
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const hubRadius = 140;

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getPlatformPosition = (angle: number) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: Math.cos(radian) * hubRadius,
      y: Math.sin(radian) * hubRadius,
    };
  };

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
                {t('hero.headline_prefix', 'The')}{" "}
                <span className="bg-gradient-to-r from-primary via-primary-600 to-accent bg-clip-text text-transparent">
                  {t('hero.headline_highlight', 'Universal Messaging Layer')}
                </span>
                {" "}{t('hero.headline_suffix', 'for Every Enterprise.')}
              </h1>

              <p className="text-lg sm:text-xl lg:text-[1.4rem] text-muted-foreground max-w-xl leading-[1.65]">
                {t('hero.description', 'Unify Teams, Slack, Google Chat, Zoom, and 20+ platforms into one secure, intelligent communication hub.')}
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
                    <Link to="/dashboard/connections">
                      {t('hero.cta_connections', 'Manage Connections')}
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
                    {t('hero.cta_book_demo', 'Book a Live Enterprise Demo')}
                  </Button>
                </>
              )}
            </div>

            {/* Micro-trust line */}
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span>{t('hero.trust_line', 'No credit card required. Setup in 2 minutes.')}</span>
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
            <div className="animate-float">
              {/* Animation Container */}
              <div className="relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] lg:w-[440px] lg:h-[440px]">
                {/* Outer glow rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-slate-200/40 dark:border-slate-700/30 animate-pulse-slow"
                  />
                  <div
                    className="absolute w-60 h-60 sm:w-68 sm:h-68 rounded-full border border-slate-300/30 dark:border-slate-600/20 animate-[pulse-slow_4s_ease-in-out_infinite_1s]"
                  />
                  {/* Radial glow */}
                  <div
                    className="w-48 h-48 bg-gradient-radial from-primary/20 via-primary/5 to-transparent rounded-full blur-2xl animate-[pulse-glow_3s_ease-in-out_infinite]"
                  />
                </div>

                {/* ROTATING ORBIT CONTAINER */}
                <div className="absolute inset-0 w-full h-full animate-spin-slow">
                  {/* SVG for connection lines */}
                  <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
                    <defs>
                      <linearGradient id="heroLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                        <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                      </linearGradient>
                    </defs>

                    {/* Connection lines */}
                    {platforms.map((platform) => {
                      const pos = getPlatformPosition(platform.angle);
                      const isHovered = hoveredPlatform === platform.id;
                      return (
                        <line
                          key={platform.id}
                          x1="50%"
                          y1="50%"
                          x2={`calc(50% + ${pos.x}px)`}
                          y2={`calc(50% + ${pos.y}px)`}
                          stroke="url(#heroLineGradient)"
                          strokeWidth={isHovered ? 2 : 1.5}
                          strokeDasharray={isHovered ? "0" : "4 4"}
                          opacity={isHovered ? 0.8 : 0.4}
                          className="transition-all duration-300"
                        />
                      );
                    })}
                  </svg>

                  {/* Discrete Data Packets (CSS Animation) */}
                  <div className="absolute inset-0 pointer-events-none">
                    {platforms.map((platform, index) => {
                      const pos = getPlatformPosition(platform.angle);
                      // Single packet per line for clean enterprise look
                      const randomDelay = (index * 0.8) % 3;

                      return (
                        <div
                          key={`packet-${platform.id}`}
                          className="absolute left-1/2 top-1/2 w-2.5 h-2.5 -ml-1.5 -mt-1.5 animate-packet z-10"
                          style={{
                            // @ts-ignore
                            "--tx": `${pos.x}px`,
                            "--ty": `${pos.y}px`,
                            animationDelay: `${randomDelay}s`,
                            animationDuration: "3s"
                          }}
                        >
                          {/* Glowing dot packet */}
                          <div className="w-full h-full bg-primary rounded-full shadow-[0_0_12px_4px_hsl(var(--primary)/0.6)]" />
                        </div>
                      );
                    })}
                  </div>

                  {/* Platform Icons in orbit */}
                  {platforms.map((platform, index) => {
                    const pos = getPlatformPosition(platform.angle);
                    const isHovered = hoveredPlatform === platform.id;
                    const delay = index * 40;

                    return (
                      <div
                        key={platform.id}
                        className={`absolute left-1/2 top-1/2 z-10 transition-all duration-300 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                          }`}
                        style={{
                          transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px)`,
                          transitionDelay: `${400 + delay}ms`,
                        }}
                        onMouseEnter={() => setHoveredPlatform(platform.id)}
                        onMouseLeave={() => setHoveredPlatform(null)}
                      >
                        {/* COUNTER-ROTATE ICON CONTAINER */}
                        <div className="animate-spin-slow-reverse">
                          <div
                            className={`
                            relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white dark:bg-slate-800 border 
                            flex items-center justify-center cursor-pointer
                            transition-all duration-300 ease-out
                            ${isHovered
                                ? "scale-125 -translate-y-1 shadow-xl border-primary/40 dark:border-primary/50 z-30"
                                : "border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg"
                              }
                          `}
                          >
                            <img
                              src={platform.icon}
                              alt={platform.name}
                              className={`w-5 h-5 sm:w-6 sm:h-6 object-contain transition-all duration-300 ${isHovered ? "opacity-100 scale-110" : "opacity-70"}`}
                            />

                            {/* Tooltip */}
                            {isHovered && (
                              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-slate-900 dark:bg-slate-700 text-white text-xs font-medium whitespace-nowrap z-50">
                                {platform.name}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Central Hub (Static in center, does not rotate) */}
                <div
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
                    }`}
                  style={{ transitionDelay: "300ms" }}
                >
                  {/* Main hub with premium glassmorphism and depth */}
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">

                    {/* Outer breathing glow ring */}
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse-slow" />

                    {/* Rotating technical mesh ring */}
                    <div className="absolute inset-[2px] rounded-full border border-dashed border-primary/30 animate-spin-ultra-slow" />

                    {/* Inner glass core */}
                    {/* Inner glass core */}
                    <div className="relative w-full h-full rounded-full bg-gradient-to-br from-white/90 to-white/50 dark:from-slate-900/90 dark:to-slate-800/50 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 shadow-2xl flex flex-col items-center justify-center z-10 animate-float">

                      {/* SVG Definitions for Icon Gradient */}
                      <svg width="0" height="0" className="absolute">
                        <defs>
                          <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="hsl(var(--primary))" />
                            <stop offset="100%" stopColor="hsl(var(--accent))" />
                          </linearGradient>
                        </defs>
                      </svg>

                      {/* Security badge integrated into rim */}
                      <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/40 border-2 border-white dark:border-slate-800 z-20 animate-bounce-subtle">
                        <Lock className="w-3.5 h-3.5 text-white" />
                      </div>

                      {/* Logo Content */}
                      <div className="flex flex-col items-center relative z-10">
                        <div className="relative mb-1">
                          <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full animate-pulse-glow" />
                          {/* Replaced Zap with Layers for "Universal Messaging Layer" semantics */}
                          <Layers className="w-10 h-10 text-primary relative z-10 drop-shadow-sm" style={{ stroke: "url(#iconGradient)" }} />
                        </div>
                        <span className="text-foreground font-bold text-lg sm:text-xl tracking-tight leading-none">SyncRivo</span>
                        <span className="text-[10px] text-muted-foreground font-semibold tracking-[0.2em] uppercase mt-1">
                          SECURE
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

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
              { icon: Lock, text: t('hero.security_encryption', 'End-to-End Encryption') },
              { icon: Shield, text: t('hero.security_zero_trust', 'Zero-Trust Architecture') },
              { icon: CheckCircle, text: t('hero.security_uptime', '99.99% Uptime SLA') },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center shadow-sm">
                  <item.icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </div>
                <span className="text-slate-700 dark:text-slate-300 font-medium">{item.text}</span>
                {i < 2 && <div className="hidden sm:block w-px h-6 bg-slate-200 dark:bg-slate-700 ml-6" />}
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
