import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconButtonComponent } from './icon-button.component';

describe('IconButtonComponent', () => {
  let component: IconButtonComponent;
  let fixture: ComponentFixture<IconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Toggle setting');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('exposes the label as the button aria-label', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('aria-label')).toBe('Toggle setting');
  });

  it('reflects the active state via aria-pressed and the is-active class', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('aria-pressed')).toBe('false');
    expect(button.classList.contains('is-active')).toBe(false);

    fixture.componentRef.setInput('active', true);
    fixture.detectChanges();

    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(button.classList.contains('is-active')).toBe(true);
  });

  it('emits activated on click', () => {
    const spy = jest.fn();
    component.activated.subscribe(spy);
    fixture.nativeElement.querySelector('button').click();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('renders the dual-circle slide glyph for the motion icon', () => {
    fixture.componentRef.setInput('icon', 'motion');
    fixture.detectChanges();
    const glyph: HTMLElement | null = fixture.nativeElement.querySelector('.icon-button__glyph--slide');
    expect(glyph).toBeTruthy();
    expect(glyph?.querySelectorAll('svg').length).toBe(2);
  });

  it('renders the dual moon/sun glyph for the theme icon', () => {
    fixture.componentRef.setInput('icon', 'theme');
    fixture.detectChanges();
    const glyph: HTMLElement | null = fixture.nativeElement.querySelector('.icon-button__glyph--cross');
    expect(glyph).toBeTruthy();
    expect(glyph?.querySelectorAll('svg').length).toBe(2);
  });

  it('renders a single glyph for the contrast icon', () => {
    fixture.componentRef.setInput('icon', 'contrast');
    fixture.detectChanges();
    const glyph: HTMLElement | null = fixture.nativeElement.querySelector('.icon-button__glyph--single');
    expect(glyph).toBeTruthy();
    expect(glyph?.querySelectorAll('svg').length).toBe(1);
  });

  it('falls back to projected content when no icon name is given', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    const glyph: HTMLElement | null = button.querySelector('.icon-button__glyph');
    expect(glyph).toBeTruthy();
    expect(glyph?.classList.contains('icon-button__glyph--slide')).toBe(false);
    expect(glyph?.classList.contains('icon-button__glyph--cross')).toBe(false);
    expect(glyph?.classList.contains('icon-button__glyph--single')).toBe(false);
  });
});
