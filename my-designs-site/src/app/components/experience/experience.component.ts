import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { TagListComponent } from '../tag-list/tag-list.component';

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
  standalone: true,
  imports: [RevealDirective, TagListComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {
  readonly timelineEntries: readonly TimelineEntry[] = [
    {
      id: 'capital-one',
      company: 'Capital One',
      role: 'ServiceNow Application Developer',
      period: '2023 — Present',
      bullets: [
        'Built custom JavaScript and AngularJS components for ITSM and HR modules used enterprise-wide.',
        'Integrated third-party and internal REST APIs to extend ServiceNow platform capabilities.',
        'Collaborated in Agile squads and mentored junior engineers on ServiceNow best practices.',
      ],
      tags: ['ServiceNow', 'JavaScript', 'AngularJS', 'REST APIs', 'Agile'],
    },
    {
      id: 'discover',
      company: 'Discover Financial',
      role: 'ServiceNow Application Developer',
      period: '2021 — 2023',
      bullets: [
        'Developed and maintained enterprise ITSM applications on a large-scale ServiceNow platform.',
        'Delivered workflow automation and portal improvements that reduced manual processing overhead.',
      ],
      tags: ['ServiceNow', 'JavaScript', 'ITSM', 'Agile'],
    },
    {
      id: 'experlogix',
      company: 'Experlogix Inc.',
      role: 'Full-Stack Software Engineer',
      period: '2019 — 2021',
      bullets: [
        'Built and shipped features across the Angular + TypeScript SaaS frontend and backend API layer.',
        'Led UI redesigns and accessibility improvements in close collaboration with Design and Product.',
        'Implemented CRM integrations and database-layer changes supporting enterprise customer workflows.',
      ],
      tags: ['Angular', 'TypeScript', 'SCSS', 'Node.js', 'SQL', 'CRM'],
    },
  ];
}
