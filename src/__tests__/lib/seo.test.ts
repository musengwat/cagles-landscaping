import { generateMetaTags, seoConfigs } from "@/lib/seo";
import "@testing-library/jest-dom";

describe("SEO Library", () => {
  describe("generateMetaTags", () => {
    it("generates complete meta tags for homepage", () => {
      const metaTags = generateMetaTags(seoConfigs.homepage);

      expect(metaTags.title).toContain("Cagle's Landscaping");
      expect(metaTags.title).toContain("Fayetteville");
      expect(metaTags.description).toContain("landscaping");
      expect(metaTags.keywords).toContain("landscaping");
      expect(metaTags.canonical).toBe("https://cagleslandscaping.com");
    });

    it("includes Open Graph properties", () => {
      const metaTags = generateMetaTags(seoConfigs.homepage);

      expect(metaTags.openGraph.type).toBe("website");
      expect(metaTags.openGraph.url).toBe("https://cagleslandscaping.com");
      expect(metaTags.openGraph.title).toContain("Cagle's Landscaping");
      expect(metaTags.openGraph.description).toContain("landscaping");
      expect(metaTags.openGraph.site_name).toBe(
        "Cagle's Landscaping & Restoration"
      );
      expect(metaTags.openGraph.images).toHaveLength(1);
      expect(metaTags.openGraph.images[0].url).toBeTruthy();
    });

    it("includes Twitter Card properties", () => {
      const metaTags = generateMetaTags(seoConfigs.homepage);

      expect(metaTags.twitter.card).toBe("summary_large_image");
      expect(metaTags.twitter.title).toContain("Cagle's Landscaping");
      expect(metaTags.twitter.description).toContain("landscaping");
      expect(metaTags.twitter.images).toHaveLength(1);
      expect(metaTags.twitter.images[0]).toBeTruthy();
    });

    it("generates meta tags for service pages", () => {
      const metaTags = generateMetaTags(seoConfigs.services);

      expect(metaTags.title?.toLowerCase()).toContain("lawn care");
      expect(metaTags.title?.toLowerCase()).toContain("fayetteville");
      expect(metaTags.description?.toLowerCase()).toContain("lawn care");
      expect(metaTags.keywords?.toLowerCase()).toContain("landscaping");
      expect(metaTags.canonical).toBe(
        "https://cagleslandscaping.com/services/"
      );
    });

    it("generates meta tags for about page", () => {
      const metaTags = generateMetaTags(seoConfigs.about);

      expect(metaTags.title?.toLowerCase()).toContain("about");
      expect(metaTags.title?.toLowerCase()).toContain("cagle's landscaping");
      expect(metaTags.description?.toLowerCase()).toContain("family-owned");
      expect(metaTags.canonical).toBe("https://cagleslandscaping.com/about/");
    });

    it("generates meta tags for contact page", () => {
      const metaTags = generateMetaTags(seoConfigs.contact);

      expect(metaTags.title?.toLowerCase()).toContain("contact");
      expect(metaTags.description?.toLowerCase()).toContain("landscaping");
      expect(metaTags.description).toContain("(520) 358-2221");
      expect(metaTags.canonical).toBe("https://cagleslandscaping.com/contact/");
    });

    it("generates meta tags for portfolio page", () => {
      const metaTags = generateMetaTags(seoConfigs.portfolio);

      expect(metaTags.title?.toLowerCase()).toContain("portfolio");
      expect(metaTags.description?.toLowerCase()).toContain("landscaping");
      expect(metaTags.canonical).toBe(
        "https://cagleslandscaping.com/portfolio/"
      );
    });

    it("includes geographic meta tags", () => {
      const metaTags = generateMetaTags(seoConfigs.homepage);

      expect(metaTags.keywords?.toLowerCase()).toContain("fayetteville");
      expect(metaTags.keywords?.toLowerCase()).toContain("northwest arkansas");
      expect(metaTags.description?.toLowerCase()).toContain("fayetteville");
    });

    it("includes business contact information", () => {
      const metaTags = generateMetaTags(seoConfigs.contact);

      expect(metaTags.description).toContain("(520) 358-2221");
      expect(metaTags.description?.toLowerCase()).toContain("fayetteville");
    });

    it("optimizes title length for SEO", () => {
      Object.values(seoConfigs).forEach((config) => {
        const metaTags = generateMetaTags(config);
        expect(metaTags.title.length).toBeLessThanOrEqual(90);
      });
    });

    it("optimizes description length for SEO", () => {
      Object.values(seoConfigs).forEach((config) => {
        const metaTags = generateMetaTags(config);
        expect(metaTags.description.length).toBeLessThanOrEqual(170);
        expect(metaTags.description.length).toBeGreaterThanOrEqual(120);
      });
    });
  });
});
