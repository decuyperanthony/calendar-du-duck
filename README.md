# Calendar du Duck

> A modern co-parenting organization app built for real life. Shared custody, simplified.

**Calendar du Duck** helps co-parents stay organized with a beautiful, mobile-first PWA for managing alternating custody weeks, kids' activities, school schedules, and handoff checklists.

Built as a real-world solution to a real-world problem: coordinating two households around the same kids.

---

## Features

| Feature | Description |
|---------|-------------|
| **Custody Calendar** | Instantly see which parent has custody this week based on even/odd ISO week numbers |
| **Activities Tracker** | Each child's extracurricular schedule (training, matches, etc.) in dedicated tabs |
| **School Planning** | Zoomable school schedule images per child |
| **Handoff Checklist** | Interactive todo list for parent-to-parent transitions (gear, clothes, school items) |
| **Arrival Times** | Quick-reference table for school period start times |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript (strict mode, zero `any`) |
| Styling | Tailwind CSS + CSS custom properties |
| UI | [shadcn/ui](https://ui.shadcn.com) + [Radix](https://radix-ui.com) primitives |
| Icons | [Lucide React](https://lucide.dev) + [Phosphor Icons](https://phosphoricons.com) |
| i18n | [next-intl](https://next-intl-docs.vercel.app) |
| Forms | React Hook Form + Zod validation |
| PWA | Installable with offline support, splash screens, and native-feel navigation |

## Screenshots

<p align="center">
  <em>Disney+ inspired dark purple theme with glass morphism effects</em>
</p>

- Deep purple gradient background (`hsl(270 89% 8%)`)
- Teal & purple dual-accent system for parent differentiation
- Glass morphism navigation bars
- Fully responsive: mobile-first with desktop adaptation

## Getting Started

```bash
# Clone the repository
git clone https://github.com/decuyperanthony/calendar-du-duck.git
cd calendar-du-duck

# Install dependencies
pnpm install

# (Optional) Personalize with your family's names
cp .env.example .env.local
# Edit .env.local with your names

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Personalization

The app ships with generic labels ("Parent A", "Enfant 1", etc.). To customize for your family, create a `.env.local` file:

```env
NEXT_PUBLIC_PARENT_A_NAME=Papa
NEXT_PUBLIC_PARENT_B_NAME=Maman
NEXT_PUBLIC_CHILD_A_NAME=Alice
NEXT_PUBLIC_CHILD_B_NAME=Hugo
```

All names are loaded from environment variables at build time — no database needed.

## Architecture

```
app/
├── semaines/          # Custody week calculator (ISO week parity logic)
├── activites/         # Per-child activity schedules with tab navigation
├── passation/         # Handoff checklist (IndexedDB persistence)
├── planning/          # Zoomable school schedule images
├── heure-arrivee/     # School arrival times reference
└── layout.tsx         # Root layout: i18n provider, PWA setup, navigation

components/
├── common/            # Domain components (CustodyHero, ActivityCard, Menu)
└── ui/                # Design system (shadcn/ui: Card, Badge, Tabs, GlassBar)

lib/
├── family-config.ts   # Env-based family name configuration
├── utils.ts           # Tailwind merge + clsx utility
└── next-intl.ts       # Typed i18n hooks

translations/
└── fr.json            # All UI strings (French)
```

### Key Design Decisions

- **ISO week parity** for custody: even weeks = Parent A, odd weeks = Parent B. Simple, deterministic, no backend needed.
- **PWA-first**: installable on iOS/Android home screens with native splash screens and offline capability.
- **CSS custom properties** for theming: all colors are tokens, making theme changes a single-file edit.
- **Strict TypeScript**: zero `any`, no `as` casts, Zod for runtime validation.
- **i18n from day one**: all strings externalized via next-intl, ready for multi-language support.

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
