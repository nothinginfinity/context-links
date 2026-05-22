# Roadmap — Context Links

## Phase 1 — Static Prototype

- [ ] Public homepage showing the 5 output file types
- [ ] Mock generator UI
- [ ] Sample output files for agentfeedoptimization.com
- [ ] `specs/context-links.spec.html` added

## Phase 2 — Data Models + Mock API

- [ ] TypeScript models: ContextProfile, LinkEntry, ProofRecord
- [ ] Mock API routes: POST /generate, GET /profile/:domain
- [ ] Output file schemas in `schemas/`

## Phase 3 — Cloudflare Backend

- [ ] Worker: `context-links-api`
- [ ] D1: context_profiles, link_entries, proof_records
- [ ] Crawler Worker (fetch + parse target URL)
- [ ] Workers AI: entity extraction from crawled content

## Phase 4 — Auto-Deploy

- [ ] One-click deploy to Cloudflare Worker on customer domain
- [ ] Context file CDN serving via Worker routes
- [ ] Scheduled refresh (re-crawl + regenerate on schedule)

## Phase 5 — AFO Scoreboard Integration

- [ ] Track LLM crawler hits on deployed context files
- [ ] Score context file health (completeness, freshness)
- [ ] Surface recommendations in AFO dashboard
