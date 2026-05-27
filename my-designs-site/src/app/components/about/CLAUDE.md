# CLAUDE.md — AboutComponent

## Purpose
Introduces Eli's professional philosophy and technical skillset. Two-column layout: narrative prose on the left, skill tags on the right.

## Location
`src/app/components/about/`

## Selector
`app-about`

## Responsibilities
- Eyebrow label: `/ About`
- Left column (60%): narrative Lora body copy with entrepreneurial, creative-and-technical voice. Lorem ipsum acceptable for placeholder copy.
- Right column (40%): skill tag groups. Each group has a `.type-eyebrow` category label and `.tag` pills.
  - Frontend: Angular, TypeScript, SCSS, RxJS
  - Backend: Node.js, RESTful APIs, SQL
  - Platforms: ServiceNow, Azure, GitHub Pages
  - Tooling: Claude Code, Copilot AI, JIRA, Git
  - Game Dev: Pixel Art, Godot / Unity, Game Design
- Stacks to single column on mobile (768px breakpoint)

## Icons
Skill tags are text-only (no icons). If icons are added to skill groups in the future, use Lucide from `@lucide/angular` for consistency.

## Dependencies
- `RevealDirective` — scroll-reveal on section and key child elements

## Does Not
- Contain CTAs or links
- Duplicate work history details (those live in ExperienceComponent)

## Related Files
- `../experience/experience.component.ts` — detailed work history
- `../../directives/reveal.directive.ts`
