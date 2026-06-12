import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { LucideArrowUpRight } from '@lucide/angular';

@Component({
  selector: 'app-action-call',
  standalone: true,
  imports: [LucideArrowUpRight],
  templateUrl: './action-call.component.html',
  styleUrl: './action-call.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-in-view]': 'isInView()',
  },
})
export class ActionCallComponent implements OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly text = input.required<string>();
  readonly arrowIcon = input<boolean>(false);
  readonly brandUnderscore = input<boolean>(false);
  readonly href = input('#');
  readonly target = input<string | null>(null);
  // Lets a consumer override the link's position in the tab order (e.g. the hero CTA is pulled to
  // the front with `1`). Null leaves the anchor at its natural DOM order.
  readonly tabIndex = input<number | null>(null);

  readonly isInView = signal(false);

  // The arrow signals that the link leaves the page, so it carries that as its accessible name
  // (composed into the link's name); a same-tab arrow stays purely decorative.
  readonly iconAriaLabel = computed(() => (this.target() === '_blank' ? 'Opens in new tab' : null));

  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      this.observer = new IntersectionObserver(
        ([entry]) => {
          // Hover affordance for touch — desktop relies on :hover instead.
          const isMobile = window.innerWidth < 960;
          this.isInView.set(isMobile && (entry?.isIntersecting ?? false));
        },
        // Middle 50 % of the viewport, matching glass-section and article-card.
        { threshold: 0.15, rootMargin: '-25% 0px -25% 0px' },
      );
      this.observer.observe(this.elementRef.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
