# docs/audits/seo.md

## Metadata
- Title present: **Yes**
- Description present: **Yes**
- Canonical present: **No** (CRITICAL)

## Crawl
- robots.txt exists: **Yes** (Matches `public/robots.txt`)
- sitemap.xml exists: **No** (Not found in public/ or headers)

## Notes
- **Duplicate titles?**: Risk on SPA routes if Title management isn't dynamic (React Helmet/Head).
- **Missing OG image?**: No, present (`og-image.jpg` and `twitter-card.jpg`).
- **Keywords**: Present but deprecated by Google (still useful for other engines).
