# TASK.md - Duck UI Design System

## Objective

Create a minimal, reusable React component library (`duck-ui`) with:
- Storybook for documentation & development
- Vitest for unit testing
- Type-safe icon system (Lucide-based)
- CSS tokens system
- Tailwind preset

**Target:** Personal use across 3 apps (not open-source, no npm registry)

---

## Context

### Source Inspiration

The design system is extracted from `calendar-du-duck` app:
- Dark purple theme with teal accents
- Glass morphism effects
- Gradient cards
- shadcn/ui base components

### Tech Stack

- React 18+
- TypeScript (strict mode, no `any`, no `as` casting)
- Tailwind CSS 3.4+
- Vite (library mode) or tsup for building
- Storybook 8+ with Vitest addon
- Vitest + Testing Library
- Lucide React for icons

### Installation Target

```bash
# Consumer apps will install via git
pnpm add duck-ui@git+https://github.com/YOUR_USERNAME/duck-ui.git
```

---

## Repository Structure

```
duck-ui/
├── .storybook/
│   ├── main.ts
│   ├── preview.ts
│   └── preview-head.html
│
├── src/
│   ├── tokens/
│   │   ├── globals.css              # CSS variables
│   │   ├── tailwind.preset.ts       # Tailwind preset
│   │   └── index.ts
│   │
│   ├── lib/
│   │   ├── utils.ts                 # cn() helper
│   │   ├── object-utils.ts          # ObjectUtils.keys()
│   │   └── index.ts
│   │
│   ├── components/
│   │   ├── icon/
│   │   │   ├── icon.tsx
│   │   │   ├── icon.test.tsx
│   │   │   ├── icon.stories.tsx
│   │   │   ├── icon-registry.ts     # Icon mapping
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── card/
│   │   │   ├── card.tsx
│   │   │   ├── card.test.tsx
│   │   │   ├── card.stories.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── alert/
│   │   │   ├── alert.tsx
│   │   │   ├── alert.test.tsx
│   │   │   ├── alert.stories.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts                 # Barrel export
│   │
│   ├── stories/                     # Documentation stories
│   │   ├── tokens.stories.tsx       # Color/spacing tokens showcase
│   │   └── introduction.mdx
│   │
│   └── index.ts                     # Main entry point
│
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── vitest.setup.ts
├── tailwind.config.ts
├── postcss.config.js
├── .gitignore
├── .eslintrc.cjs
├── .prettierrc
└── README.md
```

---

## Plan

### Phase 1: Repository Setup

- [ ] Step 1: Initialize repository with pnpm
- [ ] Step 2: Configure TypeScript (strict mode)
- [ ] Step 3: Configure Tailwind CSS
- [ ] Step 4: Configure Vite (library mode)
- [ ] Step 5: Configure Vitest
- [ ] Step 6: Configure Storybook 8
- [ ] Step 7: Configure ESLint + Prettier

### Phase 2: Core Implementation

- [ ] Step 8: Create tokens system (CSS variables + Tailwind preset)
- [ ] Step 9: Create lib utilities (cn, ObjectUtils)
- [ ] Step 10: Create Icon component + registry + tests + stories
- [ ] Step 11: Create Card component + tests + stories
- [ ] Step 12: Create Alert component + tests + stories
- [ ] Step 13: Create tokens documentation story

### Phase 3: Build & Export

- [ ] Step 14: Configure package.json exports
- [ ] Step 15: Test build output
- [ ] Step 16: Write README with usage instructions

---

## Current Step

**Step 1-7: Repository Setup**

### Files to Create

#### 1. `package.json`

```json
{
  "name": "duck-ui",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./tokens": {
      "import": "./dist/tokens/index.js",
      "require": "./dist/tokens/index.cjs",
      "types": "./dist/tokens/index.d.ts"
    },
    "./tokens/globals.css": "./dist/tokens/globals.css",
    "./tailwind.preset": {
      "import": "./dist/tokens/tailwind.preset.js",
      "require": "./dist/tokens/tailwind.preset.cjs",
      "types": "./dist/tokens/tailwind.preset.d.ts"
    }
  },
  "files": [
    "dist"
  ],
  "sideEffects": [
    "**/*.css"
  ],
  "scripts": {
    "dev": "storybook dev -p 6006",
    "build": "tsc && vite build",
    "build:storybook": "storybook build",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "type-check": "tsc --noEmit",
    "prepublishOnly": "pnpm build"
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  },
  "devDependencies": {
    "@storybook/addon-essentials": "^8.4.0",
    "@storybook/addon-interactions": "^8.4.0",
    "@storybook/addon-links": "^8.4.0",
    "@storybook/addon-vitest": "^8.4.0",
    "@storybook/blocks": "^8.4.0",
    "@storybook/react": "^8.4.0",
    "@storybook/react-vite": "^8.4.0",
    "@storybook/test": "^8.4.0",
    "@testing-library/jest-dom": "^6.6.0",
    "@testing-library/react": "^16.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@typescript-eslint/eslint-plugin": "^8.0.0",
    "@typescript-eslint/parser": "^8.0.0",
    "@vitejs/plugin-react": "^4.3.0",
    "@vitest/coverage-v8": "^2.1.0",
    "@vitest/ui": "^2.1.0",
    "autoprefixer": "^10.4.20",
    "eslint": "^8.57.0",
    "eslint-plugin-react": "^7.37.0",
    "eslint-plugin-react-hooks": "^5.0.0",
    "jsdom": "^25.0.0",
    "postcss": "^8.4.47",
    "prettier": "^3.3.0",
    "prettier-plugin-tailwindcss": "^0.6.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "storybook": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "tailwindcss-animate": "^1.0.7",
    "typescript": "^5.6.0",
    "vite": "^5.4.0",
    "vite-plugin-dts": "^4.2.0",
    "vitest": "^2.1.0"
  },
  "dependencies": {
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "lucide-react": "^0.460.0",
    "tailwind-merge": "^2.5.0"
  }
}
```

