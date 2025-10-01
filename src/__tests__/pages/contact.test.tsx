import { render, screen } from '@testing-library/react';
import Contact from '@/pages/contact';
import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/contact',
    query: {},
    asPath: '/contact',
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

// Mock ContactForm component
jest.mock('@/components/features/ContactForm', () => ({
  ContactForm: () => <div data-testid="contact-form">Contact Form</div>
}));

// Mock Card component
jest.mock('@/components/ui/Card', () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card" className={className}>{children}</div>
  )
}));

// Mock icons
jest.mock('lucide-react', () => ({
  Phone: () => <span data-testid="phone-icon">📞</span>,
  Mail: () => <span data-testid="mail-icon">✉️</span>,
  MapPin: () => <span data-testid="map-icon">📍</span>,
  Clock: () => <span data-testid="clock-icon">🕐</span>,
}));

describe('Contact Page', () => {
  it('renders without crashing', () => {
    render(<Contact />);
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  it('has correct SEO metadata', () => {
    render(<Contact />);
    const layout = screen.getByTestId('layout');
    expect(layout).toHaveAttribute('data-title', 'Contact Us | Cagle\'s Landscaping & Restoration');
    expect(layout).toHaveAttribute('data-description');
  });

  it('displays the main heading', () => {
    render(<Contact />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
  });

  it('renders the contact form', () => {
    render(<Contact />);
    expect(screen.getByTestId('contact-form')).toBeInTheDocument();
  });

  it('displays contact information', () => {
    render(<Contact />);
    expect(screen.getByText(/\(520\) 358-2221/i)).toBeInTheDocument();
    expect(screen.getByText(/Caglejosh4@gmail\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Fayetteville, Arkansas/i)).toBeInTheDocument();
  });

  it('shows business hours', () => {
    render(<Contact />);
    expect(screen.getByText(/Business Hours/i)).toBeInTheDocument();
    expect(screen.getByText(/Monday - Friday/i)).toBeInTheDocument();
    expect(screen.getByText(/7:00 AM - 6:00 PM/i)).toBeInTheDocument();
    expect(screen.getByText(/Saturday/i)).toBeInTheDocument();
    expect(screen.getByText(/8:00 AM - 4:00 PM/i)).toBeInTheDocument();
  });

  it('displays service areas', () => {
    render(<Contact />);
    expect(screen.getByText(/Service Areas/i)).toBeInTheDocument();
    expect(screen.getByText(/Northwest Arkansas/i)).toBeInTheDocument();
    expect(screen.getByText(/Fayetteville/i)).toBeInTheDocument();
    expect(screen.getByText(/Springdale/i)).toBeInTheDocument();
    expect(screen.getByText(/Rogers/i)).toBeInTheDocument();
    expect(screen.getByText(/Bentonville/i)).toBeInTheDocument();
  });

  it('includes contact icons', () => {
    render(<Contact />);
    expect(screen.getByTestId('phone-icon')).toBeInTheDocument();
    expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
    expect(screen.getByTestId('map-icon')).toBeInTheDocument();
    expect(screen.getByTestId('clock-icon')).toBeInTheDocument();
  });

  it('shows emergency contact information', () => {
    render(<Contact />);
    expect(screen.getByText(/Emergency Services/i)).toBeInTheDocument();
    expect(screen.getByText(/24\/7/i)).toBeInTheDocument();
  });

  it('displays response time expectations', () => {
    render(<Contact />);
    expect(screen.getByText(/Response Time/i)).toBeInTheDocument();
    expect(screen.getByText(/within 24 hours/i)).toBeInTheDocument();
  });

  it('includes free estimate information', () => {
    render(<Contact />);
    expect(screen.getByText(/Free Estimates/i)).toBeInTheDocument();
    expect(screen.getByText(/No obligation/i)).toBeInTheDocument();
  });

  it('has proper heading hierarchy', () => {
    render(<Contact />);

    // Should have one H1
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);

    // Should have multiple H2s for sections
    const h2s = screen.getAllByRole('heading', { level: 2 });
    expect(h2s.length).toBeGreaterThan(1);
  });

  it('displays contact method cards', () => {
    render(<Contact />);
    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBeGreaterThan(2);
  });

  it('includes licensing information', () => {
    render(<Contact />);
    expect(screen.getByText(/Licensed & Insured/i)).toBeInTheDocument();
    expect(screen.getByText(/Fully Bonded/i)).toBeInTheDocument();
  });

  it('shows service guarantee', () => {
    render(<Contact />);
    expect(screen.getByText(/100% Satisfaction/i)).toBeInTheDocument();
    expect(screen.getByText(/Guaranteed/i)).toBeInTheDocument();
  });

  it('displays social proof elements', () => {
    render(<Contact />);
    expect(screen.getByText(/20\+ Years/i)).toBeInTheDocument();
    expect(screen.getByText(/Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/500\+/i)).toBeInTheDocument();
    expect(screen.getByText(/Happy Customers/i)).toBeInTheDocument();
  });

  it('includes call-to-action messaging', () => {
    render(<Contact />);
    expect(screen.getByText(/Get Your Free Estimate/i)).toBeInTheDocument();
    expect(screen.getByText(/Ready to Transform/i)).toBeInTheDocument();
  });

  it('has contact form integration note', () => {
    render(<Contact />);
    expect(screen.getByText(/Online Form/i)).toBeInTheDocument();
    expect(screen.getByText(/Quick Response/i)).toBeInTheDocument();
  });

  it('displays payment and pricing information', () => {
    render(<Contact />);
    expect(screen.getByText(/Competitive Pricing/i)).toBeInTheDocument();
    expect(screen.getByText(/Flexible Payment/i)).toBeInTheDocument();
  });

  it('shows service quality assurance', () => {
    render(<Contact />);
    expect(screen.getByText(/Quality Workmanship/i)).toBeInTheDocument();
    expect(screen.getByText(/Professional Service/i)).toBeInTheDocument();
  });
});