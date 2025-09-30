import type { SEOProps, Service, Testimonial } from '@/types';

const baseUrl = 'https://cagleslandscaping.com'; // Update for production

/**
 * Generates meta tags for SEO optimization
 * @param seo - SEO configuration object
 * @returns Meta tags object for Next.js Head component
 */
export function generateMetaTags(seo: SEOProps) {
  const {
    title,
    description,
    canonical = baseUrl,
    ogImage = `${baseUrl}/og-image.jpg`,
    ogType = 'website',
    keywords = [],
    noindex = false,
  } = seo;

  return {
    title,
    description,
    canonical,
    robots: noindex ? 'noindex,nofollow' : 'index,follow',
    openGraph: {
      type: ogType,
      url: canonical,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      site_name: "Cagle's Landscaping & Restoration",
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@CaglesLandscaping', // Update with actual Twitter handle
    },
    keywords: keywords.length > 0 ? keywords.join(', ') : undefined,
    alternates: {
      canonical,
    },
  };
}

/**
 * Generates page-specific SEO configurations
 */
export const seoConfigs = {
  homepage: {
    title: "Professional Landscaping Services in Fayetteville, AR | Cagle's Landscaping & Restoration",
    description: "Transform your outdoor space with expert landscaping services in Fayetteville, AR. Lawn care, landscape design, hardscaping & more. Free estimates. Call (520) 358-2221.",
    keywords: [
      'landscaping fayetteville ar',
      'lawn care northwest arkansas',
      'landscape design bentonville',
      'hardscaping fayetteville',
      'irrigation systems springdale',
      'tree care rogers',
      'landscaper fayetteville arkansas',
      'outdoor design northwest arkansas'
    ],
    canonical: baseUrl,
  },

  services: {
    title: "Landscaping Services in Fayetteville, AR | Cagle's Landscaping",
    description: "Complete landscaping services in Fayetteville and Northwest Arkansas. Lawn care, design, hardscaping, irrigation, tree care, and seasonal maintenance.",
    keywords: [
      'landscaping services fayetteville ar',
      'lawn maintenance northwest arkansas',
      'landscape installation fayetteville',
      'hardscape design arkansas'
    ],
    canonical: `${baseUrl}/services/`,
  },

  portfolio: {
    title: "Landscaping Portfolio | Fayetteville, AR Projects | Cagle's Landscaping",
    description: "View our landscaping portfolio featuring residential and commercial projects throughout Fayetteville, Springdale, Rogers, and Bentonville, AR.",
    keywords: [
      'landscaping portfolio fayetteville ar',
      'landscape design examples arkansas',
      'hardscaping projects northwest arkansas',
      'before after landscaping fayetteville'
    ],
    canonical: `${baseUrl}/portfolio/`,
  },

  about: {
    title: "About Cagle's Landscaping | Family-Owned Fayetteville, AR Landscapers",
    description: "Learn about Cagle's Landscaping & Restoration. Family-owned business serving Northwest Arkansas since 2015. Licensed, insured, and locally trusted.",
    keywords: [
      'about cagles landscaping',
      'fayetteville landscaping company',
      'northwest arkansas landscaper',
      'josh cagle landscaping',
      'family owned landscape business arkansas'
    ],
    canonical: `${baseUrl}/about/`,
  },

  contact: {
    title: "Contact Us | Free Landscaping Estimates | Fayetteville, AR",
    description: "Get your free landscaping estimate today. Serving Fayetteville, Springdale, Rogers, Bentonville. Call (520) 358-2221 or fill out our online form.",
    keywords: [
      'contact landscaper fayetteville ar',
      'free landscaping estimate arkansas',
      'landscaping quote northwest arkansas',
      'cagle landscaping phone number'
    ],
    canonical: `${baseUrl}/contact/`,
  },
};

/**
 * Generates service-specific SEO configuration
 * @param service - Service data object
 * @returns SEO configuration for the service
 */
