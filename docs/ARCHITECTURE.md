# Architecture — Context Links

## Overview

Context Links is a **Next.js App Router** application deployed on **Cloudflare Pages**, with:
- Public context page rendered from TypeScript models
- Machine-readable files served from `public/` (static in Phase 1)
- API routes returning `ContextProfile` and related models
- (Phase 3+) Cloudflare D1 for persistence
- (Phase 4+) Cloudflare Worker middleware for read telemetry

## Key Files

| Path | Purpose |
|---|---|
| `lib/types.ts` | All TypeScript models from `#model-spec` |
| `lib/mock-data.ts` | Seed `ContextProfile` for Phase 1 |
| `lib/generators/` | Generators for machine-readable files |
| `schemas/context-profile.schema.json` | JSON Schema for `ContextProfile` |
| `components/` | Reusable UI components (one per `data-spec-component`) |
| `app/page.tsx` | Public context page |
| `app/api/` | API route handlers |
| `public/` | Machine-readable context files |
