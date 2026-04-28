# Current Feature

## Dashboard Collections - Connect to Database

## Status

Completed

## Overview

Replace mock collection data in the dashboard's main area with real data from Neon PostgreSQL database using Prisma. Collections should display with cards showing recent collections, derived border colors based on content types, and small type icons. Maintain current design while fetching data directly in server components.

## Goals

### Dashboard Collections Implementation

- [x] Create src/lib/db/collections.ts with data fetching functions
- [x] Implement getCollections() function to fetch from database
- [x] Calculate most-used content type per collection (for border color)
- [x] Fetch collection items and derive type icons
- [x] Update dashboard main component to use server-side data fetching
- [x] Replace mock-data.ts collections with real database queries
- [x] Ensure collection cards display correct border colors (type-based)
- [x] Show type icons for each content type in collection
- [x] Update collection stats (item count, etc.)
- [x] Test with demo user's collections
- [x] Build and verify no TypeScript errors

## References

- @context/features/dashboard-collections-spec.md
- @context/screenshots/dashboard-ui-main.png
- @src/lib/mock-data.ts (current implementation to replace)
- @context/project-overview.md
- @context/coding-standards.md
- Next.js Server Components: https://nextjs.org/docs/app/building-your-application/rendering/server-components
- Prisma relations: https://www.prisma.io/docs/concepts/relations

## Notes

- Use server components for data fetching (no useState/useEffect)
- Fetch only collections for demo user (userId from session later)
- Collection border color: derive from most frequent item type
- Type icons: use Lucide React icons matching ItemType names
- Do NOT modify mock-data.ts yet - keep it as fallback
- Collection stats: calculate from related items count
- Handle empty collections gracefully
- Cache strategy: revalidatePath after mutations (NextAuth integration later)

## History

<!-- Keep this updated. Earliest to latest -->

- Next.js 초기 설정 완료 (Tailwind CSS, shadcn/ui 통합)
- Dashboard Phase 1 완료 (TopBar, 다크모드, 플레이스홀더 레이아웃)
- Dashboard Phase 2 완료 (사이드바, 컬렉션, 아이템 타입, 사용자 영역)
- Dashboard Phase 3 완료 (메인 콘텐츠: 통계 카드, 컬렉션, 고정/최근 항목)
- Prisma 7 + Neon PostgreSQL 초기 설정 완료 (스키마, 마이그레이션, 시스템 타입 seed)
- 데이터베이스 유틸리티 추가 완료 (test-db.ts 스크립트, npm 스크립트 추가: db:studio, db:seed, db:migrate)
- 샘플 데이터 시드 완료 (Demo user + 5 collections + 18 sample items across 4 item types)
- Dashboard Collections DB 연동 완료 (Mock data → Prisma queries, 서버 컴포넌트, 타입별 border color 계산)
