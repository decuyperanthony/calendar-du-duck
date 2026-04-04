# CLAUDE.md - Calendar du Duck

Project-specific context for Claude agents.

## Project Overview

**Purpose:** Family organization app for shared custody (garde alternée)
**Users:** Two co-parents managing custody of two children

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict, no `any`, no `as` casting)
- **Database:** Neon (Serverless PostgreSQL)
- **ORM:** Drizzle ORM (type-safe, zero-abstraction)
- **Styling:** Tailwind CSS + CSS variables (tokens)
- **UI Components:** shadcn/ui + Radix primitives
- **Icons:** Phosphor Icons + lucide-react
- **i18n:** next-intl (French only)
- **Forms:** React Hook Form + Zod

## Project Structure

```
app/
├── api/
│   ├── passation/      # CRUD API for handoff checklist items
│   └── activities/     # CRUD API for extracurricular activities
├── semaines/           # Custody calculator (who has the kids this week)
├── planning/           # School schedule images
├── activites/          # Kids activities - CRUD from DB (football, ping-pong)
├── passation/          # Handoff checklist - CRUD from DB
├── heure-arrivee/      # School arrival times
└── layout.tsx          # Root layout with Menu

components/
├── common/             # Shared: Menu, Icon, CustodyHero, ActivityCard
└── ui/                 # shadcn/ui: Card, Badge, Tabs, Alert, Input

lib/
├── db.ts               # Neon + Drizzle connection
├── schema.ts           # Database schema (passation_items, activities)
├── family-config.ts    # Env-based family name config
└── utils.ts            # Tailwind merge utility

assets/
└── image.ts            # Image paths registry (type-safe)

translations/
└── fr.json             # All French translations
```

## Key Patterns

### Images Registry
```ts
// assets/image.ts
export const images = {
  "planning-child-a": "/images/planning-child-a.jpg",
  "parent-a": "/images/parent-a.jpg",
  "parent-b": "/images/parent-b.jpg",
};
export type image = keyof typeof images;
```

### i18n Usage
```ts
const t = useScoped18n("common.week");
t("custody-subtitle") // → "a la garde cette semaine"
```

### Personalization
- Family names are configurable via `.env.local` (see `.env.example`)
- Default values: "Parent A", "Parent B", "Enfant 1", "Enfant 2"

### Theming
- All colors via CSS variables (HSL without wrapper)
- See `docs/THEMING.md` for full guide
- Never hardcode colors - use tokens or `white/opacity`

## Theme Colors

| Token | HSL | Usage |
|-------|-----|-------|
| `--background` | `270 89% 8%` | Deep purple bg |
| `--primary` | `172 66% 50%` | Teal accent |
| `--accent` | `280 60% 60%` | Light purple |

## Business Logic

### Custody Calculation
- **EVEN weeks** → Parent A's custody
- **ODD weeks** → Parent B's custody
- Week number from `dayjs().isoWeek()`

### Children
- **Child A** - Ping pong
- **Child B** - Football (training + matches)

## Commands

```bash
pnpm dev          # Development
pnpm build        # Production build
pnpm lint         # ESLint
```

## Conventions

1. **No `any`** - Use proper types or Zod validation
2. **No `as` casting** - Use type guards
3. **Arrow functions** - Never `function` keyword
4. **Type over interface** - Prefer `type` declarations
5. **i18n everything** - No hardcoded French strings
6. **Tokens only** - No hardcoded colors

## Files to Know

| File | Purpose |
|------|---------|
| `app/globals.css` | Theme tokens + utilities |
| `translations/fr.json` | All translations |
| `assets/image.ts` | Image paths registry |
| `components/common/menu.tsx` | Navigation menu |
| `components/common/custody-hero.tsx` | Main custody display |
| `lib/family-config.ts` | Env-based family name config |
| `lib/db.ts` | Neon + Drizzle DB connection |
| `lib/schema.ts` | Database schema (Drizzle tables) |
| `drizzle.config.ts` | Drizzle Kit configuration |