#### 2. `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "declaration": true,
    "declarationMap": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

#### 3. `vite.config.ts`

```typescript
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src'],
      exclude: ['**/*.test.tsx', '**/*.stories.tsx'],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'tokens/index': resolve(__dirname, 'src/tokens/index.ts'),
        'tokens/tailwind.preset': resolve(__dirname, 'src/tokens/tailwind.preset.ts'),
      },
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        preserveModules: false,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
  },
});
```

#### 4. `vitest.config.ts`

```typescript
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['**/*.stories.tsx', '**/*.test.tsx', '**/index.ts'],
    },
  },
});
```

#### 5. `vitest.setup.ts`

```typescript
import '@testing-library/jest-dom/vitest';
```

#### 6. `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss';

import { duckUIPreset } from './src/tokens/tailwind.preset';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  presets: [duckUIPreset],
};

export default config;
```

#### 7. `postcss.config.js`

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

#### 8. `.storybook/main.ts`

```typescript
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@': new URL('../src', import.meta.url).pathname,
        },
      },
    };
  },
};

export default config;
```

#### 9. `.storybook/preview.ts`

```typescript
import type { Preview } from '@storybook/react';

import '../src/tokens/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: 'hsl(270 89% 8%)' },
        { name: 'light', value: '#ffffff' },
      ],
    },
    layout: 'centered',
  },
};

export default preview;
```

#### 10. `.storybook/preview-head.html`

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
<style>
  body {
    font-family: 'Inter', system-ui, sans-serif;
  }
</style>
```

#### 11. `.eslintrc.cjs`

```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts', 'vitest.config.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    'react/prop-types': 'off',
  },
};
```

#### 12. `.prettierrc`

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

#### 13. `.gitignore`

```
# Dependencies
node_modules/
.pnpm-store/

# Build
dist/
*.tsbuildinfo

# Storybook
storybook-static/

# Coverage
coverage/

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
pnpm-debug.log*

# Test
*.lcov
```

---

## Step 8: Tokens System

### Files to Create

#### `src/tokens/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Core palette */
    --background: 270 89% 8%;
    --foreground: 0 0% 98%;

    --card: 270 60% 12%;
    --card-foreground: 0 0% 98%;

    --popover: 270 60% 12%;
    --popover-foreground: 0 0% 98%;

    /* Primary - Vibrant teal */
    --primary: 172 66% 50%;
    --primary-foreground: 270 89% 8%;

    /* Secondary */
    --secondary: 270 30% 20%;
    --secondary-foreground: 0 0% 90%;

    /* Muted */
    --muted: 270 30% 15%;
    --muted-foreground: 270 10% 60%;

    /* Accent - Light purple */
    --accent: 280 60% 60%;
    --accent-foreground: 0 0% 100%;

    /* Semantic */
    --destructive: 0 72% 51%;
    --destructive-foreground: 0 0% 100%;

    --success: 142 76% 36%;
    --success-foreground: 0 0% 100%;

    --warning: 38 92% 50%;
    --warning-foreground: 0 0% 0%;

    --info: 199 89% 48%;
    --info-foreground: 0 0% 100%;

    /* UI */
    --border: 270 30% 20%;
    --input: 270 30% 18%;
    --ring: 172 66% 50%;

    /* Radius */
    --radius: 0.75rem;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground antialiased;
    font-family: 'Inter', system-ui, sans-serif;
  }
}

