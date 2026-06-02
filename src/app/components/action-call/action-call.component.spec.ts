import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionCallComponent } from './action-call.component';

describe('ActionCallComponent', () => {
  let component: ActionCallComponent;
  let fixture: ComponentFixture<ActionCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionCallComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionCallComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('text', 'Test Action');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the text label', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Test Action');
  });

  it('omits the arrow icon by default', () => {
    expect(component.arrowIcon()).toBe(false);
  });

  it('omits the brand underscore by default', () => {
    expect(component.brandUnderscore()).toBe(false);
  });

  it('defaults href to #', () => {
    expect(component.href()).toBe('#');
  });
});
