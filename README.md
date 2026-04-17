# My Personal Blog

This is my central hub to keep up with what I'm currently working or thinking on!

## Local Development

This repo uses Bun for package management, scripts, and the production runtime.

```bash
bun install
bun run dev
```

Common commands:

```bash
bun run check
bun run build
bun run lint
bun run start
```

## Deployment

Coolify should build this project from the repo-owned `Dockerfile`.

- Do not use Nixpacks for this app
- The app keeps `@sveltejs/adapter-node`, but the built server is executed with Bun
- Preview and production deploys should use the same Dockerfile path
