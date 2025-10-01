import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Portfolio, { getStaticProps } from '@/pages/portfolio';
import { mockPortfolioItems } from '@/lib/mockData';
import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/portfolio',
    query: {},
    asPath: '/portfolio',
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

// Mock PortfolioGallery component
jest.mock('@/components/features/PortfolioGallery', () => ({
  PortfolioGallery: ({ items }: { items: any[] }) => (
    <div data-testid="portfolio-gallery">
      {items.map((item, index) => (
        <div key={item.id || index} data-testid="portfolio-item">
          <span>{item.title}</span>
          <span>{item.category}</span>
        </div>
      ))}
    </div>
  )
}));

// Mock Button component
jest.mock('@/components/ui/Button', () => ({
  Button: ({ children, onClick, variant }: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: string;
  }) => (
    <button data-testid="button" data-variant={variant} onClick={onClick}>
      {children}
    </button>
  )
}));

const mockProps = {
  portfolioItems: mockPortfolioItems
};

describe('Portfolio Page', () => {
  it('renders without crashing', () => {
    render(<Portfolio {...mockProps} />);
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  it('has correct SEO metadata', () => {
    render(<Portfolio {...mockProps} />);
    const layout = screen.getByTestId('layout');
    expect(layout).toHaveAttribute('data-title', 'Portfolio | Cagle\'s Landscaping & Restoration');
    expect(layout).toHaveAttribute('data-description');
  });

  it('displays the main heading', () => {
    render(<Portfolio {...mockProps} />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Our Portfolio/i)).toBeInTheDocument();
  });

  it('renders the portfolio gallery', () => {
    render(<Portfolio {...mockProps} />);
    expect(screen.getByTestId('portfolio-gallery')).toBeInTheDocument();
  });

  it('displays all portfolio items', () => {
    render(<Portfolio {...mockProps} />);
    const portfolioItems = screen.getAllByTestId('portfolio-item');
    expect(portfolioItems.length).toBe(mockPortfolioItems.length);
  });

  it('shows portfolio item details', () => {
    render(<Portfolio {...mockProps} />);

    mockPortfolioItems.forEach(item => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.category)).toBeInTheDocument();
    });
  });

  it('displays category filter buttons', () => {
    render(<Portfolio {...mockProps} />);

    expect(screen.getByText(/All Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/Lawn Care/i)).toBeInTheDocument();
    expect(screen.getByText(/Landscape Design/i)).toBeInTheDocument();
    expect(screen.getByText(/Hardscaping/i)).toBeInTheDocument();
    expect(screen.getByText(/Seasonal Cleanup/i)).toBeInTheDocument();
  });

  it('filters portfolio items by category', async () => {
    const user = userEvent.setup();
    render(<Portfolio {...mockProps} />);

    // Click on a specific category filter
    const lawnCareButton = screen.getByRole('button', { name: /Lawn Care/i });
    await user.click(lawnCareButton);

    // Should still show portfolio gallery (filtering happens within the component)
    expect(screen.getByTestId('portfolio-gallery')).toBeInTheDocument();
  });

  it('has proper heading hierarchy', () => {
    render(<Portfolio {...mockProps} />);

    // Should have one H1
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);

    // Should have H2s for sections
    const h2s = screen.getAllByRole('heading', { level: 2 });
    expect(h2s.length).toBeGreaterThan(0);
  });

  it('includes call-to-action section', () => {
    render(<Portfolio {...mockProps} />);
    expect(screen.getByText(/Ready to Start Your Project/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Get Free Estimate/i })).toBeInTheDocument();
  });

  it('displays project statistics', () => {
    render(<Portfolio {...mockProps} />);
    expect(screen.getByText(/500\+/i)).toBeInTheDocument();
    expect(screen.getByText(/Projects Completed/i)).toBeInTheDocument();
    expect(screen.getByText(/100%/i)).toBeInTheDocument();
    expect(screen.getByText(/Customer Satisfaction/i)).toBeInTheDocument();
  });

  it('shows service areas information', () => {
    render(<Portfolio {...mockProps} />);
    expect(screen.getByText(/Northwest Arkansas/i)).toBeInTheDocument();
    expect(screen.getByText(/Fayetteville/i)).toBeInTheDocument();
    expect(screen.getByText(/Springdale/i)).toBeInTheDocument();
  });

  it('includes contact information', () => {
    render(<Portfolio {...mockProps} />);
    expect(screen.getByText(/\(520\) 358-2221/i)).toBeInTheDocument();
    expect(screen.getByText(/Caglejosh4@gmail\.com/i)).toBeInTheDocument();
  });

  it('has navigation links to other pages', () => {
    render(<Portfolio {...mockProps} />);
    expect(screen.getByRole('link', { name: /Services/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Contact/i })).toBeInTheDocument();
  });

  it('displays project categories properly', () => {
    render(<Portfolio {...mockProps} />);

    const categories = ['Lawn Care', 'Landscape Design', 'Hardscaping', 'Seasonal Cleanup', 'Tree Care'];
    categories.forEach(category => {
      expect(screen.getByText(new RegExp(category, 'i'))).toBeInTheDocument();
    });
  });

  it('shows before and after project showcases', () => {
    render(<Portfolio {...mockProps} />);
    expect(screen.getByText(/Before & After/i)).toBeInTheDocument();
    expect(screen.getByText(/Transformations/i)).toBeInTheDocument();
  });

  it('includes testimonials or client feedback', () => {
    render(<Portfolio {...mockProps} />);
    expect(screen.getByText(/Client Testimonials/i)).toBeInTheDocument();
    expect(screen.getByText(/What Our Customers Say/i)).toBeInTheDocument();
  });

  it('displays quality assurance information', () => {
    render(<Portfolio {...mockProps} />);
    expect(screen.getByText(/Licensed & Insured/i)).toBeInTheDocument();
    expect(screen.getByText(/Quality Workmanship/i)).toBeInTheDocument();
  });
});

describe('getStaticProps', () => {
  it('returns the correct props structure', async () => {
    const result = await getStaticProps({});

    expect(result).toHaveProperty('props');
    expect(result.props).toHaveProperty('portfolioItems');
    expect(Array.isArray(result.props.portfolioItems)).toBe(true);
  });

  it('returns portfolio items with required properties', async () => {
    const result = await getStaticProps({});

    result.props.portfolioItems.forEach((item: any) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('description');
      expect(item).toHaveProperty('category');
      expect(item).toHaveProperty('beforeImage');
      expect(item).toHaveProperty('afterImage');
    });
  });

  it('returns all portfolio items from mock data', async () => {
    const result = await getStaticProps({});
    expect(result.props.portfolioItems).toHaveLength(mockPortfolioItems.length);
  });
});