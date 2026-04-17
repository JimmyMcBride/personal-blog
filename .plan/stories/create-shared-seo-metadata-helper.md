---
created_at: "2026-04-17T17:57:01Z"
epic: build-shared-seo-and-structured-data-system
project: personal-blog
slug: create-shared-seo-metadata-helper
spec: build-shared-seo-and-structured-data-system
status: done
title: Create shared SEO metadata helper
type: story
updated_at: "2026-04-17T18:02:37Z"
---

# Create shared SEO metadata helper

Created: 2026-04-17T17:57:01Z

## Description

Create a shared metadata helper under `src/lib` so canonical URLs, social metadata, and page-level defaults are generated from typed inputs instead of duplicated route logic.

## Acceptance Criteria

- [ ] A shared metadata helper exists under src/lib and can derive canonical, social, and route metadata from typed inputs.

- [ ] Home, blog, and post routes have a path to use the shared helper instead of duplicating values by hand.
## Verification

- bun run check
## Resources

- [Canonical Spec](../specs/build-shared-seo-and-structured-data-system.md)

- src/lib/

- src/lib/config.ts
## Notes
