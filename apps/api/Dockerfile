# syntax=docker/dockerfile:1
#
# API image — Node/Express. Multi-stage:
#   build   — install the whole workspace, compile @shopfront/shared then api, prune to prod deps
#   runtime — slim image that runs the compiled output as the unprivileged `node` user
#
# Build context is the repo ROOT (the api depends on packages/shared), so paths below are
# relative to the monorepo root. See docker-compose.yml / .github/workflows/deploy.yml.

FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate
WORKDIR /app

# --- build: install deps (cached on manifests), then compile shared + api ---
FROM base AS build
# Copy only the manifests first so `pnpm install` is cached unless dependencies change.
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml tsconfig.base.json ./
COPY packages/shared/package.json packages/shared/
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
RUN pnpm install --frozen-lockfile

# Bring in the sources the api build needs (web source is not required for this image).
COPY packages/shared packages/shared
COPY apps/api apps/api

# @shopfront/shared must be compiled to dist/ before the api (which require()s it at runtime).
RUN pnpm --filter @shopfront/shared build && pnpm --filter api build

# Drop dev dependencies (tsx, vitest, typescript, @types/*) from node_modules.
# CI=true lets pnpm purge the dev modules non-interactively (no TTY during docker build).
RUN CI=true pnpm install --prod --frozen-lockfile

# --- runtime ---
FROM base AS runtime
ENV NODE_ENV=production
# The pruned workspace (node_modules with workspace symlinks + compiled dist) comes over whole,
# so the @shopfront/shared symlink and express resolve exactly as they did in the build stage.
COPY --from=build /app /app
WORKDIR /app/apps/api
USER node
EXPOSE 4000
CMD ["node", "dist/index.js"]
