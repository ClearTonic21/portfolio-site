import { TestBed } from '@angular/core/testing';
import { ContrastService } from './contrast.service';

describe('ContrastService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.removeAttribute('data-high-contrast');
    TestBed.configureTestingModule({ providers: [ContrastService] });
  });

  it('should be created', () => {
    expect(TestBed.inject(ContrastService)).toBeTruthy();
  });

  it('should initialize high contrast from localStorage', () => {
    localStorage.setItem('portfolio-high-contrast', 'true');
    const service = new ContrastService();
    expect(service.highContrast()).toBe(true);
  });

  it('should toggle high contrast, reflect it on the body, and persist it', () => {
    const service = TestBed.inject(ContrastService);

    service.toggleHighContrast();
    expect(service.highContrast()).toBe(true);
    expect(document.body.dataset['highContrast']).toBe('true');
    expect(localStorage.getItem('portfolio-high-contrast')).toBe('true');

    service.toggleHighContrast();
    expect(service.highContrast()).toBe(false);
    expect(document.body.dataset['highContrast']).toBe('false');
    expect(localStorage.getItem('portfolio-high-contrast')).toBe('false');
  });
});
