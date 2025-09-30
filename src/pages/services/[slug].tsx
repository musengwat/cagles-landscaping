import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { Layout } from '@/components/layout/Layout';
import { ServiceHero } from '@/components/features/ServiceHero';
import { ServiceOverview } from '@/components/features/ServiceOverview';
import { ServiceProcess } from '@/components/features/ServiceProcess';
import { ServiceGallery } from '@/components/features/ServiceGallery';
import { ServiceFAQ } from '@/components/features/ServiceFAQ';
import { ContactCTA } from '@/components/features/ContactCTA';
import { services } from '@/lib/mockData';
import { generateServiceSEO } from '@/lib/seo';
import { generateServiceSchema, generateServiceFAQSchema, generateBreadcrumbSchema } from '@/lib/schema';
import type { Service } from '@/types';

interface ServicePageProps {
  service: Service;
}

export default function ServicePage({ service }: ServicePageProps) {
  const seo = generateServiceSEO(service);
  const serviceSchema = generateServiceSchema(service);
  const faqSchema = generateServiceFAQSchema(service.fields.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://cagleslandscaping.com/' },
    { name: 'Services', url: 'https://cagleslandscaping.com/services/' },
    { name: service.fields.title, url: `https://cagleslandscaping.com/services/${service.fields.slug}/` },
  ]);

  return (
    <Layout>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords?.join(', ')} />
        <link rel="canonical" href={seo.canonical} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={seo.canonical} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={seo.ogImage} />
        <meta property="og:site_name" content="Cagle's Landscaping & Restoration" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={seo.ogImage} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>

      <main id="main-content">
        <ServiceHero service={service} />
        <ServiceOverview service={service} />
        <ServiceProcess service={service} />
        <ServiceGallery service={service} />
        <ServiceFAQ service={service} />
        <ContactCTA />
      </main>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = services.map((service) => ({
    params: { slug: service.fields.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ServicePageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const service = services.find((s) => s.fields.slug === slug);

  if (!service) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      service,
    },
  };
};