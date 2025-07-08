import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { CodeBlock } from '@/components/docs/CodeBlock';
import { useTranslation } from 'react-i18next';

const DocsApi = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">{t('docs_api.title')}</h1>
            <p className="text-xl text-muted-foreground">
              {t('docs_api.subtitle')}
            </p>
          </div>
          
          <div className="space-y-8">
            <section className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">{t('docs_api.authentication')}</h2>
              <p className="text-muted-foreground mb-4">
                {t('docs_api.authentication_desc')}
              </p>
              <CodeBlock
                code={`curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.example.com/v1/data`}
                language="bash"
              />
            </section>
            
            <section className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">{t('docs_api.base_url')}</h2>
              <p className="text-muted-foreground mb-4">
                {t('docs_api.base_url_desc')}
              </p>
              <CodeBlock
                code="https://api.example.com/v1"
                language="text"
              />
            </section>
            
            <section className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">{t('docs_api.endpoints')}</h2>
              
              <h3 className="text-lg font-medium mb-3">{t('docs_api.get_data')}</h3>
              <p className="text-muted-foreground mb-4">
                {t('docs_api.get_data_desc')}
              </p>
              <CodeBlock
                code={`{
  "data": [
    {
      "id": "123",
      "name": "Example Record",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 1,
  "page": 1
}`}
                language="json"
              />
              
              <h3 className="text-lg font-medium mb-3 mt-6">{t('docs_api.post_data')}</h3>
              <p className="text-muted-foreground mb-4">
                {t('docs_api.post_data_desc')}
              </p>
              <CodeBlock
                code={`curl -X POST \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "New Record"}' \\
  https://api.example.com/v1/data`}
                language="bash"
              />
            </section>
            
            <section className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">{t('docs_api.error_responses')}</h2>
              <p className="text-muted-foreground mb-4">
                {t('docs_api.error_responses_desc')}
              </p>
              <CodeBlock
                code={`{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request is missing required parameters"
  }
}`}
                language="json"
              />
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DocsApi;