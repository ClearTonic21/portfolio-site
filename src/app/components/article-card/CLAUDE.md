# CLAUDE.md — ArticleCardComponent

## Purpose
Reusable surface card with an optional image, a highlight label, a title, and a projected
content slot. Used anywhere a card-style item appears — Projects, Experience, or future
article/blog sections.

## Location
`src/app/components/article-card/`

## Selector
`app-article-card`

## Inputs
| Name        | Type      | Required | Default | Description                                                   |
|-------------|-----------|----------|---------|---------------------------------------------------------------|
| `title`     | `string`  | Yes      | —       | Main heading of the card.                                     |
| `highlight` | `string`  | No       | —       | Small eyebrow text above the title (date, category, etc.).    |
| `highlightVariant` | `'eyebrow' \| 'caption'` | No | `'eyebrow'` | `'eyebrow'` → uppercase, wide tracking; `'caption'` → compact, no uppercase (for dates/metadata). |
| `imagePath` | `string`  | No       | —       | Asset URL for the card image. Omit entirely for no image area.|
|             |           |          |         | Pass `''` (empty string) to show the "Preview coming soon"    |
|             |           |          |         | placeholder while keeping the image area reserved.            |
| `imageAlt`  | `string`  | No       | `''`    | Alt text for the image. Required when `imagePath` is set.     |
| `fullPage`  | `boolean` | No       | `false` | When `true`, card takes full row width on desktop (100%).     |
|             |           |          |         | When `false`, card takes half row width (50% - gap).          |

## Content projection
Body content (tag lists, bullet lists, descriptions, CTA links) is passed via `<ng-content>`.
The projecting component owns and styles its own projected elements.

## Special values
`title` of `'ClearTonic Games_'` renders the brand underscore as an accent span automatically.

## Host bindings
- Always has class `surface` (global surface card styling)
- Has class `is-full-page` when `fullPage()` is true
- Has class `is-in-view` while the card sits in the middle 50% of the viewport on touch/small screens (see Scroll-activated glow)

## Scroll-activated glow
On pointer devices the gold metallic ring swaps to teal with an accent glow on `:hover`. Touch/small
viewports have no hover, so an `IntersectionObserver` (`threshold: 0.15`,
`rootMargin: '-25% 0px -25% 0px'`) toggles `is-in-view` as the card passes through the middle 50% of
the viewport, producing the same teal-ring + glow. The class is only set when
`window.innerWidth < 960`, and the component SCSS also resets the effect above `$breakpoint-medium`
as a safety net, so the glow never shows on desktop.

## Does Not
- Own description, tag, or link content — those are projected
- Apply `appReveal` — the parent is responsible for scroll-reveal
- Add inter-card spacing — the parent grid controls gaps
