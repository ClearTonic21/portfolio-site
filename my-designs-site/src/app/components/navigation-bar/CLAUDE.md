# CLAUDE.md — NavigationBarComponent

## Purpose
The site's primary navigation. Renders as a fixed top bar on mobile and as a fixed left-side
sidebar on desktop (768px+). Contains the ClearTonic logo, anchor-scroll nav links, and the
reduced-motion toggle at the bottom.

## Location
`src/app/components/navigation-bar/`

## Selector
`app-navigation-bar`

## Layout behaviour
| Viewport     | Layout                                                         |
|--------------|----------------------------------------------------------------|
| < 768px      | Fixed top bar (logo left, hamburger right). Nav links live in a left-side overlay that slides in on hamburger tap. Motion toggle is at the bottom of that overlay. |
| ≥ 768px      | Fixed left sidebar (220px wide). Links stacked vertically. Motion toggle pinned to sidebar bottom via flexbox spacer. Nav bar never hides on scroll. |

The single `.nav-body` element serves both roles — `position: fixed` overlay on mobile,
`position: static; flex: 1` sidebar content on desktop.

## Scroll-hide
Only applies on mobile. When the user scrolls down past 100px the top bar hides via
`transform: translateY(-100%)`. `.is-hidden` is a no-op on desktop.

## Dependencies
- `ScrollService` — all nav link clicks
- `MotionService` — reduced-motion toggle

## Does Not
- Track the active section (underlines appear on hover only)
- Use Angular Router