@layer utilities {
  /* Gradient utilities */
  .gradient-dark {
    background: linear-gradient(
      180deg,
      hsl(270 89% 8%) 0%,
      hsl(280 60% 12%) 50%,
      hsl(270 50% 5%) 100%
    );
  }

  .gradient-header {
    background: linear-gradient(
      90deg,
      hsl(270 89% 8%) 0%,
      hsl(280 50% 15%) 50%,
      hsl(270 89% 8%) 100%
    );
  }

  .gradient-card {
    background: linear-gradient(135deg, hsl(270 60% 14%) 0%, hsl(270 50% 10%) 100%);
  }

  /* Glass effect */
  .glass-dark {
    @apply border border-white/10 bg-white/5 backdrop-blur-xl;
  }

  /* Glow effects */
  .glow-primary {
    box-shadow: 0 0 30px hsl(var(--primary) / 0.3);
  }

  .glow-accent {
    box-shadow: 0 0 20px hsl(var(--accent) / 0.3);
  }

  /* Shadows */
  .shadow-soft {
    box-shadow:
      0 4px 20px -4px hsl(0 0% 0% / 0.5),
      0 0 0 1px hsl(270 30% 20% / 0.5);
  }

  .shadow-elevated {
    box-shadow:
      0 8px 30px -4px hsl(0 0% 0% / 0.6),
      0 0 0 1px hsl(270 30% 25% / 0.5);
  }

  /* Animations */
  .animate-in {
    animation: animate-in 0.3s ease-out;
  }

  .animate-slide-up {
    animation: slide-up 0.3s ease-out;
  }

  .animate-fade-in {
    animation: fade-in 0.2s ease-out;
  }

  .animate-glow {
    animation: glow-pulse 2s ease-in-out infinite;
  }
}

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

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes glow-pulse {
  0%,
  100% {
    box-shadow: 0 0 20px hsl(var(--primary) / 0.3);
  }
  50% {
    box-shadow: 0 0 30px hsl(var(--primary) / 0.5);
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: hsl(270 30% 10%);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: hsl(270 30% 25%);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(270 30% 35%);
}

/* Selection */
::selection {
  background: hsl(var(--primary) / 0.3);
  color: hsl(var(--foreground));
}
```

#### `src/tokens/tailwind.preset.ts`

```typescript
import type { Config } from 'tailwindcss';

export const duckUIPreset: Partial<Config> = {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: 'hsl(var(--info-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 2s infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

#### `src/tokens/index.ts`

```typescript
export { duckUIPreset } from './tailwind.preset';
```

---

## Step 9: Lib Utilities

#### `src/lib/utils.ts`

```typescript
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { ClassValue } from 'clsx';

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};
```

#### `src/lib/object-utils.ts`

```typescript
/**
 * Type-safe Object.keys that returns typed array
 */
export const keys = <T extends object>(obj: T): Array<keyof T> => {
  return Object.keys(obj) as Array<keyof T>;
};

/**
 * Type-safe Object.entries
 */
export const entries = <T extends object>(obj: T): Array<[keyof T, T[keyof T]]> => {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
};

export const ObjectUtils = {
  keys,
  entries,
};
```

#### `src/lib/index.ts`

```typescript
export { cn } from './utils';
export { ObjectUtils } from './object-utils';
```

---

## Step 10: Icon Component

### Pattern

The Icon component uses a **registry pattern** for type-safe icon names:
1. All icons are registered in `icon-registry.ts`
2. `IconName` type is automatically inferred from the registry
3. Components use `name` prop with autocomplete
4. Easy to add new icons without touching the component

#### `src/components/icon/icon-registry.ts`

```typescript
import type { ElementType } from 'react';

import {
  AlertCircle,
  AlertTriangle,
  Archive,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bell,
  Calendar,
  CalendarCheck,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
  Clock,
  Copy,
  Download,
  Edit,
  ExternalLink,
  Eye,
  EyeOff,
  File,
  Filter,
  Folder,
  Heart,
  HelpCircle,
  Home,
  Image,
  Info,
  Link,
  List,
  Loader,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Moon,
  MoreHorizontal,
  MoreVertical,
  Pencil,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Share,
  Star,
  Sun,
  Trash,
  Upload,
  User,
  Users,
  X,
  XCircle,
} from 'lucide-react';

import { ObjectUtils } from '@/lib/object-utils';

/**
 * Icon registry - Add new icons here
 *
 * Convention: kebab-case keys matching lucide names
 * The key becomes the `name` prop value
 */
const ICON_MAP = {
  // Alerts & Status
  'alert-circle': AlertCircle,
  'alert-triangle': AlertTriangle,
  'check-circle': CheckCircle,
  'x-circle': XCircle,
  'help-circle': HelpCircle,
  info: Info,
  check: Check,

  // Navigation
  'arrow-down': ArrowDown,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
  'external-link': ExternalLink,
  home: Home,
  menu: Menu,

  // Actions
  copy: Copy,
  download: Download,
  edit: Edit,
  filter: Filter,
  link: Link,
  'log-out': LogOut,
  pencil: Pencil,
  plus: Plus,
  minus: Minus,
  'refresh-cw': RefreshCw,
  search: Search,
  settings: Settings,
  share: Share,
  trash: Trash,
  upload: Upload,
  x: X,

  // Objects
  archive: Archive,
  bell: Bell,
  calendar: Calendar,
  'calendar-check': CalendarCheck,
  circle: Circle,
  clock: Clock,
  file: File,
  folder: Folder,
  image: Image,
  list: List,
  lock: Lock,
  mail: Mail,
  'map-pin': MapPin,
  'message-circle': MessageCircle,
  phone: Phone,

  // Users
  user: User,
  users: Users,

  // UI
  eye: Eye,
  'eye-off': EyeOff,
  heart: Heart,
  loader: Loader,
  moon: Moon,
  'more-horizontal': MoreHorizontal,
  'more-vertical': MoreVertical,
  star: Star,
  sun: Sun,
} as const;

export const iconNames = ObjectUtils.keys(ICON_MAP);
export type IconName = keyof typeof ICON_MAP;

export const ICONS: Record<IconName, ElementType> = ICON_MAP;
```

#### `src/components/icon/types.ts`

```typescript
import type { ComponentPropsWithoutRef } from 'react';

import type { IconName } from './icon-registry';

export const iconSizes = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
} as const;

export type IconSize = keyof typeof iconSizes;

export type IconProps = Omit<ComponentPropsWithoutRef<'svg'>, 'ref'> & {
  /** Icon name from the registry */
  name: IconName;
  /** Size preset */
  size?: IconSize;
  /** Stroke width (1-3) */
  strokeWidth?: number;
};
```

#### `src/components/icon/icon.tsx`

```typescript
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { ICONS } from './icon-registry';
import { iconSizes } from './types';

import type { IconProps } from './types';

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ className, name, size = 'sm', strokeWidth = 2, ...props }, ref) => {
    const IconComponent = ICONS[name];

    return (
      <IconComponent
        ref={ref}
        aria-hidden="true"
        className={cn('shrink-0', className)}
        focusable={false}
        size={iconSizes[size]}
        strokeWidth={strokeWidth}
        {...props}
      />
    );
  }
);

Icon.displayName = 'Icon';
```

#### `src/components/icon/icon.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Icon } from './icon';
import { iconNames, ICONS } from './icon-registry';
import { iconSizes } from './types';

import type { IconSize } from './types';

describe('Icon', () => {
  it('renders without crashing', () => {
    render(<Icon name="check" data-testid="icon" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders as an SVG element', () => {
    render(<Icon name="check" data-testid="icon" />);
    expect(screen.getByTestId('icon').tagName).toBe('svg');
  });

  it('applies aria-hidden attribute for accessibility', () => {
    render(<Icon name="check" data-testid="icon" />);
    expect(screen.getByTestId('icon')).toHaveAttribute('aria-hidden', 'true');
  });

  it('is not focusable', () => {
    render(<Icon name="check" data-testid="icon" />);
    expect(screen.getByTestId('icon')).toHaveAttribute('focusable', 'false');
  });

  it('applies shrink-0 class by default', () => {
    render(<Icon name="check" data-testid="icon" />);
    expect(screen.getByTestId('icon')).toHaveClass('shrink-0');
  });

  it('merges custom className with default classes', () => {
    render(<Icon name="check" data-testid="icon" className="text-primary" />);
    const icon = screen.getByTestId('icon');
    expect(icon).toHaveClass('shrink-0');
    expect(icon).toHaveClass('text-primary');
  });

  describe('sizes', () => {
    const sizes: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

    sizes.forEach((size) => {
      it(`renders ${size} size with correct dimensions`, () => {
        render(<Icon name="check" size={size} data-testid="icon" />);
        const icon = screen.getByTestId('icon');
        expect(icon).toHaveAttribute('width', String(iconSizes[size]));
        expect(icon).toHaveAttribute('height', String(iconSizes[size]));
      });
    });

    it('defaults to sm size', () => {
      render(<Icon name="check" data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toHaveAttribute('width', String(iconSizes.sm));
      expect(icon).toHaveAttribute('height', String(iconSizes.sm));
    });
  });

  describe('strokeWidth', () => {
    it('defaults to strokeWidth 2', () => {
      render(<Icon name="check" data-testid="icon" />);
      expect(screen.getByTestId('icon')).toHaveAttribute('stroke-width', '2');
    });

    it('accepts custom strokeWidth', () => {
      render(<Icon name="check" strokeWidth={1.5} data-testid="icon" />);
      expect(screen.getByTestId('icon')).toHaveAttribute('stroke-width', '1.5');
    });
  });

  describe('icon registry', () => {
    it('renders all registered icons without error', () => {
      iconNames.forEach((name) => {
        const { unmount } = render(<Icon name={name} data-testid={`icon-${name}`} />);
        expect(screen.getByTestId(`icon-${name}`)).toBeInTheDocument();
        unmount();
      });
    });

    it('has matching registry keys and icon components', () => {
      iconNames.forEach((name) => {
        expect(ICONS[name]).toBeDefined();
      });
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to SVG element', () => {
      let svgRef: SVGSVGElement | null = null;
      render(
        <Icon
          name="check"
          ref={(ref) => {
            svgRef = ref;
          }}
        />
      );
      expect(svgRef).toBeInstanceOf(SVGSVGElement);
    });
  });
});
```

#### `src/components/icon/icon.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from './icon';
import { iconNames } from './icon-registry';
import { iconSizes } from './types';

import type { IconSize } from './types';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: iconNames,
      description: 'Icon name from the registry',
    },
    size: {
      control: 'select',
      options: Object.keys(iconSizes),
      description: 'Size preset',
    },
    strokeWidth: {
      control: { type: 'range', min: 1, max: 3, step: 0.5 },
      description: 'Stroke width',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

// Basic usage
export const Default: Story = {
  args: {
    name: 'check',
    size: 'md',
  },
};

// All sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      {(Object.keys(iconSizes) as IconSize[]).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Icon name="star" size={size} className="text-primary" />
          <span className="text-xs text-muted-foreground">
            {size} ({iconSizes[size]}px)
          </span>
        </div>
      ))}
    </div>
  ),
};

