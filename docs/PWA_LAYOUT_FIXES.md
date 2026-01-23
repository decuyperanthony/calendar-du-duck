# PWA Layout Fixes - Tracking

## Problem
- Espace en bas à l'ouverture de l'app PWA iOS
- Au scroll, l'app redescend et perd du padding
- Layout cassé uniquement en PWA, pas en browser

## Reference Projects (Working)
- `clear` - PWA fonctionne correctement
- `bank-account-du-duck` - PWA fonctionne correctement

---

## PR #17 - Safe area padding fallback for Android Chrome PWA
- **Status:** Merged
- **Changes:** Added fallback for Android Chrome PWA safe area

## PR #18 - PWA layout spacing
- **Status:** Merged
- **Changes:** Add top margin for mobile header and fix background coverage

## PR #19 - PWA iOS bottom bar
- **Status:** Merged
- **Changes:** Extend body height past safe area

## PR #20 - Clean up PWA layout hacks
- **Status:** Merged
- **Changes:** Clean up previous PWA hacks

## PR #21 (current) - Simplify layout structure

### Root Cause Analysis (comparing with `clear` project)

| Issue | calendar-du-duck (broken) | clear (working) |
|-------|---------------------------|-----------------|
| Double min-h-dvh | body + wrapper both have `min-h-dvh` | Single level |
| flex-col on wrapper | `min-h-dvh flex flex-col` | Simple structure |
| Safe-area without @supports | `env()` direct | Wrapped in `@supports` |
| Splash without pointer-events | `visibility: hidden` | `pointer-events: none` |
| Missing suppressHydrationWarning | Missing | Present on `<html>` |

### Changes Made

1. **layout.tsx**
   - Added `suppressHydrationWarning` on `<html>`
   - Added `antialiased` on `<body>`
   - Removed `flex flex-col` from gradient-dark wrapper
   - Removed `flex-1` from `<main>`

2. **globals.css**
   - Wrapped safe-area utilities in `@supports` for graceful degradation
   - Added `pointer-events: none` on `#splash-screen.hidden`
   - Cleaned up duplicate CSS rules

### Technical Explanation

The main issue was the nested `min-h-dvh` with `flex flex-col`:

```tsx
// BEFORE (broken)
<body className="min-h-dvh">
  <div className="gradient-dark min-h-dvh flex flex-col">
    <main className="flex-1">  // flex-1 + min-h-dvh parent = chaos on iOS

// AFTER (fixed)
<body className="min-h-dvh antialiased">
  <div className="gradient-dark min-h-dvh">
    <main className="...">  // no flex-1, natural flow
```

On iOS PWA with dynamic viewport height (`dvh`), the combination of:
- Parent with `min-h-dvh flex flex-col`
- Child with `flex-1`

Creates height conflicts when the browser chrome appears/disappears during scroll.

---

## Testing Checklist
- [ ] PWA iOS Safari - no bottom gap on launch
- [ ] PWA iOS Safari - scroll doesn't break layout
- [ ] PWA Android Chrome - same tests
- [ ] Browser Safari - still works
- [ ] Browser Chrome - still works
