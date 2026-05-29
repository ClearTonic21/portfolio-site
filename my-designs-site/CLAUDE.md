# CLAUDE.md — Eli Philpott Portfolio Site

> Read this file completely before writing any component, style, or configuration file.
> This is the single source of truth for the entire project.

---

## 1. Project Overview

A single-page Angular portfolio site for **Eli Philpott** — a UI/UX and software designer who builds polished, well-structured applications and creates indie games under **ClearTonic Games\_**.

**Primary audience:** Hiring managers and recruiters looking for a Software Designer, App Designer, or UI/UX Designer.

**Tone:** Professional, creative, confident. The site itself is the design portfolio — its quality is the argument. Copy is concise and direct; let the work speak.

**Hosted via:** GitHub Pages (`ng build --configuration production` output).
**GitHub account:** `https://github.com/ClearTonic21`
**Base href:** `/portfolio/` (update to match the actual repo name when created)

**Angular version:** Angular 20 (verify installed version with `ng version` before writing any code).

**Tech stack:**

- Angular 20, standalone components, Signals, `inject()` function
- TypeScript — strict mode, all checks on (see Section 10)
- SCSS — global design tokens in `src/styles/`; no CSS-in-JS, no utility frameworks
- No UI component library — all components are handwritten
- No Angular Router — single page, anchor scroll only
- `@angular/animations` for entrance animations only
- Jest for unit testing (not Karma, not Vitest)
- Angular CLI with esbuild builder (`@angular-devkit/build-angular:application`)

---

## 2. Angular 20 Best Practices

