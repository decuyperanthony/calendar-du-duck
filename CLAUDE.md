# CLAUDE.md - Calendar du Duck

Project-specific context for Claude agents.

## Project Overview

**Purpose:** Family organization app for shared custody (garde alternée)
**Users:** Anthony & Flora - parents of Léonard & Lucas

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict, no `any`, no `as` casting)
- **Styling:** Tailwind CSS + CSS variables (tokens)
- **UI Components:** shadcn/ui + Radix primitives
- **Icons:** lucide-react
- **i18n:** next-intl (French only)
- **Forms:** React Hook Form + Zod

## Project Structure

```
app/
├── semaines/       # Custody calculator (who has the kids this week)
├── planning/       # School schedule images
├── activites/      # Kids activities (football, ping-pong)
├── passation/      # Handoff checklist between parents
├── heure-arrivee/  # School arrival times
└── layout.tsx      # Root layout with Menu

components/
├── common/         # Shared: Menu, Icon, CustodyHero, ActivityCard
└── ui/             # shadcn/ui: Card, Badge, Tabs, Alert, Input

assets/
└── image.ts        # Image paths registry (type-safe)

translations/
└── fr.json         # All French translations
```

## Key Patterns

### Images Registry
```ts
// assets/image.ts
export const images = {
  "planning-leonard": "/images/planning-leonard.jpg",
  anthony: "/images/anthony.jpg",
  flora: "/images/flora.jpg",
};
export type image = keyof typeof images;
```

### i18n Usage
```ts
const t = useScoped18n("common.week");
t("custody-subtitle") // → "a la garde cette semaine"
```

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
- **EVEN weeks** → Anthony's custody
- **ODD weeks** → Flora's custody
- Week number from `dayjs().isoWeek()`

### Children
- **Léonard** - Ping pong
- **Lucas** - Football (training + matches)

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
