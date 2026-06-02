import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MotionService {
  readonly reducedMotion = signal(this.getInitialReducedMotion());

  constructor() {
    effect(() => {
      document.body.dataset['reducedMotion'] = this.reducedMotion() ? 'true' : 'false';
      localStorage.setItem('portfolio-reduced-motion', this.reducedMotion().toString());
    });
  }

  toggleReducedMotion(): void {
    this.reducedMotion.update((current: boolean) => !current);
  }

  private getInitialReducedMotion(): boolean {
    const savedValue = localStorage.getItem('portfolio-reduced-motion');

    if (savedValue === 'true') {
      return true;
    }

    if (savedValue === 'false') {
      return false;
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
