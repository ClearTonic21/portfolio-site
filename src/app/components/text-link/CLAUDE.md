# CLAUDE.md — TextLinkComponent

## Purpose
Reusable text link with an optional trailing icon (or the brand underscore). Carries the shared
hover treatment — accent color + underline wipe (global `.link-underline`) and, for the arrow, the
up-and-right shift (global `.link-arrow`). Used by the nav-bar links, the contact links (email /
external), and the project-card CTAs.

## Location
`src/app/components/text-link/`

## Selector
`app-text-link`

## Inputs
| Name       | Type                                       | Required | Default  | Description                                                                 |
|------------|--------------------------------------------|----------|----------|-----------------------------------------------------------------------------|
| `label`    | `string`                                   | Yes      | —        | The link text.                                                              |
| `icon`     | `'arrow' \| 'mail' \| 'underscore' \| 'none'` | No    | `'none'` | Trailing `ArrowUpRight`, trailing `Mail`, the brand `_` (accent span hugging the label), or nothing. |
| `href`     | `string \| null`                           | No       | `null`   | When set, renders a real link (`<a href>`). When `null`, renders a button-mode link (see Modes). |
| `target`   | `string \| null`                           | No       | `null`   | `target` attribute. `'_blank'` auto-adds `rel="noopener noreferrer"`.       |
| `iconSize` | `number`                                   | No       | `16`     | Lucide icon size (e.g. `20` for the larger contact mail icon).              |

## Output
| Name        | Payload | Description                                                              |
|-------------|---------|--------------------------------------------------------------------------|
| `activated` | `void`  | Emitted on click / Enter / Space **in button mode only** (no `href`).    |

## Modes
- **Button mode** (`href` is `null`): the anchor gets `role="button"` + `tabindex="0"`, has no
  `href`, and emits `activated` on click/Enter/Space (Space's default scroll is prevented). This is
  how the nav uses it — `(activated)` calls `ScrollService.scrollToSection`.
- **Link mode** (`href` set): a normal `<a href>` that navigates natively; `activated` does **not**
  fire. `target="_blank"` automatically gets `rel="noopener noreferrer"`.

## Icon library
Imports only `LucideArrowUpRight` and `LucideMail`. `underscore` is a `<span class="accent">_</span>`
inside the label (no gap), and `none` renders no icon — neither needs a Lucide import.

## Styling
- The inner `<a>` carries `.link-underline` (accent text + underline on hover/focus, global) and the
  arrow carries `.link-arrow` (up-right shift on the link's hover, global).
- Typography and color are **inherited** from the host (reset.scss sets `a { font: inherit; color:
  inherit }`), so a consumer styles the `app-text-link` element directly — those inheritable props
  cascade to the `<a>`. `:host` defaults to `display: inline-flex`; a consumer's element selector
  (e.g. `app-text-link { display: block; width: 100% }`) wins on specificity.
- Tap-target padding is passed via the `--text-link-padding` custom property (default `0`).
- The underline's vertical offset is the global `--link-underline-offset` (default `0`); set it on
  the host to nudge the bar (the contact links use `-4px`).

## Does Not
- Own its typography, color, width, or alignment — the consuming context sets those on the host
- Track active/selected state
- Use Angular Router
