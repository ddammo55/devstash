# Current Feature: Auth Setup - NextAuth + GitHub Provider

## Status

In Progress

## Overview

Set up NextAuth v5 with Prisma adapter and GitHub OAuth. Use NextAuth's default pages for testing.

## Goals

- Install NextAuth v5 (`next-auth@beta`) and `@auth/prisma-adapter`
- Set up split auth config pattern for edge compatibility
- Add GitHub OAuth provider
- Protect `/dashboard/*` routes using Next.js 16 proxy
- Redirect unauthenticated users to sign-in
- Extend Session type with user.id

## References

- Edge compatibility: https://authjs.dev/getting-started/installation#edge-compatibility
- Prisma adapter: https://authjs.dev/getting-started/adapters/prisma

## Notes

**Files to Create:**
1. `src/auth.config.ts` - Edge-compatible config (providers only, no adapter)
2. `src/auth.ts` - Full config with Prisma adapter and JWT strategy
3. `src/app/api/auth/[...nextauth]/route.ts` - Export handlers from auth.ts
4. `src/proxy.ts` - Route protection with redirect logic
5. `src/types/next-auth.d.ts` - Extend Session type with user.id

**Key Gotchas:**
- Use `next-auth@beta` (not `@latest` which installs v4)
- Proxy file must be at `src/proxy.ts` (same level as `app/`)
- Use named export: `export const proxy = auth(...)` not default export
- Use `session: { strategy: 'jwt' }` with split config pattern
- Don't set custom `pages.signIn` - use NextAuth's default page
- Use Context7 to verify the newest config and conventions

**Environment Variables:**
```
AUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
```

**Testing:**
1. Go to `/dashboard` - should redirect to sign-in
2. Click "Sign in with GitHub"
3. Verify redirect back to `/dashboard` after auth

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
- Pro Badge To Sidebar 완료 (Badge 컴포넌트 추가, Files/Images에 Pro 배지 표시)
- Code Cleanup Quick Wins 완료 (미사용 코드 제거, 번들 최적화, CSS 성능 개선 - 604줄 정리)
