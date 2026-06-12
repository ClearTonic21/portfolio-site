import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrossSectionComponent } from './cross-section.component';

@Component({
  standalone: true,
  template: '<p class="test-content">projected</p>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestContentComponent {}

describe('CrossSectionComponent', () => {
  let component: CrossSectionComponent;
  let fixture: ComponentFixture<CrossSectionComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrossSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CrossSectionComponent);
    component = fixture.componentInstance;
    host = fixture.nativeElement as HTMLElement;
    fixture.componentRef.setInput('sectionId', 'about');
    fixture.componentRef.setInput('component', TestContentComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the configured content component', () => {
    expect(host.querySelector('.test-content')).toBeTruthy();
  });

  it('omits the glass background by default', () => {
    expect(host.classList.contains('glass-section')).toBe(false);
  });

  it('applies the glass background when glass is enabled', () => {
    fixture.componentRef.setInput('glass', true);
    fixture.detectChanges();
    expect(host.classList.contains('glass-section')).toBe(true);
  });

  it('stays bespoke (no section shell) when no eyebrow or heading is supplied', () => {
    expect(host.querySelector('section')).toBeNull();
    expect(host.querySelector('.section-header')).toBeNull();
  });

  it('renders the unified header and section shell when a heading is supplied', () => {
    fixture.componentRef.setInput('eyebrow', 'About');
    fixture.componentRef.setInput('heading', 'The Details');
    fixture.detectChanges();

    const section = host.querySelector('section');
    expect(section?.id).toBe('about');
    expect(section?.getAttribute('aria-labelledby')).toBe('about-heading');

    const heading = host.querySelector('.section-heading');
    expect(heading?.id).toBe('about-heading');
    expect(heading?.textContent?.trim()).toBe('The Details');

    // Eyebrow keeps the brand accent underscore beside its label.
    expect(host.querySelector('.section-eyebrow')?.textContent).toContain('About');
    expect(host.querySelector('.section-eyebrow .accent')?.textContent).toBe('_');
  });
});
