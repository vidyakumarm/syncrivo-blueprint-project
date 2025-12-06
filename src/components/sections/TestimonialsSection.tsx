import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';
import { useTranslationWithFallback } from '@/hooks/useTranslationWithFallback';

export function TestimonialsSection() {
  const { t } = useTranslationWithFallback();

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO, TechFlow Inc.",
      content: "SyncRivo transformed how our distributed team communicates. Messages flow seamlessly between Slack, Teams, and Zoom - it's like having one unified platform.",
      rating: 5,
      avatar: "SC",
      company: "TechFlow Inc."
    },
    {
      name: "Marcus Rodriguez",
      role: "Operations Director, GlobalSync",
      content: "We reduced communication silos by 80% and improved response times dramatically. The real-time sync is incredibly reliable.",
      rating: 5,
      avatar: "MR",
      company: "GlobalSync"
    },
    {
      name: "Emily Watson",
      role: "Team Lead, RemoteFirst",
      content: "The setup was surprisingly simple. Within minutes, our entire communication ecosystem was unified. Game-changer for remote collaboration.",
      rating: 5,
      avatar: "EW",
      company: "RemoteFirst"
    }
  ];

  return (
    <section className="py-28 lg:py-36 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-20 lg:mb-28">
          <Badge variant="secondary" className="mb-6 px-5 py-2.5 text-sm font-medium bg-primary-light text-primary border-primary/20">
            <Star className="w-4 h-4 mr-2" />
            {t('home.testimonials_badge', 'Trusted by Industry Leaders')}
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
            {t('home.testimonials_title', 'What Our Customers Say')}
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('home.testimonials_subtitle', 'Join thousands of teams who have transformed their communication with SyncRivo')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="group glass-card card-interactive animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-8 lg:p-10">
                {/* Rating stars */}
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-4 w-4 text-yellow-400 fill-current animate-pulse" 
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>

                {/* Quote icon */}
                <Quote className="h-8 w-8 text-primary/30 mb-4 group-hover:text-primary/50 transition-colors duration-300" />

                {/* Testimonial content */}
                <p className="text-base lg:text-lg text-muted-foreground mb-10 leading-relaxed group-hover:text-foreground transition-colors duration-300">
                  "{testimonial.content}"
                </p>

                {/* Author info */}
                <div className="flex items-center space-x-5">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold shadow-brand-md group-hover:scale-110 transition-transform duration-300">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-muted-foreground font-medium">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust metrics */}
        <div className="mt-20 lg:mt-28 grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12 text-center">
          {[
            { metric: "50K+", label: "Messages Synced Daily" },
            { metric: "99.9%", label: "Uptime Guarantee" },
            { metric: "500+", label: "Enterprise Customers" },
            { metric: "< 1s", label: "Average Sync Time" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${600 + index * 100}ms` }}
            >
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient-primary mb-3">
                {stat.metric}
              </p>
              <p className="text-sm lg:text-base text-muted-foreground font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}