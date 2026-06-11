# CLAUDE.md — IconButtonComponent

## Purpose
Reusable square icon-only toggle button. Carries the shared toggle-button shell (surface
background, border that brightens to accent on hover/focus, and a hover tooltip) plus a set of
built-in animated Lucide glyphs. Used in the navigation bar's footer for the appearance/motion
toggles (light-dark mode, high contrast, reduced motion).

## Location
`src/app/components/icon-button/`

## Selector
`app-icon-button`

## Inputs
| Name      | Type                        | Required | Default | Description                                                                                          |
|-----------|-----------------------------|----------|---------|------------------------------------------------------------------------------------------------------|
| `icon`    | `IconButtonIcon \| null`    | No       | `null`  | Which built-in glyph to render. `null` hands the glyph slot to projected content (see Glyph slot).   |
| `active`  | `boolean`                   | No       | `false` | Toggle state. Drives `aria-pressed`, the `.is-active` class, and the active glyph treatment.          |
| `label`   | `string`                    | Yes      | —       | Accessible name — applied as the button's `aria-label` (the button has no visible text).             |
| `tooltip` | `string \| null`            | No       | `null`  | Hover/focus tooltip text. `null` renders no tooltip bubble.                                           |
| `size`    | `number`                    | No       | `20`    | Lucide icon size in px.                                                                               |

## Output
| Name        | Payload | Description                         |
|-------------|---------|-------------------------------------|
| `activated` | `void`  | Emitted on click. The button is presentational — the consumer owns the state and wires `[active]` back in. |

## Icon options
`IconButtonIcon` (`'motion' \| 'theme' \| 'contrast'`) plus the projected-content fallback give four
ways to fill the glyph slot:
- **`motion`** — `CircleDashed` + `Circle`. At rest the two circles overlap; when `active` the dashed
  one fades out and the solid one slides over it and turns gold (the reduced-motion treatment).
- **`theme`** — `Moon` + `Sun`. Resting (dark mode) shows the moon locked left in `--accent`; when
  `active` (light mode) the moon slides right and fades as the sun fades in locked right in `--gold`,
  so it reads as one icon converting into the other.
- **`contrast`** — a single `Contrast` glyph locked right at rest; when `active` it slides left, flips
  180°, and tints `--gold`.
- **projected `<svg>`** — when `icon` is `null`, the consumer's `<ng-content>` SVG is rendered instead.

## Glyph slot
The template `@switch`es on `icon()`. Named icons render their own `<svg lucide…>` glyph(s); the
`@default` branch projects `<ng-content>`, so a consumer can drop in any `<svg>` (e.g. a Lucide
directive it imports itself, or a raw inline SVG). Icon color comes from the glyph container's
`color` (Lucide strokes use `currentColor`).

## Styling
- The button shell, hover/focus accent border, and the right-anchored hover tooltip all live in this
  component's SCSS (moved here from the nav's old `.nav-motion-toggle`).
- `:host` is `display: inline-flex`; the consuming layout (e.g. the nav footer column) positions and
  spaces the buttons.
- The `motion`, `theme`, and `contrast` glyphs all share a 32×20 slot so the buttons render at an
  identical width; the geometry (a 12px left/right offset for two 20px glyphs) is tuned for the
  default 20px icon size. The projected-content fallback is content-sized.

## Does Not
- Own its toggle state — it emits `activated` and reflects `active`; the consumer holds the source of truth
- Own its position, spacing, or alignment — the consuming layout sets those on the host
- Use Angular Router
