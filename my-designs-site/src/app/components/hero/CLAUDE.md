# CLAUDE.md — HeroComponent

## Purpose
The first section the user sees. Full viewport height. Establishes Eli's name, role, and brand identity. Contains the two primary calls to action.

## Location
`src/app/components/hero/`

## Selector
`app-hero`

## Responsibilities
- Render Eli's name in `.type-display` (massive, uppercase, DM Sans 900)
- Eyebrow label: `/ Intro · Worthington, OH` using `.type-eyebrow`
- Subtitle: "Software Developer & Indie Game Creator" using `.type-body`
- "View My Work" CTA (`.button-primary`) — calls `ScrollService.scrollToSection('about')`
- "Resume" CTA (`.button-ghost`) — opens `Eli_Philpott_Resume.pdf` in a new tab (served from `public/` via angular.json)
- ClearTonic Games_ floating badge (icon + brand name) bottom-right corner
- 5% opacity pixel-noise SVG texture overlay on the background

## Dependencies
- `ScrollService` — for CTA scroll handler
- `MotionService` — to guard stagger animation

## Animation
Name lines fade up with stagger on load via `@angular/animations`. Respects `MotionService.reducedMotion`.

## Icons
The "Resume" CTA button may display an external link icon using Lucide: `<lucide-icon name="external-link" size="16"></lucide-icon>` inside or next to the button text. Use `@lucide/angular` for consistency.

## Does Not
- Contain navigation logic
- Render nav links
- Open any internal page
