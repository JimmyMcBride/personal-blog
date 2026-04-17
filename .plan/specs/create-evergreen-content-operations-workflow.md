---
created_at: "2026-04-17T17:35:50Z"
epic: create-evergreen-content-operations-workflow
project: personal-blog
slug: create-evergreen-content-operations-workflow
status: done
title: Create evergreen content operations workflow Spec
type: spec
updated_at: "2026-04-17T18:10:19Z"
---

# Create evergreen content operations workflow Spec

Created: 2026-04-17T17:35:50Z

## Why

The research doc is most valuable when it becomes a repeatable workflow. Without repo-local guidance, good ideas about source packs, answer-first intros, and refresh habits will keep getting lost between posts.

## Problem

- No durable authoring workflow exists in repo docs.
- Post structure and intro quality vary widely.
- There is no standard refresh process for old content.
- Prompt ideas live in a chat artifact, not in the project.

## Goals

- Document a repeatable new-post workflow.
- Document a repeatable refresh workflow.
- Capture prompt templates and review gates in repo docs.
- Define evergreen content requirements: answer-first intro, internal-link targets, FAQ/common mistakes, update handling, and source-backed claims.

## Non-Goals

- Full CMS/editor build-out.
- Automatic content generation without human review.
- Heavy tooling before the workflow proves useful.

## Constraints

- Workflow must stay light enough for solo maintenance.
- Must preserve Jimmy’s voice and first-hand experience.
- Source-backed drafting is required for factual or security-sensitive claims.

## Solution Shape

- Add a content operations doc under `docs/`.
- Add prompt pack and checklist templates that work for both new articles and refreshes.
- Define minimum frontmatter and on-page structural expectations.
- Connect the workflow to taxonomy and syndication rules from adjacent epics.

## Flows

- New post flow: topic -> source pack -> outline -> draft -> review gates -> publish -> syndicate.
- Refresh flow: query target -> current post audit -> source refresh -> rewrite -> verify links/meta -> republish.

## Data / Interfaces

- Source pack
- Target queries
- Internal link targets
- Refresh date / updated field
- Syndication checklist inputs

## Risks / Open Questions

- Too much process could slow publishing unless templates are concise.
- Need decision on where prompt templates should live for easiest reuse.

## Rollout

1. Draft the workflow docs and templates.
2. Test on one new-post outline and one refresh.
3. Trim friction based on real usage.

## Verification

- Dry-run the workflow against at least one existing post.
- Verify docs are specific enough to execute without extra explanation.

## Story Breakdown

- Story 1: Write content operations guide.
- Story 2: Add new-post prompt/checklist pack.
- Story 3: Add refresh prompt/checklist pack.
- Story 4: Test workflow on first refresh cohort.

## Resources

- GEO research doc prompt sections
- `src/posts/sveltekit-blog.md`
- `src/posts/cat-grep-and-go.md`
- `src/posts/self-host-your-digital-empire.md`

## Notes

- This spec is the bridge between strategy and day-to-day publishing behavior.
