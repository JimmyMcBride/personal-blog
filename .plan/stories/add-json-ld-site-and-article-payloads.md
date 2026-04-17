---
created_at: "2026-04-17T17:57:01Z"
epic: build-shared-seo-and-structured-data-system
project: personal-blog
slug: add-json-ld-site-and-article-payloads
spec: build-shared-seo-and-structured-data-system
status: done
title: Add JSON-LD site and article payloads
type: story
updated_at: "2026-04-17T18:02:37Z"
---

# Add JSON-LD site and article payloads

Created: 2026-04-17T17:57:01Z

## Description

Add site-level and article-level JSON-LD to the routes that can support it honestly, without inventing unsupported search features or fake structured data targets.

## Acceptance Criteria

- [ ] The site emits honest WebSite or equivalent site-level schema without fake SearchAction markup.

- [ ] Blog post pages emit BlogPosting JSON-LD using post metadata and canonical URLs.
## Verification

- bun run build
## Resources

- [Canonical Spec](../specs/build-shared-seo-and-structured-data-system.md)

- src/routes/+page.svelte

- src/routes/blog/[slug]/+page.svelte
## Notes
