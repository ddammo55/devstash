# Current Feature

## Prisma + Neon PostgreSQL Setup

## Status

Completed

## Overview

Set up Prisma ORM with Neon PostgreSQL (serverless database). Create initial schema based on data models in project-overview.md. Include NextAuth models (Account, Session, VerificationToken) with appropriate indexes and cascade deletes. Use Prisma 7 with migration-first approach for development and production branches.

## Goals

### Database Setup Requirements

- [x] Install Prisma 7 and PostgreSQL dependencies
- [x] Create .env files for DATABASE_URL (development and production branches)
- [x] Set up Neon PostgreSQL database (serverless)
- [x] Define Prisma schema with all data models (User, Item, Collection, ItemType, etc.)
- [x] Include NextAuth models (Account, Session, VerificationToken)
- [x] Add appropriate database indexes for performance
- [x] Configure cascade deletes for data integrity
- [x] Create and test initial migration
- [x] Verify Prisma Client generation

## References

- @context/features/database-spec.md
- @context/project-overview.md
- @context/coding-standards.md
- Prisma upgrade guide: https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7
- Prisma + PostgreSQL quickstart: https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/prisma-postgres

## Notes

- Use Prisma 7 (has breaking changes from Prisma 5)
- Always create migrations in development; never push directly to production
- Development database on development Neon branch, production on production branch
- Remove mock-data.ts once database is connected
- NextAuth integration will follow in separate phase

## History

<!-- Keep this updated. Earliest to latest -->

- Next.js 초기 설정 완료 (Tailwind CSS, shadcn/ui 통합)
- Dashboard Phase 1 완료 (TopBar, 다크모드, 플레이스홀더 레이아웃)
- Dashboard Phase 2 완료 (사이드바, 컬렉션, 아이템 타입, 사용자 영역)
- Dashboard Phase 3 완료 (메인 콘텐츠: 통계 카드, 컬렉션, 고정/최근 항목)
- Prisma 7 + Neon PostgreSQL 초기 설정 완료 (스키마, 마이그레이션, 시스템 타입 seed)
