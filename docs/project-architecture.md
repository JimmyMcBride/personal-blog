---
updated: "2026-04-16T15:16:14Z"
---

# Project Architecture

<!-- brain:begin project-doc-architecture -->

Use this file for the structural shape of the repository.

## Architecture Notes

- Keep repo boundaries explicit and document key entrypoints in this file.
- Update this file when runtime architecture or integration boundaries change.
<!-- brain:end project-doc-architecture -->

## Local Notes

- Blog post markdown renders inside the `.markdown` container in `src/routes/blog/[slug]/+page.svelte`, which uses a centered flex column.
- Keep explicit `width: 100%` rules for markdown list containers in `src/app.css` alongside headings, paragraphs, and code blocks, or unordered and ordered lists will shrink and appear centered.
- Tailwind v4 theme setup in `src/app.css` must keep the semantic token bridge (`@theme inline` mappings like `--color-card`, `--color-background`, `--color-border`, and related radius tokens) so shadcn-style component classes such as `bg-card`, `border-border`, and `text-muted-foreground` compile correctly.
- Coolify production should use the Node server build via `@sveltejs/adapter-node` and `HOST=0.0.0.0 node build` from `nixpacks.toml`.
- Do not use `@sveltejs/adapter-vercel` or `vite preview` for Coolify production.
- GitHub PR previews are handled by Coolify, not Vercel. The repository webhook must send both `push` and `pull_request` events to Coolify's manual GitHub webhook endpoint for the blog app.
- The Coolify app itself must also have Preview Deployments enabled in the dashboard. The webhook alone is not enough; otherwise Coolify accepts the PR webhook and responds with `Preview deployments disabled.`.
- The PR comment workflow in `.github/workflows/coolify-preview-link.yml` mirrors the Coolify preview URL into each pull request using `COOLIFY_PREVIEW_HOST`. Keep that GitHub repo variable aligned with Coolify's preview URL template and wildcard DNS.
- mdsvex code highlighting is intentionally limited to the small set of languages used by the blog posts so Shiki does less work during builds.
