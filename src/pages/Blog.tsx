import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { breadcrumbSchema } from '@/components/seo/schema';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { posts, type BlogCategory } from '@/blog/posts';
import { FeaturedPost } from '@/components/blog/FeaturedPost';
import { InsightCard } from '@/components/blog/InsightCard';
import { CategoryFilter } from '@/components/blog/CategoryFilter';

export default function BlogIndex() {
    const url = "https://syncrivo.ai/blog";
    const [activeCategory, setActiveCategory] = useState('All');

    // SEO Data
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: "https://syncrivo.ai" },
        { name: "Blog", url },
    ]);

    // Derived State
    const categories = useMemo(() => {
        const unique = new Set(posts.map(p => p.category));
        return Array.from(unique) as BlogCategory[];
    }, []);

    const filteredPosts = useMemo(() => {
        if (activeCategory === 'All') return posts;
        return posts.filter(p => p.category === activeCategory);
    }, [activeCategory]);

    // Editorial Logic: 
    // 1. Look for explicitly featured post
    // 2. Fallback to highest priority
    // 3. Fallback to most recent (index 0)
    const featuredPost = useMemo(() => {
        // Explicit feature
        const explicit = posts.find(p => p.isFeatured);
        if (explicit) return explicit;

        // Rank by priority
        const prioritySort = [...posts].sort((a, b) => (b.priority || 0) - (a.priority || 0));
        if (prioritySort[0].priority && prioritySort[0].priority > 0) return prioritySort[0];

        // Fallback
        return posts[0];
    }, []);

    // Grid Logic
    // If we are showing 'All', we exclude the Featured Post from the grid to avoid duplication
    // If filtering, we show everything matching the filter
    const gridPosts = useMemo(() => {
        if (activeCategory === 'All') {
            return filteredPosts.filter(p => p.slug !== featuredPost.slug);
        }
        return filteredPosts;
    }, [activeCategory, filteredPosts, featuredPost]);

    return (
        <div className="min-h-screen bg-[#0B0D0F] flex flex-col font-sans selection:bg-blue-500/30">
            <Helmet>
                <title>SyncRivo Insights | Enterprise Messaging Automation & Strategy</title>
                <meta name="description" content="Thought leadership on enterprise communication, messaging automation, and global operational strategy." />
                <link rel="canonical" href={url} />
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbs)}
                </script>
            </Helmet>

            <Navigation />

            <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-24">

                {/* 1. Header Area with dynamic title based on filter */}
                <div className="mb-16 animate-in fade-in duration-700">
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
                        {activeCategory === 'All' ? 'Featured Insights' : activeCategory}
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
                        Explore our latest thinking on the future of enterprise communication, reliability engineering, and global workflow automation.
                    </p>
                </div>

                {/* 2. Hero Section (Only visible on 'All') */}
                {activeCategory === 'All' && featuredPost && (
                    <FeaturedPost post={featuredPost} />
                )}

                {/* 3. Filter Bar */}
                <CategoryFilter
                    categories={categories}
                    activeCategory={activeCategory}
                    onSelect={setActiveCategory}
                />

                {/* 4. The Grid */}
                {gridPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 animate-in fade-in duration-700 slide-in-from-bottom-4">
                        {gridPosts.map((post) => (
                            <InsightCard key={post.slug} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
                        <p className="text-slate-500 text-lg">No insights found for this category yet.</p>
                        <button
                            onClick={() => setActiveCategory('All')}
                            className="mt-4 text-blue-400 hover:text-blue-300 font-medium"
                        >
                            View all insights
                        </button>
                    </div>
                )}

                {/* 5. Contextual CTA - Strategic Upgrade */}
                <div className="mt-32 border-t border-slate-800 pt-16 pb-8">
                    <div className="bg-gradient-to-br from-blue-900/10 to-slate-900 border border-slate-800 rounded-2xl p-8 md:p-16 text-center max-w-4xl mx-auto">
                        <span className="text-blue-500 font-bold tracking-wider text-xs uppercase mb-4 block">
                            Enterprise Architecture
                        </span>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Get architecture insights like this monthly
                        </h3>
                        <p className="text-slate-400 mb-8 max-w-xl mx-auto text-lg">
                            Join 2000+ engineering leaders who read our deep dives on distributed systems and messaging reliability.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-3">
                            <input
                                type="email"
                                placeholder="Enter your work email"
                                className="bg-[#0B0D0F] border border-slate-700 text-white px-5 py-4 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-[320px]"
                                aria-label="Work Email Address"
                            />
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg hover:shadow-blue-900/20">
                                Subscribe
                            </button>
                        </div>
                        <p className="text-slate-600 text-xs mt-6">
                            No spam. Unsubscribe anytime.
                        </p>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}
