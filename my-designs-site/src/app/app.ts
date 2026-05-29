import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  afterNextRender,
  OnDestroy,
} from '@angular/core';
import { ScrollService } from './services/scroll.service';
import { MotionService } from './services/motion.service';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
    ContactComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {
  private readonly scrollService = inject(ScrollService);
  readonly motionService = inject(MotionService);

  readonly isMenuOpen = signal(false);
  readonly isNavHidden = signal(false);
  readonly isMotionButtonHidden = signal(false);

  private readonly scrollHandler = () => this.onScroll();
  private lastScrollY = 0;

  constructor() {
    afterNextRender(() => {
      window.addEventListener('scroll', this.scrollHandler);
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  onNavLinkClick(sectionId: string): void {
    this.isMenuOpen.set(false);
    this.scrollService.scrollToSection(sectionId);
  }

  toggleMenu(): void {
    this.isMenuOpen.update((current) => !current);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  private onScroll(): void {
    const currentScrollY = window.scrollY;
    this.isNavHidden.set(currentScrollY > this.lastScrollY && currentScrollY > 100);
    this.isMotionButtonHidden.set(currentScrollY > window.innerHeight * 0.8);
    this.lastScrollY = currentScrollY;
  }
}
