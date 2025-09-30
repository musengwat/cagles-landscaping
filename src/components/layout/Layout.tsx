import { ReactNode } from 'react';
import Head from 'next/head';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
  canonical?: string;
  ogImage?: string;
  keywords?: string[];
  noindex?: boolean;
}

export function Layout({
  children,
  title = "Cagle's Landscaping & Restoration | Fayetteville, AR",
  description = "Professional landscaping services in Fayetteville, Arkansas and Northwest Arkansas",
  structuredData,
  canonical,
  ogImage,
  keywords = [],
  noindex = false
}: LayoutProps) {
  const baseUrl = 'https://cagleslandscaping.com';
  const defaultOgImage = `${baseUrl}/og-image.jpg`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage || defaultOgImage} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={ogImage || defaultOgImage} />

        {/* Additional SEO */}
        {canonical && <link rel="canonical" href={canonical} />}
        {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
        {noindex && <meta name="robots" content="noindex,nofollow" />}

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        {/* Structured Data */}
        {structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(Array.isArray(structuredData) ? structuredData : [structuredData])
            }}
          />
        )}
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />

        {/* Main content with top padding to account for fixed header */}
        <main className="flex-1 pt-16 lg:pt-20">
          {children}
        </main>

        <Footer />
      </div>
    </>
  );
}