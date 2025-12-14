import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import {
    organizationSchema,
    websiteSchema,
    breadcrumbSchema
} from './schema';

interface SEOProps {
    title: string;
    description: string;
    image?: string;
    type?: string;
    canonical?: string;
    schemas?: any[]; // Allow passing additional page-specific schemas
}

export const SEO = ({
    title,
    description,
    image = 'https://syncrivo.ai/og-image.jpg',
    type = 'website',
    canonical,
    schemas = []
}: SEOProps) => {
    const location = useLocation();
    const baseUrl = 'https://syncrivo.ai';
    const canonicalUrl = canonical || `${baseUrl}${location.pathname}`;

    // Ensure strict title length (keeping it under 60 chars where possible)
    // Appending strict brand name if space allows
    const fullTitle = title.length > 45 ? title : `${title} | SyncRivo`;

    // Generate Breadcrumb Schema automatically based on path
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbItems = pathSegments.map((segment, index) => {
        const url = `${baseUrl}/${pathSegments.slice(0, index + 1).join('/')}`;
        // Simple capitalization for name, can be improved with a mapping
        const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
        return { name, url };
    });

    // Add Home to breadcrumb
    if (breadcrumbItems.length > 0) {
        breadcrumbItems.unshift({ name: 'Home', url: baseUrl });
    }

    // Combine all schemas
    const allSchemas = [
        organizationSchema(),
        websiteSchema(),
        ...(breadcrumbItems.length > 0 ? [breadcrumbSchema(breadcrumbItems)] : []),
        ...schemas
    ];

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="SyncRivo" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={canonicalUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* JSON-LD Schema */}
            <script type="application/ld+json">
                {JSON.stringify(allSchemas)}
            </script>
        </Helmet>
    );
};
