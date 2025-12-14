export function organizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "SyncRivo",
        "url": "https://syncrivo.ai",
        "logo": "https://syncrivo.ai/logo.png", // Assuming a logo exists
        "sameAs": [
            "https://twitter.com/syncrivo",
            "https://linkedin.com/company/syncrivo",
            "https://github.com/syncrivo"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-555-010-9999", // Placeholder
            "contactType": "sales",
            "areaServed": "US",
            "availableLanguage": "en"
        }
    };
}

export function websiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "SyncRivo",
        "url": "https://syncrivo.ai",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://syncrivo.ai/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };
}

export function softwareApplicationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "SyncRivo",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Cloud, Web, SaaS",
        "description": "SyncRivo automates cross-platform messaging between Slack, Microsoft Teams, and Google Workspace for global teams.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "url": "https://syncrivo.ai/pricing"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "120"
        }
    };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
    if (!faqs || faqs.length === 0) return null;
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: {
                "@type": "Answer",
                text: f.a,
            },
        })),
    };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: item.name,
            item: item.url,
        })),
    };
}
