import { ChangeDetectionStrategy, Component, Type, input } from '@angular/core';
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
  },
})
export class CrossSectionComponent {
  readonly component = input.required<Type<unknown>>();
  readonly glass = input(false);
}
