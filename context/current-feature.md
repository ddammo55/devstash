# Current Feature

## Dashboard Stats & Sidebar - Connect to Database

## Status

Completed

## Overview

Replace mock data with real database data for dashboard stats and sidebar. Display system item types in sidebar with icons (linking to /items/[typename]). Show actual collection data with favorite indicators and type-based colored circles for recent collections. Update stats to reflect real data from Neon PostgreSQL database using Prisma. Maintain current design while fetching data directly in server components.

## Goals

### Stats & Sidebar Database Integration

**Stats Section**:
- [x] Create src/lib/db/items.ts with data fetching functions
- [x] Implement function to get total items count (userId)
- [x] Implement function to get total collections count (userId)
- [x] Implement function to get total snippets count (userId)
- [x] Replace mock stats with real database counts
- [x] Update stats display to reflect real data

**Sidebar Item Types**:
- [x] Fetch system item types from database
- [x] Display all 7 system types with icons in sidebar
- [x] Create links to /items/[typename] pages
- [x] Highlight selected item type if on that page

**Sidebar Collections**:
- [x] Fetch favorite collections for user
- [x] Fetch recent collections for user
- [x] Show star icon for favorite collections
- [x] Calculate most-used item type per collection
- [x] Display colored circle based on item type color
- [x] Add "View all collections" link → /collections

**Testing & Validation**:
- [x] Test with demo user's data
- [x] Verify stats match database counts
- [x] Build and verify no TypeScript errors

## References

- @context/features/stats-sidebar-spec.md
- @context/features/dashboard-phase-3-specmd
- @context/screenshots/dashboard-ui-main.png
- @src/lib/mock-data.ts (current implementation to replace)
- @src/lib/db/collections.ts (reference for database query patterns)
- @context/project-overview.md
- @context/coding-standards.md
- Next.js Server Components: https://nextjs.org/docs/app/building-your-application/rendering/server-components
- Prisma queries: https://www.prisma.io/docs/concepts/components/prisma-client

## Notes

- Use server components for data fetching (already using in dashboard/page.tsx)
- Fetch only data for demo user (userId from session later)
- Use collections.ts query pattern as reference for items.ts functions
- Item type colors: defined in seed data (e.g., snippet: #3b82f6, prompt: #8b5cf6)
- System types have userId: null; user types have userId set
- For recent collections: calculate most-used item type by counting items in that type
- Cache strategy: revalidatePath after mutations (NextAuth integration later)
- Stats should update reactively when data changes
- Favorites section: show system types that user has favorited (if added to schema)
- All collections link goes to /collections route (TBD)

## History

<!-- Keep this updated. Earliest to latest -->

- Next.js 초기 설정 완료 (Tailwind CSS, shadcn/ui 통합)
- Dashboard Phase 1 완료 (TopBar, 다크모드, 플레이스홀더 레이아웃)
- Dashboard Phase 2 완료 (사이드바, 컬렉션, 아이템 타입, 사용자 영역)
- Dashboard Phase 3 완료 (메인 콘텐츠: 통계 카드, 컬렉션, 고정/최근 항목)
- Prisma 7 + Neon PostgreSQL 초기 설정 완료 (스키마, 마이그레이션, 시스템 타입 seed)
- 데이터베이스 유틸리티 추가 완료 (test-db.ts 스크립트, npm 스크립트 추가: db:studio, db:seed, db:migrate)
- 샘플 데이터 시드 완료 (Demo user + 5 collections + 18 sample items across 4 item types)
- Dashboard Stats & Sidebar DB 연동 완료 (실제 DB 데이터로 item types, collections, stats 표시)
- Dashboard Collections DB 연동 완료 (Mock data → Prisma queries, 서버 컴포넌트, 타입별 border color 계산)
