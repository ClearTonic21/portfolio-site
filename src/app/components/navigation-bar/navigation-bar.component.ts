import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  input,
  afterNextRender,
  OnDestroy,
} from '@angular/core';
import {
  LucideChevronLeft,
  LucideChevronRight,
  LucideCircle,
  LucideCircleDashed,
} from '@lucide/angular';
import { ScrollService } from '../../services/scroll.service';
import { MotionService } from '../../services/motion.service';

export interface NavLink {
  readonly id: string;
  readonly label: string;
}

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [LucideChevronLeft, LucideChevronRight, LucideCircle, LucideCircleDashed],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationBarComponent implements OnDestroy {
  private readonly scrollService = inject(ScrollService);
  readonly motionService = inject(MotionService);
  readonly navLinks = input.required<readonly NavLink[]>();

  readonly isMenuOpen = signal(false);
  readonly isNavHidden = signal(false);
  readonly isNavCollapsed = signal(false);

  private readonly scrollHandler = () => this.onScroll();
  private readonly resizeHandler = () => this.onResize();
  private lastScrollY = 0;

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

  toggleNavCollapse(): void {
    this.isNavCollapsed.update((c) => !c);
  }

  private onScroll(): void {
    const currentScrollY = window.scrollY;
    this.isNavHidden.set(currentScrollY > this.lastScrollY && currentScrollY > 100);
    this.lastScrollY = currentScrollY;
  }

  private onResize(): void {
    if (window.innerWidth >= NavigationBarComponent.DESKTOP_BREAKPOINT) {
      this.isNavCollapsed.set(window.innerHeight < NavigationBarComponent.COMPACT_HEIGHT);
    }
  }
}
