---
created_at: "2026-04-17T17:35:50Z"
epic: build-shared-seo-and-structured-data-system
project: personal-blog
slug: build-shared-seo-and-structured-data-system
status: done
title: Build shared SEO and structured data system Spec
type: spec
updated_at: "2026-04-17T18:10:19Z"
---

# Build shared SEO and structured data system Spec

Created: 2026-04-17T17:35:50Z

## Why

Metadata is currently fragmented and error-prone. A shared layer will fix correctness issues once and make future routes cheaper to ship.

## Problem

- Home and blog index hand-roll similar head tags.
- Category pages have no metadata.
- Post page canonical and `og:url` are incorrect.
- No JSON-LD output exists for site or article pages.

## Goals

- Centralize canonical/OG/Twitter generation.
- Fix post canonical correctness.
- Add JSON-LD for `WebSite` and `BlogPosting`.
- Add route-aware metadata to category/topic pages and future author surfaces.

## Non-Goals

- Rewriting post content.
- Implementing on-site search.
- Shipping schema types the site cannot support honestly.

## Constraints

- Post metadata comes from mdsvex frontmatter.
- Some fields are inconsistent today, especially around category quality and optional short descriptions.
- SearchAction must remain out until `/search` exists.

## Solution Shape

- Add shared SEO utility functions or a small metadata module under `src/lib/`.
- Build route-level helpers that derive canonical URLs from slug/path instead of string duplication.
- Render JSON-LD blocks from typed data on home and post pages.
- Prepare breadcrumb-compatible data for blog and topic navigation.

## Flows

- Route loads content or config.
- Metadata helper derives canonical URL, title, description, social image, and schema payload.
- Svelte page renders one shared head pattern plus optional JSON-LD blocks.

## Data / Interfaces

- `Post` frontmatter fields: `title`, `description`, `short`, `date`, `updated`, `image`, `categories`, `slug`.
- Site config fields from `src/lib/config.ts`.
- Route path context for blog index, category pages, and future hubs.

## Risks / Open Questions

- A proper author/about route may be needed before `ProfilePage` schema feels complete.
- Some posts may need metadata cleanup before schema generation is safe.

## Rollout

1. Fix post canonical and create shared helper.
2. Migrate home and blog index to shared helper.
3. Add category/topic metadata.
4. Add JSON-LD surfaces.

## Verification

- `bun run check`
- `bun run build`
- Inspect generated HTML head output for representative routes.

## Story Breakdown

- Story 1: Create shared SEO metadata helper.
- Story 2: Migrate post route and fix canonical bug.
- Story 3: Add metadata to archive pages.
- Story 4: Add JSON-LD site and article payloads.

## Resources

- `src/routes/+page.svelte`
- `src/routes/blog/+page.svelte`
- `src/routes/blog/[slug]/+page.svelte`
- `src/lib/config.ts`

## Notes

- Shared helper should reduce future drift, not just patch today’s bug.
