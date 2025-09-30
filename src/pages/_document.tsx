import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* DNS Prefetch for external domains */}
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Preconnect for critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Business Information */}
        <meta name="geo.region" content="US-AR" />
        <meta name="geo.placename" content="Fayetteville" />
        <meta name="geo.position" content="36.0626,-94.1574" />
        <meta name="ICBM" content="36.0626,-94.1574" />

        {/* Additional Meta Tags */}
        <meta name="author" content="Cagle's Landscaping & Restoration" />
        <meta name="publisher" content="Cagle's Landscaping & Restoration" />
        <meta name="copyright" content="Cagle's Landscaping & Restoration" />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />

        {/* Theme and PWA */}
        <meta name="theme-color" content="#7b9a76" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Cagle's Landscaping" />

        {/* Security Headers */}
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}