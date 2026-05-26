import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, Signal } from '@angular/core';
import { RevealDirective } from './reveal.directive';
import { MotionService } from '../services/motion.service';

@Component({
  standalone: true,
  imports: [RevealDirective],
  template: `<div appReveal>content</div>`,
})
class TestHostComponent {}

describe('RevealDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should attach to host element', () => {
    expect(fixture.nativeElement.querySelector('[appReveal]')).toBeTruthy();
  });

  it('should add is-visible immediately when reduced motion is enabled', async () => {
    await TestBed.resetTestingModule();

    @Component({
      standalone: true,
      imports: [RevealDirective],
      template: `<div appReveal>content</div>`,
    })
    class ReducedMotionHostComponent {}

    await TestBed.configureTestingModule({
      imports: [ReducedMotionHostComponent],
      providers: [
        {
          provide: MotionService,
          useValue: {
            reducedMotion: signal(true) as Signal<boolean>,
          },
        },
      ],
    }).compileComponents();

    const reducedFixture = TestBed.createComponent(ReducedMotionHostComponent);
    reducedFixture.detectChanges();

    const revealedElement = reducedFixture.nativeElement.querySelector('[appReveal]');
    expect(revealedElement.classList.contains('is-visible')).toBe(true);
  });
});
