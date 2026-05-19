# AGENTS.md — Context Links

This file tells AI coding agents how to work in this repo.

## Source of Truth

`specs/context-links.spec.html` is the **canonical visual and semantic contract**.

Read the embedded JSON specs in this order before writing any code:

1. `#app-spec` — product and stack intent
2. `#prd-spec` — product requirements
3. `#route-spec` — app routes and generated file routes
4. `#model-spec` — TypeScript domain models → `lib/types.ts`
5. `#api-spec` — backend API contracts → `app/api/`
6. `#file-output-spec` — generated LLM files → `public/`
7. `#roadmap-spec` — staged implementation plan
8. `#agents-spec` — agent rules
9. `#component-inventory` — component list with responsibilities
10. `#agent-build-instructions` — implementation rules

Use `data-spec-component` attributes to identify component boundaries.

## Implementation Rules

- Phase 1 works with **mock data** only — no auth, no DB, no billing.
- Do not require auth for the public page prototype.
- Add editor and persistence only after generated files work (Phase 3).
- Use **Cloudflare D1** for persistence when needed.
- Use **Cloudflare Worker** middleware for read telemetry (Phase 4).
- Do **not** store raw IP addresses — hash them.
- Keep all claims source-backed through `ProofSource` objects.
- Make `/context.md` readable and useful even without JavaScript.

## File Locations

| Concern | Path |
|---|---|
| TypeScript types | `lib/types.ts` |
| Mock data | `lib/mock-data.ts` |
| File generators | `lib/generators/` |
| Components | `components/` |
| Pages (App Router) | `app/` |
| API routes | `app/api/` |
| Public machine files | `public/` |
| JSON schemas | `schemas/` |
| Spec | `specs/context-links.spec.html` |

## Do Not

- Overbuild auth, billing, telemetry, or persistence in Phase 1.
- Add speculative features not in `#roadmap-spec`.
