import { Component, ChangeDetectionStrategy, Type, inject } from '@angular/core';
import { MotionService } from './services/motion.service';
import { ThemeService } from './services/theme.service';
import {
  NavigationBarComponent,
  NavLink,
} from './components/navigation-bar/navigation-bar.component';
import { CrossSectionComponent } from './components/cross-section/cross-section.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';

interface CrossSection {
  readonly id: string;
  readonly label: string;
  readonly component: Type<unknown>;
  readonly enabled: boolean;
  readonly glass: boolean;
  readonly eyebrow?: string;
  readonly heading?: string;
  readonly subtitle?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavigationBarComponent, CrossSectionComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly motionService = inject(MotionService);
  readonly themeService = inject(ThemeService);

  readonly sections: readonly CrossSection[] = [
    { id: 'hero', label: 'Hero', component: HeroComponent, enabled: true, glass: false },
    {
      id: 'about',
      label: 'About',
      component: AboutComponent,
      enabled: true,
      glass: true,
      eyebrow: 'About',
      heading: 'The Details',
    },
    {
      id: 'experience',
      label: 'Experience',
      component: ExperienceComponent,
      enabled: true,
      glass: false,
      eyebrow: 'Experience',
      heading: 'Work History',
    },
    {
      id: 'projects',
      label: 'Projects',
      component: ProjectsComponent,
      enabled: true,
      glass: false,
      eyebrow: 'Projects',
      heading: "Things I've Built",
    },
    { id: 'contact', label: 'Contact', component: ContactComponent, enabled: true, glass: false },
  ];

  // Sections visible in the nav: enabled, non-hero sections only.
  readonly navLinks: readonly NavLink[] = this.sections
    .filter((s) => s.enabled && s.id !== 'hero')
    .map(({ id, label }) => ({ id, label }));
}
