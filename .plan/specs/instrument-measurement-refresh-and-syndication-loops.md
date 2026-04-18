---
created_at: "2026-04-17T17:35:50Z"
epic: instrument-measurement-refresh-and-syndication-loops
project: personal-blog
slug: instrument-measurement-refresh-and-syndication-loops
status: done
title: Instrument measurement, refresh, and syndication loops Spec
type: spec
updated_at: "2026-04-17T18:10:19Z"
---

# Instrument measurement, refresh, and syndication loops Spec

Created: 2026-04-17T17:35:50Z

## Why

GEO work needs proof. The site already has partial analytics plumbing, but the current public view signal is not reliable enough to anchor decisions.

## Problem

- Plausible script exists, but post pages can still show `Total Views: 0`.
- There is no documented KPI set or review cadence in repo planning.
- Refresh candidate selection is ad hoc.
- DEV/off-site syndication workflow is not formalized.

## Goals

- Decide whether to fix, replace, or hide the public view counter.
- Define the KPI baseline and weekly review lens.
- Create a refresh scoring workflow for old posts.
- Create a canonical-safe syndication checklist.

## Non-Goals

- Large BI warehouse work on day one.
- Full automation of referral attribution across every AI assistant.
- Rewriting all historical posts immediately.

## Constraints

- Plausible is the current analytics surface.
- Some assistant referrals may be under-attributed by nature.
- Workflow must work without expensive new tooling.

## Solution Shape

- Verify current Plausible pageview and referrer behavior.
- Document a small KPI set and review cadence.
- Add a refresh candidate rubric tied to impressions, CTR, content age, and strategic relevance.
- Add a publish-then-syndicate checklist with canonical rules and teaser/summary guidance.

## Flows

- Publish or refresh a post.
- Observe traffic and engagement during defined windows.
- Decide whether to refresh again, build support content, or syndicate externally.
- Cross-post only after own-domain publish state is stable.

## Data / Interfaces

- Plausible route/API data
- Post slug and publish/update dates
- Refresh cohort list
- UTM and referral grouping conventions

## Risks / Open Questions

- The views API may be fine while the page load strategy is wrong, or vice versa.
- Some AI referral traffic may never attribute cleanly.
- Need decision on whether simple Plausible-only reporting is enough or if docs should leave room for GA4 later.

## Rollout

1. Verify or remove unreliable public metrics.
2. Define KPI review doc and refresh rubric.
3. Document syndication process.
4. Run the loop on the first refresh cohort.

## Verification

- `bun run check`
- `bun run build`
- Manual QA of pageview behavior on a representative post.
- Confirm workflow docs are actionable.

## Story Breakdown

- Story 1: Audit and fix public metrics behavior.
- Story 2: Add KPI and refresh rubric docs.
- Story 3: Add syndication workflow and checklist.

## Resources

- `src/routes/+layout.svelte`
- `src/routes/api/views/[slug]/+server.ts`
- `src/routes/blog/[slug]/+page.ts`
- `src/posts/the-ultimate-devto-hacks.md`

## Notes

- If the public view counter stays, it must be trusted. If it cannot be trusted, remove it from the page rather than teaching users to ignore it.
