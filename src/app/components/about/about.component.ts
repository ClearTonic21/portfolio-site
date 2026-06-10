import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { TagListComponent } from '../tag-list/tag-list.component';

interface SkillGroup {
  readonly category: string;
  readonly skills: readonly string[];
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RevealDirective, TagListComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  readonly skillGroups: readonly SkillGroup[] = [
    {
      category: 'Design',
      skills: ['UX Patterns', 'Accessibility', 'Responsive Design'],
    },
    {
      category: 'Frontend',
      skills: ['Angular', 'TypeScript', 'SCSS'],
    },
    {
      category: 'Backend',
      skills: ['SQL', 'Node.js', 'RESTful APIs'],
    },
    {
      category: 'Tooling',
      skills: ['Claude AI', 'ServiceNow', 'JIRA', 'Git', 'Figma'],
    },
    {
      category: 'Game Dev',
      skills: ['Godot / Unity', 'Game Design Documents'],
    },
  ];
}
