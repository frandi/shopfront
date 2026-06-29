# Shopfront

E-commerce storefront for a small online retailer — product catalog, cart, and checkout.

A TypeScript pnpm monorepo:

- `apps/web` — React + Vite storefront
- `apps/api` — Node + Express HTTP API
- `packages/shared` — shared pricing & money domain

## Getting started

```bash
pnpm install
pnpm dev      # web on http://localhost:5173, API on http://localhost:4000
```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Run the web app and API together in watch mode |
| `pnpm build` | Build all packages |
| `pnpm test` | Run unit tests |
| `pnpm lint` | Lint the workspace |
| `pnpm typecheck` | Type-check all packages |

## Documentation

- [Architecture](./docs/ARCHITECTURE.md)
- [Development plan](./docs/DEVELOPMENT-PLAN.md)
