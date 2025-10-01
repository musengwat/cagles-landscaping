/**
 * Performance Monitoring and Core Web Vitals Utilities
 *
 * Provides utilities for monitoring and optimizing Core Web Vitals:
 * - Largest Contentful Paint (LCP)
 * - First Input Delay (FID)
 * - Cumulative Layout Shift (CLS)
 */

export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  threshold: {
    good: number;
    poor: number;
  };
}

export interface WebVitalsReport {
  lcp?: PerformanceMetric;
  fid?: PerformanceMetric;
  cls?: PerformanceMetric;
  fcp?: PerformanceMetric;
  ttfb?: PerformanceMetric;
}

/**
 * Core Web Vitals thresholds (in milliseconds for timing metrics)
 */
export const CORE_WEB_VITALS_THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
  FID: { good: 100, poor: 300 },   // First Input Delay
  CLS: { good: 0.1, poor: 0.25 },  // Cumulative Layout Shift
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
  TTFB: { good: 800, poor: 1800 }, // Time to First Byte
};

/**
 * Get performance rating based on thresholds
 */
function getPerformanceRating(
  value: number,
  threshold: { good: number; poor: number }
): 'good' | 'needs-improvement' | 'poor' {
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Format performance metric
 */
function formatMetric(
  name: string,
  value: number,
  threshold: { good: number; poor: number }
): PerformanceMetric {
  return {
    name,
    value,
    rating: getPerformanceRating(value, threshold),
    threshold,
  };
}

/**
 * Initialize Core Web Vitals monitoring
 * Should be called in _app.tsx
 */
export function initWebVitals(reportWebVitals?: (metric: PerformanceMetric) => void) {
  if (typeof window === 'undefined') return;

  // Only load web-vitals in production
  if (process.env.NODE_ENV === 'production') {
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS((metric) => {
        const formattedMetric = formatMetric('CLS', metric.value, CORE_WEB_VITALS_THRESHOLDS.CLS);
        reportWebVitals?.(formattedMetric);
      });

      onINP((metric) => {
        const formattedMetric = formatMetric('INP', metric.value, CORE_WEB_VITALS_THRESHOLDS.FID);
        reportWebVitals?.(formattedMetric);
      });

      onFCP((metric) => {
        const formattedMetric = formatMetric('FCP', metric.value, CORE_WEB_VITALS_THRESHOLDS.FCP);
        reportWebVitals?.(formattedMetric);
      });

      onLCP((metric) => {
        const formattedMetric = formatMetric('LCP', metric.value, CORE_WEB_VITALS_THRESHOLDS.LCP);
        reportWebVitals?.(formattedMetric);
      });

      onTTFB((metric) => {
        const formattedMetric = formatMetric('TTFB', metric.value, CORE_WEB_VITALS_THRESHOLDS.TTFB);
        reportWebVitals?.(formattedMetric);
      });
    });
  }
}

/**
 * Image optimization utilities
 */
export const imageOptimization = {
  /**
   * Generate optimized image sizes for responsive images
   */
  generateSizes: (breakpoints: { [key: string]: number }) => {
    return Object.entries(breakpoints)
      .sort(([, a], [, b]) => a - b)
      .map(([, width], index, array) => {
        if (index === array.length - 1) {
          return `${width}px`;
        }
        return `(max-width: ${width}px) ${width}px`;
      })
      .join(', ');
  },

  /**
   * Get Unsplash image URL with optimization parameters
   */
  getOptimizedUnsplashUrl: (
    baseUrl: string,
    options: {
      width?: number;
      height?: number;
      quality?: number;
      format?: 'webp' | 'jpg' | 'png';
      fit?: 'crop' | 'fill' | 'scale';
    } = {}
  ) => {
    const {
      width = 1200,
      height,
      quality = 80,
      format = 'webp',
      fit = 'crop',
    } = options;

    const url = new URL(baseUrl);
    url.searchParams.set('w', width.toString());
    if (height) url.searchParams.set('h', height.toString());
    url.searchParams.set('q', quality.toString());
    url.searchParams.set('auto', 'format');
    url.searchParams.set('fit', fit);
    url.searchParams.set('fm', format);

    return url.toString();
  },

  /**
   * Generate responsive image sizes for common breakpoints
   */
  responsiveSizes: {
    hero: '100vw',
    fullWidth: '100vw',
    twoColumns: '(max-width: 768px) 100vw, 50vw',
    threeColumns: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
    fourColumns: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw',
    card: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px',
  },
};

