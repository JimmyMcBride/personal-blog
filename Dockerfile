FROM oven/bun:1.3.9 AS base
WORKDIR /app

FROM base AS install
COPY package.json bun.lock bunfig.toml ./
RUN bun install --frozen-lockfile

FROM install AS build
COPY . .
RUN bun run build

FROM base AS production-deps
COPY package.json bun.lock bunfig.toml ./
RUN bun install --frozen-lockfile --production

FROM base AS runtime
WORKDIR /app
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production
RUN apt-get update \
	&& apt-get install -y --no-install-recommends curl \
	&& rm -rf /var/lib/apt/lists/*
COPY --from=production-deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY package.json bunfig.toml ./
EXPOSE 3000
CMD ["bun", "run", "./build/index.js"]
