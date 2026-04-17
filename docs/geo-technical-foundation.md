# GEO Technical Foundation

## Crawler Policy

The site now uses `static/robots.txt` as the crawl policy surface.

- Allow general search crawling.
- Allow search-facing AI crawlers that can generate discovery or referral traffic.
- Block training crawlers by default.
- Keep internal-only paths out of crawl.

This split matches the current GEO goal: maximize citation and discovery surfaces without opting into training access by default.

### Maintenance Rules

- Update `static/robots.txt` whenever crawler policy changes.
- Keep the sitemap URL in `robots.txt` aligned with production.
- Do not add `llms.txt` or `SearchAction` just because they sound GEO-related. Only add them when the site supports the behavior honestly.

## Manual Search Platform Checklist

These steps are outside the repo but belong to the GEO operating loop.

### Google Search Console

1. Verify the domain property for `jimmymcbride.dev`.
2. Submit `https://jimmymcbride.dev/sitemap.xml`.
3. Inspect `/`, `/blog`, and a sample of refreshed post URLs.
4. Confirm the selected canonical matches the intended page URL.
5. Review indexing, coverage, and Core Web Vitals after significant site changes.

### Bing Webmaster Tools

1. Verify the site property.
2. Submit the sitemap.
3. Check crawl and indexing coverage for core routes and refreshed posts.
4. Confirm any IndexNow submission path is accepted once implemented.

### IndexNow

1. Create and store the key material securely.
2. Decide whether submissions happen manually or via a publish hook.
3. Submit changed URLs after major refreshes or new topic hubs ship.
4. Confirm successful submission in Bing tooling or logs.

## Validation Checklist

- `robots.txt` renders in production.
- `sitemap.xml` renders in production.
- Sitemap contains the intended canonical URLs only.
- Search Console and Bing both show the sitemap as readable.
