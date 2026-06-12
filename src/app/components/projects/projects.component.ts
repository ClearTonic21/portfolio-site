import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { TagListComponent } from '../tag-list/tag-list.component';
import { ArticleCardComponent } from '../article-card/article-card.component';
import { TextLinkComponent } from '../text-link/text-link.component';

interface ProjectCard {
  readonly id: string;
  readonly title: string;
  readonly fullPage: boolean;
  readonly eyebrow: string;
  readonly description: string;
  readonly imagePath: string;
  readonly imageAlt: string;
  readonly imagePosition: string;
  readonly tags: readonly string[];
  readonly linkHref: string;
  readonly linkLabel: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RevealDirective, TagListComponent, ArticleCardComponent, TextLinkComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  readonly projects: readonly ProjectCard[] = [
    {
      id: 'canopy-trails',
      title: 'Canopy Trails',
      fullPage: false,
      eyebrow: 'Personal Project',
      description:
        'Organize your thoughts into vibrant forest trails. Create each trail with any number of connected "trees", and fill them with individual "leaves" of information. Watch your ideas grow into a beautiful forest',
      imagePath: 'assets/images/app_screenshot.png',
      imageAlt: 'Screenshot of the Canopy Trails app',
      imagePosition: 'top',
      tags: ['Angular', 'TypeScript', 'SCSS', 'UX Design'],
      linkHref: '#',
      linkLabel: 'Coming Soon',
    },
    {
      id: 'cleartonic-game',
      title: 'ClearTonic Games_',
      fullPage: false,
      eyebrow: 'Indie Game Design and Development',
      description:
        'PuzzleRobot* is a solo-developed pixel art game built in Godot, from concept and art direction to mechanics. ClearTonic Games_ is the studio label for every game I create. *Title not final*',
      imagePath: 'assets/images/game_screenshot.png',
      imageAlt: 'Screenshot of a ClearTonic Games_ indie game',
      imagePosition: 'bottom',
      tags: ['Godot', 'Pixel Art', 'Game Design', 'Solo Development'],
      linkHref: 'https://github.com/ClearTonic21',
      linkLabel: 'View on GitHub',
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
      imagePosition: 'center',
      tags: ['Angular 20', 'TypeScript', 'SCSS', 'AI-Directed Dev'],
      linkHref: 'https://github.com/esphi/my-designs-site',
      linkLabel: 'View Source',
    },
  ];
}
