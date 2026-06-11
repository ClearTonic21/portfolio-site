import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import {
  LucideCircle,
  LucideCircleDashed,
  LucideContrast,
  LucideMoon,
  LucideSun,
} from '@lucide/angular';

export type IconButtonIcon = 'motion' | 'theme' | 'contrast';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [LucideCircle, LucideCircleDashed, LucideContrast, LucideMoon, LucideSun],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonComponent {
  // A named icon picks one of the built-in Lucide glyphs; leaving it null hands the
  // glyph slot to the consumer's projected <svg> (the `<ng-content>` fallback).
  readonly icon = input<IconButtonIcon | null>(null);
  readonly active = input<boolean>(false);
  readonly label = input.required<string>();
  readonly tooltip = input<string | null>(null);
  readonly size = input<number>(20);

  readonly activated = output<void>();
}
