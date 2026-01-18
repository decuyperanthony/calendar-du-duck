# Calendar du Duck

A family organization app for managing kids' weekly schedules, activities, and school routines. Built with a Disney+ inspired dark purple theme.

## Features

- **Semaines** - Weekly calendar with even/odd week tracking
- **Activités** - Kids' extracurricular activities (football, ping-pong, matches)
- **Planning** - Visual school schedules with zoomable images
- **Heure d'arrivée** - School arrival times calculator
- **Passation** - Checklist for parent handoffs (school items, gear, etc.)

## Tech Stack

- **Framework** - [Next.js 16](https://nextjs.org) with App Router
- **Language** - TypeScript
- **Styling** - Tailwind CSS with custom dark theme
- **UI Components** - Radix UI primitives + shadcn/ui
- **i18n** - next-intl (French)
- **Forms** - React Hook Form + Zod validation
- **Icons** - Lucide React

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
app/
├── activites/      # Kids activities page
├── heure-arrivee/  # School arrival times
├── passation/      # Parent handoff checklist
├── planning/       # School schedule images
├── semaines/       # Weekly calendar
└── page.tsx        # Home page

components/
├── common/         # Shared components (Menu, ActivityCard, Icon)
└── ui/             # Base UI components (Card, Badge, Tabs, Alert)

translations/
└── fr.json         # French translations
```

## Design

Disney+ inspired dark purple theme with:
- Dark purple background (`hsl(270 89% 8%)`)
- Teal primary accent
- Glass morphism effects
- Inter font family

## License

Private project.
