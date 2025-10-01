import { render, screen } from '@testing-library/react';
import ServicePage, { getStaticProps, getStaticPaths } from '@/pages/services/[slug]';
import { mockServices } from '@/lib/mockData';
import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/services/[slug]',
    query: { slug: 'lawn-care' },
    asPath: '/services/lawn-care',
  }),
}));

// Mock next/head
jest.mock('next/head', () => {
  return function Head({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
  };
});

// Mock Layout component
jest.mock('@/components/layout/Layout', () => ({
  Layout: ({ children, title, description }: {
    children: React.ReactNode;
    title: string;
    description: string;
  }) => (
    <div data-testid="layout" data-title={title} data-description={description}>
      {children}
    </div>
  )
}));

// Mock Card component
jest.mock('@/components/ui/Card', () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card" className={className}>{children}</div>
  )
}));

// Mock Button component
jest.mock('@/components/ui/Button', () => ({
  Button: ({ children, href, variant }: {
    children: React.ReactNode;
    href?: string;
    variant?: string;
  }) => (
    <a data-testid="button" data-variant={variant} href={href}>
      {children}
    </a>
  )
}));

// Mock ExportedImage
jest.mock('next-image-export-optimizer', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} data-testid="optimized-image" {...props} />
  ),
}));

// Mock icons
jest.mock('lucide-react', () => ({
  Check: () => <span data-testid="check-icon">✓</span>,
  Star: () => <span data-testid="star-icon">⭐</span>,
  Phone: () => <span data-testid="phone-icon">📞</span>,
  Mail: () => <span data-testid="mail-icon">✉️</span>,
  ArrowRight: () => <span data-testid="arrow-icon">→</span>,
}));

const mockService = mockServices[0]; // Lawn Care service
const mockProps = {
  service: mockService
};

