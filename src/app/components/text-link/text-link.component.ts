import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { LucideArrowUpRight, LucideMail } from '@lucide/angular';

export type TextLinkIcon = 'arrow' | 'mail' | 'underscore' | 'none';

@Component({
  selector: 'app-text-link',
  standalone: true,
  imports: [LucideArrowUpRight, LucideMail],
  templateUrl: './text-link.component.html',
  styleUrl: './text-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextLinkComponent {
  readonly label = input.required<string>();
  readonly icon = input<TextLinkIcon>('none');
  readonly href = input<string | null>(null);
  readonly target = input<string | null>(null);
  readonly iconSize = input<number>(16);

  readonly activated = output<void>();

  // Auto-protect new-tab links, mirroring ActionCallComponent.
  readonly rel = computed(() => (this.target() === '_blank' ? 'noopener noreferrer' : null));

  // Without an href the anchor is a button: it drives the `activated` output and needs
  // explicit keyboard activation. With an href the browser navigates natively, so we
  // leave the event untouched.
  activate(event?: Event): void {
    if (this.href() !== null) {
      return;
    }
    event?.preventDefault();
    this.activated.emit();
  }
}
