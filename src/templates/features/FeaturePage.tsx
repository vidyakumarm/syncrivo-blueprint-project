import React from 'react';
import { Helmet } from 'react-helmet-async';
import { faqSchema, breadcrumbSchema } from '@/components/seo/schema';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

export type FeaturePageProps = {
    title: string;
    description: string;
    slug: string;
    faqs?: { q: string; a: string }[];
    children: React.ReactNode;
};

export default function FeaturePage({
    title,
    description,
    slug,
    faqs,
    children,
}: FeaturePageProps) {
    const url = `https://syncrivo.ai/features/${slug}`;
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: "https://syncrivo.ai" },
        { name: "Features", url: "https://syncrivo.ai/features" },
        { name: title, url },
    ]);
    const faqData = faqs ? faqSchema(faqs) : null;

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Helmet>
                <title>{title} | SyncRivo</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={url} />
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbs)}
                </script>
                {faqData && (
                    <script type="application/ld+json">
                        {JSON.stringify(faqData)}
                    </script>
                )}
            </Helmet>

            <Navigation />

            <main className="flex-1 max-w-6xl mx-auto px-6 py-16 w-full">
                <h1 className="text-4xl font-semibold mb-6 tracking-tight text-foreground">{title}</h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-12 border-b border-border/50 pb-8">{description}</p>

                <section className="prose prose-slate dark:prose-invert max-w-none">
                    {children}
                </section>
            </main>

            <Footer />
        </div>
    );
}
