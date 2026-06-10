# CLAUDE.md — Services

## Purpose
Root-level Angular services providing functionality shared across the app. All use `providedIn: 'root'`. Located at `src/app/services/`.

---

## ScrollService (`scroll.service.ts`)

**Purpose:** Single point of control for smooth anchor scrolling. Every nav link and in-page CTA calls this service. No component touches `scrollIntoView` directly.

**Public API:**
```typescript
scrollToSection(sectionId: string): void
```
Calls `document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })`.

**Used by:**
- `NavigationBarComponent` — nav link clicks and the monogram (scrolls to `hero`)

**Spec file:** `scroll.service.spec.ts`

---

## MotionService (`motion.service.ts`)

**Purpose:** Single source of truth for the reduced-motion preference. All animation gating reads from this service.

**Public API:**
```typescript
readonly reducedMotion: Signal<boolean>
toggleReducedMotion(): void
```

**Initialization:**
- Reads `localStorage` key `portfolio-reduced-motion`
- Reads OS `prefers-reduced-motion` media query
- Either being true sets the signal to `true` on startup

**Effect:**
- Writes `document.body.dataset['reducedMotion']` on every signal change
- Writes back to `localStorage` on every signal change
- Global SCSS `[data-reduced-motion="true"] * { transition-duration: 0.01ms !important; }` handles visual suppression

**Used by:**
- `AppComponent` — gates the parallax background (`@if (!reducedMotion())`)
- `NavigationBarComponent` — hosts the reduced-motion toggle button
- `HeroComponent` — disables the staggered entrance animation when reduced motion is active
- `RevealDirective` — adds `is-visible` immediately (skips the observer) when reduced motion is active

**Spec file:** `motion.service.spec.ts`
