import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  input,
  afterNextRender,
  OnDestroy,
} from '@angular/core';
import { LucideChevronLeft, LucideChevronRight, LucideX } from '@lucide/angular';
import { ScrollService } from '../../services/scroll.service';
import { MotionService } from '../../services/motion.service';
import { TextLinkComponent } from '../text-link/text-link.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';

export interface NavLink {
  readonly id: string;
  readonly label: string;
}

@Component({
  selector: 'app-navigation-bar',
  imports: [
    LucideChevronLeft,
    LucideChevronRight,
    LucideX,
    TextLinkComponent,
    IconButtonComponent,
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
  host: {
    '(document:keydown.escape)': 'onEscape()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationBarComponent implements OnDestroy {
  private readonly scrollService = inject(ScrollService);
  readonly motionService = inject(MotionService);
  readonly navLinks = input.required<readonly NavLink[]>();

  readonly isMenuOpen = signal(false);
  readonly isNavHidden = signal(false);
  readonly isNavCollapsed = signal(false);

  // Appearance toggles are presentational for now — they flip the button's own state but do
  // not yet drive any site-wide theme change. Real light-mode / high-contrast wiring lands later.
  readonly isLightMode = signal(false);
  readonly isHighContrast = signal(false);

  private readonly scrollHandler = () => this.onScroll();
  private readonly resizeHandler = () => this.onResize();
  private lastScrollY = 0;
  // Once the user works the chevron, the sidebar stops auto-collapsing/expanding on scroll.
  private hasManuallyToggledNav = false;

  private static readonly DESKTOP_BREAKPOINT = 960;
  private static readonly COMPACT_HEIGHT = 580;

  constructor() {
    afterNextRender(() => {
      window.addEventListener('scroll', this.scrollHandler);
      window.addEventListener('resize', this.resizeHandler);
      this.onResize();
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollHandler);
    window.removeEventListener('resize', this.resizeHandler);
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

  onEscape(): void {
    if (this.isMenuOpen()) {
      this.closeMenu();
    }
  }

  toggleNavCollapse(): void {
    this.hasManuallyToggledNav = true;
    this.isNavCollapsed.update((c) => !c);
  }

  toggleLightMode(): void {
    this.isLightMode.update((light) => !light);
  }

  toggleHighContrast(): void {
    this.isHighContrast.update((high) => !high);
  }

  private onScroll(): void {
    const currentScrollY = window.scrollY;

    // Mobile: hide the top bar on scroll-down past 100px.
    this.isNavHidden.set(currentScrollY > this.lastScrollY && currentScrollY > 100);

    // Desktop: open at the top of the page, collapse once the user scrolls past the
    // middle of the hero. Disabled for good once the user works the chevron manually, so
    // their explicit choice is never overridden by scrolling.
    if (!this.hasManuallyToggledNav && window.innerWidth >= NavigationBarComponent.DESKTOP_BREAKPOINT) {
      const hero = document.getElementById('hero');
      if (hero) {
        const threshold = hero.offsetHeight * 0.5;
        const wasPast = this.lastScrollY > threshold;
        const isPast = currentScrollY > threshold;
        if (isPast !== wasPast) {
          this.isNavCollapsed.set(isPast);
        }
      }
    }

    this.lastScrollY = currentScrollY;
  }

  private onResize(): void {
    if (window.innerWidth >= NavigationBarComponent.DESKTOP_BREAKPOINT) {
      this.isNavCollapsed.set(window.innerHeight < NavigationBarComponent.COMPACT_HEIGHT);
    }
  }
}
