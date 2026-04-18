---
created_at: "2026-04-17T17:57:01Z"
epic: establish-geo-technical-foundation
project: personal-blog
slug: add-and-document-crawler-policy-surface
spec: establish-geo-technical-foundation
status: done
title: Add and document crawler policy surface
type: story
updated_at: "2026-04-17T18:02:37Z"
---

# Add and document crawler policy surface

Created: 2026-04-17T17:57:01Z

## Description

Add the production crawl policy file and document the bot-access stance so search-facing crawlers remain allowed while training crawlers stay blocked by default.

## Acceptance Criteria

- [ ] A crawl policy file exists for production and states the allowed/disallowed bot policy used by the site.

- [ ] Repo docs explain how the crawler policy should be maintained and why search bots and training bots are treated differently.
## Verification

- bun run build
## Resources

- [Canonical Spec](../specs/establish-geo-technical-foundation.md)

- static/robots.txt

- docs/
## Notes
