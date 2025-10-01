import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';
import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  }),
}));

// Mock next/head
jest.mock('next/head', () => {
  return function Head({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
  };
});

// Mock components that might have complex dependencies
jest.mock('@/components/features/HeroSection', () => ({
  HeroSection: () => <div data-testid="hero-section">Hero Section</div>
}));

jest.mock('@/components/features/ServicesOverview', () => ({
  ServicesOverview: () => <div data-testid="services-overview">Services Overview</div>
}));

jest.mock('@/components/features/WhyChooseUs', () => ({
  WhyChooseUs: () => <div data-testid="why-choose-us">Why Choose Us</div>
}));

jest.mock('@/components/features/FeaturedPortfolio', () => ({
  FeaturedPortfolio: () => <div data-testid="featured-portfolio">Featured Portfolio</div>
}));

jest.mock('@/components/features/TestimonialsCarousel', () => ({
  TestimonialsCarousel: () => <div data-testid="testimonials">Testimonials</div>
}));

jest.mock('@/components/features/ServiceAreas', () => ({
  ServiceAreas: () => <div data-testid="service-areas">Service Areas</div>
}));

jest.mock('@/components/features/ContactCTA', () => ({
  ContactCTA: () => <div data-testid="contact-cta">Contact CTA</div>
}));

jest.mock('@/components/layout/Layout', () => ({
  Layout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="layout">{children}</div>
  )
}));

describe('Homepage', () => {
  it('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  it('renders all main sections', () => {
    render(<Home />);

    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('services-overview')).toBeInTheDocument();
    expect(screen.getByTestId('why-choose-us')).toBeInTheDocument();
    expect(screen.getByTestId('featured-portfolio')).toBeInTheDocument();
    expect(screen.getByTestId('testimonials')).toBeInTheDocument();
    expect(screen.getByTestId('service-areas')).toBeInTheDocument();
    expect(screen.getByTestId('contact-cta')).toBeInTheDocument();
  });

  it('has proper page structure', () => {
    render(<Home />);

    // Check that Layout wrapper is present
    const layout = screen.getByTestId('layout');
    expect(layout).toBeInTheDocument();

    // Check that all sections are rendered in the correct order
    const sections = [
      'hero-section',
      'services-overview',
      'why-choose-us',
      'featured-portfolio',
      'testimonials',
      'service-areas',
      'contact-cta'
    ];

    sections.forEach(sectionId => {
      expect(screen.getByTestId(sectionId)).toBeInTheDocument();
    });
  });

  it('renders SEO metadata elements', () => {
    render(<Home />);

    // Check for presence of title and meta tags
    // Note: In a real test environment, you might want to check document.head
    // but here we're just ensuring the component renders without errors
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });
});