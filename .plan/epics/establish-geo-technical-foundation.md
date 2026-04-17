---
created_at: "2026-04-17T17:35:50Z"
project: personal-blog
slug: establish-geo-technical-foundation
spec: establish-geo-technical-foundation
title: Establish GEO technical foundation
type: epic
updated_at: "2026-04-17T17:35:50Z"
---

# Establish GEO technical foundation

Created: 2026-04-17T17:35:50Z

## Outcome

Reliable crawl and discovery surfaces for the site: accurate sitemap coverage, explicit crawler policy, and a documented external setup checklist for search/indexing platforms.

## Why Now

The current repo already exposes `src/routes/sitemap.xml/+server.ts`, but it only emits post URLs. There is no `robots.txt`, and external verification/setup steps are not captured in repo planning. Content and taxonomy work will compound poorly until these basics are trustworthy.

## Scope Boundary

- In scope:
  - sitemap coverage for core routes
  - crawler policy and `robots.txt`
  - external setup checklist for Search Console, Bing, and IndexNow
- Out of scope:
  - full analytics architecture
  - post-level schema generation
  - topic hub content strategy

## Spec

`./.plan/specs/establish-geo-technical-foundation.md`

## Resources

- `src/routes/sitemap.xml/+server.ts`
- `src/routes/rss.xml/+server.ts`
- `src/routes/api/posts/+server.ts`
- Research doc sections on robots, sitemap, crawler policy, and IndexNow

## Progress

Drafted. No implementation stories yet.

## Notes

- Treat `robots.txt` and sitemap as deployment truth, not marketing afterthoughts.
- SearchAction schema explicitly belongs to a later phase because the repo has no `/search` route today.
