# Content Operations

## Goal

Turn publishing on `jimmymcbride.dev` into a repeatable system instead of a one-off writing sprint.

The operating standard:

- own-domain first
- answer-first structure
- source-backed claims
- explicit internal links
- topic-aware publishing
- scheduled refreshes for evergreen posts

## Frontmatter Contract

Every published post should include:

```yaml
title:
description:
short:
date:
updated:
image:
categories:
topics:
published: true
```

### Field Rules

- `description`: detailed summary for archive cards and long-form metadata.
- `short`: tighter summary for search and social reuse when the full description is too long.
- `categories`: tag/archive metadata. These can describe content type, subtopic, or series.
- `topics`: canonical hub mapping. Use these to connect the post to `/topics/*`.
- `updated`: change this whenever a meaningful refresh ships.

## New Post Workflow

1. Pick one canonical topic first.
2. Build a source pack before drafting.
3. Define the primary query or question the post should answer.
4. Draft the answer-first intro before writing the full body.
5. Add internal links while drafting, not at the end.
6. Verify metadata, topic assignment, and publish surface before shipping.
7. Publish on your domain first.
8. Syndicate only after the own-domain page is live and checked.

## Refresh Workflow

1. Pick the page and state why it deserves a refresh.
2. Audit the current intro, structure, links, and metadata.
3. Rebuild the source pack if technical claims may have changed.
4. Rewrite the opening so the answer appears immediately.
5. Add or improve FAQ, common mistakes, and next-step guidance.
6. Update internal links to current hubs and relevant posts.
7. Update `short`, `updated`, categories, and topics if needed.
8. Re-check metadata and rendered output after publish.

## Required Review Gates

### Intent gate

- What exact reader question should this page answer?
- Which topic hub should the page strengthen?

### Source gate

- Which claims require a source?
- Which claims come from first-hand experience and should be framed that way?

### Structure gate

- Does the answer appear in the first two sentences?
- Can a reader scan headings and understand the page promise?

### Technical gate

- Does the page have `short`, `updated`, and the right topic?
- Are internal links pointing at current URLs?

### Measurement gate

- What would make this refresh worth keeping?
- Should the page be watched for CTR, impressions, or referral traffic?

## Internal Linking Rules

- Link every post to at least one canonical topic hub.
- Add at least two related-post links that move the reader forward.
- Prefer links that deepen the same topic cluster before branching sideways.
- Replace stale links during refreshes, even if the body copy barely changes.

## Content Structure Baseline

For evergreen technical posts, default to:

1. Direct answer
2. Who this is for
3. Prerequisites
4. What the reader will learn
5. Main walkthrough
6. Common mistakes
7. FAQ
8. Next steps / related reading

Not every post needs every section, but every post should justify what it leaves out.
