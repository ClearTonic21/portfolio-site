import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { MotionService } from '../../services/motion.service';
import { ActionCallComponent } from '../action-call/action-call.component';

const heroEntranceAnimation = trigger('heroEntrance', [
  transition(':enter', [
    query(
      '.hero-animate',
      [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        stagger(80, [
          animate(
            '700ms cubic-bezier(0.16, 1, 0.3, 1)',
            style({ opacity: 1, transform: 'translateY(0)' }),
          ),
        ]),
      ],
      { optional: true },
    ),
  ]),
]);

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ActionCallComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [heroEntranceAnimation],
})
export class HeroComponent {
  readonly motionService = inject(MotionService);
  readonly resumeHref = 'Eli_Philpott_Resume.pdf';
}
