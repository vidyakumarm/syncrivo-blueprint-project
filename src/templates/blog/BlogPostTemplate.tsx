import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { breadcrumbSchema } from '@/components/seo/schema';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { BlogPost, posts } from '@/blog/posts';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { ArrowLeft, Share2, Linkedin, Twitter, Link as LinkIcon, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

type BlogPostTemplateProps = {
    post: BlogPost;
};

// Simple Scroll Progress Hook
function useScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const currentScroll = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight) {
                setProgress(Number((currentScroll / scrollHeight).toFixed(2)) * 100);
            }
        };

        window.addEventListener('scroll', updateProgress);
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return progress;
}

export default function BlogPostTemplate({ post }: BlogPostTemplateProps) {
    const url = `https://syncrivo.ai/blog/${post.slug}`;
    const progress = useScrollProgress();

    // Get related posts (same category, excluding current)
    const relatedPosts = posts
        .filter(p => p.category === post.category && p.slug !== post.slug)
        .slice(0, 3);

    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: "https://syncrivo.ai" },
        { name: "Blog", url: "https://syncrivo.ai/blog" },
        { name: post.title, url },
    ]);

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans">
            <Helmet>
                <title>{post.title} | SyncRivo Blog</title>
                <meta name="description" content={post.description} />
                <link rel="canonical" href={url} />
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbs)}
                </script>
            </Helmet>

            {/* Reading Progress Bar - Sticky Top */}
            <div className="fixed top-0 left-0 h-1 bg-primary/20 w-full z-50">
                <div
                    className="h-full bg-primary transition-all duration-100 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <Navigation />

            {/* Hero Section */}
            <header className="pt-24 pb-12 md:pt-32 md:pb-16 px-6 max-w-5xl mx-auto w-full text-center">
                <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Link to="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Insights
                    </Link>

                    <div className="flex items-center justify-center gap-3 mb-6">
                        <span className="px-3 py-1 text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 rounded-full">
                            {post.category}
                        </span>
                        {post.type && (
                            <span className="px-3 py-1 text-xs font-semibold tracking-wider uppercase text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-full">
                                {post.type}
                            </span>
                        )}
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
                        {post.title}
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
                        {post.description}
                    </p>

                    <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground border-y border-border/40 py-4 max-w-2xl mx-auto">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <time dateTime={post.publishedAt}>
                                {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </time>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{post.readingTime} min read</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Featured Image */}
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 mb-16 md:mb-24">
                <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
            </div>

            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 relative grid grid-cols-1 lg:grid-cols-[1fr_minmax(auto,65ch)_1fr] gap-12">

                {/* Left Sidebar - Sticky Share */}
                <aside className="hidden lg:flex flex-col items-end pt-2">
                    <div className="sticky top-32 flex flex-col gap-4">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 text-right">Share</p>
                        <Button variant="outline" size="icon" className="rounded-full hover:text-[#0077b5] hover:border-[#0077b5]/30">
                            <Linkedin className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full hover:text-black dark:hover:text-white">
                            <Twitter className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full" onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                        }}>
                            <LinkIcon className="w-4 h-4" />
                        </Button>
                    </div>
                </aside>

                {/* Main Content */}
                <article className="prose prose-lg prose-slate dark:prose-invert max-w-none 
                    prose-headings:font-bold prose-headings:tracking-tight 
                    prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-300
                    prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                    prose-blockquote:border-l-primary prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-900/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
                    prose-img:rounded-xl prose-img:shadow-lg">
                    <ReactMarkdown
                        components={{
                            a: ({ ...props }) => {
                                const isInternal = props.href?.startsWith('/');
                                if (isInternal) {
                                    return <Link to={props.href as string}>{props.children}</Link>;
                                }
                                return <a {...props} target="_blank" rel="noopener noreferrer" />;
                            },
                            h2: ({ children }) => <h2 className="text-3xl mt-12 mb-6">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-2xl mt-8 mb-4">{children}</h3>
                        }}
                    >
                        {post.content}
                    </ReactMarkdown>
                </article>

                {/* Right Sidebar - ToC or Placeholder */}
                <aside className="hidden lg:block" />

            </main>

            {/* Related/Footer Navigation */}
            <div className="border-t border-border mt-24 bg-card/30">
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <h3 className="text-2xl font-bold mb-8">Related Insights</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {relatedPosts.map(related => (
                            <Link key={related.slug} to={`/blog/${related.slug}`} className="group block">
                                <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-muted">
                                    <img src={related.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <p className="text-xs font-semibold text-primary mb-2 uppercase tracking-wide">{related.category}</p>
                                <h4 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2">{related.title}</h4>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
