# DevStash

A developer knowledge hub for snippets, prompts, commands, notes, files, images, links and custom item types.

## Context Files

Read these for full project context:

- @context/project-overview.md: Features, data models, tech stack, UI/UX
- @context/coding-standards.md: Code conventions and patterns
- @context/ai-interaction.md : Workflow and communication guidelines
- @context/current-feature.md: What we are currently working on

## Tech Stack

- Next.js 16 (App Router, Server Components)
- TypeScript (strict)
- Prisma + Neon PostgreSQL
- NextAuth v5 (Email + GitHub)
- Tailwind CSS v4 + shadcn/ui
- Cloudflare R2 (file storage)
- OpenAI gpt-5-nano
- Stripe (payments)

## Neon Database Configuration

**Always use these defaults for Neon MCP operations unless explicitly instructed otherwise:**

- **Project ID**: `delicate-credit-74460092` (devstash)
- **Default Branch**: `br-rapid-block-anb8ywt4` (development)
- **Database**: `neondb`

⚠️ **CRITICAL**: Never touch the `production` branch (br-damp-snow-anz8ap6f) unless explicitly authorized. All database migrations, schema changes, and testing must be performed on the `development` branch only.

## Quick Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run lint     # Run ESLint