// Stroke widths
export const StrokeWidths: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      {[1, 1.5, 2, 2.5, 3].map((width) => (
        <div key={width} className="flex flex-col items-center gap-2">
          <Icon name="heart" size="lg" strokeWidth={width} className="text-accent" />
          <span className="text-xs text-muted-foreground">{width}</span>
        </div>
      ))}
    </div>
  ),
};

// Color variants
export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon name="check-circle" size="lg" className="text-primary" />
      <Icon name="alert-circle" size="lg" className="text-destructive" />
      <Icon name="info" size="lg" className="text-accent" />
      <Icon name="alert-triangle" size="lg" className="text-warning" />
      <Icon name="check" size="lg" className="text-success" />
    </div>
  ),
};

// Icon gallery - all icons
export const Gallery: Story = {
  render: () => (
    <div className="grid grid-cols-8 gap-4">
      {iconNames.map((name) => (
        <div
          key={name}
          className="flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-3"
        >
          <Icon name={name} size="md" className="text-foreground" />
          <span className="text-center text-[10px] text-muted-foreground">{name}</span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Copy-paste helper
export const CopyHelper: Story = {
  render: () => {
    const copyToClipboard = (text: string) => {
      void navigator.clipboard.writeText(text);
    };

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Click an icon to copy its import code</p>
        <div className="grid grid-cols-6 gap-3">
          {iconNames.slice(0, 24).map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => copyToClipboard(`<Icon name="${name}" />`)}
              className="flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-3 transition-colors hover:border-primary/50 hover:bg-primary/10"
            >
              <Icon name={name} size="md" />
              <span className="text-[10px] text-muted-foreground">{name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};
```

#### `src/components/icon/index.ts`

```typescript
export { Icon } from './icon';
export { ICONS, iconNames } from './icon-registry';
export { iconSizes } from './types';

export type { IconName } from './icon-registry';
export type { IconProps, IconSize } from './types';
```

---

## Step 11: Card Component

#### `src/components/card/card.tsx`

```typescript
import { forwardRef } from 'react';

import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

// Card
type CardProps = ComponentPropsWithoutRef<'div'>;

export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-2xl border border-white/10 text-card-foreground shadow-soft gradient-card',
      'transition-all duration-300 hover:border-white/20 hover:shadow-elevated',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

// CardHeader
type CardHeaderProps = ComponentPropsWithoutRef<'div'>;

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-5 pb-0', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

// CardTitle
type CardTitleProps = ComponentPropsWithoutRef<'h3'>;

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold leading-none tracking-tight text-white', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

// CardDescription
type CardDescriptionProps = ComponentPropsWithoutRef<'p'>;

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
);
CardDescription.displayName = 'CardDescription';

// CardContent
type CardContentProps = ComponentPropsWithoutRef<'div'>;

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-5', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

// CardFooter
type CardFooterProps = ComponentPropsWithoutRef<'div'>;

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-5 pt-0', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';
```

#### `src/components/card/card.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

describe('Card', () => {
  it('renders without crashing', () => {
    render(<Card data-testid="card">Content</Card>);
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies default classes', () => {
    render(<Card data-testid="card" />);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('rounded-2xl');
    expect(card).toHaveClass('border');
    expect(card).toHaveClass('shadow-soft');
    expect(card).toHaveClass('gradient-card');
  });

  it('merges custom className', () => {
    render(<Card data-testid="card" className="custom-class" />);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('custom-class');
    expect(card).toHaveClass('rounded-2xl');
  });

  it('forwards ref', () => {
    let cardRef: HTMLDivElement | null = null;
    render(
      <Card
        ref={(ref) => {
          cardRef = ref;
        }}
      />
    );
    expect(cardRef).toBeInstanceOf(HTMLDivElement);
  });
});

describe('CardHeader', () => {
  it('renders with correct classes', () => {
    render(<CardHeader data-testid="header" />);
    const header = screen.getByTestId('header');
    expect(header).toHaveClass('flex');
    expect(header).toHaveClass('flex-col');
    expect(header).toHaveClass('p-5');
    expect(header).toHaveClass('pb-0');
  });

  it('forwards ref', () => {
    let headerRef: HTMLDivElement | null = null;
    render(
      <CardHeader
        ref={(ref) => {
          headerRef = ref;
        }}
      />
    );
    expect(headerRef).toBeInstanceOf(HTMLDivElement);
  });
});

describe('CardTitle', () => {
  it('renders as h3 element', () => {
    render(<CardTitle>Title</CardTitle>);
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });

  it('renders with correct classes', () => {
    render(<CardTitle data-testid="title">Title</CardTitle>);
    const title = screen.getByTestId('title');
    expect(title).toHaveClass('text-lg');
    expect(title).toHaveClass('font-semibold');
    expect(title).toHaveClass('text-white');
  });
});

describe('CardDescription', () => {
  it('renders with muted text', () => {
    render(<CardDescription data-testid="desc">Description</CardDescription>);
    expect(screen.getByTestId('desc')).toHaveClass('text-muted-foreground');
  });
});

describe('CardContent', () => {
  it('renders with padding', () => {
    render(<CardContent data-testid="content" />);
    expect(screen.getByTestId('content')).toHaveClass('p-5');
  });
});

describe('CardFooter', () => {
  it('renders with flex layout', () => {
    render(<CardFooter data-testid="footer" />);
    const footer = screen.getByTestId('footer');
    expect(footer).toHaveClass('flex');
    expect(footer).toHaveClass('items-center');
    expect(footer).toHaveClass('p-5');
    expect(footer).toHaveClass('pt-0');
  });
});

describe('Card composition', () => {
  it('renders a complete card', () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent>Card content</CardContent>
        <CardFooter>Card footer</CardFooter>
      </Card>
    );

    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card description')).toBeInTheDocument();
    expect(screen.getByText('Card content')).toBeInTheDocument();
    expect(screen.getByText('Card footer')).toBeInTheDocument();
  });
});
```

#### `src/components/card/card.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '../icon';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

// Basic card
export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-white/70">
          This is the card content. It can contain any content you want.
        </p>
      </CardContent>
    </Card>
  ),
};

// With footer
export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {['Meeting at 2pm', 'New comment on your post', 'System update available'].map(
            (item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm"
              >
                <Icon name="bell" size="sm" className="text-primary" />
                {item}
              </div>
            )
          )}
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <button
          type="button"
          className="text-sm text-muted-foreground transition-colors hover:text-white"
        >
          Mark all as read
        </button>
        <button type="button" className="text-sm text-primary transition-colors hover:text-primary/80">
          View all
        </button>
      </CardFooter>
    </Card>
  ),
};

