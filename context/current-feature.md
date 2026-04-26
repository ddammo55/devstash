# Current Feature

## Dashboard UI Phase 2

## Status

Not Started

## Overview

This is phase 2 of 3 for the dashboard UI layout. Use the screenshot referenced below for how it should look. Use the data from the mock data file referenced below. Just import it directly for now until we implement a database.

## Goals

### Phase 2 Requirements

- [ ] Collapsible sidebar
- [ ] Items/types with links to /items/TYPE (eg.items/snippets)
- [ ] Favorite collections
- [ ] Most recent collections
- [ ] User avatar area at the bottom
- [ ] Drawer icon to open/close sidebar
- [ ] Always a drawer on mobile view

## References

- @context/screenshots/dashboard-ui-main.png
- @context/project-overview.md
- @src/lib/mock-data.ts
- @context/features/dashboard-phase-1-spec.md
- @context/features/dashboard-phase-3-spec.md

## Notes

- Phase 2 focuses on sidebar implementation with real mock data
- Sidebar should be collapsible on desktop and a drawer on mobile
- Use mock data from src/lib/mock-data.ts for collections and item types
- Items/types should link to /items/[type] routes (not yet created)

## History

<!-- Keep this updated. Earliest to latest -->

- Next.js 초기 설정 완료 (Tailwind CSS, shadcn/ui 통합)
- Dashboard Phase 1 완료 (TopBar, 다크모드, 플레이스홀더 레이아웃)
