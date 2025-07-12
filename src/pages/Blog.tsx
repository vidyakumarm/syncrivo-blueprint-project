import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, ArrowRight, Bell, Search, Filter, Tag } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import blogHero from '@/assets/blog-hero.jpg';
import blogFeatured1 from '@/assets/blog-featured-1.jpg';
import blogFeatured2 from '@/assets/blog-featured-2.jpg';
import blogFeatured3 from '@/assets/blog-featured-3.jpg';

const Blog = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [subscribed, setSubscribed] = useState(false);

  const categories = [
    { key: 'all', label: t('blog.categories.all') },
    { key: 'product_updates', label: t('blog.categories.product_updates') },
    { key: 'tutorials', label: t('blog.categories.tutorials') },
    { key: 'integrations', label: t('blog.categories.integrations') },
    { key: 'best_practices', label: t('blog.categories.best_practices') },
    { key: 'company_news', label: t('blog.categories.company_news') },
  ];

  const placeholderPosts = [
    {
      id: 1,
      title: t('blog.placeholder_posts.post1.title'),
      excerpt: t('blog.placeholder_posts.post1.excerpt'),
      category: t('blog.placeholder_posts.post1.category'),
      readTime: t('blog.placeholder_posts.post1.read_time'),
      date: t('blog.placeholder_posts.post1.date'),
      image: blogFeatured1,
      featured: true,
    },
    {
      id: 2,
      title: t('blog.placeholder_posts.post2.title'),
      excerpt: t('blog.placeholder_posts.post2.excerpt'),
      category: t('blog.placeholder_posts.post2.category'),
      readTime: t('blog.placeholder_posts.post2.read_time'),
      date: t('blog.placeholder_posts.post2.date'),
      image: blogFeatured2,
      featured: true,
    },
    {
      id: 3,
      title: t('blog.placeholder_posts.post3.title'),
      excerpt: t('blog.placeholder_posts.post3.excerpt'),
      category: t('blog.placeholder_posts.post3.category'),
      readTime: t('blog.placeholder_posts.post3.read_time'),
      date: t('blog.placeholder_posts.post3.date'),
      image: blogFeatured3,
      featured: false,
    },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="w-fit">
                {t('blog.hero.badge')}
              </Badge>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                  {t('blog.hero.title')}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t('blog.hero.subtitle')}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Search articles..." 
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="lg">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                <img 
                  src={blogHero} 
                  alt="SyncRivo Blog"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl animate-pulse-slow" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-xl animate-float" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {t('blog.categories.title')}
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category.key}
                variant={activeCategory === category.key ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.key)}
                className="rounded-full"
              >
                <Tag className="w-3 h-3 mr-2" />
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Coming Soon Section */}
        <section className="text-center py-16 mb-16">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Bell className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('blog.coming_soon.title')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('blog.coming_soon.subtitle')}
            </p>
            <p className="text-muted-foreground">
              {t('blog.coming_soon.description')}
            </p>
          </div>
        </section>

        {/* Featured Posts Preview */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t('blog.featured.title')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('blog.featured.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {placeholderPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-border/50 overflow-hidden">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <Badge className="absolute top-4 left-4" variant="secondary">
                    {post.category}
                  </Badge>
                </div>
                <CardHeader className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full group/btn" disabled>
                    {t('blog.read_more')}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-16" />

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5 rounded-3xl">
          <div className="max-w-2xl mx-auto text-center space-y-8 px-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                {t('blog.newsletter.title')}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t('blog.newsletter.subtitle')}
              </p>
            </div>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={t('blog.newsletter.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit" size="lg" disabled={subscribed}>
                {subscribed ? t('blog.newsletter.success') : t('blog.newsletter.button')}
              </Button>
            </form>
            
            <p className="text-sm text-muted-foreground">
              {t('blog.coming_soon.notify')}
            </p>
          </div>
        </section>

        {/* Additional CTA */}
        <section className="text-center py-16">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-foreground">
              Ready to Transform Your Team's Communication?
            </h2>
            <p className="text-muted-foreground">
              While you wait for our blog content, why not try SyncRivo and see how it can streamline your messaging platforms?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/signup">Start Free Trial</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/features">Explore Features</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;