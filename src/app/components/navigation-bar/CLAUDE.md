# CLAUDE.md — NavigationBarComponent

## Purpose
The site's primary navigation. Renders as a fixed top bar on mobile and as a fixed left-side
sidebar on desktop (`$breakpoint-medium`, 960px+). Contains the ClearTonic monogram (tapping it
scrolls to `hero`) and anchor-scroll nav links. A separate `.nav-controls` cluster of
`app-icon-button` appearance toggles (light-dark mode, high contrast, reduced motion) floats
alongside the bar (see Appearance toggles).

## Location
`src/app/components/navigation-bar/`

## Selector
`app-navigation-bar`

## Layout behaviour
| Viewport     | Layout                                                         |
|--------------|----------------------------------------------------------------|
| < 960px      | Fixed top bar (monogram left, hamburger right). Tapping anywhere on the header row toggles the menu (the monogram still scrolls to `hero`). Nav links live in an in-flow dropdown that expands below the header row (`max-height` 0 → 40vh, centered 40% width). The `.nav-controls` cluster floats at the bottom-right of the **screen** (not in the bar), hidden until the menu opens. Pressing `Escape` while the menu is open closes it (`document:keydown.escape` host listener → `onEscape()`; a no-op when the menu is already closed). |
| ≥ 960px      | Fixed left sidebar (`var(--sidebar-width)`, 180px). Links stacked vertically. The `.nav-controls` cluster docks to the bottom of the sidebar (centered column) and rides the sidebar's collapse. A chevron column collapses/expands the sidebar (`is-collapsed`), it auto-collapses below `$breakpoint-height-compact`, and it auto-collapses on scroll past the hero (see Scroll behaviour). Nav bar never hides on scroll. |

The single `.nav-body` element serves both roles — a `position: static` dropdown below the header
on mobile, and `position: static; flex: 1` sidebar content on desktop.

## Scroll behaviour
- **Mobile scroll-hide:** scrolling down past 100px hides the top bar via
  `transform: translateY(-100%)`; `.is-hidden` is a no-op on desktop.
- **Desktop scroll-collapse:** the sidebar starts open and auto-collapses once the user scrolls past
  50% of the hero's height (re-opening above that point). The moment the user works the chevron, this
  auto behaviour is switched off for the rest of the session (`hasManuallyToggledNav`), so a manual
  open or collapse is never overridden by scrolling.

## Nav links
Each link is an `app-text-link` (button mode) whose `(activated)` output calls
`navLinkClick(id)`. The link's typography/color are set on the `app-text-link` host in this
component's SCSS (inherited by its inner `<a>`); the tap-target padding is passed via
`--text-link-padding` (`$spacing-2 0` mobile, `$spacing-unit 0` desktop). The accent + underline
hover comes from the global `.link-underline` class the component applies.

## Dependencies
- `ScrollService` — all nav link clicks
- `MotionService` — backs the reduced-motion toggle
- `ThemeService` — backs the light/dark toggle
- `ContrastService` — backs the high-contrast toggle
- `TextLinkComponent` — renders each nav link
- `IconButtonComponent` — renders each `.nav-controls` toggle (light-dark, high contrast, motion)

## Appearance toggles
`.nav-controls` holds three `app-icon-button` toggles, top to bottom: light-dark mode (`theme`),
high contrast (`contrast`), reduced motion (`motion`) — same order and width on both layouts. It is
a **sibling of `<nav>`**, not a child, because the bar's `backdrop-filter` would trap a
`position: fixed` descendant; living outside lets the cluster be viewport-fixed.
- **Mobile:** fixed at the bottom-right of the screen, hidden (`translateY(160%)`, `opacity: 0`)
  until `is-menu-open`. On open the cluster slides up while the buttons are piled in an overlapping
  stack (per-button `translateY` offsets), then they unstack into the column — the unstack is
  `transition-delay`-ed by the slide duration so it happens *after* the slide. Reduced motion drops
  that delay so nothing waits.
- **Desktop:** docked at the sidebar bottom (centered column) and shares the sidebar's collapse —
  `is-collapsed` (and the compact-height query) slide/fade it out in step with the bar.

The light-dark toggle is wired to `ThemeService` (`themeService.isLight()` /
`themeService.toggleTheme()`), the motion toggle to `MotionService`, and the high-contrast toggle to
`ContrastService` (`contrastService.highContrast()` / `contrastService.toggleHighContrast()`), which
writes `body[data-high-contrast]` that the global SCSS keys off of (see `tokens.scss` /
`styles.scss`).

## Does Not
- Track the active section (underlines appear on hover only)
- Use Angular Router
