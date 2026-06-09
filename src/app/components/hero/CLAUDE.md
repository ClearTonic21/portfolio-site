# CLAUDE.md — HeroComponent

## Purpose
The first section the user sees. Full viewport height. Establishes Eli's name, role, and brand identity, with a single resume call to action.

## Location
`src/app/components/hero/`

## Selector
`app-hero`

## Responsibilities
- Render Eli's name in `.type-display` (massive, uppercase, DM Sans 900) with the brand underscore accent: `PHILPOTT_`
- Subtitle: "Software Designer & Developer" using `.type-heading`
- "Grab my Resume" CTA via `app-action-call` (`arrowIcon`) — opens `Eli_Philpott_Resume.pdf` in a new tab (served from `public/` via angular.json)
- 5% opacity pixel-noise SVG texture overlay on the background (`.hero-overlay`)

## Dependencies
- `MotionService` — disables the staggered entrance animation when reduced motion is active
- `ActionCallComponent` — the resume CTA
- `LucideArrowUpRight` — arrow icon inside the CTA

## Animation
Name lines fade up with stagger on load via `@angular/animations`. Respects `MotionService.reducedMotion`.

## Icons
The resume CTA shows a Lucide `ArrowUpRight` icon, supplied by `ActionCallComponent` via its `arrowIcon` input.

## Does Not
- Contain navigation logic
- Render nav links
- Open any internal page
