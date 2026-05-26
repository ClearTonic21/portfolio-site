import { TestBed } from '@angular/core/testing';
import { MotionService } from './motion.service';

describe('MotionService', () => {
  let service: MotionService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [MotionService] });
    service = TestBed.inject(MotionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize reducedMotion from localStorage', () => {
    localStorage.setItem('portfolio-reduced-motion', 'true');
    service = new MotionService();
    expect(service.reducedMotion()).toBe(true);
  });

  it('should toggle reducedMotion and persist the preference', () => {
    service.toggleReducedMotion();
    expect(service.reducedMotion()).toBe(true);
    expect(localStorage.getItem('portfolio-reduced-motion')).toBe('true');

    service.toggleReducedMotion();
    expect(service.reducedMotion()).toBe(false);
    expect(localStorage.getItem('portfolio-reduced-motion')).toBe('false');
  });
});
