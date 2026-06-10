# CLAUDE.md — ContactComponent

## Purpose
The final section. Provides Eli's contact information and the resume PDF link. Simple, centered, unhurried.

## Location
`src/app/components/contact/`

## Selector
`app-contact`

## Responsibilities
- Eyebrow label: `Contact_`
- Short headline: "Let's build something." (the word "build" gets the accent highlight)
- Three large-format links (`.contact-link.link-underline`) — accent underline + text color + arrow shift on hover:
  - Email — `mailto:` link (leading Mail icon)
  - LinkedIn — opens in new tab with `rel="noopener noreferrer"` (trailing ArrowUpRight icon)
  - GitHub — opens in new tab with `rel="noopener noreferrer"` (trailing ArrowUpRight icon)
- "Grab my Resume" CTA via `app-action-call` (`arrowIcon`, `target="_blank"`) — opens `Eli_Philpott_Resume.pdf` in a new tab (served from `public/` via angular.json)
- Footer: `© 2026 Eli Philpott · ClearTonic Games_` in `.type-caption`

## Icons
The three links are `app-text-link`s; their icons come from that component's `icon` input:
- `icon="mail"` (`iconSize="20"`) for the email link
- `icon="arrow"` for LinkedIn and GitHub (the arrow shifts up-and-right on hover via the global
  `.link-arrow` class the component applies)

The resume CTA's `ArrowUpRight` comes from `ActionCallComponent`.

## On External Links
LinkedIn, GitHub, and the resume PDF are the only places in the entire site using `target="_blank"`. This is intentional — they are genuine external destinations and are documented here to justify the exception.

## Dependencies
- `TextLinkComponent` — the three email / LinkedIn / GitHub links
- `ActionCallComponent` — the resume CTA

## Does Not
- Contain form or form submission logic
- Use `ScrollService` (this is the terminal section)
