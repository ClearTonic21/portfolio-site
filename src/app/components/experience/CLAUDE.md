# CLAUDE.md — ExperienceComponent

## Purpose
Chronological work history rendered as a vertical timeline. Shows career progression from full-stack development to enterprise ServiceNow specialization.

## Location
`src/app/components/experience/`

## Selector
`app-experience`

## Responsibilities
- Renders **body content only** — the vertical timeline. The section eyebrow (`Experience`) and
  heading ("Work History") are owned by the parent `CrossSectionComponent` (set in
  `AppComponent.sections`); this component no longer renders its own `<section>`, `.section-inner`,
  eyebrow, or heading.
- Vertical timeline: 4px `var(--border-accent)` line with an accent dot per entry; cards alternate left/right on desktop (`$breakpoint-medium`, 960px) and stack on mobile. A short-landscape override (`max-height: $breakpoint-height-compact`) collapses to a single flush-left column with the line on the right.
- Three entries, newest first:
  1. ServiceNow Application Developer — Capital One: custom JS + AngularJS components, REST API integrations, ITSM/HR modules, Agile, mentored junior engineers
  2. ServiceNow Application Developer — Discover Financial: enterprise ITSM application development
  3. Full-Stack Software Engineer — Experlogix Inc.: TypeScript + Angular SaaS, CRM integrations, UI/UX redesigns, API and database layer changes, Design and Product collaboration
- Each entry is an `app-article-card` (global `.surface`): company in the `title`, period in the `highlight` (gold eyebrow), role in the `caption` (accent, under the title), bullets projected as `.type-body` list items, and tags via a projected `app-tag-list`

## Data Model
```typescript
interface TimelineEntry {
  readonly id: string;
  readonly company: string;
  readonly role: string;
  readonly period: string;
  readonly bullets: readonly string[];
  readonly tags: readonly string[];
}
```
Defined as a typed array in the component class. No HTTP calls or external data.

## Icons
Timeline entries are text-only. If company logos or role icons are added in the future, use Lucide from `@lucide/angular` for consistency.

## Dependencies
- `RevealDirective` — staggered card reveals
- `ArticleCardComponent` — timeline card shell
- `TagListComponent` — per-entry tag pills

## Does Not
- Link to external URLs
- Repeat skill tag groups from AboutComponent (experience cards use minimal context tags only)
- Own its section anchor `id`, eyebrow, or heading — the parent `CrossSectionComponent` renders the
  unified header from `AppComponent.sections`
