import { render, screen } from '@testing-library/react';
import ServicesPage, { getStaticProps } from '@/pages/services/index';
import { mockServices } from '@/lib/mockData';
import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/services',
    query: {},
    asPath: '/services',
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
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="optimized-image" />
  ),
}));

// Mock icons
jest.mock('lucide-react', () => ({
  Check: () => <span data-testid="check-icon">✓</span>,
  ArrowRight: () => <span data-testid="arrow-icon">→</span>,
  Leaf: () => <span data-testid="leaf-icon">🍃</span>,
  Scissors: () => <span data-testid="scissors-icon">✂️</span>,
  Hammer: () => <span data-testid="hammer-icon">🔨</span>,
  Droplets: () => <span data-testid="droplets-icon">💧</span>,
  TreePine: () => <span data-testid="tree-icon">🌲</span>,
  Trash2: () => <span data-testid="trash-icon">🗑️</span>,
}));

const mockProps = {
  services: mockServices
};

describe('Services Index Page', () => {
  it('renders without crashing', () => {
    render(<ServicesPage {...mockProps} />);
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  it('has correct SEO metadata', () => {
    render(<ServicesPage {...mockProps} />);
    const layout = screen.getByTestId('layout');
    expect(layout).toHaveAttribute('data-title', 'Landscaping Services | Cagle\'s Landscaping & Restoration');
    expect(layout).toHaveAttribute('data-description');
  });

  it('displays the main heading', () => {
    render(<ServicesPage {...mockProps} />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Our Landscaping Services/i)).toBeInTheDocument();
  });

  it('renders all service cards', () => {
    render(<ServicesPage {...mockProps} />);

    mockServices.forEach(service => {
      expect(screen.getByText(service.name)).toBeInTheDocument();
      expect(screen.getByText(service.description)).toBeInTheDocument();
    });
  });

  it('displays service cards with proper structure', () => {
    render(<ServicesPage {...mockProps} />);
    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBe(mockServices.length);
  });

  it('shows service features for each service', () => {
    render(<ServicesPage {...mockProps} />);

    mockServices.forEach(service => {
      service.features.forEach(feature => {
        expect(screen.getByText(feature)).toBeInTheDocument();
      });
    });
  });

  it('includes learn more buttons for each service', () => {
    render(<ServicesPage {...mockProps} />);
    const learnMoreButtons = screen.getAllByTestId('button');
    expect(learnMoreButtons.length).toBeGreaterThanOrEqual(mockServices.length);
  });

  it('displays service icons', () => {
    render(<ServicesPage {...mockProps} />);
    expect(screen.getByTestId('leaf-icon')).toBeInTheDocument();
    expect(screen.getByTestId('scissors-icon')).toBeInTheDocument();
    expect(screen.getByTestId('hammer-icon')).toBeInTheDocument();
  });

  it('shows why choose us section', () => {
    render(<ServicesPage {...mockProps} />);
    expect(screen.getByText(/Why Choose Cagle's Landscaping/i)).toBeInTheDocument();
    expect(screen.getByText(/20\+ Years Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/Licensed & Insured/i)).toBeInTheDocument();
    expect(screen.getByText(/Free Estimates/i)).toBeInTheDocument();
  });

  it('displays service areas information', () => {
    render(<ServicesPage {...mockProps} />);
    expect(screen.getByText(/Service Areas/i)).toBeInTheDocument();
    expect(screen.getByText(/Northwest Arkansas/i)).toBeInTheDocument();
    expect(screen.getByText(/Fayetteville/i)).toBeInTheDocument();
    expect(screen.getByText(/Springdale/i)).toBeInTheDocument();
    expect(screen.getByText(/Rogers/i)).toBeInTheDocument();
    expect(screen.getByText(/Bentonville/i)).toBeInTheDocument();
  });

  it('includes our process section', () => {
    render(<ServicesPage {...mockProps} />);
    expect(screen.getByText(/Our Process/i)).toBeInTheDocument();
    expect(screen.getByText(/Consultation/i)).toBeInTheDocument();
    expect(screen.getByText(/Planning/i)).toBeInTheDocument();
    expect(screen.getByText(/Execution/i)).toBeInTheDocument();
    expect(screen.getByText(/Follow-up/i)).toBeInTheDocument();
  });

  it('shows call-to-action section', () => {
    render(<ServicesPage {...mockProps} />);
    expect(screen.getByText(/Ready to Get Started/i)).toBeInTheDocument();
    expect(screen.getByText(/Get Your Free Estimate/i)).toBeInTheDocument();
    expect(screen.getByText(/\(520\) 358-2221/i)).toBeInTheDocument();
  });

  it('has proper heading hierarchy', () => {
    render(<ServicesPage {...mockProps} />);

    // Should have one H1
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);

    // Should have multiple H2s for sections
    const h2s = screen.getAllByRole('heading', { level: 2 });
    expect(h2s.length).toBeGreaterThan(3);
  });

  it('displays service images', () => {
    render(<ServicesPage {...mockProps} />);
    const images = screen.getAllByTestId('optimized-image');
    expect(images.length).toBe(mockServices.length);

    images.forEach(img => {
      expect(img).toHaveAttribute('alt');
      expect(img.getAttribute('alt')).not.toBe('');
    });
  });

  it('includes pricing information', () => {
    render(<ServicesPage {...mockProps} />);
    expect(screen.getByText(/Competitive Pricing/i)).toBeInTheDocument();
    expect(screen.getByText(/Free Estimates/i)).toBeInTheDocument();
    expect(screen.getByText(/No Hidden Fees/i)).toBeInTheDocument();
  });

  it('shows quality guarantee', () => {
    render(<ServicesPage {...mockProps} />);
    expect(screen.getByText(/100% Satisfaction/i)).toBeInTheDocument();
    expect(screen.getByText(/Guaranteed/i)).toBeInTheDocument();
    expect(screen.getByText(/Quality Workmanship/i)).toBeInTheDocument();
  });

  it('displays contact information', () => {
    render(<ServicesPage {...mockProps} />);
    expect(screen.getByText(/\(520\) 358-2221/i)).toBeInTheDocument();
    expect(screen.getByText(/Caglejosh4@gmail\.com/i)).toBeInTheDocument();
  });

  it('includes navigation to individual service pages', () => {
    render(<ServicesPage {...mockProps} />);

    mockServices.forEach(service => {
      const serviceLink = screen.getByRole('link', { name: new RegExp(`${service.name}.*Learn More`, 'i') });
      expect(serviceLink).toHaveAttribute('href', `/services/${service.slug}`);
    });
  });

  it('shows service availability', () => {
    render(<ServicesPage {...mockProps} />);
    expect(screen.getByText(/Monday - Friday/i)).toBeInTheDocument();
    expect(screen.getByText(/7:00 AM - 6:00 PM/i)).toBeInTheDocument();
    expect(screen.getByText(/Saturday/i)).toBeInTheDocument();
    expect(screen.getByText(/Emergency Services/i)).toBeInTheDocument();
  });
});

describe('getStaticProps', () => {
  it('returns the correct props structure', async () => {
    const result = await getStaticProps({});

    expect(result).toHaveProperty('props');
    expect(result.props).toHaveProperty('services');
    expect(Array.isArray(result.props.services)).toBe(true);
  });

  it('returns services with required properties', async () => {
    const result = await getStaticProps({});

    result.props.services.forEach((service: { id: string; name: string; slug: string; description: string; features: string[]; image: string }) => {
      expect(service).toHaveProperty('id');
      expect(service).toHaveProperty('name');
      expect(service).toHaveProperty('slug');
      expect(service).toHaveProperty('description');
      expect(service).toHaveProperty('features');
      expect(service).toHaveProperty('image');
    });
  });

  it('returns all services from mock data', async () => {
    const result = await getStaticProps({});
    expect(result.props.services).toHaveLength(mockServices.length);
  });
});