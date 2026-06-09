# CLAUDE.md — NavigationBarComponent

## Purpose
The site's primary navigation. Renders as a fixed top bar on mobile and as a fixed left-side
sidebar on desktop (`$breakpoint-medium`, 960px+). Contains the ClearTonic monogram (tapping it
scrolls to `hero`), anchor-scroll nav links, and the reduced-motion toggle.

## Location
`src/app/components/navigation-bar/`

## Selector
`app-navigation-bar`

## Layout behaviour
| Viewport     | Layout                                                         |
|--------------|----------------------------------------------------------------|
| < 960px      | Fixed top bar (monogram left, hamburger right). Tapping anywhere on the header row toggles the menu (the monogram still scrolls to `hero`). Nav links live in an in-flow dropdown that expands below the header row (`max-height` 0 → 40vh, centered 40% width). The motion toggle fades in at the bottom-left of the expanded bar. |
| ≥ 960px      | Fixed left sidebar (`var(--sidebar-width)`, 180px). Links stacked vertically. Motion toggle pinned to the sidebar bottom via flexbox. A chevron column collapses/expands the sidebar (`is-collapsed`), and it auto-collapses below `$breakpoint-height-compact`. Nav bar never hides on scroll. |

The single `.nav-body` element serves both roles — a `position: static` dropdown below the header
on mobile, and `position: static; flex: 1` sidebar content on desktop.

## Scroll-hide
Only applies on mobile. When the user scrolls down past 100px the top bar hides via
`transform: translateY(-100%)`. `.is-hidden` is a no-op on desktop.

## Nav links
Each link is an `app-text-link` (`icon="underscore"`, button mode) whose `(activated)` output calls
`navLinkClick(id)`. The link's typography/color are set on the `app-text-link` host in this
component's SCSS (inherited by its inner `<a>`); the tap-target padding is passed via
`--text-link-padding` (`$spacing-2 0` mobile, `$spacing-unit 0` desktop). The accent + underline
hover comes from the global `.link-underline` class the component applies.

## Dependencies
- `ScrollService` — all nav link clicks
- `MotionService` — reduced-motion toggle
- `TextLinkComponent` — renders each nav link

## Does Not
- Track the active section (underlines appear on hover only)
- Use Angular Router
