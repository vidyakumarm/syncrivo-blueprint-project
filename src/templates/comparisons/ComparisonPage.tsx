import React from 'react';
import { Helmet } from 'react-helmet-async';
import { breadcrumbSchema } from '@/components/seo/schema';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

export type ComparisonPageProps = {
    competitor: string;
    title: string;
    description: string;
    slug: string;
    strengths: string[];
    differences: { area: string; syncrivo: string; competitor: string }[];
};

export default function ComparisonPage({
    competitor,
    title,
    description,
    slug,
    strengths,
    differences,
}: ComparisonPageProps) {
    const url = `https://syncrivo.ai/alternatives/${slug}`;
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: "https://syncrivo.ai" },
        { name: "Alternatives", url: "https://syncrivo.ai/alternatives" },
        { name: competitor, url },
    ]);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Helmet>
                <title>{title} | SyncRivo</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={url} />
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbs)}
                </script>
            </Helmet>

            <Navigation />

            <main className="flex-1 max-w-6xl mx-auto px-6 py-16 w-full">
                <h1 className="text-4xl font-semibold mb-6 tracking-tight text-foreground">{title}</h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-12 border-b border-border/50 pb-8">{description}</p>

                <section className="mt-8 mb-16">
                    <h2 className="text-2xl font-semibold mb-6 text-foreground">When SyncRivo is a better fit</h2>
                    <ul className="grid gap-4 sm:grid-cols-2">
                        {strengths.map((s) => (
                            <li key={s} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg border border-border/50">
                                <div className="mt-1 w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                                    <Check className="w-3.5 h-3.5 text-success" />
                                </div>
                                <span className="font-medium text-foreground">{s}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6 text-foreground">Key Differences</h2>
                    <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-muted/50 border-b border-border text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                    <th className="p-4 w-1/3">Area</th>
                                    <th className="p-4 w-1/3 text-primary">SyncRivo</th>
                                    <th className="p-4 w-1/3 text-foreground">{competitor}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {differences.map((row) => (
                                    <tr key={row.area} className="hover:bg-muted/30 transition-colors">
                                        <td className="p-4 font-semibold text-foreground">{row.area}</td>
                                        <td className="p-4 text-foreground/90">{row.syncrivo}</td>
                                        <td className="p-4 text-muted-foreground">{row.competitor}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Internal Linking & CTA */}
                <section className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl text-center mb-16">
                    <h2 className="text-2xl font-bold mb-4">See how SyncRivo works in your environment</h2>
                    <p className="text-muted-foreground mb-8 text-lg">
                        Ready to explore dedicated messaging automation?
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button asChild size="lg" className="font-semibold">
                            <Link to="/signup">Book a Demo</Link>
                        </Button>
                        <Button variant="outline" asChild size="lg">
                            <Link to="/features/messaging-automation">View Messaging Features</Link>
                        </Button>
                    </div>
                    <p className="mt-6 text-sm text-muted-foreground">
                        <Link to="/usa" className="hover:underline">US Teams</Link> •{" "}
                        <Link to="/europe" className="hover:underline">European Compliance</Link>
                    </p>
                </section>

                <section className="mt-12 p-6 bg-muted/20 rounded border border-border/40">
                    <p className="text-xs text-muted-foreground">
                        Disclaimer: This comparison is based on publicly available information and
                        is intended for informational purposes only. All trademarks are the property of their respective owners.
                    </p>
                </section>
            </main>

            <Footer />
        </div>
    );
}
