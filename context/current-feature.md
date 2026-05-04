# Current Feature

(다음 기능을 문서화하면 /feature load [spec] 으로 시작하세요)

## Status

In Progress

## Overview

Code-scanner 결과를 기반으로 위험도 낮은 빠른 정리 항목들을 수행합니다. 주로 미사용 코드 제거, 불필요한 import 정리, 사용되지 않는 상태 변수 제거입니다.

## Goals

- ✅ 미사용 파일 및 함수 삭제 (mock-data.ts 관련)
- ✅ 불필요한 props 제거 (ItemCard typeName, typeIcon)
- ✅ 사용되지 않는 컴포넌트 정리 (UserAvatar)
- ✅ 번들 크기 최적화 (불필요한 'use client' 제거)
- ✅ CSS 최적화 (globals.css transition 스코핑)
- ✅ Seed script 개선 (upsert 사용)
- ✅ 죽은 상태 변수 제거 (Sidebar collapse state)

## References

Code-scanner 보안/품질 감사:
- Critical (3개): 별도 작업 예약
- High (4개): N+1 쿼리 최적화 예약
- **Medium & Low (10개): 이 피처에서 수행** ← quick wins

## Notes

**다음 Critical 항목들은 별도 작업으로 진행:**
1. Prisma schema datasource에 url 필드 추가 (fix/prisma-schema-url)
2. NextAuth 인증 구현 (feature/nextauth-integration) 
3. 데모 비밀번호 환경변수화 (fix/remove-plaintext-password)

**제외 사항 (아직 미구현):**
- N+1 쿼리 최적화: DB 쿼리 구조 변경 필요, 별도 예약
- 사이드바 collapse 구현: UI/UX 확정 필요

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
