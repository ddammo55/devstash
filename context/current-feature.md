# Current Feature: Auth UI - Sign In, Register & Sign Out

## Status

In Progress

## Overview

Replace NextAuth default pages with custom UI. Update user icon, email and username in bottom of sidebar.

## Goals

- Create custom Sign In page at `/sign-in`
  - Email and password input fields
  - "Sign in with GitHub" button
  - Link to register page
  - Form validation and error display
- Create custom Register page at `/register`
  - Name, email, password, confirm password fields
  - Form validation (passwords match, email format)
  - Submit to `/api/auth/register`
  - Redirect to sign-in on success
- Update bottom of sidebar with user profile
  - Display user avatar (GitHub image or initials fallback)
  - Display user name
  - Dropdown/menu on avatar click with "Sign out" link
  - Clicking on the avatar should go to "/profile"

## References

(추가될 예정)

## Notes

**Avatar Logic:**
- If user has `image` (from GitHub): use that
- Otherwise: generate initials from name (e.g., "Brad Traversy" → "BT")
- Create a reusable avatar component that handles both cases

**Testing:**
1. Go to `/sign-in` - verify custom page renders
2. Sign in with GitHub - verify flow works
3. Sign in with email/password - verify flow works
4. Verify avatar shows in sidebar (GitHub image or initials)
5. Click avatar - verify dropdown appears
6. Click "Sign out" - verify logout and redirect
7. Go to `/register` - create new account - verify redirect to sign-in

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
- Auth Phase 1 완료 (NextAuth v5 + GitHub OAuth, Prisma adapter, /dashboard 보호, 기본 sign-in 페이지)
- Auth Phase 2 완료 (Email/password Credentials provider, /api/auth/register 엔드포인트, bcryptjs 해싱, 로그인 테스트 완료)
