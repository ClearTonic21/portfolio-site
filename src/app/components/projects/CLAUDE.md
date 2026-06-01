# CLAUDE.md — ProjectsComponent

## Purpose
Showcases Eli's personal projects and indie game development. The most visually expressive section — image-forward cards that communicate creativity alongside technical skill.

## Location
`src/app/components/projects/`

## Selector
`app-projects`

## Responsibilities
- Eyebrow label: `/ Projects`
- 2-column grid on desktop (768px+), 1-column on mobile
- Each card: image area, eyebrow tag, `.type-heading` title, tag pills, `.type-body` description, CTA link
- Card hover: `translateY(-3px)` + transition to `.surface--accent-highlight`

## Projects (display order)
1. **ClearTonic Games_ — [Game Name]** — image: `assets/images/game-screenshot.png`
2. **Canopy Trails** — information organizer — image: `assets/images/app-screenshot.png`
3. **This Portfolio Site** — AI-directed Angular development — image TBD

## Data Model
```typescript
interface ProjectCard {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  imagePath: string;
  imageAlt: string;
  tags: string[];
  linkHref: string;
}
```

## Icons
Project cards may display an external link icon using Lucide for CTAs: `<lucide-icon name="external-link" size="16"></lucide-icon>` or `<lucide-icon name="arrow-up-right" size="16"></lucide-icon>`. Import from `@lucide/angular` for consistency.

## Dependencies
- `RevealDirective`

## Does Not
- Navigate to external URLs (all `linkHref` values are `#` placeholders)
- Contain modal or lightbox behavior
