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
});
