# Theming Guide - Disney+ Inspired Dark Theme

This document describes the theming architecture used in this project. Use it as a reference or prompt for setting up similar themes in other projects.

## Architecture Overview

We use **CSS Custom Properties (tokens)** + **Tailwind CSS** + **shadcn/ui** for a fully tokenized, theme-switchable design system.

### Key Principles

1. **NEVER hardcode colors** - Always use CSS variables via Tailwind classes
2. **Use HSL format** - Enables easy manipulation (opacity, variants)
3. **Semantic naming** - `--primary`, `--accent`, not `--teal`, `--purple`
4. **Component tokens** - Each component type has its own color tokens
5. **shadcn/ui compatible** - Follow their token naming convention

---

## CSS Variables Setup

### File: `app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Background & Foreground */
    --background: 270 89% 8%;      /* Deep purple - hsl(270, 89%, 8%) */
    --foreground: 0 0% 98%;        /* Almost white */

    /* Card surfaces */
    --card: 270 60% 12%;
    --card-foreground: 0 0% 98%;

    /* Popover/Dropdown surfaces */
    --popover: 270 60% 12%;
    --popover-foreground: 0 0% 98%;

    /* Primary action color (teal) */
    --primary: 172 66% 50%;
    --primary-foreground: 270 89% 8%;

    /* Secondary/muted elements */
    --secondary: 270 30% 20%;
    --secondary-foreground: 0 0% 90%;

    /* Muted text and backgrounds */
    --muted: 270 30% 15%;
    --muted-foreground: 270 10% 60%;

    /* Accent color (lighter purple) */
    --accent: 280 60% 60%;
    --accent-foreground: 0 0% 100%;

    /* Destructive/error states */
    --destructive: 0 72% 51%;
    --destructive-foreground: 0 0% 100%;

    /* Borders and inputs */
    --border: 270 30% 20%;
    --input: 270 30% 18%;
    --ring: 172 66% 50%;

    /* Custom semantic tokens for activities/features */
    --sport: 172 66% 50%;
    --sport-foreground: 270 89% 8%;
    --match: 340 82% 60%;
    --match-foreground: 0 0% 100%;

    /* Border radius */
    --radius: 0.75rem;
  }

  /* Optional: Light theme override */
  .light {
    --background: 0 0% 100%;
    --foreground: 270 89% 8%;
    /* ... override other tokens */
  }
}
```

### Why HSL without `hsl()`?

We store values as `H S% L%` (e.g., `270 89% 8%`) without the `hsl()` wrapper. This allows Tailwind to add opacity modifiers:

```css
/* This works because we store raw HSL values */
.bg-primary/50  /* → hsl(172 66% 50% / 0.5) */
.text-white/70  /* → hsl(0 0% 100% / 0.7) */
```

---

## Tailwind Configuration

### File: `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Map CSS variables to Tailwind classes
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Custom semantic colors
        sport: {
          DEFAULT: "hsl(var(--sport))",
          foreground: "hsl(var(--sport-foreground))",
        },
        match: {
          DEFAULT: "hsl(var(--match))",
          foreground: "hsl(var(--match-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

---

## Utility Classes

### File: `app/globals.css` (continued)

```css
@layer utilities {
  /* Gradient backgrounds */
  .gradient-dark {
    background: linear-gradient(
      180deg,
      hsl(var(--background)) 0%,
      hsl(280 60% 12%) 50%,
      hsl(270 50% 5%) 100%
    );
  }

  /* Glass morphism effect */
  .glass-dark {
    @apply bg-white/5 backdrop-blur-xl border border-white/10;
  }

  /* Glow effects */
  .glow-primary {
    box-shadow: 0 0 30px hsl(var(--primary) / 0.3);
  }

  .glow-accent {
    box-shadow: 0 0 20px hsl(var(--accent) / 0.3);
  }

  /* Soft shadows for dark theme */
  .shadow-soft {
    box-shadow:
      0 4px 20px -4px hsl(0 0% 0% / 0.5),
      0 0 0 1px hsl(var(--border) / 0.5);
  }
}
```

---

## Component Examples

### Using Tokens in Components

```tsx
// ✅ CORRECT - Using token classes
<div className="bg-primary text-primary-foreground">
  Primary button
</div>

<div className="bg-card border-border text-card-foreground">
  Card content
</div>

<p className="text-muted-foreground">
  Muted helper text
</p>

// ✅ CORRECT - Using opacity modifiers with white/black
<div className="bg-white/5 border-white/10 text-white/70">
  Glass effect
</div>

// ❌ WRONG - Hardcoded colors
<div className="bg-[#2a0555] text-[#2dd4bf]">
  Never do this
</div>

// ❌ WRONG - Hardcoded white
<div className="bg-white text-gray-900">
  This breaks dark theme
</div>
```

### Badge Component with Variants

```tsx
// components/ui/badge.tsx
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-white/10 bg-white/10 text-white/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "border-white/20 text-white/80 bg-transparent",
        // Custom semantic variants
        sport: "border-transparent bg-sport text-sport-foreground",
        match: "border-transparent bg-match text-match-foreground",
        accent: "border-transparent bg-accent text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
```

### Card with Glass Effect

```tsx
// components/ui/card.tsx
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm",
        "shadow-soft transition-all duration-200",
        "hover:bg-white/8 hover:border-white/15",
        className
      )}
      {...props}
    />
  )
);
```

---

## Color Palette Reference

### Primary Colors (Teal)
| Token | HSL | Usage |
|-------|-----|-------|
| `--primary` | `172 66% 50%` | Primary actions, active states |
| `--sport` | `172 66% 50%` | Sport-related badges |

### Accent Colors (Purple)
| Token | HSL | Usage |
|-------|-----|-------|
| `--accent` | `280 60% 60%` | Secondary highlights |
| `--match` | `340 82% 60%` | Match/competition badges |

### Background Colors
| Token | HSL | Usage |
|-------|-----|-------|
| `--background` | `270 89% 8%` | Page background |
| `--card` | `270 60% 12%` | Card surfaces |
| `--muted` | `270 30% 15%` | Muted backgrounds |

### Text Colors
| Class | Opacity | Usage |
|-------|---------|-------|
| `text-foreground` | 100% | Primary text |
| `text-white/90` | 90% | Secondary text |
| `text-white/70` | 70% | Muted text |
| `text-white/50` | 50% | Placeholder, hints |

---

## Typography

### Font Setup

```css
/* globals.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
  font-family: 'Inter', system-ui, sans-serif;
}
```

### Text Styles

```tsx
// Headings
<h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary">
  Hero Title
</h1>

// Labels
<span className="text-xs uppercase tracking-widest text-white/50 font-medium">
  Label
</span>

// Body
<p className="text-sm text-white/70">
  Body text
</p>
```

---

## Animation

```css
/* globals.css */
@keyframes animate-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: animate-in 0.3s ease-out;
}
```

---

## Checklist for New Projects

- [ ] Set up CSS variables in `globals.css` with HSL values (no wrapper)
- [ ] Configure `tailwind.config.ts` to map variables to classes
- [ ] Install `tailwindcss-animate` for animations
- [ ] Use `class-variance-authority` for component variants
- [ ] Create utility classes for gradients and glass effects
- [ ] Never hardcode colors - always use tokens or `white/opacity`
- [ ] Test with different opacity levels for depth hierarchy
- [ ] Add semantic color tokens for domain-specific features

---

## Prompt for Claude

Use this prompt when asking Claude to set up a similar theme:

```
Set up a Disney+ inspired dark purple theme for a Next.js + Tailwind + shadcn/ui project.

Requirements:
1. Use CSS custom properties (tokens) in HSL format WITHOUT the hsl() wrapper
2. Follow shadcn/ui naming conventions (--primary, --secondary, --accent, etc.)
3. Configure tailwind.config.ts to map CSS variables to Tailwind classes
4. Create utility classes for: gradient-dark, glass-dark, glow effects
5. NEVER hardcode colors - always use tokens or white/black with opacity
6. Support future theme switching (light mode ready)
7. Use Inter font from Google Fonts
8. Add smooth animations with tailwindcss-animate

Color palette:
- Background: Deep purple (270, 89%, 8%)
- Primary: Teal (172, 66%, 50%)
- Accent: Light purple (280, 60%, 60%)
- Use white/opacity for glass effects and text hierarchy

The theme should feel premium, modern, and work well on both mobile and desktop.
```
