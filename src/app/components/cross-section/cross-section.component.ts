import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  Type,
  afterNextRender,
  inject,
  input,
  signal,
} from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-cross-section',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './cross-section.component.html',
  styleUrl: './cross-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    // The cross-section owns its section background. The global .glass-section
    // class adds the frosted overlay and gold top/bottom borders; without it the
    // section stays transparent over the parallax background.
    '[class.glass-section]': 'glass()',
    '[class.is-in-view]': 'isInView()',
  },
})
export class CrossSectionComponent implements OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly component = input.required<Type<unknown>>();
  readonly glass = input(false);

  readonly isInView = signal(false);

  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      this.observer = new IntersectionObserver(
        ([entry]) => {
          // Glow is a touch-friendly affordance — desktop relies on :hover instead.
          const isMobile = window.innerWidth < 960;
          this.isInView.set(isMobile && (entry?.isIntersecting ?? false));
        },
        // rootMargin shrinks the detection band to the middle 50% of the viewport,
        // halving the scroll range over which the glow is active.
        { threshold: 0.15, rootMargin: '-25% 0px -25% 0px' },
      );
      this.observer.observe(this.elementRef.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
