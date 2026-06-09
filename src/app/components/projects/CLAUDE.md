# CLAUDE.md — ProjectsComponent

## Purpose
Showcases Eli's personal projects and indie game development. The most visually expressive section — image-forward cards that communicate creativity alongside technical skill.

## Location
`src/app/components/projects/`

## Selector
`app-projects`

## Responsibilities
- Eyebrow label: `Projects_`; heading "Things I've Built"
- Cards rendered by `app-article-card` in a wrapping flex row (`.projects-grid`): two per row on desktop (`$breakpoint-medium`, 960px), one per row on mobile. A `fullPage` card spans the full row width. (Flexbox, not CSS Grid.)
- Each card: image area, highlight eyebrow, `.type-heading` title, `app-tag-list` pills, `.type-body` description, and a CTA link — the tags, description, and link are projected into the card
- Card hover / scroll-in-view: `translateY(-3px)` lift + accent glow + metallic border swaps gold → teal (owned by `ArticleCardComponent`)

## Projects (display order)
1. **ClearTonic Games_** — indie game design & development — image `assets/images/game_screenshot.png` — links to the GitHub profile
2. **Canopy Trails** — trail/nature-spot information organizer — image `assets/images/app_screenshot.png` — "Coming Soon" (`#` placeholder, no navigation)
3. **This Portfolio Site** — AI-directed Angular 20 development — no image (placeholder shown) — links to source on GitHub

## Data Model
```typescript
interface ProjectCard {
  readonly id: string;
  readonly title: string;
  readonly fullPage: boolean;
  readonly eyebrow: string;
  readonly description: string;
  readonly imagePath: string;
  readonly imageAlt: string;
  readonly tags: readonly string[];
  readonly linkHref: string;
  readonly linkLabel: string;
}
```

## Icons
Project cards may display an external link icon using Lucide for CTAs: `<lucide-icon name="external-link" size="16"></lucide-icon>` or `<lucide-icon name="arrow-up-right" size="16"></lucide-icon>`. Import from `@lucide/angular` for consistency.

## Dependencies
- `RevealDirective` — staggered reveals
- `ArticleCardComponent` — card shell for each project
- `TagListComponent` — tech-stack pills
- `TextLinkComponent` — the CTA link (`icon="arrow"`)

## Links
Each card's CTA is an `app-text-link` (`icon="arrow"`, accent-colored) driven by `linkHref` /
`linkLabel`. Real destinations (GitHub) open in a new tab — `target="_blank"` + auto
`rel="noopener noreferrer"`; a `#` value passes no `target` (placeholder, e.g. "Coming Soon").

## Does Not
- Contain modal or lightbox behavior
