# CLAUDE.md — Directives

## Purpose
Shared Angular attribute directives. Located at `src/app/directives/`.

---

## RevealDirective

**Selector:** `[appReveal]`

**Purpose:** Adds the CSS class `is-visible` to the host element when it enters the viewport, triggering a fade-up entrance animation defined in the consuming component's SCSS.

**Behavior:**
- Uses `IntersectionObserver` with threshold 0.12
- Stops observing the element once visible (animation plays once)
- When `MotionService.reducedMotion()` is `true`, adds `is-visible` immediately on init — no scroll delay needed

**Usage:**
```html
<div appReveal>content</div>
```

**Base styles (global):**
The fade-up base rule lives once in `src/styles.scss`, so consuming components do **not**
redeclare it:
```scss
[appReveal] {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity $duration-reveal $easing-out-expo,
    transform $duration-reveal $easing-out-expo;

  &.is-visible {
    opacity: 1;
    transform: none;
  }
}
```
Components only add per-element nuances such as a stagger delay, e.g.
`.section-heading[appReveal] { transition-delay: 150ms; }`.

**Dependencies:**
- `MotionService` — reads `reducedMotion` signal
- `afterNextRender` — safely initializes `IntersectionObserver` after DOM is ready

**Spec file:** `reveal.directive.spec.ts`
