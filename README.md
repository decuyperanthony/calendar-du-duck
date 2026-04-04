# Calendar du Duck

> A modern co-parenting organization app built for real life. Shared custody, simplified.

**Calendar du Duck** helps co-parents stay organized with a beautiful, mobile-first PWA for managing alternating custody weeks, kids' activities, school schedules, and handoff checklists.

Built as a real-world solution to a real-world problem: coordinating two households around the same kids.

---

## Screenshots

<p align="center">
  <img src="docs/screenshots/custody.jpg" alt="Custody week screen" width="300" />
  &nbsp;&nbsp;&nbsp;
  <img src="docs/screenshots/activities.jpg" alt="Activities screen" width="300" />
</p>

<p align="center">
  <em>Custody calculator &mdash; who has the kids this week?</em>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <em>Activities tracker with glassmorphism cards</em>
</p>

---

## Features

| Feature | Description |
|---------|-------------|
| **Custody Calendar** | Instantly see which parent has custody this week based on even/odd ISO week numbers |
| **Activities Tracker** | Full CRUD management of each child's extracurricular schedule (training, matches) — stored in Neon PostgreSQL |
| **School Planning** | Zoomable school schedule images per child |
| **Handoff Checklist** | Dynamic checklist for parent-to-parent transitions — add/remove items on the fly via database |
| **Arrival Times** | Quick-reference table for school period start times |
| **School Holidays** | Automatic school vacation indicator (Zone C, Paris region) |
| **PWA** | Installable on iOS/Android with offline support, splash screens, and native-feel navigation |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript (strict mode, zero `any`, zero `as` casts) |
| Database | [Neon](https://neon.tech) (Serverless PostgreSQL) |
| ORM | [Drizzle ORM](https://orm.drizzle.team) (type-safe, zero-abstraction) |
| Styling | Tailwind CSS + CSS custom properties (design tokens) |
| UI | [shadcn/ui](https://ui.shadcn.com) + [Radix](https://radix-ui.com) primitives |
| Icons | [Phosphor Icons](https://phosphoricons.com) + [Lucide React](https://lucide.dev) |
| i18n | [next-intl](https://next-intl-docs.vercel.app) (French) |
| Validation | [Zod](https://zod.dev) (API + forms) |
| Forms | React Hook Form |
| PWA | [@ducanh2912/next-pwa](https://github.com/DuCanhGH/next-pwa) |
| Hosting | [Vercel](https://vercel.com) |

## Design

- **Disney+ inspired** dark purple theme with glassmorphism effects
- Deep purple gradient background (`hsl(270 89% 8%)`)
- Teal & purple dual-accent system for parent differentiation
- Glassmorphism cards with backdrop blur and subtle borders
- Activity cards with smart icon/glow matching (football, ping-pong, match)
- Fully responsive: mobile-first with desktop sidebar navigation

## Architecture

```
app/
├── api/
│   ├── passation/         # CRUD API for handoff checklist items
│   │   ├── route.ts       # GET (grouped by child) + POST
│   │   └── [id]/route.ts  # PUT + DELETE
│   └── activities/        # CRUD API for extracurricular activities
│       ├── route.ts       # GET (grouped by child) + POST
│       └── [id]/route.ts  # PUT + DELETE
├── semaines/              # Custody week calculator (ISO week parity)
├── activites/             # Per-child activity management with inline CRUD
├── passation/             # Handoff checklist with add/remove
├── planning/              # Zoomable school schedule images
├── heure-arrivee/         # School arrival times reference
└── layout.tsx             # Root layout: i18n, PWA, navigation

components/
├── common/                # Domain components (CustodyHero, ActivityCard, Menu)
└── ui/                    # Design system (shadcn/ui: Card, Badge, Tabs, Input)

lib/
├── db.ts                  # Neon + Drizzle connection
├── schema.ts              # Database schema (passation_items, activities)
├── family-config.ts       # Env-based family name configuration
└── utils.ts               # Tailwind merge utility

translations/
└── fr.json                # All UI strings (French)
```

### Key Design Decisions

- **ISO week parity** for custody: even weeks = Parent A, odd weeks = Parent B. Simple, deterministic, no backend needed.
- **Neon + Drizzle** for dynamic data: handoff checklists and activities are managed via API routes with full CRUD, while static content (schedules, translations) stays in code.
- **Zod validation** at API boundaries: all POST/PUT payloads are validated server-side with Zod schemas.
- **Env-based personalization**: all names and images configurable via environment variables, making the app reusable for any family.
- **PWA-first**: installable on home screens with offline capability (Workbox service worker with NetworkFirst for API, CacheFirst for assets).
- **CSS custom properties** for theming: all colors are tokens, making theme changes a single-file edit.
- **Strict TypeScript**: zero `any`, no `as` casts, Zod for runtime validation.
- **i18n from day one**: all static strings externalized via next-intl.

## Getting Started

```bash
git clone https://github.com/decuyperanthony/calendar-du-duck.git
cd calendar-du-duck
pnpm install
```

### Database Setup

1. Create a free database on [Neon](https://neon.tech)
2. Copy the connection string and add it to `.env.local`:

```env
DATABASE_URL=postgresql://user:password@your-host.neon.tech/calendar-du-duck?sslmode=require
```

3. Run the migration SQL in Neon's SQL Editor (see [Migration Script](#migration-script) below)

### Personalization

```env
NEXT_PUBLIC_PARENT_A_NAME=Papa
NEXT_PUBLIC_PARENT_B_NAME=Maman
NEXT_PUBLIC_CHILD_A_NAME=Alice
NEXT_PUBLIC_CHILD_B_NAME=Hugo
```

### Run

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Migration Script

Run this SQL in the Neon SQL Editor to create the required tables:

```sql
CREATE TABLE passation_items (
  id SERIAL PRIMARY KEY,
  child TEXT NOT NULL,
  label TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE activities (
  id SERIAL PRIMARY KEY,
  child TEXT NOT NULL,
  activity TEXT NOT NULL,
  schedule TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Seed: default handoff checklist items
INSERT INTO passation_items (child, label, sort_order) VALUES
  ('child-a', 'Affaires de classe', 0),
  ('child-a', 'Baskets', 1),
  ('child-b', 'Chaussures de sport', 0),
  ('child-b', 'Veste de sport', 1),
  ('child-b', 'Affaires de classe', 2);

-- Seed: default activities
INSERT INTO activities (child, activity, schedule, sort_order) VALUES
  ('child-a', 'Ping pong - Entrainement', 'Samedi 16H30 à 18H', 0),
  ('child-b', 'Foot - Entrainement', 'mardi 19H à 20H30', 0),
  ('child-b', 'Foot - Entrainement', 'mercredi 16H30 à 18H', 1),
  ('child-b', 'Foot - Match', 'Samedi', 2),
  ('child-b', 'Ping pong - Entrainement', 'Samedi 16H30 à 18H', 3);
```

## Scripts

```bash
pnpm dev               # Development server
pnpm build             # Production build
pnpm start             # Production server
pnpm lint              # ESLint
pnpm generate:icons    # Generate PWA icons from SVG
pnpm generate:splash   # Generate iOS splash screens
pnpm generate:pwa      # Generate all PWA assets
```

## License

MIT
