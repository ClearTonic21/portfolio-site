import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextLinkComponent } from './text-link.component';

describe('TextLinkComponent', () => {
  let component: TextLinkComponent;
  let fixture: ComponentFixture<TextLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextLinkComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'About');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the label text', () => {
    const anchor: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
    expect(anchor.textContent).toContain('About');
  });

  it('renders as a button (role/tabindex, no href) when no href is provided', () => {
    const anchor: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
    expect(anchor.getAttribute('role')).toBe('button');
    expect(anchor.getAttribute('tabindex')).toBe('0');
    expect(anchor.hasAttribute('href')).toBe(false);
  });

  it('emits activated on click in button mode', () => {
    const spy = jest.fn();
    component.activated.subscribe(spy);
    fixture.nativeElement.querySelector('a').click();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('shows the brand underscore for the underscore icon', () => {
    fixture.componentRef.setInput('icon', 'underscore');
    fixture.detectChanges();
    const accent: HTMLElement | null = fixture.nativeElement.querySelector('.accent');
    expect(accent?.textContent).toBe('_');
  });

  it('renders an arrow carrying the link-arrow class for the arrow icon', () => {
    fixture.componentRef.setInput('icon', 'arrow');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.link-arrow')).toBeTruthy();
  });

  it('renders a real link (href + auto rel, no button role) when an href is set', () => {
    fixture.componentRef.setInput('href', 'https://example.com');
    fixture.componentRef.setInput('target', '_blank');
    fixture.detectChanges();
    const anchor: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
    expect(anchor.getAttribute('href')).toBe('https://example.com');
    expect(anchor.getAttribute('rel')).toBe('noopener noreferrer');
    expect(anchor.getAttribute('role')).toBeNull();
  });

  it('does not emit activated when an href is set (native navigation)', () => {
    const spy = jest.fn();
    component.activated.subscribe(spy);
    fixture.componentRef.setInput('href', 'https://example.com');
    fixture.detectChanges();
    component.activate();
    expect(spy).not.toHaveBeenCalled();
  });
});
