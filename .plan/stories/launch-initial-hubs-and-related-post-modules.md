---
created_at: "2026-04-17T17:57:01Z"
epic: normalize-taxonomy-and-launch-topic-hubs
project: personal-blog
slug: launch-initial-hubs-and-related-post-modules
spec: normalize-taxonomy-and-launch-topic-hubs
status: done
title: Launch initial hubs and related-post modules
type: story
updated_at: "2026-04-17T18:09:58Z"
---

# Launch initial hubs and related-post modules

Created: 2026-04-17T17:57:01Z

## Description

Launch the first topic hubs and connect posts back into those hubs with topic-aware navigation and related-post surfaces.

## Acceptance Criteria

- [ ] Initial topic pages render explanatory hub content instead of only a bare filtered post list.

- [ ] Post pages surface related-post or hub navigation modules tied to the canonical topic map.
## Verification

- bun run build
## Resources

- [Canonical Spec](../specs/normalize-taxonomy-and-launch-topic-hubs.md)

- src/routes/blog/categories/[category]/+page.svelte

- src/routes/blog/[slug]/+page.svelte
## Notes
