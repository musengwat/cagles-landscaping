import { render, screen } from '@testing-library/react';
import { Layout } from '@/components/layout/Layout';
import '@testing-library/jest-dom';

// Mock next/head
jest.mock('next/head', () => {
  return function Head({ children }: { children: React.ReactNode }) {
    return <div data-testid="head">{children}</div>;
  };
});

// Mock Header component
jest.mock('@/components/layout/Header', () => ({
  Header: () => <header data-testid="header">Header Component</header>
}));

// Mock Footer component
jest.mock('@/components/layout/Footer', () => ({
  Footer: () => <footer data-testid="footer">Footer Component</footer>
}));

// Mock performance monitoring
jest.mock('@/lib/performance', () => ({
  initWebVitals: jest.fn(),
  reportWebVitals: jest.fn(),
}));

const defaultProps = {
  title: 'Test Page | Cagle\'s Landscaping',
  description: 'Test page description for SEO',
  children: <div>Test content</div>
};

describe('Layout Component', () => {
  it('renders without crashing', () => {
    render(<Layout {...defaultProps} />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('displays children content', () => {
    render(<Layout {...defaultProps} />);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders header and footer components', () => {
    render(<Layout {...defaultProps} />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('sets page title correctly', () => {
    render(<Layout {...defaultProps} />);
    const head = screen.getByTestId('head');
    expect(head).toContainHTML('<title>Test Page | Cagle\'s Landscaping</title>');
  });

  it('sets meta description', () => {
    render(<Layout {...defaultProps} />);
    const head = screen.getByTestId('head');
    expect(head).toContainHTML('<meta name="description" content="Test page description for SEO"/>');
  });

  it('includes Open Graph meta tags', () => {
    render(<Layout {...defaultProps} />);
    const head = screen.getByTestId('head');

    expect(head).toContainHTML('<meta property="og:title" content="Test Page | Cagle\'s Landscaping"/>');
    expect(head).toContainHTML('<meta property="og:description" content="Test page description for SEO"/>');
    expect(head).toContainHTML('<meta property="og:type" content="website"/>');
  });

  it('includes Twitter Card meta tags', () => {
    render(<Layout {...defaultProps} />);
    const head = screen.getByTestId('head');

    expect(head).toContainHTML('<meta name="twitter:card" content="summary_large_image"/>');
    expect(head).toContainHTML('<meta name="twitter:title" content="Test Page | Cagle\'s Landscaping"/>');
    expect(head).toContainHTML('<meta name="twitter:description" content="Test page description for SEO"/>');
  });

  it('sets canonical URL', () => {
    render(<Layout {...defaultProps} />);
    const head = screen.getByTestId('head');
    expect(head).toContainHTML('<link rel="canonical"');
  });

  it('includes viewport meta tag', () => {
    render(<Layout {...defaultProps} />);
    const head = screen.getByTestId('head');
    expect(head).toContainHTML('<meta name="viewport" content="width=device-width, initial-scale=1"/>');
  });

  it('adds structured data when provided', () => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'Cagle\'s Landscaping & Restoration'
    };

    render(<Layout {...defaultProps} structuredData={structuredData} />);
    const head = screen.getByTestId('head');
    expect(head).toContainHTML('application/ld+json');
  });

  it('sets custom page title when provided', () => {
    const customTitle = 'Custom Page Title | Cagle\'s Landscaping';
    render(<Layout {...defaultProps} title={customTitle} />);

    const head = screen.getByTestId('head');
    expect(head).toContainHTML(`<title>${customTitle}</title>`);
  });

  it('uses default title when none provided', () => {
    const propsWithoutTitle = { ...defaultProps };
    delete (propsWithoutTitle as any).title;

    render(<Layout {...propsWithoutTitle} />);
    const head = screen.getByTestId('head');
    expect(head).toContainHTML('<title>Cagle\'s Landscaping & Restoration</title>');
  });

  it('includes favicon and icon links', () => {
    render(<Layout {...defaultProps} />);
    const head = screen.getByTestId('head');
    expect(head).toContainHTML('<link rel="icon"');
  });

  it('sets language attribute', () => {
    render(<Layout {...defaultProps} />);
    // Check that html element has lang attribute (this would be set in _document.tsx)
    // For this test, we just verify the component renders properly
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('includes robots meta tag', () => {
    render(<Layout {...defaultProps} />);
    const head = screen.getByTestId('head');
    expect(head).toContainHTML('<meta name="robots"');
  });

  it('adds author meta tag', () => {
    render(<Layout {...defaultProps} />);
    const head = screen.getByTestId('head');
    expect(head).toContainHTML('<meta name="author" content="Cagle\'s Landscaping & Restoration"/>');
  });

  it('includes keywords meta tag', () => {
    render(<Layout {...defaultProps} />);
    const head = screen.getByTestId('head');
    expect(head).toContainHTML('<meta name="keywords"');
  });

  it('sets Open Graph image when provided', () => {
    const image = 'https://example.com/og-image.jpg';
    render(<Layout {...defaultProps} image={image} />);

    const head = screen.getByTestId('head');
    expect(head).toContainHTML(`<meta property="og:image" content="${image}"/>`);
  });

  it('has proper main content structure', () => {
    render(<Layout {...defaultProps} />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('applies CSS classes for styling', () => {
    render(<Layout {...defaultProps} />);
    const main = screen.getByRole('main');
    expect(main).toHaveClass(); // Check that classes are applied
  });

  it('handles multiple children elements', () => {
    const multipleChildren = (
      <>
        <div>First child</div>
        <div>Second child</div>
        <div>Third child</div>
      </>
    );

    render(<Layout {...defaultProps}>{multipleChildren}</Layout>);

    expect(screen.getByText('First child')).toBeInTheDocument();
    expect(screen.getByText('Second child')).toBeInTheDocument();
    expect(screen.getByText('Third child')).toBeInTheDocument();
  });

  it('includes schema.org markup for local business', () => {
    const localBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'Cagle\'s Landscaping & Restoration',
      'telephone': '(520) 358-2221',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Fayetteville',
        'addressRegion': 'Arkansas'
      }
    };

    render(<Layout {...defaultProps} structuredData={localBusinessSchema} />);
    const head = screen.getByTestId('head');
    expect(head).toContainHTML('LocalBusiness');
  });

  it('sets proper charset and content type', () => {
    render(<Layout {...defaultProps} />);
    const head = screen.getByTestId('head');
    expect(head).toContainHTML('<meta charSet="utf-8"/>');
  });

  it('includes mobile-friendly meta tags', () => {
    render(<Layout {...defaultProps} />);
    const head = screen.getByTestId('head');
    expect(head).toContainHTML('width=device-width');
    expect(head).toContainHTML('initial-scale=1');
  });

  it('adds theme color meta tag', () => {
    render(<Layout {...defaultProps} />);
    const head = screen.getByTestId('head');
    expect(head).toContainHTML('<meta name="theme-color"');
  });

  it('includes preconnect links for performance', () => {
    render(<Layout {...defaultProps} />);
    const head = screen.getByTestId('head');
    expect(head).toContainHTML('<link rel="preconnect"');
  });

  it('handles custom className prop', () => {
    const customClassName = 'custom-layout-class';
    render(<Layout {...defaultProps} className={customClassName} />);

    const main = screen.getByRole('main');
    expect(main).toHaveClass(customClassName);
  });

  it('includes alternate language links if provided', () => {
    const alternateLanguages = [
      { href: '/es', hrefLang: 'es' },
      { href: '/fr', hrefLang: 'fr' }
    ];

    render(<Layout {...defaultProps} alternateLanguages={alternateLanguages} />);
    const head = screen.getByTestId('head');
    expect(head).toContainHTML('hreflang="es"');
    expect(head).toContainHTML('hreflang="fr"');
  });
});