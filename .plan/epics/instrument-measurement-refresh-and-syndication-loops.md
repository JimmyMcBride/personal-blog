---
created_at: "2026-04-17T17:35:50Z"
project: personal-blog
slug: instrument-measurement-refresh-and-syndication-loops
spec: instrument-measurement-refresh-and-syndication-loops
title: Instrument measurement, refresh, and syndication loops
type: epic
updated_at: "2026-04-17T17:35:50Z"
---

# Instrument measurement, refresh, and syndication loops

Created: 2026-04-17T17:35:50Z

## Outcome

A lightweight measurement system tied to publishing and refresh decisions, plus a repeatable syndication workflow that protects own-domain authority.

## Why Now

The repo already includes Plausible in `src/routes/+layout.svelte` and a views API in `src/routes/api/views/[slug]/+server.ts`, but public post pages can still show `Total Views: 0`. That makes measurement trust shaky. The site also has no repo-local plan for refresh scoring or DEV syndication discipline.

## Scope Boundary

- In scope:
  - analytics integrity decisions
  - KPI and review cadence
  - refresh candidate scoring/process
  - syndication checklist for DEV and similar channels
- Out of scope:
  - full BI stack
  - rewriting all old posts
  - crawler policy and sitemap basics

## Spec

`./.plan/specs/instrument-measurement-refresh-and-syndication-loops.md`

## Resources

- `src/routes/+layout.svelte`
- `src/routes/api/views/[slug]/+server.ts`
- `src/routes/blog/[slug]/+page.ts`
- `src/posts/the-ultimate-devto-hacks.md`

## Progress

Drafted. Public view-count issue confirmed during discovery.

## Notes

- If a metric cannot be trusted, remove or hide it until fixed.
- Syndication rules should be documented next to the authoring workflow, not remembered ad hoc.
