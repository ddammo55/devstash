---
name: DevStash Codebase Context
description: Key architectural facts and recurring issues discovered during the May 2026 audit
type: project
---

DevStash is an early-stage Next.js 16 + Prisma + Neon PostgreSQL app with no real auth yet — all pages use a hardcoded `demo@devstash.io` DB lookup instead of a session. Authentication (NextAuth v5) is referenced in the schema and seed but is NOT wired into the app routes.

**Why:** Auth was intentionally deferred; Pro gating is also deferred until launch.
**How to apply:** Do not report missing auth as a bug. Do flag the hardcoded demo-user pattern as a security issue that must be resolved before any real users exist.

Recurring patterns found in audit:
- N+1 query pattern in `src/lib/db/items.ts` — `getSystemItemTypes()` and `getItemStats()` each fire 1 query per item type instead of a single grouped query.
- `src/lib/db/collections.ts` `getCollections()` over-fetches all item+itemType data per collection to compute a mostUsedType that could be done in SQL.
- `src/components/layout/Sidebar.tsx` has dead sidebar-collapse state (`isSidebarOpen`, `isMobileSidebarOpen`) — no toggle wiring is present.
- `src/components/layout/UserAvatar.tsx` imports `MockUser` type from mock-data even though the component is no longer called from anywhere (Sidebar does not render it).
- `src/lib/mock-data.ts` still exists and exports real user email (laravel3899@gmail.com) hardcoded in `mockCurrentUser`. File is now unused by DB-connected components but still ships.
- `prisma/schema.prisma` missing `env()` call for DATABASE_URL (`datasource db { provider = "postgresql" }` — no `url` field at all).
- `prisma/seed.ts` hardcodes demo password `12345678` in plaintext constant `DEMO_PASSWORD`.
- `src/components/layout/DashboardLayoutClient.tsx` is a trivial wrapper that only adds a div — could inline, but low severity.
- Sidebar link for item types uses `href={/items/${type.name}s}` — naive pluralisation breaks for "snippets" → `/items/snippets` is fine, but none of those routes exist yet.
- `src/components/dashboard/ItemCard.tsx` accepts `typeName` and `typeIcon` props but never uses them in render.