// Interactive card
export const Interactive: Story = {
  render: () => (
    <Card className="w-[350px] cursor-pointer transition-transform hover:scale-[1.02]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Project Alpha</CardTitle>
          <Icon name="arrow-right" size="sm" className="text-muted-foreground" />
        </div>
        <CardDescription>Last updated 2 hours ago</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-primary/20 text-xs font-medium"
              >
                {i}
              </div>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">3 members</span>
        </div>
      </CardContent>
    </Card>
  ),
};

// Stats card
export const Stats: Story = {
  render: () => (
    <div className="flex gap-4">
      {[
        { label: 'Total Users', value: '2,543', icon: 'users' as const, trend: '+12%' },
        { label: 'Revenue', value: '$45.2k', icon: 'star' as const, trend: '+8%' },
        { label: 'Active Now', value: '573', icon: 'eye' as const, trend: '-2%' },
      ].map((stat) => (
        <Card key={stat.label} className="w-[200px]">
          <CardContent className="pt-5">
            <div className="flex items-center justify-between">
              <Icon name={stat.icon} size="md" className="text-primary" />
              <span
                className={`text-xs ${stat.trend.startsWith('+') ? 'text-success' : 'text-destructive'}`}
              >
                {stat.trend}
              </span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};

// Minimal card
export const Minimal: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardContent className="pt-5">
        <p className="text-white/80">A simple card with just content, no header or footer.</p>
      </CardContent>
    </Card>
  ),
};
```

#### `src/components/card/index.ts`

```typescript
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
```

---

## Step 12: Alert Component

#### `src/components/alert/alert.tsx`

```typescript
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';

import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const alertVariants = cva(
  'relative w-full rounded-2xl border p-4 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-8',
  {
    variants: {
      variant: {
        default: 'border-white/10 bg-white/5 text-foreground',
        destructive:
          'border-destructive/50 bg-destructive/10 text-destructive [&>svg]:text-destructive',
        success: 'border-success/30 bg-success/10 text-foreground [&>svg]:text-success',
        warning: 'border-warning/30 bg-warning/10 text-foreground [&>svg]:text-warning',
        info: 'border-info/30 bg-info/10 text-foreground [&>svg]:text-info',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Alert
type AlertProps = ComponentPropsWithoutRef<'div'> & VariantProps<typeof alertVariants>;

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
);
Alert.displayName = 'Alert';

// AlertTitle
type AlertTitleProps = ComponentPropsWithoutRef<'h5'>;

export const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('mb-1 font-semibold leading-none tracking-tight text-white', className)}
      {...props}
    />
  )
);
AlertTitle.displayName = 'AlertTitle';

// AlertDescription
type AlertDescriptionProps = ComponentPropsWithoutRef<'div'>;

export const AlertDescription = forwardRef<HTMLDivElement, AlertDescriptionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-sm text-white/70 [&_p]:leading-relaxed', className)}
      {...props}
    />
  )
);
AlertDescription.displayName = 'AlertDescription';

