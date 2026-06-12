import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.removeAttribute('data-theme');
    TestBed.configureTestingModule({ providers: [ThemeService] });
  });

  it('should be created', () => {
    expect(TestBed.inject(ThemeService)).toBeTruthy();
  });

  it('should initialize the theme from localStorage', () => {
    localStorage.setItem('portfolio-theme', 'light');
    const service = new ThemeService();
    expect(service.theme()).toBe('light');
    expect(service.isLight()).toBe(true);
  });

  it('should toggle the theme, reflect it on the body, and persist it', () => {
    const service = TestBed.inject(ThemeService);

    service.toggleTheme();
    expect(service.theme()).toBe('light');
    expect(document.body.dataset['theme']).toBe('light');
    expect(localStorage.getItem('portfolio-theme')).toBe('light');

    service.toggleTheme();
    expect(service.theme()).toBe('dark');
    expect(document.body.dataset['theme']).toBe('dark');
    expect(localStorage.getItem('portfolio-theme')).toBe('dark');
  });
});
