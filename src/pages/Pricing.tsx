import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslationWithFallback } from '@/hooks/useTranslationWithFallback';

export default function Pricing() {
  const { t } = useTranslationWithFallback();
  
  const plans = [
    {
      name: t('pricing.starter'),
      price: t('pricing.free'),
      description: t('pricing.starter_desc'),
      features: [t('pricing.integrations_5'), t('pricing.operations_1k'), t('pricing.support_basic'), t('pricing.community_access')]
    },
    {
      name: t('pricing.professional'),
      price: '$49',
      period: t('pricing.per_month'),
      description: t('pricing.professional_desc'),
      features: [t('pricing.integrations_50'), t('pricing.operations_100k'), t('pricing.support_priority'), t('pricing.advanced_analytics')],
      popular: true
    },
    {
      name: t('pricing.enterprise'),
      price: t('pricing.custom'),
      description: t('pricing.enterprise_desc'),
      features: [t('pricing.integrations_unlimited'), t('pricing.operations_unlimited'), t('pricing.support_dedicated'), t('pricing.custom_workflows')]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {t('pricing.title')}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t('pricing.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-brand-lg' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                        {t('pricing.most_popular')}
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                    </div>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      asChild 
                      className={`w-full ${plan.popular ? 'bg-gradient-primary' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      <Link to="/signup">{t('hero.cta_primary')}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}