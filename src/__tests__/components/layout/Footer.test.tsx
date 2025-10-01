import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/layout/Footer';
import '@testing-library/jest-dom';

// Mock Next.js Link
jest.mock('next/link', () => {
  return function Link({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

// Mock icons
jest.mock('lucide-react', () => ({
  Phone: () => <span data-testid="phone-icon">📞</span>,
  Mail: () => <span data-testid="mail-icon">✉️</span>,
  MapPin: () => <span data-testid="map-icon">📍</span>,
  Facebook: () => <span data-testid="facebook-icon">📘</span>,
  Instagram: () => <span data-testid="instagram-icon">📷</span>,
  Twitter: () => <span data-testid="twitter-icon">🐦</span>,
}));

describe('Footer Component', () => {
  it('renders without crashing', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('displays company name and logo', () => {
    render(<Footer />);
    expect(screen.getByText(/Cagle's Landscaping/i)).toBeInTheDocument();
    expect(screen.getByText(/Restoration/i)).toBeInTheDocument();
  });

  it('shows company contact information', () => {
    render(<Footer />);
    expect(screen.getByText(/\(520\) 358-2221/i)).toBeInTheDocument();
    expect(screen.getByText(/Caglejosh4@gmail\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Fayetteville, Arkansas/i)).toBeInTheDocument();
  });

  it('displays quick links section', () => {
    render(<Footer />);
    expect(screen.getByText(/Quick Links/i)).toBeInTheDocument();

    // Check navigation links
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /portfolio/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('shows services section', () => {
    render(<Footer />);
    expect(screen.getByText(/Our Services/i)).toBeInTheDocument();

    // Check service links
    expect(screen.getByRole('link', { name: /lawn care/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /landscape design/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /hardscaping/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /seasonal cleanup/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /irrigation/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /tree.*shrub/i })).toBeInTheDocument();
  });

  it('displays service areas', () => {
    render(<Footer />);
    expect(screen.getByText(/Service Areas/i)).toBeInTheDocument();
    expect(screen.getByText(/Fayetteville/i)).toBeInTheDocument();
    expect(screen.getByText(/Springdale/i)).toBeInTheDocument();
    expect(screen.getByText(/Rogers/i)).toBeInTheDocument();
    expect(screen.getByText(/Bentonville/i)).toBeInTheDocument();
    expect(screen.getByText(/Northwest Arkansas/i)).toBeInTheDocument();
  });

  it('shows business hours', () => {
    render(<Footer />);
    expect(screen.getByText(/Business Hours/i)).toBeInTheDocument();
    expect(screen.getByText(/Monday - Friday/i)).toBeInTheDocument();
    expect(screen.getByText(/7:00 AM - 6:00 PM/i)).toBeInTheDocument();
    expect(screen.getByText(/Saturday/i)).toBeInTheDocument();
    expect(screen.getByText(/8:00 AM - 4:00 PM/i)).toBeInTheDocument();
    expect(screen.getByText(/Sunday/i)).toBeInTheDocument();
    expect(screen.getByText(/Closed/i)).toBeInTheDocument();
  });

  it('includes contact icons', () => {
    render(<Footer />);
    expect(screen.getByTestId('phone-icon')).toBeInTheDocument();
    expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
    expect(screen.getByTestId('map-icon')).toBeInTheDocument();
  });

  it('displays social media links', () => {
    render(<Footer />);
    expect(screen.getByText(/Follow Us/i)).toBeInTheDocument();
    expect(screen.getByTestId('facebook-icon')).toBeInTheDocument();
    expect(screen.getByTestId('instagram-icon')).toBeInTheDocument();
    expect(screen.getByTestId('twitter-icon')).toBeInTheDocument();
  });

  it('shows copyright information', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument();
    expect(screen.getByText(/Cagle's Landscaping.*Restoration/i)).toBeInTheDocument();
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
  });

  it('includes licensing information', () => {
    render(<Footer />);
    expect(screen.getByText(/Licensed & Insured/i)).toBeInTheDocument();
    expect(screen.getByText(/Fully Bonded/i)).toBeInTheDocument();
  });

  it('displays company tagline or mission', () => {
    render(<Footer />);
    expect(screen.getByText(/Professional Landscaping Services/i)).toBeInTheDocument();
    expect(screen.getByText(/Quality Workmanship/i)).toBeInTheDocument();
  });

  it('has correct link hrefs', () => {
    render(<Footer />);

    // Quick links
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: /services/i })).toHaveAttribute('href', '/services');
    expect(screen.getByRole('link', { name: /portfolio/i })).toHaveAttribute('href', '/portfolio');
    expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '/contact');

    // Service links
    expect(screen.getByRole('link', { name: /lawn care/i })).toHaveAttribute('href', '/services/lawn-care');
    expect(screen.getByRole('link', { name: /landscape design/i })).toHaveAttribute('href', '/services/landscape-design');
    expect(screen.getByRole('link', { name: /hardscaping/i })).toHaveAttribute('href', '/services/hardscaping');
  });

  it('includes emergency contact information', () => {
    render(<Footer />);
    expect(screen.getByText(/Emergency Services/i)).toBeInTheDocument();
    expect(screen.getByText(/24\/7 Available/i)).toBeInTheDocument();
  });

  it('shows awards or certifications', () => {
    render(<Footer />);
    expect(screen.getByText(/20\+ Years Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/Award Winning/i)).toBeInTheDocument();
  });

  it('displays call-to-action message', () => {
    render(<Footer />);
    expect(screen.getByText(/Get Your Free Estimate/i)).toBeInTheDocument();
    expect(screen.getByText(/Transform Your Outdoor Space/i)).toBeInTheDocument();
  });

  it('has proper accessibility structure', () => {
    render(<Footer />);

    // Should have contentinfo role
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();

    // Should have proper heading structure
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(2);
  });

  it('includes privacy policy and terms links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /privacy policy/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /terms of service/i })).toBeInTheDocument();
  });

  it('displays payment methods or financing info', () => {
    render(<Footer />);
    expect(screen.getByText(/Payment Options/i)).toBeInTheDocument();
    expect(screen.getByText(/Financing Available/i)).toBeInTheDocument();
  });

  it('shows quality guarantee information', () => {
    render(<Footer />);
    expect(screen.getByText(/100% Satisfaction/i)).toBeInTheDocument();
    expect(screen.getByText(/Guaranteed/i)).toBeInTheDocument();
  });

  it('includes newsletter signup', () => {
    render(<Footer />);
    expect(screen.getByText(/Newsletter/i)).toBeInTheDocument();
    expect(screen.getByText(/Stay Updated/i)).toBeInTheDocument();
  });

  it('displays company established year', () => {
    render(<Footer />);
    expect(screen.getByText(/Since 2004/i)).toBeInTheDocument();
    expect(screen.getByText(/Family Owned/i)).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<Footer />);

    // Check for footer sections
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass(); // Verify classes are applied

    // Should have multiple sections
    const sections = screen.getAllByRole('heading');
    expect(sections.length).toBeGreaterThan(3);
  });

  it('displays contact form link', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /contact form/i })).toBeInTheDocument();
  });

  it('shows BBB rating or customer reviews', () => {
    render(<Footer />);
    expect(screen.getByText(/5 Star Rating/i)).toBeInTheDocument();
    expect(screen.getByText(/500\+ Happy Customers/i)).toBeInTheDocument();
  });
});