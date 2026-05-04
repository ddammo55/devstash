---
name: DevStash Codebase Context (code-scanner)
description: Key architectural facts and recurring issues discovered during the May 2026 audit
type: project
---

DevStash is an early-stage Next.js 16 + Prisma + Neon PostgreSQL app with no real auth yet — all pages use a hardcoded `demo@devstash.io` DB lookup instead of a session. Authentication (NextAuth v5) is referenced in the schema and seed but is NOT wired into the app routes.

Recurring patterns:
- N+1 queries in src/lib/db/items.ts
- Over-fetching in src/lib/db/collections.ts
- Dead state in Sidebar.tsx (isSidebarOpen, isMobileSidebarOpen never toggled)
- UserAvatar.tsx imports unused MockUser; Sidebar doesn't call UserAvatar
- mock-data.ts contains real user email (laravel3899@gmail.com) — ships to production
- prisma/schema.prisma has no DATABASE_URL env() in datasource block
- seed.ts has plaintext DEMO_PASSWORD = "12345678"
- ItemCard.tsx accepts typeName/typeIcon props but doesn't use them
