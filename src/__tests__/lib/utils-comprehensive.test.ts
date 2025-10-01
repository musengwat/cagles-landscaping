import {
  formatPhoneNumber,
  isValidEmail,
  isValidPhone,
  slugify,
  truncateText,
  capitalizeWords,
  formatDate,
  debounce,
  generateId,
  calculateAverageRating,
  filterBySearch,
  groupBy,
  isInViewport,
  scrollToElement
} from '@/lib/utils';

// Mock window and document for browser-specific functions
Object.defineProperty(window, 'innerHeight', {
  writable: true,
  configurable: true,
  value: 768,
});

Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
});

Object.defineProperty(window, 'scrollTo', {
  writable: true,
  configurable: true,
  value: jest.fn(),
});

describe('Utils Library - Comprehensive', () => {
  describe('formatPhoneNumber', () => {
    it('formats 10-digit number correctly', () => {
      expect(formatPhoneNumber('5201234567')).toBe('(520) 123-4567');
    });

    it('formats number with existing formatting', () => {
      expect(formatPhoneNumber('(520) 123-4567')).toBe('(520) 123-4567');
    });

    it('returns original for invalid length', () => {
      expect(formatPhoneNumber('123')).toBe('123');
      expect(formatPhoneNumber('12345678901')).toBe('12345678901');
    });

    it('handles numbers with dashes and spaces', () => {
      expect(formatPhoneNumber('520-123-4567')).toBe('(520) 123-4567');
      expect(formatPhoneNumber('520 123 4567')).toBe('(520) 123-4567');
    });

    it('handles empty input', () => {
      expect(formatPhoneNumber('')).toBe('');
    });
  });

  describe('isValidEmail', () => {
    it('validates correct email formats', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('user+tag@example.org')).toBe(true);
    });

    it('rejects invalid email formats', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test.example.com')).toBe(false);
      expect(isValidEmail('test @example.com')).toBe(false);
    });

    it('handles empty input', () => {
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    it('validates correct phone formats', () => {
      expect(isValidPhone('(520) 123-4567')).toBe(true);
      expect(isValidPhone('520-123-4567')).toBe(true);
      expect(isValidPhone('520.123.4567')).toBe(true);
      expect(isValidPhone('520 123 4567')).toBe(true);
      expect(isValidPhone('5201234567')).toBe(true);
    });

    it('rejects invalid phone formats', () => {
      expect(isValidPhone('123')).toBe(false);
      expect(isValidPhone('12345678901')).toBe(false);
      expect(isValidPhone('abc-def-ghij')).toBe(false);
    });

    it('handles empty input', () => {
      expect(isValidPhone('')).toBe(false);
    });
  });

  describe('slugify', () => {
    it('converts text to URL-safe slug', () => {
      expect(slugify('Hello World')).toBe('hello-world');
      expect(slugify('Lawn Care & Maintenance')).toBe('lawn-care-maintenance');
    });

    it('handles special characters', () => {
      expect(slugify('Test! @#$% String')).toBe('test-string');
      expect(slugify('múltiple---spaces')).toBe('mltiple-spaces');
    });

    it('removes leading and trailing hyphens', () => {
      expect(slugify('---test---')).toBe('test');
      expect(slugify('   trim me   ')).toBe('trim-me');
    });

    it('handles empty input', () => {
      expect(slugify('')).toBe('');
      expect(slugify('   ')).toBe('');
    });
  });

  describe('truncateText', () => {
    it('truncates long text', () => {
      expect(truncateText('This is a long text', 10)).toBe('This is a...');
    });

    it('returns original text if shorter than limit', () => {
      expect(truncateText('Short', 10)).toBe('Short');
    });

    it('handles exact length', () => {
      expect(truncateText('Exactly10!', 10)).toBe('Exactly10!');
    });

    it('handles empty input', () => {
      expect(truncateText('', 10)).toBe('');
    });
  });

  describe('capitalizeWords', () => {
    it('capitalizes first letter of each word', () => {
      expect(capitalizeWords('hello world')).toBe('Hello World');
      expect(capitalizeWords('lawn care service')).toBe('Lawn Care Service');
    });

    it('handles single word', () => {
      expect(capitalizeWords('test')).toBe('Test');
    });

    it('handles already capitalized text', () => {
      expect(capitalizeWords('Already Capitalized')).toBe('Already Capitalized');
    });

    it('handles empty input', () => {
      expect(capitalizeWords('')).toBe('');
    });
  });

  describe('formatDate', () => {
    it('formats date object correctly', () => {
      const date = new Date('2024-01-15');
      const formatted = formatDate(date);
      expect(formatted).toContain('January');
      expect(formatted).toContain('15');
      expect(formatted).toContain('2024');
    });

    it('formats date string correctly', () => {
      const formatted = formatDate('2024-01-15');
      expect(formatted).toContain('January');
    });

    it('handles custom options', () => {
      const date = new Date('2024-01-15');
      const formatted = formatDate(date, { year: 'numeric', month: 'short' });
      expect(formatted).toContain('Jan');
      expect(formatted).toContain('2024');
    });
  });

  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('delays function execution', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('cancels previous calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('generateId', () => {
    it('generates ID of specified length', () => {
      expect(generateId(8)).toHaveLength(8);
      expect(generateId(12)).toHaveLength(12);
    });

    it('generates different IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });

    it('uses default length when not specified', () => {
      expect(generateId()).toHaveLength(8);
    });

    it('generates alphanumeric characters only', () => {
      const id = generateId(20);
      expect(id).toMatch(/^[A-Za-z0-9]+$/);
    });
  });

  describe('calculateAverageRating', () => {
    it('calculates average rating correctly', () => {
      const testimonials = [
        { fields: { rating: 5 } },
        { fields: { rating: 4 } },
        { fields: { rating: 5 } },
      ];
      expect(calculateAverageRating(testimonials)).toBe(4.7);
    });

    it('handles single testimonial', () => {
      const testimonials = [{ fields: { rating: 5 } }];
      expect(calculateAverageRating(testimonials)).toBe(5);
    });

    it('returns 0 for empty array', () => {
      expect(calculateAverageRating([])).toBe(0);
    });

    it('rounds to one decimal place', () => {
      const testimonials = [
        { fields: { rating: 5 } },
        { fields: { rating: 4 } },
        { fields: { rating: 4 } },
      ];
      expect(calculateAverageRating(testimonials)).toBe(4.3);
    });
  });

  describe('filterBySearch', () => {
    const items = [
      { name: 'Lawn Care', description: 'Professional lawn maintenance' },
      { name: 'Landscape Design', description: 'Custom landscape planning' },
      { name: 'Tree Removal', description: 'Safe tree removal service' },
    ];

    it('filters items by search term', () => {
      const result = filterBySearch(items, 'lawn', ['name', 'description']);
      expect(result).toHaveLength(2);
    });

    it('is case insensitive', () => {
      const result = filterBySearch(items, 'LAWN', ['name']);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Lawn Care');
    });

    it('returns all items for empty search', () => {
      expect(filterBySearch(items, '', ['name'])).toHaveLength(3);
      expect(filterBySearch(items, '   ', ['name'])).toHaveLength(3);
    });

    it('searches multiple keys', () => {
      const result = filterBySearch(items, 'professional', ['name', 'description']);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Lawn Care');
    });

    it('handles non-string values', () => {
      const itemsWithNumbers = [
        { name: 'Test', id: 123 },
        { name: 'Lawn Care', id: 456 },
      ];
      const result = filterBySearch(itemsWithNumbers, 'lawn', ['name', 'id']);
      expect(result).toHaveLength(1);
    });
  });

  describe('groupBy', () => {
    const items = [
      { category: 'residential', name: 'Home Landscaping' },
      { category: 'commercial', name: 'Office Grounds' },
      { category: 'residential', name: 'Backyard Design' },
    ];

    it('groups items by specified key', () => {
      const result = groupBy(items, 'category');
      expect(result.residential).toHaveLength(2);
      expect(result.commercial).toHaveLength(1);
    });

    it('handles empty array', () => {
      expect(groupBy([], 'category')).toEqual({});
    });

    it('creates correct group structure', () => {
      const result = groupBy(items, 'category');
      expect(result.residential[0].name).toBe('Home Landscaping');
      expect(result.commercial[0].name).toBe('Office Grounds');
    });
  });

  describe('isInViewport', () => {
    const mockElement = {
      getBoundingClientRect: jest.fn(() => ({
        top: 100,
        left: 100,
        width: 200,
        height: 150,
      })),
    } as unknown as Element;

    it('returns true for element in viewport', () => {
      expect(isInViewport(mockElement)).toBe(true);
    });

    it('returns false for element outside viewport', () => {
      (mockElement.getBoundingClientRect as jest.Mock).mockReturnValue({
        top: 1000,
        left: 100,
        width: 200,
        height: 150,
      });
      expect(isInViewport(mockElement)).toBe(false);
    });
  });

  describe('scrollToElement', () => {
    const mockElement = {
      offsetTop: 500,
    } as HTMLElement;

    beforeEach(() => {
      jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);
      jest.clearAllMocks();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('scrolls to element', () => {
      scrollToElement('test-element');
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 500,
        behavior: 'smooth',
      });
    });

    it('applies offset', () => {
      scrollToElement('test-element', 100);
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 400,
        behavior: 'smooth',
      });
    });

    it('handles non-existent element', () => {
      jest.spyOn(document, 'getElementById').mockReturnValue(null);
      scrollToElement('non-existent');
      expect(window.scrollTo).not.toHaveBeenCalled();
    });
  });
});