---
created_at: "2026-04-17T17:35:50Z"
project: personal-blog
slug: create-evergreen-content-operations-workflow
spec: create-evergreen-content-operations-workflow
title: Create evergreen content operations workflow
type: epic
updated_at: "2026-04-17T17:35:50Z"
---

# Create evergreen content operations workflow

Created: 2026-04-17T17:35:50Z

## Outcome

A documented, low-friction content system for new posts and refreshes that enforces answer-first structure, source packs, internal linking, and freshness maintenance without losing author voice.

## Why Now

The research doc is strongest where it proposes workflows and prompt structure, but none of that is encoded in repo docs today. Without a reusable authoring system, the site will keep drifting into inconsistent intros, weak citations, and one-off publishing habits.

## Scope Boundary

- In scope:
  - authoring checklist
  - refresh checklist
  - prompt pack and template docs
  - frontmatter/content requirements for evergreen updates
- Out of scope:
  - fully automated article generation
  - CMS migration
  - deep analytics implementation

## Spec

`./.plan/specs/create-evergreen-content-operations-workflow.md`

## Resources

- Research doc prompt templates
- `src/posts/*.md`
- `docs/`
- `.brain/context/workflows.md`

## Progress

Drafted. Needs concrete deliverable docs before stories exist.

## Notes

- This epic should support both “new post” and “refresh old post” flows.
- Source-backed drafting matters more than model choice.
