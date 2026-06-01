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
- `AppComponent` — nav link clicks
- `HeroComponent` — "View My Work" CTA

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
- `AppComponent` — motion toggle button and visibility guard
- `RevealDirective` — skips `IntersectionObserver` delay when reduced motion is active

**Spec file:** `motion.service.spec.ts`
