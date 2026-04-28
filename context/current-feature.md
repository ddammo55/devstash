# Current Feature

## Seed Sample Data for Development

## Status

Completed

## Overview

Create a comprehensive seed script (`prisma/seed.ts`) to populate the database with sample data for development and demos. Includes demo user, system item types, and sample collections with various items (snippets, prompts, commands, links) across multiple categories (React Patterns, AI Workflows, DevOps, Terminal Commands, Design Resources).

## Goals

### Seed Data Requirements

- [x] Create demo user (demo@devstash.io) with hashed password
- [x] Seed 7 system item types (snippet, prompt, command, note, file, image, link)
- [x] Create 5 collections with descriptions
- [x] Add sample items to each collection:
  - [x] React Patterns: 3 snippets (TypeScript)
  - [x] AI Workflows: 3 prompts
  - [x] DevOps: 1 snippet + 1 command + 2 links
  - [x] Terminal Commands: 4 commands
  - [x] Design Resources: 4 links
- [x] Test seed script with `npx prisma db seed`
- [x] Verify data is correctly inserted in database
- [x] Build and test application with sample data

## References

- @context/features/seed-spec.md
- @context/project-overview.md
- @context/coding-standards.md
- Prisma seeding: https://www.prisma.io/docs/guides/database/seed-database

## Notes

- Password hashing: Use bcryptjs with 12 rounds for demo user
- Demo user: demo@devstash.io / 12345678 (plaintext in spec, hashed in DB)
- Sample data should be idempotent (safe to run multiple times)
- Use findUnique + create pattern to avoid duplicates
- All sample items belong to demo user
- Real URLs for links in Design Resources collection
- System item types are shared across all users (userId: null)

## History

<!-- Keep this updated. Earliest to latest -->

- Next.js 초기 설정 완료 (Tailwind CSS, shadcn/ui 통합)
- Dashboard Phase 1 완료 (TopBar, 다크모드, 플레이스홀더 레이아웃)
- Dashboard Phase 2 완료 (사이드바, 컬렉션, 아이템 타입, 사용자 영역)
- Dashboard Phase 3 완료 (메인 콘텐츠: 통계 카드, 컬렉션, 고정/최근 항목)
- Prisma 7 + Neon PostgreSQL 초기 설정 완료 (스키마, 마이그레이션, 시스템 타입 seed)
- 데이터베이스 유틸리티 추가 완료 (test-db.ts 스크립트, npm 스크립트 추가: db:studio, db:seed, db:migrate)
- 샘플 데이터 시드 완료 (Demo user + 5 collections + 18 sample items across 4 item types)
