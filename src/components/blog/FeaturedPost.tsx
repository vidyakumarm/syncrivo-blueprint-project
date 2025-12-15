import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import type { BlogPost } from '@/blog/posts';

interface FeaturedPostProps {
    post: BlogPost;
}

export const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
    // Schema for SEO rich results
    const articleSchema = {
        "@type": "Article",
        "headline": post.title,
        "image": post.image,
        "datePublished": post.publishedAt,
        "author": { "@type": "Organization", "name": "SyncRivo" },
        "publisher": { "@type": "Organization", "name": "SyncRivo" },
        "description": post.description
    };

    return (
        <section className="relative w-full mb-20 group">
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(articleSchema)}
                </script>
            </Helmet>

            <div className="flex flex-col lg:flex-row bg-[#1A1D21] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">

                {/* Content Side */}
                <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center relative order-2 lg:order-1">
                    {/* Decorative top accent */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />

                    <div className="flex items-center gap-2 text-blue-400 font-bold tracking-wide text-xs uppercase mb-6">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        Featured Insight
                    </div>

                    <Link to={`/blog/${post.slug}`} className="block">
                        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight group-hover:text-blue-400 transition-colors">
                            {post.title}
                        </h2>
                    </Link>

                    <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl">
                        {post.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-400 mb-8">
                        <span className="bg-slate-800 text-white px-3 py-1 rounded-full border border-slate-700">
                            {post.category}
                        </span>

                        {/* Secondary classification for metadata completeness */}
                        {post.type && (
                            <span className="text-blue-400/80 uppercase text-xs tracking-wider">
                                {post.type}
                            </span>
                        )}
                        <span>•</span>
                        <time>{post.publishedAt}</time>
                        <span>•</span>
                        <span>{post.readingTime} min read</span>
                    </div>

                    <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-all w-fit group/btn"
                        aria-label={`Read full article: ${post.title}`}
                    >
                        Read Full Article
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Image Side - Priority Loading */}
                <div className="lg:w-[55%] relative h-[300px] lg:h-auto overflow-hidden order-1 lg:order-2">
                    <div className="absolute inset-0 bg-blue-900/10 z-10 mix-blend-multiply group-hover:bg-transparent transition-colors duration-500" />
                    {/* Gradient Overlay for text readability if over image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1D21] via-transparent to-transparent opacity-20 lg:opacity-0" />

                    {/* PROMINENT TAB / BADGE */}
                    {post.type && (
                        <div className="absolute top-6 left-6 z-20">
                            <span className="bg-blue-600/95 text-white text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-wider shadow-xl backdrop-blur-sm border border-white/10">
                                {post.type}
                            </span>
                        </div>
                    )}

                    <img
                        src={post.image}
                        alt="" // Decorative since it accompanies text
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="eager" // Priority loading for Hero
                        fetchPriority="high"
                    />
                </div>
            </div>
        </section>
    );
};
