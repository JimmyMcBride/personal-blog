# Project: personal-blog

Created: 2026-04-17T17:35:16Z

## Vision

Turn `jimmymcbride.dev` from a chronological post archive into a durable developer knowledge base that search engines and generative engines can crawl, understand, cite, and revisit.

## Principles

- Own-domain first. Publish, measure, and canonicalize on `jimmymcbride.dev` before syndication.
- Fix platform truth before scaling content. Broken canonicals, missing crawl surfaces, and thin archives block everything downstream.
- Prefer reusable systems over one-off page tweaks. Shared metadata helpers, taxonomy maps, and editorial checklists beat per-post heroics.
- Keep voice and first-hand experience. GEO should improve extractability, not flatten the writing into generic SEO copy.
- Optimize for evergreen upkeep. Every new workflow should also make old posts easier to refresh.

## Constraints

- Solo-maintained SvelteKit blog running on Bun.
- Existing content lives in `src/posts/*.md` with lightweight frontmatter and mdsvex rendering.
- Current production analytics surface is Plausible plus a route-scoped views API.
- Search Console, Bing Webmaster Tools, and IndexNow require off-repo setup and verification.
- Avoid fake capabilities. Do not ship `SearchAction`, `llms.txt`, or automation surfaces until the site actually supports them.

## Planning Rules

- Specs are the canonical execution contract.
- Stories are created only after spec approval.
- Stories should be execution-ready and verification-aware.

## Notes

- Current GEO plan is organized around five epics:
  - technical foundation
  - shared SEO and structured data
  - taxonomy and topic hubs
  - evergreen content operations
  - measurement, refresh, and syndication
- First implementation wave should stay focused on foundation plus shared SEO. Taxonomy cleanup and editorial systems build on those surfaces.
