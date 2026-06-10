# CLAUDE.md — CrossSectionComponent

## Purpose
A structural wrapper that renders one page section and owns that section's background
treatment. `AppComponent` composes the page from a typed array of cross-sections rather than
hardcoding section tags, so sections can be toggled, reordered, or restyled from data alone.

## Location
`src/app/components/cross-section/`

## Selector
`app-cross-section`

## Inputs
| Name        | Type            | Required | Default | Description                                                                 |
|-------------|-----------------|----------|---------|-----------------------------------------------------------------------------|
| `component` | `Type<unknown>` | Yes      | —       | The section content component to render (e.g. `AboutComponent`).            |
| `glass`     | `boolean`       | No       | `false` | When `true`, applies the frosted-glass background with gold top/bottom borders. |

## Content rendering
The configured `component` is rendered with `NgComponentOutlet`. Section content components are
standalone and self-contained — they take no inputs and keep their own `<section id="...">`,
`.section-inner`, and markup. They do **not** need to be listed in any `imports` array to be
rendered this way.

## Background ownership
The host element carries the background, not the inner section component:
- `glass()` true → global `.glass-section` class (frosted `backdrop-filter` overlay + gold
  metallic top/bottom borders that brighten to teal on hover). The host is `width: 100%` and the
  page no longer reserves sidebar space, so a glass section spans the full viewport (full-bleed).
- `glass()` false → no class; the section is transparent over the parallax background.

The `.glass-section` styling itself is defined globally in `src/styles.scss` and shares the gold
and teal gradient stops in `src/styles/_metallic-border.scss`.

## Scroll-activated glow
On touch/small viewports there is no `:hover`, so an `IntersectionObserver`
(`threshold: 0.15`, `rootMargin: '-25% 0px -25% 0px'`) sets the `is-in-view` class while the
section passes through the middle 50% of the viewport, swapping the gold border to teal with a
glow. It is only set when `window.innerWidth < 960`; the global `.glass-section.is-in-view` rule
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

## Does Not
- Own the section anchor `id`, heading, or content — those belong to the inner component
- Decide which sections appear or in what order — that is `AppComponent.sections`
- Apply `appReveal` or any entrance animation — content components own their own motion

## Related Files
- `../../app.ts` — defines the `CrossSection` interface and the `sections` array
- `../../../styles.scss` — `.glass-section` definition
- `../../../styles/_metallic-border.scss` — gold/teal gradient stops
