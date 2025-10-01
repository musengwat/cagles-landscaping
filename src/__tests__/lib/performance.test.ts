import {
  initWebVitals,
  reportWebVitals,
  trackPageView,
  trackEvent,
  measurePerformance,
  PerformanceMetric
} from '@/lib/performance';

// Mock web-vitals
const mockOnCLS = jest.fn();
const mockOnINP = jest.fn();
const mockOnFCP = jest.fn();
const mockOnLCP = jest.fn();
const mockOnTTFB = jest.fn();

jest.mock('web-vitals', () => ({
  onCLS: mockOnCLS,
  onINP: mockOnINP,
  onFCP: mockOnFCP,
  onLCP: mockOnLCP,
  onTTFB: mockOnTTFB,
}));

// Mock console methods
const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

// Mock performance API
const mockPerformance = {
  now: jest.fn(() => 1000),
  mark: jest.fn(),
  measure: jest.fn(),
  getEntriesByType: jest.fn(() => []),
  getEntriesByName: jest.fn(() => []),
};

Object.defineProperty(global, 'performance', {
  value: mockPerformance,
  writable: true,
});

describe('Performance Library', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset NODE_ENV
    process.env.NODE_ENV = 'production';
  });

  afterEach(() => {
    consoleSpy.mockClear();
    consoleWarnSpy.mockClear();
  });

  describe('initWebVitals', () => {
    it('initializes web vitals in production', async () => {
      const mockReportWebVitals = jest.fn();

      await initWebVitals(mockReportWebVitals);

      expect(mockOnCLS).toHaveBeenCalled();
      expect(mockOnINP).toHaveBeenCalled();
      expect(mockOnFCP).toHaveBeenCalled();
      expect(mockOnLCP).toHaveBeenCalled();
      expect(mockOnTTFB).toHaveBeenCalled();
    });

    it('does not initialize web vitals in development', async () => {
      process.env.NODE_ENV = 'development';
      const mockReportWebVitals = jest.fn();

      await initWebVitals(mockReportWebVitals);

      expect(mockOnCLS).not.toHaveBeenCalled();
      expect(mockOnINP).not.toHaveBeenCalled();
      expect(mockOnFCP).not.toHaveBeenCalled();
      expect(mockOnLCP).not.toHaveBeenCalled();
      expect(mockOnTTFB).not.toHaveBeenCalled();
    });

    it('works without reportWebVitals callback', async () => {
      await initWebVitals();

      expect(mockOnCLS).toHaveBeenCalled();
      expect(mockOnINP).toHaveBeenCalled();
      expect(mockOnFCP).toHaveBeenCalled();
      expect(mockOnLCP).toHaveBeenCalled();
      expect(mockOnTTFB).toHaveBeenCalled();
    });

    it('calls reportWebVitals callback when provided', async () => {
      const mockReportWebVitals = jest.fn();

      await initWebVitals(mockReportWebVitals);

      // Simulate a web vital callback
      const mockMetric: PerformanceMetric = {
        name: 'CLS',
        value: 0.05,
        rating: 'good',
        delta: 0.05,
        entries: [],
        id: 'test-id',
        navigationType: 'navigate'
      };

      const clsCallback = mockOnCLS.mock.calls[0][0];
      clsCallback(mockMetric);

      expect(mockReportWebVitals).toHaveBeenCalledWith(mockMetric);
    });
  });

  describe('reportWebVitals', () => {
    it('logs performance metrics correctly', () => {
      const metric: PerformanceMetric = {
        name: 'LCP',
        value: 2.1,
        rating: 'good',
        delta: 2.1,
        entries: [],
        id: 'test-id',
        navigationType: 'navigate'
      };

      reportWebVitals(metric);

      expect(consoleSpy).toHaveBeenCalledWith('[Performance]', 'LCP', 2.1, 'good');
    });

    it('warns about poor performance metrics', () => {
      const metric: PerformanceMetric = {
        name: 'CLS',
        value: 0.3,
        rating: 'poor',
        delta: 0.3,
        entries: [],
        id: 'test-id',
        navigationType: 'navigate'
      };

      reportWebVitals(metric);

      expect(consoleWarnSpy).toHaveBeenCalledWith('[Performance Warning]', 'CLS', 0.3, 'poor');
    });

    it('handles needs-improvement rating', () => {
      const metric: PerformanceMetric = {
        name: 'FID',
        value: 150,
        rating: 'needs-improvement',
        delta: 150,
        entries: [],
        id: 'test-id',
        navigationType: 'navigate'
      };

      reportWebVitals(metric);

      expect(consoleSpy).toHaveBeenCalledWith('[Performance]', 'FID', 150, 'needs-improvement');
    });

    it('handles undefined values gracefully', () => {
      const metric: PerformanceMetric = {
        name: 'TTFB',
        value: 0,
        rating: 'good',
        delta: 0,
        entries: [],
        id: 'test-id',
        navigationType: 'navigate'
      };

      reportWebVitals(metric);

      expect(consoleSpy).toHaveBeenCalledWith('[Performance]', 'TTFB', 0, 'good');
    });
  });

  describe('trackPageView', () => {
    it('tracks page views correctly', () => {
      const url = '/about';
      const title = 'About Us';

      trackPageView(url, title);

      expect(consoleSpy).toHaveBeenCalledWith('[Analytics] Page View:', url, title);
    });

    it('tracks page view with just URL', () => {
      const url = '/contact';

      trackPageView(url);

      expect(consoleSpy).toHaveBeenCalledWith('[Analytics] Page View:', url, undefined);
    });

    it('works in development mode', () => {
      process.env.NODE_ENV = 'development';
      const url = '/services';

      trackPageView(url);

      expect(consoleSpy).toHaveBeenCalledWith('[Analytics] Page View:', url, undefined);
    });
  });

  describe('trackEvent', () => {
    it('tracks events with all parameters', () => {
      const eventName = 'contact_form_submit';
      const properties = { service: 'lawn-care', location: 'fayetteville' };

      trackEvent(eventName, properties);

      expect(consoleSpy).toHaveBeenCalledWith('[Analytics] Event:', eventName, properties);
    });

    it('tracks events without properties', () => {
      const eventName = 'phone_click';

      trackEvent(eventName);

      expect(consoleSpy).toHaveBeenCalledWith('[Analytics] Event:', eventName, undefined);
    });

    it('handles complex event properties', () => {
      const eventName = 'form_validation_error';
      const properties = {
        field: 'email',
        error: 'invalid_format',
        timestamp: Date.now(),
        user_agent: 'test-browser'
      };

      trackEvent(eventName, properties);

      expect(consoleSpy).toHaveBeenCalledWith('[Analytics] Event:', eventName, properties);
    });
  });

  describe('measurePerformance', () => {
    it('measures performance of synchronous functions', () => {
      const testFunction = () => {
        return 'result';
      };

      const result = measurePerformance('test-operation', testFunction);

      expect(result).toBe('result');
      expect(mockPerformance.mark).toHaveBeenCalledWith('test-operation-start');
      expect(mockPerformance.mark).toHaveBeenCalledWith('test-operation-end');
      expect(mockPerformance.measure).toHaveBeenCalledWith(
        'test-operation',
        'test-operation-start',
        'test-operation-end'
      );
    });

    it('measures performance of functions that throw errors', () => {
      const testFunction = () => {
        throw new Error('Test error');
      };

      expect(() => {
        measurePerformance('error-operation', testFunction);
      }).toThrow('Test error');

      expect(mockPerformance.mark).toHaveBeenCalledWith('error-operation-start');
      expect(mockPerformance.mark).toHaveBeenCalledWith('error-operation-end');
    });

    it('handles performance API not being available', () => {
      const originalPerformance = global.performance;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (global as any).performance;

      const testFunction = () => 'result';

      const result = measurePerformance('no-perf-api', testFunction);

      expect(result).toBe('result');
      expect(consoleSpy).toHaveBeenCalledWith('[Performance] API not available');

      // Restore performance API
      global.performance = originalPerformance;
    });

    it('logs performance measurements', () => {
      const testFunction = () => 'test-result';

      // Mock performance.getEntriesByName to return a measurement
      mockPerformance.getEntriesByName.mockReturnValueOnce([{
        name: 'test-measure',
        duration: 25.5,
        startTime: 1000,
        entryType: 'measure'
      }]);

      measurePerformance('test-measure', testFunction);

      expect(consoleSpy).toHaveBeenCalledWith(
        '[Performance] test-measure completed in 25.5ms'
      );
    });

    it('handles missing performance entries', () => {
      const testFunction = () => 'result';

      mockPerformance.getEntriesByName.mockReturnValueOnce([]);

      const result = measurePerformance('missing-entry', testFunction);

      expect(result).toBe('result');
      expect(consoleSpy).toHaveBeenCalledWith(
        '[Performance] missing-entry measurement not found'
      );
    });
  });

  describe('Core Web Vitals thresholds', () => {
    it('reports good CLS scores', () => {
      const metric: PerformanceMetric = {
        name: 'CLS',
        value: 0.05,
        rating: 'good',
        delta: 0.05,
        entries: [],
        id: 'test-id',
        navigationType: 'navigate'
      };

      reportWebVitals(metric);

      expect(consoleSpy).toHaveBeenCalledWith('[Performance]', 'CLS', 0.05, 'good');
    });

    it('reports good LCP scores', () => {
      const metric: PerformanceMetric = {
        name: 'LCP',
        value: 2.0,
        rating: 'good',
        delta: 2.0,
        entries: [],
        id: 'test-id',
        navigationType: 'navigate'
      };

      reportWebVitals(metric);

      expect(consoleSpy).toHaveBeenCalledWith('[Performance]', 'LCP', 2.0, 'good');
    });

    it('reports good INP scores', () => {
      const metric: PerformanceMetric = {
        name: 'INP',
        value: 150,
        rating: 'good',
        delta: 150,
        entries: [],
        id: 'test-id',
        navigationType: 'navigate'
      };

      reportWebVitals(metric);

      expect(consoleSpy).toHaveBeenCalledWith('[Performance]', 'INP', 150, 'good');
    });
  });

  describe('Navigation Type handling', () => {
    it('handles navigate navigation type', () => {
      const metric: PerformanceMetric = {
        name: 'FCP',
        value: 1.5,
        rating: 'good',
        delta: 1.5,
        entries: [],
        id: 'test-id',
        navigationType: 'navigate'
      };

      reportWebVitals(metric);

      expect(consoleSpy).toHaveBeenCalledWith('[Performance]', 'FCP', 1.5, 'good');
    });

    it('handles reload navigation type', () => {
      const metric: PerformanceMetric = {
        name: 'TTFB',
        value: 800,
        rating: 'good',
        delta: 800,
        entries: [],
        id: 'test-id',
        navigationType: 'reload'
      };

      reportWebVitals(metric);

      expect(consoleSpy).toHaveBeenCalledWith('[Performance]', 'TTFB', 800, 'good');
    });

    it('handles back_forward navigation type', () => {
      const metric: PerformanceMetric = {
        name: 'LCP',
        value: 1.8,
        rating: 'good',
        delta: 1.8,
        entries: [],
        id: 'test-id',
        navigationType: 'back_forward'
      };

      reportWebVitals(metric);

      expect(consoleSpy).toHaveBeenCalledWith('[Performance]', 'LCP', 1.8, 'good');
    });
  });
});