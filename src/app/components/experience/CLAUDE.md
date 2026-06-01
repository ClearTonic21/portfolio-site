# CLAUDE.md — ExperienceComponent

## Purpose
Chronological work history rendered as a vertical timeline. Shows career progression from full-stack development to enterprise ServiceNow specialization.

## Location
`src/app/components/experience/`

## Selector
`app-experience`

## Responsibilities
- Eyebrow label: `/ Experience`
- Vertical timeline: 1px `var(--border-accent)` line, cards staggered left/right on desktop, stacked on mobile (768px breakpoint)
- Three entries, newest first:
  1. ServiceNow Application Developer — Capital One: custom JS + AngularJS components, REST API integrations, ITSM/HR modules, Agile, mentored junior engineers
  2. ServiceNow Application Developer — Discover Financial: enterprise ITSM application development
  3. Full-Stack Software Engineer — Experlogix Inc.: TypeScript + Angular SaaS, CRM integrations, UI/UX redesigns, API and database layer changes, Design and Product collaboration
- Each card: `.surface` base, company in `.type-heading`, role in `.type-caption` (accent color), 2-3 bullets in `.type-body`, tag pills

## Data Model
```typescript
interface TimelineEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  bullets: string[];
  tags: string[];
}
```
Defined as a typed array in the component class. No HTTP calls or external data.

## Icons
Timeline entries are text-only. If company logos or role icons are added in the future, use Lucide from `@lucide/angular` for consistency.

## Dependencies
- `RevealDirective` — staggered card reveals

## Does Not
- Link to external URLs
- Repeat skill tag groups from AboutComponent (experience cards use minimal context tags only)
