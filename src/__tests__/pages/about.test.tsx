import { render, screen } from '@testing-library/react';
import About from '@/pages/about';
import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/about',
    query: {},
    asPath: '/about',
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

// Mock ExportedImage
jest.mock('next-image-export-optimizer', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="optimized-image" />
  ),
}));

describe('About Page', () => {
  it('renders without crashing', () => {
    render(<About />);
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  it('has correct SEO metadata', () => {
    render(<About />);
    const layout = screen.getByTestId('layout');
    expect(layout).toHaveAttribute('data-title', 'About Us | Cagle\'s Landscaping & Restoration');
    expect(layout).toHaveAttribute('data-description');
  });

  it('displays the main heading', () => {
    render(<About />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/About Cagle's Landscaping/i)).toBeInTheDocument();
  });

  it('shows company story section', () => {
    render(<About />);
    expect(screen.getByText(/Our Story/i)).toBeInTheDocument();
    expect(screen.getByText(/founded/i)).toBeInTheDocument();
  });

  it('displays owner information', () => {
    render(<About />);
    expect(screen.getByText(/Josh Cagle/i)).toBeInTheDocument();
    expect(screen.getByText(/Owner & Founder/i)).toBeInTheDocument();
  });

  it('shows company values and mission', () => {
    render(<About />);
    expect(screen.getByText(/Our Mission/i)).toBeInTheDocument();
    expect(screen.getByText(/Quality/i)).toBeInTheDocument();
    expect(screen.getByText(/Reliability/i)).toBeInTheDocument();
    expect(screen.getByText(/Excellence/i)).toBeInTheDocument();
  });

  it('displays years of experience', () => {
    render(<About />);
    expect(screen.getByText(/20\+/i)).toBeInTheDocument();
    expect(screen.getByText(/Years Experience/i)).toBeInTheDocument();
  });

  it('shows service commitment section', () => {
    render(<About />);
    expect(screen.getByText(/Licensed & Insured/i)).toBeInTheDocument();
    expect(screen.getByText(/Free Estimates/i)).toBeInTheDocument();
    expect(screen.getByText(/Customer Satisfaction/i)).toBeInTheDocument();
  });

  it('includes contact information', () => {
    render(<About />);
    expect(screen.getByText(/\(520\) 358-2221/i)).toBeInTheDocument();
    expect(screen.getByText(/Caglejosh4@gmail\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Fayetteville, Arkansas/i)).toBeInTheDocument();
  });

  it('displays service areas', () => {
    render(<About />);
    expect(screen.getByText(/Northwest Arkansas/i)).toBeInTheDocument();
    expect(screen.getByText(/Fayetteville/i)).toBeInTheDocument();
    expect(screen.getByText(/Springdale/i)).toBeInTheDocument();
    expect(screen.getByText(/Rogers/i)).toBeInTheDocument();
    expect(screen.getByText(/Bentonville/i)).toBeInTheDocument();
  });

  it('has call-to-action section', () => {
    render(<About />);
    expect(screen.getByText(/Ready to Get Started/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Contact Us/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View Services/i })).toBeInTheDocument();
  });

  it('renders company images', () => {
    render(<About />);
    const images = screen.getAllByTestId('optimized-image');
    expect(images.length).toBeGreaterThan(0);

    images.forEach(img => {
      expect(img).toHaveAttribute('alt');
      expect(img.getAttribute('alt')).not.toBe('');
    });
  });

  it('has proper heading hierarchy', () => {
    render(<About />);

    // Should have one H1
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);

    // Should have multiple H2s for sections
    const h2s = screen.getAllByRole('heading', { level: 2 });
    expect(h2s.length).toBeGreaterThan(1);
  });

  it('displays company stats and achievements', () => {
    render(<About />);
    expect(screen.getByText(/500\+/i)).toBeInTheDocument();
    expect(screen.getByText(/Projects Completed/i)).toBeInTheDocument();
    expect(screen.getByText(/100%/i)).toBeInTheDocument();
    expect(screen.getByText(/Customer Satisfaction/i)).toBeInTheDocument();
  });

  it('includes proper navigation links', () => {
    render(<About />);

    // Internal navigation links
    expect(screen.getByRole('link', { name: /Services/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Portfolio/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Contact/i })).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<About />);

    // Check for main content wrapper
    expect(screen.getByTestId('layout')).toBeInTheDocument();

    // Check for section cards
    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBeGreaterThan(2);
  });

  it('displays licensing and insurance information', () => {
    render(<About />);
    expect(screen.getByText(/Licensed/i)).toBeInTheDocument();
    expect(screen.getByText(/Insured/i)).toBeInTheDocument();
    expect(screen.getByText(/Bonded/i)).toBeInTheDocument();
  });
});