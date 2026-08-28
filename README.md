# Tixel Agent — Eve + Nuxt Monorepo

A Tixel-inspired ticket exchange demo with an AI agent that checks ticket prices.

## Structure

```
apps/
  agent/   — Eve agent (check_price tool, deployed as its own Vercel project)
  web/     — Nuxt 4 frontend (Tixel-inspired UI, deployed as its own Vercel project)
```

## Dev

```bash
pnpm install
pnpm dev
```

## Deploy

Two separate Vercel projects:

1. **Agent** — `apps/agent`, framework: Eve
2. **Web** — `apps/web`, framework: Nuxt

Set `EVE_NUXT_PRODUCTION_ORIGIN` on the web project to the agent's deployed URL.
