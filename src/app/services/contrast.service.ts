import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContrastService {
  readonly highContrast = signal(this.getInitialHighContrast());

  constructor() {
    effect(() => {
      document.body.dataset['highContrast'] = this.highContrast() ? 'true' : 'false';
      localStorage.setItem('portfolio-high-contrast', this.highContrast().toString());
    });
  }

  toggleHighContrast(): void {
    this.highContrast.update((current: boolean) => !current);
  }

  private getInitialHighContrast(): boolean {
    const savedValue = localStorage.getItem('portfolio-high-contrast');

    if (savedValue === 'true') {
      return true;
    }

    if (savedValue === 'false') {
      return false;
    }

    return (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-contrast: more)').matches
    );
  }
}
