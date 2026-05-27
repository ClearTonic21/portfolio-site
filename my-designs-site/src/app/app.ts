import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  effect,
  inject,
  afterNextRender,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from './services/scroll.service';
import { MotionService } from './services/motion.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {
  private readonly scrollService = inject(ScrollService);
  readonly motionService = inject(MotionService);

  readonly isMenuOpen = signal(false);
  readonly isNavHidden = signal(false);
  readonly activeSection = signal<string | null>(null);
  readonly isMotionButtonHidden = computed(() => {
    return typeof window === 'undefined' ? true : window.scrollY > window.innerHeight * 0.8;
  });

  private intersectionObservers: IntersectionObserver[] = [];
  private lastScrollY = 0;

  constructor() {
    afterNextRender(() => {
      this.initializeIntersectionObservers();
      this.initializeScrollListener();
    });
  }

  ngOnDestroy(): void {
    this.intersectionObservers.forEach((observer) => observer.disconnect());
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

  private initializeIntersectionObservers(): void {
    const sectionIds = ['hero', 'about', 'experience', 'projects', 'contact'];

    sectionIds.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.activeSection.set(sectionId);
          }
        },
        { threshold: 0.4 }
      );

      observer.observe(section);
      this.intersectionObservers.push(observer);
    });
  }

  private initializeScrollListener(): void {
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
        this.isNavHidden.set(true);
      } else {
        this.isNavHidden.set(false);
      }

      this.lastScrollY = currentScrollY;
    });
  }
}
