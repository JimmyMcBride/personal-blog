# fix Coolify Bun runtime healthcheck

## Summary

- added `curl` to the Bun runtime image so Coolify's Dockerfile healthcheck can probe the container
- documented the healthcheck requirement in project architecture and current-state notes

## Verification

- `brain session run --project . -- docker build -t personal-blog-bun-healthcheck .`
- `docker run -d --rm --name personal-blog-bun-healthcheck-smoke -p 3002:3000 personal-blog-bun-healthcheck`
- `docker exec personal-blog-bun-healthcheck-smoke which curl`
- `curl -I http://127.0.0.1:3002`
