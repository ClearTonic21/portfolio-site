import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { LucideArrowUpRight } from '@lucide/angular';
import { TagListComponent } from '../tag-list/tag-list.component';
import { ArticleCardComponent } from '../article-card/article-card.component';

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

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RevealDirective, LucideArrowUpRight, TagListComponent, ArticleCardComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  readonly projects: readonly ProjectCard[] = [
    {
      id: 'cleartonic-game',
      title: 'ClearTonic Games_',
      fullPage: false,
      eyebrow: 'Indie Game Design and Development',
      description:
        'Solo-developed pixel art games built in Godot, from concept and art direction to mechanics and release. ClearTonic Games_ is the studio label for everything I ship.',
      imagePath: 'assets/images/game_screenshot.png',
      imageAlt: 'Screenshot of a ClearTonic Games_ indie game',
      tags: ['Godot', 'Pixel Art', 'Game Design', 'Solo Dev'],
      linkHref: 'https://github.com/ClearTonic21',
      linkLabel: 'View on GitHub',
    },
    {
      id: 'canopy-trails',
      title: 'Canopy Trails',
      fullPage: false,
      eyebrow: 'Personal Project',
      description:
        'A trail and nature-spot information organizer built for hikers who want to track visited locations, save notes, and plan future adventures without a paywall.',
      imagePath: 'assets/images/app_screenshot.png',
      imageAlt: 'Screenshot of the Canopy Trails app',
      tags: ['Angular', 'TypeScript', 'SCSS', 'UX Design'],
      linkHref: '#',
      linkLabel: 'Coming Soon',
    },
    {
      id: 'portfolio-site',
      title: 'This Portfolio Site',
      fullPage: true,
      eyebrow: 'Design & Dev',
      description:
        'An Angular 20 single-page portfolio designed from scratch and built through AI-directed development — treating Claude as a collaborative engineering partner from spec to deploy.',
      imagePath: '',
      imageAlt: 'Screenshot of this portfolio site',
      tags: ['Angular 20', 'TypeScript', 'SCSS', 'AI-Directed Dev'],
      linkHref: 'https://github.com/esphi/my-designs-site',
      linkLabel: 'View Source',
    },
  ];
}
