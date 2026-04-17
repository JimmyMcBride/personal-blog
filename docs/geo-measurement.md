# GEO Measurement and Refresh Loop

## Public Metrics Decision

The post-level `Total Views` counter was removed from the public UI.

Reason:

- The site is prerendered.
- The old counter depended on a client fetch after render.
- The prerendered shell exposed a misleading `0` state before hydration and made the metric look broken.

Keep Plausible and the views API for internal analysis, but do not show a public metric unless it is trustworthy in the rendered experience.

## Weekly KPI Set

- Non-brand impressions by landing page
- Organic clicks by landing page
- CTR by refreshed page
- Topic hub entry traffic
- Sessions from assistant or referral sources when attributable
- Newsletter or subscriber conversion from content pages

## Review Lens

Check these every week:

1. Which refreshed pages gained impressions?
2. Which pages gained impressions but still miss clicks?
3. Which topic hubs are pulling readers deeper into the archive?
4. Which posts deserve another refresh instead of a new article?

## Refresh Rubric

Score each candidate from 1 to 5 in these buckets:

- Search upside
  - high impressions, weak CTR, or clear query mismatch
- Strategic fit
  - strengthens a current topic hub or supports current publishing direction
- Refresh cost
  - easy structural win versus full rewrite
- Link opportunity
  - can connect to stronger hubs or newer supporting posts
- Freshness risk
  - tools, frameworks, or advice have drifted since publish

### Prioritization Rule

- Refresh first when total score is high and rewrite cost is moderate.
- Publish new only when the existing cluster is already structurally healthy.

## First Refresh Cohort

Start with:

- `src/posts/cat-grep-and-go.md`
- `src/posts/sveltekit-blog.md`
- `src/posts/self-host-your-digital-empire.md`
- `src/posts/the-ultimate-devto-hacks.md`

## What a Good Refresh Should Change

- better opening
- current metadata
- stronger topic alignment
- better internal links
- FAQ or common mistakes where helpful
- current `updated` date