export { alertVariants };
```

#### `src/components/alert/alert.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Alert, AlertDescription, AlertTitle } from './alert';

describe('Alert', () => {
  it('renders without crashing', () => {
    render(<Alert data-testid="alert">Content</Alert>);
    expect(screen.getByTestId('alert')).toBeInTheDocument();
  });

  it('has role="alert"', () => {
    render(<Alert>Content</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Alert>Alert content</Alert>);
    expect(screen.getByText('Alert content')).toBeInTheDocument();
  });

  it('applies default variant classes', () => {
    render(<Alert data-testid="alert" />);
    const alert = screen.getByTestId('alert');
    expect(alert).toHaveClass('rounded-2xl');
    expect(alert).toHaveClass('border');
    expect(alert).toHaveClass('bg-white/5');
  });

  describe('variants', () => {
    it('renders destructive variant', () => {
      render(<Alert data-testid="alert" variant="destructive" />);
      const alert = screen.getByTestId('alert');
      expect(alert).toHaveClass('border-destructive/50');
      expect(alert).toHaveClass('bg-destructive/10');
    });

    it('renders success variant', () => {
      render(<Alert data-testid="alert" variant="success" />);
      const alert = screen.getByTestId('alert');
      expect(alert).toHaveClass('border-success/30');
      expect(alert).toHaveClass('bg-success/10');
    });

    it('renders warning variant', () => {
      render(<Alert data-testid="alert" variant="warning" />);
      const alert = screen.getByTestId('alert');
      expect(alert).toHaveClass('border-warning/30');
      expect(alert).toHaveClass('bg-warning/10');
    });

    it('renders info variant', () => {
      render(<Alert data-testid="alert" variant="info" />);
      const alert = screen.getByTestId('alert');
      expect(alert).toHaveClass('border-info/30');
      expect(alert).toHaveClass('bg-info/10');
    });
  });

  it('merges custom className', () => {
    render(<Alert data-testid="alert" className="custom-class" />);
    const alert = screen.getByTestId('alert');
    expect(alert).toHaveClass('custom-class');
    expect(alert).toHaveClass('rounded-2xl');
  });

  it('forwards ref', () => {
    let alertRef: HTMLDivElement | null = null;
    render(
      <Alert
        ref={(ref) => {
          alertRef = ref;
        }}
      />
    );
    expect(alertRef).toBeInstanceOf(HTMLDivElement);
  });
});

describe('AlertTitle', () => {
  it('renders as h5 element', () => {
    render(<AlertTitle>Title</AlertTitle>);
    const title = screen.getByText('Title');
    expect(title.tagName).toBe('H5');
  });

  it('renders with correct classes', () => {
    render(<AlertTitle data-testid="title">Title</AlertTitle>);
    const title = screen.getByTestId('title');
    expect(title).toHaveClass('font-semibold');
    expect(title).toHaveClass('text-white');
  });

  it('forwards ref', () => {
    let titleRef: HTMLHeadingElement | null = null;
    render(
      <AlertTitle
        ref={(ref) => {
          titleRef = ref;
        }}
      >
        Title
      </AlertTitle>
    );
    expect(titleRef).toBeInstanceOf(HTMLHeadingElement);
  });
});

