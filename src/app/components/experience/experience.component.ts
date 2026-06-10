import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { TagListComponent } from '../tag-list/tag-list.component';
import { ArticleCardComponent } from '../article-card/article-card.component';

interface TimelineEntry {
  readonly id: string;
  readonly company: string;
  readonly role: string;
  readonly period: string;
  readonly bullets: readonly string[];
  readonly tags: readonly string[];
}

@Component({
  selector: 'app-experience',
  imports: [RevealDirective, TagListComponent, ArticleCardComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {
  readonly timelineEntries: readonly TimelineEntry[] = [
    {
      id: 'capital-one-sn',
      company: 'Discover Financial | Capital One Financial',
      role: 'ServiceNow Application Developer',
      period: 'May 2025 - Present',
      bullets: [
        'Built custom JavaScript and AngularJS components for the ITSM and HR modules of their large-scale ServiceNow platform.',
        'Delivered workflow automation and portal improvements that reduced manual processing overhead.',
        'Integrated third-party and internal REST APIs to extend ServiceNow platform capabilities.',
        'Collaborated in Agile squads and mentored junior engineers on ServiceNow best practices.',
      ],
      tags: ['ServiceNow', 'JavaScript', 'AngularJS', 'REST APIs', 'Agile'],
    },
    {
      id: 'experlogix-dev',
      company: 'Experlogix Inc.',
      role: 'Full-Stack Software Engineer',
      period: 'Jan 2022 - Apr 2025',
      bullets: [
        'Built and shipped features across the Angular + TypeScript SaaS frontend and backend API layer.',
        'Led UI redesigns and accessibility improvements in close collaboration with Design and Product.',
        'Implemented CRM integrations and database-layer changes supporting enterprise customer workflows.',
      ],
      tags: ['Angular', 'TypeScript', 'SCSS', 'Node.js', 'SQL', 'CRM'],
    },
    {
      id: 'experlogix-qa',
      company: 'Experlogix Inc.',
      role: 'QA Engineer',
      period: 'Feb 2019 - Jan 2022',
      bullets: [
        'Built and shipped features across the Angular + TypeScript SaaS frontend and backend API layer.',
        'Led UI redesigns and accessibility improvements in close collaboration with Design and Product.',
        'Implemented CRM integrations and database-layer changes supporting enterprise customer workflows.',
      ],
      tags: ['C#', 'Selenium', 'Automated Tests', 'Integration Tests'],
    },
  ];
}
