# CLAUDE.md — AboutComponent

## Purpose
Introduces Eli's professional philosophy and technical skillset. Two-column layout: narrative prose on the left, skill tags on the right.

## Location
`src/app/components/about/`

## Selector
`app-about`

## Responsibilities
- Renders **body content only** — a two-column layout. The section eyebrow (`About`) and heading
  ("The Details") are owned by the parent `CrossSectionComponent` (set in `AppComponent.sections`);
  this component no longer renders its own `<section>`, `.section-inner`, eyebrow, or heading.
- Left column (60%): narrative Lora body copy with an entrepreneurial, creative-and-technical voice, including a note that AI tooling is used with strict intention and never for ClearTonic Games_ work.
- Right column (40%): skill tag groups, each rendered by `app-tag-list` (a `.type-eyebrow` category label + `.tag` pills):
  - Design: Figma, UI & UX Patterns, Accessibility, Responsive Design
  - Frontend: Angular, TypeScript, SCSS
  - Backend: SQL, Node.js, RESTful APIs
  - Tooling: Claude AI, ServiceNow, JIRA, Git
  - Game Dev: Godot / Unity, Game Design Documents
- Stacks to single column on mobile (`$breakpoint-medium`, 960px)

## Icons
Skill tags are text-only (no icons). If icons are added to skill groups in the future, use Lucide from `@lucide/angular` for consistency.

## Dependencies
- `RevealDirective` — scroll-reveal on the eyebrow and the two-column layout
- `TagListComponent` — renders each skill group

## Does Not
- Contain CTAs or links
- Duplicate work history details (those live in ExperienceComponent)
- Own its section background, anchor `id`, eyebrow, or heading — the parent `CrossSectionComponent`
  applies the glass / gold-border treatment and renders the unified header (eyebrow/heading/subtitle)
  from `AppComponent.sections`

## Related Files
- `../experience/experience.component.ts` — detailed work history
- `../../directives/reveal.directive.ts`
