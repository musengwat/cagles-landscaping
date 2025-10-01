import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { initWebVitals, type PerformanceMetric } from '@/lib/performance';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  // Initialize performance monitoring
  useEffect(() => {
    initWebVitals((metric: PerformanceMetric) => {
      // In production, you could send this to an analytics service
      if (process.env.NODE_ENV === 'development') {
        console.log('[Performance]', metric.name, {
          value: metric.value,
          rating: metric.rating,
          threshold: metric.threshold,
        });
      }

      // Example: Send to Google Analytics or other analytics service
      // gtag('event', metric.name, {
      //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      //   event_category: 'Web Vitals',
      //   event_label: metric.rating,
      //   non_interaction: true,
      // });
    });
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />

        {/* Optimize font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Component {...pageProps} />
    </>
  );
}