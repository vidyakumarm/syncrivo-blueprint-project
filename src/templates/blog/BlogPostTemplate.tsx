import React from 'react';
import { Helmet } from 'react-helmet-async';
import { breadcrumbSchema } from '@/components/seo/schema';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { BlogPost } from '@/blog/posts';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

type BlogPostTemplateProps = {
    post: BlogPost;
};

export default function BlogPostTemplate({ post }: BlogPostTemplateProps) {
    const url = `https://syncrivo.ai/blog/${post.slug}`;
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: "https://syncrivo.ai" },
        { name: "Blog", url: "https://syncrivo.ai/blog" },
        { name: post.title, url },
    ]);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Helmet>
                <title>{post.title} | SyncRivo Blog</title>
                <meta name="description" content={post.description} />
                <link rel="canonical" href={url} />
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbs)}
                </script>
            </Helmet>

            <Navigation />

            <article className="flex-1 max-w-3xl mx-auto px-6 py-16 w-full">
                <div className="mb-8">
                    <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wide text-primary bg-primary/10 rounded-full mb-4">
                        {post.category}
                    </span>
                    <h1 className="text-4xl font-semibold tracking-tight text-foreground mb-4">{post.title}</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-6">{post.description}</p>
                    <div className="text-sm text-muted-foreground border-b border-border/50 pb-8">
                        <time dateTime={post.publishedAt}>{post.publishedAt}</time> • {post.readingTime} min read
                    </div>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-primary hover:prose-a:underline">
                    <ReactMarkdown
                        components={{
                            a: ({ ...props }) => {
                                const isInternal = props.href?.startsWith('/');
                                if (isInternal) {
                                    return <Link to={props.href as string}>{props.children}</Link>;
                                }
                                return <a {...props} />;
                            },
                            p: ({ children }) => <p className="mb-6 leading-relaxed">{children}</p>,
                            ul: ({ children }) => <ul className="my-6 space-y-2 list-disc pl-6">{children}</ul>,
                            ol: ({ children }) => <ol className="my-6 space-y-2 list-decimal pl-6">{children}</ol>,
                            h2: ({ children }) => <h2 className="text-2xl font-bold mt-12 mb-6">{children}</h2>,
                            blockquote: ({ children }) => <blockquote className="border-l-4 border-primary pl-4 italic my-8">{children}</blockquote>
                        }}
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>

                <div className="mt-16 pt-8 border-t border-border">
                    <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                        ← Back to all posts
                    </Link>
                </div>
            </article>

            <Footer />
        </div>
    );
}