export function generateServiceSEO(service: Service): SEOProps {
  return {
    title: service.fields.seo.title,
    description: service.fields.seo.description,
    keywords: service.fields.seo.keywords,
    canonical: `${baseUrl}/services/${service.fields.slug}/`,
    ogImage: service.fields.featuredImage.url,
  };
}

/**
 * Generates breadcrumb structured data
 * @param items - Breadcrumb items
 * @returns JSON-LD structured data
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generates FAQ structured data
 * @param faqs - Array of FAQ objects
 * @returns JSON-LD structured data
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Calculates average rating from testimonials
 * @param testimonials - Array of testimonials
 * @returns Average rating value
 */
export function calculateAverageRating(testimonials: Testimonial[]): number {
  if (testimonials.length === 0) return 0;
  const sum = testimonials.reduce((acc, testimonial) => acc + testimonial.fields.rating, 0);
  return Math.round((sum / testimonials.length) * 10) / 10;
}

/**
 * Formats date for schema markup
 * @param date - Date string or Date object
 * @returns ISO date string
 */
export function formatSchemaDate(date: string | Date): string {
  return new Date(date).toISOString().split('T')[0];
}

/**
 * Generates organization structured data for company information
 */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${baseUrl}/#organization`,
  name: "Cagle's Landscaping & Restoration",
  legalName: "Cagle's Landscaping & Restoration LLC",
  url: baseUrl,
  logo: `${baseUrl}/logo.png`,
  image: `${baseUrl}/og-image.jpg`,
  description: "Professional landscaping services in Fayetteville, Arkansas including lawn care, landscape design, hardscaping, irrigation, and tree care.",
  founder: {
    '@type': 'Person',
    name: 'Josh Cagle',
  },
  foundingDate: '2015',
  email: 'Caglejosh4@gmail.com',
  telephone: '+15203582221',
  faxNumber: null,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '', // Add specific address when available
    addressLocality: 'Fayetteville',
    addressRegion: 'AR',
    postalCode: '', // Add when available
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 36.0626,
    longitude: -94.1574,
  },
  hasMap: `https://www.google.com/maps/place/Fayetteville,+AR`,
  openingHours: [
    'Mo-Sa 07:00-18:00',
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '07:00',
      closes: '18:00',
    },
  ],
  priceRange: '$$',
  paymentAccepted: ['Cash', 'Check', 'Credit Card'],
  currenciesAccepted: 'USD',
  areaServed: [
    {
      '@type': 'City',
      name: 'Fayetteville, AR',
    },
    {
      '@type': 'City',
      name: 'Springdale, AR',
    },
    {
      '@type': 'City',
      name: 'Rogers, AR',
    },
    {
      '@type': 'City',
      name: 'Bentonville, AR',
    },
    {
      '@type': 'City',
      name: 'Johnson, AR',
    },
    {
      '@type': 'City',
      name: 'Goshen, AR',
    },
  ],
  serviceType: [
    'Lawn Care',
    'Landscape Design',
    'Hardscaping',
    'Irrigation Systems',
    'Tree Care',
    'Seasonal Cleanup',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Landscaping Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Lawn Care & Maintenance',
          description: 'Professional weekly and bi-weekly lawn maintenance services',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Landscape Design & Installation',
          description: 'Custom landscape design and professional installation services',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Hardscaping & Patios',
          description: 'Stone patios, walkways, retaining walls, and outdoor living spaces',
        },
      },
    ],
  },
  sameAs: [
    // Add social media URLs when available
    // 'https://www.facebook.com/CaglesLandscaping',
    // 'https://www.instagram.com/cagleslandscaping',
  ],
};

/**
 * Generates website structured data
 */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${baseUrl}/#website`,
  url: baseUrl,
  name: "Cagle's Landscaping & Restoration",
  description: "Professional landscaping services in Fayetteville, Arkansas and Northwest Arkansas",
  publisher: {
    '@id': `${baseUrl}/#organization`,
  },
  potentialAction: [
    {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  ],
  inLanguage: 'en-US',
};