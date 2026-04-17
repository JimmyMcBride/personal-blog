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
- The shared avatar components in `src/lib/components/ui/avatar/` should stay backed by `bits-ui` primitives so image loading state hides the fallback correctly instead of rendering the image and fallback side by side.
- The navbar avatar in `src/lib/components/NavAvatar.svelte` intentionally does not use a load-pending fallback. It should keep a stable circle background while the image loads and only show `J` on a true missing or error state during refresh.
- The app shell now uses normal document scrolling instead of an internal scrollable `main`, so the footer stays after content and route scroll reset logic should target `window` plus hash anchors rather than a `#page` container.
- The header theme control is a local `bits-ui` switch in `src/lib/components/ThemeToggle.svelte`, not a Skeleton component.
- The theme bootstrap script in `src/app.html` is the first source of truth for dark mode. Header controls should read the resolved DOM theme and stay hidden until hydration catches up, or the toggle will visibly flip on refresh even when the page colors are already correct.
- Keep `@sveltejs/adapter-node` as the SvelteKit adapter. The app does not use a Bun-specific adapter or `Bun.serve()` directly.
- Coolify production should build from the repo `Dockerfile` and run the adapter output with Bun via `bun run ./build/index.js`.
- Do not use Nixpacks, `@sveltejs/adapter-vercel`, or `vite preview` for production.
- The runtime Docker image must include `curl` or `wget`, because Coolify's Dockerfile healthcheck shell uses one of those tools to probe the app container.
- GitHub PR previews are handled by Coolify, not Vercel. The repository webhook must send both `push` and `pull_request` events to Coolify's manual GitHub webhook endpoint for the blog app.
- The Coolify app itself must also have Preview Deployments enabled in the dashboard. The webhook alone is not enough; otherwise Coolify accepts the PR webhook and responds with `Preview deployments disabled.`.
- The PR comment workflow in `.github/workflows/coolify-preview-link.yml` mirrors the Coolify preview URL into each pull request using `COOLIFY_PREVIEW_HOST`. Keep that GitHub repo variable aligned with Coolify's preview URL template and wildcard DNS.
- mdsvex code highlighting is intentionally limited to the small set of languages used by the blog posts so Shiki does less work during builds.
- Bun owns the contributor workflow for installs, scripts, and one-off CLIs. Use `bun install`, `bun run <script>`, and `bunx <tool>` as the default command surface.
