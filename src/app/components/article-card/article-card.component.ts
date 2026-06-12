import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  afterNextRender,
  computed,
  contentChild,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { LucideX } from '@lucide/angular';
import { TextLinkComponent } from '../text-link/text-link.component';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [LucideX],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    // Surface styling comes from the global .surface class
    class: 'surface',
    // The card is a tab stop only when it has no expandable image. When an image IS present the
    // image expander button owns the card's tab stop instead (focusing it still triggers the hover
    // lift/ring via :focus-within), so the host removes its own tabindex to avoid a double stop.
    '[attr.tabindex]': 'hostTabIndex()',
    '[class.is-full-page]': 'fullPage()',
    '[class.is-in-view]': 'isInView()',
    '[style.--article-card-image-position]': 'imagePosition()',
  },
})
export class ArticleCardComponent implements OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly title = input.required<string>();
  // Eyebrow label above the title (gold).
  readonly highlight = input<string>();
  // Caption under the title (e.g. a role or subtitle) — DM Sans, accent color.
  readonly caption = input<string>();
  // Pass a non-empty string to show an image, '' to show the placeholder, omit to hide the image area entirely
  readonly imagePath = input<string>();
  readonly imageAlt = input<string>('');
  // Crop focal point for the image — maps to `object-position`, so it controls which part of the
  // screenshot stays in frame once `object-fit: cover` crops it (e.g. 'top', 'center', '50% 20%').
  readonly imagePosition = input<string>('center');
  readonly fullPage = input<boolean>(false);
  // Body copy rendered by the card (same treatment everywhere it's used).
  readonly description = input<string>();

  // Whether a link was projected, so the centered link slot only renders when filled.
  readonly projectedLink = contentChild(TextLinkComponent);

  // An expandable image exists only when imagePath is a non-empty string (a real image, not the
  // '' placeholder). That gates the click-to-expand affordance and the tab-stop reassignment.
  readonly hasExpandableImage = computed(() => !!this.imagePath());
  readonly hostTabIndex = computed<number | null>(() => (this.hasExpandableImage() ? null : 0));
  readonly expandLabel = computed(() => {
    const alt = this.imageAlt();
    return alt ? `Expand image: ${alt}` : 'Expand image';
  });

  readonly isModalOpen = signal(false);
  private readonly modal = viewChild<ElementRef<HTMLDialogElement>>('imageModal');

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

  openImageModal(): void {
    // showModal() promotes the dialog to the top layer, so it overlays the whole site and is not
    // clipped by the card's overflow:hidden or repositioned by its hover transform.
    this.modal()?.nativeElement.showModal();
    this.isModalOpen.set(true);
  }

  closeImageModal(): void {
    // close() fires the dialog's `close` event, which flips isModalOpen back via onModalClose().
    this.modal()?.nativeElement.close();
  }

  onModalClose(): void {
    this.isModalOpen.set(false);
  }

  onBackdropClick(event: MouseEvent): void {
    // A click whose target is the dialog element itself landed on the empty area around the image
    // (or the backdrop) — i.e. outside the image — so close. Clicks on the image or close button
    // target those elements instead and are left alone.
    if (event.target === this.modal()?.nativeElement) {
      this.closeImageModal();
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
