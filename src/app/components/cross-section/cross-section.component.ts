import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  Type,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-cross-section',
  standalone: true,
  imports: [NgComponentOutlet, RevealDirective],
  templateUrl: './cross-section.component.html',
  styleUrl: './cross-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    // The cross-section owns its section background. The glass class adds the frosted
    // overlay and gold top/bottom borders (styled in this component's SCSS); without it
    // the section stays transparent over the parallax background.
    '[class.glass-section]': 'glass()',
    '[class.is-in-view]': 'isInView()',
  },
})
export class CrossSectionComponent implements OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  // Anchor id for the section, owned here so the scroll/nav target lives on the wrapper the
  // cross-section renders (standard sections). Bespoke sections keep their own <section id>.
  readonly sectionId = input.required<string>();
  readonly component = input.required<Type<unknown>>();
  readonly glass = input(false);

  // Unified section header content. Supplying an eyebrow or heading switches the cross-section
  // into "standard" mode: it renders the <section> shell, the .section-inner, and the header with
  // consistent spacing. Leaving them unset (hero, contact) keeps the section bespoke — the body
  // component provides its own <section> and header.
  readonly eyebrow = input<string>();
  readonly heading = input<string>();
  readonly subtitle = input<string>();

  readonly hasHeader = computed(() => !!this.eyebrow() || !!this.heading());
  readonly headingId = computed(() => `${this.sectionId()}-heading`);

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
