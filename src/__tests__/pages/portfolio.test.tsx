import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Portfolio, { getStaticProps } from '@/pages/portfolio';
import { portfolioProjects } from '@/lib/mockData';
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

// Mock ExportedImage
jest.mock('next-image-export-optimizer', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className }: { src: string; alt: string; width?: number; height?: number; className?: string }) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      data-testid="optimized-image"
    />
  ),
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
  projects: portfolioProjects
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

  it('displays project cards', () => {
    render(<Portfolio {...mockProps} />);
    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('displays all portfolio projects', () => {
    render(<Portfolio {...mockProps} />);

    portfolioProjects.forEach(item => {
      expect(screen.getByText(item.fields.title)).toBeInTheDocument();
    });
  });

  it('shows project details and categories', () => {
    render(<Portfolio {...mockProps} />);

    portfolioProjects.forEach(item => {
      expect(screen.getByText(item.fields.title)).toBeInTheDocument();
      expect(screen.getByText(item.fields.category)).toBeInTheDocument();
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
    expect(result.props).toHaveProperty('projects');
    expect(Array.isArray(result.props.projects)).toBe(true);
  });

  it('returns projects with required properties', async () => {
    const result = await getStaticProps({});

    result.props.projects.forEach((item: { sys: { id: string }; fields: { title: string; category: string } }) => {
      expect(item).toHaveProperty('sys');
      expect(item).toHaveProperty('fields');
      expect(item.fields).toHaveProperty('title');
      expect(item.fields).toHaveProperty('category');
    });
  });

  it('returns all projects from mock data', async () => {
    const result = await getStaticProps({});
    expect(result.props.projects).toHaveLength(portfolioProjects.length);
  });
});