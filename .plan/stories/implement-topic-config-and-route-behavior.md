---
created_at: "2026-04-17T17:57:01Z"
epic: normalize-taxonomy-and-launch-topic-hubs
project: personal-blog
slug: implement-topic-config-and-route-behavior
spec: normalize-taxonomy-and-launch-topic-hubs
status: done
title: Implement topic config and route behavior
type: story
updated_at: "2026-04-17T18:09:58Z"
---

# Implement topic config and route behavior

Created: 2026-04-17T17:57:01Z

## Description

Implement the reusable topic configuration and route behavior needed to serve canonical topic pages while keeping legacy category archives and redirects working.

## Acceptance Criteria

- [ ] Route logic can resolve a canonical topic and any supported aliases to the same topic content.

- [ ] The topic routing behavior is driven by config instead of hard-coded per-page branching.
## Verification

- bun run check
## Resources

- [Canonical Spec](../specs/normalize-taxonomy-and-launch-topic-hubs.md)

- src/routes/blog/categories/[category]/+page.ts

- src/lib/
## Notes
