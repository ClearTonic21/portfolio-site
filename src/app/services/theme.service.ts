import { Injectable, computed, effect, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  readonly theme = signal<Theme>(this.getInitialTheme());
  readonly isLight = computed(() => this.theme() === 'light');

  constructor() {
    effect(() => {
      const theme = this.theme();
      document.body.dataset['theme'] = theme;
      localStorage.setItem('portfolio-theme', theme);
    });
  }

  toggleTheme(): void {
    this.theme.update((current: Theme) => (current === 'light' ? 'dark' : 'light'));
  }

  private getInitialTheme(): Theme {
    const savedValue = localStorage.getItem('portfolio-theme');

    if (savedValue === 'light' || savedValue === 'dark') {
      return savedValue;
    }

    const prefersLight =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-color-scheme: light)').matches;

    return prefersLight ? 'light' : 'dark';
  }
}
