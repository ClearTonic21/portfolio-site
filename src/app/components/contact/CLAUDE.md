# CLAUDE.md — ContactComponent

## Purpose
The final section. Provides Eli's contact information and the resume PDF link. Simple, centered, unhurried.

## Location
`src/app/components/contact/`

## Selector
`app-contact`

## Responsibilities
- Eyebrow label: `/ Contact`
- Short headline (e.g. "Let's build something great.")
- Three large-format links with accent underline on hover:
  - Email — `mailto:` link
  - LinkedIn — opens in new tab with `rel="noopener noreferrer"`
  - GitHub — opens in new tab with `rel="noopener noreferrer"`
- "View Resume" `.button-primary` — opens `Eli_Philpott_Resume.pdf` in a new tab (served from `public/` via angular.json)
- Footer: `© 2026 Eli Philpott · ClearTonic Games_` in `.type-caption`

## Icons
Use Lucide icons for external links:
- `mail` icon for the email link
- `linkedin` icon for the LinkedIn link (or `external-link` if preferred)
- `github` icon for the GitHub link

Import from `@lucide/angular` and render with `<lucide-icon name="..." size="20"></lucide-icon>`. Pair each with `aria-label` for accessibility.

## On External Links
LinkedIn, GitHub, and the resume PDF are the only places in the entire site using `target="_blank"`. This is intentional — they are genuine external destinations and are documented here to justify the exception.

## Dependencies
None.

## Does Not
- Contain form or form submission logic
- Use `ScrollService` (this is the terminal section)
