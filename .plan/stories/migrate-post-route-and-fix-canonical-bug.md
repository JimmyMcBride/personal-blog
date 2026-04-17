---
created_at: "2026-04-17T17:57:01Z"
epic: build-shared-seo-and-structured-data-system
project: personal-blog
slug: migrate-post-route-and-fix-canonical-bug
spec: build-shared-seo-and-structured-data-system
status: done
title: Migrate post route and fix canonical bug
type: story
updated_at: "2026-04-17T18:02:37Z"
---

# Migrate post route and fix canonical bug

Created: 2026-04-17T17:57:01Z

## Description

Move the post route onto the shared metadata helper and replace the broken canonical and social URL output with the correct slug-derived page URL.

## Acceptance Criteria

- [ ] The blog post page emits the correct canonical URL and social URL for the current slug.

- [ ] The post route uses the shared metadata helper instead of duplicating URL logic inline.
## Verification

- bun run check
## Resources

- [Canonical Spec](../specs/build-shared-seo-and-structured-data-system.md)

- src/routes/blog/[slug]/+page.svelte
## Notes
