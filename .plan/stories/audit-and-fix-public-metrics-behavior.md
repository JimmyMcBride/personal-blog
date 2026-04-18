---
created_at: "2026-04-17T17:57:01Z"
epic: instrument-measurement-refresh-and-syndication-loops
project: personal-blog
slug: audit-and-fix-public-metrics-behavior
spec: instrument-measurement-refresh-and-syndication-loops
status: done
title: Audit and fix public metrics behavior
type: story
updated_at: "2026-04-17T18:09:58Z"
---

# Audit and fix public metrics behavior

Created: 2026-04-17T17:57:01Z

## Description

Decide whether the public post metric should be fixed or removed, then implement the trustworthy behavior and capture the reason in repo docs.

## Acceptance Criteria

- [ ] The public post metrics behavior is either fixed to report real data or intentionally removed when data cannot be trusted.

- [ ] The chosen behavior is documented so future edits do not reintroduce misleading counters.
## Verification

- bun run check
## Resources

- [Canonical Spec](../specs/instrument-measurement-refresh-and-syndication-loops.md)

- src/routes/blog/[slug]/+page.ts

- src/routes/api/views/[slug]/+server.ts
## Notes
