import { Directive, ElementRef, inject, OnDestroy, afterNextRender } from '@angular/core';
import { MotionService } from '../services/motion.service';

@Directive({
  selector: '[appReveal]',
})
export class RevealDirective implements OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly motionService = inject(MotionService);
  private intersectionObserver?: IntersectionObserver;

  constructor() {
    if (this.motionService.reducedMotion()) {
      this.elementRef.nativeElement.classList.add('is-visible');
      return;
    }

    afterNextRender(() => {
      this.intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.elementRef.nativeElement.classList.add('is-visible');
            this.intersectionObserver?.unobserve(entry.target);
          }
        },
        { threshold: 0.12 },
      );

      this.intersectionObserver.observe(this.elementRef.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.intersectionObserver?.disconnect();
  }
}
