import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  afterNextRender,
  inject,
  input,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    // Surface styling comes from the global .surface class
    class: 'surface',
    '[class.is-full-page]': 'fullPage()',
    '[class.is-in-view]': 'isInView()',
  },
})
export class ArticleCardComponent implements OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly title = input.required<string>();
  readonly highlight = input<string>();
  // 'eyebrow' (default) → uppercase, wide tracking, accent color override to secondary
  // 'caption' → compact, no uppercase — use for dates and metadata labels
  readonly highlightVariant = input<'eyebrow' | 'caption'>('eyebrow');
  // Pass a non-empty string to show an image, '' to show the placeholder, omit to hide the image area entirely
  readonly imagePath = input<string>();
  readonly imageAlt = input<string>('');
  readonly fullPage = input<boolean>(false);

  readonly isInView = signal(false);

  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      this.observer = new IntersectionObserver(
        ([entry]) => {
          // Teal ring is a touch affordance — desktop relies on :hover instead.
          const isMobile = window.innerWidth < 960;
          this.isInView.set(isMobile && (entry?.isIntersecting ?? false));
        },
        // rootMargin shrinks the detection band to the middle 50 % of the viewport,
        // matching the trigger range used on glass sections.
        { threshold: 0.15, rootMargin: '-25% 0px -25% 0px' },
      );
      this.observer.observe(this.elementRef.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
