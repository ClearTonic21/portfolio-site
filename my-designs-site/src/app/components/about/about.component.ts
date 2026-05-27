import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

interface SkillGroup {
  readonly category: string;
  readonly skills: readonly string[];
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  readonly skillGroups: readonly SkillGroup[] = [
    {
      category: 'Design',
      skills: ['Figma', 'UI/UX Patterns', 'Accessibility', 'Responsive Design'],
    },
    {
      category: 'Frontend',
      skills: ['Angular', 'TypeScript', 'SCSS', 'RxJS'],
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'RESTful APIs', 'SQL'],
    },
    {
      category: 'Platforms',
      skills: ['ServiceNow', 'Azure', 'GitHub Pages'],
    },
    {
      category: 'Tooling',
      skills: ['Claude Code', 'JIRA', 'Git'],
    },
    {
      category: 'Game Dev',
      skills: ['Pixel Art', 'Godot / Unity', 'Game Design', 'ClearTonic Games_'],
    },
  ];
}
