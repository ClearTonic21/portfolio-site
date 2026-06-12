# CLAUDE.md — CrossSectionComponent

## Purpose
A structural wrapper that renders one page section and owns that section's **background treatment**
and **header**. `AppComponent` composes the page from a typed array of cross-sections rather than
hardcoding section tags, so sections can be toggled, reordered, restyled, and re-titled from data
alone. The glass styling and the eyebrow/heading/subtitle block both live here (in the component's
own SCSS/template) instead of in global CSS or each section component.

## Location
`src/app/components/cross-section/`

## Selector
`app-cross-section`

## Inputs
| Name        | Type            | Required | Default | Description                                                                 |
|-------------|-----------------|----------|---------|-----------------------------------------------------------------------------|
| `sectionId` | `string`        | Yes      | —       | Anchor id for the section. In standard mode it is set on the `<section>` this component renders, so it is the scroll/nav target. |
| `component` | `Type<unknown>` | Yes      | —       | The section content component to render (e.g. `AboutComponent`).            |
| `glass`     | `boolean`       | No       | `false` | When `true`, applies the frosted-glass background with gold top/bottom borders. |
| `eyebrow`   | `string`        | No       | —       | Section eyebrow label. Rendered as `{{ eyebrow }}` + an accent `_` (the brand underscore). Supplying it (or `heading`) switches the component into **standard mode** (see Render modes). |
| `heading`   | `string`        | No       | —       | Section heading (`.type-heading`, `tabindex="0"`). Its id is `${sectionId}-heading` and backs the section's `aria-labelledby`. |
| `subtitle`  | `string`        | No       | —       | Optional supporting line under the heading (`.type-body`, secondary color). |

## Render modes
The component renders one of two ways, decided by `hasHeader()` (`true` when `eyebrow` **or**
`heading` is set):

- **Standard mode** (about, experience, projects) — the component renders the section shell:
  `<section [id] [aria-labelledby]>` → `.section-inner` → a `.section-header` (eyebrow, heading,
  subtitle with unified spacing) → the projected `component`. The body component renders **only its
  body** (no `<section>`, `.section-inner`, eyebrow, or heading).
- **Bespoke mode** (hero, contact) — no header inputs are supplied, so the component just renders
  the projected `component`, which owns its own `<section id="…">`, `.section-inner`, and header.

This is why About/Experience/Projects body components are header-less while Hero/Contact keep their
distinctive headlines.

## Unified header spacing
`.section-header` is a flex column with `gap: $spacing-3` between the eyebrow/heading/subtitle and
`margin-bottom: $spacing-4` before the body. Centralizing this here is what keeps the rhythm
consistent across sections (previously each component set its own heading margins). The header
elements carry `appReveal`; the heading/subtitle add a staggered `transition-delay` so they animate
in sequence.

## Content rendering
The configured `component` is rendered with `NgComponentOutlet`. Section content components are
standalone and self-contained — they take no inputs. They do **not** need to be listed in any
`imports` array to be rendered this way.

## Background ownership
The host element carries the background, not the inner section component:
- `glass()` true → `glass-section` host class. The frosted `backdrop-filter` overlay, gold metallic
  top/bottom borders (brightening to teal on hover / scroll-into-view), hover glow, and the
  desktop full-bleed offset are all styled in **this component's SCSS** under `:host(.glass-section)`.
  The host is `width: 100%`, so a glass section spans the full viewport (full-bleed).
- `glass()` false → no class; the section is transparent over the parallax background.

The gold/teal gradient stops come from CSS custom properties in `tokens.scss`. The only
glass-related rules left in `src/styles.scss` are the **theme/contrast palette overrides** for
`.glass-section` — those are shared with `.nav-bar` (the two dark frosted islands) and re-tint the
island palette across themes, so they remain global by design.

## Scroll-activated glow
On touch/small viewports there is no `:hover`, so an `IntersectionObserver`
(`threshold: 0.15`, `rootMargin: '-25% 0px -25% 0px'`) sets the `is-in-view` class while the
section passes through the middle 50% of the viewport, swapping the gold border to teal with a
glow. It is only set when `window.innerWidth < 960`; the `:host(.glass-section.is-in-view)` rule
also resets the effect above `$breakpoint-medium`, so desktop relies purely on `:hover`.

## Feature flag
There is no `enabled` input. Visibility is a property of each entry in `AppComponent.sections`;
when `enabled` is `false`, `AppComponent`'s `@if` skips the cross-section so it is never
instantiated or added to the DOM. This is the intended "hide the whole section" behaviour.

## Host bindings
- `[class.glass-section]` — bound to `glass()`
- `[class.is-in-view]` — bound to `isInView()` (scroll-activated glow; see above)

## Dependencies
- `NgComponentOutlet` (`@angular/common`)
- `RevealDirective` — scroll-reveal on the header elements

## Does Not
- Render a header for bespoke sections (hero, contact) — they own their own header
- Decide which sections appear or in what order — that is `AppComponent.sections`
- Apply an entrance animation to the body — content components own their own motion

## Related Files
- `../../app.ts` — defines the `CrossSection` interface and the `sections` array (incl. eyebrow/heading)
- `../../../styles.scss` — `.glass-section` theme/contrast palette overrides (shared with the nav)
- `../../../styles/_metallic-border.scss` — gold/teal gradient stops
