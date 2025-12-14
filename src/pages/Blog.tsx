import React from 'react';
import { Helmet } from 'react-helmet-async';
import { breadcrumbSchema } from '@/components/seo/schema';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { posts } from '@/blog/posts';
import { Link } from 'react-router-dom';

export default function BlogIndex() {
    const url = "https://syncrivo.ai/blog";
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: "https://syncrivo.ai" },
        { name: "Blog", url },
    ]);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Helmet>
                <title>SyncRivo Blog | Enterprise Messaging Automation Insights</title>
                <meta name="description" content="Insights on messaging automation, enterprise communication, and global workflows from the SyncRivo team." />
                <link rel="canonical" href={url} />
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbs)}
                </script>
            </Helmet>

            <Navigation />

            <main className="flex-1 max-w-6xl mx-auto px-6 py-16 w-full">
                <div className="max-w-3xl mb-16">
                    <h1 className="text-4xl font-semibold tracking-tight text-foreground mb-6">SyncRivo Blog</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Insights on messaging automation, enterprise communication, and global workflows.
                    </p>
                </div>

                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <article key={post.slug} className="flex flex-col group h-full border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 bg-card">
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="mb-4">
                                    <span className="inline-block px-3 py-1 text-xs font-medium text-muted-foreground bg-muted rounded-full">
                                        {post.category}
                                    </span>
                                </div>
                                <Link to={`/blog/${post.slug}`} className="block mb-4">
                                    <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                                        {post.title}
                                    </h2>
                                </Link>
                                <p className="text-muted-foreground mb-6 line-clamp-3">
                                    {post.description}
                                </p>
                                <div className="mt-auto pt-6 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
                                    <time dateTime={post.publishedAt}>{post.publishedAt}</time>
                                    <span>{post.readingTime} min read</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
