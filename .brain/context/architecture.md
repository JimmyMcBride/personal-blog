---
updated: "2026-04-17T18:10:51Z"
---
# Architecture

<!-- brain:begin context-architecture -->
Use this file for the structural shape of the repository.

## Architecture Notes

- Keep repo boundaries explicit and document key entrypoints in this file.
- Update this file when runtime architecture or integration boundaries change.
<!-- brain:end context-architecture -->

## Local Notes

- GEO metadata is now centralized in `src/lib/seo.ts`, which supplies canonical, social, and JSON-LD data to home, archive, post, and topic routes.
- Canonical content subjects now live in `topics` frontmatter plus `src/lib/taxonomy.ts`; `categories` remain tag/archive metadata and legacy typo slugs redirect to normalized category URLs.
- Topic hubs now live under `/topics` with prerendered topic pages and post-to-topic navigation. Keep sitemap generation aligned with `src/lib/taxonomy.ts` as topics evolve.
- The public post view counter was intentionally removed from `src/routes/blog/[slug]/+page.svelte` because the prerendered zero-state was misleading. Keep Plausible or the views API for internal reporting unless a trustworthy hydrated counter is reintroduced.
Add repo-specific notes here. `brain context refresh` preserves content outside managed blocks.
