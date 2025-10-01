import {
  services,
  testimonials,
  portfolioProjects,
  aboutContent,
} from "@/lib/mockData";

describe("Mock Data", () => {
  describe("mockServices", () => {
    it("exports services array", () => {
      expect(Array.isArray(services)).toBe(true);
      expect(services.length).toBeGreaterThan(0);
    });

    it("has required service properties", () => {
      services.forEach((service) => {
        expect(service).toHaveProperty("sys");
        expect(service).toHaveProperty("fields");
        expect(service.fields).toHaveProperty("name");
        expect(service.fields).toHaveProperty("slug");
      });
    });
  });

  describe("mockTestimonials", () => {
    it("exports testimonials array", () => {
      expect(Array.isArray(testimonials)).toBe(true);
      expect(testimonials.length).toBeGreaterThan(0);
    });

    it("has required testimonial properties", () => {
      testimonials.forEach((testimonial) => {
        expect(testimonial).toHaveProperty("sys");
        expect(testimonial).toHaveProperty("fields");
        expect(testimonial.fields).toHaveProperty("author");
        expect(testimonial.fields).toHaveProperty("rating");
      });
    });
  });

  describe("portfolioProjects", () => {
    it("exports projects array", () => {
      expect(Array.isArray(portfolioProjects)).toBe(true);
      expect(portfolioProjects.length).toBeGreaterThan(0);
    });

    it("has required project properties", () => {
      portfolioProjects.forEach((project) => {
        expect(project).toHaveProperty("sys");
        expect(project).toHaveProperty("fields");
        expect(project.fields).toHaveProperty("title");
        expect(project.fields).toHaveProperty("category");
      });
    });
  });

  describe("aboutContent", () => {
    it("exports about content object", () => {
      expect(typeof aboutContent).toBe("object");
      expect(aboutContent).toHaveProperty("sys");
      expect(aboutContent).toHaveProperty("fields");
    });

    it("has required about properties", () => {
      expect(aboutContent.fields).toHaveProperty("title");
      expect(aboutContent.fields).toHaveProperty("description");
    });
  });
});