/**
 * Performance optimization recommendations
 */
export const performanceOptimizations = {
  images: [
    'Use priority loading for above-the-fold images',
    'Implement lazy loading for below-the-fold images',
    'Use appropriate sizes attribute for responsive images',
    'Optimize image formats (WebP, AVIF when possible)',
    'Compress images without significant quality loss',
    'Use placeholder/blur while loading',
  ],

  loading: [
    'Minimize JavaScript bundle size',
    'Implement code splitting for route-based chunks',
    'Use dynamic imports for non-critical features',
    'Preload critical resources',
    'Avoid render-blocking resources',
    'Optimize web fonts loading',
  ],

  layout: [
    'Reserve space for images to prevent layout shift',
    'Use CSS aspect-ratio for consistent image containers',
    'Avoid inserting content above existing content',
    'Use transform and opacity for animations',
    'Implement proper loading states',
  ],

  caching: [
    'Set appropriate cache headers',
    'Use CDN for static assets',
    'Implement service worker for offline support',
    'Cache API responses when appropriate',
    'Use stale-while-revalidate strategy',
  ],
};

/**
 * Performance monitoring configuration for production
 */
export const performanceConfig = {
  // Enable performance monitoring in production
  enabled: process.env.NODE_ENV === 'production',

  // Sample rate (0-1) for performance data collection
  sampleRate: 0.1,

  // Performance budget thresholds
  budget: {
    lcp: 2500,        // Target LCP under 2.5s
    fid: 100,         // Target FID under 100ms
    cls: 0.1,         // Target CLS under 0.1
    bundleSize: 250,  // Target bundle size under 250KB
    imageSize: 500,   // Target image size under 500KB
  },

  // Critical performance warnings
  criticalThresholds: {
    lcp: 4000,        // Critical if LCP over 4s
    fid: 300,         // Critical if FID over 300ms
    cls: 0.25,        // Critical if CLS over 0.25
  },
};

/**
 * Generate performance report
 */
export function generatePerformanceReport(metrics: WebVitalsReport): {
  overallScore: number;
  recommendations: string[];
  criticalIssues: string[];
} {
  const scores: number[] = [];
  const recommendations: string[] = [];
  const criticalIssues: string[] = [];

  // Analyze each metric
  Object.entries(metrics).forEach(([key, metric]) => {
    void key; // Acknowledge key parameter
    if (!metric) return;

    // Add to overall score calculation
    scores.push(metric.rating === 'good' ? 100 : metric.rating === 'needs-improvement' ? 60 : 20);

    // Generate recommendations
    if (metric.rating !== 'good') {
      switch (key) {
        case 'lcp':
          recommendations.push('Optimize largest contentful paint by improving image loading and server response times');
          if (metric.rating === 'poor') {
            criticalIssues.push(`LCP is ${metric.value}ms (critical threshold: ${metric.threshold.poor}ms)`);
          }
          break;
        case 'fid':
          recommendations.push('Reduce first input delay by minimizing JavaScript execution time');
          if (metric.rating === 'poor') {
            criticalIssues.push(`FID is ${metric.value}ms (critical threshold: ${metric.threshold.poor}ms)`);
          }
          break;
        case 'cls':
          recommendations.push('Minimize cumulative layout shift by reserving space for images and dynamic content');
          if (metric.rating === 'poor') {
            criticalIssues.push(`CLS is ${metric.value} (critical threshold: ${metric.threshold.poor})`);
          }
          break;
      }
    }
  });

  const overallScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  return {
    overallScore,
    recommendations,
    criticalIssues,
  };
}