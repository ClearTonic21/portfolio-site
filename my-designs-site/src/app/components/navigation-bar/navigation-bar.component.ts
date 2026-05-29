import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  afterNextRender,
  OnDestroy,
} from '@angular/core';
import { ScrollService } from '../../services/scroll.service';
import { MotionService } from '../../services/motion.service';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationBarComponent implements OnDestroy {
  private readonly scrollService = inject(ScrollService);
  readonly motionService = inject(MotionService);

  readonly isMenuOpen = signal(false);
  // Scroll-hide only applies on mobile; CSS overrides it on desktop via &.is-hidden { transform: none }
  readonly isNavHidden = signal(false);

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

  navLinkClick(sectionId: string): void {
    this.isMenuOpen.set(false);
    this.scrollService.scrollToSection(sectionId);
  }

  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  private onScroll(): void {
    const currentScrollY = window.scrollY;
    this.isNavHidden.set(currentScrollY > this.lastScrollY && currentScrollY > 100);
    this.lastScrollY = currentScrollY;
  }
}
