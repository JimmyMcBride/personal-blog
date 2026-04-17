---
created_at: "2026-04-17T17:57:01Z"
epic: establish-geo-technical-foundation
project: personal-blog
slug: expand-sitemap-coverage-and-stable-url-sources
spec: establish-geo-technical-foundation
status: done
title: Expand sitemap coverage and stable URL sources
type: story
updated_at: "2026-04-17T18:02:37Z"
---

# Expand sitemap coverage and stable URL sources

Created: 2026-04-17T17:57:01Z

## Description

Refactor sitemap generation to include stable site routes beyond posts and source those URLs from reusable code paths that can grow with topic hubs and taxonomy changes.

## Acceptance Criteria

- [ ] The sitemap includes stable core routes in addition to canonical post URLs.

- [ ] Sitemap generation uses deterministic route sources that can grow with topic or category pages.
## Verification

- bun run build
## Resources

- [Canonical Spec](../specs/establish-geo-technical-foundation.md)

- src/routes/sitemap.xml/+server.ts

- src/routes/api/posts/+server.ts
## Notes
