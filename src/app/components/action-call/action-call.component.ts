import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideArrowUpRight } from '@lucide/angular';

@Component({
  selector: 'app-action-call',
  standalone: true,
  imports: [LucideArrowUpRight],
  templateUrl: './action-call.component.html',
  styleUrl: './action-call.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionCallComponent {
  readonly text = input.required<string>();
  readonly arrowIcon = input<boolean>(false);
  readonly brandUnderscore = input<boolean>(false);
  readonly href = input('#');
  readonly target = input<string | null>(null);
}
