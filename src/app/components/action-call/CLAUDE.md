# CLAUDE.md — ActionCallComponent

## Purpose

Reusable primary CTA button with an optional arrow icon and an optional brand underscore. Carries
the full enhanced-primary button style internally so it can be dropped anywhere without relying on a
parent class.

## Location

`src/app/components/action-call/`

## Selector

`app-action-call`

## Inputs

| Name              | Type             | Required | Default | Description                                                                                                        |
| ----------------- | ---------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| `text`            | `string`         | Yes      | —       | Button label text.                                                                                                 |
| `arrowIcon`       | `boolean`        | No       | `false` | When `true`, appends a Lucide `ArrowUpRight` icon after the label.                                                 |
| `brandUnderscore` | `boolean`        | No       | `false` | When `true`, appends the brand `_` immediately after the label text.                                               |
| `href`            | `string`         | No       | `'#'`   | Navigation URL. Pass a path or `mailto:` for link behaviour.                                                       |
| `target`          | `string \| null` | No       | `null`  | `target` attribute on the `<a>`. Use `'_blank'` for new tabs — `rel="noopener noreferrer"` is added automatically. |

## Rendering

Renders an inner `<a class="action-call">` element. The `href` and `target` inputs drive the
anchor attributes directly. The parent should not add a wrapping anchor.

## Styles

All button styles are self-contained in this component's SCSS — no dependency on the global
`.button-primary` class. Hover state:

- Background lightens to a 22% white tint of `--accent` (stays solid, not ghost)
- Box-shadow: `0 0 48px rgba($color-accent, 0.30)` — 2× the standard `--accent-glow` intensity
- Scale: `1.04×`
- Icon translates `translate(2px, -2px)` toward upper-right

## Scroll-activated hover (touch / small viewports)

There is no `:hover` on touch, so an `IntersectionObserver` (`threshold: 0.15`,
`rootMargin: '-25% 0px -25% 0px'`) sets the host `is-in-view` class while the button sits in the
middle 50% of the viewport, mirroring the hover state above. It is only set when
`window.innerWidth < 960`, and the SCSS resets it above `$breakpoint-medium`, so desktop uses
pointer `:hover` exclusively.

## Host bindings
- `[class.is-in-view]` — bound to `isInView()`

## Icon & brand underscore usage

Both are boolean toggles — the icon (`ArrowUpRight`) is owned internally, and the brand underscore
renders a `<span class="accent">_</span>` scoped to inherit the button's text color so it
stays legible on the filled accent background.

```html
<app-action-call text="Grab my Resume" [arrowIcon]="true" href="..." target="_blank" />
<app-action-call text="ClearTonic Games" [brandUnderscore]="true" href="..." />
```

## Does Not

- Accept projected content — all content is controlled via inputs
- Handle click-based navigation — use `href` for links or wrap with a `(click)` binding externally
- Own reduced-motion logic — transitions are suppressed globally by `[data-reduced-motion]`
