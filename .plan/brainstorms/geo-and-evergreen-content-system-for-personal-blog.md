---
created_at: "2026-04-17T17:35:20Z"
project: personal-blog
slug: geo-and-evergreen-content-system-for-personal-blog
status: active
title: GEO and evergreen content system for personal-blog
type: brainstorm
updated_at: "2026-04-17T17:35:35Z"
---

# Brainstorm: GEO and evergreen content system for personal-blog

Started: 2026-04-17T17:35:20Z

## Focus Question

How should `personal-blog` evolve so the current SvelteKit codebase supports GEO/SEO fundamentals, evergreen refreshes, and durable content operations instead of one-off manual post publishing?

## Desired Outcome

A repo-local planning stack that converts the research doc into executable epics and specs tied to real files, routes, and workflows in this codebase.

## Constraints

- Existing content source is markdown in `src/posts/*.md`.
- Current site architecture is prerender-heavy and route metadata is hand-authored in Svelte components.
- Solo-maintained. Workflow overhead must stay low.
- Some required wins live outside the repo: Search Console, Bing, IndexNow, and analytics dashboard setup.

## Open Questions

- Should the public `Total Views` counter stay on post pages if Plausible data cannot hydrate reliably?
- Do we want category pages to remain public as aliases once topic hubs exist, or should they redirect?
- Is an `/about` or `/author` route the preferred source for `Person`/`ProfilePage` schema?
- Which 5 to 7 canonical topics should replace the current raw category sprawl?
- Which existing posts should form the first refresh cohort?

## Ideas

- Create a shared SEO metadata system for routes and posts. Current gaps: broken canonical on src/routes/blog/[slug]/+page.svelte, repeated head tags across home/blog pages, no route metadata on category pages.

- Add structured data generation for WebSite, BlogPosting, BreadcrumbList, and Person/ProfilePage. Current repo has no JSON-LD output in src/.

- Strengthen crawl/discovery surfaces. Current repo has src/routes/sitemap.xml/+server.ts and rss.xml, but no robots.txt, sitemap only includes post URLs, and SearchAction should wait until a real /search route exists.

- Normalize taxonomy and topic architecture. Frontmatter categories in src/posts/*.md include drift and typos like texutal-healing, tutoiral, careerdevelopment. Category archive pages are thin and need promotion into topic hubs.

- Build evergreen editorial workflow around source packs, answer-first intros, FAQ/common-mistakes blocks, internal-link targets, and updated-date refreshes. This should become a repeatable authoring checklist plus prompt pack stored in repo docs.

- Create refresh workflow for existing posts before scaling net-new content. Use high-value candidates like sveltekit-blog, cat-grep-and-go, self-host-your-digital-empire, and devto hacks to prove lift first.

- Fix measurement and reporting. Plausible exists in layout and views API, but public Total Views shows 0 on prerendered posts. Need referral grouping for AI/search, pageview integrity, and a lightweight KPI dashboard spec.

- Define syndication workflow for DEV and off-site summaries. Goal: own-domain first, canonical-safe reposts, teaser templates, and publish/checklist hooks so cross-posting supports GEO instead of cannibalizing it.
## Raw Notes
