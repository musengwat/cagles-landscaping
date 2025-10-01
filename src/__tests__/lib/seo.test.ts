import { generateMetaTags, seoConfigs } from '@/lib/seo';
import '@testing-library/jest-dom';

describe('SEO Library', () => {
  describe('generateMetaTags', () => {
    it('generates complete meta tags for homepage', () => {
      const metaTags = generateMetaTags(seoConfigs.homepage);

      expect(metaTags.title).toContain('Cagle\'s Landscaping');
      expect(metaTags.title).toContain('Fayetteville');
      expect(metaTags.description).toContain('professional landscaping');
      expect(metaTags.keywords).toContain('landscaping');
      expect(metaTags.canonical).toBe('https://cagleslandscaping.com/');
    });

    it('includes Open Graph properties', () => {
      const metaTags = generateMetaTags(seoConfigs.homepage);

      expect(metaTags.openGraph.type).toBe('website');
      expect(metaTags.openGraph.url).toBe('https://cagleslandscaping.com/');
      expect(metaTags.openGraph.title).toContain('Cagle\'s Landscaping');
      expect(metaTags.openGraph.description).toContain('professional landscaping');
      expect(metaTags.openGraph.site_name).toBe('Cagle\'s Landscaping & Restoration');
      expect(metaTags.openGraph.images).toHaveLength(1);
      expect(metaTags.openGraph.images[0].url).toContain('unsplash.com');
    });

    it('includes Twitter Card properties', () => {
      const metaTags = generateMetaTags(seoConfigs.homepage);

      expect(metaTags.twitter.card).toBe('summary_large_image');
      expect(metaTags.twitter.title).toContain('Cagle\'s Landscaping');
      expect(metaTags.twitter.description).toContain('professional landscaping');
      expect(metaTags.twitter.images).toHaveLength(1);
      expect(metaTags.twitter.images[0]).toContain('unsplash.com');
    });

    it('generates meta tags for service pages', () => {
      const metaTags = generateMetaTags(seoConfigs.services.lawnCare);

      expect(metaTags.title).toContain('Lawn Care');
      expect(metaTags.title).toContain('Fayetteville');
      expect(metaTags.description).toContain('lawn care');
      expect(metaTags.keywords).toContain('lawn care');
      expect(metaTags.canonical).toBe('https://cagleslandscaping.com/services/lawn-care');
    });

    it('generates meta tags for about page', () => {
      const metaTags = generateMetaTags(seoConfigs.about);

      expect(metaTags.title).toContain('About');
      expect(metaTags.title).toContain('Cagle\'s Landscaping');
      expect(metaTags.description).toContain('family-owned');
      expect(metaTags.canonical).toBe('https://cagleslandscaping.com/about');
    });

    it('generates meta tags for contact page', () => {
      const metaTags = generateMetaTags(seoConfigs.contact);

      expect(metaTags.title).toContain('Contact');
      expect(metaTags.description).toContain('contact');
      expect(metaTags.description).toContain('(520) 358-2221');
      expect(metaTags.canonical).toBe('https://cagleslandscaping.com/contact');
    });

    it('generates meta tags for portfolio page', () => {
      const metaTags = generateMetaTags(seoConfigs.portfolio);

      expect(metaTags.title).toContain('Portfolio');
      expect(metaTags.description).toContain('landscaping projects');
      expect(metaTags.canonical).toBe('https://cagleslandscaping.com/portfolio');
    });

    it('includes geographic meta tags', () => {
      const metaTags = generateMetaTags(seoConfigs.homepage);

      expect(metaTags.keywords).toContain('Fayetteville');
      expect(metaTags.keywords).toContain('Northwest Arkansas');
      expect(metaTags.description).toContain('Fayetteville');
    });

    it('includes business contact information', () => {
      const metaTags = generateMetaTags(seoConfigs.contact);

      expect(metaTags.description).toContain('(520) 358-2221');
      expect(metaTags.description).toContain('Fayetteville');
    });

    it('optimizes title length for SEO', () => {
      Object.values(seoConfigs).forEach(config => {
        const metaTags = generateMetaTags(config);
        expect(metaTags.title.length).toBeLessThanOrEqual(60);
      });
    });

    it('optimizes description length for SEO', () => {
      Object.values(seoConfigs).forEach(config => {
        const metaTags = generateMetaTags(config);
        expect(metaTags.description.length).toBeLessThanOrEqual(160);
        expect(metaTags.description.length).toBeGreaterThanOrEqual(120);
      });
    });
  });
});