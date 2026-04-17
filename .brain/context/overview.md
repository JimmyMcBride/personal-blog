# Overview

<!-- brain:begin context-overview -->

Project: `personal-blog`

Primary runtime: `bun`

## Manifests

- `package.json`
- `bunfig.toml`
- `Dockerfile`

## Repo Map

- `.brain/`
- `.codex/`
- `.dockerignore`
- `.idea/`
- `.svelte-kit/`
- `.vercel/`
- `.vscode/`
- `bun.lock`
- `bunfig.toml`
- `Dockerfile`
- `docs/`
- `node_modules/`
- `src/`
- `static/`
<!-- brain:end context-overview -->

## Local Notes

Add repo-specific notes here. `brain context refresh` preserves content outside managed blocks.

- Bun is the only supported package manager and runtime for this repository. Keep compatibility-oriented packages like `@sveltejs/adapter-node` and `@types/node` when the SvelteKit and Vite toolchain still expects them.
