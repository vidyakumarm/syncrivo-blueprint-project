import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const Community = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-8">{t('community.title')}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('community.subtitle')}
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-card rounded-lg p-6 shadow-sm text-center">
              <h2 className="text-xl font-semibold mb-3">{t('community.discord')}</h2>
              <p className="text-muted-foreground mb-4">
                {t('community.discord_desc')}
              </p>
              <Button 
                variant="outline" 
                onClick={() => window.open('https://discord.gg/syncrivo', '_blank')}
              >
                {t('community.join_discord')}
              </Button>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm text-center">
              <h2 className="text-xl font-semibold mb-3">{t('community.forums')}</h2>
              <p className="text-muted-foreground mb-4">
                {t('community.forums_desc')}
              </p>
              <Button 
                variant="outline"
                onClick={() => window.open('https://community.syncrivo.com', '_blank')}
              >
                {t('community.visit_forums')}
              </Button>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm text-center">
              <h2 className="text-xl font-semibold mb-3">{t('community.github')}</h2>
              <p className="text-muted-foreground mb-4">
                {t('community.github_desc')}
              </p>
              <Button 
                variant="outline"
                onClick={() => window.open('https://github.com/syncrivo', '_blank')}
              >
                {t('community.view_github')}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;