describe('AlertDescription', () => {
  it('renders with muted text', () => {
    render(<AlertDescription data-testid="desc">Description</AlertDescription>);
    expect(screen.getByTestId('desc')).toHaveClass('text-white/70');
  });

  it('forwards ref', () => {
    let descRef: HTMLDivElement | null = null;
    render(
      <AlertDescription
        ref={(ref) => {
          descRef = ref;
        }}
      >
        Desc
      </AlertDescription>
    );
    expect(descRef).toBeInstanceOf(HTMLDivElement);
  });
});

describe('Alert composition', () => {
  it('renders a complete alert with icon', () => {
    render(
      <Alert data-testid="alert" variant="success">
        <svg data-testid="icon" />
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>Your changes have been saved.</AlertDescription>
      </Alert>
    );

    expect(screen.getByTestId('alert')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText('Your changes have been saved.')).toBeInTheDocument();
  });
});
```

#### `src/components/alert/alert.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '../icon';

import { Alert, AlertDescription, AlertTitle } from './alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'success', 'warning', 'info'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

// Default
export const Default: Story = {
  render: () => (
    <Alert className="max-w-md">
      <Icon name="info" size="sm" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
    </Alert>
  ),
};

// All variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Alert className="max-w-md">
        <Icon name="info" size="sm" />
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>This is a default alert message.</AlertDescription>
      </Alert>

      <Alert variant="success" className="max-w-md">
        <Icon name="check-circle" size="sm" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your changes have been saved successfully.</AlertDescription>
      </Alert>

      <Alert variant="warning" className="max-w-md">
        <Icon name="alert-triangle" size="sm" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>This action cannot be undone.</AlertDescription>
      </Alert>

      <Alert variant="destructive" className="max-w-md">
        <Icon name="x-circle" size="sm" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong. Please try again.</AlertDescription>
      </Alert>

      <Alert variant="info" className="max-w-md">
        <Icon name="info" size="sm" />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>A new software update is available.</AlertDescription>
      </Alert>
    </div>
  ),
};

// Without icon
export const WithoutIcon: Story = {
  render: () => (
    <Alert variant="info" className="max-w-md">
      <AlertTitle>Pro tip</AlertTitle>
      <AlertDescription>
        You can use the CLI to add components directly to your project.
      </AlertDescription>
    </Alert>
  ),
};

// Description only
export const DescriptionOnly: Story = {
  render: () => (
    <Alert variant="warning" className="max-w-md">
      <Icon name="alert-triangle" size="sm" />
      <AlertDescription>
        Your session will expire in 5 minutes. Save your work to avoid losing changes.
      </AlertDescription>
    </Alert>
  ),
};

// With action
export const WithAction: Story = {
  render: () => (
    <Alert variant="info" className="max-w-md">
      <Icon name="bell" size="sm" />
      <AlertTitle>New update available</AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
        <span>Version 2.0.0 is now available with new features.</span>
        <button
          type="button"
          className="inline-flex w-fit items-center gap-1 text-info underline underline-offset-2"
        >
          Update now <Icon name="arrow-right" size="xs" />
        </button>
      </AlertDescription>
    </Alert>
  ),
};
```

#### `src/components/alert/index.ts`

```typescript
export { Alert, AlertDescription, AlertTitle, alertVariants } from './alert';
```

---

## Step 13: Tokens Documentation Story

#### `src/stories/tokens.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Tokens/Overview',
};

export default meta;
type Story = StoryObj;

const ColorSwatch = ({ name, variable }: { name: string; variable: string }) => (
  <div className="flex flex-col gap-2">
    <div
      className="h-16 w-full rounded-lg border border-white/10"
      style={{ backgroundColor: `hsl(var(${variable}))` }}
    />
    <div className="space-y-0.5">
      <p className="text-sm font-medium text-white">{name}</p>
      <p className="font-mono text-xs text-muted-foreground">{variable}</p>
    </div>
  </div>
);

export const Colors: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">Core Colors</h2>
        <div className="grid grid-cols-4 gap-4">
          <ColorSwatch name="Background" variable="--background" />
          <ColorSwatch name="Foreground" variable="--foreground" />
          <ColorSwatch name="Card" variable="--card" />
          <ColorSwatch name="Border" variable="--border" />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">Brand Colors</h2>
        <div className="grid grid-cols-4 gap-4">
          <ColorSwatch name="Primary" variable="--primary" />
          <ColorSwatch name="Secondary" variable="--secondary" />
          <ColorSwatch name="Accent" variable="--accent" />
          <ColorSwatch name="Muted" variable="--muted" />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">Semantic Colors</h2>
        <div className="grid grid-cols-4 gap-4">
          <ColorSwatch name="Destructive" variable="--destructive" />
          <ColorSwatch name="Success" variable="--success" />
          <ColorSwatch name="Warning" variable="--warning" />
          <ColorSwatch name="Info" variable="--info" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

const SpacingSample = ({ size, value }: { size: string; value: string }) => (
  <div className="flex items-center gap-4">
    <div className="w-16 text-sm text-muted-foreground">{size}</div>
    <div className="h-4 rounded bg-primary" style={{ width: value }} />
    <div className="font-mono text-xs text-muted-foreground">{value}</div>
  </div>
);

