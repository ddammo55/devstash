# Current Feature: Auth Credentials - Email/Password Provider

## Status

In Progress

## Overview

Add Credentials provider for email/password authentication with registration.

## Goals

- Use bcryptjs for hashing (already installed)
- Add password field to User model via migration if not already there
- Update `auth.config.ts` with Credentials provider placeholder
- Update `auth.ts` to override Credentials with bcrypt validation
- Create registration API route at `/api/auth/register`

## References

- Credentials provider: https://authjs.dev/getting-started/authentication/credentials

## Notes

**Registration API Route:**
`POST /api/auth/register`
- Accept: name, email, password, confirmPassword
- Validate passwords match
- Check if user already exists
- Hash password with bcryptjs
- Create user in database
- Return success/error response

**Credentials Provider in Split Pattern:**
- `auth.config.ts`: Add Credentials provider with `authorize: () => null` placeholder
- `auth.ts`: Override the Credentials provider with actual bcrypt validation logic

**Testing:**
1. Test registration via curl:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"password123","confirmPassword":"password123"}'
```
2. Go to `/api/auth/signin`
3. Sign in with email/password
4. Verify redirect to `/dashboard`
5. Verify GitHub OAuth still works

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
