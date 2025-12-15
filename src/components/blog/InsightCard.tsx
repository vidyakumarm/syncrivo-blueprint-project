import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import type { BlogPost } from '@/blog/posts';

interface InsightCardProps {
    post: BlogPost;
}

export const InsightCard: React.FC<InsightCardProps> = ({ post }) => {
    // Micro-schema for the list item
    const cardSchema = {
        "@type": "Article",
        "headline": post.title,
        "image": post.image,
        "datePublished": post.publishedAt,
        "author": { "@type": "Organization", "name": "SyncRivo" },
        "url": `https://syncrivo.ai/blog/${post.slug}`
    };

    return (
        <article className="h-full">
            <script type="application/ld+json">
                {JSON.stringify(cardSchema)}
            </script>
            <Link
                to={`/blog/${post.slug}`}
                className="group flex flex-col h-full bg-[#1A1D21] border border-slate-800 rounded-xl overflow-hidden hover:border-slate-600 hover:shadow-2xl transition-all duration-300"
                aria-label={`Read article: ${post.title}`}
            >
                {/* Image Container - Enforced Aspect Ratio */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10" />
                    <img
                        src={post.image}
                        alt=""
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-20">
                        <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-white bg-blue-600/90 backdrop-blur-sm rounded-full shadow-lg border border-blue-400/20">
                            {post.category.toUpperCase()}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-3 font-medium">
                        <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </time>
                        <span className="w-1 h-1 rounded-full bg-slate-600" />
                        <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{post.readingTime} min read</span>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-blue-400 transition-colors line-clamp-2">
                        {post.title}
                    </h3>

                    <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                        {post.description}
                    </p>

                    <div className="mt-auto flex items-center text-blue-400 text-sm font-semibold group/link">
                        Read Article
                        <ArrowRight className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
                    </div>
                </div>
            </Link>
        </article>
    );
};
