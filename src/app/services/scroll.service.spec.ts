import { TestBed } from '@angular/core/testing';
import { ScrollService } from './scroll.service';

describe('ScrollService', () => {
  let service: ScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ScrollService] });
    service = TestBed.inject(ScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should scroll to the requested section when it exists', () => {
    const mockElement = { scrollIntoView: jest.fn() } as unknown as HTMLElement;
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    service.scrollToSection('about');

    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

  it('should not throw when the target section does not exist', () => {
    jest.spyOn(document, 'getElementById').mockReturnValue(null);

    expect(() => service.scrollToSection('missing')).not.toThrow();
  });
});
