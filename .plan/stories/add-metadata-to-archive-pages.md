---
created_at: "2026-04-17T17:57:01Z"
epic: build-shared-seo-and-structured-data-system
project: personal-blog
slug: add-metadata-to-archive-pages
spec: build-shared-seo-and-structured-data-system
status: done
title: Add metadata to archive pages
type: story
updated_at: "2026-04-17T18:02:37Z"
---

# Add metadata to archive pages

Created: 2026-04-17T17:57:01Z

## Description

Apply the shared metadata helper to the blog index and archive-style pages so each surface exposes route-specific title, description, canonical, and social metadata.

## Acceptance Criteria

- [ ] Blog index and category or topic archive pages emit route-specific title, description, canonical, and social metadata.

- [ ] Archive metadata is generated from shared helper code rather than copy-pasted head blocks.
## Verification

- bun run check
## Resources

- [Canonical Spec](../specs/build-shared-seo-and-structured-data-system.md)

- src/routes/blog/+page.svelte

- src/routes/blog/categories/[category]/+page.svelte
## Notes
