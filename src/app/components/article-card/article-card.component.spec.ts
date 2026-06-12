import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleCardComponent } from './article-card.component';

describe('ArticleCardComponent', () => {
  let component: ArticleCardComponent;
  let fixture: ComponentFixture<ArticleCardComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleCardComponent);
    component = fixture.componentInstance;
    host = fixture.nativeElement as HTMLElement;
    fixture.componentRef.setInput('title', 'Test Card');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('keeps the host as the tab stop when there is no expandable image', () => {
    expect(host.getAttribute('tabindex')).toBe('0');
    expect(host.querySelector('.article-card-image-button')).toBeNull();
    expect(host.querySelector('dialog')).toBeNull();
  });

  it('moves the tab stop to the image expander when an image is present', () => {
    fixture.componentRef.setInput('imagePath', 'assets/images/app_screenshot.png');
    fixture.componentRef.setInput('imageAlt', 'App screenshot');
    fixture.detectChanges();

    // The host steps out of the tab order; the image button takes over the card's tab stop.
    expect(host.getAttribute('tabindex')).toBeNull();

    const button = host.querySelector<HTMLButtonElement>('.article-card-image-button');
    expect(button).toBeTruthy();
    expect(button?.getAttribute('aria-label')).toBe('Expand image: App screenshot');
  });

  it('renders the placeholder (no expander) when imagePath is an empty string', () => {
    fixture.componentRef.setInput('imagePath', '');
    fixture.detectChanges();

    expect(host.getAttribute('tabindex')).toBe('0');
    expect(host.querySelector('.article-card-image-placeholder')).toBeTruthy();
    expect(host.querySelector('.article-card-image-button')).toBeNull();
    expect(host.querySelector('dialog')).toBeNull();
  });

  it('provides the expandable image modal with a labelled close control', () => {
    fixture.componentRef.setInput('imagePath', 'assets/images/game_screenshot.png');
    fixture.detectChanges();

    const dialog = host.querySelector('dialog.article-card-modal');
    expect(dialog).toBeTruthy();
    expect(dialog?.getAttribute('aria-label')).toBe('Expanded image view');
    expect(
      dialog?.querySelector('.article-card-modal-close')?.getAttribute('aria-label'),
    ).toBe('Close image view');
  });
});
