import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { CodeBlock } from '@/components/docs/CodeBlock';

const DocsApi = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">API Documentation</h1>
            <p className="text-xl text-muted-foreground">
              Complete reference for integrating with our API
            </p>
          </div>
          
          <div className="space-y-8">
            <section className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
              <p className="text-muted-foreground mb-4">
                All API requests require authentication using an API key in the Authorization header.
              </p>
              <CodeBlock
                code={`curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.example.com/v1/data`}
                language="bash"
              />
            </section>
            
            <section className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Base URL</h2>
              <p className="text-muted-foreground mb-4">
                All API requests should be made to:
              </p>
              <CodeBlock
                code="https://api.example.com/v1"
                language="text"
              />
            </section>
            
            <section className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Endpoints</h2>
              
              <h3 className="text-lg font-medium mb-3">GET /data</h3>
              <p className="text-muted-foreground mb-4">
                Retrieve your data records
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
              
              <h3 className="text-lg font-medium mb-3 mt-6">POST /data</h3>
              <p className="text-muted-foreground mb-4">
                Create a new data record
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
              <h2 className="text-2xl font-semibold mb-4">Error Responses</h2>
              <p className="text-muted-foreground mb-4">
                The API returns standard HTTP status codes and error messages:
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