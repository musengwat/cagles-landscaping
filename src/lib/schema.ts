import type { Service, PortfolioProject, Testimonial } from '@/types';
import { calculateAverageRating, formatSchemaDate } from './seo';

const baseUrl = 'https://cagleslandscaping.com';

/**
 * Generates LocalBusiness schema for homepage
 */
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${baseUrl}/#organization`,
  name: "Cagle's Landscaping & Restoration",
  alternateName: "Cagles Landscaping",
  description: "Professional landscaping services in Fayetteville, Arkansas including lawn care, landscape design, hardscaping, irrigation systems, tree care, and seasonal maintenance.",
  url: baseUrl,
  telephone: '+15203582221',
  email: 'Caglejosh4@gmail.com',
  priceRange: '$$',
  image: [
    `${baseUrl}/og-image.jpg`,
    `${baseUrl}/images/hero/landscape.jpg`,
    `${baseUrl}/logo.png`,
  ],
  logo: `${baseUrl}/logo.png`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Fayetteville',
    addressRegion: 'AR',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 36.0626,
    longitude: -94.1574,
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Fayetteville',
      sameAs: 'https://en.wikipedia.org/wiki/Fayetteville,_Arkansas',
    },
    {
      '@type': 'City',
      name: 'Springdale',
      sameAs: 'https://en.wikipedia.org/wiki/Springdale,_Arkansas',
    },
    {
      '@type': 'City',
      name: 'Rogers',
      sameAs: 'https://en.wikipedia.org/wiki/Rogers,_Arkansas',
    },
    {
      '@type': 'City',
      name: 'Bentonville',
      sameAs: 'https://en.wikipedia.org/wiki/Bentonville,_Arkansas',
    },
    {
      '@type': 'State',
      name: 'Northwest Arkansas',
    },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '07:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '00:00',
      closes: '00:00',
      validFrom: '2024-01-01',
      validThrough: '2024-12-31',
    },
  ],
  paymentAccepted: ['Cash', 'Check', 'Visa', 'Mastercard', 'American Express', 'Discover'],
  currenciesAccepted: 'USD',
  foundingDate: '2015',
  founder: {
    '@type': 'Person',
    name: 'Josh Cagle',
    jobTitle: 'Owner & Lead Designer',
  },
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    minValue: 3,
    maxValue: 8,
  },
  knowsAbout: [
    'Landscape Design',
    'Lawn Care',
    'Hardscaping',
    'Irrigation Systems',
    'Tree Care',
    'Seasonal Cleanup',
    'Garden Maintenance',
    'Outdoor Living Spaces',
  ],
  slogan: 'Transform Your Outdoor Space',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Landscaping Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Lawn Care & Maintenance',
          description: 'Weekly and bi-weekly lawn maintenance including mowing, edging, trimming, and seasonal treatments.',
          provider: {
            '@id': `${baseUrl}/#organization`,
          },
          areaServed: {
            '@type': 'State',
            name: 'Northwest Arkansas',
          },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Landscape Design & Installation',
          description: 'Custom landscape design and professional installation services for residential and commercial properties.',
          provider: {
            '@id': `${baseUrl}/#organization`,
          },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Hardscaping & Patios',
          description: 'Stone patios, walkways, retaining walls, and outdoor entertainment areas.',
          provider: {
            '@id': `${baseUrl}/#organization`,
          },
        },
      },
    ],
  },
  sameAs: [
    // Add when social media accounts are available
    // 'https://www.facebook.com/CaglesLandscaping',
    // 'https://www.instagram.com/cagleslandscaping',
    // 'https://www.linkedin.com/company/cagles-landscaping',
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

/**
 * Generates Service schema for individual service pages
 * @param service - Service data object
 * @returns Service schema object
 */
export function generateServiceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${baseUrl}/services/${service.fields.slug}/#service`,
    name: service.fields.title,
    description: service.fields.shortDescription,
    url: `${baseUrl}/services/${service.fields.slug}/`,
    image: service.fields.featuredImage.url,
    provider: {
      '@id': `${baseUrl}/#organization`,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Fayetteville, AR',
      },
      {
        '@type': 'State',
        name: 'Northwest Arkansas',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.fields.title,
      description: service.fields.fullDescription,
    },
    offers: {
      '@type': 'Offer',
      description: service.fields.priceRange,
      seller: {
        '@id': `${baseUrl}/#organization`,
      },
      areaServed: {
        '@type': 'State',
        name: 'Northwest Arkansas',
      },
    },
  };
}

/**
 * Generates FAQ schema for service pages
 * @param faqs - Array of FAQ objects
 * @returns FAQ schema object
 */
