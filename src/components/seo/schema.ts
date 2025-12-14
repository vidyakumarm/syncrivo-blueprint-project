export function softwareApplicationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "SyncRivo",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description:
            "SyncRivo automates cross-platform messaging between Slack, Microsoft Teams, and Google Workspace for global teams.",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
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
