# CLAUDE-TODO — context-links

> Read `AGENTS.md` first, then `specs/context-links.spec.html` before starting.
  Note: This repo already has a Next.js scaffold in `app/`, `components/`, `db/`, `lib/`. Build on it.

## Your Job
Complete the context-links app: a tool that lets users create smart links that carry context — landing pages, AI prompts, data, and metadata bundled into a shareable URL.

---

## Phase 1 — Understand What Exists

- [ ] **Audit existing scaffold**
  - Check `app/`, `components/`, `lib/`, `db/` for anything already built
  - Read `PRD.md` and `ROADMAP.md` for what was planned
  - **Done when:** You know what’s already there vs what needs building

---

## Phase 2 — D1 Schema

- [ ] **`db/schema.sql`**
  - Read spec anchor: `#model-spec`
  - Tables: `links`, `contexts`, `clicks`, `users`
  - Key fields: `link_id`, `slug`, `destination_url`, `context_payload` (JSON), `template_type`, `click_count`
  - **Done when:** `wrangler d1 execute context-links-db --file=db/schema.sql` runs clean

- [ ] **`wrangler.toml`**
  - Worker name: `context-links-api`
  - D1 binding: `context-links-db`
  - KV binding: `context-links-config`
  - **Done when:** `wrangler deploy` succeeds

---

## Phase 3 — Core API

- [ ] **`workers/context-links-api/index.ts`** or **`app/api/`** route handlers
  - Read spec anchor: `#api-spec`
  - `POST /links` — create a context link with payload
  - `GET /links/:slug` — resolve link, inject context, redirect
  - `GET /links/:slug/analytics` — click stats
  - `PATCH /links/:slug` — update context payload
  - **Done when:** Create a link, share it, recipient lands with context injected

---

## Phase 4 — Context Templates

- [ ] **`lib/templates/`** — Context payload templates
  - Read spec anchor: `#template-spec`
  - Templates: `ai-prompt`, `landing-brief`, `data-ref`, `agent-boot`
  - Each template defines required + optional fields
  - **Done when:** Creating a link with `template_type=ai-prompt` validates the payload against template schema

---

## Phase 5 — Link Creation UI

- [ ] **`app/create/page.tsx`** (or `public/index.html` if going static)
  - Read spec anchor: `#ui-spec`
  - Step 1: Choose template type
  - Step 2: Fill context payload fields
  - Step 3: Set destination URL
  - Step 4: Copy shareable link
  - **Done when:** Full create flow works end-to-end, generates a working slug link

---

## Phase 6 — Analytics Dashboard

- [ ] **`app/dashboard/page.tsx`**
  - List of created links with click counts, last clicked, context type
  - **Done when:** Dashboard shows all links with basic click stats

---

## Hard Rules
- Context payload is the core value — a link without context is just a redirect
- Slugs must be human-readable (not random UUIDs)
- Template validation is mandatory before link creation

## Post Status
When each phase is done, post to: `https://messages.agentfeedoptimization.com`
Header: `X-Send-Token: afo-msg-2026`
