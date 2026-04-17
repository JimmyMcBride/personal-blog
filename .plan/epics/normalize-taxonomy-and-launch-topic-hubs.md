---
created_at: "2026-04-17T17:35:50Z"
project: personal-blog
slug: normalize-taxonomy-and-launch-topic-hubs
spec: normalize-taxonomy-and-launch-topic-hubs
title: Normalize taxonomy and launch topic hubs
type: epic
updated_at: "2026-04-17T17:35:50Z"
---

# Normalize taxonomy and launch topic hubs

Created: 2026-04-17T17:35:50Z

## Outcome

A canonical topic model for the blog plus hub pages that explain each topic, group related posts, and replace thin archive behavior with deliberate information architecture.

## Why Now

Post frontmatter contains typo and drift categories such as `texutal-healing`, `tutoiral`, and `careerdevelopment`. Current category pages only filter posts and render a heading, which is too thin for strong topic retrieval.

## Scope Boundary

- In scope:
  - category inventory and normalization map
  - canonical topic set
  - hub/page architecture
  - alias or redirect strategy for old category URLs
- Out of scope:
  - large-scale content rewriting
  - automated semantic clustering infrastructure
  - cross-site taxonomy governance

## Spec

`./.plan/specs/normalize-taxonomy-and-launch-topic-hubs.md`

## Resources

- `src/posts/*.md`
- `src/routes/blog/categories/[category]/+page.ts`
- `src/routes/blog/categories/[category]/+page.svelte`
- brainstorm category inventory from 2026-04-17

## Progress

Drafted. Category inventory complete enough to start canonical mapping.

## Notes

- First hubs should align with actual post gravity, not idealized future topics.
- Hub rollout should feed sitemap coverage work in the foundation epic.