Follow the [Angular Style Guide](https://angular.dev/style-guide) strictly.

**Signals for all local state — no component-level BehaviorSubject or Subject:**

```typescript
import { signal, computed, effect } from '@angular/core';

readonly isMenuOpen = signal(false);
readonly menuAriaExpanded = computed(() => this.isMenuOpen().toString());
```

**`inject()` everywhere — no constructor injection:**

```typescript
export class HeroComponent {
  private readonly scrollService = inject(ScrollService);
}
```

**Standalone components — no NgModules anywhere:**

```typescript
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
```

**`@if` / `@for` / `@switch` control flow — never `*ngIf` or `*ngFor`:**

```html
@if (isMenuOpen()) {
<nav class="mobile-navigation">...</nav>
} @for (project of projects; track project.id) {
<app-project-card [project]="project" />
}
```

**Signal-based `input()` and `output()` — never `@Input()` or `@Output()` decorators:**

```typescript
readonly label = input.required<string>();
readonly cardClicked = output<string>();
```

**`toSignal()` for any RxJS streams that must be retained:**

```typescript
private readonly scrollPosition = toSignal(
  fromEvent(window, 'scroll').pipe(map(() => window.scrollY)),
  { initialValue: 0 }
);
```

**`afterNextRender` for any DOM access — never `ngAfterViewInit`:**

```typescript
afterNextRender(() => {
  this.intersectionObserver = new IntersectionObserver(/* ... */);
});
```

**`ChangeDetectionStrategy.OnPush` on every component — no exceptions.**

---

## 3. Repository Structure

```
├── CLAUDE.md
├── angular.json
├── jest.config.ts
├── setup-jest.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── package.json
├── public/                          ← served at build root (no URL prefix)
│   ├── 404.html
│   ├── Eli_Philpott_Resume.pdf
│   └── favicon.ico
└── src/
    ├── main.ts
    ├── index.html
    ├── styles.scss
    ├── styles/
    │   ├── tokens.scss
    │   ├── typography.scss
    │   └── reset.scss
    ├── assets/
    │   ├── images/
    │   │   ├── game_screenshot.png
    │   │   ├── app_screenshot.png
    │   └── icons/
    │       ├── ClearTonic icon.svg
    │       └── ClearTonic Games_ icon.svg
    └── app/
        ├── app.ts
        ├── app.html
        ├── app.scss
        ├── app.spec.ts
        ├── app.config.ts
        ├── components/
        │   ├── hero/
        │   │   ├── CLAUDE.md
        │   │   ├── hero.component.ts
        │   │   ├── hero.component.html
        │   │   ├── hero.component.scss
        │   │   └── hero.component.spec.ts
        │   ├── about/
        │   │   ├── CLAUDE.md
        │   │   ├── about.component.ts
        │   │   ├── about.component.html
        │   │   ├── about.component.scss
        │   │   └── about.component.spec.ts
        │   ├── experience/
        │   │   ├── CLAUDE.md
        │   │   ├── experience.component.ts
        │   │   ├── experience.component.html
        │   │   ├── experience.component.scss
        │   │   └── experience.component.spec.ts
        │   ├── projects/
        │   │   ├── CLAUDE.md
        │   │   ├── projects.component.ts
        │   │   ├── projects.component.html
        │   │   ├── projects.component.scss
        │   │   └── projects.component.spec.ts
        │   └── contact/
        │       ├── CLAUDE.md
        │       ├── contact.component.ts
        │       ├── contact.component.html
        │       ├── contact.component.scss
        │       └── contact.component.spec.ts
        ├── directives/
        │   ├── CLAUDE.md
        │   ├── reveal.directive.ts
        │   └── reveal.directive.spec.ts
        └── services/
            ├── CLAUDE.md
            ├── scroll.service.ts
            ├── scroll.service.spec.ts
            ├── motion.service.ts
            └── motion.service.spec.ts
```

**Structure rules:**

- One component per folder. Folder name = kebab-case of the component selector.
- Business logic in `.ts` files only. Templates are declarative.
- No inline `style="..."` attributes anywhere in templates.
- Every component folder, `directives/`, and `services/` contains a `CLAUDE.md`.
- Static files served at the URL root (PDF, favicon) go in `public/`. Component-consumed assets (images, icons) go in `src/assets/`.

---

## 4. Design System

### 4.1 Color Palette

Component SCSS always references CSS custom properties. Never hardcode hex values inside component files.

```scss
// src/styles/_tokens.scss

$color-background: #1a1a1a;
$color-background-surface: #232323;
$color-background-subtle: #2c2c2c;
$color-text-primary: #f0ede6;
$color-text-secondary: #a89f91;
$color-text-inverted: #1a1a1a;
$color-accent: #38eeb4;
$color-accent-hover: #1abfa0;
$color-accent-glow: rgba(56, 238, 180, 0.15);
$color-border-default: rgba(240, 237, 230, 0.08);
$color-border-accent: rgba(56, 238, 180, 0.3);
$color-error: #ff6b6b;

:root {
  --background: #{$color-background};
  --background-surface: #{$color-background-surface};
  --background-subtle: #{$color-background-subtle};
  --text-primary: #{$color-text-primary};
  --text-secondary: #{$color-text-secondary};
  --text-inverted: #{$color-text-inverted};
  --accent: #{$color-accent};
  --accent-hover: #{$color-accent-hover};
  --accent-glow: #{$color-accent-glow};
  --border-default: #{$color-border-default};
  --border-accent: #{$color-border-accent};
  --error: #{$color-error};
}
```

`#38EEB4` is the only accent color. No light mode. No additional accent hues.

---

### 4.2 Typography

Two fonts only. Visual hierarchy is achieved through weight, size, spacing, and the serif/sans contrast — not through additional typefaces.

```scss
// src/styles/_typography.scss

$font-primary: 'DM Sans', sans-serif; // all headings, labels, UI, tags
$font-body: 'Lora', serif; // body copy only

// Google Fonts — place in index.html <head>, before any stylesheet link:
// <link rel="preconnect" href="https://fonts.googleapis.com">
// <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
// <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,900&family=Lora:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">

.type-display {
  font-family: $font-primary;
  font-size: clamp(4.5rem, 11vw, 9.5rem);
  font-weight: 900;
  line-height: 0.92;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.type-eyebrow {
  font-family: $font-primary;
  font-size: clamp(0.65rem, 1vw, 0.75rem);
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent);
}

.type-heading {
  font-family: $font-primary;
  font-size: clamp(1.2rem, 2.2vw, 1.6rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.01em;
}

.type-body {
  font-family: $font-body;
  font-size: clamp(0.95rem, 1.1vw, 1.05rem);
  font-weight: 400;
  line-height: 1.78;
  color: var(--text-primary);
}

.type-caption {
  font-family: $font-primary;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
}
```

**Typography rules:**

- The trailing `_` in **ClearTonic Games\_** is a brand element. Always render it as `<span class="brand-underscore">_</span>` styled `color: var(--accent)`.
- Section eyebrow labels use a suffix underscore: `Section Name<span class="brand-underscore">_</span>` — no forward-slash prefix.
- Never use font-weight below 500 for headings or labels.
- Never use Arial, Inter, Roboto, or system-ui.

---

### 4.3 Spacing

8px base grid. Every margin, padding, and gap value is a multiple of 8px.

```scss
// src/styles/_tokens.scss (continued)

$spacing-unit: 8px;
$spacing-2: 16px;
$spacing-3: 24px;
$spacing-4: 32px;
$spacing-6: 48px;
$spacing-8: 64px;
$spacing-12: 96px;
$spacing-16: 128px;

$section-vertical-padding: clamp(#{$spacing-12}, 12vw, #{$spacing-16});
$content-max-width: 1200px;
$content-horizontal-gutter: clamp(#{$spacing-3}, 5vw, #{$spacing-8});
```

---

### 4.4 Surfaces and Border Radius

```scss
$border-radius-small: 4px;
$border-radius-medium: 8px;
$border-radius-large: 16px;
$border-radius-pill: 999px;

.surface {
  background: var(--background-surface);
  border: 1px solid var(--border-default);
  border-radius: $border-radius-large;
}

.surface--accent-highlight {
  border-color: var(--border-accent);
  box-shadow: 0 0 24px var(--accent-glow);
}
```

---

### 4.5 Layout

**Flexbox for everything.** Use `display: flex` for all layout — rows, columns, grids, alignment. Do not use CSS Grid.

```scss
// Section inner container pattern
.section-inner {
  display: flex;
  flex-direction: column;
  padding: $section-vertical-padding $content-horizontal-gutter;
  max-width: $content-max-width;
  margin: 0 auto;
  width: 100%;
}

// Two-column layout (about, experience)
.two-column-layout {
  display: flex;
  flex-direction: column; // mobile: stacked
  gap: $spacing-6;

  @media (min-width: 768px) {
    flex-direction: row; // desktop: side by side
  }
}

// Project card row
.card-row {
  display: flex;
  flex-direction: column;
  gap: $spacing-4;

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
}
```

---

### 4.6 Motion

Motion is minimal. A "Reduce motion" button is visible in the bottom-left corner before the user scrolls.

```scss
// src/styles/_tokens.scss (continued)

$easing-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
$easing-standard: cubic-bezier(0.4, 0, 0.2, 1);

$duration-fast: 150ms;
$duration-base: 300ms;
$duration-slow: 600ms;
$duration-reveal: 700ms;
```

**Permitted animations:**

1. Scroll reveal — `opacity` + `translateY(20px)` via `RevealDirective`
2. Nav underline — `scaleX()` on hover
3. Project card hover — `translateY(-3px)` + border brightens
4. Mobile menu — `opacity` + `translateY`

**Reduced motion — applied globally:**

```scss
@media (prefers-reduced-motion: reduce), [data-reduced-motion="true"] * {
  animation-duration: 0.01ms !important;
  transition-duration: 0.01ms !important;
}
```

Never use `transition: all`. Always specify the property name.

---

## 5. Writing SCSS

**Mobile-first.** Base styles target small screens. Use `@media (min-width: breakpoint)` to scale up.

```scss
// Breakpoints
$breakpoint-medium: 768px; // tablet and up
$breakpoint-large: 1024px; // desktop and up
$breakpoint-xlarge: 1280px; // wide desktop

// Usage pattern — always mobile-first
.component-element {
  font-size: 1rem; // mobile base

  @media (min-width: $breakpoint-medium) {
    font-size: 1.25rem; // tablet and up
  }
}
```

**SCSS nesting:** Maximum three levels deep.

**Component SCSS:** Always scope to `:host`. No global selectors inside component files.

```scss
:host {
  display: block;
  width: 100%;
}
```

---

## 6. Page Sections

Single scrolling page. All navigation is anchor scroll within the page. No Angular Router. No page reloads.

Section order: `#hero` → `#about` → `#experience` → `#projects` → `#contact`

### Navigation (AppComponent)

- Fixed top bar, `backdrop-filter: blur(12px)`, semi-transparent `var(--background)`
- Left: **EP** monogram, DM Sans weight 900, `var(--accent)`. Clicking scrolls to `#hero`.
- Right: anchor links — `/ About`, `/ Experience`, `/ Projects`, `/ Contact`
- All nav links call `ScrollService.scrollToSection(sectionId)` — no `href` navigation
- Active section tracked by `IntersectionObserver`; active link shows accent underline
- Mobile (below 768px): hamburger button → full-screen overlay menu
- Nav bar hides on scroll down past 100px; reappears on scroll up

### `#hero`

```
/ Intro · Worthington, OH

ELI
PHILPOTT

UI/UX & Software Designer

[View My Work]    [Resume ↗]
```

- "View My Work" calls `ScrollService.scrollToSection('about')`
- "Resume ↗" opens `Eli_Philpott_Resume.pdf` in a new tab — served from `public/` at the build root
- Pixel-noise SVG texture overlay at 5% opacity on section background
- ClearTonic Games\_ floating badge in bottom-right corner

### `#about`

Two-column layout — flex row on desktop (768px+), column on mobile.

- Left (flex: 0 0 60%): Lora body copy. Voice: entrepreneurial, creative and technical, clear communicator. Subtle one-sentence mention that Eli directs AI tooling closely — ensuring best practices are followed and output matches intent accurately. Lorem ipsum acceptable for placeholder copy.
- Right (flex: 0 0 40%): skill tag groups. Category label in `.type-eyebrow`, tags as `.tag` pills.
  - Design: Figma, UI/UX Patterns, Accessibility, Responsive Design
  - Frontend: Angular, TypeScript, SCSS, RxJS
  - Backend: Node.js, RESTful APIs, SQL
  - Platforms: ServiceNow, Azure, GitHub Pages
  - Game Dev: Pixel Art, Game Design, ClearTonic Games\_

### `#experience`

Vertical timeline. 1px `var(--border-accent)` line. Cards alternate left/right on desktop (768px+), stack on mobile.

Entries, newest first:

1. **ServiceNow Application Developer — Capital One**: custom JS + AngularJS components, REST API integrations, ITSM/HR modules, Agile team, mentored junior engineers
2. **ServiceNow Application Developer — Discover Financial**: enterprise ITSM application development
3. **Full-Stack Software Engineer — Experlogix Inc.**: TypeScript + Angular SaaS, CRM integrations, UI redesigns and accessibility improvements, API and database layer changes, collaborated with Design and Product teams

### `#projects`

Flex row, wrapping, gap `$spacing-4`. Each card `flex: 1 1 calc(50% - $spacing-4)` on desktop, `flex: 1 1 100%` on mobile.

Cards: image area, eyebrow tag, `.type-heading` title, `.tag` pills, `.type-body` description, CTA link.

Projects:

1. **ClearTonic Games\_ — [Game Name]** — `assets/images/game-screenshot.png` — GitHub: `https://github.com/ClearTonic21` (link to repo, no live demo)
2. **Canopy Trails** — `assets/images/app-screenshot.png` — GitHub: `https://github.com/ClearTonic21` (link to repo)
3. **This Portfolio Site** — AI-directed design and development case study — GitHub: `https://github.com/ClearTonic21`

All project CTAs link to the GitHub profile or specific repos. No other external navigation.

### `#contact`

Centered, flex column, `align-items: center`.

- Short headline: "Let's build something."
- Three large link items: Email, LinkedIn, GitHub — each with accent underline on hover
- "View Resume" `.button-primary` — opens `Eli_Philpott_Resume.pdf` in new tab (served from `public/`)
- Footer: `© 2026 Eli Philpott · ClearTonic Games_`

LinkedIn and GitHub links open in new tabs with `rel="noopener noreferrer"`. These and the resume PDF are the only `target="_blank"` uses in the site.

---

## 7. Component Patterns

### Buttons

```scss
.button-primary {
  display: inline-flex;
  align-items: center;
  gap: $spacing-unit;
  font-family: $font-primary;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 12px 28px;
  border-radius: $border-radius-pill;
  border: 2px solid var(--accent);
  background: var(--accent);
  color: var(--text-inverted);
  cursor: pointer;
  transition:
    background $duration-base $easing-out-expo,
    color $duration-base $easing-out-expo;

  &:hover {
    background: transparent;
    color: var(--accent);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }
}

.button-ghost {
  background: transparent;
  color: var(--accent);

  &:hover {
    background: var(--accent-glow);
  }
}
```

### Tag / Pill

```scss
.tag {
  font-family: $font-primary;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  padding: 4px 12px;
  border-radius: $border-radius-pill;
  background: var(--background-subtle);
  color: var(--text-secondary);
  border: 1px solid var(--border-default);
}
```

### Section Wrapper (every section)

```scss
:host {
  display: block;
  width: 100%;
}

.section-inner {
  display: flex;
  flex-direction: column;
  padding: $section-vertical-padding $content-horizontal-gutter;
  max-width: $content-max-width;
  margin: 0 auto;
  width: 100%;
}
```

---

## 8. Icons with Lucide

**Icon library:** Lucide Angular (`@lucide/angular`)

All icons in the portfolio use Lucide for consistency. Never use custom SVGs or icon fonts unless Lucide does not provide the needed icon.

**Import and usage:**

```typescript
import { LucideAngularModule, Icon } from '@lucide/angular';

// In component standalone imports:
imports: [LucideAngularModule, CommonModule],

// In template:
<lucide-icon name="github" size="24" stroke-width="2"></lucide-icon>
```

**Icon sizing:** Use standard sizes (`16`, `20`, `24`, `32`). Control icon color via component CSS or inline styles aligned with the design system palette.

**Accessibility:** Always pair icon-only buttons with `aria-label`:

```html
<button aria-label="Open menu">
  <lucide-icon name="menu" size="24"></lucide-icon>
</button>
```

**Allowed icon names:** GitHub, LinkedIn, Mail, ExternalLink, ChevronDown, Menu, X (close), ArrowUpRight, and others as needed. Check [lucide.dev](https://lucide.dev) for the full icon set.

---

## 9. Services

### ScrollService (`src/app/services/scroll.service.ts`)

Single point of control for in-page navigation. Every nav link and CTA calls this service.

```typescript
scrollToSection(sectionId: string): void {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
```

### MotionService (`src/app/services/motion.service.ts`)

Single source of truth for reduced-motion preference.

```typescript
readonly reducedMotion = signal(false);

// Initialization reads localStorage key 'portfolio-reduced-motion'
// and window.matchMedia('(prefers-reduced-motion: reduce)').matches
// Either true → reducedMotion set to true

// effect() writes document.body.dataset['reducedMotion']
// and persists value to localStorage on every change

toggleReducedMotion(): void {
  this.reducedMotion.update(current => !current);
}
```

### RevealDirective (`src/app/directives/reveal.directive.ts`)

Adds `is-visible` class to host element when it enters viewport.

- Uses `IntersectionObserver`, threshold 0.12
- Unobserves after first trigger (plays once)
- When `MotionService.reducedMotion()` is true, adds `is-visible` immediately on init

Consuming component SCSS:

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

---

## 10. Reduced-Motion Toggle Button

Fixed bottom-left. Visible only when `scrollY < window.innerHeight * 0.8`. Hides via `opacity: 0; pointer-events: none` after that threshold (not `display: none`).

```html
<button
  class="motion-toggle-button"
  [class.is-hidden]="isMotionButtonHidden()"
  [attr.aria-pressed]="motionService.reducedMotion()"
  (click)="motionService.toggleReducedMotion()"
>
  @if (motionService.reducedMotion()) { Enable motion } @else { Reduce motion }
</button>
```

```scss
.motion-toggle-button {
  position: fixed;
  bottom: 24px;
  left: 24px;
  z-index: 100;
  display: inline-flex;
  align-items: center;
  font-family: $font-primary;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 8px 16px;
  border-radius: $border-radius-pill;
  border: 1px solid var(--border-default);
  background: var(--background-surface);
  color: var(--text-secondary);
  cursor: pointer;
  transition: opacity $duration-base $easing-standard;

  &.is-hidden {
    opacity: 0;
    pointer-events: none;
  }
}
```

---

## 11. TypeScript Configuration

`tsconfig.json` must include:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

No `any`. No `!` non-null assertions. If a value may be null, handle it explicitly with `??`, optional chaining, or a type guard.

---

## 12. Testing with Jest

Jest replaces Karma. Do not install or configure Karma.

**`jest.config.ts` root config:**

```typescript
export default {
  preset: 'jest-preset-angular',
  setupFilesAfterFramework: ['<rootDir>/setup-jest.ts'],
  testMatch: ['src/.*\\.spec\\.ts$'],
  collectCoverageFrom: ['src/app/**/*.ts', '!src/app/**/*.spec.ts'],
};
```

**Component spec skeleton:**

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

**Service spec skeleton:**

```typescript
import { TestBed } from '@angular/core/testing';
import { MotionService } from './motion.service';

describe('MotionService', () => {
  let service: MotionService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [MotionService] });
    service = TestBed.inject(MotionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
```

**Directive spec skeleton:**

```typescript
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RevealDirective } from './reveal.directive';

@Component({
  standalone: true,
  imports: [RevealDirective],
  template: `<div appReveal>content</div>`,
})
class TestHostComponent {}

describe('RevealDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should attach to host element', () => {
    expect(fixture.nativeElement.querySelector('[appReveal]')).toBeTruthy();
  });
});
```

---

## 13. GitHub Pages Deployment

1. `ng add angular-cli-ghpages`
2. In `angular.json` production configuration: `"baseHref": "/portfolio/"` (update to match actual repo name)
3. Deploy: `ng deploy --base-href=/portfolio/`
4. Add `src/404.html` with the standard GitHub Pages SPA redirect for direct URL handling
5. Never commit `dist/` to `main`. The `gh-pages` branch is managed entirely by the deploy tool.

---

## 14. Accessibility

- All images have descriptive `alt`. Decorative images use `alt=""`.
- `#38EEB4` on `#1A1A1A` — contrast ~9.5:1 ✓ (WCAG AA)
- `#F0EDE6` on `#1A1A1A` — contrast ~14:1 ✓ (WCAG AAA)
- Focus: `outline: 2px solid var(--accent); outline-offset: 3px` on all interactive elements. Never remove outlines.
- Keyboard navigable navigation. Escape key closes mobile menu.
- `aria-label` on all icon-only interactive elements.
- Semantic landmarks: `<nav>`, `<main>`, `<section aria-labelledby="...">`, `<footer>`.
- The motion toggle button uses `aria-pressed` to communicate its current state.

---

## 15. Code Comment Policy

Comments explain _why_ something is done — never _what_ the code does. Aim for fewer than one comment per ten lines. If code requires a comment to be understood, first try to make the code itself clearer.

---

## 16. What Claude Code Must Not Do

- Add any accent color other than `#38EEB4`
- Use Angular Material, PrimeNG, or any UI component library
- Use Angular Router, `RouterModule`, `RouterLink`, or `RouterOutlet`
- Use `*ngIf`, `*ngFor`, or `*ngSwitch` — use `@if`, `@for`, `@switch`
- Use constructor injection or `@Input()` / `@Output()` decorators
- Use `any` in TypeScript or `!` non-null assertions
- Write inline styles (`style="..."`)
- Hardcode hex color values in component SCSS files
- Use `target="_blank"` on any link you don't have yet: the resume PDF and the contact section's LinkedIn and GitHub links are available
- Use CSS Grid — use Flexbox
- Write desktop-first media queries — always mobile-first (`min-width`)
- Add sections not listed in Section 6 without being asked
- Abbreviate variable, property, or class names
- Nest SCSS more than three levels deep
- Install or configure Karma — Jest is the test runner

---

## 17. Quick Reference

| Item               | Value                                       |
| ------------------ | ------------------------------------------- |
| Background         | `#1A1A1A` / `var(--background)`             |
| Surface            | `#232323` / `var(--background-surface)`     |
| Text primary       | `#F0EDE6` / `var(--text-primary)`           |
| Text secondary     | `#A89F91` / `var(--text-secondary)`         |
| Accent             | `#38EEB4` / `var(--accent)`                 |
| Primary font       | `DM Sans`                                   |
| Body font          | `Lora`                                      |
| Base spacing unit  | `8px`                                       |
| Content max width  | `1200px`                                    |
| Card border radius | `16px`                                      |
| Accent glow        | `rgba(56, 238, 180, 0.15)`                  |
| Mobile breakpoint  | `768px`                                     |
| Layout approach    | Flexbox only                                |
| Style direction    | Mobile-first                                |
| Test runner        | Jest                                        |
| TypeScript         | strict — all checks on                      |
| GitHub             | `https://github.com/ClearTonic21`           |
| LinkedIn           | `https://www.linkedin.com/in/eli-philpott/` |
| email              | `eli.philpott@gmail.com`                    |

---

_Last updated: May 27 2026. All changes to this file require deliberate review — it governs the entire codebase._
