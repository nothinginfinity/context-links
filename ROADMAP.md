# ROADMAP — Context Links

## Phase 1 — Static Spec to Public Page ✅
- [x] Create Next.js app shell
- [x] Convert HTML spec into reusable components
- [x] Add mock data matching `ContextProfile` model
- [x] Render public context links page

## Phase 2 — Generated Machine Files
- [ ] Generate `/llms.txt` dynamically from profile
- [ ] Generate `/context.json`
- [ ] Generate `/context.md`
- [ ] Generate `/links.json`
- [ ] Generate `/proof.json`
- [ ] Add JSON schema validation

## Phase 3 — Editor and Persistence
- [ ] Add editor UI (`/edit`)
- [ ] Add Cloudflare D1 schema
- [ ] Persist profile, links, topics, projects, and proof
- [ ] Add publish/update flow

## Phase 4 — Bot Read Telemetry
- [ ] Add Cloudflare Worker middleware
- [ ] Detect bot reads vs. human reads
- [ ] Hash IP/user-agent values
- [ ] Store `ContextReadEvent` records
- [ ] Show analytics summary in `/analytics`

## Phase 5 — AFO Integration
- [ ] Connect to AFO Scoreboard
- [ ] Add context health score computation
- [ ] Add recommendations for weak context objects
- [ ] Support GitHub sync/versioning
