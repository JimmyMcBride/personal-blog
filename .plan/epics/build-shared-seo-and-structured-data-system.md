---
created_at: "2026-04-17T17:35:50Z"
project: personal-blog
slug: build-shared-seo-and-structured-data-system
spec: build-shared-seo-and-structured-data-system
title: Build shared SEO and structured data system
type: epic
updated_at: "2026-04-17T17:35:50Z"
---

# Build shared SEO and structured data system

Created: 2026-04-17T17:35:50Z

## Outcome

A single shared metadata layer that generates correct canonical, Open Graph, Twitter, and JSON-LD output across home, blog index, post pages, and category/topic surfaces.

## Why Now

Current metadata is duplicated across routes, and the post page canonical is broken in `src/routes/blog/[slug]/+page.svelte` by composing `${url}${url}` instead of a post URL. The repo also has no JSON-LD output, which makes machine-readable authorship and page-type signals weak.

## Scope Boundary

- In scope:
  - shared SEO helpers
  - fixed canonical/OG/Twitter tags
  - JSON-LD for `WebSite`, `BlogPosting`, and breadcrumb-like page context
- Out of scope:
  - rewriting article copy
  - external indexing dashboards
  - building search

## Spec

`./.plan/specs/build-shared-seo-and-structured-data-system.md`

## Resources

- `src/lib/config.ts`
- `src/routes/+page.svelte`
- `src/routes/blog/+page.svelte`
- `src/routes/blog/[slug]/+page.svelte`
- `src/routes/blog/categories/[category]/+page.svelte`

## Progress

Drafted. Canonical bug confirmed during discovery.

## Notes

- This epic should produce reusable utilities, not more hand-authored `<svelte:head>` duplication.
- `ProfilePage` schema should wait for a stable author page route or be scoped carefully.