export function generateServiceFAQSchema(faqs: Array<{ question: string; answer: string }>) {
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
 * Generates Review schema with aggregate rating
 * @param testimonials - Array of testimonial objects
 * @returns Organization schema with reviews
 */
export function generateReviewSchema(testimonials: Testimonial[]) {
  const averageRating = calculateAverageRating(testimonials);
  const featuredTestimonials = testimonials.filter(t => t.fields.featured);

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: "Cagle's Landscaping & Restoration",
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: averageRating,
      reviewCount: testimonials.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: featuredTestimonials.map(testimonial => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: testimonial.fields.clientName,
      },
      datePublished: formatSchemaDate(testimonial.fields.date),
      description: testimonial.fields.reviewText,
      name: `${testimonial.fields.projectType} Review`,
      reviewBody: testimonial.fields.reviewText,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: testimonial.fields.rating,
        bestRating: 5,
        worstRating: 1,
      },
    })),
  };
}

/**
 * Generates Portfolio/ImageGallery schema
 * @param projects - Array of portfolio projects
 * @returns ImageGallery schema object
 */
export function generatePortfolioSchema(projects: PortfolioProject[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: "Cagle's Landscaping Portfolio",
    description: 'Portfolio of completed landscaping projects in Northwest Arkansas',
    url: `${baseUrl}/portfolio/`,
    author: {
      '@id': `${baseUrl}/#organization`,
    },
    associatedMedia: projects.map(project => ({
      '@type': 'ImageObject',
      name: project.fields.title,
      description: project.fields.description,
      url: project.fields.afterImage.url,
      contentLocation: {
        '@type': 'Place',
        name: `${project.fields.location}, AR`,
      },
      dateCreated: formatSchemaDate(project.fields.completionDate),
      creator: {
        '@id': `${baseUrl}/#organization`,
      },
    })),
  };
}

/**
 * Generates individual portfolio project schema
 * @param project - Portfolio project object
 * @returns CreativeWork schema object
 */
export function generateProjectSchema(project: PortfolioProject) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.fields.title,
    description: project.fields.description,
    url: `${baseUrl}/portfolio/${project.fields.slug}/`,
    image: [project.fields.beforeImage.url, project.fields.afterImage.url],
    dateCreated: formatSchemaDate(project.fields.completionDate),
    creator: {
      '@id': `${baseUrl}/#organization`,
    },
    locationCreated: {
      '@type': 'Place',
      name: `${project.fields.location}, Arkansas`,
    },
    about: project.fields.serviceTypes,
    keywords: project.fields.serviceTypes.join(', '),
  };
}

/**
 * Generates breadcrumb schema for navigation
 * @param items - Array of breadcrumb items
 * @returns BreadcrumbList schema object
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: {
        '@type': 'WebPage',
        '@id': item.url,
        name: item.name,
      },
    })),
  };
}

/**
 * Generates WebPage schema for individual pages
 * @param page - Page configuration object
 * @returns WebPage schema object
 */
export function generateWebPageSchema(page: {
  name: string;
  description: string;
  url: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${page.url}#webpage`,
    url: page.url,
    name: page.name,
    description: page.description,
    dateModified: page.dateModified || new Date().toISOString(),
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
    },
    about: {
      '@id': `${baseUrl}/#organization`,
    },
    mainEntity: {
      '@id': `${baseUrl}/#organization`,
    },
  };
}

/**
 * Generates Person schema for team members
 * @param person - Person data object
 * @returns Person schema object
 */
export function generatePersonSchema(person: {
  name: string;
  jobTitle: string;
  bio: string;
  image: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.jobTitle,
    description: person.bio,
    image: person.image,
    worksFor: {
      '@id': `${baseUrl}/#organization`,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Fayetteville',
      addressRegion: 'AR',
      addressCountry: 'US',
    },
  };
}

/**
 * Generates HowTo schema for service process steps
 * @param service - Service with process steps
 * @returns HowTo schema object
 */
export function generateHowToSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How We Provide ${service.fields.title}`,
    description: `Our process for delivering ${service.fields.title} services`,
    image: service.fields.featuredImage.url,
    totalTime: 'PT1W', // Placeholder - adjust based on service
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: service.fields.priceRange,
    },
    step: service.fields.processSteps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
    author: {
      '@id': `${baseUrl}/#organization`,
    },
  };
}

/**
 * Portfolio page schema - static schema for portfolio page
 */
export const portfolioPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${baseUrl}/portfolio/#page`,
  url: `${baseUrl}/portfolio/`,
  name: 'Portfolio | Cagle\'s Landscaping & Restoration',
  description: 'View our completed landscaping projects in Fayetteville, Northwest Arkansas. Before and after photos of residential and commercial landscape transformations.',
  inLanguage: 'en-US',
  isPartOf: {
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
  },
  about: {
    '@id': `${baseUrl}/#organization`,
  },
  mainEntity: {
    '@type': 'ItemList',
    name: 'Landscaping Projects Portfolio',
    description: 'Collection of completed landscaping projects by Cagle\'s Landscaping & Restoration',
    numberOfItems: 12,
  },
};