export const Spacing: Story = {
  render: () => (
    <div className="space-y-4">
      <h2 className="mb-4 text-lg font-semibold text-white">Spacing Scale</h2>
      <div className="space-y-3">
        <SpacingSample size="0.5" value="2px" />
        <SpacingSample size="1" value="4px" />
        <SpacingSample size="2" value="8px" />
        <SpacingSample size="3" value="12px" />
        <SpacingSample size="4" value="16px" />
        <SpacingSample size="5" value="20px" />
        <SpacingSample size="6" value="24px" />
        <SpacingSample size="8" value="32px" />
        <SpacingSample size="10" value="40px" />
        <SpacingSample size="12" value="48px" />
        <SpacingSample size="16" value="64px" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const BorderRadius: Story = {
  render: () => (
    <div className="space-y-4">
      <h2 className="mb-4 text-lg font-semibold text-white">Border Radius</h2>
      <div className="flex gap-6">
        {[
          { name: 'sm', class: 'rounded-sm' },
          { name: 'md', class: 'rounded-md' },
          { name: 'lg', class: 'rounded-lg' },
          { name: 'xl', class: 'rounded-xl' },
          { name: '2xl', class: 'rounded-2xl' },
          { name: 'full', class: 'rounded-full' },
        ].map((radius) => (
          <div key={radius.name} className="flex flex-col items-center gap-2">
            <div
              className={`h-16 w-16 border border-white/20 bg-primary/20 ${radius.class}`}
            />
            <span className="text-xs text-muted-foreground">{radius.name}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const Typography: Story = {
  render: () => (
    <div className="space-y-6">
      <h2 className="mb-4 text-lg font-semibold text-white">Typography Scale</h2>
      <div className="space-y-4">
        <div className="text-xs text-white">text-xs (12px)</div>
        <div className="text-sm text-white">text-sm (14px)</div>
        <div className="text-base text-white">text-base (16px)</div>
        <div className="text-lg text-white">text-lg (18px)</div>
        <div className="text-xl text-white">text-xl (20px)</div>
        <div className="text-2xl text-white">text-2xl (24px)</div>
        <div className="text-3xl text-white">text-3xl (30px)</div>
        <div className="text-4xl text-white">text-4xl (36px)</div>
      </div>

      <h2 className="mb-4 mt-8 text-lg font-semibold text-white">Font Weights</h2>
      <div className="space-y-2 text-lg">
        <div className="font-normal text-white">font-normal (400)</div>
        <div className="font-medium text-white">font-medium (500)</div>
        <div className="font-semibold text-white">font-semibold (600)</div>
        <div className="font-bold text-white">font-bold (700)</div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const Effects: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">Shadows</h2>
        <div className="flex gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="h-24 w-24 rounded-xl bg-card shadow-soft" />
            <span className="text-xs text-muted-foreground">shadow-soft</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-24 w-24 rounded-xl bg-card shadow-elevated" />
            <span className="text-xs text-muted-foreground">shadow-elevated</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">Glows</h2>
        <div className="flex gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="h-24 w-24 rounded-xl bg-card glow-primary" />
            <span className="text-xs text-muted-foreground">glow-primary</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-24 w-24 rounded-xl bg-card glow-accent" />
            <span className="text-xs text-muted-foreground">glow-accent</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">Glass Effect</h2>
        <div className="flex gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="h-24 w-24 rounded-xl glass-dark" />
            <span className="text-xs text-muted-foreground">glass-dark</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">Gradients</h2>
        <div className="flex gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="h-24 w-24 rounded-xl gradient-card" />
            <span className="text-xs text-muted-foreground">gradient-card</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-24 w-36 rounded-xl gradient-header" />
            <span className="text-xs text-muted-foreground">gradient-header</span>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
```

---

## Step 14: Main Exports

#### `src/components/index.ts`

```typescript
// Icon
export { Icon, ICONS, iconNames, iconSizes } from './icon';
export type { IconName, IconProps, IconSize } from './icon';

// Card
export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card';

// Alert
export { Alert, AlertDescription, AlertTitle, alertVariants } from './alert';
```

#### `src/index.ts`

```typescript
// Components
export * from './components';

// Lib
export { cn, ObjectUtils } from './lib';

// Tokens
export { duckUIPreset } from './tokens';
```

---

## Verification Commands

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Start Storybook
pnpm dev

# Build library
pnpm build

# Type check
pnpm type-check

# Lint
pnpm lint:fix
```

---

## What NOT to Do

1. **Don't add business-specific icons** - Keep the registry generic
2. **Don't add business logic** - Components are pure presentation
3. **Don't use `any`** - Use proper types
4. **Don't use `as` casting** - Use type guards or generics
5. **Don't add too many components** - Start minimal, add as needed
6. **Don't over-engineer** - No complex abstractions for 3 apps

---

## Consumer Usage (After Build)

### Installation

```bash
# Add as git dependency
pnpm add duck-ui@git+https://github.com/YOUR_USERNAME/duck-ui.git
```

### Setup

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import { duckUIPreset } from 'duck-ui/tailwind.preset';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './node_modules/duck-ui/dist/**/*.js',
  ],
  presets: [duckUIPreset],
};

export default config;
```

```css
/* globals.css */
@import 'duck-ui/tokens/globals.css';

/* Optional: Override tokens */
:root {
  --primary: 200 80% 50%; /* Custom primary color */
}
```

```typescript
// Usage in components
import { Card, CardContent, Icon, Alert } from 'duck-ui';

export const MyComponent = () => (
  <Card>
    <CardContent>
      <Icon name="check" size="md" className="text-primary" />
      <Alert variant="success">
        <Icon name="check-circle" size="sm" />
        Success!
      </Alert>
    </CardContent>
  </Card>
);
```

---

## History

- [ ] Phase 1: Repository setup (Steps 1-7)
- [ ] Phase 2: Core implementation (Steps 8-13)
- [ ] Phase 3: Build & export (Steps 14-16)
