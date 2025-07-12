import { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CheckCircle, Star, Users, Building, Shield, Info, Sparkles, Headphones, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslationWithFallback } from '@/hooks/useTranslationWithFallback';

export default function Pricing() {
  const { t } = useTranslationWithFallback();
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: t('pricing.starter'),
      icon: Users,
      price: { monthly: t('pricing.free'), yearly: t('pricing.free') },
      originalPrice: null,
      badge: 'Perfect for trying out',
      description: t('pricing.starter_desc'),
      targetAudience: 'Ideal for small teams just getting started',
      features: [
        { text: t('pricing.integrations_5'), tooltip: 'Connect up to 5 different platforms' },
        { text: t('pricing.operations_1k'), tooltip: '1,000 data sync operations per month' },
        { text: t('pricing.support_basic'), tooltip: 'Email support with 24-48 hour response' },
        { text: t('pricing.community_access'), tooltip: 'Access to community forums and resources' },
        { text: 'Basic analytics dashboard', tooltip: 'View basic sync statistics and performance' }
      ],
      ctaText: 'Start Free',
      ctaVariant: 'outline' as const
    },
    {
      name: t('pricing.professional'),
      icon: Building,
      price: { monthly: '$49', yearly: '$39' },
      originalPrice: { monthly: null, yearly: '$49' },
      badge: t('pricing.most_popular'),
      description: t('pricing.professional_desc'),
      targetAudience: 'Perfect for growing businesses and established teams',
      features: [
        { text: t('pricing.integrations_50'), tooltip: 'Connect up to 50 different platforms and services' },
        { text: t('pricing.operations_100k'), tooltip: '100,000 data sync operations per month' },
        { text: t('pricing.support_priority'), tooltip: 'Priority email and chat support with 2-4 hour response' },
        { text: t('pricing.advanced_analytics'), tooltip: 'Advanced reporting, custom dashboards, and insights' },
        { text: 'Custom workflows', tooltip: 'Build automated workflows with conditional logic' },
        { text: 'API access', tooltip: 'Full REST API access for custom integrations' },
        { text: 'Team collaboration', tooltip: 'Multi-user accounts with role-based permissions' }
      ],
      popular: true,
      ctaText: 'Start 14-Day Free Trial',
      ctaVariant: 'default' as const
    },
    {
      name: t('pricing.enterprise'),
      icon: Shield,
      price: { monthly: t('pricing.custom'), yearly: t('pricing.custom') },
      originalPrice: null,
      badge: 'Enterprise-grade',
      description: t('pricing.enterprise_desc'),
      targetAudience: 'Built for large organizations with complex needs',
      features: [
        { text: t('pricing.integrations_unlimited'), tooltip: 'Unlimited platform integrations and connections' },
        { text: t('pricing.operations_unlimited'), tooltip: 'Unlimited data sync operations' },
        { text: t('pricing.support_dedicated'), tooltip: 'Dedicated customer success manager and phone support' },
        { text: t('pricing.custom_workflows'), tooltip: 'Custom workflow development and enterprise features' },
        { text: 'Advanced security & compliance', tooltip: 'SOC 2, HIPAA, GDPR compliance and enterprise security' },
        { text: 'On-premise deployment', tooltip: 'Option for on-premise or private cloud deployment' },
        { text: 'Custom SLAs', tooltip: 'Guaranteed uptime and custom service level agreements' },
        { text: 'White-label options', tooltip: 'Brand the platform with your company identity' }
      ],
      ctaText: 'Contact Sales',
      ctaVariant: 'outline' as const
    }
  ];

  const savings = {
    professional: Math.round(((49 - 39) / 49) * 100)
  };

  const faqs = [
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we\'ll prorate any billing differences.'
    },
    {
      question: 'What happens to my data if I cancel?',
      answer: 'Your data is safely stored for 30 days after cancellation, giving you time to export everything or reactivate your account.'
    },
    {
      question: 'Do you offer custom enterprise solutions?',
      answer: 'Yes, we work with enterprise clients to create custom solutions that meet their specific integration and compliance needs.'
    },
    {
      question: 'Is there a setup fee?',
      answer: 'No setup fees. All plans include free onboarding assistance and migration support from our team.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and can arrange invoicing for enterprise customers.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we\'re SOC 2 certified and use enterprise-grade encryption to protect your data both in transit and at rest.'
    }
  ];

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-16">
          {/* Hero Section */}
          <section className="py-12 sm:py-20 bg-gradient-to-br from-background via-muted/30 to-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 sm:mb-16">
                <Badge variant="secondary" className="mb-4 text-sm font-medium inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Transparent Pricing
                </Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                  {t('pricing.title')}
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed">
                  {t('pricing.subtitle')} No hidden fees. Cancel anytime.
                </p>
                
                {/* Billing Toggle */}
                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
                  <span className={`text-sm font-medium transition-colors ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                    Monthly
                  </span>
                  <Switch
                    checked={isYearly}
                    onCheckedChange={setIsYearly}
                    className="data-[state=checked]:bg-primary"
                  />
                  <span className={`text-sm font-medium transition-colors ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                    Yearly
                  </span>
                  <Badge variant="secondary" className="ml-2 bg-success/10 text-success border-success/20 text-xs">
                    Save 20%
                  </Badge>
                </div>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-success flex-shrink-0" />
                  <span>SOC 2 Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-warning flex-shrink-0" />
                  <span>4.9/5 Customer Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>99.9% Uptime SLA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>24/7 Support</span>
                </div>
              </div>

              {/* Pricing Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
                {plans.map((plan, index) => {
                  const PlanIcon = plan.icon;
                  const currentPrice = isYearly ? plan.price.yearly : plan.price.monthly;
                  const originalPrice = plan.originalPrice ? (isYearly ? plan.originalPrice.yearly : plan.originalPrice.monthly) : null;
                  
                  return (
                    <Card 
                      key={index} 
                      className={`relative overflow-hidden transition-all duration-300 group hover:shadow-lg ${
                        plan.popular 
                          ? 'border-primary shadow-lg scale-105 lg:scale-105 ring-1 ring-primary/20' 
                          : 'hover:border-primary/30 hover:scale-105'
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary" />
                      )}
                      
                      {plan.badge && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                          <Badge className={`text-xs font-medium ${
                            plan.popular 
                              ? 'bg-primary text-white border-primary' 
                              : 'bg-secondary text-secondary-foreground border'
                          }`}>
                            {plan.badge}
                          </Badge>
                        </div>
                      )}

                      <CardHeader className="text-center pb-4 pt-6">
                        <div className="flex justify-center mb-4">
                          <div className={`p-3 rounded-full transition-colors ${
                            plan.popular ? 'bg-primary/10' : 'bg-muted'
                          }`}>
                            <PlanIcon className={`w-6 h-6 ${
                              plan.popular ? 'text-primary' : 'text-muted-foreground'
                            }`} />
                          </div>
                        </div>
                        
                        <CardTitle className="text-xl sm:text-2xl font-bold mb-2">{plan.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{plan.targetAudience}</p>
                        
                        <div className="mb-4">
                          <div className="flex items-center justify-center gap-2 mb-1">
                            {originalPrice && (
                              <span className="text-lg text-muted-foreground line-through">
                                {originalPrice}
                              </span>
                            )}
                            <span className="text-3xl sm:text-4xl font-bold text-foreground">{currentPrice}</span>
                            {currentPrice !== t('pricing.free') && currentPrice !== t('pricing.custom') && (
                              <span className="text-muted-foreground">
                                /{isYearly ? 'year' : 'month'}
                              </span>
                            )}
                          </div>
                          {plan.name === t('pricing.professional') && isYearly && (
                            <p className="text-sm text-success font-medium">
                              Save {savings.professional}% with yearly billing
                            </p>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground leading-relaxed">{plan.description}</p>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle className="h-4 w-4 text-success mt-1 flex-shrink-0" />
                              <div className="flex items-start gap-1 min-w-0">
                                <span className="text-sm text-foreground leading-relaxed">{feature.text}</span>
                                {feature.tooltip && (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Info className="h-3 w-3 text-muted-foreground cursor-help mt-1 flex-shrink-0" />
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="max-w-xs">
                                      <p className="text-xs leading-relaxed">{feature.tooltip}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                        
                        <Button 
                          asChild 
                          size="lg"
                          className={`w-full font-medium transition-all duration-200 ${
                            plan.popular 
                              ? 'bg-gradient-primary hover:shadow-md' 
                              : ''
                          }`}
                          variant={plan.ctaVariant}
                        >
                          <Link to={plan.name === t('pricing.enterprise') ? '/support' : '/signup'}>
                            {plan.ctaText}
                          </Link>
                        </Button>
                        
                        {plan.name !== t('pricing.enterprise') && (
                          <p className="text-xs text-muted-foreground text-center mt-3">
                            No credit card required
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Bottom CTA */}
              <div className="text-center mt-12 sm:mt-16">
                <p className="text-muted-foreground mb-4">
                  Still have questions? Our team is here to help.
                </p>
                <Button variant="outline" asChild>
                  <Link to="/support">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-12 sm:py-20 bg-muted/30">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
                <p className="text-muted-foreground">Everything you need to know about our pricing</p>
              </div>
              
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {faqs.map((faq, index) => (
                  <div key={index} className="space-y-3">
                    <h3 className="font-semibold text-foreground leading-relaxed">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </TooltipProvider>
  );
}