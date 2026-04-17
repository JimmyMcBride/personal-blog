# convert personal-blog from Node/pnpm/Nixpacks to Bun-only with Dockerfile deploy

## Summary

- moved the repo from pnpm ownership to Bun for installs, scripts, and runtime
- replaced the Coolify Nixpacks path with a repo-owned Bun Dockerfile
- updated active docs and Brain context so Bun is the project runtime source of truth

## Key Decisions

- keep `@sveltejs/adapter-node` and execute the built server with Bun instead of adopting a Bun-specific adapter
- keep `@types/node` because Vite and SvelteKit still expect Node-oriented type compatibility
- preserve historical blog content and historical change notes instead of rewriting archival npm or pnpm references

## Verification

- `bun install`
- `brain session run --project . -- bun run check`
- `brain session run --project . -- bun run build`
- `bun run start`
- `docker build -t personal-blog-bun .`
- `docker run -d --rm --name personal-blog-bun-smoke -p 3001:3000 personal-blog-bun`
- `curl -I http://127.0.0.1:3001`

## Follow-Up

- switch the Coolify app from Nixpacks to Dockerfile mode and point it at the repo `Dockerfile`
- keep preview and production deploys on the same Dockerfile path
- decide separately whether to clean up the repo-wide Prettier drift that currently makes `bun run lint` fail outside the scope of this migration