describe('Service Page', () => {
  it('renders without crashing', () => {
    render(<ServicePage {...mockProps} />);
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  it('has correct SEO metadata', () => {
    render(<ServicePage {...mockProps} />);
    const layout = screen.getByTestId('layout');
    expect(layout).toHaveAttribute('data-title', `${mockService.name} | Cagle's Landscaping & Restoration`);
    expect(layout).toHaveAttribute('data-description');
  });

  it('displays the service name as main heading', () => {
    render(<ServicePage {...mockProps} />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(mockService.name)).toBeInTheDocument();
  });

  it('shows service description', () => {
    render(<ServicePage {...mockProps} />);
    expect(screen.getByText(mockService.description)).toBeInTheDocument();
  });

  it('displays service features', () => {
    render(<ServicePage {...mockProps} />);

    mockService.features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it('shows service image', () => {
    render(<ServicePage {...mockProps} />);
    const image = screen.getByTestId('optimized-image');
    expect(image).toHaveAttribute('alt', expect.stringContaining(mockService.name));
  });

  it('displays service process section', () => {
    render(<ServicePage {...mockProps} />);
    expect(screen.getByText(/Our Process/i)).toBeInTheDocument();
    expect(screen.getByText(/Consultation/i)).toBeInTheDocument();
    expect(screen.getByText(/Assessment/i)).toBeInTheDocument();
    expect(screen.getByText(/Implementation/i)).toBeInTheDocument();
    expect(screen.getByText(/Follow-up/i)).toBeInTheDocument();
  });

  it('includes pricing information', () => {
    render(<ServicePage {...mockProps} />);
    expect(screen.getByText(/Pricing/i)).toBeInTheDocument();
    expect(screen.getByText(/Free Estimates/i)).toBeInTheDocument();
    expect(screen.getByText(/Competitive Rates/i)).toBeInTheDocument();
  });

  it('shows service benefits section', () => {
    render(<ServicePage {...mockProps} />);
    expect(screen.getByText(/Benefits/i)).toBeInTheDocument();
    expect(screen.getByText(/Professional Results/i)).toBeInTheDocument();
    expect(screen.getByText(/Time Savings/i)).toBeInTheDocument();
    expect(screen.getByText(/Quality Guarantee/i)).toBeInTheDocument();
  });

  it('displays frequently asked questions', () => {
    render(<ServicePage {...mockProps} />);
    expect(screen.getByText(/Frequently Asked Questions/i)).toBeInTheDocument();
    expect(screen.getByText(/How often should/i)).toBeInTheDocument();
    expect(screen.getByText(/What is included/i)).toBeInTheDocument();
  });

  it('includes testimonials section', () => {
    render(<ServicePage {...mockProps} />);
    expect(screen.getByText(/Customer Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/What Our Customers Say/i)).toBeInTheDocument();
  });

  it('shows service areas information', () => {
    render(<ServicePage {...mockProps} />);
    expect(screen.getByText(/Service Areas/i)).toBeInTheDocument();
    expect(screen.getByText(/Fayetteville/i)).toBeInTheDocument();
    expect(screen.getByText(/Springdale/i)).toBeInTheDocument();
    expect(screen.getByText(/Rogers/i)).toBeInTheDocument();
    expect(screen.getByText(/Bentonville/i)).toBeInTheDocument();
  });

  it('displays contact information', () => {
    render(<ServicePage {...mockProps} />);
    expect(screen.getByText(/\(520\) 358-2221/i)).toBeInTheDocument();
    expect(screen.getByText(/Caglejosh4@gmail\.com/i)).toBeInTheDocument();
  });

  it('includes call-to-action section', () => {
    render(<ServicePage {...mockProps} />);
    expect(screen.getByText(/Ready to Get Started/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Get Free Estimate/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Contact Us/i })).toBeInTheDocument();
  });

  it('has proper heading hierarchy', () => {
    render(<ServicePage {...mockProps} />);

    // Should have one H1
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);

    // Should have multiple H2s for sections
    const h2s = screen.getAllByRole('heading', { level: 2 });
    expect(h2s.length).toBeGreaterThan(4);
  });

  it('shows related services section', () => {
    render(<ServicePage {...mockProps} />);
    expect(screen.getByText(/Related Services/i)).toBeInTheDocument();
    expect(screen.getByText(/Other Services We Offer/i)).toBeInTheDocument();
  });

  it('displays quality assurance information', () => {
    render(<ServicePage {...mockProps} />);
    expect(screen.getByText(/Licensed & Insured/i)).toBeInTheDocument();
    expect(screen.getByText(/100% Satisfaction/i)).toBeInTheDocument();
    expect(screen.getByText(/Guaranteed/i)).toBeInTheDocument();
  });

  it('includes seasonal information for applicable services', () => {
    render(<ServicePage {...mockProps} />);
    expect(screen.getByText(/Best Time/i)).toBeInTheDocument();
    expect(screen.getByText(/Seasonal Considerations/i)).toBeInTheDocument();
  });

  it('shows equipment and materials information', () => {
    render(<ServicePage {...mockProps} />);
    expect(screen.getByText(/Professional Equipment/i)).toBeInTheDocument();
    expect(screen.getByText(/Quality Materials/i)).toBeInTheDocument();
  });

  it('displays check icons for features', () => {
    render(<ServicePage {...mockProps} />);
    const checkIcons = screen.getAllByTestId('check-icon');
    expect(checkIcons.length).toBeGreaterThanOrEqual(mockService.features.length);
  });
});

describe('getStaticPaths', () => {
  it('returns paths for all services', async () => {
    const result = await getStaticPaths({});

    expect(result).toHaveProperty('paths');
    expect(result).toHaveProperty('fallback');
    expect(result.fallback).toBe(false);

    expect(result.paths).toHaveLength(mockServices.length);

    result.paths.forEach((path: any, index: number) => {
      expect(path.params.slug).toBe(mockServices[index].slug);
    });
  });
});

describe('getStaticProps', () => {
  it('returns correct props for valid slug', async () => {
    const context = { params: { slug: 'lawn-care' } };
    const result = await getStaticProps(context);

    expect(result).toHaveProperty('props');
    expect(result.props).toHaveProperty('service');
    expect(result.props.service.slug).toBe('lawn-care');
  });

  it('returns notFound for invalid slug', async () => {
    const context = { params: { slug: 'invalid-service' } };
    const result = await getStaticProps(context);

    expect(result).toHaveProperty('notFound');
    expect(result.notFound).toBe(true);
  });

  it('returns service with required properties', async () => {
    const context = { params: { slug: 'lawn-care' } };
    const result = await getStaticProps(context);

    if ('props' in result) {
      const service = result.props.service;
      expect(service).toHaveProperty('id');
      expect(service).toHaveProperty('name');
      expect(service).toHaveProperty('slug');
      expect(service).toHaveProperty('description');
      expect(service).toHaveProperty('features');
      expect(service).toHaveProperty('image');
    }
  });

  it('handles all service slugs correctly', async () => {
    for (const service of mockServices) {
      const context = { params: { slug: service.slug } };
      const result = await getStaticProps(context);

      expect(result).toHaveProperty('props');
      if ('props' in result) {
        expect(result.props.service.slug).toBe(service.slug);
      }
    }
  });
});