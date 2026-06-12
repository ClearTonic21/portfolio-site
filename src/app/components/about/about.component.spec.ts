import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders body content only — the eyebrow/heading are owned by CrossSectionComponent', () => {
    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('section')).toBeNull();
    expect(host.querySelector('.about-layout')).toBeTruthy();
  });
});
