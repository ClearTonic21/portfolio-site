# CLAUDE.md — ArticleCardComponent

## Purpose
Reusable surface card with an optional image, a highlight label, a title, a body description, and
projection slots for a tag list and a (centered) link. Used anywhere a card-style item appears —
Projects, Experience, or future article/blog sections. Sections differ only in usage: they supply
inputs and optionally drop an `<app-tag-list>` / `<app-text-link>` inside the card.

## Location
`src/app/components/article-card/`

## Selector
`app-article-card`

## Inputs
| Name        | Type      | Required | Default | Description                                                   |
|-------------|-----------|----------|---------|---------------------------------------------------------------|
| `title`     | `string`  | Yes      | —       | Main heading of the card.                                     |
| `highlight` | `string`  | No       | —       | Gold eyebrow label above the title (`.type-eyebrow`) — date, category, etc. |
| `caption`   | `string`  | No       | —       | Accent caption under the title (`.type-caption`) — e.g. a role or subtitle. |
| `imagePath` | `string`  | No       | —       | Asset URL for the card image. Omit entirely for no image area.|
|             |           |          |         | Pass `''` (empty string) to show the "Preview coming soon"    |
|             |           |          |         | placeholder while keeping the image area reserved.            |
| `imageAlt`  | `string`  | No       | `''`    | Alt text for the image. Required when `imagePath` is set.     |
| `fullPage`  | `boolean` | No       | `false` | When `true`, card takes full row width on desktop (100%).     |
|             |           |          |         | When `false`, card takes half row width (50% - gap).          |
| `description` | `string` | No      | —       | Body copy rendered by the card (`.type-body`, secondary color). Same treatment everywhere. |

## Body layout
The card renders its content in a fixed order; sections only supply inputs / projected elements:
1. `highlight` input — gold eyebrow above the title
2. `title` input
3. `caption` input — accent caption under the title (e.g. a role/subtitle)
4. **default `<ng-content>`** — section-specific content (e.g. the experience bullets)
5. `description` input
6. **`<ng-content select="app-tag-list">`** — optional tag pills (drop an `<app-tag-list>`)
7. **`<ng-content select="app-text-link">`** — optional CTA (drop an `<app-text-link>`), wrapped in a
   `.article-card-link` container that **centers** it and supplies the accent color + link typography
   (inherited by the link's `<a>`). The wrapper only renders when a link is projected (tracked via a
   `contentChild(TextLinkComponent)` query), so cards without a link get no empty gap.

So adding a link or tags to any card — including the experience cards — is just a matter of placing
the `<app-text-link>` / `<app-tag-list>` element inside `<app-article-card>`; no per-section markup
or styling is needed.

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
- Own the tag or link content — those are projected (the card owns their layout/placement, and the
  `description` text, but not the tag/link data)
- Apply `appReveal` — the parent is responsible for scroll-reveal
- Add inter-card spacing — the parent grid controls gaps
