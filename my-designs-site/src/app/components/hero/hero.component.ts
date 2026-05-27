import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { ScrollService } from '../../services/scroll.service';
import { MotionService } from '../../services/motion.service';

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
  imports: [],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [heroEntranceAnimation],
})
export class HeroComponent {
  private readonly scrollService = inject(ScrollService);
  readonly motionService = inject(MotionService);
  readonly resumeHref = '../../../../public/Eli_Philpott_Resume.pdf';

  viewWork(): void {
    this.scrollService.scrollToSection('about');
  }
}
