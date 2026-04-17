---
created_at: "2026-04-17T17:35:50Z"
epic: establish-geo-technical-foundation
project: personal-blog
slug: establish-geo-technical-foundation
status: done
title: Establish GEO technical foundation Spec
type: spec
updated_at: "2026-04-17T18:10:19Z"
---

# Establish GEO technical foundation Spec

Created: 2026-04-17T17:35:50Z

## Why

Content quality improvements will underperform until the site exposes accurate crawl and discovery signals to both search engines and AI-facing search crawlers.

## Problem

- No `robots.txt` exists in `static/`.
- `src/routes/sitemap.xml/+server.ts` only emits blog post URLs.
- External setup work for Search Console, Bing Webmaster Tools, and IndexNow is not captured in repo planning.
- The repo lacks an explicit documented crawler policy for search bots versus training bots.

## Goals

- Serve an explicit `robots.txt` and sitemap strategy.
- Expand sitemap coverage to include core canonical routes.
- Define a crawler access policy aligned with GEO goals.
- Capture external platform setup as a repo-local checklist or operating doc.

## Non-Goals

- Adding `SearchAction` schema before a real `/search` route exists.
- Deep analytics event design.
- Content rewriting.

## Constraints

- Site is SvelteKit on Bun with prerendered surfaces.
- Some work is operational, not code-only.
- Taxonomy normalization may change which category or hub URLs belong in sitemap later.

## Solution Shape

- Add a crawl policy surface, likely `static/robots.txt`.
- Refactor sitemap generation so it includes core static routes and expandable content routes.
- Add documentation for off-repo platform setup and revalidation steps.
- Leave `llms.txt` out until there is a clear reason and policy for it.

## Flows

- Deploy or refresh content.
- Validate sitemap and robots output.
- Submit or verify via Search Console/Bing/IndexNow.
- Re-check indexed/canonical status after material changes.

## Data / Interfaces

- Core route list: `/`, `/blog`, RSS, categories or future topics.
- Content route list from `src/routes/api/posts/+server.ts`.
- Future topic route list from taxonomy config once that epic lands.

## Risks / Open Questions

- IndexNow requires key management and endpoint design outside current repo state.
- Category route inclusion in sitemap may churn until taxonomy is normalized.
- Need user decision on whether to block training bots while allowing search bots.

## Rollout

1. Add crawl policy docs and route/file surfaces.
2. Expand sitemap coverage.
3. Verify outputs locally and in production.
4. Complete off-repo platform checklist.

## Verification

- `bun run build`
- Inspect generated `robots.txt` and `sitemap.xml` output locally or in build artifacts.
- Manual curl/browser checks against deployed endpoints.

## Story Breakdown

- Story 1: Add and document crawler policy surface.
- Story 2: Expand sitemap coverage and stable URL sources.
- Story 3: Add external search platform setup checklist.

## Resources

- GEO research doc
- `src/routes/sitemap.xml/+server.ts`
- `src/routes/rss.xml/+server.ts`

## Notes

- Keep sitemap accurate and boring. Decorative priority data is not a priority.
