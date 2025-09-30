import Head from 'next/head';
import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/features/HeroSection';
import { ServicesOverview } from '@/components/features/ServicesOverview';
import { WhyChooseUs } from '@/components/features/WhyChooseUs';
import { FeaturedPortfolio } from '@/components/features/FeaturedPortfolio';
import { TestimonialsCarousel } from '@/components/features/TestimonialsCarousel';
import { ServiceAreas } from '@/components/features/ServiceAreas';
import { ContactCTA } from '@/components/features/ContactCTA';
import { generateMetaTags, seoConfigs } from '@/lib/seo';
import { localBusinessSchema, websiteSchema } from '@/lib/schema';
import { testimonials } from '@/lib/mockData';
import { generateReviewSchema } from '@/lib/schema';

export default function Home() {
  const seo = generateMetaTags(seoConfigs.homepage);
  const reviewSchema = generateReviewSchema(testimonials);

  return (
    <Layout>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href={seo.canonical} />

        {/* Open Graph */}
        <meta property="og:type" content={seo.openGraph.type} />
        <meta property="og:url" content={seo.openGraph.url} />
        <meta property="og:title" content={seo.openGraph.title} />
        <meta property="og:description" content={seo.openGraph.description} />
        <meta property="og:image" content={seo.openGraph.images[0].url} />
        <meta property="og:site_name" content={seo.openGraph.site_name} />

        {/* Twitter */}
        <meta name="twitter:card" content={seo.twitter.card} />
        <meta name="twitter:title" content={seo.twitter.title} />
        <meta name="twitter:description" content={seo.twitter.description} />
        <meta name="twitter:image" content={seo.twitter.images[0]} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
      </Head>

      <main id="main-content">
        <HeroSection />
        <ServicesOverview />
        <WhyChooseUs />
        <FeaturedPortfolio />
        <TestimonialsCarousel />
        <ServiceAreas />
        <ContactCTA />
      </main>
    </Layout>
  );
}