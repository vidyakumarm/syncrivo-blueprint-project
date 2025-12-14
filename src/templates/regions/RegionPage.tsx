import React from 'react';
import { breadcrumbSchema } from '@/components/seo/schema';
import { SEO } from '@/components/seo/SEO';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

export type RegionPageProps = {
    region: string;
    headline: string;
    description: string;
    slug: string;
    children: React.ReactNode;
};

export default function RegionPage({
    region,
    headline,
    description,
    slug,
    children,
}: RegionPageProps) {
    const url = `https://syncrivo.ai/${slug}`;
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: "https://syncrivo.ai" },
        { name: region, url },
    ]);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <SEO
                title={`${headline} | SyncRivo`}
                description={description}
                canonical={url}
                schemas={[breadcrumbs]}
            />

            <Navigation />

            <main className="flex-1 max-w-6xl mx-auto px-6 py-16 w-full">
                <h1 className="text-4xl font-semibold mb-6 tracking-tight text-foreground">{headline}</h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-12 border-b border-border/50 pb-8">{description}</p>

                <section className="prose prose-slate dark:prose-invert max-w-none">
                    {children}
                </section>
            </main>

            <Footer />
        </div>
    );
}
