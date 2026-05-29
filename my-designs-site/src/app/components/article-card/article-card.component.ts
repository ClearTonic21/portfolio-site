import { Component, ChangeDetectionStrategy, input } from '@angular/core';

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
  },
})
export class ArticleCardComponent {
  readonly title = input.required<string>();
  readonly highlight = input<string>();
  // 'eyebrow' (default) → uppercase, wide tracking, accent color override to secondary
  // 'caption' → compact, no uppercase — use for dates and metadata labels
  readonly highlightVariant = input<'eyebrow' | 'caption'>('eyebrow');
  // Pass a non-empty string to show an image, '' to show the placeholder, omit to hide the image area entirely
  readonly imagePath = input<string>();
  readonly imageAlt = input<string>('');
  readonly fullPage = input<boolean>(false);
}
