# syntax=docker/dockerfile:1
#
# Web image — React/Vite storefront served by nginx. Multi-stage:
#   build   — install the workspace and produce the static bundle (apps/web/dist)
#   runtime — nginx serving the static files, reverse-proxying /api to the api service
#
# Build context is the repo ROOT (Vite resolves @shopfront/shared from packages/shared/src
# via an alias), so paths below are relative to the monorepo root.

FROM node:20-alpine AS build
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate
WORKDIR /app

# Manifests first for a cached install.
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml tsconfig.base.json ./
COPY packages/shared/package.json packages/shared/
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
RUN pnpm install --frozen-lockfile

# Vite reads @shopfront/shared from source, so the web build needs shared's src (not a prebuilt dist).
COPY packages/shared packages/shared
COPY apps/web apps/web
RUN pnpm --filter web build

# --- runtime: static files behind nginx, with the /api reverse proxy ---
FROM nginx:alpine AS runtime
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/web/dist /usr/share/nginx/html
EXPOSE 80
