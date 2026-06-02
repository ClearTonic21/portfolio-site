import { Injectable, inject } from '@angular/core';
import { MotionService } from './motion.service';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private readonly motionService = inject(MotionService);

  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    section.scrollIntoView({
      behavior: this.motionService.reducedMotion() ? 'instant' : 'smooth',
      block: 'start',
    });
  }
}
