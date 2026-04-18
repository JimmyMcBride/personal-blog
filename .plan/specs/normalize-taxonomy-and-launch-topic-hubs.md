---
created_at: "2026-04-17T17:35:50Z"
epic: normalize-taxonomy-and-launch-topic-hubs
project: personal-blog
slug: normalize-taxonomy-and-launch-topic-hubs
status: done
title: Normalize taxonomy and launch topic hubs Spec
type: spec
updated_at: "2026-04-17T18:10:19Z"
---

# Normalize taxonomy and launch topic hubs Spec

Created: 2026-04-17T17:35:50Z

## Why

Topic identity is currently fragmented by inconsistent frontmatter and thin archive pages, which makes both human navigation and machine retrieval weaker than it should be.

## Problem

- Raw categories in `src/posts/*.md` contain typos and overlapping concepts.
- Current category pages are simple filters with almost no explanatory content.
- There is no central topic model to drive internal links, sitemap inclusion, or hub copy.

## Goals

- Define a canonical topic set.
- Map existing categories to those topics.
- Create hub pages with useful intros and related-post groupings.
- Preserve or redirect legacy category URLs safely.

## Non-Goals

- Full search engine.
- Automated ML topic discovery.
- Rewriting every existing post during taxonomy cleanup.

## Constraints

- Existing category URLs may already be indexed.
- Topic choices should reflect actual post inventory, not aspirational coverage alone.
- Hub scope needs to stay maintainable for a solo author.

## Solution Shape

- Create a topic map config with canonical slugs, labels, descriptions, and aliases.
- Normalize post frontmatter toward canonical topic names.
- Upgrade or replace category pages with richer topic hub routes.
- Add internal-link rules that point posts back to their hub and to adjacent related posts.

## Flows

- Inventory existing categories.
- Decide canonical topics and alias mappings.
- Update post metadata and routing behavior.
- Launch first hubs and wire them into sitemap and navigation.

## Data / Interfaces

- Frontmatter categories in `src/posts/*.md`
- Category/topic config module
- Routes for legacy categories and new topic hubs

## Risks / Open Questions

- Redirect strategy needs care so existing indexed category URLs do not break abruptly.
- Some categories may be better modeled as series labels than permanent taxonomy.

## Rollout

1. Freeze category inventory and canonical topic proposal.
2. Add mapping config and route strategy.
3. Launch first 3 hubs.
4. Normalize remaining posts in batches.

## Verification

- `bun run check`
- `bun run build`
- Spot-check topic pages, category aliases, and internal links.

## Story Breakdown

- Story 1: Build taxonomy inventory and canonical map.
- Story 2: Implement topic config and route behavior.
- Story 3: Launch initial hubs and related-post modules.
- Story 4: Normalize remaining frontmatter categories.

## Resources

- Category inventory from brainstorm session
- `src/routes/blog/categories/[category]/+page.ts`
- `src/routes/blog/categories/[category]/+page.svelte`

## Notes

- Start with topics that already have post depth: Bash, Linux, SvelteKit/blogging, self-hosting/security, AI for developers.
